import { useAppDispatch } from "@/app/hook";
import { deleteUser, User } from "@/features/user/userSlice";

interface props {
  user: User;
}

const UserCard = ({ user }: props) => {
  const dispatch = useAppDispatch();
  const handleDelete = () => {
    dispatch(deleteUser(user.id));
  };

  return (
    <div className="bg-white gap-4 shadow-md rounded-lg p-4 mb-5 max-w-sm mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
      <div className="flex items-center">
        <h3 className="text-xl font-semibold text-gray-800">{user.name}</h3>
      </div>
      <div className="mt-4 ">
        <button
          onClick={handleDelete}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;
