import Login from "../Auth/Login";
import { useAuthContext } from "../../context/authContext";

const ProtectedUserRoute = ({ children }) => {
  const { isUserVerified } = useAuthContext();
  return isUserVerified ? children : <Login />;
};

export default ProtectedUserRoute;
