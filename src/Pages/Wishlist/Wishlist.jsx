import React from "react";
import { useWishlist } from "../../Context/WishlistContext/WishlistContext";
import WishlistItem from "./WishlistItem";
import Loader from "../../Components/Loader/Loader"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Wishlist() {
  const { wishlistData, loading, error, removeFromWishlist } = useWishlist();

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold text-center my-5">My Wishlist</h1>
      {error && <p className="text-center text-green-600">{error}</p>}
      {wishlistData.length === 0 ? (
        <p className="text-center text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistData.map((item) => (
            <div
              key={item._id}
              className="relative w-full flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer border border-[#f0f3f2] shadow-md bg-white"
            >
            
              <img
                src={item.imageCover}
                alt={item.title}
                className="w-[80%] max-w-[150px] mb-3 rounded-lg"
              />
              <h3 className="text-lg font-semibold mb-1 text-center">
                {item.title}
              </h3>
              <h3 className="text-lg font-semibold mb-1 text-center">
                {item.category.name}
              </h3>
              <p className="text-gray-600 text-center mb-2">
                {item.price} EGP
              </p>
              <button
                onClick={() => removeFromWishlist(item._id)}
                className="bg-green-600 text-white py-2 px-4 rounded-lg shadow hover:bg-green-600 mt-3"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
