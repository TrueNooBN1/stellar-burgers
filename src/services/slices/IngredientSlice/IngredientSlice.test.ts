import { describe, test } from '@jest/globals';

import { getIngredient, initialState, IngredientSlice } from './IngredientSlice';
import { ReqStatus } from './../../../utils/types';

import { mockData } from './IngredientSliceMockData'; 

jest.mock('', ()=>({
  getIngredientsApi: jest.fn()
}));

describe('IngredientsSlice Tests',()=>{
  test('status update test "loading" is fine', ()=>{
    const requiredState = {
      ...initialState,
      status: ReqStatus.Loading
    }

    const changedState = IngredientSlice.reducer(initialState, {type: getIngredient.pending.type});
    expect(changedState).toEqual(requiredState);
  });

  test('status update test "succes" is fine', ()=>{
    const requiredState = {
      ...initialState,
      status: ReqStatus.Success,
      ingredients: mockData
    }

    const changedState = IngredientSlice.reducer(initialState, {type: getIngredient.fulfilled.type, payload: mockData});
    expect(changedState).toEqual(requiredState);
  });  

  test('status update test "failed" catch error', ()=>{
    const requiredState = {
      ...initialState,
      status: ReqStatus.Failed,
      error: "Error"
    }

    const changedState = IngredientSlice.reducer(initialState, {type: getIngredient.rejected.type, error: {message: "Error"}});
    expect(changedState).toEqual(requiredState);
  });  
}); 

