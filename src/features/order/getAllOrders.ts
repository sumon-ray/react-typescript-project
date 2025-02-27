import { baseApi } from "../api/baseApi";

export const getAllOrder= baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrder: builder.query({
      query: () => ({
        url: "/api/order/all-order",
      }),
    }),
  }),
});

export const { useGetAllOrderQuery } = getAllOrder;
