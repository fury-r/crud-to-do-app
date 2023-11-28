import { configureStore } from "@reduxjs/toolkit";
import { toDoReducer } from "./toDo";
import { userReducer } from "./user";

export const store = configureStore({
  reducer: {
    toDo: toDoReducer,
    user: userReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
