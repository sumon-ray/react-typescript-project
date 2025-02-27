import { RootState } from "@/app/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { RootState } from "@/redux/store";  

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:5000", 
    baseUrl: "https://blog-backend-kappa-steel.vercel.app/", 
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ['Product'],
  
  endpoints: () => ({}),
});
