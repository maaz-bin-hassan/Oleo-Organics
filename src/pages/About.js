import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about">
      <div className="container">
        <div className="about-hero">
          <h1>About Oleo Organics</h1>
          <p>Your trusted partner in natural hair care</p>
        </div>

        <div className="about-content">
          <section className="about-story">
            <div className="story-content">
              <div className="story-text">
                <h2>Our Story</h2>
                <p>
                  Founded in 2020, Oleo Organics was born from a passion for natural beauty and 
                  sustainable hair care. Our journey began when our founder, struggling with 
                  damaged hair from chemical treatments, discovered the transformative power of 
                  organic oils.
                </p>
                <p>
                  What started as a personal quest for healthier hair evolved into a mission to 
                  share these incredible natural solutions with others. We believe that nature 
                  provides the best ingredients for beautiful, healthy hair, and we're committed 
                  to bringing you the purest, most effective organic hair oils.
                </p>
              </div>
              <div className="story-image">
                <div className="image-placeholder">
                  <span>🌿</span>
                  <p>Natural Beauty</p>
                </div>
              </div>
            </div>
          </section>

          <section className="about-mission">
            <h2>Our Mission</h2>
            <div className="mission-grid">
              <div className="mission-card">
                <div className="mission-icon">🌱</div>
                <h3>100% Natural</h3>
                <p>
                  We source only the finest organic ingredients, ensuring every drop 
                  of our oils is pure, natural, and free from harmful chemicals.
                </p>
              </div>
              <div className="mission-card">
                <div className="mission-icon">🌍</div>
                <h3>Sustainable</h3>
                <p>
                  Our commitment to the environment drives us to use eco-friendly 
                  packaging and sustainable sourcing practices.
                </p>
              </div>
              <div className="mission-card">
                <div className="mission-icon">💚</div>
                <h3>Effective</h3>
                <p>
                  Each product is carefully formulated to deliver real results, 
                  helping you achieve the healthy, beautiful hair you deserve.
                </p>
              </div>
            </div>
          </section>

          <section className="about-values">
            <div className="values-content">
              <div className="values-text">
                <h2>Our Values</h2>
                <div className="values-list">
                  <div className="value-item">
                    <h4>Quality First</h4>
                    <p>
                      We never compromise on quality. Every ingredient is carefully 
                      selected and tested to ensure it meets our high standards.
                    </p>
                  </div>
                  <div className="value-item">
                    <h4>Transparency</h4>
                    <p>
                      We believe in complete transparency about our ingredients, 
                      sourcing, and production processes.
                    </p>
                  </div>
                  <div className="value-item">
                    <h4>Customer Care</h4>
                    <p>
                      Your satisfaction is our priority. We're here to support 
                      your hair care journey every step of the way.
                    </p>
                  </div>
                </div>
              </div>
              <div className="values-stats">
                <div className="stat-item">
                  <div className="stat-number">1000+</div>
                  <div className="stat-label">Happy Customers</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">5</div>
                  <div className="stat-label">Premium Products</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">100%</div>
                  <div className="stat-label">Natural Ingredients</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">3</div>
                  <div className="stat-label">Years of Excellence</div>
                </div>
              </div>
            </div>
          </section>

          <section className="about-ingredients">
            <h2>Why Natural Ingredients Matter</h2>
            <div className="ingredients-grid">
              <div className="ingredient-card">
                <div className="ingredient-icon">🥥</div>
                <h4>Coconut Oil</h4>
                <p>
                  Rich in fatty acids that penetrate deep into hair strands, 
                  providing intense moisture and protection against damage.
                </p>
              </div>
              <div className="ingredient-card">
                <div className="ingredient-icon">🌿</div>
                <h4>Argan Oil</h4>
                <p>
                  Packed with vitamin E and antioxidants, argan oil helps 
                  repair damage and adds incredible shine to your hair.
                </p>
              </div>
              <div className="ingredient-card">
                <div className="ingredient-icon">🌸</div>
                <h4>Rosemary Extract</h4>
                <p>
                  Known to stimulate circulation and promote healthy hair growth 
                  while providing a refreshing, invigorating scent.
                </p>
              </div>
              <div className="ingredient-card">
                <div className="ingredient-icon">💜</div>
                <h4>Lavender Oil</h4>
                <p>
                  Soothes the scalp, reduces stress, and promotes relaxation 
                  while nourishing your hair with essential nutrients.
                </p>
              </div>
            </div>
          </section>

          <section className="about-commitment">
            <div className="commitment-content">
              <h2>Our Commitment to You</h2>
              <p>
                At Oleo Organics, we're more than just a hair care brand – we're your 
                partners in achieving beautiful, healthy hair naturally. Every product 
                we create is a testament to our commitment to quality, sustainability, 
                and your wellbeing.
              </p>
              <p>
                We continue to research and develop new formulations, always staying 
                true to our core values of using only the purest, most effective 
                natural ingredients. Your trust in us drives our passion to deliver 
                excellence in every bottle.
              </p>
              <div className="commitment-features">
                <div className="feature">
                  <span className="feature-icon">✅</span>
                  <span>Cruelty-Free Testing</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">✅</span>
                  <span>Eco-Friendly Packaging</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">✅</span>
                  <span>Ethically Sourced Ingredients</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">✅</span>
                  <span>30-Day Satisfaction Guarantee</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
