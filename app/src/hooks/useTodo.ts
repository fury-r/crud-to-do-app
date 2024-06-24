import { useDispatch } from "react-redux";
import axios from "../api/axios";
import { deleteTodoRedux, setTodo, updateTodoRedux } from "../redux/toDo";
import { useCallback, useEffect, useState } from "react";
import { Todo } from "../types/todo";
import { QueryCache, useQuery, useQueryClient } from "react-query";

export const useTodo = (state: Todo["status"]) => {
  const [status, setStatus] = useState(-1);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { refetch, isFetching } = useQuery({
    queryKey: ["toDo", state],
    queryFn: (data) => getTodo(data),
    onSuccess: (data: any) => {
      if (data) dispatch(setTodo(data));
    },
    cacheTime: 5000,
    staleTime: 5000,
    refetchOnWindowFocus: true,
    enabled: false,
  });
  const _cache = new QueryCache({
    onSuccess: (data: any, query: any) => {
      console.log(data, query);
    },
    onError: (data: any, query: any) => {
      console.log(data, query);
    },
  });

  useEffect(() => {
    console.log(isFetching);
    if (!isFetching) {
      const cachedData = queryClient.getQueryData(["toDo", state || "ALL"]);
      if (cachedData) {
        dispatch(setTodo(cachedData));
      } else {
        console.log("invoke");
        refetch();
      }
    }
  }, [state, dispatch, queryClient, refetch, isFetching]);

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
    console.log(options);
    try {
      if (options.queryKey[1]) {
        const res = await axios.post(
          `todo/bulk/get?filter=${options.queryKey[1]}`
        );
        return res.data.toDo;
      }
      throw new Error("param missing");
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
