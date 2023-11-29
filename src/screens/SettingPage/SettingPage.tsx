import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useMemo, useState } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '~/base/Button';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const SettingPage = (): JSX.Element => {
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
        backgroundColor: theme.colors.backgroundColorChild,
      },
    ],
    [theme],
  );
  const [userName, setUserName] = useState('');
  useEffect(() => {
    const getUserName = async () => {
      const storeUserName = await AsyncStorage.getItem('userName');
      if(storeUserName) {
        setUserName(storeUserName);
      }
    };
    getUserName();
  }, []);
  return (
    <SafeAreaView style={styleContainer}>
      <View style={styles.editProfile}>
        <Text style={{
          fontFamily: 'Montserrat',
          fontWeight: '600',
          fontSize: 14,
          lineHeight: 17.07,
          color: '#3E4958'
        }}>{userName}</Text>
        <Button
         type='medium'
         mode='orange'
         textColor='#D5DDE0'
         textStyle={{
          
         }}
         disabled={true}
        >Edit account</Button>
      </View>
      {/* card 1 */}
      <View style={styles.purchaseView}>
        <View style={{
          flexDirection: 'row',
          margin: 15,
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Text style={{
            fontFamily: 'Montserrat',
            fontWeight: '600',
            fontSize: 14,
            lineHeight: 17,
            color: '#3E4958'
          }}>My Purchases</Text>
          <Text style={{
            fontFamily: 'MS Gothic',
            fontSize: 8,
            fontWeight: '400',
            lineHeight: 8,
          }}>
          View Purchase History {'>'}
          </Text>
        </View>
        <View style={{
            width: 310,
            height: 1,
            backgroundColor: '#D5DDE0',
            alignSelf: 'center'
          }}></View>
          <View style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 6,
          }}>
             <Image 
               source={require('~/resources/images/payIcon.png')}
               style={{
                width: 34,
                height: 34,
               }}
             />
             <Image 
              source={require('~/resources/images/shipIcon.png')}
              style={{
                width: 46,
                height: 46,
              }}
             />
             <Image
              source={require('~/resources/images/truckIcon.png')}
             />
             <Image
              source={require('~/resources/images/starIcon.png')}
             />
          </View>
          <View style={{
            width: 310,
            height: 1,
            backgroundColor: '#D5DDE0',
            alignSelf: 'center'
          }}></View>
          <View style={{
          flexDirection: 'row',
          marginHorizontal: 15,
          marginVertical: 5,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Text style={{
            fontFamily: 'Montserrat',
            fontWeight: '600',
            fontSize: 14,
            lineHeight: 17,
            color: '#3E4958'
          }}>Digital Purchases</Text>
          <Text style={{
            fontFamily: 'MS Gothic',
            fontSize: 8,
            fontWeight: '400',
            lineHeight: 8,
          }}>
          View my top-up {'>'}
          </Text>
        </View>
      </View>

      {/* Card 2 */}
      <View style={styles.purchaseView}>
        <View style={{
          flexDirection: 'row',
          margin: 15,
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Text style={{
            fontFamily: 'Montserrat',
            fontWeight: '600',
            fontSize: 14,
            lineHeight: 17,
            color: '#3E4958'
          }}>My Purchases</Text>
        </View>
        <View style={{
            width: 310,
            height: 1,
            backgroundColor: '#D5DDE0',
            alignSelf: 'center'
          }}></View>
          <View style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 6,
          }}>
             <Image 
               source={require('~/resources/images/walletIcon.png')}
               style={{
                width: 30,
                height: 30,
               }}
             />
             <Image 
              source={require('~/resources/images/coinIcon.png')}
              style={{
                width: 31,
                height: 31,
              }}
             />
             <Image
              source={require('~/resources/images/sPayLater.png')}
             />
             <Image
              source={require('~/resources/images/voucherIcon.png')}
             />
          </View>
          <View style={{
            width: 310,
            height: 1,
            backgroundColor: '#D5DDE0',
            alignSelf: 'center'
          }}></View>
      </View>
    </SafeAreaView>
  );
};

export default SettingPage;

const styles = StyleSheet.create({
  editProfile: {
    marginBottom: 20,
  },
  purchaseView: {
    width: 357,
    height: 166,
    borderRadius: 19,
    backgroundColor: '#ffffff',
    shadowColor: 'black',
    shadowOffset: {
      width: -2,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
    marginBottom: 5,
  }
});
