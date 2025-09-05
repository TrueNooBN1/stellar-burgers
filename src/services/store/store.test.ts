import { expect, test } from '@jest/globals'
import store from './store';
import { ConstructorSlice, initialState as constructorInitialState } from '../slices/ConstructorSlice/ConstructorSlice';
import { IngredientSlice, initialState as ingredientInitialState } from '../slices/IngredientSlice/IngredientSlice';
import { UserSlice, initialState as userInitialState } from '../slices/UserSlice/UserSlice';
import { OrderSlice, initialState as orderInitialState } from '../slices/OrderSlice/OrderSlice';
import { FeedSlice, initialState as feedInitialState } from '../slices/FeedSlice/FeedSlice';

describe('rootReducer test', ()=>{
  test('rootReducer init test', ()=>{
    const initialState = store.getState();
    expect(initialState).toEqual({
      [IngredientSlice.name]: ingredientInitialState,
      [ConstructorSlice.name]: constructorInitialState,
      [UserSlice.name]: userInitialState,
      [OrderSlice.name]: orderInitialState,
      [FeedSlice.name]: feedInitialState
    });
  });

  test('rootReducer unknown action test', ()=>{
    const initialState = store.getState();
    store.dispatch({ type: 'UNKNOWN_ACTION' });
    expect(store.getState()).toEqual(initialState);
  });
});