import { RouteProp } from '@react-navigation/native';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import CheckOutPage from '~/screens/CheckOutPage/CheckOutPage';

const StackNavigator = createStackNavigator<CheckOutNavigatorProps>();
const screenOptions = { headerShown: false, tabBarHideOnKeyboard: true };

export type CheckOutNavigatorProps = {
  CheckOutPage: undefined;
};

export type CheckOutPageNavProps = StackNavigationProp<
  CheckOutNavigatorProps,
  'CheckOutPage'
>;
export type CheckOutPageRouteProps = RouteProp<
  CheckOutNavigatorProps,
  'CheckOutPage'
>;

const CheckOutNavigator = (): JSX.Element => {
  return (
    <StackNavigator.Navigator
      screenOptions={screenOptions}
      initialRouteName='CheckOutPage'>
      <StackNavigator.Screen
        name='CheckOutPage'
        component={CheckOutPage}
        options={{ gestureEnabled: false }}
      />
    </StackNavigator.Navigator>
  );
};

export default CheckOutNavigator;
