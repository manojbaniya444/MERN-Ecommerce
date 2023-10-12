import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import LogoutModal from "./LogoutModal";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const { auth, setAuth } = useAuthContext();

  const logoutHandler = () => {
    setShowModal(true);
    // setAuth(null);
    // localStorage.removeItem("auth");
    // setNotification({ show: true, message: "Logged out." });
    // navigate("/login");
  };
  return (
    <>
      {showModal && (
        <LogoutModal showModal={showModal} setShowModal={setShowModal} />
      )}

      <div className="bg-blue-900 text-white px-2 md:px-10 py-3 font-light text-sm md:text-md md:font-medium flex items-center justify-between sticky top-0 w-full z-10">
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
                <NavLink to={`${auth?.user?.role === 1 ? "/admin" : "/user"}`}>
                  Dashboard
                </NavLink>
                <Link
                  to={`${auth?.user?.role === 1 ? "/admin" : "/user/profile"}`}
                  className={
                    auth?.user?.role === 1
                      ? "p-2 bg-blue-700 rounded-lg text-white"
                      : "p-2 bg-blue-700 rounded-lg text-white"
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
    </>
  );
};

export default Navbar;
