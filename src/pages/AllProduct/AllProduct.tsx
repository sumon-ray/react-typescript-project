/* eslint-disable @typescript-eslint/no-explicit-any */

// import { useAppSelector } from "../../redux/hooks";
// import Title from "../../reuseComponents/Title";
import FilterForm from "./FilterForm";
import Spinnter from "../../reuseComponents/Spinnter";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "@/app/hook";
import Title from "@/reuseComponents/Title";

const SearchAndFilter = () => {
  const products = useAppSelector((state) => state.product.data);

  return (
    <>
      <div className="my-[50px]">
        <FilterForm />
        <div className="container mx-auto px-[10px]">
          <div>
            <Title
              title="Choice Your Product"
              description="Choice Here Product and click view deatils button and purcess"
            />
            <div className="flex justify-center items-center">
              {products ? "" : <Spinnter />}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
              {products &&
                products?.slice(0, 6).map((item: any) => (
                  <div className="border">
                    <div className=" p-[10px] ">
                      <div className="border border-[#1ABC9C] mb-[10px] rounded-lg">
                        <img
                          className="w-full h-[250px]"
                          src={item?.image}
                          alt=""
                        />
                      </div>
                      <div className="space-y-1.5 flex-col items-center">
                        <h4>{item.name}</h4>
                        <p>{item.description.slice(0, 80)}...</p>

                        <div className="flex justify-between items-center">
                          <p>
                            <span className="text-[#1ABC9C]">Model: </span>
                            {item.brand}
                          </p>
                          <p>
                            <span className="text-[#1ABC9C]">Category:</span>{" "}
                            {item.type}
                          </p>
                          <p className="text-[#1ABC9C] font-bold">
                            ${item.price}
                          </p>
                        </div>
                        <div className="mt-[20px]">
                          <NavLink
                            state={{ id: item._id }}
                            to="/productDetails"
                          >
                            <button className="border border-[#1ABC9C] py-[8px] px-[30px] cursor-pointer hover:bg-[#1ABC9C] hover:text-[#fff]">
                              View Details
                            </button>
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchAndFilter;
