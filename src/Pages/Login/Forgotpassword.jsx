import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function ForgotPassword() {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
const baseUrl = "https://ecommerce.routemisr.com";
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Email is required").email("Invalid email"),
    }),
    onSubmit: (values) => {
      setIsLoading(true);
      axios
        .post(baseUrl + "/api/v1/auth/forgotPasswords", values)
        .then((response) => {
          setIsLoading(false);
          setMessage("A reset link has been sent to your email.");
          setError(null);
        })
        .catch((error) => {
          setIsLoading(false);
          setError("Failed to send reset link. Please try again.");
          setMessage(null);
        });
    },
  });


  async function sendDataToApi(values) {
    setLoading(true);
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      if (data.message == "success") {
        localStorage.setItem('token', data.token)
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.response.data.message);
    }
  }

  return (
    <div className="container">
      <div className="w-3/4 mx-auto">
        <h1>Forgot Password</h1>
        <form className="my-3" onSubmit={formik.handleSubmit}>
          {message && <div className="bg-green-200 py-2">{message}</div>}
          {error && <div className="bg-red-200 py-2">{error}</div>}

          <div className="relative my-5">
            <input
              type="email"
              id="email"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              name="email"
              placeholder=" "
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            <label
              htmlFor="email"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Email
            </label>
          </div>
          {formik.errors.email && formik.touched.email && (
            <span className="text-red-500 mt-3">{formik.errors.email}</span>
          )}

          <div>
            <button
              type="submit"
              className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
