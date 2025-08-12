import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <div className="contact">
      <div className="container">
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Get in touch with any questions or feedback.</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-card">
              <h2>Get in Touch</h2>
              <p>
                Have questions about our products or need hair care advice? 
                We're here to help! Reach out to us and we'll get back to you 
                as soon as possible.
              </p>
            </div>

            <div className="contact-methods">
              <div className="contact-method">
                <div className="method-icon">📞</div>
                <div className="method-info">
                  <h4>Phone</h4>
                  <p>+92 300 1234567</p>
                  <span>Mon-Fri 9AM-6PM</span>
                </div>
              </div>

              <div className="contact-method">
                <div className="method-icon">✉️</div>
                <div className="method-info">
                  <h4>Email</h4>
                  <p>info@oleoorganics.com</p>
                  <span>We reply within 24 hours</span>
                </div>
              </div>

              <div className="contact-method">
                <div className="method-icon">📍</div>
                <div className="method-info">
                  <h4>Location</h4>
                  <p>Lahore, Pakistan</p>
                  <span>Free delivery nationwide</span>
                </div>
              </div>

              <div className="contact-method">
                <div className="method-icon">⏰</div>
                <div className="method-info">
                  <h4>Business Hours</h4>
                  <p>Monday - Friday: 9AM - 6PM</p>
                  <span>Saturday: 10AM - 4PM</span>
                </div>
              </div>
            </div>

            <div className="social-section">
              <h3>Follow Us</h3>
              <p>Stay connected for hair care tips and product updates</p>
              <div className="social-links">
                <a href="#facebook" className="social-link">
                  <span>📘</span>
                  <span>Facebook</span>
                </a>
                <a href="#instagram" className="social-link">
                  <span>📷</span>
                  <span>Instagram</span>
                </a>
                <a href="#twitter" className="social-link">
                  <span>🐦</span>
                  <span>Twitter</span>
                </a>
                <a href="#youtube" className="social-link">
                  <span>📺</span>
                  <span>YouTube</span>
                </a>
              </div>
            </div>
          </div>

          <div className="contact-form-section">
            <form onSubmit={handleSubmit} className="contact-form">
              <h2>Send us a Message</h2>
              
              {submitStatus === 'success' && (
                <div className="form-message success">
                  ✅ Thank you! Your message has been sent successfully. We'll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="form-message error">
                  ❌ Sorry, there was an error sending your message. Please try again.
                </div>
              )}

              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your email address"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="product-inquiry">Product Inquiry</option>
                  <option value="order-support">Order Support</option>
                  <option value="hair-care-advice">Hair Care Advice</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="6"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending Message...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>

        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>What ingredients do you use?</h4>
              <p>
                We use only 100% natural and organic ingredients sourced from 
                trusted suppliers. Each product contains carefully selected oils 
                and extracts known for their hair care benefits.
              </p>
            </div>

            <div className="faq-item">
              <h4>How long does delivery take?</h4>
              <p>
                We offer free delivery across Pakistan. Orders are typically 
                delivered within 2-5 business days depending on your location.
              </p>
            </div>

            <div className="faq-item">
              <h4>Do you offer cash on delivery?</h4>
              <p>
                Yes! We offer cash on delivery (COD) for all orders across 
                Pakistan. You can pay when you receive your products.
              </p>
            </div>

            <div className="faq-item">
              <h4>Can I return a product?</h4>
              <p>
                We offer a 30-day satisfaction guarantee. If you're not completely 
                satisfied with your purchase, you can return it for a full refund.
              </p>
            </div>

            <div className="faq-item">
              <h4>How should I use the hair oils?</h4>
              <p>
                Apply a small amount to damp or dry hair, focusing on the ends 
                and mid-lengths. Massage gently into scalp if desired. Can be 
                used daily or as needed.
              </p>
            </div>

            <div className="faq-item">
              <h4>Are your products suitable for all hair types?</h4>
              <p>
                Yes! Our products are formulated to work with all hair types 
                and textures. Each product description includes specific benefits 
                for different hair concerns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
