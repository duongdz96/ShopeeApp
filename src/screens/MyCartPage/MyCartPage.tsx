import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Animated,
  BackHandler,
  Dimensions,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import ExitApp from 'react-native-exit-app';

import { useTopInset } from '~/hooks/useInset';
import useModalManager from '~/hooks/useModalManager';
import usePreferenceContext from '~/hooks/usePreferenceContext';

import { useAppTheme } from '~/resources/theme';

import { RootNavigatorNavProps } from '~/navigation/RootNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PreferenceActionsContext, PreferenceContext } from '~/contextStore/ActionPreferenceContext';
import Button from '~/base/Button';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH, FIREBASE_DB } from '~/Firebase/UserData';
import ButtonCustom from '~/base/ButtonCustom';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const MyCartPage = (): JSX.Element => {
  const { t } = useTranslation();
  const theme = useAppTheme();
  const navigation = useNavigation<RootNavigatorNavProps>();
  const { openModal } = useModalManager();
  const resultContext = usePreferenceContext();
  const topInsets = useTopInset();
  const {getTotalPrice} = useContext(PreferenceActionsContext);
  const [search, setSearch] = useState('');
  const {result} = useContext(PreferenceContext);
  const {getNumberItem} = useContext(PreferenceActionsContext);
  const [code, setCode] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      let backButtonPressCount = 0;
      let backButtonPressTimer: ReturnType<typeof setTimeout> = null;

      const onBackPress = () => {
        if (backButtonPressCount === 1) {
          ExitApp.exitApp();
          return true;
        } else {
          backButtonPressCount++;
          backButtonPressTimer = setTimeout(() => {
            backButtonPressCount = 0;
            clearTimeout(backButtonPressTimer);
          }, 2000);
          return true;
        }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        backHandler.remove();
      };
    }, []),
  );

  const styleContainer = useMemo<StyleProp<ViewStyle>>(
    () => [
      {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
      },
    ],
    [theme],
  );
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const calculateTotalPrice = (cartItems) => {
    let total = 0;
    cartItems.forEach((item) => {
    total += item.price;
  });
    return total;
}

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartCollectionRef = collection(FIREBASE_DB, 'cart');
        const querySnapshot = await getDocs(cartCollectionRef);
        const cartItems = [];
        querySnapshot.forEach((doc) => {
          const cartItem = doc.data();
          cartItems.push(cartItem);
        });
        setCart(cartItems);
        const total = calculateTotalPrice(cartItems);
        getTotalPrice(total);
        // getNumberItem(cartItems.length);
      } catch (error) {
        console.error('Error retrieving data', error);
      }
    };
    fetchCart();
  }, []);
  

 //clear my cart if use different account
// const handleDelete = async (itemId) => {
//   const newCart = cart.filter(item => item.id !== itemId);
//   setCart(newCart);
//   getNumberItem(newCart.length);
//   await AsyncStorage.setItem('cart', JSON.stringify(newCart));
//   const total = calculateTotalPrice(newCart);
//   getTotalPrice(total);
// };
 //double click and delete
 


const handleOrder = async () => {
  try {
    const cartCollectionRef = collection(FIREBASE_DB, 'cart');
    const querySnapshot = await getDocs(cartCollectionRef);
    const deleteItems = [];
    querySnapshot.forEach((doc) => {
      const deleteItem = deleteDoc(doc.ref);
      deleteItems.push(deleteItem);
    });
    setCart([]);
    getTotalPrice(0);
    navigation.navigate('Check out');
    getNumberItem(0);
  } catch (error) {
    console.error('Logout failed', error);
  }
}
  return (
    <ScrollView style={styleContainer}>
      <View style={styles.header}>
        <Text style={{
          fontFamily: 'Roboto',
          fontWeight: '400',
          fontSize: 13,
          lineHeight: 24,
          marginBottom: 20,
        }}>Add more products to your cart!</Text>
      </View>
      <TextInput
        style={styles.textInput}
        value={search}
        onChangeText={setSearch}
        placeholder='Search'
      />
      <FlatList
       data={cart}
       keyExtractor={(item) => item.id}
       renderItem={({ item }) => (
       <TouchableOpacity style={styles.cardView}>
         <View style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
          paddingVertical: 5,
         }}>
          <Image source={{uri: item.image}} style={{
            width: 92.59,
            height: 100,
            borderRadius: 7.41,
            borderWidth: 0.37,
            borderColor: '#D5DDE0',
          }}/>
          <View style={{
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}>
            <Text style={{
              fontFamily: 'Montserrat',
              fontWeight: '600',
              fontSize: 14,
              lineHeight: 17.07,
              color: '#3E4958',
              marginBottom: 5,
            }}>{item.brand}</Text>
            <Text style={{
              fontFamily: 'Montserrat',
              fontWeight: '700',
              fontSize: 14,
              lineHeight: 17.07,
              color: '#3E4958'
            }}>${item.price}</Text>
          </View>
         </View>
       </TouchableOpacity>
        )}
      />
      <View style={{
        flexDirection: 'row',
        marginLeft: 60,
        marginBottom: 20,
      }}>
        <TextInput
          placeholder='Enter code voucher'
          value={code}
          onChangeText={setCode}
          style={{
            width: 189,
            height: 60,
            borderRadius: 14,
            borderWidth: 0.5,
            borderColor: '#D5DDE0',
            backgroundColor: '#F7F8F9',
            marginRight: 10,
          }}
          placeholderTextColor='#D5DDE0'
        />
        <Button
         type='small'
         mode='orange'
         textColor='#FFFFFF'
        >Apply</Button>
      </View>

      <View style={{
        flexDirection: 'row',
        marginLeft: 60,
        marginBottom: 20,
      }}>
        <Text style={{
          fontFamily: 'Montserrat',
          fontWeight: '700',
          fontSize: 16,
          lineHeight: 19.5,
          marginRight: '55%'
        }}>In total</Text>
        <Text style={{
          fontFamily: 'Montserrat',
          fontWeight: '700',
          fontSize: 16,
          lineHeight: 19.5,
          marginRight: '50%'
        }}>${result.total}</Text>
      </View>

      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '8%',
      }}>
      <Button
       type='modal'
       mode='orange'
       textColor='#FFFFFF'
       onPress={handleOrder}
      >Order</Button>
      </View>
    </ScrollView>
  );
};

export default MyCartPage;

const styles = StyleSheet.create({
  header: {
    marginLeft: 25,
  },
  textInput: {
    width: 303,
    height: 60,
    borderWidth: 0.5,
    borderColor: '#D5DDE0',
    backgroundColor: '#F7F8F9',
    borderRadius: 14,
    alignSelf: 'center',
    textAlign: 'left',
    padding: 12,
    marginBottom: 25,
  },
  cardView: {
    width: 303,
    height: 112,
    borderWidth: 0.5,
    borderRadius: 14,
    backgroundColor: '#F7F8F9',
    borderColor: '#D5DDE0',
    alignSelf: 'center',
    marginBottom: 30,
  },
  rightAction: {

  },
  actionText: {
    
  }
});
