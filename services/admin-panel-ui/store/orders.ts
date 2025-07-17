import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ORDERS_FILTERS } from "@/constants";
import { ORDERS_DATA } from "@/mocks";
import { OrderData } from "@/types";
import { OrderFilters } from "@/types/orders";

interface OrdersState {
  orders: OrderData[];
  filters: OrderFilters;
}

const initialState: OrdersState = {
  orders: ORDERS_DATA,
  filters: ORDERS_FILTERS,
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, { payload }: PayloadAction<OrderData[]>) => {
      state.orders = payload;
    },
    setOrdersFilter<K extends keyof OrderFilters>(
      state: OrdersState,
      {
        payload,
      }: PayloadAction<{
        key: K;
        value: OrderFilters[K];
      }>,
    ) {
      state.filters[payload.key] = payload.value;
    },

    resetOrdersFilter<K extends keyof OrderFilters>(
      state: OrdersState,
      { payload }: PayloadAction<{ key: K }>,
    ) {
      state.filters[payload.key] = initialState.filters[payload.key];
    },
  },

  selectors: {
    selectOrders: (state) => state.orders,
  },
});

export const { setOrders, setOrdersFilter, resetOrdersFilter } =
  ordersSlice.actions;
export const { selectOrders } = ordersSlice.selectors;
