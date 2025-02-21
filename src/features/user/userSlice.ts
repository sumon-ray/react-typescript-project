import { RootState } from "@/app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

export interface User {
  id: string;
  name: string;
}

export interface TUser {
  user: User[];
}

export interface PasswordUpdate {
  currentPassword: string;
  newPassword: string;
}

const initialState: TUser = {
  user: [
    {
      id: "3243t5fgscwsx",
      name: "sumon ray",
    },
    {
      id: "3243t5fgscs",
      name: "dalim ray",
    },
    {
      id: "3243t5fgscsax",
      name: "modon ray",
    },
  ],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      const userData = {
        ...action.payload,
        id: uuid(),
      };
      state.user.push(userData);
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.user = state.user.filter((user) => user.id !== action.payload);
    },
    updatePassword: (state, action: PayloadAction<PasswordUpdate>) => {
      console.log("Password update requested:", action.payload);
    },
  },
});

export const selectUsers = (state: RootState) => {
  return state.user.user;
};

export const { addUser, deleteUser, updatePassword } = userSlice.actions;

export default userSlice.reducer;
