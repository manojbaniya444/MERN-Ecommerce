import axios from "axios";
import React, { useEffect, useState } from "react";

const AllProducts = () => {
  const [products, setProducts] = useState();

  useEffect(() => {
    try {
      const fetchAllProducts = async () => {
        const response = await axios.get(
          "http://localhost:8080/products/all-products"
        );

        if (response) {
          setProducts(response.data.products);
        }
      };
      fetchAllProducts();
    } catch (error) {
      console.log(error);
    }
  }, []);

  //   console.log(products);
  return (
    <div className="  flex-1 p-2 ">
      <h1 className="text-center text-sm md:text-xl lg:text-2xl font-medium">
        All Products
      </h1>
      <section className="flex gap-3 mt-5 flex-wrap p-5 bg-gray-0 rounded-lg items-center justify-center">
        {products?.map((item) => {
          return (
            <article
              key={item?._id}
              className="w-[80%] sm:w-[45%]  max-w-[300px] rounded-md overflow-hidden flex flex-col hover:bg-gray-100 cursor-pointer p-1"
            >
              <div className="p-3 rounded-md w-[100%] self-center">
                <img
                  src={`http://localhost:8080/products/product-photo/${item?._id}`}
                  alt="Product"
                  className="w-full h-[200px] object-cover rounded-md"
                />
              </div>

              <div className="p-3">
                <div className="font-bold text-sm mb-2 w-[300px] h-[50px] self-start">
                  {item?.name}
                </div>
                <p className="text-gray-700 text-base self-start">
                  Rs.{item?.price}
                </p>
              </div>
              <div className="p-3">
                <button
                  onClick={() => alert("Added to cart.")}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-normal py-2 px-4 rounded-lg self-start"
                >
                  Add to Cart
                </button>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
};

export default AllProducts;
