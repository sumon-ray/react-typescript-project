import { RootState } from "@/app/store";
import { createSlice } from "@reduxjs/toolkit";

type TAuthState = { user: null | { id: string; name: string; email: string; role: string }; token: null | string };

const initialState: TAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      // If user is a string (like coming from localStorage), parse it
      state.user = typeof user === "string" ? JSON.parse(user) : user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;

// Selector to get the token
export const useCurrentToken = (state: RootState) => state.auth.token;

// Selector to get the user, already parsed into an object
export const useCurrentUser = (state: RootState) => state.auth.user;
