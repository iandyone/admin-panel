import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { appSlice, ordersSlice, usersSlice } from "@/store";

export const store = configureStore({
  reducer: combineReducers({
    [appSlice.name]: appSlice.reducer,
    [ordersSlice.name]: ordersSlice.reducer,
    [usersSlice.name]: usersSlice.reducer,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
