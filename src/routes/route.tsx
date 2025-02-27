import App from "@/App";
import MainLayout from "@/components/MainLayout/MainLayout";
import Manageuser from "@/components/Manageuser";
import Home from "@/pages/Home/Home";
import Login from "@/pages/login/Login";
import CreateCar from "@/pages/product/CreateCar";
import ProductDetailsPage from "@/pages/product/ProductDetailsPage";
import Register from "@/pages/Register/Register";
import User from "@/pages/User/User";
import { createBrowserRouter} from "react-router-dom";
import Wrapper from "@/components/Checkout/Checkout";
import AllProducts from "@/pages/Home/AllProducts";
import Profile from "@/pages/Dashboard/UserProfile/Profile";
import ViewOrder from "@/pages/Dashboard/UserProfile/ViewOrder";
import UpdatePassword from "@/components/UpdatePassword/UpdatePassword";
import NewProducts from "@/pages/Dashboard/NewProducts/NewProducts";
import UpdateCarInfo from "@/pages/UpdateCarInfo/UpdateCarInfo";
import ProtectedRoute from '../components/protectedRoute/ProtectedRoute';
import About from "@/pages/About/About";

// const CheckoutWrapper = () => {
//   const { id } = useParams();
//   const { data: product } = useGetSingleProductQuery(id ?? '');
//   return <Checkout product={product} />;
// };

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/product/:id",
        element: <ProductDetailsPage />,
      },
        
    {
      path: "/about",
      element: <About />
    },
      {
        path: "/user",
        element: <User />,
      },
      {
        path: "checkout/:id",
        element: <ProtectedRoute>
          <Wrapper/>
        </ProtectedRoute>,
      },
      {
        path: "products",
        element: <AllProducts />,
      },
    ],
  },

  {
    path: "/dashboard",
    element: <ProtectedRoute>
      <MainLayout />
    </ProtectedRoute>,
    
    children: [
      
      {
        index: true,
        element: <Profile />,
      },

      {
        path: "update", // Make this a child route of /dashboard
        element: <UpdatePassword />,
      },
      {
        path: "users", // This should be a child route of "/dashboard"
        element: <Manageuser />,
      },
    
      {
        path: "create",
        element: <CreateCar />,
      },
      {
        path: "products",
        element: <NewProducts />,
      },
      // {
      //   path: "order",
      //   element: <ViewOrder/>,
      // },
      {
        path: "order",
        element: <ViewOrder/>,
      },
      {
        path: "update-car/:id",
        element: <UpdateCarInfo/>,
      },
   
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

]);


export default routes;
