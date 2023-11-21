import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BackHandler,
  Dimensions,
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

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const HomePage = (): JSX.Element => {
  const { t } = useTranslation();
  const theme = useAppTheme();
  const navigation = useNavigation<RootNavigatorNavProps>();
  const { openModal } = useModalManager();
  const resultContext = usePreferenceContext();
  const topInsets = useTopInset();

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
        }}>
          <TextInput
           placeholder='Search'
           style={styles.searchBar}
          />
          <IconShoppingCard style={{
            marginRight: 10,
          }}/>
          <IconNotification style={{
            marginTop: 4,
          }}/>
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
  }
});
