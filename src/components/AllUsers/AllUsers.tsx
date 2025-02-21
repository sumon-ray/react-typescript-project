import { useGetUsersQuery } from "@/features/auth/authApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface User {
  _id: string;
  name: string;
  email: string;
}

const AllUsers = () => {
  const { data, error, isLoading } = useGetUsersQuery(undefined);

  if (isLoading) return <p>Loading...</p>;
  if (error) {
    const fetchError = error as FetchBaseQueryError;
    return <p>Error: {fetchError.status}</p>;
  }

  return (
    <div className="text-lg font-semibold">
      <table className="w-full ">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((user: User) => (
            <tr key={user._id}>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
