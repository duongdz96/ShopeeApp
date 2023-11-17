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

const LoginPage = (): JSX.Element => {
  const { t } = useTranslation();
  const theme = useAppTheme();
  const navigation = useNavigation<RootNavigatorNavProps>();

  const styleContainer = useMemo<StyleProp<ViewStyle>>(
    () => [
      {
        // backgroundColor: theme.colors.backgroundColor,
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
      },
    ],
    [theme],
  );

  return (
    <SafeAreaView style={styleContainer}>
      <Text
        style={{
          color: '#000000',
          fontSize: 16,
          textAlign: 'center',
          fontFamily: 'SFProDisplay-Medium',
        }}>
        {t('LoginPage')}
      </Text>
    </SafeAreaView>
  );
};

export default LoginPage;
