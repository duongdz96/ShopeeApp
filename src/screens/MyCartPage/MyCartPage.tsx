import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BackHandler,
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
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
import { PreferenceContext } from '~/contextStore/ActionPreferenceContext';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const MyCartPage = (): JSX.Element => {
  const { t } = useTranslation();
  const theme = useAppTheme();
  const navigation = useNavigation<RootNavigatorNavProps>();
  const { openModal } = useModalManager();
  const resultContext = usePreferenceContext();
  const topInsets = useTopInset();

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
        // justifyContent: 'center',
        // alignItems: 'center',
      },
    ],
    [theme],
  );
  const [cart, setCart] = useState([]);

useEffect(() => {
  const fetchCart = async () => {
    const cartData = await AsyncStorage.getItem('cart');
    if (cartData) {
      setCart(JSON.parse(cartData));
    }
  };

  fetchCart();
}, []);
const [search, setSearch] = useState('');
const {result} = useContext(PreferenceContext);
  return (
    <ScrollView style={styleContainer}>
      <View style={styles.header}>
        <Text style={{
          fontFamily: 'Roboto',
          fontWeight: '400',
          fontSize: 13,
          lineHeight: 24,
          marginBottom: 20,
        }}>Add more products to your cart!</Text>
      </View>
      <TextInput
        style={styles.textInput}
        value={search}
        onChangeText={setSearch}
        placeholder='Search'
      />
      <Text>{result.brand}</Text>
      <Text>{result.model}</Text>
      <Text>{result.year}</Text>
    </ScrollView>
  );
};

export default MyCartPage;

const styles = StyleSheet.create({
  header: {
    marginLeft: 25,
  },
  textInput: {
    width: 303,
    height: 60,
    borderWidth: 0.5,
    borderColor: '#D5DDE0',
    backgroundColor: '#F7F8F9',
    borderRadius: 14,
    alignSelf: 'center',
    textAlign: 'left',
    padding: 12,
    marginBottom: 40,
  },
  cardView: {
    width: 303,
    height: 112,
    borderWidth: 0.5,
    borderRadius: 14,
    backgroundColor: '#F7F8F9',
    borderColor: '#D5DDE0',
    alignSelf: 'center',
  }
});
