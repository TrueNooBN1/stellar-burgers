import { configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import { ConstructorSlice } from './slices/ConstructorSlice/ConstructorSlice';
import { IngredientSlice } from './slices/IngredientSlice/IngredientSlice';
import { UserSlice } from './slices/UserSlice/UserSlice';
import { OrderSlice } from './slices/OrderSlice/OrderSlice';
import { FeedSlice } from './slices/FeedSlice/FeedSlice';

const rootReducer = {
  [IngredientSlice.name]: IngredientSlice.reducer,
  [ConstructorSlice.name]: ConstructorSlice.reducer,
  [UserSlice.name]: UserSlice.reducer,
  [OrderSlice.name]: OrderSlice.reducer,
  [FeedSlice.name]: FeedSlice.reducer
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
