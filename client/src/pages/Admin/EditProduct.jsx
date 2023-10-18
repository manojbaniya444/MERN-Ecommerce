import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "../../context/globalContext";

const EditProduct = ({ editProduct, setEditProduct, change, setChange }) => {
  const [categories, setCategories] = useState();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState();
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(true);
  const [error, setError] = useState();
  const { setNotification } = useAppContext();

  const fetchAllCategory = async () => {
    try {
      const response = await axios.get(
        "https://mern-ecommerce-sand.vercel.app/category/all-category"
      );
      if (response) {
        setCategories(response.data.allCategory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://mern-ecommerce-sand.vercel.app/products/single-product/${editProduct.id}`
      );

      if (data) {
        const { product } = data;
        const { name, category, price, description, stock, quantity } = product;
        setName(name);
        setCategory(category);
        setPrice(price);
        setDescription(description);
        setQuantity(quantity);
        setStock(stock);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllCategory();
    fetchSingleProduct();
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();
    const updatedFormData = new FormData();
    updatedFormData.append("name", name);
    photo && updatedFormData.append("photo", photo);
    updatedFormData.append("description", description);
    updatedFormData.append("price", +price);
    updatedFormData.append("quantity", +quantity);
    updatedFormData.append("stock", stock);
    updatedFormData.append("category", category);

    try {
      const response = await axios.patch(
        `https://mern-ecommerce-sand.vercel.app/products/update-product/${editProduct.id}`,
        updatedFormData
      );

      if (response) {
        setPhoto("");
        setName("");
        setPrice("");
        setDescription("");
        setQuantity("");
        setStock(true);
        setCategory("");
        setNotification({
          show: true,
          message: "Product updated successfully.",
        });
        setEditProduct({ ...editProduct, show: false });
        setChange(!change);
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }

    console.log(updatedFormData);
  };

  return (
    <>
      <h1 className="text-center p-3">Edit product</h1>
      <div className="flex items-center justify-center mt-5">
        <form
          onSubmit={submitHandler}
          className=" w-[70%] max-w-[700px]  bg-gray-100 flex flex-col gap-3 p-9 rounded-md"
        >
          {error && (
            <h5 className="text-center p-3 text-red-500 text-xl">{error}</h5>
          )}
          {photo && (
            <div className="self-center">
              <img
                src={URL.createObjectURL(photo)}
                alt="product-image"
                className="w-[200px]"
              />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Price</label>
          <input
            type="number"
            placeholder="Enter product price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <label>Description</label>
          <input
            type="text"
            placeholder="Enter product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label>Quantity</label>
          <input
            type="number"
            placeholder="Enter product quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <select name="category" onChange={(e) => setCategory(e.target.value)}>
            <option disabled={category !== ""} value="">
              Choose category
            </option>
            ;
            {categories?.map((item, index) => {
              return (
                <option value={item._id} key={index}>
                  {item.name}
                </option>
              );
            })}
          </select>

          <div className="flex items-center justify-start gap-2">
            <label>Stock</label>
            <input
              type="checkbox"
              placeholder="Enter product stock status"
              checked={stock}
              onChange={(e) => setStock(e.target.checked)}
            />
          </div>
          <button
            type="submit"
            className="p-3 bg-blue-700 text-white rounded-md cursor-pointer "
          >
            Update product
          </button>
          <button
            onClick={() => setEditProduct({ ...editProduct, show: false })}
            className="bg-white p-3 rounded-md cursor-pointer text-black"
          >
            Cancel
          </button>
        </form>
      </div>
    </>
  );
};

export default EditProduct;
