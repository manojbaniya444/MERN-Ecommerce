import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="flex items-center h-screen w-full">
      <div className="bg-orange-700 py-5 px-4 h-full">
        <Link to="/" className="font-medium text-3xl text-gray-300">
          Home
        </Link>
        <div className="">
          <ul className="mt-5 flex flex-col gap-5 text-white">
            <li>
              <Link to="/admin/create-category">Create category</Link>
            </li>
            <li>
              <Link to="/admin/add-products">Add Products</Link>
            </li>
            <li>
              <Link>View Orders</Link>
            </li>
            <li>
              <Link>Manage Products</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="min-h-full bg-gray-200 w-[100%]">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
