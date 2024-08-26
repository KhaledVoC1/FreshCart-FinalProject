import React, { useContext } from "react";
import { WishlistContext } from "../../Context/WishlistContext/WishlistContext";
import { FaTrashAlt } from "react-icons/fa"; 

const WishlistItem = ({ item }) => {
  const { removeFromWishlist } = useContext(WishlistContext); 

  const handleRemove = () => {
    removeFromWishlist(item._id); 
  };

  return (
    <div className="wishlist-item">
      <div className="wishlist-item-content">
        <img src={item.imageUrl} alt={item.name} className="wishlist-item-image" />  
        <div className="wishlist-item-details">
          <h3 className="wishlist-item-name">{item.name}</h3>  
          <p className="wishlist-item-price">${item.price}</p> 
          <button className="wishlist-remove-btn" onClick={handleRemove}>
            <FaTrashAlt /> Remove 
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistItem;
