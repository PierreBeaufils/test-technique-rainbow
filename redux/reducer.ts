import { ADD_ADDRESS, DELETE_ADDRESS } from './actions'
import { AnyAction } from 'redux';
import { HYDRATE } from "next-redux-wrapper";

export interface State {
  currentAddress: string,
  addressList: string[];
}

export const initialState = {
  currentAddress: '',
  addressList: ['45 Rue Edouard Nortier, Neuilly-sur-Seine, France', '184 Rue du Faubourg Saint-Antoine, Paris, France'],
};

export function reducer(state: State = initialState, action: AnyAction) {
  switch (action.type) {
    case ADD_ADDRESS:
      return {
        ...state,
        addressList: [
          ...state.addressList, action.address
        ]
      };
    case DELETE_ADDRESS:
      return {
        ...state,
        addressList: state.addressList.filter(item => item !== action.address),
      };
    default:
      return state;
  }
}