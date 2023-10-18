import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/authContext";
import Loader from "../../components/Loader";
import HashLoader from "react-spinners/HashLoader";

const ProtectedUserRoute = ({ children }) => {
  const [userVerified, setUserVerified] = useState(false);
  const { auth, setAuthLoading, authLoading } = useAuthContext();

  useEffect(() => {
    const checkAuth = async () => {
      setAuthLoading(true);
      const response = await axios.get(
        "https://mern-ecommerce-sand.vercel.app/users/check-user-auth",
        {
          headers: {
            authorization: auth?.token,
          },
        }
      );

      if (response?.data?.success) {
        setUserVerified(true);
        setAuthLoading(false);
      }
    };

    if (auth?.token) checkAuth();
  }, [auth?.token]);

  if (authLoading) {
    return (
      <div className="flex justify-center mt-10">
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
  return userVerified ? children : <Loader />;
};

export default ProtectedUserRoute;
