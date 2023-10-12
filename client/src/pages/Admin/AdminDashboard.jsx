import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="flex items-center w-full display">
      <div className="self-start sticky top-0 bg-blue-700 py-5 px-4 h-[100vh] hidden sm:block">
        <NavLink to="/" className="font-medium text-3xl text-white">
          Home
        </NavLink>
        <div className="">
          <ul className="mt-5 flex flex-col gap-5 text-white">
            <li>
              <NavLink to="/admin" className="font-bold text-gray-400">
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
                to="/admin/orders"
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
