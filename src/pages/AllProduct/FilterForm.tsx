import { useForm, SubmitHandler } from "react-hook-form";
import { useGetAllFilterProductQuery } from "../../redux/fetchers/products/productFilterApi";
import { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { products } from "../../redux/fetchers/products/productSlice";
type Inputs = {
  brand: string;
  category: string;
  inStock: boolean;
  max: number;
  min: number;
  search: string;
  page: number;
};
type TAssingPerm = {
  name: string;
  value: string | number | boolean;
};
const FilterForm = () => {
  const dispatch = useAppDispatch();
  const [param, setparam] = useState<TAssingPerm[]>([]);
  let paramsArr: TAssingPerm[] = [];
  const { data } = useGetAllFilterProductQuery(param);
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    paramsArr = [];
    const getArr = Object.entries(data);
    for (const [key, value] of getArr) {
      const obj = { name: key, value: value };
      if (obj.value !== "") {
        paramsArr.push(obj);
      }
    }
    setparam(paramsArr);
  };
  dispatch(products(data?.data));

  return (
    <div>
      <div className="container mx-auto px-[10px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="mb-[30px]">
              <div className="w-[100%] lg:w-[50%] flex justify-between items-center">
                <input
                  {...register("search")}
                  name="search"
                  className="w-[80%] border border-[#1ABC9C] focus:outline-none p-[10px]"
                  type="text"
                  placeholder="search"
                />
                <button className="bg-[#1ABC9C] w-[20%] py-[11px] text-white px-[20px] cursor-pointer">
                  Search
                </button>
              </div>
            </div>
            <div className="lg:flex justify-between items-center gap-[30px]">
              <div className="w-full">
                <h5>Brand</h5>
                <select
                  {...register("brand")}
                  name="brand"
                  id=""
                  className="p-[10px] border border-[#1ABC9C] focus:outline-none w-full"
                >
                  <option value="">--select--</option>
                  <option value="Brand A">Brand A</option>
                  <option value="Brand B">Brand B</option>
                  <option value="Brand C">Brand C</option>
                  <option value="Brand D">Brand D</option>
                  <option value="Brand E">Brand E</option>
                  <option value="Brand F">Brand F</option>
                  <option value="Brand G">Brand G</option>
                </select>
              </div>
              <div className="w-full">
                <h5>Category</h5>
                <select
                  {...register("category")}
                  name="category"
                  id=""
                  className="p-[10px] border border-[#1ABC9C] focus:outline-none w-full"
                >
                  <option value="" selected>
                    --Select--
                  </option>
                  <option value="road">Road</option>
                  <option value="urban">Urban</option>
                  <option value="city">City</option>
                  <option value="mountain">Mountain</option>
                  <option value="touring">Touring</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="adventure">Adventure</option>
                  <option value="electric">Electric</option>
                </select>
              </div>
            </div>
            <div className="flex justify-center items-center mt-[30px] gap-[30px]">
              <div className="w-full">
                <h5>Max Price</h5>
                <input
                  {...register("max")}
                  name="max"
                  className="w-full border border-[#1ABC9C] focus:outline-none p-[10px]"
                  type="number"
                  placeholder="Max Price"
                />
              </div>
              <div className="w-full">
                <h5>Min Price</h5>
                <input
                  {...register("min")}
                  name="min"
                  className="w-full border border-[#1ABC9C] focus:outline-none p-[10px]"
                  type="number"
                  placeholder="Min Price"
                />
              </div>
            </div>
            <div className="mt-[30px]">
              <input {...register("inStock")} name="inStock" type="checkbox" />{" "}
              Availability
            </div>
            <div className="mt-[30px]">
              <button className="bg-[#1ABC9C] w-full py-[11px] text-white px-[20px] cursor-pointer">
                Filter
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilterForm;
