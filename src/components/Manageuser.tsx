import {
  useBlockUserMutation,
  useGetUsersQuery,
} from "@/features/auth/authApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { toast } from "react-toastify";

const ManageUser = () => {
  interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    isBlocked: boolean;
  }

  // ✅ Get all users from API
  const { data, error, isLoading, refetch } = useGetUsersQuery(undefined);
  
  // ✅ Mutation for blocking/unblocking users
  const [blockUser] = useBlockUserMutation();

  if (isLoading) return <p>Loading...</p>;
  if (error) {
    const fetchError = error as FetchBaseQueryError;
    return <p>Error: {fetchError.status}</p>;
  }

  // Function to handle block/unblock user
  const handleBlock = async (user: User) => {
    try {
      await blockUser(user._id);
      
      toast.success(
        user.isBlocked ? "User unblocked successfully!" : "User blocked successfully!"
      );

      //  Refresh user list after a small delay
      setTimeout(() => refetch(), 500);
    } catch (error) {
      console.error("Error blocking/unblocking user:", error);
      toast.error("Failed to update user status!");
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
                    onClick={() => handleBlock(user)}
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
