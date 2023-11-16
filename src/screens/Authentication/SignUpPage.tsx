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
  TextInput
} from 'react-native';

import { useAppTheme } from '~/resources/theme';

import { RootNavigatorNavProps } from '~/navigation/RootNavigator';
import Button from '~/base/Button';

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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      },
    ],
    [theme],
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
         onChangeText={setPassword}
         placeholder='●●●●●●●●'
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
    height: 56,
    borderRadius: 12,
    width: Dimensions.get('window').width-50,
    backgroundColor: '#f5f5f5',

    textAlign: 'center',

    borderColor: '#d3d3d3',
    borderWidth: 0.7,
  },
  viewButton: {
    marginBottom: 40
  }
});
