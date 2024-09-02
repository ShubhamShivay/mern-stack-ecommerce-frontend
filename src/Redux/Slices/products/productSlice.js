import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

// ! Initial State

const initialState = {
  loading: false,
  error: null,
  products: [],
  product: {},
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

// ! Create Product Action

export const createProductAction = createAsyncThunk(
  "products/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const {
        name,
        discription,
        brand,
        category,
        sizes,
        colors,
        price,
        totalQty,
      } = payload;

      // ! Make the request
      // ! Token - Authentication

      const token = getState()?.users?.userAuth?.userInfo?.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `${baseURL}/api/v1/products`,
        {
          name,
          discription,
          brand,
          category,
          sizes,
          colors,
          price,
          totalQty,
        },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Slice

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createProductAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(createProductAction.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.isAdded = true;
    });

    builder.addCase(createProductAction.rejected, (state, action) => {
      state.loading = false;
      state.isAdded = false;
      state.product = null;
      state.error = action.payload;
    });
  },
});

const productReducer = productSlice.reducer;

export default productReducer;
