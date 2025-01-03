import App from "@/App";
import Home from "@/pages/Home/Home";
import Login from "@/pages/login/Login";
import Service from "@/pages/Service/Service";
import Task from "@/pages/Task/Task";
import { createBrowserRouter } from "react-router-dom";

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
        path: "/task",
        element: <Task />,
      },
      {
        path: "/service",
        element: <Service />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default routes;
