import { useAppDispatch } from "@/app/hook";
import { useRegisterMutation } from "@/features/auth/authApi";
import { setUser } from "@/features/auth/authSlice";
import { Button, message } from "antd";
import { useForm } from "react-hook-form";
import image from '../../assets/images/signUp.png';
import { useNavigate } from "react-router-dom";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<RegisterFormData>();
  const [registerUser, { isLoading, error }] = useRegisterMutation();
const navigate = useNavigate()

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const res = await registerUser(data).unwrap();
      console.log("Response:", res);

      if (res?.data) {
        dispatch(setUser({ user: res.data, token: null })); 
      }
      message.success("Register successful!");
      navigate('/login')
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
  <div className="flex justify-between gap-8 items-center ">
   <div className="flex-1 hidden md:flex relative"> 
        <img src={image} className="object-cover h-screen w-full" alt="Signup" /> 
      </div>
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-20 flex-1 items-center justify-center h-screen  dark:bg-[#04030343]"
    >
      {/* bg-[#00000053]  */}
      <div className="p-8 border-2 space-y-7  rounded-lg shadow-lg w-96 ">
        <h2 className="text-3xl font-bold mb-6 text-center">Register</h2>
        <div className="mb-5">
          <label className="block text-sm font-medium ">
            Name:
          </label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="mt-1 block bg-[#04030343] w-full border border-gray-400 rounded-md p-3 shadow-sm"
          />
        </div>
        <div className="mb-5">
          <label className="block text-sm font-medium ">
            Email:
          </label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="mt-1 block w-full border bg-[#04030343] border-gray-400 rounded-md p-3 shadow-sm"
          />
        </div>
        <div className="mb-5">
          <label className="block text-sm font-medium ">
            Password:
          </label>
          <input
            type="password"
            {...register("password", { required: true })}
            className="mt-1 block w-full border bg-[#04030343] border-gray-400 rounded-md p-3 shadow-sm"
          />
        </div>
        <Button
          htmlType="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white hover:bg-blue-700 transition duration-200"
        >
          {isLoading ? "Registering..." : "Register"}
        </Button>
        {error && <p className="text-red-600 mt-3">Registration failed!</p>}
        <p className="mt-4 text-sm text-center">
          <a href="#" className="text-blue-500 hover:underline">
            Forgot Password?
          </a>
        </p>
      </div>
    </form>
  </div>
  );
};

export default Register;
