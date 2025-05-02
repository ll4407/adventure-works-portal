// src/store/account.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../api/axios';
import { toast } from 'react-toastify';

// Thunk that returns rejectWithValue on error
export const loginAsync = createAsyncThunk(
  'account/login',
  async (formData, thunkAPI) => {
    try {
      const resp = await axios.post('/Login', formData);
      if (resp.data?.success) {
        return resp.data;
      }
      return thunkAPI.rejectWithValue('Invalid login response');
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      toast.error(msg);
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

const initialState = {
  account: null,
  status: 'idle',    // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null        // string on failure
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    logOut(state) {
      state.account = null;
      state.status = 'idle';
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    }
  },
  extraReducers: builder => {
    builder
      // set loading...
      .addCase(loginAsync.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      // on success...
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.account = action.payload;
      })
      // on error...
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  }
});

export const { logOut, clearError } = accountSlice.actions;
export default accountSlice.reducer;
