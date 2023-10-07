import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  const [registerFormData, setRegisterFormData] = useState({
    name: "",
    email: "",
    password: "",
    answer: "",
  });

  const onChangeHandler = (e) => {
    setRegisterFormData({
      ...registerFormData,
      [e.target.name]: e.target.value,
    });
  };
  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/users/register",
        registerFormData
      );
      console.log(response.data.message);
      setRegisterFormData({ name: "", email: "", password: "", answer: "" });
    } catch (error) {
      console.log("Error register user", error.response.data.message, error);
    }
  };
  return (
    <>
      <h2 className="text-center mt-5 text-2xl">Register</h2>
      <div className="flex items-center justify-center mt-[5%]">
        <form
          onSubmit={registerHandler}
          className="bg-zinc-900 text-white flex flex-col gap-5 p-5 rounded-md w-3/4 max-w-[500px]"
        >
          <div className="flex flex-col gap-2">
            <label>Name</label>
            <input
              className="p-3 rounded-sm text-black"
              type="text"
              placeholder="Enter username"
              required
              onChange={onChangeHandler}
              name="name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Email</label>
            <input
              className="p-3 rounded-sm text-black"
              type="email"
              placeholder="Enter username"
              required
              onChange={onChangeHandler}
              name="email"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Password</label>
            <input
              className="p-3 rounded-sm text-black"
              type="text"
              placeholder="Enter username"
              required
              onChange={onChangeHandler}
              name="password"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Security answer</label>
            <input
              className="p-3 rounded-sm text-black"
              type="text"
              placeholder="Enter username"
              required
              onChange={onChangeHandler}
              name="answer"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-orange-600 px-5 py-2 rounded-md cursor-pointer"
            >
              Register
            </button>

            <Link to="/login" className="text-blue-400">
              Already have an account? Login
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
