import { useDispatch } from "react-redux";
import axios from "../api/axios";
import { deleteTodoRedux, updateTodoRedux } from "../redux/toDo";
import { useCallback, useState } from "react";
import { Todo } from "../types/todo";

export const useTodo = () => {
  const [status, setStatus] = useState(-1);

  const dispatch = useDispatch();

  const addTodo = useCallback(
    async (data: Todo) => {
      await axios
        .post("/todo/add", data)
        .then(() => {
          setStatus(1);
        })
        .catch((err) => {
          if (err?.response?.data) {
            setStatus(2);
          }
          console.log(err);
        });
    },
    [setStatus]
  );
  const updateTodo = useCallback(
    async (data: Todo) => {
      await axios
        .post("/todo/update", data)
        .then(() => {
          setStatus(1);
          dispatch(updateTodoRedux(data));
        })
        .catch((err) => {
          if (err?.response?.data) {
            setStatus(2);
          }
          console.error(err);
        });
    },
    [dispatch]
  );

  const deleteTodo = useCallback(
    async (id: string | number) => {
      await axios
        .delete("/todo/delete/" + id)
        .then(() => {
          dispatch(deleteTodoRedux({ id }));
        })

        .catch((err) => {
          console.log(err);
          setStatus(2);
        });
    },
    [dispatch]
  );
  return {
    addTodo,
    updateTodo,
    deleteTodo,
    status,
  };
};
