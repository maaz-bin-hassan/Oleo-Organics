import React from 'react';
import './StarRating.css';

const StarRating = ({ rating, size = 'medium', showRating = false, className = '' }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`star-rating ${size} ${className}`}>
      <div className="stars">
        {/* Full stars */}
        {[...Array(fullStars)].map((_, index) => (
          <span key={`full-${index}`} className="star full">★</span>
        ))}
        
        {/* Half star */}
        {hasHalfStar && (
          <span className="star half">
            <span className="star-half">★</span>
          </span>
        )}
        
        {/* Empty stars */}
        {[...Array(emptyStars)].map((_, index) => (
          <span key={`empty-${index}`} className="star empty">☆</span>
        ))}
      </div>
      
      {showRating && (
        <span className="rating-number">({rating.toFixed(1)})</span>
      )}
    </div>
  );
};

export default StarRating;
