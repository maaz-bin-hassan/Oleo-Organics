import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getProductById } from '../data/products';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInCart, getCartItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const product = getProductById(id);
  
  if (!product) {
    return (
      <div className="product-not-found">
        <div className="container">
          <h1>Product Not Found</h1>
          <p>The product you're looking for doesn't exist.</p>
          <Link to="/shop" className="back-button">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const cartItem = getCartItem(product.id);
  const currentCartQuantity = cartItem ? cartItem.quantity : 0;

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
    addToCart(product, quantity);
    setIsLoading(false);
    setQuantity(1);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="product-detail">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/shop">Shop</Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <div className="product-content">
          <div className="product-image-section">
            <div className="product-image-container">
              <img 
                src={product.image} 
                alt={product.name}
                className="product-image"
              />
              {product.featured && (
                <span className="featured-badge">Featured</span>
              )}
              {!product.inStock && (
                <span className="out-of-stock-badge">Out of Stock</span>
              )}
            </div>
          </div>

          <div className="product-info-section">
            <div className="product-header">
              <span className="product-category">{product.category}</span>
              <h1 className="product-title">{product.name}</h1>
              <div className="product-price">
                {formatPrice(product.price)}
              </div>
            </div>

            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            <div className="product-ingredients">
              <h3>Key Ingredients</h3>
              <ul className="ingredients-list">
                {product.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>

            <div className="product-actions">
              <div className="quantity-selector">
                <label htmlFor="quantity">Quantity:</label>
                <div className="quantity-controls">
                  <button 
                    type="button"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    max="10"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    className="quantity-input"
                  />
                  <button 
                    type="button"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= 10}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
              </div>

              <button 
                onClick={handleAddToCart}
                disabled={!product.inStock || isLoading}
                className={`add-to-cart-btn ${isInCart(product.id) ? 'in-cart' : ''}`}
              >
                {isLoading ? 'Adding...' :
                 !product.inStock ? 'Out of Stock' :
                 isInCart(product.id) ? `In Cart (${currentCartQuantity})` : 'Add to Cart'}
              </button>

              <div className="action-buttons">
                <button 
                  onClick={() => navigate('/cart')}
                  className="view-cart-btn"
                  disabled={currentCartQuantity === 0}
                >
                  View Cart ({currentCartQuantity})
                </button>
                <Link to="/shop" className="continue-shopping-btn">
                  Continue Shopping
                </Link>
              </div>
            </div>

            <div className="product-features">
              <div className="feature">
                <span className="feature-icon">🌿</span>
                <span>100% Natural & Organic</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🚚</span>
                <span>Free Delivery in Pakistan</span>
              </div>
              <div className="feature">
                <span className="feature-icon">💰</span>
                <span>Cash on Delivery Available</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🔄</span>
                <span>30-Day Return Policy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
