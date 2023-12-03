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
  model: string,
  year: number,
  price: number, 
  image: string,
  total: number,
};

type State = {
  result: ActionProps;
};

type Action =
  | {
      type: 'ADD_TO_CART';
      payload: {
        brand: string,
        model: string,
        year: number,
        price: number,
      };
    }
  | {
      type: 'CALCULATE_PRICE';
      payload: {
        total: number,
      };
    };

type PreferenceActionsContextProps = {
  getActionStatePref: () => ActionProps;
  getDataCar : (item1: string, item2: string, item3: number, item4: number) => void;
  getTotalPrice : (item: number) => void;
  //Base preference action
};

type PreferenceContextProps = State;

const initialState: ActionProps = {
  id: '',
  brand: '',
  model: '',
  year: 0,
  price: 0,
  total: 0,
  image: '',
  //Base initial state
};

const reducer = (state: State, action: Action): State => {
  const nextState = { ...state };

  switch (action.type) {
    case 'ADD_TO_CART':
      nextState.result.brand = action.payload.brand;
      nextState.result.model = action.payload.model;
      nextState.result.year = action.payload.year;
      nextState.result.price = action.payload.price;
      break;
    case 'CALCULATE_PRICE':
      nextState.result.total = action.payload.total;
        
  }

  return nextState;
};

export const PreferenceActionsContext =
  createContext<PreferenceActionsContextProps>({
    getActionStatePref: () => initialState,
    getDataCar: ()=> {},
    getTotalPrice:()=>{},
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

  const getDataCar = useCallbackRef((item1: string, item2: string, item3: number, item4: number) => {
    setState({
      type: 'ADD_TO_CART',
      payload: {
        brand: item1,
        model: item2,
        year: item3,
        price: item4,
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

  const actionValues = useMemo(
    () => ({
      getActionStatePref,
      getDataCar,
      getTotalPrice,
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
