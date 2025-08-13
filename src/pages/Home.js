import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getFeaturedProducts } from '../data/products';
import './Home.css';

const Home = () => {
  const featuredProducts = getFeaturedProducts();

  // Set page title and meta description for SEO
  useEffect(() => {
    document.title = '🌿 Oleo Organics - Premium Organic Products | Natural & Sustainable';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Discover premium organic products at Oleo Organics. Natural hair care, skincare, and wellness products. Ethically sourced, sustainably made. Free shipping in Pakistan.');
    }
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero" role="banner">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Natural Hair Care Products
              <span className="hero-subtitle">with Oleo Organics</span>
            </h1>
            <p className="hero-description">
              Discover our premium collection of organic hair oils and skincare products, carefully crafted 
              with natural ingredients to nourish, strengthen, and transform your hair and skin 
              into their healthiest, most beautiful state. Made in Pakistan with love.
            </p>
            <div className="hero-actions">
              <Link to="/shop" className="cta-button primary" aria-label="Browse our organic product collection">
                Shop Now
              </Link>
              <Link to="/about" className="cta-button secondary" aria-label="Learn more about Oleo Organics">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" aria-labelledby="features-heading">
        <div className="container">
          <h2 id="features-heading" className="section-title">Why Choose Oleo Organics</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon" aria-hidden="true">🌿</div>
              <h3>100% Natural & Organic</h3>
              <p>Pure organic ingredients sourced from nature's finest botanicals, certified organic and chemical-free</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon" aria-hidden="true">🧪</div>
              <h3>Scientifically Tested & Safe</h3>
              <p>Each formula is carefully tested for effectiveness and safety, dermatologist approved</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon" aria-hidden="true">🚚</div>
              <h3>Fast Delivery Pakistan</h3>
              <p>Quick and secure delivery across Pakistan with cash on delivery option available</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon" aria-hidden="true">💯</div>
              <h3>100% Satisfaction Guaranteed</h3>
              <p>We stand behind our organic products with a 30-day satisfaction guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products" aria-labelledby="featured-products-heading">
        <div className="container">
          <div className="section-header">
            <h2 id="featured-products-heading" className="section-title">Featured Organic Products</h2>
            <p className="section-description">
              Discover our most popular natural hair care and skincare solutions, loved by customers across Pakistan. 
              Organic, sustainable, and ethically sourced.
            </p>
          </div>
          
          <div className="products-grid" role="region" aria-label="Featured products">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="section-footer">
            <Link to="/shop" className="view-all-button" aria-label="View all organic products in our shop">
              View All Products
              <span className="arrow" aria-hidden="true">→</span>
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
      <section className="newsletter" aria-labelledby="newsletter-heading">
        <div className="container">
          <div className="newsletter-content">
            <h2 id="newsletter-heading">Stay Updated with Oleo Organics</h2>
            <p>Subscribe to our newsletter for organic hair care tips, new product launches, exclusive offers, and natural beauty advice</p>
            <form className="newsletter-form" aria-label="Newsletter subscription form">
              <label htmlFor="newsletter-email" className="sr-only">Email address for newsletter</label>
              <input 
                id="newsletter-email"
                type="email" 
                placeholder="Enter your email address"
                className="newsletter-input"
                required
                aria-required="true"
                aria-describedby="newsletter-description"
              />
              <span id="newsletter-description" className="sr-only">
                We'll send you organic beauty tips and product updates. No spam, unsubscribe anytime.
              </span>
              <button type="submit" className="newsletter-button">
                Subscribe Now
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
