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
         disabled={true}
        >Edit account</Button>
      </View>
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
            width: 303,
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
    backgroundColor: '#f5f5f5',
    borderRadius: 19,
  }
});
