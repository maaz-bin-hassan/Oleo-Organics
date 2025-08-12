import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './OrderSuccess.css';

const OrderSuccess = () => {
  const location = useLocation();
  const { orderId, customerInfo, items, total } = location.state || {};

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (!orderId) {
    return (
      <div className="order-success">
        <div className="container">
          <div className="order-not-found">
            <h1>Order Not Found</h1>
            <p>We couldn't find your order details.</p>
            <Link to="/shop" className="shop-button">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="order-success">
      <div className="container">
        <div className="success-content">
          <div className="success-icon">
            <div className="checkmark-circle">
              <div className="checkmark">✓</div>
            </div>
          </div>

          <div className="success-message">
            <h1>Order Placed Successfully!</h1>
            <p>Thank you for your order. We'll contact you soon to confirm delivery details.</p>
          </div>

          <div className="order-details">
            <div className="order-summary">
              <h2>Order Summary</h2>
              <div className="order-info">
                <div className="info-item">
                  <span className="label">Order ID:</span>
                  <span className="value">{orderId}</span>
                </div>
                <div className="info-item">
                  <span className="label">Payment Method:</span>
                  <span className="value">Cash on Delivery</span>
                </div>
                <div className="info-item">
                  <span className="label">Total Amount:</span>
                  <span className="value total-amount">{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            <div className="customer-details">
              <h2>Delivery Information</h2>
              <div className="customer-info">
                <div className="info-item">
                  <span className="label">Name:</span>
                  <span className="value">{customerInfo?.firstName} {customerInfo?.lastName}</span>
                </div>
                <div className="info-item">
                  <span className="label">Email:</span>
                  <span className="value">{customerInfo?.email}</span>
                </div>
                <div className="info-item">
                  <span className="label">Phone:</span>
                  <span className="value">{customerInfo?.phone}</span>
                </div>
                <div className="info-item">
                  <span className="label">Address:</span>
                  <span className="value">
                    {customerInfo?.address}, {customerInfo?.city}
                    {customerInfo?.postalCode && `, ${customerInfo.postalCode}`}
                  </span>
                </div>
              </div>
            </div>

            <div className="ordered-items">
              <h2>Ordered Items</h2>
              <div className="items-list">
                {items?.map(item => (
                  <div key={item.id} className="order-item">
                    <img src={item.image} alt={item.name} />
                    <div className="item-info">
                      <h4>{item.name}</h4>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                    <div className="item-price">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="next-steps">
            <h2>What's Next?</h2>
            <div className="steps-grid">
              <div className="step">
                <div className="step-icon">📞</div>
                <h3>Confirmation Call</h3>
                <p>We'll call you within 24 hours to confirm your order and delivery details.</p>
              </div>
              <div className="step">
                <div className="step-icon">📦</div>
                <h3>Order Processing</h3>
                <p>Your order will be carefully prepared and packaged for delivery.</p>
              </div>
              <div className="step">
                <div className="step-icon">🚚</div>
                <h3>Delivery</h3>
                <p>Free delivery within 2-5 business days across Pakistan.</p>
              </div>
              <div className="step">
                <div className="step-icon">💰</div>
                <h3>Payment</h3>
                <p>Pay cash when you receive your order. No advance payment required.</p>
              </div>
            </div>
          </div>

          <div className="contact-support">
            <h3>Need Help?</h3>
            <p>If you have any questions about your order, feel free to contact us.</p>
            <div className="support-options">
              <a href="tel:+923001234567" className="support-link">
                <span>📞</span>
                <span>Call: +92 300 1234567</span>
              </a>
              <a href="mailto:info@oleoorganics.com" className="support-link">
                <span>✉️</span>
                <span>Email: info@oleoorganics.com</span>
              </a>
            </div>
          </div>

          <div className="action-buttons">
            <Link to="/shop" className="continue-shopping-btn">
              Continue Shopping
            </Link>
            <Link to="/contact" className="contact-btn">
              Contact Support
            </Link>
          </div>

          <div className="thank-you-note">
            <h3>Thank You for Choosing Oleo Organics!</h3>
            <p>
              We're committed to providing you with the highest quality natural hair care products. 
              Your satisfaction is our priority, and we look forward to serving you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
