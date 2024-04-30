// src/app/features/user/userSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { loginUser, getUserProfile, registerUser } from './userAPI';    

interface UserState {
  user: IUser | null;
  status: 'idle' | 'loading' | 'failed';
  error: ApiError | null; // Custom error handling structure
}

interface IUser {
  email: string;
  name: string;
  token: string;
}

interface ApiError {
  message: string; 
}

const initialState: UserState = {
  user: null,
  status: 'idle',
  error: null
};

export const authenticateUser = createAsyncThunk<IUser, { email: string; password: string }, { rejectValue: ApiError }>(
    'user/login',
    async (userData, { rejectWithValue }) => {
      try {
        const response = await loginUser(userData);
        return response;
      } catch (error: any) {
        return rejectWithValue(error.response.data as ApiError);
      }
    }
  );


export const fetchUserProfile = createAsyncThunk<IUser, string, { rejectValue: ApiError }>(
  'user/profile',
  async (token, { rejectWithValue }) => {
    try {
      const response = await getUserProfile(token);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data as ApiError);
    }
  }
);

export const createUser = createAsyncThunk<IUser, { name: string; email: string; password: string }, { rejectValue: ApiError }>(
    'user/register',
    async (userData, { rejectWithValue }) => {
      try {
        const response = await registerUser(userData);
        return response;
      } catch (error: any) {
        return rejectWithValue(error.response.data as ApiError);
      }
    }
  );

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      logout: (state) => {
        state.user = null;
        state.status = 'idle';
        state.error = null;
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(authenticateUser.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(authenticateUser.fulfilled, (state, action: PayloadAction<IUser>) => {
          state.status = 'idle';
          state.user = action.payload;
          state.error = null;
        })
        .addCase(authenticateUser.rejected, (state, action: PayloadAction<ApiError | undefined>) => {
          state.status = 'failed';
          // Handle the potential undefined payload
          state.error = action.payload ?? { message: 'An unknown error occurred' };
        })
        .addCase(fetchUserProfile.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<IUser>) => {
          state.status = 'idle';
          state.user = action.payload;
          state.error = null;
        })
        .addCase(fetchUserProfile.rejected, (state, action: PayloadAction<ApiError | undefined>) => {
          state.status = 'failed';
          // Handle the potential undefined payload
          state.error = action.payload ?? { message: 'An unknown error occurred' };
        })
        .addCase(createUser.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(createUser.fulfilled, (state, action: PayloadAction<IUser>) => {
            state.status = 'idle';
            state.user = action.payload;
            state.error = null;
          })
          .addCase(createUser.rejected, (state, action: PayloadAction<ApiError | undefined>) => {
            state.status = 'failed';
            state.error = action.payload ?? { message: 'An unknown error occurred' };
          });
    }
  });
  

export const { logout } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.user;
export const selectUserStatus = (state: RootState) => state.user.status;
export const selectUserError = (state: RootState) => state.user.error;
export default userSlice.reducer;


