import React from "react";
import { useAuthContext } from "../../context/authContext";

const AdminIndex = () => {
  const { auth } = useAuthContext();

  return (
    <div className="flex flex-col mt-[200px] items-center content-center text-center text-3xl ">
      <h1>Admin Index page</h1>
      <h1>Admin name: {auth?.user?.name}</h1>
    </div>
  );
};

export default AdminIndex;
