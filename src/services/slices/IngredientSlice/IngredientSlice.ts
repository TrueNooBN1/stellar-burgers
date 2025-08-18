import { getIngredientsApi } from '../../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ReqStatus, TIngredient } from './../../../utils/types';

export const getIngredient = createAsyncThunk('ingredient', async () =>
  getIngredientsApi()
);

interface IIngredientSlice {
  ingredients: TIngredient[];
  status: ReqStatus;
  error?: string | null;
}

export const initialState: IIngredientSlice = {
  ingredients: [],
  status: ReqStatus.Idle,
  error: null
};

export const IngredientSlice = createSlice({
  name: 'ingredient',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredient.pending, (state) => {
        (state.status = ReqStatus.Loading), (state.error = null);
      })
      .addCase(getIngredient.fulfilled, (state, action) => {
        state.status = ReqStatus.Success;
        state.error = null;
        state.ingredients = action.payload;
      })
      .addCase(getIngredient.rejected, (state, action) => {
        (state.status = ReqStatus.Failed), (state.error = action.error.message);
      });
  },
  selectors: {
    ingredientsSelector: (state) => state.ingredients,
    ingredientsStatusSelector: (state) => state.status,
    ingredientsSelectorById: (state, id: string) =>
      state.ingredients.filter((value) => value._id === id)
  }
});

export const {
  ingredientsSelector,
  ingredientsStatusSelector,
  ingredientsSelectorById
} = IngredientSlice.selectors;

export const IngredientSliceReducer = IngredientSlice.reducer;
