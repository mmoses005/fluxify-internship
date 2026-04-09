import React, { useState } from 'react';
import './App.css';

// --------------------------------------------------------------
// TASK 1: Counter, ToggleCard, ColorPicker components
// --------------------------------------------------------------

// 1. Counter component
const Counter = () => {
  const [count, setCount] = useState(0);
  
  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => (prev > 0 ? prev - 1 : 0));
  
  return (
    <div className="counter-card">
      <h3 className="counter-title">
        <span className="counter-icon">🔢</span> Interactive Counter
      </h3>
      <div className="counter-buttons">
        <button onClick={decrement} className="btn-decrement" aria-label="Decrement">−</button>
        <span className="counter-value">{count}</span>
        <button onClick={increment} className="btn-increment" aria-label="Increment">+</button>
      </div>
      <p className="counter-note">Count never goes below 0</p>
    </div>
  );
};

// 2. ToggleCard component
const ToggleCard = () => {
  const [isVisible, setIsVisible] = useState(true);
  const toggleVisibility = () => setIsVisible(prev => !prev);
  
  return (
    <div className="toggle-card">
      <div className="toggle-header">
        <h3 className="toggle-title">
          <span className="toggle-icon">🎴</span> Toggle Card
        </h3>
        <button onClick={toggleVisibility} className="toggle-btn">
          {isVisible ? 'Hide Content' : 'Show Content'}
        </button>
      </div>
      {isVisible && (
        <div className="toggle-content">
          <p>✨ This is the hidden content! You can click the button above to toggle me on/off.</p>
          <div className="toggle-footer">🎉 Interactive UI demo</div>
        </div>
      )}
      {!isVisible && (
        <div className="toggle-hidden-message">Content is hidden. Click "Show Content" to reveal.</div>
      )}
    </div>
  );
};

// 3. ColorPicker component
const ColorPicker = () => {
  const [bgColor, setBgColor] = useState("#3b82f6");
  
  const colorOptions = [
    { name: "Red", value: "#ef4444" },
    { name: "Green", value: "#10b981" },
    { name: "Blue", value: "#3b82f6" },
    { name: "Purple", value: "#8b5cf6" }
  ];
  
  return (
    <div className="colorpicker-card">
      <h3 className="colorpicker-title">
        <span className="colorpicker-icon">🎨</span> Color Picker
      </h3>
      <div className="color-buttons">
        {colorOptions.map((color) => (
          <button
            key={color.name}
            onClick={() => setBgColor(color.value)}
            className="color-btn"
            style={{ backgroundColor: color.value }}
          >
            {color.name}
          </button>
        ))}
      </div>
      <div className="color-preview" style={{ backgroundColor: bgColor }}>
        <span>Preview Box</span>
      </div>
      <p className="color-current">Current color: <span className="color-code">{bgColor}</span></p>
    </div>
  );
};

// --------------------------------------------------------------
// TASK 2: Product Components
// --------------------------------------------------------------

// ProductCard child component
const ProductCard = ({ product, onAddToCart }) => {
  const [addedFeedback, setAddedFeedback] = useState(false);
  
  const handleAdd = () => {
    onAddToCart(product.id);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 600);
  };
  
  const imageEmoji = product.category === 'electronics' ? '📱' : (product.category === 'clothing' ? '👕' : '📚');
  
  return (
    <div className="product-card">
      <div className="product-content">
        <div className="product-info">
          <span className="product-emoji">{imageEmoji}</span>
          <h3 className="product-name">{product.name}</h3>
          <p className="product-description">{product.description}</p>
        </div>
        <div className="product-price">${product.price}</div>
      </div>
      <div className="product-footer">
        <span className="product-category">{product.category}</span>
        <button onClick={handleAdd} className={`product-add-btn ${addedFeedback ? 'added' : ''}`}>
          {addedFeedback ? '✓ Added!' : '🛒 Add to Cart'}
        </button>
      </div>
    </div>
  );
};

// CartSummary component
const CartSummary = ({ totalItems }) => {
  return (
    <div className="cart-summary">
      <div className="cart-header">
        <span className="cart-icon">🛍️</span>
        <h2 className="cart-title">Cart Summary</h2>
      </div>
      <div className="cart-count">
        <span className="cart-number">{totalItems}</span>
        <span className="cart-label">items</span>
      </div>
      <p className="cart-message">
        {totalItems === 0 ? "Your cart is empty. Add some products!" : `You have ${totalItems} item${totalItems !== 1 ? 's' : ''} in your cart.`}
      </p>
      <div className="cart-note">✨ Cart state lifted to parent – shared across all product cards</div>
    </div>
  );
};

// ShoppingCart parent component
const ShoppingCart = () => {
  const [cartCount, setCartCount] = useState(0);
  
  const products = [
    { id: 1, name: "Wireless Headphones", description: "Noise cancelling, 30h battery", price: 79.99, category: "electronics" },
    { id: 2, name: "Cotton T-Shirt", description: "Soft, breathable fabric", price: 19.99, category: "clothing" },
    { id: 3, name: "JavaScript: The Good Parts", description: "Essential JS book", price: 29.99, category: "books" },
    { id: 4, name: "Smart Watch", description: "Fitness tracker & notifications", price: 199.99, category: "electronics" },
    { id: 5, name: "Denim Jacket", description: "Classic style, all seasons", price: 59.99, category: "clothing" }
  ];
  
  const addToCartHandler = (productId) => {
    setCartCount(prevCount => prevCount + 1);
    console.log(`Product ID ${productId} added to cart. New total: ${cartCount + 1}`);
  };
  
  return (
    <div className="shopping-cart-container">
      <div className="products-section">
        <div className="products-header">
          <h2 className="products-title">📦 Our Products</h2>
          <span className="products-count">{products.length} items</span>
        </div>
        <div className="products-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCartHandler} />
          ))}
        </div>
      </div>
      <div className="summary-section">
        <CartSummary totalItems={cartCount} />
      </div>
    </div>
  );
};

// --------------------------------------------------------------
// Main App Component
// --------------------------------------------------------------
const App = () => {
  return (
    <div className="app-container">
      <div className="app-header">
        <h1 className="app-title">Day 2: Props & State Mastery</h1>
        <p className="app-subtitle">Interactive Counter · ToggleCard · ColorPicker · Product Listing with Shared Cart</p>
      </div>
      
      <section className="task-section">
        <div className="task-badge task1-badge">Task 1</div>
        <h2 className="task-title">Interactive Components (useState)</h2>
        <div className="task1-grid">
          <Counter />
          <ToggleCard />
          <ColorPicker />
        </div>
      </section>
      
      <div className="divider"></div>
      
      <section className="task-section">
        <div className="task-badge task2-badge">Task 2</div>
        <h2 className="task-title">Shopping Cart (Lifted State)</h2>
        <span className="task-subnote">Parent manages cart count → passes handler to children</span>
        <ShoppingCart />
      </section>
      
      <div className="app-footer">
        <div className="footer-item">✅ Task 1: Counter never goes below 0; ToggleCard hides/shows content; ColorPicker updates preview background.</div>
        <div className="footer-item">✅ Task 2: ShoppingCart parent holds cart state, passes addToCart handler. ProductCard child uses it to update parent's count. CartSummary displays total items.</div>
      </div>
    </div>
  );
};

export default App;