import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [searchProducts, setSearchProducts] = useState();
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setNotification({ ...notification, show: false, message: "", type: "" });
    }, 2000);

    return () => clearTimeout(timeout);
  }, [notification.show, notification.message]);

  //* Fetch search products
  const fetchSearchProducts = async () => {
    const res = await axios.post(
      "http://localhost:8080/products/search-products",
      { search }
    );
    setSearchProducts(res?.data.products);
    return true;
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        if (search === "") return;
        fetchSearchProducts();
      } catch (error) {
        console.log(error);
      }
    }, 400);
    return () => {
      clearTimeout(timeout);
    };
  }, [search]);

  return (
    <AppContext.Provider
      value={{
        notification,
        setNotification,
        search,
        setSearch,
        setSearchProducts,
        searchProducts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
