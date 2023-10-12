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
    setNotification({ show: true, message: "Logged out." });
    setShowModal(false);
    navigate("/login");
  };
  return (
    <div className="flex flex-col p-9 bg-black text-white  items-center w-[30%] fixed ml-[50%] -translate-x-[50%] top-5 z-100 rounded-lg">
      <p className="text-center font-medium text-xl">
        Are you sure want to log out?
      </p>
      <div className="flex w-full justify-between mt-9">
        <button
          className="p-3 bg-blue-600 cursor-pointer rounded-md text-white"
          onClick={logoutConfirmHandler}
        >
          Logout
        </button>
        <button
          className="p-3 bg-white text-black cursor-pointer rounded-md"
          onClick={() => setShowModal(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LogoutModal;
