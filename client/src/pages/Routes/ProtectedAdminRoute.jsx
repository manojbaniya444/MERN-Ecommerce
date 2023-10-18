import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/authContext";
import axios from "axios";
import Loader from "../../components/Loader";
import HashLoader from "react-spinners/HashLoader";

const ProtectedAdminRoute = ({ children }) => {
  const [verified, setVerified] = useState(false);

  const { auth, setAuthLoading, authLoading } = useAuthContext();

  useEffect(() => {
    const checkAuth = async () => {
      setAuthLoading(true);
      const response = await axios.get(
        "https://mern-ecommerce-sand.vercel.app/users/check-admin-auth",
        {
          headers: {
            authorization: auth?.token,
          },
        }
      );
      if (response?.data?.success) {
        setVerified(true);
        setAuthLoading(false);
      }
    };
    if (authLoading) {
      return (
        <div className="flex justify-center mt-10">
          <h1 className="mt-10 text-center text-2xl font-medium">Loading</h1>
          <HashLoader
            color="#2574d4"
            loading={true}
            // cssOverride={override}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      );
    }
    if (auth?.token) checkAuth();
  }, [auth?.token]);
  return verified ? children : <Loader />;
};

export default ProtectedAdminRoute;
