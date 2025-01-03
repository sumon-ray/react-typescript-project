import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  count: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, action) => {
      state.count = state.count + 1 + action.payload;
    },
    decrement: (state) => {
      state.count = state.count - 1;
    },
  },
});

export const {increment, decrement} = counterSlice.actions

export default counterSlice.reducer