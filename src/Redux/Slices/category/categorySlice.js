import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

// ! Initial State

const initialState = {
  loading: false,
  error: null,
  categories: [],
  category: {},
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

// ! Create Category Action

export const createCategoryAction = createAsyncThunk(
  "categories/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { name } = payload;

      // ! Make the request
      // ! Token - Authentication

      const token = getState()?.users?.userAuth?.userInfo?.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `${baseURL}/api/v1/categories`,
        {
          name,
        },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
// ! Fetch all Category Action

export const fetchCategoriesAction = createAsyncThunk(
  "categories/all",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { name } = payload;

      // ! Make the request

      const { data } = await axios.get(`${baseURL}/api/v1/categories/all`, {
        name,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Slice

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createCategoryAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(createCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action.payload;
      state.isAdded = true;
    });

    builder.addCase(createCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.isAdded = false;
      state.category = null;
      state.error = action.payload;
    });

    // ! Fetch all Category Action
    builder.addCase(fetchCategoriesAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(fetchCategoriesAction.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
      state.isAdded = true;
    });

    builder.addCase(fetchCategoriesAction.rejected, (state, action) => {
      state.loading = false;
      state.isAdded = false;
      state.categories = null;
      state.error = action.payload;
    });
  },
});

const categoryReducer = categorySlice.reducer;

export default categoryReducer;
