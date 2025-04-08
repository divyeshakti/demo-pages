import React from 'react';

function Home() {
  return (
    <div>
      <h1>Welcome to Our Store</h1>
      <p>Discover our amazing products and deals!</p>
      
      <div className="product-grid">
        <div className="product-card">
          <h3>Product 1</h3>
          <p>This is a description for product 1. It's really great!</p>
          <p className="price">$19.99</p>
          <button className="btn">Add to Cart</button>
        </div>
        
        <div className="product-card">
          <h3>Product 2</h3>
          <p>This is a description for product 2. You'll love it!</p>
          <p className="price">$24.99</p>
          <button className="btn">Add to Cart</button>
        </div>
        
        <div className="product-card">
          <h3>Product 3</h3>
          <p>This is a description for product 3. Must have!</p>
          <p className="price">$15.99</p>
          <button className="btn">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
