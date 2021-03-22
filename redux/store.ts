import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import { MakeStore, createWrapper, Context } from "next-redux-wrapper";

import { reducer, State } from './reducer';

// == Enhancers
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const enhancers = composeEnhancers();

// == Store
const store = createStore(
  reducer,
  //composeWithDevTools(applyMiddleware())
);
export default store;
/*
export const makeStore: MakeStore<State> = (context: Context) =>
  createStore(reducer, composeWithDevTools(applyMiddleware()));

export const wrapper = createWrapper<State>(makeStore, { debug: true });
*/