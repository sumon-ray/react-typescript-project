import { useGetAllProductQuery } from "@/features/products/getAllproductApi";
import Spinnter from "@/reuseComponents/Spinnter";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";

type Product = {
  _id: string;
  name: string;
  brand: string;
  model: string;
  price: number;
  category: string;
  image: string;
  createdAt: string;
};

const ReadProduct = () => {
  const { data, isLoading} = useGetAllProductQuery("");

  useEffect(() => {
    if (data) {
      // toast.success("Products loaded successfully");
    }
  }, []);


  return (
    <div>
      <h1 className="text-center text-5xl font-semibold my-16 " >Featured Products</h1>
      {isLoading ? (
        <Spinnter />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[25px]">
          {/* Check if data exists and contains an array */}
          {data && Array.isArray(data) && data.length > 0 ? (
            [...data]
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .slice(0, 6)
              .map((item: Product) => (
                <div key={item._id} className="p-[10px]">
                  <div className="border mb-[10px] rounded-lg p-[10px] shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="relative">
                      <img
                        className="w-full h-[250px] object-cover rounded-lg"
                        src={item?.image}
                        alt={item?.name || "Product Image"}
                      />
                      <h4 className="absolute bottom-0 left-0 bg-black text-white p-2 rounded-tl-lg rounded-tr-lg">
                        {item?.name}
                      </h4>
                    </div>
                    <ToastContainer />
                    <div className="mt-2">
                      <p>{item?.brand}</p>
                      <p>{item?.category}</p>
                      <p>{item?.model}</p>
                      <p>${item?.price}</p>
                      <div className="flex justify-between items-center mt-4">
                      <NavLink
                          to={`/product/${item._id}`} // Redirects to the details page with the product ID
                        >
                          <button className="border border-[#1ABC9C] py-[8px] px-[30px] cursor-pointer hover:bg-[#1ABC9C] hover:text-[#fff] transition-colors duration-300">
                            Details
                          </button>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ReadProduct;
