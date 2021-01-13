import { applyMiddleware, createStore, Store } from 'redux';
import thunk from 'redux-thunk';

import { fetchDataMiddleware, reducer } from '../store/reducers/reducer';

// setting fetchDataMiddleware function as a Middleware for the user store
const middlewareData = applyMiddleware(fetchDataMiddleware);

export const store: Store<UserState, UserAction> & {
  dispatch: DispatchType
// creating a store with the reducer created previously and passing the middleware config that allows run fetchDataMiddleware before anything
} = createStore(reducer, middlewareData)

export const dispatch = store.dispatch;

export default store;