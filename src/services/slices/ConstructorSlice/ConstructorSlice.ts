import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { ReqStatus, TConstructorIngredient, TIngredient } from '@utils-types';

export interface IConstructorSlice {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

export const initialState: IConstructorSlice = {
  bun: null,
  ingredients: []
};

const swapByIndex = (
  a: number,
  b: number,
  arr: TConstructorIngredient[]
): TConstructorIngredient[] => {
  arr[a] = arr.splice(b, 1, arr[a])[0];
  return arr;
};

export const ConstructorSlice = createSlice({
  name: 'Constructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    deleteIngredient: (state, action: PayloadAction<string>) => {
      const searchIndex = state.ingredients.findIndex(
        (value) => value._id === action.payload
      );
      if (searchIndex !== -1)
        state.ingredients = state.ingredients.filter(
          (value, index) => index !== searchIndex
        );
    },
    ingredientToTop: (state, action: PayloadAction<string>) => {
      const index = state.ingredients.findIndex(
        (value) => value._id === action.payload
      );
      if (index > 0) {
        state.ingredients = swapByIndex(index - 1, index, state.ingredients);
      }
    },
    ingredientToBottom: (state, action: PayloadAction<string>) => {
      const index = state.ingredients.findIndex(
        (value) => value._id === action.payload
      );
      if (index < state.ingredients.length - 1) {
        state.ingredients = swapByIndex(index + 1, index, state.ingredients);
      }
    },
    clearIngredients: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    constructorIngredientsSelector: (state) => state
  }
});

export const { constructorIngredientsSelector } = ConstructorSlice.selectors;
export const {
  addIngredient,
  deleteIngredient,
  ingredientToTop,
  ingredientToBottom,
  clearIngredients
} = ConstructorSlice.actions;
