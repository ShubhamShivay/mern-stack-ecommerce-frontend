import { createAsyncThunk } from "@reduxjs/toolkit";

// ! reset error action

export const resetErrorAction = createAsyncThunk("resetError", () => {
  return {};
});


// ! Reset success action

export const resetSuccessAction = createAsyncThunk("resetSuccess", () => {
  return {};
})