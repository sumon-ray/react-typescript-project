import { baseApi } from "../api/baseApi";

// Define the updateApi for updating products
export const updateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateProduct: builder.mutation<void, { id: string; updatedData: any }>({
      query: ({ id, updatedData }) => ({
        url: `api/cars/update/${id}`,
        method: "PUT",
        body: updatedData, // Send the updated product details
      }),
      // Invalidate tags when the product is updated
      invalidatesTags: [{ type: "Product", id: "LIST" }], // Invalidates the product list cache
    }),
  }),
});

// Export the mutation hook
export const { useUpdateProductMutation } = updateApi;
