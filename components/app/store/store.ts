import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import { createLogger } from 'redux-logger';

import basketReducer from '../../features/basket/basketSlice';

import cakeReducer from '../../features/cake/cakeSlice';

import iceCreamReducer from '../../features/icecream/iceCreamSlice';

import userReducer from '../../features/user/userSlice';
import { MagazineApi } from './base/apiMagazineService';

// const logger = createLogger();

const rootReducers = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
  user: userReducer,
  basket: basketReducer,
  [MagazineApi.reducerPath]: MagazineApi.reducer,
});

const store = configureStore({
  reducer: rootReducers,
  middleware: (getMiddleware) => getMiddleware().concat(MagazineApi.middleware),
  // middleware: [thunkMiddleware],
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
