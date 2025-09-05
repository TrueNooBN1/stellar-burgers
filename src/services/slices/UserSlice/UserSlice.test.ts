/**
 * @jest-environment jsdom
 */

import { describe, test } from '@jest/globals';

import { logoutUser, updateUser, getUserData, resetPassword, forgotPassword, loginUser, registerUser, initialState, UserSlice } from './UserSlice';
import { ReqStatus } from './../../../utils/types';

import { mockData } from './UserSliceMockData';



jest.mock('', ()=>({
  registerUserApi: jest.fn(),
  loginUserApi: jest.fn(),
  forgotPasswordApi: jest.fn(),
  resetPasswordApi: jest.fn(),
  getUserApi: jest.fn(),
  updateUserApi: jest.fn(),
  logoutApi: jest.fn(),
}));

describe('UserSlice Tests',()=>{

  describe('getUserData tests', ()=>{
    test('status update test "loading" is fine', ()=>{
      const requiredState = {
        ...initialState,
        loginUserRequestStatus: ReqStatus.Loading,
        isAuthChecked: false,
        isAuthenticated: false
      }

      const changedState = UserSlice.reducer(initialState, {type: getUserData.pending.type});
      expect(changedState).toEqual(requiredState);
    });

    test('status update test "succes" is fine', ()=>{
      const requiredState = {
        ...initialState,
        loginUserRequestStatus: ReqStatus.Success,
        data: mockData.user,
        isAuthChecked: true,
        isAuthenticated: true
      }

      const changedState = UserSlice.reducer(initialState, {type: getUserData.fulfilled.type, payload: mockData});
      expect(changedState).toEqual(requiredState);
    });  

    test('status update test "failed" catch error', ()=>{
      const requiredState = {
        ...initialState,
        loginUserRequestStatus: ReqStatus.Failed,
        loginUserError: "Error",
        isAuthChecked: true,
        isAuthenticated: false
      }

      const changedState = UserSlice.reducer(initialState, {type: getUserData.rejected.type, error: {message: "Error"}});
      expect(changedState).toEqual(requiredState);
    });  
  });

  describe('registerUser tests', ()=>{
    test('status update test "loading" is fine', ()=>{
      const requiredState = {
        ...initialState,
        loginUserRequestStatus: ReqStatus.Loading,
        isAuthChecked: false,
        isAuthenticated: false
      }

      const changedState = UserSlice.reducer(initialState, {type: registerUser.pending.type});
      expect(changedState).toEqual(requiredState);
    });

    test('status update test "succes" is fine', ()=>{
      const requiredState = {
        ...initialState,
        loginUserRequestStatus: ReqStatus.Success,
        data: mockData.user,
        isAuthChecked: true,
        isAuthenticated: true
      }

      const changedState = UserSlice.reducer(initialState, {type: registerUser.fulfilled.type, payload: mockData});
      expect(changedState).toEqual(requiredState);
    });  

    test('status update test "failed" catch error', ()=>{
      const requiredState = {
        ...initialState,
        loginUserRequestStatus: ReqStatus.Failed,
        loginUserError: "Error",
        isAuthChecked: false,
        isAuthenticated: false
      }
      const changedState = UserSlice.reducer(initialState, {type: registerUser.rejected.type, error: {message: "Error"}});
      expect(changedState).toEqual(requiredState);
    });  
  });

  describe('loginUser tests', ()=>{
    test('status update test "loading" is fine', ()=>{
      const requiredState = {
        ...initialState,
        loginUserRequestStatus: ReqStatus.Loading,
        isAuthChecked: false,
        isAuthenticated: false
      }

      const changedState = UserSlice.reducer(initialState, {type: loginUser.pending.type});
      expect(changedState).toEqual(requiredState);
    });

    test('status update test "succes" is fine', ()=>{
      const requiredState = {
        ...initialState,
        loginUserRequestStatus: ReqStatus.Success,
        data: mockData.user,
        isAuthChecked: true,
        isAuthenticated: true
      }

      const changedState = UserSlice.reducer(initialState, {type: loginUser.fulfilled.type, payload: mockData});
      expect(changedState).toEqual(requiredState);
    });  

    test('status update test "failed" catch error', ()=>{
      const requiredState = {
        ...initialState,
        loginUserRequestStatus: ReqStatus.Failed,
        loginUserError: "Error",
        isAuthChecked: true,
        isAuthenticated: false
      }
      const changedState = UserSlice.reducer(initialState, {type: loginUser.rejected.type, error: {message: "Error"}});
      expect(changedState).toEqual(requiredState);
    });  
  });

  describe('logoutUser tests', ()=>{
    test('status update test "loading" is fine', ()=>{
      const requiredState = {
        ...initialState,
        loginUserRequestStatus: ReqStatus.Loading,
      }

      const changedState = UserSlice.reducer(initialState, {type: logoutUser.pending.type});
      expect(changedState).toEqual(requiredState);
    });

    test('status update test "succes" is fine', ()=>{
      const requiredState = {
        ...initialState,
        loginUserRequestStatus: ReqStatus.Success,
        data: null,
        isAuthChecked: false,
        isAuthenticated: false
      }

      const changedState = UserSlice.reducer(initialState, {type: logoutUser.fulfilled.type});
      expect(changedState).toEqual(requiredState);
    });  

    test('status update test "failed" catch error', ()=>{
      const requiredState = {
        ...initialState,
        loginUserRequestStatus: ReqStatus.Failed,
        loginUserError: "Error",
      }
      const changedState = UserSlice.reducer(initialState, {type: logoutUser.rejected.type, error: {message: "Error"}});
      expect(changedState).toEqual(requiredState);
    });  
  });

  describe('updateUser tests', ()=>{
    test('status update test "loading" is fine', ()=>{
      const requiredState = {
        ...initialState,
        loginUserRequestStatus: ReqStatus.Loading,
      }

      const changedState = UserSlice.reducer(initialState, {type: updateUser.pending.type});
      expect(changedState).toEqual(requiredState);
    });

    test('status update test "succes" is fine', ()=>{
      const requiredState = {
        ...initialState,
        loginUserRequestStatus: ReqStatus.Success,
        data: mockData.user,
      }

      const changedState = UserSlice.reducer(initialState, {type: updateUser.fulfilled.type, payload: mockData});
      expect(changedState).toEqual(requiredState);
    });  

    test('status update test "failed" catch error', ()=>{
      const requiredState = {
        ...initialState,
        loginUserRequestStatus: ReqStatus.Failed,
        loginUserError: "Error",
      }
      const changedState = UserSlice.reducer(initialState, {type: updateUser.rejected.type, error: {message: "Error"}});
      expect(changedState).toEqual(requiredState);
    });  
  });

  describe('resetPassword tests', ()=>{
    test('status update test "loading" is fine', ()=>{
      const requiredState = {
        ...initialState,
        loginUserRequestStatus: ReqStatus.Loading,
      }

      const changedState = UserSlice.reducer(initialState, {type: resetPassword.pending.type});
      expect(changedState).toEqual(requiredState);
    });

    test('status update test "succes" is fine', ()=>{
      const requiredState = {
        ...initialState,
        loginUserRequestStatus: ReqStatus.Success,
      }

      const changedState = UserSlice.reducer(initialState, {type: resetPassword.fulfilled.type});
      expect(changedState).toEqual(requiredState);
    });  

    test('status update test "failed" catch error', ()=>{
      const requiredState = {
        ...initialState,
        loginUserRequestStatus: ReqStatus.Failed,
        loginUserError: "Error",
      }
      const changedState = UserSlice.reducer(initialState, {type: resetPassword.rejected.type, error: {message: "Error"}});
      expect(changedState).toEqual(requiredState);
    });  
  });

  describe('forgotPassword tests', ()=>{
    test('status update test "loading" is fine', ()=>{
      const requiredState = {
        ...initialState,
        loginUserRequestStatus: ReqStatus.Loading,
      }

      const changedState = UserSlice.reducer(initialState, {type: forgotPassword.pending.type});
      expect(changedState).toEqual(requiredState);
    });

    test('status update test "succes" is fine', ()=>{
      const requiredState = {
        ...initialState,
        loginUserRequestStatus: ReqStatus.Success,
      }

      const changedState = UserSlice.reducer(initialState, {type: forgotPassword.fulfilled.type});
      expect(changedState).toEqual(requiredState);
    });  

    test('status update test "failed" catch error', ()=>{
      const requiredState = {
        ...initialState,
        loginUserRequestStatus: ReqStatus.Failed,
        loginUserError: "Error",
      }
      const changedState = UserSlice.reducer(initialState, {type: forgotPassword.rejected.type, error: {message: "Error"}});
      expect(changedState).toEqual(requiredState);
    });  
  });

}); 

