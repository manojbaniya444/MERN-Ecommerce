import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";
import axios from "axios";

const TrackOrder = () => {
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { auth } = useAuthContext();

  useEffect(() => {
    const fetchMyOrders = async () => {
      const uid = auth?.user?._id;
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8080/cart/my-order/${uid}`
        );
        if (response) {
          setMyOrders(response.data.userOrder);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    if (auth?.user?._id) fetchMyOrders();
  }, []);

  if (loading) {
    return (
      <h1 className="text-center p-5 text-2xl font-bold">...Loading...</h1>
    );
  }

  if (!myOrders) {
    return (
      <div className="flex items-center flex-col gap-5 mt-5">
        <h3 className="text-xl">No order placed.</h3>
        <Link to="/" className="px-4 py-2 bg-blue-700 text-white rounded-md">
          Order now
        </Link>
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-center text-base md:text-lg font-medium p-5">
        Track your order
      </h1>
      {/* Showing the orders */}
      <div className="gap-5 flex flex-col rounded-sm">
        {myOrders?.map((item, index) => {
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
              <p className="font-medium p-3">
                Status:
                <p
                  className={
                    item?.status === "processing"
                      ? "bg-orange-500 p-1 rounded-sm text-white"
                      : item?.status === "Dispatched"
                      ? "bg-blue-900 p-1 rounded-sm text-white"
                      : item?.status === "Your package is on the way"
                      ? "bg-violet-500 p-1 rounded-sm text-white"
                      : "bg-green-500 p-1 rounded-sm text-white"
                  }
                >
                  {item?.status}
                </p>
              </p>
              <div>
                <p className="font-medium">COD Amount: {item?.totalAmount}</p>
                <p className="font-medium">
                  Delivery location: {item?.address}
                </p>

                <p>
                  Ordered Date:
                  {item?.createdAt}
                  <p className="text-gray-700 text-sm font-thin">
                    (Expected delivery after 3 days of order)
                  </p>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrackOrder;
