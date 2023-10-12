import React from "react";
import Navbar from "../components/Navbar";
import AllProducts from "./AllProducts";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div>
        <div>
          <h1>Filter section</h1>
        </div>
        <AllProducts />
      </div>
    </div>
  );
};

export default Home;
