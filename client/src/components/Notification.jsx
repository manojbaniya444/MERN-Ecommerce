import React from "react";

const Notification = ({ notification }) => {
  return (
    <div className="p-5 shadow-lg w-[300px] font-medium rounded-md bg-white  text-black left-[50%] fixed top-3 translate-x-[-50%] text-center  z-40 text-sm md:text-base">
      {notification.message}
    </div>
  );
};

export default Notification;
