import React from "react";

const Notification = ({ notification }) => {
  return (
    <div className="p-2 w-[300px] font-medium text-2xl mt-2 rounded bg-green-700 text-white left-[50%] absolute translate-x-[-50%] text-center z-10">
      {notification.message}
    </div>
  );
};

export default Notification;
