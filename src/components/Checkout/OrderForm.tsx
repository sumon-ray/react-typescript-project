import { RootState } from "@/app/store";
import { useCreateOrderMutation } from "@/features/order/createOrder";
import { useInitiatePaymentMutation } from "@/features/payment/paymentApi";
import { useGetSingleProductQuery } from "@/features/products/getSingleProduct";
// import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";

const OrderForm = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState<number>(1);
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerCity, setCustomerCity] = useState("");

  const {
    data: product,

    isLoading: isProductLoading,
  } = useGetSingleProductQuery(id ?? "");
  const [createOrder] = useCreateOrderMutation();
  const [initiatePayment, { isLoading: isPaymentLoading }] =
    useInitiatePaymentMutation();

  const token = useSelector((state: RootState) => state.auth.token);
  const userId = useSelector((state: RootState) => state.auth.user?.id);

  useEffect(() => {
    if (product) {
      setTotalPrice(product.price * quantity);
    }
  }, [product, quantity]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number(e.target.value);

    if (isNaN(newQuantity) || newQuantity < 1) {
      toast.error("Quantity must be at least 1.");
      return;
    }

    if (product && newQuantity > product.stock) {
      toast.error("Quantity exceeds available stock.");
    } else {
      setQuantity(newQuantity);
      setTotalPrice(newQuantity * product.price);
    }
  };

  const handleSubmitOrder = async () => {
    if (!product || quantity > product.stock) {
      toast.error("Quantity exceeds available stock.");
      return;
    }

    if (!token || !userId) {
      toast.error("You must be logged in to place an order.");
      return;
    }

    if (!customerName || !customerAddress || !customerPhone || !customerCity) {
      toast.error("Please fill in all the required user details.");
      return;
    }

    // Show confirmation using SweetAlert before proceeding
    const { isConfirmed } = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to confirm this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, confirm",
      cancelButtonText: "No, cancel",
    });

    // If user doesn't confirm, cancel the order submission
    if (!isConfirmed) return;

    try {
      const order_id = "ORDER" + Date.now();

      const orderData = {
        user: userId,
        items: [
          {
            product: product._id,
            quantity,
            price: product.price,
          },
        ],
        totalPrice,
        paymentMethod,
        status: "pending",
        order_id,
        client_ip: "127.0.0.1",
        customer_name: customerName,
        customer_address: customerAddress,
        customer_phone: customerPhone,
        customer_city: customerCity,
      };

      const createOrderResponse = await createOrder(orderData).unwrap();

      if (createOrderResponse) {
        toast.success("Order placed successfully!");

        handlePayment(
          order_id,
          totalPrice,
          customerName,
          customerAddress,
          customerCity,
          customerPhone
        );
      }
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
      console.error("Order creation error:", error);
    }
  };

  const handlePayment = async (
    order_id: string,
    amount: number,
    customerName: string,
    customerAddress: string,
    customerCity: string,
    customerPhone: string
  ) => {
    if (!customerName || !customerAddress || !customerPhone || !customerCity) {
      toast.error("Please fill in all the required user details.");
      return;
    }

    try {
      // const { isConfirmed } = await Swal.fire({
      //   title: "Are you sure?",
      //   text: "Do you want to proceed with the payment?",
      //   icon: "warning",
      //   showCancelButton: true,
      //   confirmButtonText: "Yes, proceed",
      //   cancelButtonText: "No, cancel",
      // });

      // if (!isConfirmed) return;

      const response = await initiatePayment({
        order_id,
        customer_name: customerName,
        customer_address: customerAddress,
        customer_city: customerCity,
        customer_phone: customerPhone,
        client_ip: "127.0.0.1",
        amount,
      }).unwrap();

      if (response?.checkoutUrl) {
        window.location.href = response.checkoutUrl;
      } else {
        toast.error("Failed to initiate payment. Please try again.");
      }
    } catch (error) {
      toast.error("Payment initiation failed.");
      console.error("Payment initiation error:", error);
    }
  };

  if (isProductLoading) {
    return <div>Loading product...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <ToastContainer />
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          <div className="flex justify-center items-center p-6 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-lg shadow-xl">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto max-w-xs md:max-w-lg rounded-lg shadow-2xl transition-transform transform hover:scale-105"
            />
          </div>

          <div className="flex flex-col justify-between">
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-semibold text-gray-800">
                {product.name}
              </h1>
              <p className="text-lg font-medium text-gray-700">
                {product.brand}
              </p>
              <p className="text-md text-gray-600">{product.category}</p>
              <p className="text-2xl font-bold text-gray-800 mt-2">
                ${product.price}
              </p>
              <p className="text-md text-gray-500 mt-4">
                {product.description || "No description available."}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="quantity"
                  className="text-lg font-semibold text-gray-700"
                >
                  Quantity
                </label>
                <input
                  id="quantity"
                  type="number"
                  value={quantity}
                  min="1"
                  max={product.stock}
                  onChange={handleQuantityChange}
                  className="w-20 px-4 py-2 border bg-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              <p className="text-sm text-gray-600">
                Stock Available: {product.stock}
              </p>

              <div className="space-y-4">
                <p className="text-lg font-semibold text-gray-700">
                  Payment Method
                </p>
                <div className="flex space-x-6">
                  <label className="cursor-pointer flex items-center text-gray-700">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="mr-2"
                    />
                    <span>Card</span>
                  </label>
                  <label className="cursor-pointer flex items-center text-gray-700">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={paymentMethod === "cash"}
                      onChange={() => setPaymentMethod("cash")}
                      className="mr-2"
                    />
                    <span>Cash on Delivery</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="my-4">
                  <label
                    htmlFor="userName"
                    className="text-lg font-semibold text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="userName"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-2 border bg-slate-100 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="my-4">
                  <label
                    htmlFor="userAddress"
                    className="text-lg font-semibold text-gray-700"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="userAddress"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full px-4 py-2 border bg-slate-100 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="my-4">
                  <label
                    htmlFor="userCity"
                    className="text-lg font-semibold text-gray-700"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="userCity"
                    value={customerCity}
                    onChange={(e) => setCustomerCity(e.target.value)}
                    className="w-full px-4 py-2 border bg-slate-100 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="my-4">
                  <label
                    htmlFor="userPhone"
                    className="text-lg font-semibold text-gray-700"
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    id="userPhone"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-4 py-2 border bg-slate-100 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold text-gray-700">
                  Total Price
                </span>
                <span className="text-xl font-bold text-gray-800">
                  ${totalPrice}
                </span>
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={handleSubmitOrder}
                  className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-all"
                  disabled={isPaymentLoading}
                >
                  {isPaymentLoading ? "Processing..." : "Place Order"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
