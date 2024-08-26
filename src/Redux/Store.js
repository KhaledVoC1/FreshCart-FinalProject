import { configureStore } from "@reduxjs/toolkit";
import { CounterReducer } from "./Counter/CounterSlice";
import { ProductReducer } from "./Products/ProductsSlice";

export const store = configureStore({
  reducer: {
    counter: CounterReducer,
    products:ProductReducer
  },
});
