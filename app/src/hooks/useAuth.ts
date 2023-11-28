import { useCallback, useState } from "react";
import { User } from "../types/user";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

export const useAuth = () => {
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  const { setUser } = useAuthContext();

  const login = useCallback(
    async (data: User) => {
      if (!errors) {
        setErrors(null);
      }
      console.log("login");

      await axios
        .post("/login", {
          ...data,
        })
        .then((res) => {
          setUser({
            email: data.email,
          });
          localStorage.setItem("token", res.data.token);
          navigate("/home");
        })
        .catch((err) => {
          console.log(err);
          setErrors(err.response.data.message);
        });
    },
    [errors, navigate, setUser]
  );
  const register = useCallback(
    async (data: User) => {
      if (!errors) {
        setErrors(null);
      }
      console.log("Register");
      await axios
        .post("/register", {
          ...data,
        })
        .then((res) => {
          setUser(data);
          setUser({
            email: data.email,
          });
          localStorage.setItem("token", res.data.token);
          navigate("/home");
        })
        .catch((err) => {
          setErrors(err.response.data.message);
        });
    },
    [errors, navigate, setUser]
  );
  return {
    register,
    login,
    errors,
  };
};
