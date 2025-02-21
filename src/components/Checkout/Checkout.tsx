import { useGetSingleProductQuery } from "@/features/products/getSingleProduct";
import { useParams } from "react-router-dom";
import OrderForm from "./OrderForm";

const Checkout = () => {
  const { id } = useParams();
  const { data: product } = useGetSingleProductQuery(id ?? "");
  if (!product) {
    return <div>No product data available</div>;
  }

  return (
    <div className="px-20 my-10 flex justify-between items-center ">
    <OrderForm />
      {/* <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm">
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <p className="text-lg font-medium">
            Price: <span className="text-green-500">${product.price}</span>
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default Checkout;
