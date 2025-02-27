import { useDeleteProductMutation } from "@/features/delete/deleteCar";
import { useGetAllProductQuery } from "@/features/products/getAllproductApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Assuming you're using this for notifications

const NewProducts = () => {
  const navigate = useNavigate();
  const { data, isLoading, error, refetch } = useGetAllProductQuery("");
  const [deleteProduct] = useDeleteProductMutation();

  if (isLoading)
    return <p className="text-center text-gray-600">Loading products...</p>;
  if (error)
    return <p className="text-center text-red-500">Failed to load products.</p>;

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this car?")) {
      try {
        await deleteProduct(id);
        toast.success("Car deleted successfully!"); // Show success toast
        refetch(); // Refetch after deletion to get the latest data
      } catch (err) {
        toast.error("Failed to delete car."); // Show error toast
      }
    }
  };

  const handleUpdate = (id: string) => {
    navigate(`/dashboard/update-car/${id}`);
    // No need to refetch here, as you can rely on the product details to be updated directly
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Latest Cars
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.map((car: any) => (
          <div key={car._id} className="bg-white rounded-lg shadow-lg p-4">
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="text-xl font-semibold text-gray-800 mt-3">
              {car.name}
            </h3>
            <p className="text-gray-600 text-sm">{car.model}</p>
            <p className="text-lg font-bold text-blue-600 mt-2">${car.price}</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleUpdate(car._id)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(car._id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewProducts;
