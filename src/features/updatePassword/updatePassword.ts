import { baseApi } from "../api/baseApi";

const updatePassword = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updatePassword: builder.mutation({
      query: (product) => ({
        url: "/api/update-password",
        method: "PATCH",
        body: product,
      }),
    }),
  }),
});

export const { useUpdatePasswordMutation } = updatePassword;
