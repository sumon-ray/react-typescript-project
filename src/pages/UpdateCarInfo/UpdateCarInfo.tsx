import { useGetSingleProductQuery } from "@/features/products/getSingleProduct";
import { useUpdateProductMutation } from "@/features/updateCar/updateCarInfo";
import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateCarInfo = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const {
    data: product,
    error,
    isLoading,
    refetch,
  } = useGetSingleProductQuery(id ?? "");
  const [updateProduct] = useUpdateProductMutation();

  const [carData, setCarData] = useState({
    name: "",
    brand: "",
    model: "",
    price: 0,
    category: "",
    image: "",
    stock: 0,
    description: "",
    isAvailable: true,
  });

  useEffect(() => {
    if (product) {
      setCarData({
        name: product.name,
        brand: product.brand,
        model: product.model,
        price: product.price,
        category: product.category,
        image: product.image,
        stock: product.stock,
        description: product.description,
        isAvailable: product.isAvailable,
      });
    }
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const isCheckbox = (e.target as HTMLInputElement).type === "checkbox";

    setCarData({
      ...carData,
      [name]: isCheckbox
        ? (e.target as HTMLInputElement).checked
        : (e.target as HTMLInputElement).type === "number"
        ? Number(value)
        : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) {
      toast.error("Product ID not found");
      return;
    }

    const updatedData = { ...carData };

    try {
      await updateProduct({ id, updatedData });
      message.success("Product updated successfully!");
      navigate("/dashboard/products");
      refetch();
    } catch (err) {
      console.error("Failed to update product:", err);
      toast.error("Failed to update product.");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching product details.</p>;

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Update Car Information
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
        <textarea
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
          className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Update Car
        </button>
      </form>
    </div>
  );
};

export default UpdateCarInfo;
