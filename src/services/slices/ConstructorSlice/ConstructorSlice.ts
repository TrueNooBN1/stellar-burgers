import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

interface IConstructorSlice {
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
  const newArr = [...arr];
  newArr[a] = arr[b];
  newArr[b] = arr[a];
  return newArr;
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
      state.ingredients = state.ingredients.filter(
        (value) => value.id !== action.payload
      );
    },
    ingredientToTop: (state, action: PayloadAction<TConstructorIngredient>) => {
      const index = state.ingredients.findIndex(
        (value) => value === action.payload
      );
      if (index > 0) {
        state.ingredients = swapByIndex(index, index - 1, state.ingredients);
      }
    },
    ingredientToBottom: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const index = state.ingredients.findIndex(
        (value) => value === action.payload
      );
      if (index < state.ingredients.length - 1) {
        state.ingredients = swapByIndex(index, index + 1, state.ingredients);
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
