import { combineSlices, createSlice } from "@reduxjs/toolkit";

const initialState = {
  counter: 0,
  userNamae: "ali",
};
const CounterSlice = createSlice({
  name: "xxx",
  initialState,
  reducers: {
    increase: (state) => {
      state.counter += 1;
    },
    decrease: (state, action) => {

      state.counter--;
    },
    increaseByAmount: (state, { payload }) => {
      state.counter += payload;
    },
  },
});
export const CounterReducer = CounterSlice.reducer;

export const { increase, decrease, increaseByAmount } = CounterSlice.actions;
