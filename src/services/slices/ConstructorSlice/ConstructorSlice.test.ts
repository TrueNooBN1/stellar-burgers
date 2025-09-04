import { describe, test } from '@jest/globals';

import { addIngredient, deleteIngredient, ingredientToBottom, ingredientToTop, initialState, ConstructorSlice, IConstructorSlice} from './ConstructorSlice';

import { first_ingredient, second_ingredient } from './ConstructoSliceMockData';


describe('ConstructorSlice Tests',()=>{
  let currentState: IConstructorSlice = initialState;

  beforeEach(() => {
    // Сбрасываем состояние перед каждым тестом
    currentState = { ...initialState };
  });

  test('addIngredient test', ()=>{
    currentState = ConstructorSlice.reducer(currentState, addIngredient(first_ingredient));

    const { id, ...ingredientWithoutId } = currentState.ingredients[0];

    expect(first_ingredient).toEqual(ingredientWithoutId);
  });

  test('deleteIngredient test', ()=>{
    currentState = ConstructorSlice.reducer(currentState, addIngredient(first_ingredient));

    const { _id, ...ingredientWithoutId } = currentState.ingredients[0];

    currentState = ConstructorSlice.reducer(currentState, deleteIngredient(_id));

    expect(currentState.ingredients).toHaveLength(0);

  });

  test('ingredientToBottom test', ()=>{
    currentState = ConstructorSlice.reducer(currentState, addIngredient(first_ingredient));
    currentState = ConstructorSlice.reducer(currentState, addIngredient(second_ingredient));
    currentState = ConstructorSlice.reducer(currentState, ingredientToBottom(first_ingredient._id));
    expect(currentState.ingredients[0]._id).toEqual(second_ingredient._id);
    expect(currentState.ingredients[1]._id).toEqual(first_ingredient._id);
  })

  test('ingredientToTop test', ()=>{
    currentState = ConstructorSlice.reducer(currentState, addIngredient(first_ingredient));
    currentState = ConstructorSlice.reducer(currentState, addIngredient(second_ingredient));
    currentState = ConstructorSlice.reducer(currentState, ingredientToTop(second_ingredient._id));
    expect(currentState.ingredients[0]._id).toEqual(second_ingredient._id);
    expect(currentState.ingredients[1]._id).toEqual(first_ingredient._id);
  })
}); 

