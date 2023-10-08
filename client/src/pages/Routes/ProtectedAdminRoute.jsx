import { useAuthContext } from "../../context/authContext";
import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const { isAdminVerified, auth } = useAuthContext();
  if (auth && auth?.user?.role !== 0) {
    return isAdminVerified ? children : <Navigate to="/" />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedAdminRoute;
