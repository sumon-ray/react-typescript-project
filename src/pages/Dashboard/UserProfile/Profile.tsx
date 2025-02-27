import { useCurrentUser } from "@/features/auth/useCurrentUser";
import { FaPen, FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Profile = () => {
  const user = useCurrentUser();

  return (
    <div>
      {user ? (
        <div className="bg-white shadow-md rounded-lg gap-4 p-6 max-w-sm mx-auto flex items-center">
          <div className="relative">
            <FaUserCircle className="text-4xl mr-4" />
            <NavLink
              to="update"
              className="absolute right-0 bottom-0 text-blue-500"
            >
              <FaPen className="text-sm" />
            </NavLink>
          </div>
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-700">Email: {user.email}</p>
            <p className="text-gray-700">Role: {user.role}</p>
            {/* <p className="text-gray-500">Member since: {user.memberSince}</p> */}
          </div>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Profile;
