import React, { useState } from "react";
import { useCartContext } from "../../context/cartContext";
import { useAuthContext } from "../../context/authContext";
import { useAppContext } from "../../context/globalContext";
import axios from "axios";

const OrderModal = ({ setOrderModal, total }) => {
  const [orderDetails, setOrderDetails] = useState({
    products: [],
    customer: "",
    address: "",
    contact: "",
    totalAmount: "",
  });
  const { cartItems } = useCartContext();
  const { auth } = useAuthContext();
  const { setNotification } = useAppContext();

  const placeOrderHandler = async (event) => {
    event.preventDefault();
    console.log(auth);
    setOrderDetails({
      ...orderDetails,
      products: cartItems?.map((item) => item._id),
      totalAmount: total,
      customer: auth?.user?._id,
    });

    try {
      console.log(orderDetails);
      const response = await axios.post(
        "http://localhost:8080/cart/orders",
        orderDetails
      );
      if (response?.data.success) {
        setNotification({
          show: true,
          message: response?.data?.message,
        });
        setOrderDetails({
          products: [],
          customer: "",
          address: "",
          contact: "",
          totalAmount: "",
        });
      }
    } catch (error) {
      console.log("Catch error", error);
    }
  };

  return (
    <section className="h-[100%] w-[100%] absolute z-10 bg-black bg-opacity-60 flex justify-center items-center">
      <form
        onSubmit={placeOrderHandler}
        className=" bg-white shadow-lg p-5 rounded-md w-[90%] md:w-[60%] self-center flex flex-col gap-2 relative"
      >
        <button
          className="absolute right-5 top-2 text-lg cursor-pointer bg-gray-200 rounded-[50%] px-3 py-1"
          onClick={() => setOrderModal(false)}
        >
          X
        </button>
        {/* All order product list div */}
        <div className="flex flex-col">
          {cartItems?.map((item, index) => {
            return (
              <p className="font-bold text-base text-gray-700" key={index}>
                {index + 1} : {item?.name} x 1
              </p>
            );
          })}
        </div>

        {/* Receiver detail */}
        <p className="mt-5">
          Receiver's name:{" "}
          <span className="font-medium text-gray-700">{auth?.name}</span>{" "}
        </p>
        <div className="flex flex-col gap-2 mt-5">
          <label>Shipping Address:</label>
          <input
            type="text"
            required
            placeholder="Enter shipping address"
            className="bg-gray-100 p-2 rounded-lg"
            value={orderDetails.address}
            onChange={(event) =>
              setOrderDetails({ ...orderDetails, address: event.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-2 mt-5">
          <label>Contact Number:</label>
          <input
            type="number"
            required
            placeholder="Enter receivers contact details"
            className="bg-gray-100 p-2 rounded-lg"
            value={orderDetails.contact}
            onChange={(event) =>
              setOrderDetails({ ...orderDetails, contact: +event.target.value })
            }
          />
        </div>
        {/* Payment */}
        <div className="flex gap-2 mt-5">
          <p>Payment Type: </p>
          <p className="text-green-500">Cash on Delivery</p>
        </div>
        <div className="flex gap-2">
          <p>Total Amount: </p>
          <p className="font-bold">Rs.{total}</p>
        </div>
        {/* Order Action Button */}
        <button
          type="submit"
          className="bg-blue-700 text-white py-2 rounded-md cursor-pointer hover:bg-blue-900"
        >
          Place Order
        </button>
      </form>
    </section>
  );
};

export default OrderModal;
