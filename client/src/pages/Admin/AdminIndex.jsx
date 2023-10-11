import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/authContext";
import axios from "axios";

const AdminIndex = () => {
  const [products, setProducts] = useState([]);
  const { auth } = useAuthContext();

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/products/all-products"
      );
      setProducts(response?.data?.products);
      console.log(response?.data?.products);
    } catch (error) {
      console.log("Error fetching all products", error);
    }
  };

  console.log(typeof products);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className="">
      <div className="bg-black  flex gap-10 py-2 px-5 font-medium justify-between text-white">
        <h3>Manage Products</h3>
        <p className="font-light self-end">Admin: {auth?.user?.name}</p>
      </div>
      <div className="bg-gray-500 text-white">
        <table className="w-full border-collapse border border-gray-300 bg-white text-black text-center">
          <thead className="bg-blacl">
            <tr>
              <th className="py-2 px-4 border-b border-gray-300">Image</th>
              <th className="py-2 px-4 border-b border-gray-300">Price</th>
              <th className="py-2 px-4 border-b border-gray-300">
                Description
              </th>
              <th className="py-2 px-4 border-b border-gray-300">Stock</th>
              <th className="py-2 px-4 border-b border-gray-300">Quantity</th>
              <th className="py-2 px-4 border-b border-gray-300">Category</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((item) => {
              return (
                <tr key={item?._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b border-gray-300">
                    <img
                      src="/"
                      alt={item?.name}
                      className="h-16 w-16 object-cover"
                    />
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    {item?.price}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    {item?.description}
                  </td>
                  <td className={"py-2 px-4 border-b border-gray-300 "}>
                    <p
                      className={
                        item?.stock
                          ? "p-1 bg-green-700 rounded-2xl"
                          : "p-1 bg-red-700 rounded-2xl"
                      }
                    >
                      {item?.stock ? "Yes" : "No"}
                    </p>
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    {item?.quantity}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    {item?.category?.name}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminIndex;
