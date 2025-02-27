import { useAppSelector } from "@/app/hook";
import { selectUsers } from "@/features/user/userSlice";
import AddUserModal from "@/module/user/AddUserModal";
import UserCard from "@/module/user/UserCard";
// import UserCard from "@/module/user/userCard";

const User = () => {
  const users = useAppSelector(selectUsers);
  return (
    <div>
        <div className="flex justify-around p-4">
            <h1>User</h1>
            <AddUserModal />
        </div>
      {users.map((user, index) => (
        <UserCard key={index} user={user} />
      ))}
    </div>
  );
};

export default User;
