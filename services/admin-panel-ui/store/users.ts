import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { USERS_DATA } from "@/mocks";
import { User } from "@/types";

export interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: USERS_DATA,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, { payload }: PayloadAction<User[]>) => {
      state.users = payload;
    },
  },
  selectors: {
    selectUsers: (state) => state.users,
  },
});

export const { setUsers, } =
  usersSlice.actions;
export const { selectUsers } = usersSlice.selectors;
