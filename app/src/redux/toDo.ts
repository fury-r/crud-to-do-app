import { Todo } from "../types/todo";
import { createSlice, current } from "@reduxjs/toolkit";
const initialState: {
  toDo: Todo[];
} = {
  toDo: [],
};

const toDoSlice = createSlice({
  name: "toDo",
  initialState,
  reducers: {
    setTodo: (state, action) => {
      state.toDo = action.payload;
      return state;
    },
    deleteTodoRedux: (state, action) => {
      const data = current(state);
      console.log(
        data,
        data.toDo.filter((value) => value.id !== action.payload.id),
        action.payload.id
      );
      state.toDo = data.toDo.filter((value) => value.id !== action.payload.id);
    },
    updateTodoRedux: (state, action) => {
      const data = current(state);
      state.toDo = data.toDo.map((value) => {
        if (value.id === action.payload.id) {
          return {
            ...action.payload,
          };
        }
        return value;
      });
    },
  },
});

export const { deleteTodoRedux, setTodo, updateTodoRedux } = toDoSlice.actions;

export const toDoReducer = toDoSlice.reducer;
