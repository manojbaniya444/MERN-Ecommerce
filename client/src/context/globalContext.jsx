import { createContext, useContext, useEffect, useState } from "react";
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [notification, setNotification] = useState({
    show: false,
    message: "",
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setNotification({ ...notification, show: false, message: "" });
    }, 2000);

    return () => clearTimeout(timeout);
  }, [notification.show]);

  return (
    <AppContext.Provider value={{ notification, setNotification }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
