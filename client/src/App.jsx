import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Navbar from "./components/Navbar";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ProtectedUserRoute from "./pages/Routes/ProtectedUserRoute";
import Dashboard from "./pages/user/Dashboard";
import UserDashboard from "./pages/user/UserDashboard";
import ProtectedAdminRoute from "./pages/Routes/ProtectedAdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import AddProducts from "./pages/Admin/AddProducts";
import Notification from "./components/Notification";
import Search from "./pages/Search";

import { useAppContext } from "./context/globalContext";
import AdminIndex from "./pages/Admin/AdminIndex";
import SingleProduct from "./components/SingleProduct";

const App = () => {
  const { notification } = useAppContext();

  return (
    <BrowserRouter>
      {notification.show && <Notification notification={notification} />}

      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/single-product/:productId" element={<SingleProduct />} />

        <Route
          path="/user"
          element={
            <ProtectedUserRoute>
              <Dashboard />
            </ProtectedUserRoute>
          }
        >
          <Route path="profile" element={<UserDashboard />} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        >
          <Route index element={<AdminIndex />} />
          <Route path="create-category" element={<CreateCategory />} />
          <Route path="add-products" element={<AddProducts />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
