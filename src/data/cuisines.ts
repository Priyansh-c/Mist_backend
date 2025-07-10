export interface Cuisine {
  id: string;
  name: string;
  country: string;
  description: string;
  image: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  cookingTime: string;
  ingredients: string[];
  featured: boolean;
  history: string;
  popularDishes: string[];
}

export const cuisines: Cuisine[] = [
  {
    id: '1',
    name: 'Italian Cuisine',
    country: 'Italy',
    description: 'Rich flavors with fresh ingredients, pasta, and Mediterranean influences',
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'European',
    difficulty: 'Medium',
    cookingTime: '30-60 minutes',
    ingredients: ['Tomatoes', 'Olive Oil', 'Garlic', 'Basil', 'Parmesan', 'Pasta'],
    featured: true,
    history: 'Italian cuisine has developed through centuries of social and political changes, with roots stretching back to the 4th century BC. It is characterized by its simplicity, with many dishes having only two to four main ingredients.',
    popularDishes: ['Spaghetti Carbonara', 'Margherita Pizza', 'Risotto', 'Lasagna', 'Tiramisu']
  },
  {
    id: '2',
    name: 'Japanese Cuisine',
    country: 'Japan',
    description: 'Delicate balance of flavors emphasizing fresh, seasonal ingredients',
    image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Asian',
    difficulty: 'Hard',
    cookingTime: '45-90 minutes',
    ingredients: ['Rice', 'Fish', 'Soy Sauce', 'Miso', 'Seaweed', 'Wasabi'],
    featured: true,
    history: 'Japanese cuisine is based on combining staple foods, typically Japanese rice or noodles, with a soup and okazu — dishes made from fish, vegetables, tofu and such — to add flavor to the staple food.',
    popularDishes: ['Sushi', 'Ramen', 'Tempura', 'Miso Soup', 'Yakitori']
  },
  {
    id: '3',
    name: 'Indian Cuisine',
    country: 'India',
    description: 'Complex spice blends and aromatic dishes with diverse regional variations',
    image: 'https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Asian',
    difficulty: 'Medium',
    cookingTime: '45-75 minutes',
    ingredients: ['Rice', 'Lentils', 'Turmeric', 'Cumin', 'Coriander', 'Garam Masala'],
    featured: false,
    history: 'Indian cuisine reflects an 8,000-year history of various groups and cultures interacting with the Indian subcontinent, leading to diversity of flavors and regional cuisines found in modern-day India.',
    popularDishes: ['Butter Chicken', 'Biryani', 'Dal', 'Naan', 'Samosas']
  },
  {
    id: '4',
    name: 'French Cuisine',
    country: 'France',
    description: 'Sophisticated cooking techniques with emphasis on quality ingredients',
    image: 'https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'European',
    difficulty: 'Hard',
    cookingTime: '60-120 minutes',
    ingredients: ['Butter', 'Cream', 'Wine', 'Herbs', 'Cheese', 'Bread'],
    featured: true,
    history: 'French cuisine developed throughout the centuries influenced by the many surrounding cultures of Spain, Italy, Switzerland, Germany and Belgium, in addition to its own food traditions on the long western coastlines of the Atlantic, the Channel and inland.',
    popularDishes: ['Coq au Vin', 'Bouillabaisse', 'Croissants', 'Ratatouille', 'Crème Brûlée']
  },
  {
    id: '5',
    name: 'Mexican Cuisine',
    country: 'Mexico',
    description: 'Vibrant flavors with corn, beans, and chili peppers as staple ingredients',
    image: 'https://images.pexels.com/photos/2087748/pexels-photo-2087748.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Latin American',
    difficulty: 'Easy',
    cookingTime: '30-45 minutes',
    ingredients: ['Corn', 'Beans', 'Chili Peppers', 'Tomatoes', 'Avocado', 'Lime'],
    featured: false,
    history: 'Mexican cuisine is a complex and ancient cuisine, with techniques and ingredients dating back thousands of years. It is created mostly with ingredients native to Mexico, as well as those brought over by the Spanish conquistadors.',
    popularDishes: ['Tacos', 'Guacamole', 'Enchiladas', 'Quesadillas', 'Churros']
  },
  {
    id: '6',
    name: 'Thai Cuisine',
    country: 'Thailand',
    description: 'Perfect balance of sweet, sour, salty, and spicy flavors',
    image: 'https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Asian',
    difficulty: 'Medium',
    cookingTime: '20-40 minutes',
    ingredients: ['Rice', 'Coconut Milk', 'Fish Sauce', 'Lime', 'Chili', 'Lemongrass'],
    featured: false,
    history: 'Thai cuisine is known for its balance of the five fundamental taste senses in each dish or the overall meal: sour, sweet, salty, bitter, and spicy. Although popularly considered as a single cuisine, Thai food is really better described as four regional cuisines.',
    popularDishes: ['Pad Thai', 'Tom Yum', 'Green Curry', 'Som Tam', 'Mango Sticky Rice']
  },
  {
    id: '7',
    name: 'Chinese Cuisine',
    country: 'China',
    description: 'Diverse regional styles with emphasis on harmony and balance',
    image: 'https://images.pexels.com/photos/2456435/pexels-photo-2456435.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Asian',
    difficulty: 'Medium',
    cookingTime: '30-60 minutes',
    ingredients: ['Rice', 'Soy Sauce', 'Ginger', 'Garlic', 'Scallions', 'Sesame Oil'],
    featured: true,
    history: 'Chinese cuisine originated from the various regions of China and has become widespread in many other parts of the world. The cuisine is highly diverse, with thousands of years of culinary history and geographical variety.',
    popularDishes: ['Kung Pao Chicken', 'Fried Rice', 'Dumplings', 'Sweet and Sour Pork', 'Peking Duck']
  },
  {
    id: '8',
    name: 'Greek Cuisine',
    country: 'Greece',
    description: 'Mediterranean flavors with olive oil, herbs, and fresh vegetables',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'European',
    difficulty: 'Easy',
    cookingTime: '30-45 minutes',
    ingredients: ['Olive Oil', 'Feta Cheese', 'Olives', 'Tomatoes', 'Oregano', 'Lemon'],
    featured: false,
    history: 'Greek cuisine is a Mediterranean cuisine. Contemporary Greek cookery makes wide use of vegetables, olive oil, grains, fish, wine, and meat. Other important ingredients include olives, cheese, aubergine, courgette, and yogurt.',
    popularDishes: ['Moussaka', 'Greek Salad', 'Souvlaki', 'Tzatziki', 'Baklava']
  }
];