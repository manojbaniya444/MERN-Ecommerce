import React from "react";

const Notification = ({ notification }) => {
  let style =
    "p-5 shadow-lg w-[300px] font-medium rounded-md bg-white  left-[50%] fixed top-3 translate-x-[-50%] text-center  z-40 text-sm md:text-base text-black p-3";
  if (notification.type === "success") {
    style =
      "p-5 shadow-lg w-[300px] font-medium rounded-md bg-white  left-[50%] fixed top-3 translate-x-[-50%] text-center  z-40 text-sm md:text-base text-green-500";
  } else if (notification.type === "error") {
    style =
      "p-5 shadow-lg w-[300px] font-medium rounded-md bg-white  left-[50%] fixed top-3 translate-x-[-50%] text-center  z-40 text-sm md:text-base text-red-500";
  } else if (notification.type === "warning") {
    style =
      " p-5 shadow-lg w-[300px] font-medium rounded-md bg-white  left-[50%] fixed top-3 translate-x-[-50%] text-center  z-40 text-sm md:text-base text-yellow-500";
  }
  return <div className={style}>{notification.message}</div>;
};

export default Notification;
