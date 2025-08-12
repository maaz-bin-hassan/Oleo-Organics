import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import './Shop.css';

const Shop = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Get unique categories
  const categories = ['all', ...new Set(products.map(product => product.category))];

  // Filter products by category
  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  // Sort products
  const handleSort = (sortOption) => {
    setSortBy(sortOption);
    const sorted = [...filteredProducts].sort((a, b) => {
      switch (sortOption) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'featured':
          return b.featured - a.featured;
        default:
          return 0;
      }
    });
    setFilteredProducts(sorted);
  };

  return (
    <div className="shop">
      <div className="container">
        <div className="shop-header">
          <h1>Our Products</h1>
          <p>Discover our complete collection of premium organic hair oils</p>
        </div>

        <div className="shop-controls">
          <div className="filters">
            <h3>Categories</h3>
            <div className="category-filters">
              {categories.map(category => (
                <button
                  key={category}
                  className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => handleCategoryFilter(category)}
                >
                  {category === 'all' ? 'All Products' : category}
                </button>
              ))}
            </div>
          </div>

          <div className="sort-controls">
            <label htmlFor="sort-select">Sort by:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => handleSort(e.target.value)}
              className="sort-select"
            >
              <option value="name">Name (A-Z)</option>
              <option value="price-low">Price (Low to High)</option>
              <option value="price-high">Price (High to Low)</option>
              <option value="featured">Featured First</option>
            </select>
          </div>
        </div>

        <div className="products-section">
          <div className="products-count">
            <p>Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}</p>
          </div>

          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="no-products">
              <h3>No products found</h3>
              <p>Try adjusting your filters or browse all products.</p>
              <button 
                className="reset-filters-btn"
                onClick={() => handleCategoryFilter('all')}
              >
                Show All Products
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
