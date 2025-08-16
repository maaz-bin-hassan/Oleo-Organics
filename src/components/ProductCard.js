import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import StarRating from './StarRating';
import './ProductCard.css';

const ProductCard = ({ product, showAddToCart = true }) => {
  const { addToCart, isInCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image-container">
          <img 
            src={product.image} 
            alt={product.name}
            className="product-image"
            loading="lazy"
          />
          {product.featured && (
            <span className="featured-badge">Featured</span>
          )}
          {!product.inStock && (
            <span className="out-of-stock-badge">Out of Stock</span>
          )}
        </div>
        
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-category">{product.category}</p>
          <p className="product-description">{product.shortDescription}</p>
          
          <div className="product-rating">
            <StarRating 
              rating={product.rating} 
              size="small" 
              showRating={false}
            />
            <span className="reviews-count">({product.reviews} reviews)</span>
          </div>
          
          <div className="product-price">
            {formatPrice(product.price)}
          </div>
          
          {showAddToCart && (
            <button 
              className={`add-to-cart-btn ${isInCart(product.id) ? 'in-cart' : ''}`}
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              {!product.inStock ? 'Out of Stock' : 
               isInCart(product.id) ? 'Added to Cart ✓' : 'Add to Cart'}
            </button>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
