import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
  View,
  TextInput,
  Image,
} from 'react-native';

import { useAppTheme } from '~/resources/theme';

import { RootNavigatorNavProps } from '~/navigation/RootNavigator';
import Button from '~/base/Button';
import {auth} from '../../Firebase/firebase'
import { TouchableOpacity } from 'react-native-gesture-handler';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const RecoveryPage = (): JSX.Element => {
  const theme = useAppTheme();
  const navigation = useNavigation<RootNavigatorNavProps>();
  const { t } = useTranslation();

  const styleContainer = useMemo<StyleProp<ViewStyle>>(
    () => [
      {
        backgroundColor: theme.colors.backgroundColorChild,
        flex: 1,
        justifyContent: 'center',
        marginTop: 0,
        alignItems: 'center',
      },
    ],
    [theme],
  );
 
  return (
    <SafeAreaView style={styleContainer}>
      <View style={styles.viewIcon}>
        <Image source={require('../../../assets/shoppetick.png')} style={styles.icon}/>
        <Text style={{
          fontFamily: 'montserrat',
          fontWeight: '700',
          fontSize: 18,
          lineHeight: 21.94,
          alignContent: 'center',
          color: '#3E4958',
          bottom: 3
        }}>Password reset</Text>
        <Text style={{
          fontFamily: 'montserrat',
          fontWeight: '700',
          fontSize: 18,
          lineHeight: 21.94,
          alignContent: 'center',
          color: '#3E4958',
          bottom: 5
        }}>successful</Text>

        <Text style={{
          fontFamily: 'Roboto',
          fontWeight: '500',
          fontSize: 14,
          lineHeight: 16.41,
          alignContent: 'center',
          color: '#D5DDE0',
        }}>You have successfully reset your</Text>
        <Text style={{
          fontFamily: 'Roboto',
          fontWeight: '500',
          fontSize: 14,
          lineHeight: 16.41,
          alignContent: 'center',
          color: '#D5DDE0',
        }}>password.Please use your new</Text>
        <Text style={{
          fontFamily: 'Roboto',
          fontWeight: '500',
          fontSize: 14,
          lineHeight: 16.41,
          alignContent: 'center',
          color: '#D5DDE0',
        }}>password when logging in</Text>
      </View>
      <View style={styles.viewButton}>
        <Button
         mode='orange'
         type='modal'
         textColor='#ffffff'
         textStyle={{
            fontWeight: '700',
            fontSize: 16,
            fontFamily: 'Montserrat',
         }}
         onPress={() => navigation.navigate('Welcome back')}
        >
           Login
        </Button>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  viewIcon: {
    alignItems: 'center',
  },
  icon: {
    width: 110,
    height: 110,
    borderRadius: 55,
    bottom: 5,
  },
  viewButton: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 60,
  }
});
export default RecoveryPage;