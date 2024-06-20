import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useEffect } from "react";

export const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  useEffect(() => {
    if ((user?.username || []).length === 0) {
      navigate("/");
    }
  }, [navigate, user]);
  return element;
};
