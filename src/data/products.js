// Import images from assets folder
import image1 from '../assets/1.jpeg';
import image2 from '../assets/2.jpeg';
import image3 from '../assets/3.jpeg';
import image4 from '../assets/4.jpeg';
import image5 from '../assets/5.jpeg';

export const products = [
  {
    id: 1,
    name: "Coconut Argan Hair Oil",
    price: 1200,
    image: image1,
    description: "A luxurious blend of organic coconut and argan oils that deeply nourishes and strengthens hair. Rich in vitamins E and essential fatty acids, this oil promotes healthy hair growth while adding natural shine and softness.",
    ingredients: ["Organic Coconut Oil", "Argan Oil", "Vitamin E", "Jojoba Oil"],
    category: "Hair Treatment",
    inStock: true,
    featured: true
  },
  {
    id: 2,
    name: "Rosemary Mint Scalp Oil",
    price: 950,
    image: image2,
    description: "Stimulating scalp treatment with organic rosemary and refreshing mint oils. Perfect for improving circulation and promoting healthy hair growth while providing a cooling, invigorating sensation.",
    ingredients: ["Rosemary Essential Oil", "Peppermint Oil", "Sweet Almond Oil", "Tea Tree Oil"],
    category: "Scalp Treatment",
    inStock: true,
    featured: true
  },
  {
    id: 3,
    name: "Lavender Chamomile Hair Serum",
    price: 850,
    image: image3,
    description: "Calming and soothing hair serum infused with organic lavender and chamomile. Ideal for sensitive scalps and provides deep moisturization while promoting relaxation and stress relief.",
    ingredients: ["Lavender Essential Oil", "Chamomile Extract", "Grapeseed Oil", "Rosehip Oil"],
    category: "Hair Serum",
    inStock: true,
    featured: false
  },
  {
    id: 4,
    name: "Moroccan Black Seed Oil",
    price: 1400,
    image: image4,
    description: "Premium Moroccan black seed oil known for its powerful healing properties. Rich in antioxidants and essential nutrients that strengthen hair follicles and prevent hair loss naturally.",
    ingredients: ["Black Seed Oil", "Moroccan Argan Oil", "Castor Oil", "Vitamin E"],
    category: "Premium Treatment",
    inStock: true,
    featured: true
  },
  {
    id: 5,
    name: "Hibiscus Amla Growth Oil",
    price: 1100,
    image: image5,
    description: "Traditional Ayurvedic blend featuring hibiscus and amla extracts. This powerful combination promotes rapid hair growth, prevents premature graying, and adds incredible volume and thickness.",
    ingredients: ["Hibiscus Extract", "Amla Oil", "Bhringraj Oil", "Fenugreek Oil"],
    category: "Growth Treatment",
    inStock: true,
    featured: false
  }
];

export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};

export const getFeaturedProducts = () => {
  return products.filter(product => product.featured);
};
