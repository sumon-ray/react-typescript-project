import { baseApi } from "../api/baseApi";

export const getOrderById = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrderById: builder.query({
      query: (userId: string) => `api/order/${userId}`, 
    }),
  }),
});

export const { useGetOrderByIdQuery } = getOrderById;
