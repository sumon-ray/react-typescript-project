// import { configureStore } from "@reduxjs/toolkit";
// import { baseApi } from "./api/baseApi";
// import authReducer from "./features/auth/authSlice";
// import userReducer from "./features/user/userSlice";

// export const store = configureStore({
//   reducer: {
//     [baseApi.reducerPath]: baseApi.reducer,
//     auth: authReducer,
//     user: userReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(baseApi.middleware),
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
