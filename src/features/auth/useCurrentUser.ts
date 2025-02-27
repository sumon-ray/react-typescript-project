import { useSelector } from 'react-redux';
import { RootState } from "@/app/store";

export const useCurrentUser = () => {
  return useSelector((state: RootState) => state.auth.user);
};
