import { useGetAllProductQuery } from "@/features/products/getAllproductApi";
import Spinnter from "@/reuseComponents/Spinnter";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";

interface Product {
  name: string;
  brand: string;
  category: string;
  price: number;
  isAvailable: boolean;
  createdAt: string;
  _id: string;
  description: string;
  type: string;
  model: string;
  image: string;
}

const AllProducts = () => {
  const { data, isLoading } = useGetAllProductQuery("");
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    brand: "",
    category: "",
    model: "",
    minPrice: "",
    maxPrice: "",
    isAvailable: "",
  });

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // Handle filter change
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Filtered Products
  const filteredProducts = data
    ? data
        .filter((product: Product) => {
          // Search filter (by name, brand, or category)
          if (
            search &&
            !product.name.toLowerCase().includes(search.toLowerCase()) &&
            !product.brand.toLowerCase().includes(search.toLowerCase()) &&
            !product.category.toLowerCase().includes(search.toLowerCase())
          ) {
            return false;
          }

          // Brand filter
          if (filters.brand && product.brand !== filters.brand) {
            return false;
          }

          // Category filter
          if (filters.category && product.category !== filters.category) {
            return false;
          }

          // Model filter
          if (filters.model && product.model !== filters.model) {
            return false;
          }

          // Price range filter
          const price = product.price;
          if (filters.minPrice && price < Number(filters.minPrice)) {
            return false;
          }
          if (filters.maxPrice && price > Number(filters.maxPrice)) {
            return false;
          }

          // Availability filter
          if (
            filters.isAvailable &&
            product?.isAvailable !== undefined &&
            product?.isAvailable.toString() !== filters.isAvailable
          ) {
            return false;
          }

          return true;
        })
        .sort(
          (a: Product, b: Product) =>
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime()
        )
    : [];

  return (
    <div>
      <h1 className="text-center font-bold text-3xl py-2">All Products</h1>

      {/* Search and Filters Section */}
      <div className="flex flex-wrap gap-4 justify-center p-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by name, brand, or category"
          className="border bg-zinc-200 p-2 rounded-lg text-white "
          value={search}
          onChange={handleSearchChange}
        />

        {/* Brand Filter */}
        <select
          name="brand"
          className="border bg-zinc-200 p-2 rounded-lg"
          onChange={handleFilterChange}
        >
          <option value="">All Brands</option>
          <option value="Toyota">Toyota</option>
          <option value="Honda">Honda</option>
          <option value="BMW">BMW</option>
        </select>

        {/* Category Filter */}
        <select
          name="category"
          className="border bg-zinc-200 p-2 rounded-lg"
          onChange={handleFilterChange}
        >
          <option value="">All Categories</option>
          <option value="SUV">SUV</option>
          <option value="Sedan">Sedan</option>
          <option value="Truck">Truck</option>
        </select>

        {/* Model Filter */}
        <select
          name="model"
          className="border bg-zinc-200 p-2 rounded-lg"
          onChange={handleFilterChange}
        >
          <option value="">All Models</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>

        {/* Price Range Filter */}
        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          className="border p-2 bg-zinc-200 text-black rounded-lg"
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          className="border bg-zinc-200 p-2 rounded-lg"
          onChange={handleFilterChange}
        />

        {/* Availability Filter */}
        <select
          name="isAvailable"
          className=" bg-zinc-200 border p-2 rounded-lg"
          onChange={handleFilterChange}
        >
          <option value="">All Availability</option>
          <option value="true">In Stock</option>
          <option value="false">Out of Stock</option>
        </select>
      </div>

      {isLoading ? (
        <Spinnter />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item: Product) => (
              <div
                key={item._id}
                className="p-4 border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative">
                  <img
                    className="w-full h-48 object-cover rounded-lg"
                    src={item.image}
                    alt={item.name || "Product Image"}
                  />
                  <h4 className="absolute bottom-0 left-0 bg-black  p-2 rounded-tl-lg rounded-tr-lg">
                    {item.name}
                  </h4>
                </div>
                <ToastContainer />
                <div className="mt-2">
                  <p>Brand: {item.brand}</p>
                  <p>Category: {item.category}</p>
                  <p>Model: {item.model}</p>
                  <p>Price: ${item.price}</p>
                  <p>
                    Availability:{" "}
                    {item.isAvailable ? "In Stock" : "Out of Stock"}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <NavLink to={`/product/${item._id}`}>
                      <button className="border border-[#1ABC9C] py-2 px-6 cursor-pointer hover:bg-[#1ABC9C] hover:text-white transition duration-300">
                        Details
                      </button>
                    </NavLink>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3">No products available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
