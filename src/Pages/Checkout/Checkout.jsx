import React, { useContext, useState } from "react";
import { useFormik } from "formik";

import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/CartContext/CartContext";

export default function Checkout() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { onlinePayment } = useContext(CartContext);

  let navigate = useNavigate();

  async function handlePayment(values) {
    //call api

  const {data}=  await onlinePayment(null, values);

  window.location.href=data.session.url
    
    
  }

  let validationSchema = Yup.object({
    details: Yup.string().required(),
    city: Yup.string().required(),
    phone: Yup.string()
      .required()
      .matches(/^01[0-25][0-9]{8}$/, "phone is not valid"),
  });

  const formik = useFormik({
    initialValues: {
      details: "",
      city: "",
      phone: "",
    },
   
    validationSchema,
    onSubmit: handlePayment,
  });

  return (
    <div className="container ">
      <div className=" w-3/4 mx-auto">
        <h1>Register Now :</h1>
        <form className="my-3 " onSubmit={formik.handleSubmit}>
          {error ? <div className="bg-red-200 py-2">{error}</div> : null}

          <div className="relative my-5">
            <input
              type="text"
              id="details"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              name="details"
              placeholder=" "
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.details}
            />
            <label
              htmlFor="details"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Details
            </label>
          </div>
          {formik.errors.details && formik.touched.details && (
            <span className="text-red-500 mt-3">{formik.errors.details}</span>
          )}

          <div className="relative my-5">
            <input
              type="text"
              id="city"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              name="city"
              placeholder=" "
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
            />
            <label
              htmlFor="city"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              City
            </label>
          </div>
          {formik.errors.city && formik.touched.city && (
            <span className="text-red-500 mt-3">{formik.errors.city}</span>
          )}

          <div className="relative my-5">
            <input
              type="tel"
              id="phone"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              name="phone"
              placeholder=" "
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
            <label
              htmlFor="phone"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              phone
            </label>
          </div>
          {formik.errors.phone && formik.touched.phone && (
            <span className="text-red-500 mt-3">{formik.errors.phone}</span>
          )}
          <div>
            {" "}
            <button
              type="submit"
              class="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
            >
              {isLoading ? "loading..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}