import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  NavigatorScreenParams,
  RouteProp,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import LottieView from 'lottie-react-native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Platform, View } from 'react-native';

import { useBottomInset } from '~/hooks/useInset';
import usePreferenceContext from '~/hooks/usePreferenceContext';

import getImage from '~/libs/getImage';

import IconHome from '~/resources/Icons/IconBottomBar/IconHome';
import IconLocated from '~/resources/Icons/IconBottomBar/IconLocated';
import IconMusic from '~/resources/Icons/IconBottomBar/IconMusic';
import IconProfile from '~/resources/Icons/IconBottomBar/IconProfile';
import { useAppTheme } from '~/resources/theme';

import { ANDROID_BANNER, IOS_BANNER } from '@env';
import TextGradient from '~/base/TextGradient';

import HomeNavigator, { HomeNavigatorProps } from './HomeNavigator';
import LibraryNavigator, { LibraryNavigatorProps } from './LibraryNavigator';
import NotificationNavigator, {
  NotificationNavigatorProps,
} from './NotificationNavigator';
import ProfileNavigator, { ProfileNavigatorProps } from './ProfileNavigator';
import { RootNavigatorProps } from './RootNavigator';
import { MyCartNavigatorProps } from './MyCartNavigator';
import { UseHandlerContext } from 'react-native-reanimated/lib/typescript/reanimated2/hook/utils';

export type BottomTabNavigatorProps = {
  HomeNavigator: NavigatorScreenParams<HomeNavigatorProps> | undefined;
  LibraryNavigator: NavigatorScreenParams<LibraryNavigatorProps> | undefined;
  NotificationNavigator:
    | NavigatorScreenParams<NotificationNavigatorProps>
    | undefined;
  ProfileNavigator: NavigatorScreenParams<ProfileNavigatorProps> | undefined;
  MyCartNavigator: NavigatorScreenParams<MyCartNavigatorProps> | undefined;
  MyWishlistNavigator: NavigatorScreenParams<MyCartNavigatorProps> | undefined;
};

export type BottomTabNavigatorRouteProps = RouteProp<BottomTabNavigatorProps>;

export type BottomTabNavigatorNavProps = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabNavigatorProps>,
  StackNavigationProp<RootNavigatorProps>
>;

export type HomeNavigatorNavProps = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabNavigatorProps, 'HomeNavigator'>,
  StackNavigationProp<RootNavigatorProps>
>;

export type HomeNavigatorRouteProps = RouteProp<
  BottomTabNavigatorProps,
  'HomeNavigator'
>;

export type LibraryNavigatorNavProps = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabNavigatorProps, 'LibraryNavigator'>,
  StackNavigationProp<RootNavigatorProps>
>;

export type LibraryNavigatorRouteProps = RouteProp<
  BottomTabNavigatorProps,
  'LibraryNavigator'
>;

export type ProfileNavigatorNavProps = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabNavigatorProps, 'ProfileNavigator'>,
  StackNavigationProp<RootNavigatorProps>
>;

export type ProfileNavigatorRouteProps = RouteProp<
  BottomTabNavigatorProps,
  'ProfileNavigator'
>;

export type NotificationNavigatorNavProps = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabNavigatorProps, 'NotificationNavigator'>,
  StackNavigationProp<RootNavigatorProps>
>;

export type NotificationNavigatorRouteProps = RouteProp<
  BottomTabNavigatorProps,
  'NotificationNavigator'
>;

export type MyCartNavigatorNavProps = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabNavigatorProps, 'MyCartNavigator'>,
  StackNavigationProp<RootNavigatorProps>
>;
export type MyWishlistNavigatorNavProps = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabNavigatorProps, 'MyWishlistNavigator'>,
  StackNavigationProp<RootNavigatorProps>
>;
const ID_ADS_BANNER = Platform?.OS === 'ios' ? IOS_BANNER : ANDROID_BANNER;

const BottomTabNavigator = (): JSX.Element => {
  const theme = useAppTheme();
  const Tab = createBottomTabNavigator();
  const { t } = useTranslation();
  const bottomInset = useBottomInset();

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        // tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.colors.backgroundColor,
            borderTopColor: '#9E9E9E',
            borderTopWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 10,
            // height: 60,
            // paddingBottom: 10,
            paddingBottom: Platform.OS === 'ios' ? 24 : 10,
            height: Platform.OS === 'android' ? 60 : bottomInset + 44,
          },
          tabBarActiveTintColor: theme.colors.titleActive,
          tabBarInactiveTintColor: theme.colors.title,
        }}>
        <Tab.Screen
          name='HomeNavigator'
          component={HomeNavigator}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ focused }) =>
                <Image source={getImage('homeAnimate')} style={{height: 16, width: 19}}/>

          }}
        />

        <Tab.Screen
          name='LibraryNavigator'
          component={LibraryNavigator}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ focused }) =>
              <Image source={getImage('heart')} style={{
                height: 16,
                width: 19,
                tintColor: focused ? 'white' : undefined
              }}/>
          }}
        />

        <Tab.Screen
          name='NotificationNavigator'
          component={NotificationNavigator}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ focused }) =>
            <Image source={getImage('whilist')} style={{height: 16, width: 16}}/>
          }}
        />

        <Tab.Screen
          name='ProfileNavigator'
          component={ProfileNavigator}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ focused }) =>
            <Image source={getImage('profile')} style={{height: 18, width: 18}}/>
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default BottomTabNavigator;
