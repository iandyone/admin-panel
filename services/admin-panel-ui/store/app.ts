import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  good: true,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setGood: (state, action: PayloadAction<{ good: boolean }>) => {
      state.good = action.payload.good;
    },
  },
});

export const { setGood } = appSlice.actions;
