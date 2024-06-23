import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { validateUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading && !user?.username && localStorage.getItem("token")) {
      validateUser().finally(() => {
        setLoading(false);
      });
    } else if (!loading && (user?.username || []).length === 0) {
      navigate("/");
    } else if (loading && user?.username) {
      setLoading(false);
    }
  }, [loading, navigate, user, validateUser]);

  if (loading) {
    return <></>;
  }
  return element;
};
