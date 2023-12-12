import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BackHandler,
  Dimensions,
  FlatList,
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
import { PreferenceActionsContext, PreferenceContext } from '~/contextStore/ActionPreferenceContext';
import Button from '~/base/Button';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { FIREBASE_DB } from '~/Firebase/UserData';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const LibraryPage = (): JSX.Element => {
  const { t } = useTranslation();
  const theme = useAppTheme();
  const navigation = useNavigation<RootNavigatorNavProps>();
  const { openModal } = useModalManager();
  const resultContext = usePreferenceContext();
  const topInsets = useTopInset();
  const {getTotalPrice} = useContext(PreferenceActionsContext);
  const [search, setSearch] = useState('');
  const {result} = useContext(PreferenceContext);
  const {getNumberItem} = useContext(PreferenceActionsContext);
  const [code, setCode] = useState('');
  const [favor, setFavor] = useState([]);
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
        // alignContent: 'center',
      },
    ],
    [theme],
  );
  const fetchFavor = async (userUID) => {
    try {
      const favorCollectionRef = collection(FIREBASE_DB, 'favorite');
      if (userUID) {
        const userDocRef = doc(favorCollectionRef, userUID);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          return userDocSnapshot.data().favorites || [];
        } else {
          return [];
        }
      } else {
        console.log('User is not authenticated');
        return [];
      }
    } catch (error) {
      console.error('Error retrieving data', error);
      return [];
    }
  };
    useEffect(() => {
      const userUID = result.userID;
      const loadFavor = async () => {
        const fetchFavorites = await fetchFavor(userUID);
        setFavor(fetchFavorites);
      }
      loadFavor();
    }, [result.userID]);
  return (
    <ScrollView style={styleContainer}>
      <TextInput
        style={styles.textInput}
        value={search}
        onChangeText={setSearch}
        placeholder='Search'
      />
      <FlatList
       data={favor}
       keyExtractor={(item) => item.id}
       renderItem={({ item }) => (
       <TouchableOpacity style={styles.cardView}>
         <View style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
          paddingVertical: 5,
         }}>
          <Image source={{uri: item.image}} style={{
            width: 92.59,
            height: 100,
            borderRadius: 7.41,
            borderWidth: 0.37,
            borderColor: '#D5DDE0',
          }}/>
          <View style={{
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}>
            <Text style={{
              fontFamily: 'Montserrat',
              fontWeight: '600',
              fontSize: 14,
              lineHeight: 17.07,
              color: '#3E4958',
              marginBottom: 5,
            }}>{item.brand}</Text>
            <Text style={{
              fontFamily: 'Montserrat',
              fontWeight: '700',
              fontSize: 14,
              lineHeight: 17.07,
              color: '#3E4958'
            }}>${item.price}</Text>
          </View>
         </View>
       </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
};

export default LibraryPage;

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
    marginBottom: 10,
    marginTop: 100,
  },
  cardView: {
    width: 303,
    height: 112,
    borderWidth: 0.5,
    borderRadius: 14,
    backgroundColor: '#F7F8F9',
    borderColor: '#D5DDE0',
    alignSelf: 'center',
    marginBottom: 30,
  },
  rightAction: {

  },
  actionText: {
    
  }
});
