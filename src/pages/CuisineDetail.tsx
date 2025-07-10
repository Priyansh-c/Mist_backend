import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  ChefHat, 
  Star, 
  Heart,
  Share2,
  Globe
} from 'lucide-react';
import Button from '../components/ui/Button';
import { cuisines, Cuisine } from '../data/cuisines';

interface CuisineDetailProps {
  cuisineId: string;
  onNavigate: (page: string) => void;
}

const CuisineDetail: React.FC<CuisineDetailProps> = ({ cuisineId, onNavigate }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  
  const cuisine = cuisines.find(c => c.id === cuisineId);
  
  if (!cuisine) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cuisine Not Found</h2>
          <Button onClick={() => onNavigate('cuisines')}>
            Back to Cuisines
          </Button>
        </div>
      </div>
    );
  }
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'European': return 'bg-blue-100 text-blue-800';
      case 'Asian': return 'bg-purple-100 text-purple-800';
      case 'Latin American': return 'bg-orange-100 text-orange-800';
      case 'African': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: cuisine.name,
        text: cuisine.description,
        url: window.location.href
      });
    } else {
      // Fallback to copy URL
      navigator.clipboard.writeText(window.location.href);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="outline"
            size="sm"
            icon={ArrowLeft}
            onClick={() => onNavigate('cuisines')}
            className="border-none"
          >
            Back to Cuisines
          </Button>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image */}
            <div className="relative">
              <img 
                src={cuisine.image}
                alt={cuisine.name}
                className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
              />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(cuisine.category)}`}>
                  {cuisine.category}
                </span>
              </div>
              <div className="absolute top-4 right-4 flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  icon={isFavorited ? Heart : Heart}
                  onClick={() => setIsFavorited(!isFavorited)}
                  className={`!p-2 bg-white bg-opacity-90 backdrop-blur-sm border-none ${
                    isFavorited ? 'text-red-500' : 'text-gray-600'
                  }`}
                />
                <Button
                  variant="outline"
                  size="sm"
                  icon={Share2}
                  onClick={handleShare}
                  className="!p-2 bg-white bg-opacity-90 backdrop-blur-sm border-none text-gray-600"
                />
              </div>
            </div>
            
            {/* Cuisine Details */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{cuisine.name}</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-3 text-amber-500" />
                  {cuisine.country}
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 mr-3 text-amber-500" />
                  {cuisine.cookingTime}
                </div>
                <div className="flex items-center">
                  <ChefHat className="h-5 w-5 mr-3 text-amber-500" />
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${getDifficultyColor(cuisine.difficulty)}`}>
                    {cuisine.difficulty}
                  </span>
                </div>
              </div>
              
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg">{cuisine.description}</p>
              </div>
            </div>
            
            {/* History */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Globe className="h-6 w-6 mr-2 text-amber-500" />
                History & Origins
              </h2>
              <p className="text-gray-700 leading-relaxed">{cuisine.history}</p>
            </div>
            
            {/* Popular Dishes */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Popular Dishes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {cuisine.popularDishes.map((dish, index) => (
                  <div key={index} className="flex items-center p-3 bg-amber-50 rounded-lg">
                    <Star className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-800 font-medium">{dish}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Key Ingredients</h3>
              
              <div className="space-y-3 mb-6">
                {cuisine.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center p-2 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">{ingredient}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h4 className="font-semibold text-gray-900 mb-3">Quick Facts</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Origin:</span>
                    <span className="font-medium">{cuisine.country}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium">{cuisine.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Difficulty:</span>
                    <span className="font-medium">{cuisine.difficulty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cooking Time:</span>
                    <span className="font-medium">{cuisine.cookingTime}</span>
                  </div>
                </div>
              </div>
              
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => onNavigate('cuisines')}
                className="mt-6"
              >
                Explore More Cuisines
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CuisineDetail;