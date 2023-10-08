import axios from "axios";
import { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [isUserVerified, setIsUserVerified] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({ ...auth, name: parseData.name, token: parseData.token });
    }
  }, []);

  useEffect(() => {
    const authCheck = async () => {
      const response = await axios.get(
        "http://localhost:8080/users/check-user-auth",
        {
          headers: {
            authorization: auth?.token,
          },
        }
      );
      setIsUserVerified(response?.data?.success);
    };
    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token]);

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, isUserVerified, setIsUserVerified }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
