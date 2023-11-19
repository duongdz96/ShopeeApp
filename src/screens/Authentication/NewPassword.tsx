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
import { Checkbox } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';

const NewPassword = (): JSX.Element => {
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
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const passwordMatch =  newPassword === confirmPassword && newPassword !== '';
  return (
    <SafeAreaView style={styleContainer}>
      <View style={{
        alignSelf: 'flex-start',
        marginBottom: '15%',
        marginLeft: '6%',

      }}>
        <Text style={styles.headerText}>Your new password must be different</Text>
        <Text style={styles.headerText}>from previously used passwords.</Text>
      </View>
      <View style={styles.viewInput}>
        <View style={{
          marginBottom: 8,
        }}>
          <Text style={{
            color: 'black'
          }}>New Password</Text>
        </View>
        <TextInput
         value={newPassword}
         onChangeText={setNewPassword}
         placeholder=''
         placeholderTextColor='#D5DDE0'
         style={styles.input}
         secureTextEntry={true}
        />
      </View>

      <View style={styles.viewInput}>
        <View style={{
          marginBottom: 8,
        }}>
          <Text style={{
            color: 'black'
          }}>Confirm password</Text>
        </View>
        <TextInput
         value={confirmPassword}
         onChangeText={setConfirmPassword}
         placeholder=''
         style={styles.input}
         secureTextEntry={true}
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
         onPress={() => {
            if(passwordMatch){
                navigation.navigate('PasswordReset');
            }
         }}
         disabled={!passwordMatch}
        >
           Update
        </Button>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  viewInput: {
    marginBottom: 18,
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
  },
  viewButton: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 60,
  }
});

export default NewPassword;
