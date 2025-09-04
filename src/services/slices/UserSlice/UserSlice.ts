import {
  registerUserApi,
  loginUserApi,
  forgotPasswordApi,
  resetPasswordApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  TLoginData,
  TRegisterData
} from '../../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ReqStatus, TUser } from '../../../utils/types';
import { deleteCookie, setCookie } from '../../../utils/cookie';

export const registerUser = createAsyncThunk(
  'registerUser',
  async (data: TRegisterData, { rejectWithValue }) => {
    const reply = await registerUserApi(data);
    return reply.success ? reply : rejectWithValue(reply);
  }
);

export const loginUser = createAsyncThunk(
  'loginUser',
  async (data: TLoginData, { rejectWithValue }) => {
    const reply = await loginUserApi(data);
    return reply.success ? reply : rejectWithValue(reply);
  }
);

export const forgotPassword = createAsyncThunk(
  'forgotPassword',
  async (data: { email: string }, { rejectWithValue }) => {
    const reply = await forgotPasswordApi(data);
    return reply.success ? reply : rejectWithValue(reply);
  }
);

export const resetPassword = createAsyncThunk(
  'resetPassword',
  async (data: { password: string; token: string }, { rejectWithValue }) => {
    const reply = await resetPasswordApi(data);
    return reply.success ? reply : rejectWithValue(reply);
  }
);

export const getUserData = createAsyncThunk(
  'userData',
  async (_, { rejectWithValue }) => {
    const reply = await getUserApi();
    return reply.success ? reply : rejectWithValue(reply);
  }
);

export const updateUser = createAsyncThunk(
  'updateUser',
  async (data: Partial<TRegisterData>, { rejectWithValue }) => {
    const reply = await updateUserApi(data);
    return reply.success ? reply : rejectWithValue(reply);
  }
);

export const logoutUser = createAsyncThunk(
  'logoutUser',
  async (_, { rejectWithValue }) => {
    const reply = await logoutApi();
    return reply.success ? reply : rejectWithValue(reply);
  }
);

interface IUserSlice {
  isAuthChecked: boolean; // флаг для статуса проверки токена пользователя
  isAuthenticated: boolean;
  data: TUser | null;
  loginUserError: string | null | undefined;
  loginUserRequestStatus: ReqStatus;
}

export const initialState: IUserSlice = {
  isAuthChecked: false,
  isAuthenticated: false,
  data: null,
  loginUserError: null,
  loginUserRequestStatus: ReqStatus.Idle
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isAuthChecked = false;
        state.isAuthenticated = false;
        state.loginUserRequestStatus = ReqStatus.Loading;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loginUserRequestStatus = ReqStatus.Success;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.data = action.payload.user;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        state.loginUserError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.isAuthenticated = false;
        state.loginUserRequestStatus = ReqStatus.Failed;
        state.loginUserError = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.isAuthChecked = false;
        state.isAuthenticated = false;
        state.loginUserRequestStatus = ReqStatus.Loading;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginUserRequestStatus = ReqStatus.Success;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.data = action.payload.user;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        state.loginUserError = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginUserRequestStatus = ReqStatus.Failed;
        state.loginUserError = action.error.message;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loginUserRequestStatus = ReqStatus.Loading;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loginUserRequestStatus = ReqStatus.Success;
        state.loginUserError = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loginUserRequestStatus = ReqStatus.Failed;
        state.loginUserError = action.error.message;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loginUserRequestStatus = ReqStatus.Loading;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loginUserRequestStatus = ReqStatus.Success;
        state.loginUserError = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loginUserRequestStatus = ReqStatus.Failed;
        state.loginUserError = action.error.message;
      })
      .addCase(getUserData.pending, (state) => {
        state.loginUserRequestStatus = ReqStatus.Loading;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.loginUserRequestStatus = ReqStatus.Success;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.data = action.payload.user;
        state.loginUserError = null;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.loginUserRequestStatus = ReqStatus.Failed;
        state.loginUserError = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.loginUserRequestStatus = ReqStatus.Loading;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loginUserRequestStatus = ReqStatus.Success;
        state.data = action.payload.user;
        state.loginUserError = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loginUserRequestStatus = ReqStatus.Failed;
        state.loginUserError = action.error.message;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loginUserRequestStatus = ReqStatus.Loading;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isAuthenticated = false;
        state.loginUserRequestStatus = ReqStatus.Success;
        state.data = null;
        state.loginUserError = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loginUserRequestStatus = ReqStatus.Failed;
        state.loginUserError = action.error.message;
      });
  },
  selectors: {
    userAuthCheckedSelector: (state) => state.isAuthChecked,
    userAuthenticatedSelector: (state) => state.isAuthenticated,
    userDataSelector: (state) => state.data,
    userRequestStatusSelector: (state) => state.loginUserRequestStatus
  }
});

export const {
  userAuthCheckedSelector,
  userAuthenticatedSelector,
  userDataSelector,
  userRequestStatusSelector
} = UserSlice.selectors;
