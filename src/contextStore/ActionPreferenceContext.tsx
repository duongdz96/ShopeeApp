import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  ReactNode,
  createContext,
  memo,
  useMemo,
  useReducer,
} from 'react';

import useCallbackRef from '~/hooks/useCallbackRef';

type ActionProps = {
  id: string,
  brand: string,
  price: number, 
  image: string,
  total: number,
  count: number,
  userID: string,
  database: Object,
  
};

type State = {
  result: ActionProps;
};

type Action =
  | {
      type: 'ADD_TO_CART';
      payload: {
        brand: string,
        image: string,
        price: number,
      };
    }

  | {
      type: 'CALCULATE_PRICE';
      payload: {
        total: number,
      };
    }

  | {
      type: 'COUNT_CART';
      payload: {
        count: number,
      };
    }
  | {
      type: 'GET_USER_ID';
      payload: {
        userID: string,
      };
    }
  | {
      type: 'SET_DATABASE';
      payload: {
        database: Object,
      }
    }  

type PreferenceActionsContextProps = {
  getActionStatePref: () => ActionProps;
  getDataCar : (item1: string, item2: string, item3: number, item4: number) => void;
  getTotalPrice : (item: number) => void;
  getNumberItem: (item: number) => void;
  getUserID: (item: string) => void;
  getDatabase: (item: object) => void;
  //Base preference action
};

type PreferenceContextProps = State;

const initialState: ActionProps = {
  id: '',
  brand: '',
  price: 0,
  total: 0,
  image: '',
  count: 0,
  userID: '',
  database: {},
  //Base initial state
};

const reducer = (state: State, action: Action): State => {
  const nextState = { ...state };

  switch (action.type) {
    case 'ADD_TO_CART':
      nextState.result.brand = action.payload.brand;
      nextState.result.image = action.payload.image;
      nextState.result.price = action.payload.price;
      break;
    case 'CALCULATE_PRICE':
      nextState.result.total = action.payload.total;
      break;
    case 'COUNT_CART':
      nextState.result.count = action.payload.count;
      break;
    case 'GET_USER_ID':
      nextState.result.userID = action.payload.userID;
      break;
    case 'SET_DATABASE':
      nextState.result.database = action.payload.database;
  }
  return nextState;
};

export const PreferenceActionsContext =
  createContext<PreferenceActionsContextProps>({
    getActionStatePref: () => initialState,
    getDataCar: ()=> {},
    getTotalPrice:()=>{},
    getNumberItem: () => {},
    getUserID: () => {},
    getDatabase: () => {},
  });

export const PreferenceContext = createContext<PreferenceContextProps>({
  result: initialState,
});

const ActionPreferenceProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [state, setState] = useReducer(reducer, { result: initialState });
  // const [isLocated, setIsLocated] = useState(false);

  const getActionStatePref = useCallbackRef(() => state.result);

  const getDataCar = useCallbackRef((item1: string, item2: string, item3: number) => {
    setState({
      type: 'ADD_TO_CART',
      payload: {
        brand: item1,
        image: item2,
        price: item3,
      },
    });
  });

  const getTotalPrice = useCallbackRef((item: number) => {
    setState({
      type: 'CALCULATE_PRICE',
      payload: {
        total: item,
      },
    });
  });
  const getNumberItem = useCallbackRef((item: number) => {
    setState({
      type: 'COUNT_CART',
      payload: {
        count: item,
      }
    })
  });
  const getUserID = useCallbackRef((item: string) => {
    setState({
      type: 'GET_USER_ID',
      payload: {
        userID: item,
      }
    })
  })
  const getDatabase = useCallbackRef((item: object) => {
    setState({
      type: 'SET_DATABASE',
      payload: {
        database: item,
      }
    })
  })
  const actionValues = useMemo(
    () => ({
      getActionStatePref,
      getDataCar,
      getTotalPrice,
      getNumberItem,
      getUserID,
      getDatabase,
    }),
    [],
  );

  return (
    <PreferenceActionsContext.Provider value={actionValues}>
      <PreferenceContext.Provider value={state}>
        {children}
      </PreferenceContext.Provider>
    </PreferenceActionsContext.Provider>
  );
};

export default memo(ActionPreferenceProvider);
