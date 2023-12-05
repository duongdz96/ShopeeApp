import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BackHandler,
  Dimensions,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
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

import IconShoppingCard from '~/resources/Icons/IconShoppingCart'
import IconNotification from '~/resources/Icons/IconNotification'
import {ShoppingCartOutlined } from '@ant-design/icons'
import Button from '~/base/Button';
import {collection, getDocs} from 'firebase/firestore'
import { FIREBASE_DB } from '~/Firebase/UserData'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase, onValue, ref } from 'firebase/database';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const HomePage = (): JSX.Element => {
  const { t } = useTranslation();
  const theme = useAppTheme();
  const navigation = useNavigation<RootNavigatorNavProps>();
  const { openModal } = useModalManager();
  const resultContext = usePreferenceContext();
  const topInsets = useTopInset();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(FIREBASE_DB, 'cars'));
        const dataList = [];
        querySnapshot.forEach((doc) => {
          dataList.push({id: doc.id, ...doc.data()});
        });
        setData(dataList);
      }catch (error){
        console.error("Error fetching data", error);
      }
    }
    fetchData();
  }, []);

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
        backgroundColor: theme.colors.backgroundColorChild,
        alignContent: 'center'
        //paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
      },
    ],
    [theme],
  );
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  const banners = [
    require('~/resources/images/banner.png'),
    require('~/resources/images/banner.png'),
    require('~/resources/images/banner.png'),
  ];
  return (
    <ScrollView style={styleContainer}>
      <View style={styles.headers}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around'
        }}>
          <TextInput
           placeholder='Search'
           style={styles.searchBar}
          />
          <IconShoppingCard
           style={{marginTop: 4,
          }}
          onPress = {() => navigation.navigate('My Cart')}
          />
          <IconNotification
           style={{marginTop: 4}}
           onPress={() => console.log('Notifications')}
          />
        </View>
        <ScrollView
         horizontal
         showsHorizontalScrollIndicator={false}
         pagingEnabled
         scrollEventThrottle={16}
         style={styles.viewBanner}
        >
          <Image source={require('~/resources/images/banner.png')} style={styles.banner}/>
          <Image source={require('~/resources/images/banner.png')} style={styles.banner}/>
          <Image source={require('~/resources/images/banner.png')} style={styles.banner}/>
        </ScrollView>
      </View>
      <View style={{
          backgroundColor: '#ffffff',
          width:357,
          height: 67,
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
          justifyContent: 'center',
        }}>
      </View>
      <View style={styles.viewCategory}>
        <View style={styles.boxView}>
          <Image source={require('~/resources/images/foodIcon.png')} style={{width: 32, height: 33}}/>
        </View>
        <View style={styles.boxView}>
          <Image source={require('~/resources/images/bagIcon.png')} style={{width: 40, height: 40}}/>
        </View>
        <View style={styles.boxView}>
          <Image source={require('~/resources/images/cartIcon.png')} style={{width: 38, height: 38}}/>
        </View>
        <View style={styles.boxView}>
          <Image source={require('~/resources/images/bankIcon.png')} style={{width: 41, height: 43}}/>
        </View>
      </View>
      
      <View style={styles.itemView}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 40,
          justifyContent: 'space-between'
        }}>
          <Text style={{
            fontWeight: '700',
            fontSize: 21,
            lineHeight: 25.2,
            color: '#FF5F00',
          }}>FLASHSALE</Text>
          <Button
           type='small'
           textColor='#ffffff'
           mode='orange'
           style={{
           }}
          >
            View all
          </Button>
        </View>
        
           <FlatList
              horizontal={true}
              data={data}
              keyExtractor={item => item.id}
              style={{
                marginLeft: 10,
              }}
              renderItem={({ item }) => (
               <TouchableOpacity 
                 style={styles.itemList} 
                 onPress={() => navigation.navigate('My Wishlist', {carDetails: item})}
                >
                 <Image source={{uri: item.image}} style={{width: 125, height: 135,}}/>
                 <Text style={styles.textItem}>{item.brand}</Text>
                 <Text style={styles.textItem}>{item.model}</Text>
                 <Text style={styles.textItem}>{item.year}</Text>
                 <Text style={styles.textItem}>${item.price}</Text>
                </TouchableOpacity>
               )}
            />
      </View>
    </ScrollView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  headers: {
    backgroundColor: '#FF5B2C',
    justifyContent: 'space-between',
    paddingVertical: 50,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  searchBar: {
    borderRadius: 14,
    borderWidth: 0.5,
    borderColor: '#D5DDE0',
    marginRight: 70,
    backgroundColor: '#ffffff',
    width: 240,
    height: 27.59,
    paddingVertical: 3,
    paddingHorizontal: 15,
  },
  viewBanner: {
    paddingVertical: 15,
    marginLeft: 15,
    width: 357,
    height: 130
  },
  banner: {
    width: 357,
    height: 104,
  },
  viewCategory: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
    marginHorizontal: SCREEN_WIDTH-190
  },
  boxView: {
    backgroundColor: '#FF5F00',
    width: 55,
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
  },
  itemView: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#F7F8F9',
    marginTop: '20%',
  },
  itemList: {
    marginRight: 15,
    alignItems: 'center',
    backgroundColor: '#FEFEFE',
    height: 233,
    width: 140,
  },
  textItem: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: 12,
    color: '#3E4958',
  }
});
