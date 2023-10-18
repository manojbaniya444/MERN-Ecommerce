import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import { useAppContext } from "../context/globalContext";
import { useCartContext } from "../context/cartContext";

const AllProducts = () => {
  const [products, setProducts] = useState();

  const { auth } = useAuthContext();
  const { setNotification } = useAppContext();
  const { cartItems, setCartItems, addCartHandler } = useCartContext();

  useEffect(() => {
    try {
      const fetchAllProducts = async () => {
        const response = await axios.get(
          "https://mern-ecommerce-sand.vercel.app/products/all-products"
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

  // //* Add cart Handler
  // const addCartHandler = (product) => {
  //   let duplicateItem = [];
  //   if (!auth) {
  //     return setNotification({
  //       show: true,
  //       message: "First login",
  //       type: "warning",
  //     });
  //   }

  //   if (auth?.user?.role === 1) {
  //     return setNotification({
  //       show: true,
  //       message: "You are Admin :( login with user account.",
  //       type: "warning",
  //     });
  //   }
  //   //* Main add to cart logic
  //   duplicateItem = cartItems?.find((item) => item._id === product._id);
  //   if (duplicateItem) {
  //     setNotification({
  //       show: true,
  //       message: "Item is already in the cart",
  //       type: "",
  //     });
  //     return;
  //   }

  //   setCartItems([...cartItems, product]);
  //   localStorage.setItem("cart", JSON.stringify([...cartItems, product]));

  //   setNotification({
  //     show: true,
  //     message: `${product?.name} added to the cart`,
  //     type: "success",
  //   });
  // };

  //   console.log(products);
  return (
    <div className="flex-1 p-2 mt-[20px] md:mt-[20px]">
      <h1 className="text-center text-sm md:text-xl lg:text-2xl font-medium">
        All Products
      </h1>
      <section className="flex gap-3 mt-5 flex-wrap p-1 md:p-5 bg-gray-0 rounded-lg items-center justify-center bg-gray-50">
        {products?.map((item) => {
          return (
            <article
              key={item?._id}
              className="w-[40%] sm:w-[25%]  max-w-[200px] rounded-md overflow-hidden flex flex-col bg-white hover:bg-gray-100 cursor-pointer p-1"
            >
              <Link to={`single-product/${item?._id}`}>
                <div className="p-3 rounded-md w-[100%] self-center">
                  <img
                    src={`https://mern-ecommerce-sand.vercel.app/products/product-photo/${item?._id}`}
                    alt="Product"
                    className="w-full h-[150px] object-cover rounded-md"
                  />
                </div>

                <div className="p-3">
                  <div className="font-normal md:font-bold text-sm mb-2 w-[300px] h-[50px] self-start">
                    {item?.name}
                  </div>
                  <p className="text-gray-700 text-base self-start">
                    Rs.{item?.price}
                  </p>
                </div>
              </Link>
              <div className="p-3">
                <button
                  onClick={() => addCartHandler(item)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-normal text-sm md:text-base py-2 px-4 rounded-lg self-start"
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
