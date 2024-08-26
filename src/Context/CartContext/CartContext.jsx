import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

let headers = { token: localStorage.getItem("userToken") };

export default function CartContextProvider(props) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [total, setTotal] = useState(0);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartId, setCartId] = useState(null);

  const Baseurl = "https://ecommerce.routemisr.com";

  function addToCart(productId) {
    return axios
      .post(
        `${Baseurl}/api/v1/cart`,
        {
          productId,
        },
        {
          headers,
        }
      )
      .then((res) => {
        if (res.data.status === "success") {
          setNumOfCartItems(res.data.numOfCartItems);
          setTotal(res.data.data.totalCartPrice);
        }
        return res;
      })
      .catch((err) => err);
  }

  function getLoggeedCart() {
    return axios
      .get(`${Baseurl}/api/v1/cart`, { headers })
      .then((res) => {
        if (res.status === 200) {
          setNumOfCartItems(res.data.numOfCartItems);
          setCartId(res.data.data._id);
        }
        return res;
      })
      .catch((err) => err);
  }

  function deleteSpecificItem(id) {
    return axios
      .delete(`${Baseurl}/api/v1/cart/${id}`, {
        headers,
      })
      .then((response) => {
        return response;
      })
      .catch((err) => err);
  }

  function updateProduct(id, count) {
    return axios
      .put(
        `${Baseurl}/api/v1/cart/${id}`,
        {
          count: count,
        },
        { headers }
      )
      .then((response) => response)
      .catch((err) => err);
  }

  function onlinePayment(cartId, shippingAddress) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/orders/checkout-session/66ba19baed0dc0016c3dfb3c",
        { shippingAddress },
        {
          headers,
          params: { url: "http://localhost:5173" },
        }
      )
      .then((data) => data).catch((err) =>err)
  }
  function addToWishlist(productId) {
    return axios
      .post(
        `${Baseurl}/api/v1/wishlist`,
        { productId },
        { headers }
      )
      .then((res) => {
        if (res.data.status === "success") {
          setWishlistItems((prevItems) => [...prevItems, res.data.data]);
        }
        return res;
      })
      .catch((err) => err);
  }

  async function getWishlist() {
    return axios
      .get(`${Baseurl}/api/v1/wishlist`, { headers })
      .then((res) => {
        if (res.data.data.length) {
          setWishlistItems(res.data.data);
        }
        return res;
      })
      .catch((err) => err);
  }

  function removeFromWishlist(id) {
    return axios
      .delete(`${Baseurl}/api/v1/wishlist/${id}`, { headers })
      .then((res) => {
        setWishlistItems((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );
        return res;
      })
      .catch((err) => err);
  }
  

  useEffect(() => {
    getLoggeedCart();
    getWishlist();
  }, []);

  return (
    <CartContext.Provider
      value={{
        addToCart,
        getLoggeedCart,
        deleteSpecificItem,
        updateProduct,
        numOfCartItems,
        setNumOfCartItems,
        total,
        setTotal,
        onlinePayment,
        addToWishlist,
        wishlistItems,
        getWishlist,
        removeFromWishlist,
        cartId,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
