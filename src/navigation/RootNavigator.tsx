import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';

import LoginPage from '~/screens/Authentication/LoginPage';
import SignUpPage from '~/screens/Authentication/SignUpPage';
import NotificationPage from '~/screens/NotificationPage/NotificationPage';
import OnBoardingPage from '~/screens/OnBoardingPage/OnBoardingPage';
import SelectLanguageOnboardingPage from '~/screens/OnBoardingPage/SelectLanguageOnboardingPage';
import SelectLanguagePage from '~/screens/SettingPage/SelectLanguagePage';
import SettingPage from '~/screens/SettingPage/SettingPage';
import SplashPage from '~/screens/SplashPage/SplashPage';
import TestPage from '~/screens/TestPage';
import WebViewPage from '~/screens/WebViewPage';

import BottomTabNavigator, {
  BottomTabNavigatorProps,
} from './BottomTabNavigator';
import ForgotPassword from '~/screens/Authentication/ForgotPassword';
import RecoveryPage from '~/screens/Authentication/RecoveryPage';
import { useAppTheme } from '~/resources/theme';
import NewPassword from '~/screens/Authentication/NewPassword';
import PasswordReset from '~/screens/Authentication/PasswordReset';
import MyCartPage from '~/screens/MyCartPage/MyCartPage';
import MyWishlistPage from '~/screens/MyWishlist/MyWishlistPage';

export type RootNavigatorProps = {
  navigate(arg0: string): unknown;
  SplashPage: undefined;
  TestPage: undefined;
  BottomTabNavigator: NavigatorScreenParams<BottomTabNavigatorProps>;
  OnBoardingPage: undefined;
  SettingPage: undefined;
  LoginPage: undefined;
  SignUpPage: undefined;
  SelectLanguagePage: undefined;
  NotificationPage: undefined;
  SelectLanguageOnboardingPage: undefined;
  WebViewPage: { uri: string } | undefined;
  MyCartPage: undefined;
  PasswordReset: undefined;
};

export type RootNavigatorNavProps = StackNavigationProp<RootNavigatorProps>;

export type BottomTabNavigatorNavProps = StackNavigationProp<
  RootNavigatorProps,
  'BottomTabNavigator'
>;

export type RootRouteProps<RouteName extends keyof RootNavigatorProps> =
  RouteProp<RootNavigatorProps, RouteName>;

const StackNavigator = createStackNavigator<RootNavigatorProps>();
const screenOptions = { headerShown: false };

const RootNavigator = (): JSX.Element => {
  const theme = useAppTheme();
  return (
    <StackNavigator.Navigator
      screenOptions={screenOptions}
      initialRouteName='SplashPage'>
      <StackNavigator.Screen name='SplashPage' component={SplashPage} />
      <StackNavigator.Screen name='TestPage' component={TestPage} />
      <StackNavigator.Screen
        name='BottomTabNavigator'
        component={BottomTabNavigator}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='OnBoardingPage'
        component={OnBoardingPage}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='SelectLanguageOnboardingPage'
        component={SelectLanguageOnboardingPage}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='SettingPage'
        component={SettingPage}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='NotificationPage'
        component={NotificationPage}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='My Cart'
        component={MyCartPage}
        options={{
          gestureEnabled: false,
          headerShown: true,
          headerStyle: {
            backgroundColor: theme.colors.backgroundColorChild,
          },
          headerTitleStyle: {
            fontSize: 26,
            fontWeight: '600',
            lineHeight: 31.69,
            color: '#3E4958'
          },
          headerShadowVisible: false,
        }}
      />
      <StackNavigator.Screen
        name='My Wishlist'
        component={MyWishlistPage}
        options={{
          gestureEnabled: false,
          headerShown: true,
          headerStyle: {
            backgroundColor: theme.colors.backgroundColorChild,
          },
          headerTitleStyle: {
            fontSize: 26,
            fontWeight: '600',
            lineHeight: 31.69,
            color: '#3E4958'
          },
          headerShadowVisible: false
        }}
      />
      <StackNavigator.Screen
        name='Sign In'
        component={LoginPage}
        options={{ 
          gestureEnabled: false,
          headerShown: true,
          headerStyle: {
            backgroundColor: theme.colors.backgroundColorChild,
          },
          headerShadowVisible: false
        }}
      />
      <StackNavigator.Screen
        name='Sign Up'
        component={SignUpPage}
        options={{ 
          gestureEnabled: false,
          headerShown: true,
          headerStyle: {
            backgroundColor: theme.colors.backgroundColorChild,
          },
          headerTitleStyle: {
            fontSize: 26,
            fontWeight: '600',
            lineHeight: 31.69,
            color: '#3E4958'
          },
          headerShadowVisible: false
        }}
      />
      <StackNavigator.Screen
        name='SelectLanguagePage'
        component={SelectLanguagePage}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='WebViewPage'
        component={WebViewPage}
        options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
       name='Forgot Password'
       component={ForgotPassword}
       options={{ 
        gestureEnabled: false,
        headerShown: true,
        headerStyle: {
          backgroundColor: theme.colors.backgroundColorChild,
        },
        headerShadowVisible: false
      }}
      />
      <StackNavigator.Screen
       name='Recovery Code'
       component={RecoveryPage}
       options={{ 
        gestureEnabled: false,
        headerShown: true,
        headerStyle: {
          backgroundColor: theme.colors.backgroundColorChild,
        },
        headerShadowVisible: false
      }}
      />
      <StackNavigator.Screen
        name='New Password'
        component={NewPassword}
        options={{ 
         gestureEnabled: false,
         headerShown: true,
         headerStyle: {
           backgroundColor: theme.colors.backgroundColorChild,
         },
         headerShadowVisible: false
       }}
      />
      <StackNavigator.Screen
        name='PasswordReset'
        component={PasswordReset}
      />
      <StackNavigator.Screen
        name='Welcome back'
        component={LoginPage}
        options={{ 
         gestureEnabled: false,
         headerShown: true,
         headerStyle: {
           backgroundColor: theme.colors.backgroundColorChild,
         },
         headerShadowVisible: false
       }}
      />
    </StackNavigator.Navigator>
  );
};

export default RootNavigator;
