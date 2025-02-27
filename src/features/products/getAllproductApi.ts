import { baseApi } from "../api/baseApi";

export const getAllProduct = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProduct: builder.query({
      query: () => ({
        url: "/api/cars/all-cars",
        providesTags: ['Product'],
      }),
    }),
  }),
});

export const { useGetAllProductQuery } = getAllProduct;
