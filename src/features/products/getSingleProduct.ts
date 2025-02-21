import { baseApi } from "../api/baseApi";

export const getAllProduct = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSingleProduct: builder.query({
        query: (id: string) => `api/cars/${id}`,
    }),
  }),
});

export const { useGetSingleProductQuery} = getAllProduct;
