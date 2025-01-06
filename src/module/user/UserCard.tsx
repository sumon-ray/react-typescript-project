import { User } from "@/features/user/userSlice";

interface props {
  user: User;
}

const UserCard = ({ user }: props) => {
  return (
    <div className="bg-white gap-4 shadow-md rounded-lg p-4 mb-5 max-w-sm mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
      <div className="flex items-center">
        <h3 className="text-xl font-semibold text-gray-800">{user.name}</h3>
      </div>
      <div className="mt-4 ">
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          View Profile
        </button>
      </div>
    </div>
  );
};

export default UserCard;
