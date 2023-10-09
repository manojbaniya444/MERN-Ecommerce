import { useAuthContext } from "../../context/authContext";
import { Navigate } from "react-router-dom";

const ProtectedUserRoute = ({ children }) => {
  const { isUserVerified, auth } = useAuthContext();
  return isUserVerified ? children : <Navigate to="/" />;
};
export default ProtectedUserRoute;
