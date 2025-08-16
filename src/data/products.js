// Import images from assets folder
import productImage from '../assets/product.jpg';

// Fake reviews data
const generateReviews = (productId, count) => {
  const reviewTemplates = [
    { rating: 5, text: "Amazing product! My hair has never felt softer and healthier. Highly recommend!", author: "Sarah Ahmed", date: "2024-12-15" },
    { rating: 4, text: "Great quality oil, noticed improvement in hair texture within weeks. Will buy again.", author: "Fatima Khan", date: "2024-12-10" },
    { rating: 5, text: "Love this organic formula! No chemicals, just pure natural goodness for my hair.", author: "Ayesha Ali", date: "2024-12-08" },
    { rating: 4, text: "Good product, effective for hair growth. Fast delivery and excellent packaging.", author: "Zara Sheikh", date: "2024-12-05" },
    { rating: 5, text: "Best hair oil I've ever used! My hair fall reduced significantly. Thank you Oleo Organics!", author: "Mariam Hassan", date: "2024-12-01" },
    { rating: 4, text: "Natural ingredients and great results. My scalp feels healthier and hair is shinier.", author: "Hina Malik", date: "2024-11-28" },
    { rating: 5, text: "Excellent product quality. Hair feels nourished and strong. Worth every penny!", author: "Khadija Raza", date: "2024-11-25" },
    { rating: 4, text: "Really good for dry hair. The natural oils blend perfectly and smell amazing too.", author: "Saba Tariq", date: "2024-11-20" }
  ];

  const productSpecificReviews = {
    1: [
      { rating: 5, text: "The coconut and argan oil combination is perfect! My hair is so much healthier now.", author: "Nadia Iqbal", date: "2024-12-18" },
      { rating: 4, text: "Love the natural coconut smell and how it makes my hair silky smooth.", author: "Rabia Nawaz", date: "2024-12-12" }
    ],
    2: [
      { rating: 5, text: "The rosemary mint scent is refreshing and it really stimulates my scalp!", author: "Amna Siddique", date: "2024-12-16" },
      { rating: 4, text: "Great for scalp circulation. I can feel the cooling mint effect immediately.", author: "Samina Shah", date: "2024-12-09" }
    ],
    3: [
      { rating: 4, text: "Perfect for my sensitive scalp. The lavender scent is so calming and relaxing.", author: "Farah Butt", date: "2024-12-14" },
      { rating: 5, text: "Chamomile and lavender work wonders for my hair. No irritation at all!", author: "Nighat Khan", date: "2024-12-07" }
    ],
    4: [
      { rating: 5, text: "Black seed oil is amazing for hair growth! Noticed new hair growth within a month.", author: "Rubina Ahmed", date: "2024-12-13" },
      { rating: 4, text: "Premium quality Moroccan black seed oil. Really helps with hair strengthening.", author: "Shazia Malik", date: "2024-12-06" }
    ],
    5: [
      { rating: 4, text: "Hibiscus and amla combination is traditional and effective. Hair feels thicker!", author: "Nasreen Ali", date: "2024-12-11" },
      { rating: 5, text: "Love this Ayurvedic blend! My hair has more volume and less graying.", author: "Shahnaz Sheikh", date: "2024-12-04" }
    ]
  };

  // Combine general reviews with product-specific ones
  const allReviews = [...reviewTemplates, ...(productSpecificReviews[productId] || [])];
  
  // Shuffle and return the requested count
  const shuffled = allReviews.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const products = [
  {
    id: 1,
    name: "Premium Organic Coconut Argan Hair Oil",
    price: 1200,
    image: productImage,
    description: "Transform your hair with our luxurious blend of organic coconut and argan oils. This premium hair treatment deeply nourishes and strengthens damaged hair while promoting healthy growth. Rich in vitamins E and essential fatty acids, perfect for dry, brittle hair. Made with 100% natural ingredients in Pakistan.",
    shortDescription: "Organic coconut and argan oil blend for hair nourishment and growth",
    ingredients: ["Organic Coconut Oil", "Pure Argan Oil", "Vitamin E", "Jojoba Oil"],
    category: "Hair Treatment",
    tags: ["organic", "hair oil", "coconut oil", "argan oil", "hair growth", "natural"],
    benefits: ["Deep nourishment", "Hair strengthening", "Promotes growth", "Adds shine", "Reduces breakage"],
    inStock: true,
    featured: true,
    rating: 4.8,
    reviews: 127,
    sku: "OO-CO-001",
    detailedReviews: generateReviews(1, 6)
  },
  {
    id: 2,
    name: "Organic Rosemary Mint Scalp Treatment Oil",
    price: 950,
    image: productImage,
    description: "Revitalize your scalp with our stimulating rosemary and mint oil treatment. This organic scalp oil improves blood circulation, promotes healthy hair growth, and provides a refreshing, cooling sensation. Perfect for thinning hair and scalp health. 100% natural and chemical-free.",
    shortDescription: "Stimulating scalp treatment with rosemary and mint for hair growth",
    ingredients: ["Organic Rosemary Essential Oil", "Peppermint Oil", "Sweet Almond Oil", "Tea Tree Oil"],
    category: "Scalp Treatment",
    tags: ["organic", "scalp treatment", "rosemary oil", "mint oil", "hair growth", "circulation"],
    benefits: ["Improves circulation", "Stimulates growth", "Refreshing sensation", "Scalp health", "Natural DHT blocker"],
    inStock: true,
    featured: true,
    rating: 4.7,
    reviews: 98,
    sku: "OO-RM-002",
    detailedReviews: generateReviews(2, 5)
  },
  {
    id: 3,
    name: "Organic Lavender Chamomile Hair Serum",
    price: 850,
    image: productImage,
    description: "Soothe and nourish your hair with our calming lavender chamomile serum. This organic hair treatment is perfect for sensitive scalps, providing deep moisturization while promoting relaxation and stress relief. Ideal for damaged, frizzy hair and bedtime hair care routine.",
    shortDescription: "Calming lavender and chamomile serum for sensitive scalps",
    ingredients: ["Organic Lavender Essential Oil", "Chamomile Extract", "Grapeseed Oil", "Rosehip Oil"],
    category: "Hair Serum",
    tags: ["organic", "hair serum", "lavender", "chamomile", "sensitive scalp", "moisturizing"],
    benefits: ["Calms sensitive scalp", "Deep moisturization", "Reduces frizz", "Promotes relaxation", "Natural stress relief"],
    inStock: true,
    featured: false,
    rating: 4.6,
    reviews: 73,
    sku: "OO-LC-003",
    detailedReviews: generateReviews(3, 4)
  },
  {
    id: 4,
    name: "Premium Moroccan Black Seed Hair Oil",
    price: 1400,
    image: productImage,
    description: "Discover the power of authentic Moroccan black seed oil for hair growth and strength. This premium organic oil is rich in antioxidants and essential nutrients that strengthen hair follicles, prevent hair loss naturally, and promote thick, healthy hair growth. Traditional remedy meets modern quality.",
    shortDescription: "Premium Moroccan black seed oil for hair growth and strength",
    ingredients: ["Pure Black Seed Oil", "Moroccan Argan Oil", "Organic Castor Oil", "Vitamin E"],
    category: "Premium Treatment",
    tags: ["organic", "black seed oil", "moroccan oil", "hair growth", "hair loss prevention", "premium"],
    benefits: ["Prevents hair loss", "Strengthens follicles", "Rich in antioxidants", "Traditional remedy", "Promotes thickness"],
    inStock: true,
    featured: true,
    rating: 4.9,
    reviews: 156,
    sku: "OO-BS-004",
    detailedReviews: generateReviews(4, 7)
  },
  {
    id: 5,
    name: "Organic Hibiscus Amla Growth Oil",
    price: 1100,
    image: productImage,
    description: "Experience traditional Ayurvedic hair care with our hibiscus and amla growth oil. This powerful organic blend promotes rapid hair growth, prevents premature graying, and adds incredible volume and thickness. Perfect for thin, weak hair seeking natural growth acceleration.",
    shortDescription: "Traditional Ayurvedic blend for rapid hair growth and volume",
    ingredients: ["Organic Hibiscus Extract", "Pure Amla Oil", "Bhringraj Oil", "Fenugreek Oil"],
    category: "Growth Treatment",
    tags: ["organic", "ayurvedic", "hibiscus", "amla", "hair growth", "volume", "traditional"],
    benefits: ["Rapid hair growth", "Prevents graying", "Adds volume", "Strengthens hair", "Natural thickness"],
    inStock: true,
    featured: false,
    rating: 4.5,
    reviews: 89,
    sku: "OO-HA-005",
    detailedReviews: generateReviews(5, 5)
  }
];

export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};

export const getFeaturedProducts = () => {
  return products.filter(product => product.featured);
};
