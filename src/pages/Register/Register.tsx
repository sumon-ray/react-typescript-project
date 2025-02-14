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
      className="flex flex-col items-center justify-center h-screen bg-gray-100"
    >
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name:
          </label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email:
          </label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Password:
          </label>
          <input
            type="password"
            {...register("password", { required: true })}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <Button
          htmlType="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white hover:bg-blue-600"
        >
          {isLoading ? "Registering..." : "Register"}
        </Button>
        {error && <p className="text-red-500 mt-2">Registration failed!</p>}
      </div>
    </form>
  );
};

export default Register;
