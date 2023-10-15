import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./authContext";
import { useAppContext } from "./globalContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const { auth } = useAuthContext();
  const { setNotification } = useAppContext();

  useEffect(() => {
    setCartItems(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  //* Add cart Handler
  const addCartHandler = (product) => {
    let duplicateItem = [];
    if (!auth) {
      return setNotification({
        show: true,
        message: "First login",
        type: "warning",
      });
    }

    if (auth?.user?.role === 1) {
      return setNotification({
        show: true,
        message: "You are Admin :( login with user account.",
        type: "warning",
      });
    }
    //* Main add to cart logic
    duplicateItem = cartItems?.find((item) => item._id === product._id);
    if (duplicateItem) {
      setNotification({
        show: true,
        message: "Item is already in the cart",
        type: "",
      });
      return;
    }
    //*Check the stock availability of the product

    if (!product?.stock) {
      return setNotification({
        show: true,
        message: "Item is currently out of stock",
        type: "error",
      });
    }

    setCartItems([...cartItems, product]);
    localStorage.setItem("cart", JSON.stringify([...cartItems, product]));

    setNotification({
      show: true,
      message: `${product?.name} added to the cart`,
      type: "success",
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addCartHandler }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
