import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  // Guard clause for empty cart
  if (!cartItems || cartItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Your cart is empty</h2>
        <button 
          onClick={() => navigate('/watches')}
          style={{
            padding: '10px 20px',
            marginTop: '20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  // Calculate totals only if cartItems exists
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shippingTotal = cartItems.reduce((total, item) => total + item.shippingCharge, 0);
  const total = subtotal + shippingTotal;

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '30px' }}>Checkout</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
        {/* Order Summary */}
        <div>
          <h2 style={{ marginBottom: '20px' }}>Order Summary</h2>
          {cartItems.map((item) => (
            <div 
              key={item.id}
              style={{
                display: 'flex',
                padding: '15px',
                borderBottom: '1px solid #eee',
                gap: '15px'
              }}
            >
              <img 
                src={item.image} 
                alt={item.title}
                style={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
              />
              <div>
                <h3>{item.title}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ₹{item.price}</p>
                <p>Shipping: ₹{item.shippingCharge}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Price Summary */}
        <div style={{
          backgroundColor: '#f8f8f8',
          padding: '20px',
          borderRadius: '8px',
          height: 'fit-content'
        }}>
          <h2 style={{ marginBottom: '20px' }}>Price Details</h2>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '15px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Subtotal:</span>
              <span>₹{subtotal}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Shipping:</span>
              <span>₹{shippingTotal}</span>
            </div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              borderTop: '1px solid #ddd',
              paddingTop: '15px',
              fontWeight: 'bold'
            }}>
              <span>Total:</span>
              <span>₹{total}</span>
            </div>
            
            <button
              onClick={() => {
                // Add your checkout logic here
                alert('Order placed successfully!');
                navigate('/');
              }}
              style={{
                backgroundColor: '#28a745',
                color: 'white',
                padding: '15px',
                border: 'none',
                borderRadius: '5px',
                fontSize: '1.1rem',
                cursor: 'pointer',
                marginTop: '20px'
              }}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;