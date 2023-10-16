import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/authContext";
import axios from "axios";
import Loader from "../../components/Loader";

const ProtectedAdminRoute = ({ children }) => {
  const [verified, setVerified] = useState(false);

  const { auth, setAuthLoading, authLoading } = useAuthContext();

  useEffect(() => {
    const checkAuth = async () => {
      setAuthLoading(true);
      const response = await axios.get(
        "http://localhost:8080/users/check-admin-auth",
        {
          headers: {
            authorization: auth?.token,
          },
        }
      );
      if (response?.data?.success) {
        setAuthLoading(false);
        setVerified(true);
      }
    };
    if (authLoading) {
      return (
        <div>
          <h1 className="text-center font-bold text-xl p-9">Loading auth...</h1>
        </div>
      );
    }
    if (auth?.token) checkAuth();
  }, [auth?.token]);
  return verified ? children : <Loader />;
};

export default ProtectedAdminRoute;
