import { useDispatch } from "react-redux";
import axios from "../api/axios";
import { deleteTodoRedux, setTodo, updateTodoRedux } from "../redux/toDo";
import { useCallback, useState } from "react";
import { Todo } from "../types/todo";
import { useQuery } from "react-query";

export const useTodo = (state: Todo["status"]) => {
  const [status, setStatus] = useState(-1);
  const dispatch = useDispatch();

  const { refetch } = useQuery({
    queryKey: ["toDo", state],
    queryFn: (data) => getTodo(data),
    onSuccess: (data: any) => {
      if (data) dispatch(setTodo(data));
    },
  });

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

  const getTodo = async (options?: any) => {
    try {
      const res = await axios.post(
        `todo/bulk/get?filter=${
          options.queryKey[1] !== "All" ? options.queryKey[1] : "null"
        }`
      );

      return res.data.toDo;
    } catch (err) {
      console.error(err);
    }
  };

  return {
    addTodo,
    updateTodo,
    deleteTodo,
    status,
    bulkGet: refetch,
    getTodo,
  };
};
