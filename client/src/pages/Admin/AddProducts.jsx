import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "../../context/globalContext";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const AddProducts = () => {
  const [disable, setDisable] = useState(false);
  const [categories, setCategories] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [productFormData, setProductFormData] = useState({
    name: "",
    price: "",
    description: "",
    quantity: "",
    photo: "",
    category: "",
  });

  const { setNotification } = useAppContext();
  const navigate = useNavigate();

  //* Fetch the category list
  useEffect(() => {
    try {
      const fetchAllCategory = async () => {
        const response = await axios.get(
          "https://mern-ecommerce-sand.vercel.app/category/all-category"
        );
        setCategories(response?.data?.allCategory);
      };
      fetchAllCategory();
    } catch (error) {
      console.log(error, "Fetching all category");
    }
  }, []);

  console.log(categories);
  //* Handle the input fields state
  const onChangeHandler = (e) => {
    if (e.target.type === "text") {
      setProductFormData({
        ...productFormData,
        [e.target.name]: e.target.value,
      });
    }
    if (e.target.type === "number") {
      setProductFormData({
        ...productFormData,
        [e.target.name]: +e.target.value,
      });
    }
    if (e.target.type === "select-one") {
      setDisable(false);
      if (e.target.value !== "") {
        setDisable(true);
        setProductFormData({
          ...productFormData,
          [e.target.name]: e.target.value,
        });
      }
      setProductFormData({
        ...productFormData,
        [e.target.name]: e.target.value,
      });
    }
    if (e.target.type === "file") {
      setProductFormData({ ...productFormData, photo: e.target.files[0] });
    }
  };

  //* Submit form handler
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const productData = new FormData();
      productData.append("name", productFormData.name);
      productData.append("description", productFormData.description);
      productData.append("price", productFormData.price);
      productData.append("quantity", productFormData.quantity);
      productData.append("photo", productFormData.photo);
      productData.append("category", productFormData.category);
      console.log(productData);
      const response = await axios.post(
        "https://mern-ecommerce-sand.vercel.app/products/add-product",
        productData
      );
      setLoading(false);
      setNotification({ show: true, message: "New product created" });
      setProductFormData({
        name: "",
        category: "",
        price: "",
        quantity: "",
        photo: "",
        description: "",
      });
      navigate("/admin");
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 flex-col">
      <h1 className="text-center text-2xl p-3">Add Products</h1>
      <form
        onSubmit={submitHandler}
        className="flex flex-col items-start justify-center gap-5 bg-gray-300 p-9 max-w-[700px] w-[90%] rounded-md"
      >
        {/* <label
          className="cursor-pointer bg-white p-3 self-center rounded-sm"
          htmlFor="photo"
        >
          {productFormData.photo ? productFormData.photo.name : "Choose photo"} */}
        <div className="flex flex-col gap-1 w-full">
          {error && (
            <h5 className="text-center p-3 text-red-500 text-xl">{error}</h5>
          )}
          <label htmlFor="">Product Image</label>
          <input
            id="photo"
            name="photo"
            type="file"
            accept="image/*"
            // hidden
            onChange={onChangeHandler}
            required
            className=" bg-white p-2 rounded-lg cursor-pointer"
          />
        </div>

        {/* </label> */}
        {productFormData.photo && (
          <div className="self-center">
            <img
              src={URL.createObjectURL(productFormData.photo)}
              alt="product-image"
              className="w-[200px]"
            />
          </div>
        )}
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="name">Product name:</label>
          <input
            type="text"
            placeholder="Enter product name"
            className="p-2 rounded-md outline-none font-normal"
            name="name"
            value={productFormData.name}
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            placeholder="Enter product price"
            className="p-2 rounded-md outline-none font-normal"
            name="price"
            value={productFormData.price}
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            placeholder="Enter the product description"
            className="p-2 rounded-md outline-none font-normal"
            name="description"
            value={productFormData.description}
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="quantity">No. of items:</label>
          <input
            type="number"
            placeholder="Enter the total products."
            className="p-2 rounded-md outline-none font-normal"
            name="quantity"
            value={productFormData.quantity}
            onChange={onChangeHandler}
            required
          />
        </div>
        <select
          name="category"
          className="p-2 w-full rounded-md"
          onChange={onChangeHandler}
          required
        >
          <option value="" disabled={disable}>
            Select one category
          </option>
          {categories?.map((item) => {
            return (
              <option key={item?._id} value={item?._id}>
                {item.name}
              </option>
            );
          })}
        </select>
        <div>
          <button
            type="submit"
            className="bg-blue-600 text-white  py-2 px-5 rounded-lg cursor-pointer"
          >
            {loading ? (
              <ClipLoader
                color="#ffffff"
                loading={loading}
                // cssOverride={override}
                size={15}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              "Add Product"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
