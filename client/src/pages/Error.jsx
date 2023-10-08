import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div>
      404 Page Not Found <Link to="/">Home</Link>
    </div>
  );
};

export default Error;
