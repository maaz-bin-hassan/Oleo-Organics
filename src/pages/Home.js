import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getFeaturedProducts } from '../data/products';
import './Home.css';

const Home = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Natural Hair Care
              <span className="hero-subtitle">with Oleo Organics</span>
            </h1>
            <p className="hero-description">
              Discover our premium collection of organic hair oils, carefully crafted 
              with natural ingredients to nourish, strengthen, and transform your hair 
              into its healthiest, most beautiful state.
            </p>
            <div className="hero-actions">
              <Link to="/shop" className="cta-button primary">
                Shop Now
              </Link>
              <Link to="/about" className="cta-button secondary">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🌿</div>
              <h3>100% Natural</h3>
              <p>Pure organic ingredients sourced from nature's finest botanicals</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🧪</div>
              <h3>Scientifically Tested</h3>
              <p>Each formula is carefully tested for effectiveness and safety</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Fast Delivery</h3>
              <p>Quick and secure delivery across Pakistan with cash on delivery</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💯</div>
              <h3>Satisfaction Guaranteed</h3>
              <p>We stand behind our products with a 30-day satisfaction guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Products</h2>
            <p className="section-description">
              Discover our most popular hair care solutions, loved by customers across Pakistan
            </p>
          </div>
          
          <div className="products-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="section-footer">
            <Link to="/shop" className="view-all-button">
              View All Products
              <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits">
        <div className="container">
          <div className="benefits-content">
            <div className="benefits-text">
              <h2>Why Choose Oleo Organics?</h2>
              <div className="benefits-list">
                <div className="benefit-item">
                  <span className="benefit-icon">✨</span>
                  <div>
                    <h4>Premium Quality</h4>
                    <p>We use only the finest organic oils and natural extracts</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">🌱</span>
                  <div>
                    <h4>Eco-Friendly</h4>
                    <p>Sustainable sourcing and environmentally conscious packaging</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">💝</span>
                  <div>
                    <h4>Made with Love</h4>
                    <p>Each product is crafted with care and attention to detail</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="benefits-image">
              <div className="image-placeholder">
                <span>🌿</span>
                <p>Natural Ingredients</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter">
        <div className="container">
          <div className="newsletter-content">
            <h2>Stay Updated</h2>
            <p>Subscribe to our newsletter for hair care tips, new product launches, and exclusive offers</p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="newsletter-input"
                required
              />
              <button type="submit" className="newsletter-button">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
