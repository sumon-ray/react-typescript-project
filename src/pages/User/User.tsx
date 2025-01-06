import { useAppSelector } from "@/app/hook";
import { selectUsers } from "@/features/user/userSlice";
import UserCard from "@/module/user/userCard";

const User = () => {
  const users = useAppSelector(selectUsers);
  return (
    <div>
      user
      {users.map((user, index) => (
        <UserCard key={index} user={user} />
      ))}
    </div>
  );
};

export default User;
