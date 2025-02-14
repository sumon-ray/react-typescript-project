import { useAppDispatch } from "@/app/hook";
import { useLoginMutation } from "@/features/auth/authApi";
import { setUser } from "@/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import { Button } from "antd";
import { useForm } from "react-hook-form";

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
  console.log(error);
  const onSubmit = async(data) => {
    const userInfo = { email: data.email, password: data.password };
    const res = await login(userInfo).unwrap();
    const user = verifyToken(res.data.token)
    console.log(res)
    console.log(user)
   dispatch(setUser({ user: user, token: res.data.token }));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center h-screen bg-gray-100"
    >
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <div className="mb-4">
          <label
            htmlFor="id"
            className="block text-sm font-medium text-gray-700"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password:
          </label>
          <input
            type="text"
            id="password"
            {...register("password")}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <Button
          htmlType="submit"
          className="w-full bg-blue-500 text-white hover:bg-blue-600"
        >
          Login
        </Button>
      </div>
    </form>
  );
};

export default Login;
