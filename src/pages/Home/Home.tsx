import { Button } from "antd";
import { NavLink } from "react-router-dom";
import ReadProduct from "../product/ReadProduct";
import Banner from "./Banner";
import Testimonial from "./Tasimonial";
import Footer from "../Footer/Footer";

const Home = () => {
    return (
        <div>
         <Banner />
            <ReadProduct />
           <div className="mx-auto my-7  justify-center text-center">
           <NavLink to="/products">
          <Button className="py-5 w-40 font-semibold text-2xl">View All</Button>
        </NavLink>
           </div>

           <Testimonial />
           <Footer />
        </div>
    );
};

export default Home;