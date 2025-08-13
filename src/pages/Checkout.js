import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { sendOrderConfirmationEmail } from '../services/emailService';
import { saveOrderToFirebase } from '../services/firebaseOrderService';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMessage, setProcessingMessage] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});

  // Handle empty cart navigation
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems.length, navigate]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const SHIPPING_FEE = 250;

  const getTotalWithShipping = () => {
    return getCartTotal() + SHIPPING_FEE;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^(\+92|0)?[0-9]{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid Pakistani phone number';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('=== CHECKOUT DEBUG START ===');
    console.log('Form submitted!');
    console.log('Form data:', formData);
    console.log('Cart items:', cartItems);
    console.log('Cart total:', getCartTotal());
    
    if (!validateForm()) {
      console.log('❌ Form validation FAILED');
      console.log('Errors:', errors);
      return;
    }

    console.log('✅ Form validation PASSED');
    setIsProcessing(true);
    setProcessingMessage('Processing your order...');

    try {
      console.log('🔄 Starting order processing...');
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate order ID
      const orderId = `OO${Date.now()}`;
      console.log('📋 Generated order ID:', orderId);
      
      // Prepare order data for email
      const orderData = {
        orderId,
        customerInfo: formData,
        items: cartItems,
        subtotal: getCartTotal(),
        shipping: SHIPPING_FEE,
        total: getTotalWithShipping()
      };
      
      console.log('📦 Order data prepared:', orderData);
      
      // Save order to Firebase for admin tracking
      console.log('☁️ Saving order to Firebase...');
      const saveResult = await saveOrderToFirebase(orderData);
      console.log('☁️ Firebase save result:', saveResult);
      
      if (!saveResult.success) {
        console.warn('⚠️ Failed to save to Firebase, order may not appear in admin dashboard');
        // Continue with email sending even if Firebase save fails
      }
      
      // Send order confirmation email
      setProcessingMessage('Sending confirmation email...');
      console.log('📧 Attempting to send email...');
      const emailResult = await sendOrderConfirmationEmail(orderData);
      
      console.log('📧 Email result:', emailResult);
      
      if (emailResult.success) {
        console.log('✅ Email sent successfully');
        setProcessingMessage('Order complete! Redirecting...');
      } else {
        console.log('❌ Email failed, but continuing');
        setProcessingMessage('Order placed successfully! Redirecting...');
      }
      
      // Brief pause to show success message
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('🗑️ Clearing cart...');
      // Clear cart
      clearCart();
      
      // Prepare navigation data
      const navigationData = {
        orderId, 
        customerInfo: formData,
        items: cartItems,
        subtotal: getCartTotal(),
        shipping: SHIPPING_FEE,
        total: getTotalWithShipping(),
        emailSent: emailResult.success
      };
      
      console.log('🔄 Navigation data:', navigationData);
      console.log('🔄 Navigating to order success...');
      
      // Use setTimeout to ensure navigation happens after current render cycle
      setTimeout(() => {
        navigate('/order-success', { 
          state: navigationData
        });
        console.log('✅ Navigation complete');
      }, 100);
    } catch (error) {
      console.error('💥 Order processing failed:', error);
      setIsProcessing(false);
      setProcessingMessage('');
    }
    
    console.log('=== CHECKOUT DEBUG END ===');
  };

  // Don't render if cart is empty (useEffect will handle navigation)
  if (cartItems.length === 0) {
    return <div>Redirecting to cart...</div>;
  }

  return (
    <div className="checkout">
      <div className="container">
        <div className="checkout-header">
          <h1>Checkout</h1>
          <p>Complete your order with cash on delivery</p>
        </div>

        <div className="checkout-content">
          <div className="checkout-form-section">
            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="form-section">
                <h2>Shipping Information</h2>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={errors.firstName ? 'error' : ''}
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={errors.lastName ? 'error' : ''}
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? 'error' : ''}
                      placeholder="Enter your email"
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={errors.phone ? 'error' : ''}
                      placeholder="03XX XXXXXXX"
                    />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="address">Complete Address *</label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={errors.address ? 'error' : ''}
                    placeholder="House/Flat number, Street, Area"
                    rows="3"
                  />
                  {errors.address && <span className="error-message">{errors.address}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City *</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={errors.city ? 'error' : ''}
                      placeholder="Enter your city"
                    />
                    {errors.city && <span className="error-message">{errors.city}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="postalCode">Postal Code</label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      placeholder="Enter postal code"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="notes">Order Notes (Optional)</label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Any special instructions for delivery"
                    rows="3"
                  />
                </div>
              </div>

              <div className="form-section">
                <h2>Payment Method</h2>
                <div className="payment-method">
                  <div className="payment-option selected">
                    <span className="payment-icon">💰</span>
                    <div>
                      <strong>Cash on Delivery</strong>
                      <p>Pay when you receive your order</p>
                    </div>
                    <span className="checkmark">✓</span>
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                className="place-order-btn"
                disabled={isProcessing}
              >
                {isProcessing ? (processingMessage || 'Processing Order...') : 'Place Order'}
              </button>
            </form>
          </div>

          <div className="order-summary">
            <div className="order-summary-content">
              <h2>Order Summary</h2>
              
              <div className="order-items">
                {cartItems.map(item => (
                  <div key={item.id} className="order-item">
                    <img src={item.image} alt={item.name} />
                    <div className="order-item-info">
                      <h4>{item.name}</h4>
                      <p>Qty: {item.quantity}</p>
                    </div>
                    <div className="order-item-price">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-totals">
                <div className="total-line">
                  <span>Subtotal</span>
                  <span>{formatPrice(getCartTotal())}</span>
                </div>
                <div className="total-line">
                  <span>Shipping</span>
                  <span>{formatPrice(SHIPPING_FEE)}</span>
                </div>
                <div className="total-line grand-total">
                  <span>Total</span>
                  <span>{formatPrice(getTotalWithShipping())}</span>
                </div>
              </div>

              <div className="order-features">
                <div className="feature">
                  <span>🚚</span>
                  <span>Fast delivery across Pakistan</span>
                </div>
                <div className="feature">
                  <span>🔒</span>
                  <span>Secure & safe ordering</span>
                </div>
                <div className="feature">
                  <span>📞</span>
                  <span>24/7 customer support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
