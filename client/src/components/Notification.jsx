import React from "react";

const Notification = ({ notification }) => {
  return (
    <div className="p-2 w-[300px] font-medium rounded bg-gray-900  text-white left-[50%] fixed top-3 translate-x-[-50%] text-center z-1000">
      {notification.message}
    </div>
  );
};

export default Notification;
