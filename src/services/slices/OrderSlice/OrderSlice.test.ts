import { describe, test } from '@jest/globals';

import { getOrders, getOrderByNumber, submitOrder, initialState, OrderSlice,  } from "./OrderSlice";
import { ReqStatus } from './../../../utils/types';

import { allOrdersMockData, orderMockData } from './OrderSliceMockData'

jest.mock('', ()=>({
  getOrdersApi: jest.fn(),
  getOrderByNumberApi: jest.fn(),
  orderBurgerApi: jest.fn()
}));

describe('OrderSlice Tests',()=>{

  describe('getOrders action test', ()=>{
    test('status update test "loading" is fine', ()=>{
      const requiredState = {
        ...initialState,
        status: ReqStatus.Loading
      }

      const changedState = OrderSlice.reducer(initialState, {type: getOrders.pending.type});
      expect(changedState).toEqual(requiredState);
    });

    test('status update test "succes" is fine', ()=>{
      const requiredState = {
        ...initialState,
        status: ReqStatus.Success,
        orders: allOrdersMockData
      }

      const changedState = OrderSlice.reducer(initialState, {type: getOrders.fulfilled.type, payload: allOrdersMockData});
      expect(changedState).toEqual(requiredState);
    });  

    test('status update test "failed" catch error', ()=>{
      const requiredState = {
        ...initialState,
        status: ReqStatus.Failed,
        error: "Error"
      }

      const changedState = OrderSlice.reducer(initialState, {type: getOrders.rejected.type, error: {message: "Error"}});
      expect(changedState).toEqual(requiredState);
    });  
  });

  describe('submitOrder action test', ()=>{
    test('status update test "loading" is fine', ()=>{
      const requiredState = {
        ...initialState,
        status: ReqStatus.Loading
      }

      const changedState = OrderSlice.reducer(initialState, {type: submitOrder.pending.type});
      expect(changedState).toEqual(requiredState);
    });


    test('status update test "succes" is fine', ()=>{
      
      const requiredState = {
        ...initialState,
        status: ReqStatus.Success,
        order: orderMockData.order,
      }

      const changedState = OrderSlice.reducer(initialState, {type: submitOrder.fulfilled.type, payload: orderMockData});
      expect(changedState).toEqual(requiredState);
    });  

    test('status update test "failed" catch error', ()=>{
      const requiredState = {
        ...initialState,
        status: ReqStatus.Failed,
        error: "Error"
      }

      const changedState = OrderSlice.reducer(initialState, {type: submitOrder.rejected.type, error: {message: "Error"}});
      expect(changedState).toEqual(requiredState);
    });  
  });

  describe('getOrderByNumber action test', ()=>{
    test('status update test "loading" is fine', ()=>{
      const requiredState = {
        ...initialState,
        status: ReqStatus.Loading
      }

      const changedState = OrderSlice.reducer(initialState, {type: getOrderByNumber.pending.type});
      expect(changedState).toEqual(requiredState);
    });


    test('status update test "succes" is fine', ()=>{
      
      const requiredState = {
        ...initialState,
        status: ReqStatus.Success,
        order: orderMockData.order,
      }

      const changedState = OrderSlice.reducer(initialState, {type: getOrderByNumber.fulfilled.type, payload: {orders: [orderMockData.order]}});
      expect(changedState).toEqual(requiredState);
    });  

    test('status update test "failed" catch error', ()=>{
      const requiredState = {
        ...initialState,
        status: ReqStatus.Failed,
        error: "Error"
      }

      const changedState = OrderSlice.reducer(initialState, {type: getOrderByNumber.rejected.type, error: {message: "Error"}});
      expect(changedState).toEqual(requiredState);
    });  
  });
}); 

