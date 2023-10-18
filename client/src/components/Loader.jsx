import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const Loader = () => {
  const [timer, setTimer] = useState(5);

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((timer) => timer - 1);
    }, 1000);

    timer === 0 && navigate("/");

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="flex mx-auto w-[500px] items-center justify-center flex-col bg-blue-400 text-white mt-5 p-2 text-lg font-medium rounded-md">
      <h1 className="mb-5">Please wait...</h1>

      <ClipLoader
        color="#ffffff"
        loading={true}
        // cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />

      <h1 className="mt-5 text-lg text-center">{timer}</h1>

      {/* <Link
        to="/login"
        className="px-5 py-2 bg-blue-700 text-white corsor-pointer rounded-md"
      >
        Login now
      </Link>
      <br />
      <Link
        to="/register"
        className="px-5 py-2 bg-gray-100 text-black borde cursor-pointer rounded-md"
      >
        Register now
      </Link> */}
    </div>
  );
};

export default Loader;
