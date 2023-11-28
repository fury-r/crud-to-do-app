import { User } from "../types/user";
import { createSlice } from "@reduxjs/toolkit";
const initialState: User = {
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthUser: (_state, action) => {
      return {
        ...(action.payload || {}),
      };
    },
  },
});

export const { setAuthUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
