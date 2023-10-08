import { useAuthContext } from "../../context/authContext";
import { Navigate } from "react-router-dom";

const ProtectedUserRoute = ({ children }) => {
  const { isUserVerified, auth, isAdminVerified } = useAuthContext();
  if (auth?.user?.role !== 1) {
    return isUserVerified ? children : <Navigate to="/login" />;
  } else {
    return <Navigate to="/" />;
  }
};
export default ProtectedUserRoute;
