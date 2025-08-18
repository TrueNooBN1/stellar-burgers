import { getFeedsApi } from '../../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ReqStatus, TOrdersData } from './../../../utils/types';

export const getFeed = createAsyncThunk('feed', async () => getFeedsApi());

interface IFeedSlice {
  feed: TOrdersData;
  status: ReqStatus;
  error?: string | null;
}

export const initialState: IFeedSlice = {
  feed: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  status: ReqStatus.Idle,
  error: null
};

export const FeedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.status = ReqStatus.Loading;
        state.error = null;
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.feed = action.payload;
        state.status = ReqStatus.Success;
        state.error = null;
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.status = ReqStatus.Failed;
        state.error = action.error.message;
      });
  },
  selectors: {
    feedOrdersSelector: (state) => state.feed.orders,
    feedSelector: (state) => state.feed,
    feedStatusSelector: (state) => state.status
  }
});

export const { feedSelector, feedOrdersSelector, feedStatusSelector } =
  FeedSlice.selectors;

export const FeedSliceReducer = FeedSlice.reducer;
