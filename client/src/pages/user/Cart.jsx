import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import { useCartContext } from "../../context/cartContext";
import { useAppContext } from "../../context/globalContext";
import OrderModal from "./OrderModal";

const Cart = () => {
  const [orderModal, setOrderModal] = useState(false);
  const { auth } = useAuthContext();
  const { cartItems, setCartItems } = useCartContext();

  const { setNotification } = useAppContext();

  let total = 0;

  cartItems?.forEach((item) => (total += item.price));

  const removeCartHandler = (id, name) => {
    let newCartItems = cartItems?.filter((item) => item._id !== id);
    setCartItems(newCartItems);
    localStorage.setItem("cart", JSON.stringify(newCartItems));
    setNotification({ show: true, message: `${name} removed from the cart.` });
  };

  if (auth && auth?.user?.role === 0) {
    return (
      <>
        {orderModal && (
          <OrderModal setOrderModal={setOrderModal} total={total} />
        )}
        <div className="pb-10 ">
          <div className=" flex gap-5 p-5 items-center justify-star bg-gray-100">
            <Link className="font-bold text-lg" to="/">
              Shop
            </Link>
            <h1>My Cart {cartItems?.length}</h1>
          </div>
          {cartItems?.length === 0 && (
            <>
              <div className="flex flex-col items-center">
                <h1 className="text-center text-lg mt-9">
                  No items in the cart
                </h1>
                <Link
                  to="/"
                  className="px-5 py-2 bg-blue-700 text-white font-semibold mt-5 rounded-md"
                >
                  Go to shopping
                </Link>
              </div>
            </>
          )}

          <section className="mt-5 flex flex-col gap-2 p-5 md:px-[20%] pb-20">
            {cartItems?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center gap-5 bg-gray-100 justify-start p-5"
                >
                  <div className="w-[100px]">
                    <img
                      src={`http://localhost:8080/products/product-photo/${item?._id}`}
                      alt={item?.name}
                      className="object-cover w-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <p>{item?.name}</p>
                    <p className="text-gray-600 font-medium">
                      {item?.category?.name}
                    </p>
                    <div className="flex gap-10 items-center">
                      <p className="mt-2">Rs.{item?.price}</p>
                      <button
                        className="px-3 py-1 bg-red-700 text-white rounded-sm cursor-pointer"
                        onClick={() => removeCartHandler(item?._id, item?.name)}
                      >
                        Remove from cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
          {cartItems?.length === 0 ? null : (
            <div className="flex justify-center py-5 gap-20 bg-gray-200 fixed bottom-0 w-full">
              <h3 className="text-center font-medium text-lg py-3">
                Total: Rs. {total}
              </h3>
              <button
                onClick={() => setOrderModal(true)}
                className="px-5 py-2 bg-blue-700 text-white rounded-md"
                disabled={cartItems?.length === 0}
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </>
    );
  }
  return (
    <div className="flex items-center justify-center mt-10">
      <Link
        className=" text-xl font-bold bg-blue-700 text-white px-5 py-2 rounded-md"
        to="/login"
      >
        Login with user account
      </Link>
    </div>
  );
};

export default Cart;
