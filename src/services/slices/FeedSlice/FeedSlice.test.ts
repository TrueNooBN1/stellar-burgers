import { describe, test } from '@jest/globals';

import { getFeed, initialState, FeedSlice } from './FeedSlice';
import { ReqStatus } from './../../../utils/types';

import { mockData } from './feedSliceMockData';

jest.mock('', ()=>({
  getFeedsApi: jest.fn()
}));

describe('FeedSlice Tests',()=>{
  test('status update test "loading" is fine', ()=>{
    const requiredState = {
      ...initialState,
      status: ReqStatus.Loading
    }

    const changedState = FeedSlice.reducer(initialState, {type: getFeed.pending.type});
    expect(changedState).toEqual(requiredState);
  });

  test('status update test "succes" is fine', ()=>{
    const requiredState = {
      ...initialState,
      status: ReqStatus.Success,
      feed: mockData
    }

    const changedState = FeedSlice.reducer(initialState, {type: getFeed.fulfilled.type, payload: mockData});
    expect(changedState).toEqual(requiredState);
  });  

  test('status update test "failed" catch error', ()=>{
    const requiredState = {
      ...initialState,
      status: ReqStatus.Failed,
      error: "Error"
    }

    const changedState = FeedSlice.reducer(initialState, {type: getFeed.rejected.type, error: {message: "Error"}});
    expect(changedState).toEqual(requiredState);
  });  
}); 

