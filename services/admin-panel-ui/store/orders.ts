import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ORDERS_DATA } from "@/mocks";
import { Order } from "@/types";

export interface OrdersState {
  orders: Order[];
}

const initialState: OrdersState = {
  orders: ORDERS_DATA,
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, { payload }: PayloadAction<Order[]>) => {
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
