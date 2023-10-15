import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/authContext";
import Loader from "../../components/Loader";

const ProtectedUserRoute = ({ children }) => {
  const [userVerified, setUserVerified] = useState(false);
  const { auth } = useAuthContext();

  useEffect(() => {
    const checkAuth = async () => {
      const response = await axios.get(
        "http://localhost:8080/users/check-user-auth",
        {
          headers: {
            authorization: auth?.token,
          },
        }
      );

      if (response?.data?.success) setUserVerified(true);
    };

    if (auth?.token) checkAuth();
  }, [auth?.token]);
  return userVerified ? children : <Loader />;
};

export default ProtectedUserRoute;
