import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-slate-950 text-white px-20 py-3 font-medium flex items-center justify-between">
      <div>
        <NavLink to="/">Home</NavLink>
      </div>
      <div className="ml-20">
        <ul className="flex flex-row gap-5">
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
