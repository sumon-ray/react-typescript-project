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
    verifyPayment: builder.mutation({ // ✅ Change from query to mutation
      query: (orderId) => ({
        url: "/api/payment/verify",
        method: "POST", // ✅ Use POST instead of GET
        body: { order_id: orderId }, // ✅ Send order_id in the body
      }),
    }),
  }),
});

export const { useInitiatePaymentMutation, useVerifyPaymentMutation } = paymentApi;
