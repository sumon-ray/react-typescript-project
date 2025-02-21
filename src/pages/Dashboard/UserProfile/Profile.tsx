import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/features/auth/useCurrentUser";
import { NavLink, useNavigate } from "react-router-dom";

const Profile = () => {
  const user = useCurrentUser();
//   const navigate = useNavigate(); // Hook for navigation

//   const handleUpdatePasswordClick = () => {
//     // navigate("/update-password"); // Navigate to the Update Password page
//   };

  console.log("Logged-in User:", user);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      {user ? (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-sm mx-auto">
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-700">Email: {user.email}</p>
          <p className="text-gray-700">Role: {user.role}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}

      {/* <Button onClick={handleUpdatePasswordClick}>Update Password</Button> */}
      <NavLink to='update'>Update password</NavLink>
    </div>
  );
};

export default Profile;
