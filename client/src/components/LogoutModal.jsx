import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/globalContext";
import { useAuthContext } from "../context/authContext";

const LogoutModal = ({ showModal, setShowModal }) => {
  const { setNotification } = useAppContext();

  const navigate = useNavigate();
  const { auth, setAuth } = useAuthContext();

  const logoutConfirmHandler = () => {
    setAuth(null);
    localStorage.removeItem("auth");
    setNotification({ show: true, message: "Logged out.", type: "success" });
    setShowModal(false);
    navigate("/login");
  };
  return (
    <div className="flex flex-col p-5 md:p-9 bg-black text-white  items-center w-[50%] md:w-[30%] fixed ml-[50%] -translate-x-[50%] top-5 z-30 rounded-lg">
      <p className="text-center text-sm font-normal md:text-md">
        Are you sure want to log out?
      </p>
      <div className="flex w-full justify-between mt-9">
        <button
          className="self-center px-2 py-1 md:px-3 md:py-2 bg-blue-600 cursor-pointer rounded-md text-white hover:bg-blue-900"
          onClick={logoutConfirmHandler}
        >
          Logout
        </button>
        <button
          className="p-3 self-center px-2 py-1 md:px-3 md:py-2 bg-white text-black cursor-pointer rounded-md hover:bg-gray-200"
          onClick={() => setShowModal(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LogoutModal;
