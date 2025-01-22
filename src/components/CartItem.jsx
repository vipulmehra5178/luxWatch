import React from 'react';
import { useCart } from '../context/CartContext';

function CartItem({ item }) {
  const { removeFromCart } = useCart();

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.image} alt={item.name} />
      </div>
      
      <div className="cart-item-details">
        <h3>{item.name}</h3>
        <p className="cart-item-price">${item.price}</p>
        <p className="cart-item-brand">{item.brand}</p>
      </div>

      <div className="cart-item-actions">
        <button 
          className="remove-button"
          onClick={() => removeFromCart(item.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;