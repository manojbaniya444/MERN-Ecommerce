import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/authContext";
import axios from "axios";
import { useAppContext } from "../../context/globalContext";
import EditProduct from "./EditProduct";

const AdminIndex = () => {
  const [products, setProducts] = useState([]);
  const [change, setChange] = useState(false);
  const [editProduct, setEditProduct] = useState({
    id: "",
    show: false,
  });

  const { auth } = useAuthContext();

  const { setNotification } = useAppContext();

  //* Fetch all the products
  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/products/all-products"
      );
      setProducts(response?.data?.products);
      // console.log(response?.data?.products);
    } catch (error) {
      console.log("Error fetching all products", error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, [change]);

  //*Delete the product function

  const deleteProductHandler = async (id, name) => {
    let answer = prompt("Are you sure want to delete? Type [yes]");

    if (answer === "yes") {
      try {
        const response = await axios.delete(
          `http://localhost:8080/products/delete-product/${id}`
        );
        setChange(!change);
        setNotification({
          show: true,
          message: `Product [${name}] deleted successfully`,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      return;
    }
  };

  if (editProduct.show && products.length > 0) {
    return (
      <EditProduct
        editProduct={editProduct}
        setEditProduct={setEditProduct}
        setChange={setChange}
        change={change}
      />
    );
  }

  return (
    <div className="">
      {/* <div className="bg-black  flex gap-10 py-2 px-5 font-medium justify-between text-white">
        <h3>Manage Products</h3>
        <p className="font-light self-end">Admin: {auth?.user?.name}</p>
      </div> */}
      <div className="  bg-gray-500 text-white overflow-x-scroll text-sm md:text-normal">
        <table className="w-full border-collapse border border-gray-300 bg-white text-black text-center">
          <thead className="bg-gray-200 text-black">
            <tr>
              <th className="py-2 px-4 border-b border-gray-300">Image</th>
              <th className="py-2 px-4 border-b border-gray-300 text-start">
                Price
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-start">
                Name
              </th>
              <th className="py-2 px-4 border-b border-gray-300">Stock</th>
              <th className="py-2 px-4 border-b border-gray-300">Quantity</th>
              <th className="py-2 px-4 border-b border-gray-300">Category</th>
              <th className="py-2 px-4 border-b border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((item) => {
              return (
                <tr key={item?._id} className="hover:bg-gray-100 text-sm">
                  <td className="p-2 border-b border-gray-300">
                    <img
                      src={`http://localhost:8080/products/product-photo/${item?._id}`}
                      alt={item?.name}
                      className="h-16 w-16 object-cover"
                    />
                  </td>
                  <td className="p-2 border-b border-gray-300 text-start">
                    Rs.{item?.price}
                  </td>
                  <td className="p-2 border-b border-gray-300 text-start font-extralight text-sm w-[200px]">
                    {item?.name}
                  </td>
                  <td className={" border-b border-gray-300 "}>
                    <p
                      className={
                        item?.stock
                          ? "p-1 bg-green-700 rounded-lg text-white"
                          : "p-1 bg-red-700 rounded-lg text-white"
                      }
                    >
                      {item?.stock ? "In stock" : "Out of stock"}
                    </p>
                  </td>
                  <td className="p-2 border-b border-gray-300">
                    {item?.quantity}
                  </td>
                  <td className="p-2 border-b border-gray-300">
                    {item?.category?.name}
                  </td>
                  <td className="p-2 border-b border-gray-300 ">
                    <button
                      onClick={() =>
                        setEditProduct({
                          show: true,
                          id: item?._id,
                          cid: item?.category?._id,
                        })
                      }
                      className="p-2 text-white bg-blue-700 rounded-2xl"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteProductHandler(item?._id, item?.name)
                      }
                      className="p-2 text-white bg-red-700 rounded-2xl ml-2"
                    >
                      Delete
                    </button>
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
