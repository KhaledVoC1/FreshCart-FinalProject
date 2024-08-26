import React, { useEffect, useState } from "react";
import style from "./Products.module.css";
import axios from "axios";
import ProductItem from "../ProductItem/ProductItem";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useFetch from "../../Hooks/useFetch";
import Pagination from "../Pagination/Pagination";

export default function Products() {
  const [data, setData] = useState(null);

  function getProducts(pageNum = 1) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products?page=${pageNum}`)
      .then((data) => setData(data.data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getProducts();
  }, []);

  function handlePageChange({ selected }) {
    getProducts(selected + 1);
  }

  return (
    <div className="row">
      {data?.data.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
      <div className="w-full flex justify-center bg-red-200">
        <Pagination
          handlePageChange={handlePageChange}
          pageCount={data?.metadata.numberOfPages}
        />
      </div>
    </div>
  );
}
