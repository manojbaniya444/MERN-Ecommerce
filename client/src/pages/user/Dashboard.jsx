import React from "react";
import Navbar from "../../components/Navbar";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <div className="">
        <ul className="flex gap-5 items-center justify-center p-5 bg-gray-200">
          <Link className="absolute left-5 text-2xl font-bold" to="/">
            M-Store
          </Link>
          <li className="p-4 bg-blue-600 text-white rounded-sm cursor-pointer">
            <Link to="/user/profile">User Profile</Link>
          </li>
          <li className="p-4 bg-blue-600 text-white rounded-sm cursor-pointer">
            <Link to="/user/my-orders">My Orders</Link>
          </li>
          <li className="p-4 bg-blue-600 text-white rounded-sm cursor-pointer">
            <Link to="/user/order-history">Order History</Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </>
  );
};

export default Dashboard;
