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

        getUsers: builder.query({  // Use `query` instead of `mutation` for GET requests
          query: () => ({
            url: "/api/auth/users",
            method: "GET",
          }),
        }),
        blockUser: builder.mutation({  // ✅ Mutation ব্যবহার করতে হবে
          query: (userId) => ({
            url: `/api/admin/users/${userId}/block`, // ✅ ইউজারের ID দিতে হবে
            method: "PATCH",
          }),
        }),
      }),
})

export const {useLoginMutation, useRegisterMutation, useGetUsersQuery, useBlockUserMutation} = authApi