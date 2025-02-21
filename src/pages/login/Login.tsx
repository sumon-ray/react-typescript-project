import { useAppDispatch } from "@/app/hook";
import { useLoginMutation } from "@/features/auth/authApi";
import { setUser } from "@/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import { Button } from "antd";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
    const dispatch = useAppDispatch()
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "rahim2@gmail.com",
      password: "rahim12345",
    },
  });
  const [login, {  error }] = useLoginMutation();
//   console.log(data);
const navigate = useNavigate();

  const onSubmit = async (data) => {
    const userInfo = { email: data.email, password: data.password };
    const res = await login(userInfo).unwrap();
  
    const token = res.data.token;
    const user = res.data.user;
    // Verify the token
    const decodedToken = verifyToken(token);
  
    console.log("API Response:", res);
    console.log("User Data:", user);
    console.log("Decoded Token:", decodedToken);
  
    // Store both user and token in Redux
    dispatch(setUser({ user: user, token: token }));

    navigate('/')
  };
  
  
  return (
    <div className="flex h-screen">
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-r from-blue-500 to-blue-700 items-center justify-center">
        <h1 className="text-white text-4xl font-bold">Welcome Back!</h1>
      </div>
      <div className="flex items-center justify-center w-full md:w-1/2 bg-gray-100">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-lg w-80"
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Login</h2>
          <div className="mb-6 w-full">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div className="mb-6 w-full">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <Button
            htmlType="submit"
            className="w-full bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
          >
            Login
          </Button>
          <p className="py-1 text-black">Or</p>
   <NavLink to='/register'> <small className="text-blue-600">register</small> </NavLink>
        </form>
      </div>
    </div>
  );
};

export default Login;
