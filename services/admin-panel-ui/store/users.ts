import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { USERS_FILTERS_DEFAULT } from '@/constants';
import { USERS_DATA } from "@/mocks";
import { UserData } from "@/types";
import { UsersFilter } from '@/types/orders';


interface UsersState {
  users: UserData[];
  filters: UsersFilter;
}

const initialState: UsersState = {
  users: USERS_DATA,
  filters: USERS_FILTERS_DEFAULT,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, { payload }: PayloadAction<UserData[]>) => {
      state.users = payload;
    },
      setUsersFilter<K extends keyof UsersFilter>(
          state: UsersState,
          {
            payload,
          }: PayloadAction<{
            key: K;
            value: UsersFilter[K];
          }>,
        ) {
          state.filters[payload.key] = payload.value;
        },
    
        resetUsersFilter<K extends keyof UsersFilter>(
          state: UsersState,
          { payload }: PayloadAction<{ key: K }>,
        ) {
          state.filters[payload.key] = initialState.filters[payload.key];
        },
  },
  selectors: {
    selectUsers: (state) => state.users,
  },
});

export const { setUsers, setUsersFilter, resetUsersFilter } = usersSlice.actions;
export const { selectUsers } = usersSlice.selectors;
