import React from "react";
import { useAuthContext } from "../context/authContext";

const UserDashboard = () => {
  const { auth } = useAuthContext();

  return (
    <div className="flex flex-col items-center justify-center p-5">
      <div className="flex gap-5 text-2xl">
        <p>Name: {auth?.user.name}</p>
        <p>Email: {auth?.user.email}</p>
      </div>
      <button
        onClick={() => alert("Soon available")}
        className="border-solid border-2 px-5 py-2 mt-3 rounded-md "
      >
        Change Password
      </button>
    </div>
  );
};

export default UserDashboard;
