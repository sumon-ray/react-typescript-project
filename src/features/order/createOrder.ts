import { baseApi } from "../api/baseApi";

const createOrder = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (product) => ({
        url: "/api/order",
        method: "POST",
        body: product,
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = createOrder;
