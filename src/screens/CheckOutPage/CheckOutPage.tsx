import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BackHandler,
  Dimensions,
  Image,
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
import Button from '~/base/Button';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const CheckOutPage = (): JSX.Element => {
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
        justifyContent: 'center',
        alignItems: 'center',
      },
    ],
    [theme],
  );
  return (
    <SafeAreaView style={styleContainer}>
      <Image source={require('~/resources/images/orderSuccess.png')} style={{width: 110, height: 110, borderRadius: 110, marginBottom: 10}}/>
      <Text style={{
        fontFamily: 'Montserrat',
        fontWeight: '700',
        fontSize: 18,
        lineHeight: 21.94,
        color: '#3E4958',
        marginBottom: 10,
      }}>Order success!</Text>
      <Text style={{
        fontFamily: 'Roboto',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 16.41,
        alignSelf: 'center',
        color: '#D5DDE0'
      }}>Your order has been placed successfully!</Text>
      <Text style={{
        fontFamily: 'Roboto',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 16.41,
        alignSelf: 'center',
        color: '#D5DDE0'
      }}>For more details, go to my orders.</Text>
      <View style={{
        position: 'absolute',
        bottom: 110
      }}>
        <Button
         type='modal'
         mode='light'
         textColor='#FFFFFF'
        >My order</Button>
      </View>
      <View style={{
        position: 'absolute',
        bottom: '5%'
      }}>
        <Button
         type='modal'
         mode='orange'
         textColor='#FFFFFF'
         onPress={()=>navigation.replace('BottomTabNavigator')}
        >Continue Shopping</Button>
      </View>
    </SafeAreaView>
  );
};

export default CheckOutPage;

const styles = StyleSheet.create({});
