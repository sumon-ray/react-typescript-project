import { baseApi } from "../api/baseApi";

export const getAllProduct = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProduct: builder.query({
      query: () => ({
        url: "/api/cars/all-cars",
      }),
    }),
  }),
});

export const { useGetAllProductQuery } = getAllProduct;
