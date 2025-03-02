import { baseApi } from "../api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    initiatePayment: builder.mutation({
      query: (paymentData) => ({
        url: "/api/payment/initiate",
        method: "POST",
        body: paymentData,
      }),
    }),
    verifyPayment: builder.mutation({
      query: (orderId) => ({
        url: "/api/payment/verify",
        method: "POST",
        body: { order_id: orderId },
      }),
    }),
  }),
});

export const { useInitiatePaymentMutation, useVerifyPaymentMutation } =
  paymentApi;
