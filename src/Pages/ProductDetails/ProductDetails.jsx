import React, { useContext, useEffect, useState } from "react";
import style from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { CartContext } from "../../Context/CartContext/CartContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  let { id } = useParams();
  const { addToCart, setNumOfCartItems } = useContext(CartContext);

  async function addProduct(id) {
   let {data}= await addToCart(id);
    setNumOfCartItems(data.numOfCartItems);
    toast.success(data?.message, {
      position: "top-right",
    });
  }



  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  function getData() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  let { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["productDetails"],
    queryFn: getData,
   
    gcTime: 0,
    
  });
  
  console.log(data?.data?.data);

  

  return (
    <div className="container">
      <div className="row items-center mt-10">
        <div className="w-1/4">
          <Slider {...settings}>
            {data?.data?.data?.images?.map((image) => (
              <img src={image} alt="" className="h-64 w-full object-contain" />
            ))}
          </Slider>
        </div>
        <div className="w-3/4 px-4">
          <div className="inner">
            <h1 className="text-3xl">{data?.data?.data.title}</h1>
            <small className="text-slate-500">
              {data?.data?.data.description}
            </small>
            <p>{data?.data?.data?.category?.name}</p>
            <div className="flex justify-between">
              <p>{data?.data?.data.price}</p>
              <div>
                {data?.data?.data.ratingsAverage}
                <i className="fa-solid fa-star text-yellow-400"></i>
              </div>
            </div>
            <button
              onClick={() => {
                addProduct(id);
              }}
              className="bg-green-500 w-full p-2 rounded mt-3 text-white"
            >
              {" "}
              Add To CART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
