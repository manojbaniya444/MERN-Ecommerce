import axios from "axios";
import { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  //Default headers
  axios.defaults.headers.common["Authorization"] = auth?.token;

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

  // //! Admin authorized protected route check
  // useEffect(() => {
  //   const authCheck = async () => {
  //     const response = await axios.get(
  //       "http://localhost:8080/users/check-admin-auth",
  //       {
  //         headers: {
  //           authorization: auth?.token,
  //         },
  //       }
  //     );
  //     if (response) {
  //       setIsAdminVerified(response?.data?.success);
  //       setIsUserVerified(false);
  //     }
  //   };

  //   if (auth?.token) authCheck();
  // }, [auth?.token]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
