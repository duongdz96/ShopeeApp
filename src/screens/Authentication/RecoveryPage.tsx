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
import {auth} from '../../../firebase'
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
        //justifyContent: 'center',
        marginTop: 0,
        alignItems: 'center',
      },
    ],
    [theme],
  );
  const route = useRoute();
  const method = route.params?.method;
  const message = method === 'sms'
    ? 'mobile'
    : 'email';

    const [code1, setCode1] = useState('');
    const [code2, setCode2] = useState('');
    const [code3, setCode3] = useState('');
    const [code4, setCode4] = useState('');
    const [timeoutId, setTimeoutId] = useState(null);
    
    useEffect(() => {
      // Function to check if the input is a single digit number
      const isSingleDigitNumber = (input) => /^[0-9]{1}$/.test(input);
  
      // Clear existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
  
      // Set a new timeout if all fields are filled
      if (code1 && code2 && code3 && code4) {
        const newTimeoutId = setTimeout(() => {
          if ([code1, code2, code3, code4].every(isSingleDigitNumber)) {
            navigation.navigate('New Password');
          }
        }, 5000); // 5 seconds delay
  
        setTimeoutId(newTimeoutId);
      }
  
      // Cleanup function to clear timeout on unmount
      return () => {
        if (timeoutId) clearTimeout(timeoutId);
      };
    }, [code1, code2, code3, code4, navigation]);
  
  return (
    <SafeAreaView style={styleContainer}>
      <View style={{
        alignSelf: 'flex-start',
        marginBottom: '15%',
        marginLeft: '6%',

      }}>
        <Text style={styles.headerText}>The recovery code was sent to your</Text>
        <Text style={styles.headerText}>{message}. Code expiration time is 120s.</Text>
        <Text style={styles.headerText}>Please enter the code:</Text>
      </View>
      
      <View style={styles.viewInput}>
        <TextInput
         placeholder=''
         onChangeText={(text) => {
            if(text === '' || text.length <= 1 && /^[0-9]+$/.test(text)) {
                setCode1(text);
            }
         }}
         value={code1}
         maxLength={1}
         style={styles.input}
         keyboardType='numeric'
        />

        <TextInput
         placeholder=''
         onChangeText={(text) => {
            if(text === '' || text.length <= 1 && /^[0-9]+$/.test(text)) {
                setCode2(text);
            }
         }}
         value={code2}
         maxLength={1}
         style={styles.input}
         keyboardType='numeric'
        />

        <TextInput
         placeholder=''
         onChangeText={(text) => {
            if(text === '' || text.length <= 1 && /^[0-9]+$/.test(text)) {
                setCode3(text);
            }
         }}
         value={code3}
         maxLength={1}
         style={styles.input}
         keyboardType='numeric'
        />

        <TextInput
         placeholder=''
         onChangeText={(text) => {
            if(text === '' || text.length <= 1 && /^[0-9]+$/.test(text)) {
                setCode4(text);
            }
         }}
         value={code4}
         maxLength={1}
         style={styles.input}
         keyboardType='numeric'
        />
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
        >
            Send again
        </Button>
      </View>

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
  viewInput: {
    flexDirection: 'row',
    width: SCREEN_WIDTH - 72,
  },
  input: {
    height: 60,
    width: 60,
    borderWidth: 0.5,
    borderColor: '#D5DDE0',
    backgroundColor: '#F7F8F9',
    borderRadius: 14,
    textAlign: 'center',
    padding: 0,
    marginRight: 25,
  },
  viewButton: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 60,
  }
});
export default RecoveryPage;