import { useAppDispatch } from "@/app/hook";
import { PasswordUpdate, updatePassword } from "@/features/user/userSlice";
import React, { useState } from "react";
import { toast } from "react-toastify";

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    const data: PasswordUpdate = { currentPassword, newPassword };

    try {
      const res = await dispatch(updatePassword(data)); // Dispatch Redux action to update password

      // Check for success or error
      if (res.payload) {
        toast.success("Password updated successfully!");
      } else {
        // toast.error(res.payload || "Failed to update password");
      }
    } catch (error) {
      setError("An error occurred while updating the password.");
      toast.error("An error occurred while updating the password.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Update Password</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Current Password:
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              New Password:
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Confirm New Password:
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
