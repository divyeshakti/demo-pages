import React from 'react';
import { Link } from 'react-router-dom';

function Cart() {
  return (
    <div>
      <h1>Your Cart</h1>
      <p>Your cart is currently empty.</p>
      <p>Continue shopping to add items to your cart!</p>
      <Link to="/" className="btn" style={{ marginTop: '20px' }}>
        Back to Products
      </Link>
    </div>
  );
}

export default Cart;
