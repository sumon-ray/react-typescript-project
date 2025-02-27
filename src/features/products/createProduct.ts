import { baseApi } from "../api/baseApi";

const createProduct = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (product) => ({
        url: "/api/cars/create",
        method: "POST",
        body: product,
      }),
      invalidatesTags: [{ type: "Product" }],
    }),
  }),
});

export const { useCreateProductMutation } = createProduct;
