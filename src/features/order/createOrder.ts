import { baseApi } from "../api/baseApi";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/api/order",
        method: "POST",
        body: orderData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, 
        },
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = orderApi;
