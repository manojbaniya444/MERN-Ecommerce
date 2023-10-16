import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/authContext";
import Loader from "../../components/Loader";

const ProtectedUserRoute = ({ children }) => {
  const [userVerified, setUserVerified] = useState(false);
  const { auth, setAuthLoading, authLoading } = useAuthContext();

  useEffect(() => {
    const checkAuth = async () => {
      setAuthLoading(true);
      const response = await axios.get(
        "http://localhost:8080/users/check-user-auth",
        {
          headers: {
            authorization: auth?.token,
          },
        }
      );

      if (response?.data?.success) {
        setAuthLoading(false);
        setUserVerified(true);
      }
    };

    if (auth?.token) checkAuth();
  }, [auth?.token]);

  if (authLoading) {
    return (
      <div>
        <h1 className="text-center font-bold text-xl p-9">Loading auth...</h1>
      </div>
    );
  }
  return userVerified ? children : <Loader />;
};

export default ProtectedUserRoute;
