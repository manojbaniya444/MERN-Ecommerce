import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import LogoutModal from "./LogoutModal";
import { useAppContext } from "../context/globalContext";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const { auth, setAuth } = useAuthContext();

  const { search, setSearch } = useAppContext();

  const logoutHandler = () => {
    setShowModal(true);
  };

  return (
    <>
      {showModal && (
        <LogoutModal showModal={showModal} setShowModal={setShowModal} />
      )}

      <div className="bg-blue-900 text-white px-2 md:px-10 py-3 font-light text-sm md:text-md md:font-medium flex items-center justify-between sticky top-0 w-full z-10">
        {/* Base */}
        <div onClick={() => setSearch("")}>
          <NavLink to="/">
            <p className="text-base md:text-lg font-black">M-Store</p>
          </NavLink>
        </div>

        {/* Search */}
        <div className="flex-1 flex justify-center items-center">
          <input
            type="text"
            placeholder="Search products..."
            name="search"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="p-2 w-3/4 rounded-lg text-black font-medium outline-none"
          />
        </div>

        {/* Nav */}

        <div className="">
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
