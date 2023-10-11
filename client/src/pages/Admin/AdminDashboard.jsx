import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="flex items-center w-full">
      <div className="self-start sticky top-0 bg-orange-700 py-5 px-4 h-[100vh]">
        <Link to="/" className="font-medium text-3xl text-white">
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
      <div className="self-start min-h-[100vh] pb-5 w-[100%]">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
