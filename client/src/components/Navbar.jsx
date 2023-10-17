import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import LogoutModal from "./LogoutModal";
import { useAppContext } from "../context/globalContext";
import { useCartContext } from "../context/cartContext";
import { useLocation } from "react-router-dom";
import MobileNavbar from "./MobileNavbar";

import { AiOutlineMenu } from "react-icons/ai";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const { auth, setAuth } = useAuthContext();

  const { search, setSearch } = useAppContext();
  const { cartItems } = useCartContext();

  const location = useLocation();

  const logoutHandler = () => {
    setShowModal(true);
  };

  return (
    <>
      {showModal && (
        <LogoutModal showModal={showModal} setShowModal={setShowModal} />
      )}
      {/* Mobile Nav Component */}
      {showMobileNav && (
        <MobileNavbar
          setShowModal={setShowModal}
          setShowMobileNav={setShowMobileNav}
          showModal={showModal}
        />
      )}

      <div className="bg-blue-900 text-white px-2 md:px-10 py-3 font-light text-sm md:text-md md:font-medium flex items-center justify-between sticky top-0 w-full z-10 gap-5 md:gap-0">
        {/* Base */}
        <div onClick={() => setSearch("")}>
          <NavLink to="/">
            <p className="text-base md:text-lg font-black">M-Store</p>
          </NavLink>
        </div>
        {/* Search */}
        {location.pathname.includes("/single-product") ? null : (
          <div className=" flex-1 md:flex justify-center items-center">
            <input
              type="text"
              placeholder="Search products..."
              name="search"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              className="p-2 md:w-3/4 w-full rounded-lg text-black font-medium outline-none"
            />
          </div>
        )}

        {/* Menu icon */}
        <div className="block md:hidden">
          <AiOutlineMenu
            className="text-3xl cursor-pointer"
            onClick={() => setShowMobileNav(true)}
          />
        </div>

        {/* Nav */}

        <div className="hidden md:block">
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
              {auth?.user?.role !== 1 && (
                <li className="relative">
                  <NavLink className="p-2 bg-blue-700 rounded-2xl" to="/cart">
                    Cart
                  </NavLink>
                  <p className="absolute -top-4 bg-blue-400 text-black font-thin px-2 rounded-[50%] -right-3 text-lg">
                    {cartItems?.length}
                  </p>
                </li>
              )}
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
