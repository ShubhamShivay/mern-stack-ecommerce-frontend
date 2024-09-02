import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import baseURL from "../../../utils/baseURL";
import {
  resetErrorAction,
  resetSuccessAction,
} from "../globalActions/globalActions";

// ! Initial State

const initialState = {
  loading: false,
  error: null,
  Users: [],
  user: {},
  profile: {},
  userAuth: {
    loading: false,
    error: null,
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

// ! Register user action
export const registerUseraction = createAsyncThunk(
  "users/register",
  async (
    { email, password, fullname },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const { data } = await axios.post(`${baseURL}users/register`, {
        fullname,
        email,
        password,
      });

      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! Login user action

export const loginUseraction = createAsyncThunk(
  "users/login",
  async ({ email, password }, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.post(`${baseURL}users/login`, {
        email,
        password,
      });

      //! save user data in local storage

      localStorage.setItem("userInfo", JSON.stringify(data));

      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data);
    }
  }
);

//! users slice

const userSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    // handle actions
    // ! Login user action
    builder
      .addCase(loginUseraction.pending, (state, action) => {
        state.userAuth.loading = true;
      })
      .addCase(loginUseraction.fulfilled, (state, action) => {
        state.userAuth.loading = false;
        state.userAuth.userInfo = action.payload;
      })
      .addCase(loginUseraction.rejected, (state, action) => {
        state.userAuth.loading = false;
        state.userAuth.error = action.payload;
      });

    // ! ----------------
    // ! Register user action
    // ! ----------------

    builder
      .addCase(registerUseraction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(registerUseraction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(registerUseraction.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });

    // ! ----------------
    // ! Reset error action
    // ! ----------------

    builder.addCase(resetErrorAction.pending, (state, action) => {
      state.error = null;
    });
  },
});

// Generate reducer and export
const userReducer = userSlice.reducer;
export default userReducer;
