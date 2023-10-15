import React from "react";
import Navbar from "../../components/Navbar";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <Link to="/" className="font-medium text-3xl">
        M-Store
      </Link>
      <ul className="flex gap-5 items-center justify-center mt-5">
        <li className="p-4 bg-blue-600 text-white rounded-sm cursor-pointer">
          <Link to="/user/profile">User Profile</Link>
        </li>
        <li className="p-4 bg-blue-600 text-white rounded-sm cursor-pointer">
          <Link to="/user/orders">My Orders</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default Dashboard;
