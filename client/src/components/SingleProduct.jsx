import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuthContext } from "../context/authContext";
import { useAppContext } from "../context/globalContext";
import { useCartContext } from "../context/cartContext";
import BarLoader from "react-spinners/BarLoader";
import PuffLoader from "react-spinners/PuffLoader";

const SingleProduct = () => {
  const [product, setProduct] = useState();
  const [similarProducts, setSimilarProducts] = useState();
  const [loading, setLoading] = useState(false);
  const [similarLoading, setSimilarLoading] = useState(false);

  const { productId } = useParams();
  const { categoryId } = useParams();

  const navigate = useNavigate();
  const { auth } = useAuthContext();
  const { setNotification } = useAppContext();
  const { addCartHandler } = useCartContext();

  //* Fetch single product

  const fetchSingleProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://mern-ecommerce-sand.vercel.app/products/single-product/${productId}`
      );
      if (response) {
        setLoading(false);
        setProduct(response?.data.product);
        fetchSimilarProducts(productId, response?.data.product.category);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //* Fetch similar products

  const fetchSimilarProducts = async (pid, cid) => {
    try {
      setSimilarLoading(true);
      const response = await axios.get(
        `https://mern-ecommerce-sand.vercel.app/products/similar-products/${pid}/${cid}`
      );
      setSimilarLoading(false);
      setSimilarProducts(response?.data.products);
    } catch (error) {
      setSimilarLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSingleProduct();
  }, [productId]);

  // * Cart functionality

  const addCart = (product) => {
    if (!auth) {
      return setNotification({ show: true, message: "First login" });
    }
    if (auth?.user.role === 1) {
      return setNotification({
        show: true,
        message: "You are Admin :( login with user account.",
      });
    }
    addCartHandler(product);
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="flex flex-col items-center justify-center gap-5">
          <h1 className="mt-10 text-center text-2xl font-medium">Loading</h1>
          <PuffLoader
            color="#2c5dbe"
            loading={true}
            size={22}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      {/* Image */}
      <div className="p-9 md:p-3 gap-2 flex flex-col md:flex-row bg-gray-200">
        <div className="bg-gray-100 rounded-md">
          <img
            src={`https://mern-ecommerce-sand.vercel.app/products/product-photo/${productId}`}
            alt="aads"
            className="w-[250px] md:w-[350px] ml-[50%] -translate-x-1/2 p-2 rounded-md"
          />
        </div>
        {/* Loading animation */}
        {/* Details */}
        <div className=" bg-gray-100 p-5 rounded-md flex-1">
          <h3 className="font-semibold">{product?.name}</h3>
          <h3 className="pt-2 font-bold">Rs.{product?.price}</h3>
          <h3 className="py-3 font-thin md:font-normal text-sm md:text-md">
            {product?.description}
          </h3>
          <h3
            className={
              product?.stock
                ? "font-medium text-green-500"
                : "font-medium text-red-600"
            }
          >
            {product?.stock ? "Available" : "Out of stock"}
          </h3>
          {product?.stock ? (
            <h3 className="py-2 text-gray-900 font-light">
              {product?.quantity} items remaining
            </h3>
          ) : null}
          <button
            onClick={() => addCart(product)}
            className="bg-blue-600 text-white px-5 py-2 cursor-pointer rounded-lg mt-5"
          >
            Add to cart
          </button>
        </div>
      </div>
      {/* Similar Products */}
      <h1 className="capitalize text-center text-sm md:text-lg font-semibold p-5">
        Products you may like
      </h1>
      {similarLoading && (
        <div className="flex items-center justify-center mt-5">
          <BarLoader
            color="#2c5dbe"
            loading={true}
            size={22}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      <section className="flex gap-3 mt-5 flex-wrap p-5 bg-gray-0 rounded-lg items-center justify-center bg-gray-50">
        {similarProducts?.map((item) => {
          return (
            <article
              key={item?._id}
              className="w-[80%] sm:w-[45%]  max-w-[250px] rounded-md overflow-hidden flex flex-col bg-white hover:bg-gray-100 cursor-pointer p-1"
              onClick={() => {
                navigate(`/single-product/${item?._id}`);
              }}
            >
              <div className="p-3 rounded-md w-[100%] self-center">
                <img
                  src={`https://mern-ecommerce-sand.vercel.app/products/product-photo/${item?._id}/`}
                  alt="Product"
                  className="w-full h-[200px] object-cover rounded-md"
                />
              </div>

              <div className="p-3">
                <div className="font-bold text-sm mb-2 w-[300px] h-[50px] self-start">
                  {item?.name}
                </div>
                <p className="text-gray-700 text-base self-start">
                  Rs.{item?.price}
                </p>
                <p className="text-gray-700 text-sm font-mono self-start h-20">
                  {item?.description.length > 20
                    ? `${item?.description.substring(0, 30)}...`
                    : item?.description}
                </p>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
};

export default SingleProduct;
