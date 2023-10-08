import axios from "axios";
import { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [isUserVerified, setIsUserVerified] = useState(false);
  const [isAdminVerified, setIsAdminVerified] = useState(false);

  //! Fetch auth from local storage
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        name: parseData.name,
        token: parseData.token,
        user: parseData.user,
      });
    }
  }, []);

  //! User authorized protected route check
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

  //! Admin authorized protected route check
  useEffect(() => {
    const authCheck = async () => {
      const response = await axios.get(
        "http://localhost:8080/users/check-admin-auth",
        {
          headers: {
            authorization: auth?.token,
          },
        }
      );
      if (response) {
        setIsAdminVerified(response?.data?.success);
      }
    };

    if (auth?.token) authCheck();
  }, [auth?.token]);

  console.log("admin", isAdminVerified);
  console.log("user", isUserVerified);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        isUserVerified,
        setIsUserVerified,
        isAdminVerified,
        setIsAdminVerified,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
