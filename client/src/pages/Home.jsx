import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import AllProducts from "./AllProducts";
import axios from "axios";
import FilteredProducts from "./FilteredProducts";
import { useAppContext } from "../context/globalContext";
import Search from "./Search";

const Home = () => {
  const [categories, setCategories] = useState();
  const [categoryQuery, setCategoryQuery] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState();
  const [priceQuery, setPriceQuery] = useState({
    min: "",
    max: "",
  }); // [0] -> min price [1] -> max price

  const { searchProducts, search } = useAppContext();

  const fetchAllCategory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/category/all-category"
      );
      if (response) {
        setCategories(response.data.allCategory);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchAllCategory();
  }, []);

  //* Set category handler (query)
  const categorySetHandler = (id) => {
    {
      if (categoryQuery.includes(id)) {
        return setCategoryQuery((prev) => prev.filter((item) => item !== id));
      }
      setCategoryQuery([...categoryQuery, id]);
    }
  };

  //* Reset filter
  const resetFilterHandler = () => {
    setPriceQuery({ min: "", max: "" });
    setCategoryQuery([]);
    setFilteredProducts(null);
  };

  //* Fetch the products on filter change

  const fetchFilterProducts = async () => {
    let filter = {};

    if (
      categoryQuery.length === 0 &&
      priceQuery.min === "" &&
      priceQuery.max === ""
    ) {
      return;
    }

    if (priceQuery.min === "" && priceQuery.max === "") {
      filter.category = categoryQuery;
      filter.price = {
        min: 0,
        max: 9999999,
      };
    } else if (priceQuery.min === "") {
      filter.category = categoryQuery;
      filter.price = {
        min: 0,
        max: +priceQuery.max,
      };
    } else if (priceQuery.max === "") {
      filter.category = categoryQuery;
      filter.price = {
        min: +priceQuery.min,
        max: 9999999,
      };
    } else {
      filter.category = categoryQuery;
      filter.price = {
        min: +priceQuery.min,
        max: +priceQuery.max,
      };
    }

    console.log(filter);
    try {
      const response = await axios.post(
        "http://localhost:8080/products/filter-products",
        filter
      );
      setFilteredProducts(response?.data.products);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  if (search !== "") {
    return (
      <div>
        <Navbar />
        <Search products={searchProducts} />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      {/* {JSON.stringify(categoryQuery, null, 4)}
      {JSON.stringify(priceQuery, null, 4)} */}

      <div className="flex flex-col ">
        {/* Filter */}
        <div className="bg-gray-100 text-black p-2 fixed flex w-full z-10 flex-col md:flex-row justify-between">
          {/* Category Filter */}
          <div className="flex gap-5 flex-wrap justify-center items-center p-2 md:max-w-1/2">
            {categories?.map((item) => {
              return (
                <button
                  className={
                    categoryQuery.includes(item?._id)
                      ? "p-1 bg-blue-200 rounded-xl capitalize font-medium text-sm md:text-base shadow-sm hover:bg-gray-200"
                      : "p-1 bg-gray-100 rounded-xl capitalize font-medium text-sm md:text-base shadow-sm hover:bg-gray-200"
                  }
                  key={item?._id}
                  onClick={() => categorySetHandler(item?._id)}
                >
                  {item?.name}
                </button>
              );
            })}
          </div>
          {/* Price filter */}
          <div className="flex item-center justify-center gap-2">
            <input
              type="number"
              placeholder="minimum price"
              className=" w-[20%] md:w-[30%] outline-none p-2  rounded-md self-center"
              value={priceQuery.min}
              onChange={(e) =>
                setPriceQuery({ ...priceQuery, min: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="maximum price"
              className="w-[20%] md:w-[30%] outline-none p-2 rounded-md self-center"
              value={priceQuery.max}
              onChange={(e) =>
                setPriceQuery({ ...priceQuery, max: e.target.value })
              }
            />
            <button
              onClick={fetchFilterProducts}
              className="bg-gray-900 text-white text-sm p-2 rounded-lg cursor-pointer self-center"
            >
              Find
            </button>
            <button
              onClick={resetFilterHandler}
              className="bg-gray-100 text-black text-sm p-2 rounded-lg cursor-pointer border-black border self-center"
            >
              Reset
            </button>
          </div>
        </div>
        <div className="w-full mt-[70px] h-[300px]">
          <img
            src="/banner12.jpeg"
            alt="banner-image"
            className="w-full object-cover h-full"
          />
        </div>
        {filteredProducts?.length > 0 ? (
          <FilteredProducts products={filteredProducts} />
        ) : (
          <AllProducts />
        )}
      </div>
    </div>
  );
};

export default Home;
