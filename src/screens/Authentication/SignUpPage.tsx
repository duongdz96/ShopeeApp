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
} from 'react-native';

import { useAppTheme } from '~/resources/theme';

import { RootNavigatorNavProps } from '~/navigation/RootNavigator';
import Button from '~/base/Button';
import {auth} from '../../../firebase'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const SignUpPage = (): JSX.Element => {
  const theme = useAppTheme();
  const navigation = useNavigation<RootNavigatorNavProps>();

  const { t } = useTranslation();

  const styleContainer = useMemo<StyleProp<ViewStyle>>(
    () => [
      {
        // backgroundColor: theme.colors.backgroundColor,
        flex: 1,
        //justifyContent: 'center',
        marginTop: Dimensions.get('window').height-800,
        alignItems: 'center',
        backgroundColor: 'white',
      },
    ],
    [theme],
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const handleSignUp = () => {
  //   auth
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((userCredentials: { user: any; }) => {
  //       const user = userCredentials.user;
  //       console.log('Registered with:', user.email);
  //     })
  //     .catch((error: { message: any; }) => alert(error.message))
  // }

  return (
    <SafeAreaView style={styleContainer}>
      <View style={styles.viewInput}>
        <View style={{
          marginBottom: 8,
        }}>
          <Text style={{
            color: 'black'
          }}>Name</Text>
        </View>
        <TextInput
         value={name}
         onChangeText={setName}
         placeholder='John Doe'
         placeholderTextColor='#D5DDE0'
         style={styles.input}
        />
      </View>

      <View style={styles.viewInput}>
        <View style={{
          marginBottom: 8,
        }}>
          <Text style={{
            color: 'black'
          }}>E-mail</Text>
        </View>
        <TextInput
         value={email}
         onChangeText={setEmail}
         placeholder='example@gmail.com'
         placeholderTextColor='#D5DDE0'
         style={styles.input}
        />
      </View>

      <View style={{
        marginBottom: 60,
      }}>
        <View style={{
          marginBottom: 8,
        }}>
          <Text style={{
            color: 'black'
          }}>Password</Text>
        </View>
        <TextInput
         value={password}
         onChangeText={setPassword}
         placeholder=''
         style={styles.input}
         secureTextEntry={true}
        />
      </View>

      <View style={styles.viewButton}>
        <Button
         type='modal'
         mode='orange'
         textColor='white'
        >
          Sign Up
        </Button>
      </View>

      <View style={{
        marginBottom: 30,
      }}>
        <Text style={{
          color: 'black',
          fontWeight: '600'
        }}>Or sign up with</Text>
      </View>

      <View style={{
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
          <Button
           disabled={true}
           type='medium'
           icon={require('../../../assets/facebook-f-logo-2019.png')}
           style={{flex: 1,marginRight: 10}}
          //  onPress={handleSignUp}
          >
          </Button>
          <Button
           disabled={true}
           type='medium'

          >
          </Button>
        </View>
    </SafeAreaView>
  );
};

export default SignUpPage;

const styles = StyleSheet.create({
  viewInput: {
    marginBottom: 15,
  },
  input: {
    height: 66,
    borderRadius: 14,
    width: Dimensions.get('window').width-70,
    backgroundColor: '#F7F8F9',

    textAlign: 'left',

    borderColor: '#D5DDE0',
    borderWidth: 0.5,
    paddingLeft: 12,
  },
  viewButton: {
    marginBottom: 40
  }
});
