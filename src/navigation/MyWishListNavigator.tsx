import { RouteProp } from '@react-navigation/native';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import MyWishlistPage from '~/screens/MyWishlist/MyWishlistPage';

const StackNavigator = createStackNavigator();

export type MyWishlistNavigatorProps = {
    MyWishlistPage: undefined;
};

export type MyWishlistPageNavProps = StackNavigationProp<
 MyWishlistNavigatorProps,
 'MyWishlistPage'
>;

const MyWishlistNavigator = (): JSX.Element => {
    return (
        <StackNavigator.Navigator
           initialRouteName='MyWishlistPage'
        >
            <StackNavigator.Screen
              name='MyWishlistPage'
              component={MyWishlistPage}
              options={{ gestureEnabled: false }}
            />
        </StackNavigator.Navigator>
    )
}
export default MyWishlistNavigator;