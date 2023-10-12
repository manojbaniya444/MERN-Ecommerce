import React from "react";
import Navbar from "../components/Navbar";
import AllProducts from "./AllProducts";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col sm:flex-row">
        <div className="bg-gray-100 text-black p-2">
          <h1>Filter section</h1>
        </div>
        <AllProducts />
      </div>
    </div>
  );
};

export default Home;
