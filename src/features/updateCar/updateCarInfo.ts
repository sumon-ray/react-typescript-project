import { baseApi } from "../api/baseApi";
export const updateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateProduct: builder.mutation<void, { id: string; updatedData: any }>({
      query: ({ id, updatedData }) => ({
        url: `api/cars/update/${id}`,
        method: "PUT",
        body: updatedData, 
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }], 
    }),
  }),
});

export const { useUpdateProductMutation } = updateApi;
