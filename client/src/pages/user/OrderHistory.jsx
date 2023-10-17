import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/authContext";
import axios from "axios";
import { Link } from "react-router-dom";

const OrderHistory = () => {
  const [deliveredOrders, setDeliveredOrders] = useState();
  const [loading, setLoading] = useState();

  const { auth } = useAuthContext();

  const fetchDeliveredOrders = async () => {
    console.log("heleo");
    try {
      setLoading(true);
      const id = auth?.user._id;
      const response = await axios.get(
        `http://localhost:8080/cart/delivered/${id}`
      );
      console.log(response);
      if (response) {
        setLoading(false);
        setDeliveredOrders(response.data.orders);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.user) fetchDeliveredOrders();
  }, [auth]);

  if (loading) {
    return <p className="text-center text-xl font-medium p-5 ">Loading...</p>;
  }
  if (!deliveredOrders) {
    return (
      <div className="flex items-center flex-col gap-5 mt-5">
        <h3 className="text-xl">No order delivered history.</h3>
        <Link to="/" className="px-4 py-2 bg-blue-700 text-white rounded-md">
          Order now
        </Link>
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-center text-base md:text-lg font-medium mt-2">
        Order History
      </h1>
      <p className="text-center font-extralight text-sm">Delivered Items</p>
      {/* Showing the orders */}
      <div className="gap-5 flex flex-col rounded-sm text-sm md:text-base mb-10">
        {deliveredOrders?.map((item, index) => {
          return (
            <div
              className="bg-gray-200 px-10 py-2 flex flex-col gap-[20px]   md:flex-row md:text-sm md:justify-between md:py-9"
              key={index}
            >
              <p className="font-medium">
                Order Id:
                <span className="font-medium text-orange-500">{item?._id}</span>
              </p>

              <div className="flex flex-col">
                <h3 className="font-medium">Ordered Items:</h3>
                {item?.items.map((name, i) => (
                  <p key={i} className="underline">
                    --{name}
                  </p>
                ))}
              </div>
              <p
                className={
                  item?.status === "Processing"
                    ? "self-start bg-orange-500 p-1 rounded-sm text-white"
                    : item?.status === "Dispatched"
                    ? "self-start bg-blue-900 p-1 rounded-sm text-white"
                    : item?.status === "Your package is on the way"
                    ? "self-start bg-violet-500 p-1 rounded-sm text-white"
                    : "self-start bg-green-500 p-1 rounded-sm text-white"
                }
              >
                {item?.status}
              </p>

              <div>
                <p className="font-medium">COD Amount: {item?.totalAmount}</p>
                <p className="font-medium">
                  Delivery location: {item?.address}
                </p>

                <p>
                  Ordered Date:
                  {item?.createdAt}
                  <span className="text-gray-700 text-sm font-thin">
                    (Expected delivery after 3 days of order)
                  </span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderHistory;
