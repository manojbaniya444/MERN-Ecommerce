import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import { useAppContext } from "../context/globalContext";
import { useCartContext } from "../context/cartContext";

const Search = ({ products }) => {
  const { auth } = useAuthContext();
  const { setNotification } = useAppContext();
  const { addCartHandler } = useCartContext();

  //* Add cart Handler

  const addCart = (product) => {
    if (!auth) {
      return setNotification({ show: true, message: "First login" });
    }

    if (auth?.user?.role === 1) {
      return setNotification({
        show: true,
        message: "You are Admin :( login with user account.",
      });
    }
    addCartHandler(product);
  };
  if (products?.length === 0) {
    return (
      <div className="flex flex-col items-center jsutify-center">
        <h1 className="text-center p-9 text-sm md:text-lg font-medium">
          No search results
        </h1>
        <div className="flex items-center flex-col justify-center bg-blue-200 w-20 h-20 rounded-[50%] font-bold text-xl">
          <p>. .</p>
          <p>____</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex-1 p-2 mt-[20px] md:mt-[20px]">
      <h1 className="text-center text-sm md:text-xl lg:text-2xl font-medium">
        Search results
      </h1>
      <section className="flex gap-3 mt-5 flex-wrap p-1 md:p-5 bg-gray-0 rounded-lg items-center justify-center bg-gray-50">
        {products?.map((item) => {
          return (
            <article
              key={item?._id}
              className="w-[80%] sm:w-[25%]  max-w-[200px] rounded-md overflow-hidden flex flex-col bg-white hover:bg-gray-100 cursor-pointer p-1"
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
                  <div className="font-bold text-sm mb-2 w-[300px] h-[50px] self-start">
                    {item?.name}
                  </div>
                  <p className="text-gray-700 text-base self-start">
                    Rs.{item?.price}
                  </p>
                </div>
              </Link>
              <div className="p-3">
                <button
                  onClick={() => addCart(item)}
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

export default Search;
