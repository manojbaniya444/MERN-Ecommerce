import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { useAppContext } from "../../context/globalContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const { setAuth, auth } = useAuthContext();
  const { setNotification, notification } = useAppContext();

  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "https://mern-ecommerce-sand.vercel.app/users/login",
        {
          email,
          password,
        }
      );
      // console.log(response?.data);
      setAuth({
        name: response?.data?.name,
        token: response?.data?.token,
        user: response?.data?.user,
      });
      localStorage.setItem("auth", JSON.stringify(response?.data));

      setTimeout(() => {
        setLoading(false);
        setEmail("");
        setPassword("");
        setErrorMessage(null);
        setNotification({
          ...notification,
          show: true,
          message: "Successfully log in",
          type: "success",
        });
        navigate("/");
      }, 700);
    } catch (error) {
      setTimeout(() => {
        setLoading(false);
        setErrorMessage(error?.response?.data.message);
      }, 700);
      console.log(error);
    }
  };
  return (
    <div>
      <Link to="/" className="m-5 text-3xl font-bold">
        M-Store
      </Link>
      <h2 className="text-center mt-5 text-2xl">Login</h2>
      {errorMessage && (
        <p className="text-2xl font-medium text-center text-red-700">
          {errorMessage}
        </p>
      )}
      <div className="flex flex-col items-center justify-center mt-2 text-sm md:text-base">
        <form
          onSubmit={loginHandler}
          className="bg-zinc-900 text-white flex flex-col gap-5 p-5 rounded-md w-3/4 max-w-[500px]"
        >
          <div className="flex flex-col gap-2">
            <label>Username</label>
            <input
              className="p-3 rounded-sm text-black"
              type="text"
              autoComplete="off"
              placeholder="Your registered username"
              required
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              value={email}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Password</label>
            <input
              className="p-3 rounded-sm text-black"
              type="password"
              autoComplete="off"
              placeholder="Enter password"
              required
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              value={password}
            />
          </div>
          <div className="flex items-center justify-between flex-col md:flex-row gap-2">
            <button
              type="submit"
              className="bg-blue-600 px-5 py-2 rounded-md cursor-pointer"
            >
              {loading ? (
                <ClipLoader
                  color="#ffffff"
                  loading={loading}
                  // cssOverride={override}
                  size={15}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                "Login"
              )}
            </button>

            <Link to="/register" className="text-blue-400 text-sm md:text-base">
              Don't have an account? Register
            </Link>
          </div>
        </form>
        <div className="flex flex-col mt-5 items-center justify-center gap-2 text-sm md:text-base font-thin">
          <p>
            <span className="font-medium">Admin account:</span> admin@gmail.com{" "}
            <span className="font-medium"> Password:</span> admin
          </p>
          <p>
            <span className="font-medium">User account</span>: user@gmail.com{" "}
            <span className="font-medium">Password:</span> user
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
