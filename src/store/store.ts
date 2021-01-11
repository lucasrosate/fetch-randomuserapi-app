import { applyMiddleware, createStore, Store } from 'redux';

import { reducer } from '../store/reducers/reducer';
import thunk from 'redux-thunk';

const store: Store<UserState, UserAction> & {
    dispatch: DispatchType
  } = createStore(reducer, applyMiddleware(thunk))

  export default store;

  export const dispatch = store.dispatch;