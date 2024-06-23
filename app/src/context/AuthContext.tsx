import { ReactNode, createContext, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "../redux/user";
import { User } from "../types/user";
import { RootState } from "../redux";

type IAuthContext = {
  setUser: (value?: User) => void;
  user: User | null;
};

const AuthContext = createContext<IAuthContext | null>(null);
export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const user = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();
  const setUser = (value?: User) => {
    dispatch(setAuthUser(value));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext)!;
