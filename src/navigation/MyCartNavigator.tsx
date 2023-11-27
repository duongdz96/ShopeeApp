import { RouteProp } from '@react-navigation/native';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import MyCartPage from '~/screens/MyCartPage/MyCartPage';

import NotificationPage from '~/screens/NotificationPage/NotificationPage';

const StackNavigator = createStackNavigator();

export type MyCartNavigatorProps = {
    MyCartPage: undefined;
};

export type MyCartPageNavProps = StackNavigationProp<
 MyCartNavigatorProps,
 'MyCartPage'
>;

const MyCartNavigator = (): JSX.Element => {
    return (
        <StackNavigator.Navigator
           initialRouteName='MyCartPage'
        >
            <StackNavigator.Screen
              name='MyCartPage'
              component={MyCartPage}
              options={{ gestureEnabled: false }}
            />
        </StackNavigator.Navigator>
    )
}
export default MyCartNavigator;