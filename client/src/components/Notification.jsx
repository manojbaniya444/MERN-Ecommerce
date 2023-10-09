import React from "react";

const Notification = ({ message = "Notification" }) => {
  return (
    <div className="p-2 w-[300px] h-[100px] mt-[5%]  bg-orange-700 text-white left-[50%] absolute translate-x-[-50%] text-center">
      {message}
    </div>
  );
};

export default Notification;
