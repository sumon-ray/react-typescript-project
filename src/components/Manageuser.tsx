import {
  useBlockUserMutation,
  useGetUsersQuery,
} from "@/features/auth/authApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const ManageUser = () => {
  interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    isBlocked: boolean; 
  }

  // ✅ Get all users from API
  const { data, error, isLoading } = useGetUsersQuery(undefined);
  console.log(data);
  // ✅ Mutation for updating user status (Deactivate/Activate)
  // const [updateUserStatus] = useUpdateUserMutation();
  const [blockUser] = useBlockUserMutation();

  if (isLoading) return <p>Loading...</p>;
  if (error) {
    const fetchError = error as FetchBaseQueryError;
    return <p>Error: {fetchError.status}</p>;
  }


  const handleBlock = async (userId: string) => {
    try {
      await blockUser(userId);
      alert("User blocked successfully!");
    } catch (error) {
      console.error("Error blocking user:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-center text-xl font-bold">Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((user: User) => (
              <tr key={user._id} className="text-center">
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.role}</td>
                <td className="border p-2">
                <button
  className={`px-3 py-1 rounded ${
    user.isBlocked ? "bg-red-500 text-white" : "bg-green-500 text-white"
  }`}
  onClick={() => handleBlock(user._id)}
>
  {user.isBlocked ? "Unblock" : "Block"}
</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
