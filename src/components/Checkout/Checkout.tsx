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
    </div>
  );
};

export default Checkout;
