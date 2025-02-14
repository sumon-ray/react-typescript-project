import { baseApi } from '@/features/api/baseApi';
import { configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../features/auth/authSlice';
import counterReducer from '../features/counter/counterSlice';
import taskReducer from '../features/task/taskSlice';
import userReducer from "../features/user/userSlice";
const persistConfig = {
  key: 'root',
  storage,
}

const persistedAuthReducer = persistReducer(persistConfig, authReducer)
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath] : baseApi.reducer,
    counter: counterReducer,
    todo: taskReducer,
    user: userReducer,
    auth: persistedAuthReducer
  },
  middleware: getDefaultMiddlewares => getDefaultMiddlewares(
    {
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      }
    }
  ).concat(baseApi.middleware)
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)