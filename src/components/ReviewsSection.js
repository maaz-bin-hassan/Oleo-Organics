import React, { useState } from 'react';
import StarRating from './StarRating';
import './ReviewsSection.css';

const ReviewsSection = ({ product }) => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    text: '',
    author: ''
  });
  const [showWriteReview, setShowWriteReview] = useState(false);

  const displayedReviews = showAllReviews 
    ? product.detailedReviews 
    : product.detailedReviews.slice(0, 3);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    // Here you would typically send the review to your backend
    console.log('New review submitted:', newReview);
    setShowWriteReview(false);
    setNewReview({ rating: 5, text: '', author: '' });
    // You could add the review to the local state for immediate display
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    product.detailedReviews.forEach(review => {
      distribution[review.rating]++;
    });
    return distribution;
  };

  const ratingDistribution = getRatingDistribution();
  const totalReviews = product.detailedReviews.length;

  return (
    <div className="reviews-section">
      <div className="reviews-header">
        <h2>Customer Reviews</h2>
        <div className="rating-summary">
          <div className="overall-rating">
            <div className="rating-score">
              <span className="score">{product.rating}</span>
              <StarRating rating={product.rating} size="large" />
            </div>
            <p className="total-reviews">Based on {product.reviews} reviews</p>
          </div>
          
          <div className="rating-breakdown">
            {[5, 4, 3, 2, 1].map(stars => (
              <div key={stars} className="rating-bar">
                <span className="stars-label">{stars} ★</span>
                <div className="bar-container">
                  <div 
                    className="bar-fill" 
                    style={{ 
                      width: totalReviews > 0 ? `${(ratingDistribution[stars] / totalReviews) * 100}%` : '0%' 
                    }}
                  ></div>
                </div>
                <span className="count">({ratingDistribution[stars]})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="reviews-actions">
        <button 
          className="write-review-btn"
          onClick={() => setShowWriteReview(!showWriteReview)}
        >
          {showWriteReview ? 'Cancel' : 'Write a Review'}
        </button>
      </div>

      {showWriteReview && (
        <div className="write-review-form">
          <h3>Write Your Review</h3>
          <form onSubmit={handleSubmitReview}>
            <div className="form-group">
              <label>Rating:</label>
              <div className="rating-input">
                {[1, 2, 3, 4, 5].map(rating => (
                  <button
                    key={rating}
                    type="button"
                    className={`star-btn ${rating <= newReview.rating ? 'active' : ''}`}
                    onClick={() => setNewReview({...newReview, rating})}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="author">Your Name:</label>
              <input
                type="text"
                id="author"
                value={newReview.author}
                onChange={(e) => setNewReview({...newReview, author: e.target.value})}
                required
                placeholder="Enter your name"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="review-text">Your Review:</label>
              <textarea
                id="review-text"
                value={newReview.text}
                onChange={(e) => setNewReview({...newReview, text: e.target.value})}
                required
                placeholder="Share your experience with this product..."
                rows="4"
              />
            </div>
            
            <button type="submit" className="submit-review-btn">
              Submit Review
            </button>
          </form>
        </div>
      )}

      <div className="reviews-list">
        {displayedReviews.map((review, index) => (
          <div key={index} className="review-item">
            <div className="review-header">
              <div className="reviewer-info">
                <span className="reviewer-name">{review.author}</span>
                <span className="review-date">{formatDate(review.date)}</span>
              </div>
              <StarRating rating={review.rating} size="small" />
            </div>
            <p className="review-text">{review.text}</p>
          </div>
        ))}
      </div>

      {product.detailedReviews.length > 3 && (
        <div className="reviews-footer">
          <button 
            className="show-more-btn"
            onClick={() => setShowAllReviews(!showAllReviews)}
          >
            {showAllReviews ? 'Show Less Reviews' : `Show All ${product.detailedReviews.length} Reviews`}
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;
