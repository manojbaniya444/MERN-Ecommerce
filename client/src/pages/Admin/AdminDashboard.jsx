import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="flex flex-col md:flex-row items-center w-full display text-sm md:text-normal">
      <div className="w-full flex  items-center flex-col md:max-w-[15%] md:self-start sticky top-0 bg-blue-700 py-5 px-4 md:h-[100vh]  z-10">
        <NavLink to="/" className="font-medium text-3xl  text-white ">
          Home
        </NavLink>
        <div className="">
          <ul className="mt-5 flex md:flex-col gap-5 text-white justify-center items-center">
            <li>
              <NavLink to="/admin" className="font-bold text-white">
                Manage Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/create-category"
                className={({ isActive }) =>
                  isActive ? "text-black font-medium" : "text-white"
                }
              >
                Create category
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/add-products"
                className={({ isActive }) =>
                  isActive ? "text-black font-medium" : "text-white"
                }
              >
                Add Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/manage-orders"
                className={({ isActive }) =>
                  isActive ? "text-black font-medium" : "text-white"
                }
              >
                View Orders
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="self-start min-h-[100vh] pb-5 w-[100%]">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
