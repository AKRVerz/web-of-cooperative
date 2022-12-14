import { composeWithDevToolsDevelopmentOnly } from '@redux-devtools/extension';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as reducers from './reducers';
import { applyInterceptors } from './axios';

const rootReducer = combineReducers(reducers);
const composeEnhancers = composeWithDevToolsDevelopmentOnly({});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

applyInterceptors(store.dispatch);

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
