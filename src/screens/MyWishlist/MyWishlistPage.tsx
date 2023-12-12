import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BackHandler,
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  Text,
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
import Button from '~/base/Button';
import { PreferenceActionsContext, PreferenceContext } from '~/contextStore/ActionPreferenceContext';
import {getDatabase, ref, set, onValue, increment, Database} from 'firebase/database'
import IconBack from '~/resources/Icons/IconBack';
import IconShoppingCard from '~/resources/Icons/IconShoppingCart2'
import IconNotification from '~/resources/Icons/IconNotification2'
import { FIREBASE_DB } from '~/Firebase/UserData';
import { collection, addDoc, getDocs, setDoc, doc, getDoc } from 'firebase/firestore';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const MyWishlistPage = ({route}): JSX.Element => {
  const { t } = useTranslation();
  const theme = useAppTheme();
  const navigation = useNavigation<RootNavigatorNavProps>();
  const { openModal } = useModalManager();
  const resultContext = usePreferenceContext();
  const topInsets = useTopInset();
  const [quantity, setQuantity] = useState(1);
  const {carDetails} = route.params;
  const {getTotalPrice} = useContext(PreferenceActionsContext);
  const {getNumberItem} = useContext(PreferenceActionsContext);
  const [cartItems, setCartItems] = useState(0);
  const {result} = useContext(PreferenceContext);
  const {getDatabase} = useContext(PreferenceActionsContext);
  const {getDataCar} = useContext(PreferenceActionsContext);
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
  const handelAddToCart = async () => {
    const userUID =  result.userID;
    try {
      const cartCollectionRef = collection(FIREBASE_DB, 'cart');
      const cartItemData = {
        brand: carDetails.brand,
        image: carDetails.image,
        price: carDetails.price,
      };
      await addDoc(cartCollectionRef, cartItemData);
      console.log('Item added successfully');
      const cartQuerySnapshot = await getDocs(cartCollectionRef);
      const cartItemCount = cartQuerySnapshot.size;
      getNumberItem(cartItemCount);

    }catch(error){
      console.error('Error saving data', error);
    }
    // navigation.navigate('My Cart');
  };
  const handelAddFavor = async () => {
    const userUID = result.userID;
    try {
      const cartCollectionRef = collection(FIREBASE_DB, 'favorite');
      const cartItemData = {
        brand: carDetails.brand,
        image: carDetails.image,
        price: carDetails.price,
      };
      getDatabase(cartItemData);
      if (userUID) {
        const userDocRef =  doc(cartCollectionRef, userUID);
        const userDocSnapshot = await getDoc(userDocRef);
        const currentFavor = userDocSnapshot.exists() ? userDocSnapshot.data().favorites || [] : [];
        const existingIndex = currentFavor.findIndex(item => (
          item.brand === cartItemData.brand && 
          item.image === cartItemData.image &&
          item.price === cartItemData.price
        ));
  
        if (existingIndex !== -1) {
          currentFavor[existingIndex] = cartItemData;
        } else {
          currentFavor.push(cartItemData);
        }
        await setDoc(userDocRef, {favorites : currentFavor});
        console.log('Item added to favorites successfully');
        navigation.replace('BottomTabNavigator');

      } else {
        console.log('User is not authenticated.');
      }
    } catch (error) {
      console.error('Error saving data', error);
    }
  };
  return (
    <SafeAreaView style={styleContainer}>
      <Image source={{uri: carDetails.image}} style={{width:SCREEN_WIDTH, height: 300,borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}/>
      <TouchableOpacity style={{position: 'absolute', marginVertical: 50, marginHorizontal: 15,}} onPress={() => navigation.goBack()}>
        <IconBack/>
      </TouchableOpacity>
      <View style={{position: 'absolute', top: 0, right: 0, flexDirection: 'row', marginVertical: 50, marginHorizontal: 15,}}>
      <IconShoppingCard
        style={{
          marginRight: 10,
        }}
        onPress = {() => navigation.navigate('My Cart')}
      />
      {result.count > 0 && (
        <Text style={{backgroundColor:'#FF5F00', width: 18, height: 18, borderRadius: 10, borderColor: '#FFFFFF', borderWidth: 1, textAlign:'center', position:'absolute', color: '#FFFFFF', top: -7, right: 50,}}>{result.count}</Text>
      )}
      <IconNotification
        style={{
          marginTop: 3.5,
        }}
        onPress={() => console.log('Notifications')}
      />
      </View>
      <View style={{
          backgroundColor: '#ffffff',
          width:357,
          height: 117,
          borderRadius: 19,
          marginTop: -40,
          position: 'relative',
          // marginHorizontal: 9,
          shadowColor: '#232323',
          alignSelf: 'center',
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.3,
          shadowRadius: 19,
          elevation: 4,
          marginBottom: 15,
          // justifyContent: 'center',
          //alignItems: 'center',
        }}>
          <Text style={{
            fontFamily: 'Montserrat-BlackItalic',
            fontWeight: '600',
            fontSize: 18,
            lineHeight: 17.07,
            color: '#3E4958',
            paddingHorizontal: 30,
            paddingVertical: 20
          }}>{carDetails.brand}</Text>
          <Text style={{
            fontFamily: 'Montserrat-Black',
            fontWeight: '700',
            fontSize: 14,
            lineHeight: 21.94,
            color: '#FF5F00',
            paddingHorizontal: 35,
          }}>${carDetails.price}</Text>
      </View>
      <View style={{
          backgroundColor: '#ffffff',
          width:357,
          height: 28,
          borderRadius: 19,
          shadowColor: '#232323',
          alignSelf: 'center',
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.3,
          shadowRadius: 19,
          elevation: 4,
          justifyContent: 'center',
          //alignItems: 'center',
          marginBottom: 20,
        }}>
         <Text style={{
          fontFamily: 'Montserrat-SemiBold',
          fontWeight: '600',
          fontSize: 14,
          lineHeight: 17.07,
          paddingHorizontal: 10,
          color: '#3E4958'
         }}>Pilih Variasi (Warna, Ukuran)</Text>
      </View>
      <Text style={styles.text}>Ongkos Kirim </Text>
      <Text style={styles.text}>Claim Voucher</Text>
      <Text style={styles.text}>SPayLater</Text>
      <View style={{
          backgroundColor: '#ffffff',
          width:357,
          height: 293,
          borderRadius: 19,
          position: 'relative',
          // marginHorizontal: 9,
          shadowColor: '#232323',
          alignSelf: 'center',
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.3,
          shadowRadius: 19,
          elevation: 4,
          marginBottom: 15,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Button
            type='modal'
            mode='orange'
            textColor='#FFFFFF'
            onPress={handelAddToCart}
          >
           Add to cart
          </Button>
          <Button
            type='modal'
            mode='orange'
            textColor='#FFFFFF'
            onPress={handelAddFavor}
          >
           Add to favorite
          </Button>
      </View>
    </SafeAreaView>
  );
};

export default MyWishlistPage;

const styles = StyleSheet.create({
  textItem: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: 20,
    color: '#3E4958',
  },
  text: {
    fontFamily: 'Montserrat-SemiBold',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 17.07,
    paddingHorizontal: 10,
    color: '#3E4958',
    marginLeft: 25,
    marginBottom: 10,
  }
});
