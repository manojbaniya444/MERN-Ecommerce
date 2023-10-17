import React from "react";
import { useAuthContext } from "../context/authContext";
import { useCartContext } from "../context/cartContext";
import { Link, NavLink } from "react-router-dom";

import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { FiLogIn } from "react-icons/fi";

const MobileNavbar = ({ setShowModal, setShowMobileNav, showModal }) => {
  const { auth } = useAuthContext();
  const { cartItems } = useCartContext();

  return (
    <div className=" bg-white bg-opacity-95 shadow-lg blur-0 flex flex-col h-[100vh] w-[70vw] sm:w-[50vw] fixed top-0 right-0 z-20 ">
      <div>
        <AiOutlineClose
          className="text-3xl cursor-pointer absolute top-2 right-3"
          onClick={() => setShowMobileNav(false)}
        />
      </div>
      {auth ? (
        <ul className="mt-20 flex flex-col gap-5 items-start py-10 pl-5">
          <li className="font-medium">
            Welcome,{" "}
            {auth?.user?.role === 1
              ? `${auth?.user?.name}(Admin) `
              : auth?.user?.name}
          </li>

          <li className="flex flex-col items-start gap-3 ">
            <NavLink
              to={`${auth?.user?.role === 1 ? "/admin" : "/user"}`}
              className="font-medium hover:text-gray-700 hover:font-bold flex gap-2"
            >
              <MdOutlineSpaceDashboard className="text-2xl" />
              Go to Dashboard
            </NavLink>
          </li>

          <li>
            <Link
              to={`${auth?.user?.role === 1 ? "/admin" : "/user/my-orders"}`}
              className=" font-medium hover:text-gray-700 hover:font-bold flex gap-2"
            >
              {/* {auth?.user?.role === 1 ? "Admin" : `${auth?.user?.name}`} */}
              <LiaShippingFastSolid className="text-2xl" />
              {auth?.user?.role === 1 ? "Manage Orders" : "My Orders"}
            </Link>
          </li>
          {auth?.user?.role !== 1 && (
            <li className="">
              <NavLink
                className="font-medium hover:text-gray-700 hover:font-bold flex gap-2"
                to="/cart"
              >
                <AiOutlineShoppingCart className="text-2xl" />
                Cart ({cartItems?.length} Items)
              </NavLink>
              <p className=""></p>
            </li>
          )}
          <li
            className="cursor-pointer bg-blue-700 text-white px-3 py-2 rounded-lg mt-10 flex gap-2 items-center hover:bg-blue-900"
            onClick={() => setShowModal(true)}
          >
            Logout <FiLogOut className="text-xl" />
          </li>
        </ul>
      ) : (
        <>
          <ul className="flex mt-20 text-2xl self-center flex-col">
            <li className="text-center text-base">Login first</li>
            <li className="rounded-md  bg-blue-700 text-white mt-5">
              <NavLink
                to="/login"
                className="flex text-2xl items-center px-4 py-2 gap-2"
              >
                Login <FiLogIn />
              </NavLink>
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default MobileNavbar;
