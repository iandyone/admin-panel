import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ORDERS_DATA } from "@/mocks";
import { OrderData } from "@/types";

export interface OrdersState {
  orders: OrderData[];
}

const initialState: OrdersState = {
  orders: ORDERS_DATA,
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, { payload }: PayloadAction<OrderData[]>) => {
      state.orders = payload;
    },
  },

  selectors: {
    selectOrders: (state) => state.orders,
  },
});

export const {
  setOrders,
} = ordersSlice.actions;
export const { selectOrders } = ordersSlice.selectors;
