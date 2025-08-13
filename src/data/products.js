// Import images from assets folder
import image1 from '../assets/1.jpeg';
import image2 from '../assets/2.jpeg';
import image3 from '../assets/3.jpeg';
import image4 from '../assets/4.jpeg';
import image5 from '../assets/5.jpeg';

export const products = [
  {
    id: 1,
    name: "Premium Organic Coconut Argan Hair Oil",
    price: 1200,
    image: image1,
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
    sku: "OO-CO-001"
  },
  {
    id: 2,
    name: "Organic Rosemary Mint Scalp Treatment Oil",
    price: 950,
    image: image2,
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
    sku: "OO-RM-002"
  },
  {
    id: 3,
    name: "Organic Lavender Chamomile Hair Serum",
    price: 850,
    image: image3,
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
    sku: "OO-LC-003"
  },
  {
    id: 4,
    name: "Premium Moroccan Black Seed Hair Oil",
    price: 1400,
    image: image4,
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
    sku: "OO-BS-004"
  },
  {
    id: 5,
    name: "Organic Hibiscus Amla Growth Oil",
    price: 1100,
    image: image5,
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
    sku: "OO-HA-005"
  }
];

export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};

export const getFeaturedProducts = () => {
  return products.filter(product => product.featured);
};
