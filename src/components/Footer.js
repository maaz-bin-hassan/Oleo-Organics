import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <h3>Oleo Organics</h3>
              <p>Natural hair care for beautiful, healthy hair</p>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/shop">Shop</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Customer Care</h4>
            <ul className="footer-links">
              <li><a href="#shipping">Shipping Info</a></li>
              <li><a href="#returns">Returns</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#support">Support</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <a href="#facebook" className="social-icon" aria-label="Facebook">
                <span>📘</span>
              </a>
              <a href="#instagram" className="social-icon" aria-label="Instagram">
                <span>📷</span>
              </a>
              <a href="#twitter" className="social-icon" aria-label="Twitter">
                <span>🐦</span>
              </a>
              <a href="#youtube" className="social-icon" aria-label="YouTube">
                <span>📺</span>
              </a>
            </div>
            <div className="contact-info">
              <p>📞 +92 300 1234567</p>
              <p>✉️ info@oleoorganics.com</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} Oleo Organics. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
