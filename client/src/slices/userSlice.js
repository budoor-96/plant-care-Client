
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://plant-care-server.onrender.com";

//Register new user
export const registerThunk = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Server error", success: false }
      );
    }
  }
);

// Login user
export const loginThunk = createAsyncThunk(
  "user/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, loginData);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Server error", success: false }
      );
    }
  }
);

const initialState = {
  user: null,
  token: null,
  msg: null,
  success: false,
  loading: false
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.msg = null;
      state.success = false;
    },
    reset: (state) => {
      state.msg = null;
      state.success = false;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      
      // REGISTER
      
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
         state.msg = null; 
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.msg = action.payload.message;
        state.success = action.payload.success;
        state.loading = false;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.msg = action.payload?.message || "Registration failed";
        state.success = false;
        state.loading = false;
      })

      
      // LOGIN
      
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.msg = null;   // clear old messages
})

      .addCase(loginThunk.fulfilled, (state, action) => {
        state.msg = action.payload.message;
        state.success = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.loading = false;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.msg = action.payload?.message || "Login failed";
        state.success = false;
        state.loading = false;
      });
  }
});

export const { logout, reset } = userSlice.actions;
export default userSlice.reducer;

