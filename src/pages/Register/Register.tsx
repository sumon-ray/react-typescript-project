import { useAppDispatch } from "@/app/hook";
import { useRegisterMutation } from "@/features/auth/authApi";
import { setUser } from "@/features/auth/authSlice";
import { Button } from "antd";
import { useForm } from "react-hook-form";

const Register = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm();
  const [registerUser, { isLoading, error }] = useRegisterMutation();

  const onSubmit = async (data) => {
    try {
      const res = await registerUser(data).unwrap();
      console.log("Response:", res);

      if (res?.data) {
        dispatch(setUser({ user: res.data, token: null })); // 🔥 Redux Store-এ user save
        alert("User registered successfully!");
      }
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center h-screen bg-gray-200"
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold mb-6 text-center">Register</h2>
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-800">
            Name:
          </label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="mt-1 block w-full border border-gray-400 rounded-md p-3 shadow-sm"
          />
        </div>
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-800">
            Email:
          </label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="mt-1 block w-full border border-gray-400 rounded-md p-3 shadow-sm"
          />
        </div>
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-800">
            Password:
          </label>
          <input
            type="password"
            {...register("password", { required: true })}
            className="mt-1 block w-full border border-gray-400 rounded-md p-3 shadow-sm"
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
  );
};

export default Register;
