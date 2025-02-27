import { useAppDispatch } from "@/app/hook";
import { useLoginMutation } from "@/features/auth/authApi";
import { setUser } from "@/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import { Button, message } from "antd";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import image from '../../assets/images/sign-in.webp';

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    if (!data.email || !data.password) {
      message.error("Email and Password are required!");
      return;
    }

    try {
      const res = await login(data).unwrap();
      const token = res.data.token;
      const user = res.data.user;

      // Verify token
      const decodedToken = verifyToken(token);

      console.log("API Response:", res);
      console.log("User Data:", user);
      console.log("Decoded Token:", decodedToken);

      // Store in Redux
      dispatch(setUser({ user, token }));

      message.success("Login successful!"); 
      navigate("/");
    } catch (error) {
      message.error("Login failed! Please check your credentials."); 
    }
  };

  return (
    <div className="flex h-screen">
 <div className="flex-1 hidden md:flex relative"> 
        <img src={image} className="object-cover h-screen w-full" alt="Signup" />
      </div>


      <div className="flex items-center justify-center w-full md:w-1/2 dark:bg-[#04030343]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center border-2  justify-center  p-8 rounded-lg shadow-lg w-96"
        >
          <h2 className="text-3xl font-bold mb-6  text-center">
            Login
          </h2>

          <div className="mb-6 w-full">
            <label htmlFor="email" className="block text-sm font-medium ">
              Email:
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
              className="mt-1 block bg-[#04030343] w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
          </div>

          <div className="mb-6 w-full">
            <label htmlFor="password" className="block text-sm font-medium ">
              Password:
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: "Password is required" })}
              className="mt-1 bg-[#04030343] block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
          </div>

          <Button
            htmlType="submit"
            className="w-full bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
          >
            Login
          </Button>

          <p className="py-1 text-black">Or</p>
          <NavLink to="/register">
            <small className="text-blue-600">Register</small>
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default Login;
