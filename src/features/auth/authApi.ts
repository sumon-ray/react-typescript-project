import { baseApi } from "../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/api/auth/register",
        method: "POST",
        body: userInfo,
      }),
    }),
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/api/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),

    getUsers: builder.query({
      query: () => ({
        url: "/api/auth/users",
        method: "GET",
      }),
    }),
    blockUser: builder.mutation({
      query: (userId) => ({
        url: `/api/admin/users/${userId}/block`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetUsersQuery,
  useBlockUserMutation,
} = authApi;
