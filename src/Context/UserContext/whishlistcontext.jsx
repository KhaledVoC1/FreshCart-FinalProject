/*
......................................Only For Test ...........................................

import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export const WishlistContext = createContext();

const API_BASE_URL = "https://ecommerce.routemisr.com/api/v1";


const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    toast.error("No authentication token found, please log in.");
    return null;
  }
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const WishlistContextProvider = ({ children }) => {
  const [wishlistData, setWishlistData] = useState([]);
  const [loading, setLoading] = useState(true);

 
  const apiRequest = async (method, url, data = null) => {
    const headers = getAuthHeaders();
    if (!headers) return; 

    setLoading(true);
    try {
      const response = await axios({
        method,
        url: `${API_BASE_URL}${url}`,
        data,
        headers,
      });
      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
      handleError(error);
      throw error;
    }
  };

  const handleError = (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        toast.error("You need to log in to access this resource.");
      } else {
        toast.error(`Error ${error.response.status}: ${error.response.data.message || "An error occurred"}`);
      }
    } else {
      toast.error("Network error. Please try again later.");
    }
    console.error("API error:", error);
  };


  const getWishlist = async () => {
    try {
      const response = await apiRequest("get", "/wishlist");
      if (response) {
        setWishlistData(response.data.data || []);
      }
    } catch (error) {
 
    }
  };

  
  const addToWishlist = async (productId) => {
    try {
      const response = await apiRequest("post", "/wishlist", { productId });
      if (response && response.data.status === "success") {
        toast.success("Product added to wishlist");
        getWishlist(); 
      }
    } catch (error) {
     
    }
  };


  const removeFromWishlist = async (productId) => {
    try {
      const response = await apiRequest("delete", `/wishlist/${productId}`);
      if (response && response.data.status === "success") {
        toast.error("Product removed from wishlist");
        getWishlist(); 
      }
    } catch (error) {
    
    }
  };

  
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      getWishlist();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <WishlistContext.Provider
      value={{ wishlistData, getWishlist, addToWishlist, removeFromWishlist, loading }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
