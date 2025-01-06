import { RootState } from "@/app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

export interface User {
  id: string;
  name: string;
}

 export interface TUser {
  user: User[];
}

const initialState: TUser = {
  user: [
    {
      id: "3243t5fgscwsx",
      name: "sumon ray",
    },
    {
      id: "3243t5fgscs",
      name: "dalim ray",
    },
    {
      id: "3243t5fgscsax",
      name: "modon ray",
    },
  ],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // addUser: (state, action: PayloadAction<User>) => {
    //   const userData = {
    //     ...action.payload,
    //     id: uuid(),
    //   };
    //   state.user.push(userData);
    // },
  },
});



export const selectUsers = (state: RootState)=>{
return state.user.user
}


// export const { addUser } = userSlice.actions;

export default userSlice.reducer;

