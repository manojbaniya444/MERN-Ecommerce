import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { auth, setAuth, setIsUserVerified, setIsAdminVerified } =
    useAuthContext();

  const navigate = useNavigate();

  const logoutHandler = () => {
    setAuth(null);
    setIsUserVerified(false);
    setIsAdminVerified(false);
    localStorage.removeItem("auth");
    navigate("/login");
  };
  return (
    <div className="bg-slate-950 text-white px-20 py-3 font-medium flex items-center justify-between">
      <div>
        <NavLink to="/">Home</NavLink>
      </div>
      <div className="ml-20">
        {auth ? (
          <ul className="flex flex-row items-center gap-[40px]">
            <li className="cursor-pointer" onClick={logoutHandler}>
              Logout
            </li>
            <li className="flex items-center justify-between gap-3">
              <NavLink
                to={`${
                  auth?.user?.role === 1 ? "/dashboard/admin" : "/dashboard"
                }`}
              >
                Dashboard
              </NavLink>
              <Link
                to="/dashboard/user-profile"
                className={
                  auth?.user?.role === 1
                    ? "p-2 bg-green-700 rounded-lg"
                    : "p-2 bg-orange-700 rounded-lg"
                }
              >
                {auth?.user?.role === 1 ? "Admin" : `${auth?.user?.name}`}
              </Link>
            </li>
          </ul>
        ) : (
          <>
            <ul className="flex flex-row gap-5">
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
