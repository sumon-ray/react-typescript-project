import { useSelector } from 'react-redux';
import { RootState } from "@/app/store";

// Custom hook to get the current user from Redux
export const useCurrentUser = () => {
  return useSelector((state: RootState) => state.auth.user);
};
