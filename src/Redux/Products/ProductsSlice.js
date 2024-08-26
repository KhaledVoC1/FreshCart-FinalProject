import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  allProducts: [],
  isLoading: false,
  error: null,
};

export const getData = createAsyncThunk("Product/getData", async () => {
  let { data } = await axios.get(
    "https://ecommerce.routemisr.com/api/v1/projducts"
  );
  return data.data;
});

const ProductSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getData.fulfilled, (state, action) => {
      state.allProducts = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const ProductReducer = ProductSlice.reducer;
