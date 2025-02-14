import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: null | object;
  isAuthenticated: boolean;
  token: null | string;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ user: object; token: string }>
    ) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    // ... other reducers can be added here
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
