import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { USERS_DATA } from "@/mocks";
import { UserData } from "@/types";

export interface UsersState {
  users: UserData[];
}

const initialState: UsersState = {
  users: USERS_DATA,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, { payload }: PayloadAction<UserData[]>) => {
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
