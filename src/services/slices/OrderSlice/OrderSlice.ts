import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from "./../../../utils/burger-api";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ReqStatus, TOrder } from './../../../utils/types';

export const getOrders = createAsyncThunk('orders', async ()=>{
  getOrdersApi();
})

export const getOrderByNumber = createAsyncThunk('orderByNumber', async (number: number)=>{
  getOrderByNumberApi(number);
})

export const submitOrder = createAsyncThunk('submitOrder' async (ingredients: string[], {rejectWithValue})=>{
  const reply = await orderBurgerApi(ingredients);
  if(!reply.success)
    rejectWithValue(reply);
  return reply
});

interface IOrderSlice {
  orders: TOrder[],
  order: TOrder,
  status: ReqStatus,
  error: string | null
}


