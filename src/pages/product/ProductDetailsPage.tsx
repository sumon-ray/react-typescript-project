import { useEffect, useState } from "react";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

import { useGetSingleProductQuery } from "@/features/products/getSingleProduct";
import Spinnter from "@/reuseComponents/Spinnter";
import { ToastContainer } from "react-toastify";

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: product,
    error,
    isLoading,
  } = useGetSingleProductQuery(id ?? "");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      setErrorMessage(
        "Failed to fetch product details. Please try again later."
      );
    }
  }, [error]);

  if (!id) return <div>Product ID not found</div>;
  if (isLoading) return <Spinnter />;
  if (error) return <div>Error fetching product details</div>;
  if (!product) return <div>Product not found</div>;

  const handleOrderClick = () => {
    if (product) {
      navigate(`/checkout/${product._id}`);
    } else {
      console.error("Product not found");
    }
  };

  return (
    <div className="container min-h-screen mx-auto mt-10 p-4">
      <ToastContainer />
      {errorMessage && (
        <div className="bg-red-500 text-white p-4 mb-4">{errorMessage}</div>
      )}

      {product && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex justify-center items-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-w-lg h-auto rounded-lg shadow-lg transition-transform transform hover:scale-105"
              style={{ maxHeight: "400px" }}
            />
          </div>

          <div className="flex flex-col justify-between bg-white rounded-lg shadow-md p-6 h-full">
            <h1 className="text-4xl font-extrabold mb-2 text-gray-800">
              {product.name}
            </h1>
            <p className="text-lg font-semibold text-gray-600 flex items-center mb-2">
              <FaStar className="text-yellow-500 mr-2" /> {product.brand}
            </p>
            <p className="text-md text-gray-500 mb-4">{product.category}</p>
            <p className="text-md text-gray-700 mb-4">{product.model}</p>

            <div className="my-4">
              <p className="text-2xl font-bold text-gray-900">
                ${product.price}
              </p>
            </div>

            <p className="text-gray-700 mb-4">
              {product.description || "No description available."}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Stock:</strong> {product?.stock}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Quantity:</strong> {product?.quantity}
            </p>

            <div className="flex justify-between items-center mt-4">
              <button
                onClick={handleOrderClick}
                className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 shadow-md transform hover:scale-105"
              >
                <FaShoppingCart className="mr-2" /> Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
