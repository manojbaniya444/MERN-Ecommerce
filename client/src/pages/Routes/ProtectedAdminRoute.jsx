import { useAuthContext } from "../../context/authContext";
import { Navigate, Outlet } from "react-router-dom";
import Login from "../Auth/Login";

const ProtectedAdminRoute = ({ children }) => {
  const { isAdminVerified } = useAuthContext();
  return isAdminVerified ? children : <Navigate to="/" />;
};

export default ProtectedAdminRoute;
