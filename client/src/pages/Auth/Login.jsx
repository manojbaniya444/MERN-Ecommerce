import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/users/login", {
        email,
        password,
      });
      console.log(response?.data);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h2 className="text-center mt-5 text-2xl">Login</h2>
      <div className="flex items-center justify-center mt-[5%]">
        <form
          onSubmit={loginHandler}
          className="bg-zinc-900 text-white flex flex-col gap-5 p-5 rounded-md w-3/4 max-w-[500px]"
        >
          <div className="flex flex-col gap-2">
            <label>Email</label>
            <input
              className="p-3 rounded-sm text-black"
              type="email"
              placeholder="Enter email"
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
              placeholder="Enter password"
              required
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              value={password}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-orange-600 px-5 py-2 rounded-md cursor-pointer"
            >
              Login
            </button>

            <Link to="/register" className="text-blue-400">
              Don't have an account? Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
