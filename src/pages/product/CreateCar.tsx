import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { useCreateProductMutation } from "../../features/products/createProduct";
import {message} from "antd"
import { useNavigate } from "react-router-dom";
const CreateCar = () => {
  const navigate = useNavigate()
  const [createProduct, { isLoading, error }] = useCreateProductMutation();
  const [carData, setCarData] = useState({
    name: "",
    brand: "",
    model: "",
    price: 0,
    category: "",
    image: "",
    stock: 1, // Default value
    description: "", // Required field
    isAvailable: true, // Default value
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    setCarData({
      ...carData,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedData = {
      ...carData,
      price: Number(carData.price), 
      stock: Number(carData.stock), 
      isAvailable: Boolean(carData.isAvailable), 
    };

    console.log("Submitting Car Data:", formattedData); // ✅ Check if all fields are there

    await createProduct(formattedData);
    message.success("Product Added Successfully")
    navigate('/dashboard/products')
  };

  return (
    <>
      <ToastContainer />
      <div className="max-w-xl mx-auto p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Create a New Car
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={carData.name}
            onChange={handleChange}
            placeholder="Car Name"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="brand"
            value={carData.brand}
            onChange={handleChange}
            placeholder="Brand"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="model"
            value={carData.model}
            onChange={handleChange}
            placeholder="Model"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="price"
            value={carData.price}
            onChange={handleChange}
            placeholder="Price"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="category"
            value={carData.category}
            onChange={handleChange}
            placeholder="Category"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="image"
            value={carData.image}
            onChange={handleChange}
            placeholder="Image URL"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="stock"
            value={carData.stock}
            onChange={handleChange}
            placeholder="Stock"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="description"
            value={carData.description}
            onChange={handleChange}
            placeholder="Description"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isAvailable"
              checked={carData.isAvailable}
              onChange={(e) =>
                setCarData({ ...carData, isAvailable: e.target.checked })
              }
            />
            <span>Available</span>
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isLoading ? "Creating..." : "Create Car"}
          </button>
        </form>
        {error && (
          <p className="text-red-500 text-center mt-4">
            {"message" in error ? error.message : "An error occurred"}
          </p>
        )}
      </div>
    </>
  );
};

export default CreateCar;
