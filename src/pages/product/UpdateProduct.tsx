import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
// import { useGetSingalProductQuery } from "../../../redux/fetchers/products/productSingalapi";
// import { useUpdateProductMutation } from "../../../redux/fetchers/products/updateProduct";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Spinnter from "@/reuseComponents/Spinnter";
// import Spinnter from "../../../reuseComponents/Spinnter";

interface IFormInput {
  name: string;
  brand: string;
  price: number;
  type: "Mountain" | "Road" | "Hybrid" | "BMX" | "Electric";
  description: string;
  inStock: boolean;
  category: string;
}

const UpdateProduct = () => {
  const route = useLocation();

  const {
    data,
    refetch,
    isLoading,
    isSuccess: success,
  } = useGetSingalProductQuery(route.state.id);

  const [productsend, { isSuccess }] = useUpdateProductMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();

  useEffect(() => {
    if (success && data?.data) {
      reset(data.data);
    }
  }, [success, data, reset]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Product updated successfully!");
      refetch();
    }
  }, [isSuccess]);

  const onSubmit: SubmitHandler<IFormInput> = (formData) => {
    const updatedData = { ...formData, id: route?.state?.id };
    productsend(updatedData);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Update Cycle Information
      </h2>
      <ToastContainer />
      {isLoading ? (
        <Spinnter />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="brand"
              className="block text-sm font-medium text-gray-700"
            >
              Brand
            </label>
            <input
              id="brand"
              type="text"
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              {...register("brand", { required: "Brand is required" })}
            />
            {errors.brand && (
              <p className="text-red-500 text-xs">{errors.brand.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              id="price"
              type="number"
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              {...register("price", { required: "Price is required", min: 0 })}
            />
            {errors.price && (
              <p className="text-red-500 text-xs">{errors.price.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700"
            >
              Type
            </label>
            <select
              id="type"
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              {...register("type", { required: "Type is required" })}
            >
              <option value="Mountain">Mountain</option>
              <option value="Road">Road</option>
              <option value="Hybrid">Hybrid</option>
              <option value="BMX">BMX</option>
              <option value="Electric">Electric</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-xs">{errors.type.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <p className="text-red-500 text-xs">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#1ABC9C] text-white font-semibold rounded-md shadow-md"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateProduct;
