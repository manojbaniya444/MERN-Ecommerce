import axios from "axios";
import React, { useEffect, useState } from "react";

const Orders = () => {
  const [allOrders, setAllOrders] = useState();
  const [loading, setLoading] = useState(false);
  const status = [
    "Processing",
    "Dispatched",
    "Your package is on the way",
    "Delivered",
  ];

  //* Fetching all the orders from the users
  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:8080/cart/all-orders"
        );
        if (response) {
          setAllOrders(response.data.orders);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    fetchAllOrders();
  }, []);

  //* Change the product status

  const statusChangeHandler = async (id, value) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/cart/status-change/${id}`,
        {
          status: value,
        }
      );
    } catch (error) {
      console.log(error, "catch");
    }
  };

  if (loading)
    return <h1 className="text-center p-5 text-2xl font-medium">Loading...</h1>;

  if (!allOrders)
    return (
      <h1 className="text-center p-5 text-2xl font-medium">
        No orders to check
      </h1>
    );
  return (
    <div>
      <h1>Order lists</h1>
      <section className="flex flex-col gap-5">
        {allOrders?.map((item, index) => {
          return (
            <div key={index} className="bg-gray-100 p-5 flex flex-col gap-2">
              <p>#{index + 1}</p>
              <p>
                Id: <span className="text-orange-500">{item?._id}</span>
              </p>
              <p>
                Customer Id:
                <span className="text-green-500">{item?.customer}</span>
              </p>
              <div>
                <p>Items:</p>
                <div className="font-thin">
                  {item?.items.map((name, i) => (
                    <p key={i} className="underline">
                      --{name}
                    </p>
                  ))}
                </div>
              </div>
              <p>COD Amount: {item?.totalAmount}</p>
              <p>Location: {item?.address}</p>
              <p>Contact no: {item?.contact}</p>
              <p>Order date: {item?.date}</p>
              <p>Status:</p>
              <p
                className={
                  item?.status === "Processing"
                    ? "w-full self-start bg-orange-500 p-1 rounded-sm text-white"
                    : item?.status === "Dispatched"
                    ? "w-full self-start bg-blue-900 p-1 rounded-sm text-white"
                    : item?.status === "Your package is on the way"
                    ? "w-full self-start bg-violet-500 p-1 rounded-sm text-white"
                    : "w-full self-start bg-green-500 p-1 rounded-sm text-white"
                }
              >
                {item?.status === "Processing"
                  ? "User has placed an order"
                  : item?.status === "Dispatched"
                  ? "Item dispatched"
                  : item?.status === "Your package is on the way"
                  ? "Package is on the way to the customer"
                  : "Customer has received the package"}
              </p>
              <select
                defaultValue={item?.status}
                className="p-2 cursor-pointer rounded-md"
                onChange={(e) => statusChangeHandler(item?._id, e.target.value)}
              >
                {status.map((item) => {
                  return (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Orders;
