import { baseApi } from "../api/baseApi";

export const deleteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `api/cars/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Product" }],
    }),
  }),
});

export const { useDeleteProductMutation } = deleteApi;
