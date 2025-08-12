import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    getCartTotal 
  } = useCart();
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart empty-cart">
        <div className="container">
          <div className="empty-cart-content">
            <div className="empty-cart-icon">🛒</div>
            <h1>Your Cart is Empty</h1>
            <p>It looks like you haven't added any products to your cart yet.</p>
            <Link to="/shop" className="continue-shopping-btn">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <p>Review your items and proceed to checkout</p>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            <div className="cart-items-header">
              <h2>Items in Your Cart ({cartItems.length})</h2>
              <button 
                onClick={handleClearCart}
                className="clear-cart-btn"
              >
                Clear Cart
              </button>
            </div>

            <div className="cart-items-list">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    <Link to={`/product/${item.id}`}>
                      <img src={item.image} alt={item.name} />
                    </Link>
                  </div>

                  <div className="cart-item-info">
                    <Link to={`/product/${item.id}`} className="cart-item-name">
                      {item.name}
                    </Link>
                    <p className="cart-item-category">{item.category}</p>
                    <p className="cart-item-price">{formatPrice(item.price)}</p>
                  </div>

                  <div className="cart-item-controls">
                    <div className="quantity-controls">
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="quantity-btn"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="quantity-display">{item.quantity}</span>
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="quantity-btn"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <div className="cart-item-subtotal">
                      {formatPrice(item.price * item.quantity)}
                    </div>

                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="remove-btn"
                      aria-label="Remove item"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="cart-summary">
            <div className="cart-summary-content">
              <h2>Order Summary</h2>
              
              <div className="summary-line">
                <span>Subtotal ({cartItems.reduce((total, item) => total + item.quantity, 0)} items)</span>
                <span>{formatPrice(getCartTotal())}</span>
              </div>
              
              <div className="summary-line">
                <span>Shipping</span>
                <span className="free-shipping">Free</span>
              </div>
              
              <div className="summary-line total">
                <span>Total</span>
                <span>{formatPrice(getCartTotal())}</span>
              </div>

              <div className="cart-actions">
                <button 
                  onClick={handleCheckout}
                  className="checkout-btn"
                >
                  Proceed to Checkout
                </button>
                
                <Link to="/shop" className="continue-shopping-link">
                  ← Continue Shopping
                </Link>
              </div>

              <div className="payment-info">
                <div className="payment-method">
                  <span className="payment-icon">💰</span>
                  <div>
                    <strong>Cash on Delivery</strong>
                    <p>Pay when you receive your order</p>
                  </div>
                </div>
                
                <div className="shipping-info">
                  <span className="shipping-icon">🚚</span>
                  <div>
                    <strong>Free Shipping</strong>
                    <p>Delivery across Pakistan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
