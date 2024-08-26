import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";


export const WishlistContext = createContext();


const API_BASE_URL = "https://ecommerce.routemisr.com/api/v1";


const getToken = () => localStorage.getItem("userToken"); //متنساش اسمه مش التوكن اسمه يوزر توكن

export const WishlistContextProvider = ({ children }) => {
  const [wishlistData, setWishlistData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  const getWishlist = async () => {
    setLoading(true);
    try {
      const token = getToken(); 
      const response = await axios.get(`${API_BASE_URL}/wishlist`, {
        headers: { token }, //يا عم افتح انا عمدة
      });
      setWishlistData(response.data.data || []); 
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Failed to fetch wishlist");
      toast.error("Failed to fetch wishlist");
    }
  };


  const addToWishlist = async (productId) => {
    try {
      const token = getToken();
      await axios.post(
        `${API_BASE_URL}/wishlist`,
        { productId }, 
        { headers: { token } } 
      );
      toast.success("Product added to wishlist");
      getWishlist(); 
    } catch (error) {
      toast.error("Failed to add product to wishlist");
    }
  };

  
  const removeFromWishlist = async (productId) => {
    try { //deletefromwishlist الاسم غيرته في كل الملفات 
      const token = getToken();
      await axios.delete(`${API_BASE_URL}/wishlist/${productId}`, {
        headers: { token }, 
      });
      toast.error("Product removed from wishlist");
      getWishlist(); 
    } catch (error) {
      toast.error("Failed to remove product from wishlist");
    }
  };


  useEffect(() => {
    if (getToken()) {
      getWishlist();
    }
  }, []);

  return (
    <WishlistContext.Provider
      value={{ wishlistData, loading, error, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};


export const useWishlist = () => useContext(WishlistContext);
