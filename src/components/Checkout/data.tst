import { useCreateOrderMutation } from "@/features/order/createOrder";
import { useGetSingleProductQuery } from "@/features/products/getSingleProduct"; // Assume this hook fetches product data
import { RootState } from "@/redux/store"; // Add this import
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const OrderForm = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState<number>(1);
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [product, setProduct] = useState<any>(null); // You can define a better type here
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [createOrder] = useCreateOrderMutation();
  const token = useSelector((state: RootState) => state.auth.token);
console.log(token)
  const {
    data: fetchedProduct,
    error,
    isLoading,
  } = useGetSingleProductQuery(id ?? "");

  useEffect(() => {
    if (fetchedProduct) {
      setProduct(fetchedProduct);
      setTotalPrice(fetchedProduct.price * quantity); // Calculate total price on quantity change
    }
  }, [fetchedProduct, quantity]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Math.max(1, parseInt(e.target.value)); // Ensure at least 1 quantity
    if (product && newQuantity <= product.stock) {
      setQuantity(newQuantity);
      setTotalPrice(newQuantity * product.price); // Update total price
    } else {
      toast.error("Quantity exceeds available stock.");
    }
  };

  const handleSubmitOrder = async () => {
    if (!product || quantity > product.stock) {
      toast.error("Quantity exceeds available stock.");
      return;
    }

    const orderData = {
      user: "user_id_here", // You should retrieve the logged-in user's ID here
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
    };

    console.log(orderData);

    // const token = localStorage.getItem("token");
    // console.log(token);

    if (!token) {
      toast.error("You must be logged in to place an order.");
      return;
    }

    try {
      //   const response = await axios.post("/api/order", orderData);
      createOrder({
        orderData,
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token to the request
        },
      });

      toast.success("Order placed successfully!");
      //   console.log(response.data);
      // Redirect to the order confirmation page or another page
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
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
            {/* <select
              id="payment-method"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="px-4 py-2 border rounded-lg mt-2"
            >
              <option value="card">SurjoPay (Card)</option>
              Add more payment options here
            </select> */}
          </div>

          <div className="my-4">
            <p className="text-2xl font-bold text-gray-800">
              Total Price: ${totalPrice}
            </p>
          </div>

          <button
            onClick={handleSubmitOrder}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
