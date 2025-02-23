import { useCreateOrderMutation } from "@/features/order/createOrder";
import { useGetSingleProductQuery } from "@/features/products/getSingleProduct";
import { useInitiatePaymentMutation } from "@/features/payment/paymentApi";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const OrderForm = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState<number>(1);
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [orderId, setOrderId] = useState<string>("");

  const { data: product, error, isLoading } = useGetSingleProductQuery(id ?? "");

  const [createOrder] = useCreateOrderMutation();
  const [initiatePayment, { isLoading: isPaymentLoading }] = useInitiatePaymentMutation();
  
  const token = useSelector((state: RootState) => state.auth.token);
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const userName = useSelector((state: RootState) => state.auth.user?.name);
  const userPhone = useSelector((state: RootState) => state.auth.user?.phone);

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

    try {
      const order_id = "ORDER" + Date.now();
      setOrderId(order_id);

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
      };

      if (!token) {
        toast.error("You must be logged in to place an order.");
        return;
      }

      // Creating the order
      const createOrderResponse = await createOrder({
        orderData,
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token to the request
        },
      }).unwrap();  // Use unwrap to handle any errors from the mutation

      if (createOrderResponse) {
        toast.success("Order placed successfully!");

        // Proceed to payment initiation
        handlePayment(order_id, totalPrice);
      }
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
      console.error(error);
    }
  };

  const handlePayment = async (order_id: string, amount: number) => {
    try {
      const response = await initiatePayment({
        amount,
        order_id,
        customer_name: userName || "Unknown User",
        customer_phone: userPhone || "Unknown Phone",
      }).unwrap();

      if (response.checkout_url) {
        window.location.href = response.checkout_url;
      } else {
        toast.error("Failed to initiate payment.");
      }
    } catch (error) {
      toast.error("Payment initiation failed.");
      console.error(error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error || !product) return <div>Error fetching product details.</div>;

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center items-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-lg h-auto rounded-lg shadow-lg"
          />
        </div>
        <div className="flex flex-col justify-between">
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl font-semibold text-gray-700">{product.brand}</p>
          <p className="text-lg text-gray-500 mb-4">{product.category}</p>
          <p className="text-2xl font-bold text-gray-800">${product.price}</p>
          <p className="text-lg text-gray-600">
            {product.description || "No description available."}
          </p>

          <div className="my-4 space-x-4">
            <label htmlFor="quantity" className="text-lg font-semibold">
              Quantity
            </label>
            <input
              id="quantity"
              type="number"
              value={quantity}
              min="1"
              max={product.stock}
              onChange={handleQuantityChange}
              className="px-4 py-2 border bg-slate-400 rounded-lg mt-2"
            />
            <p className="mt-2">Stock Available: {product.stock}</p>
          </div>

          <div className="my-4">
            <label htmlFor="payment-method" className="text-lg font-semibold">
              Payment Method
            </label>
            <div className="flex space-x-4 mt-2">
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                />
                Card
              </label>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={paymentMethod === "cash"}
                  onChange={() => setPaymentMethod("cash")}
                />
                Cash on Delivery
              </label>
            </div>
          </div>

          <div className="my-4">
            <p className="text-2xl font-bold text-gray-800">
              Total Price: ${totalPrice}
            </p>
          </div>

          <button
            onClick={handleSubmitOrder}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            disabled={isPaymentLoading}
          >
            {isPaymentLoading ? "Processing..." : "Place Order & Pay"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
