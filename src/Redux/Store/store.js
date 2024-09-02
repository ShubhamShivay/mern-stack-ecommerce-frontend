import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Slices/Users/userSlice";
import productReducer from "../Slices/products/productSlice";
import categoryReducer from "../Slices/category/categorySlice";

// ! Store

const store = configureStore({
  reducer: {
    users: userReducer,
    products: productReducer,
    categories: categoryReducer,
  },
});

export default store;
