import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import getImage from '~/libs/getImage';

import { useAppTheme } from '~/resources/theme';

import { RootNavigatorNavProps } from '~/navigation/RootNavigator';
import Button from '~/base/Button';
import { ActivityIndicator, Checkbox } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FIREBASE_AUTH } from '~/Firebase/UserData';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginPage = (): JSX.Element => {
  const { t } = useTranslation();
  const theme = useAppTheme();
  const navigation = useNavigation<RootNavigatorNavProps>();

  const styleContainer = useMemo<StyleProp<ViewStyle>>(
    () => [
      {
        // backgroundColor: theme.colors.backgroundColor,
        flex: 1,
        //justifyContent: 'center',
        marginTop: 0,
        alignItems: 'center',
        backgroundColor: 'white',
      },
    ],
    [theme],
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const handleSignIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const userName = response.user.displayName;
      await AsyncStorage.setItem('userName', userName);
      navigation.navigate('BottomTabNavigator');
      console.log(response);
    }catch (error) {
      console.log(error);
      alert('Sign in failed');
    }finally {
      setLoading(false);
    }
  }
  return (
    <SafeAreaView style={styleContainer}>
      <View style={{
        alignSelf: 'flex-start',
        marginBottom: '15%',
        marginLeft: '6%',

      }}>
        <Text style={styles.headerText}>Please fill E-mail & password to login your</Text>
        <Text style={styles.headerText}>Shopee application account.</Text>
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
         onChangeText={(text) => setEmail(text)}
         placeholder='example@gmail.com'
         placeholderTextColor='#D5DDE0'
         style={styles.input}
        />
      </View>

      <View style={{
        marginBottom: 40,
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
         onChangeText={(text) => setPassword(text)}
         placeholder=''
         style={styles.input}
         secureTextEntry={true}
        />
      </View>

{/* forgot password and checkbox */}
      <View style={styles.checkboxContainer}>
        <Checkbox
         status={checked ? 'checked' : 'unchecked'}
         onPress={() => setChecked(!checked)}
         color='#FF5B2C'
        />
        <TouchableOpacity onPress={() => navigation.navigate('Forgot Password')}>
          <Text style={{
            paddingLeft: 220,
            color: '#3E4958',
            fontWeight: '500',
            fontSize: 14,
            lineHeight: 17.07,
          }}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size='large' color='orange'/>
      ) : (
        <>
      <View style={styles.viewButton}>
        <Button
         type='modal'
         mode='orange'
         textColor='white'
         onPress={handleSignIn}
        // onPress={() => navigation.navigate('BottomTabNavigator')}
        >
          Sign In
        </Button>
      </View>
      </>
      )}
      <View style={{
        marginBottom: 30,
      }}>
        <Text style={{
          color: 'black',
          fontWeight: '600'
        }}>Or sign in with</Text>
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
    marginBottom: 60
  },
  headerText: {
    color: '#3E4958',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 24,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  }
});

export default LoginPage;
