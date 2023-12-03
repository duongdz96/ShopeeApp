import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BackHandler,
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import ExitApp from 'react-native-exit-app';

import { useTopInset } from '~/hooks/useInset';
import useModalManager from '~/hooks/useModalManager';
import usePreferenceContext from '~/hooks/usePreferenceContext';

import { useAppTheme } from '~/resources/theme';

import { RootNavigatorNavProps } from '~/navigation/RootNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '~/base/Button';
import { PreferenceActionsContext } from '~/contextStore/ActionPreferenceContext';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const MyWishlistPage = ({route}): JSX.Element => {
  const { t } = useTranslation();
  const theme = useAppTheme();
  const navigation = useNavigation<RootNavigatorNavProps>();
  const { openModal } = useModalManager();
  const resultContext = usePreferenceContext();
  const topInsets = useTopInset();
  const [quantity, setQuantity] = useState(1);
  useFocusEffect(
    React.useCallback(() => {
      let backButtonPressCount = 0;
      let backButtonPressTimer: ReturnType<typeof setTimeout> = null;

      const onBackPress = () => {
        if (backButtonPressCount === 1) {
          ExitApp.exitApp();
          return true;
        } else {
          backButtonPressCount++;
          backButtonPressTimer = setTimeout(() => {
            backButtonPressCount = 0;
            clearTimeout(backButtonPressTimer);
          }, 2000);
          return true;
        }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        backHandler.remove();
      };
    }, []),
  );

  const styleContainer = useMemo<StyleProp<ViewStyle>>(
    () => [
      {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    ],
    [theme],
  );
  // const [car, setCar] = useState('');
  // useEffect(() => {
  //   const getSelectedCar = async () => {
  //     try {
  //       const savedCar = await AsyncStorage.getItem('selectedCar');
  //       if (savedCar) {
  //         setCar(JSON.parse(savedCar));
  //       }
  //     } catch (error) {
  //       console.error('Error retrieving data', error);
  //     }
  //   };

  //   getSelectedCar();
  // }, []);

  const {carDetails} = route.params;
  const {getDataCar} = useContext(PreferenceActionsContext);
  const {getTotalPrice} = useContext(PreferenceActionsContext);
  const handelAddToCart = () => {
    getDataCar(carDetails.brand, carDetails.model, carDetails.year, carDetails.price);
    navigation.navigate('My Cart');
  }
  return (
    <SafeAreaView style={styleContainer}>
      <View style={{
        
      }}>
        <Image source={{uri: carDetails.image}} style={{width: 200, height: 200}}/>
        <Text style={styles.textItem}>Brand: {carDetails.brand}</Text>
        <Text style={styles.textItem}>Model: {carDetails.model}</Text>
        <Text style={styles.textItem}>Year: {carDetails.year}</Text>
        <Text style={styles.textItem}>Price: ${carDetails.price}</Text>
      </View>
        <View style={{
        }}>
          <Button
            type='modal'
            mode='orange'
            textColor='#FFFFFF'
            onPress={handelAddToCart}
          >
           Add to cart
          </Button>
        </View>
    </SafeAreaView>
  );
};

export default MyWishlistPage;

const styles = StyleSheet.create({
  textItem: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: 20,
    color: '#3E4958',
  }
});
