import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const Register = () => {
  const [registerFormData, setRegisterFormData] = useState({
    name: "",
    email: "",
    password: "",
    answer: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setRegisterFormData({
      ...registerFormData,
      [e.target.name]: e.target.value,
    });
  };
  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "https://mern-ecommerce-sand.vercel.app/users/register",
        registerFormData
      );

      if (response) {
        setLoading(false);
        setRegisterFormData({ name: "", email: "", password: "", answer: "" });
        navigate("/login");
      }
    } catch (error) {
      setLoading(false);
      setError(error.response?.data.message);
      console.log("Error register user", error);
    }
  };
  return (
    <>
      <Link to="/" className="m-5 text-3xl font-bold">
        M-Store
      </Link>
      <h2 className="text-center mt-5 text-2xl">Register</h2>
      <div className="flex items-center justify-center mt-2 text-sm md:text-base">
        <form
          onSubmit={registerHandler}
          className="bg-zinc-900 text-white flex flex-col gap-5 p-5 rounded-md w-3/4 max-w-[500px]"
        >
          {error && <p>{error}</p>}
          <div className="flex flex-col gap-2">
            <label>Name</label>
            <input
              className="p-3 rounded-sm text-black"
              type="text"
              autoComplete="off"
              placeholder="Enter your full name"
              required
              onChange={onChangeHandler}
              name="name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Username</label>
            <input
              className="p-3 rounded-sm text-black"
              type="text"
              placeholder="Unique username"
              autoComplete="off"
              required
              onChange={onChangeHandler}
              name="email"
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
              onChange={onChangeHandler}
              name="password"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Security answer</label>
            <input
              className="p-3 rounded-sm text-black"
              type="text"
              autoComplete="off"
              placeholder="Security answer (any)"
              required
              onChange={onChangeHandler}
              name="answer"
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
                "Register"
              )}
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
