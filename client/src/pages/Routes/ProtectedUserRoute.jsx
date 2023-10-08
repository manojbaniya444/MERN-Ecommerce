import { useAuthContext } from "../../context/authContext";
import { Navigate } from "react-router-dom";

const ProtectedUserRoute = ({ children }) => {
  const { isUserVerified, auth } = useAuthContext();
  if (auth && auth?.user?.role !== 1) {
    return isUserVerified ? children : <Navigate to="/" />;
  } else {
    return <Navigate to="/login" />;
  }
};
export default ProtectedUserRoute;
