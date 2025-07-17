import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ORDERS_FILTERS } from "@/constants";
import { ORDERS_DATA } from "@/mocks";
import { OrderData } from "@/types";
import { OrderFilters } from "@/types/orders";

export interface OrdersState {
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

    resetOrdersFiltersAll: (state) => {
      state.filters = initialState.filters;
    },
  },

  selectors: {
    selectOrders: (state) => state.orders,
    selectOrdersFilter: (state) => state.filters,
  },
});

export const {
  setOrders,
  setOrdersFilter,
  resetOrdersFilter,
  resetOrdersFiltersAll,
} = ordersSlice.actions;
export const { selectOrders, selectOrdersFilter } = ordersSlice.selectors;
