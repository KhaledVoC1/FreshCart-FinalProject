import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faSpinner, faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext/CartContext";
import toast from "react-hot-toast";

export default function ProductItem({ product }) {
  const { addToCart, setNumOfCartItems, setTotal, addToWishlist, removeFromWishlist, wishlistData } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => { // حالف طلاق تلاتة ما يتشك 
    if (wishlistData && product) {
      const isProductInWishlist = wishlistData.some((item) => item._id === product._id);
      console.log('Wishlist contains product:', isProductInWishlist);
      setIsInWishlist(isProductInWishlist);
    }
  }, [wishlistData, product]);

  async function addProduct(id) {
    setLoading(true);
    let { data } = await addToCart(id);
    if (data.status === "success") {
      toast.success(data.message, { position: "top-right" });
      setNumOfCartItems(data.numOfCartItems);
      setTotal(data.totalCartPrice);
      setLoading(false);
    }
  }

  async function toggleWishlist(id) {
    if (isInWishlist) {
      let { data } = await removeFromWishlist(id);
      if (data.status === "success") {
        setIsInWishlist(false);
        toast.success("Product removed from wishlist", { position: "top-right" });
      }
    } else {
      let { data } = await addToWishlist(id);
      if (data.status === "success") {
        setIsInWishlist(true);
        toast.success("Product added to wishlist", { position: "top-right" });
      }
    }
  }

  return (
    <div className="product relative w-[20%] max-lg:w-[28%] max-md:w-[45%] max-sm:w-[100%] flex flex-col items-start justify-center m-6 p-3 rounded-lg cursor-pointer border border-[#f0f3f2] shadow-md">
      <div className="absolute right-2 top-2 bg-[#f0f3f2] px-2 py-1 rounded shadow-md">
        <button onClick={() => toggleWishlist(product._id)}>
          <FontAwesomeIcon className={isInWishlist ? 'text-[#ff0033]' : 'text-gray-400'} icon={faHeart} />
        </button>
      </div>
      <Link to={`productdetails/${product._id}`} key={product._id}>
        <img
          src={product.imageCover}
          className="w-[100%] self-center max-sm:w-[100%] max-md:w-[100%] max-lg:w-[100%]"
          alt={product.title}
        />
        <p className="text-main self-start mt-3">{product.category.name}</p>
        <h6 className="title self-start text-lg font-semibold">
          {product.title.split(" ").slice(0, 2).join(" ")}
        </h6>
        <div className="flex items-start justify-start w-full mb-2">
          <p className="title text-md text-nowrap">{product.price} EGP</p>
          <div className="title text-md text-nowrap ml-auto">
            <FontAwesomeIcon icon={faStar} className="rating-color text-yellow-400" />
            <span>{product.ratingsAverage}</span>
          </div>
        </div>
      </Link>
      <button
        onClick={() => addProduct(product._id)}
        disabled={loading}
        className="bg-green-600 px-2 btn left-2 rounded text-white absolute top-2"
      >
        {loading ? (
          <FontAwesomeIcon icon={faSpinner} spinPulse />
        ) : (
          "+"
        )}
      </button>
    </div>
  );
}
