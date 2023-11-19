import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
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
import {auth} from '../../../firebase'
import { TouchableOpacity } from 'react-native-gesture-handler';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const ForgotPassword = (): JSX.Element => {
  const theme = useAppTheme();
  const navigation = useNavigation<RootNavigatorNavProps>();
  const { t } = useTranslation();

  const styleContainer = useMemo<StyleProp<ViewStyle>>(
    () => [
      {
        backgroundColor: theme.colors.backgroundColorChild,
        flex: 1,
        //justifyContent: 'center',
        marginTop: 0,
        alignItems: 'center',
      },
    ],
    [theme],
  );
  return (
    <SafeAreaView style={styleContainer}>
      <View style={{
        alignSelf: 'flex-start',
        marginBottom: '15%',
        marginLeft: '6%',

      }}>
        <Text style={styles.headerText}>Select which contact details should we</Text>
        <Text style={styles.headerText}>use to reset your password:</Text>
      </View>
      
      <TouchableOpacity style={styles.optionContainer} onPress={() => navigation.navigate('Recovery Code', {method: 'sms' } )}>
        <View style={{
          borderRadius: 7.41,
          borderColor: '#D5DDE0',
          width: 92.59,
          height: 100,
          borderWidth: 0.37,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 25,
        }}>
           <Image source={require('../../../assets/phone.png')} style={styles.icon}/>
        </View>
        <View style={{
          flexDirection: 'column',
        }}>
           <Text style={{
            color: '#3E4958',
            fontSize: 14,
            fontWeight: '600',
            fontFamily: 'Montserrat',
            lineHeight: 17.07,
           }}>via sms:</Text>
           <Text style={{
            color: '#3E4958',
            fontSize: 14,
            fontWeight: '600',
            fontFamily: 'Montserrat',
            lineHeight: 17.07,
           }}>*** ****61</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionContainer} onPress={() => navigation.navigate('Recovery Code', {method: 'email'})}>
        <View style={{
          borderRadius: 7.41,
          borderColor: '#D5DDE0',
          width: 92.59,
          height: 100,
          borderWidth: 0.37,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 25,
        }}>
           <Image source={require('../../../assets/phone.png')} style={styles.icon}/>
        </View>
        <View style={{
          flexDirection: 'column',
        }}>
           <Text style={{
            color: '#3E4958',
            fontSize: 14,
            fontWeight: '600',
            fontFamily: 'Montserrat',
            lineHeight: 17.07,
           }}>via email:</Text>
           <Text style={{
            color: '#3E4958',
            fontSize: 14,
            fontWeight: '600',
            fontFamily: 'Montserrat',
            lineHeight: 17.07,
           }}>*****16@gmail.com</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  headerText: {
    color: '#3E4958',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 24,
    fontFamily: 'Roboto'
  },
  optionContainer: {
    width: SCREEN_WIDTH - 72,
    padding: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    //justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D5DDE0',
  },
  icon: {
    marginRight: 10,
    width: 28.83,
    height: 28.83,
    color: '#3E4958'
  }
});
export default ForgotPassword;