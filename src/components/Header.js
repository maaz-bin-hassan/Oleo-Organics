import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartItemsCount } = useCart();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo" onClick={closeMenu} aria-label="Oleo Organics - Go to homepage">
            <img 
              src="/android-chrome-192x192.png" 
              alt="Oleo Organics Logo" 
              className="logo-image"
            />
          </Link>

          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <ul className="nav-list">
              <li className="nav-item">
                <Link 
                  to="/" 
                  className={`nav-link ${isActiveLink('/') ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  to="/shop" 
                  className={`nav-link ${isActiveLink('/shop') ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  Shop
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  to="/about" 
                  className={`nav-link ${isActiveLink('/about') ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  to="/contact" 
                  className={`nav-link ${isActiveLink('/contact') ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <div className="header-actions">
            <Link 
              to="/cart" 
              className={`cart-link ${isActiveLink('/cart') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <span className="cart-icon">🛒</span>
              <span className="cart-text">Cart</span>
              {getCartItemsCount() > 0 && (
                <span className="cart-badge">{getCartItemsCount()}</span>
              )}
            </Link>
          </div>

          <button 
            className="menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className={`hamburger ${isMenuOpen ? 'hamburger-open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
