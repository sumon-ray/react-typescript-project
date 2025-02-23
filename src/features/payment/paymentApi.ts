import { baseApi } from "../api/baseApi";

const paymentApi= baseApi.injectEndpoints({
  endpoints: (builder) => ({
    initiatePayment: builder.mutation({
        query: (paymentData) => ({
          url: "/initiate",
          method: "POST",
          body: paymentData,
        }),
      }),
      verifyPayment: builder.mutation({
        query: (orderId) => ({
          url: "/verify",
          method: "POST",
          body: { order_id: orderId },
        }),
      }),
  }),
});

export const { useInitiatePaymentMutation, useVerifyPaymentMutation } = paymentApi;
