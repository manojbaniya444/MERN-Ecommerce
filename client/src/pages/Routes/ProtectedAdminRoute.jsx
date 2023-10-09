import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/authContext";
import axios from "axios";
import Loader from "../../components/Loader";

const ProtectedAdminRoute = ({ children }) => {
  const [verified, setVerified] = useState(false);

  const { auth } = useAuthContext();

  useEffect(() => {
    const checkAuth = async () => {
      const response = await axios.get(
        "http://localhost:8080/users/check-admin-auth",
        {
          headers: {
            authorization: auth?.token,
          },
        }
      );
      if (response?.data?.success) {
        setVerified(true);
      }
    };

    if (auth?.token) checkAuth();
  }, [auth?.token]);
  return verified ? children : <Loader />;
};

export default ProtectedAdminRoute;
