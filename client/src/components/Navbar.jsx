import React from "react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { auth, setAuth, setIsUserVerified } = useAuthContext();

  const navigate = useNavigate();

  const logoutHandler = () => {
    setAuth(null);
    setIsUserVerified(false);
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
          <ul className="flex flex-row gap-5">
            <li className="cursor-pointer" onClick={logoutHandler}>
              Logout
            </li>
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
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
