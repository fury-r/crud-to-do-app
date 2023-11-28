import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  if ((user?.email || []).length === 0) {
    navigate("/");
    return <></>;
  }
  return element;
};
