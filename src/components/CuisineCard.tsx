import React from 'react';
import { MapPin, Clock, ChefHat } from 'lucide-react';
import { Cuisine } from '../data/cuisines';
import Button from './ui/Button';

interface CuisineCardProps {
  cuisine: Cuisine;
  onViewDetails: (cuisine: Cuisine) => void;
}

const CuisineCard: React.FC<CuisineCardProps> = ({ cuisine, onViewDetails }) => {
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
      case 'Easy': return 'text-green-600';
      case 'Medium': return 'text-yellow-600';
      case 'Hard': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative">
        <img 
          src={cuisine.image} 
          alt={cuisine.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(cuisine.category)}`}>
            {cuisine.category}
          </span>
        </div>
        <div className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg px-3 py-2">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 text-gray-600 mr-1" />
            <span className="text-sm font-medium text-gray-800">{cuisine.country}</span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {cuisine.name}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-2">
          {cuisine.description}
        </p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-2" />
            Cooking Time: {cuisine.cookingTime}
          </div>
          
          <div className="flex items-center text-sm">
            <ChefHat className="w-4 h-4 mr-2 text-gray-500" />
            <span className="text-gray-500">Difficulty: </span>
            <span className={`font-medium ml-1 ${getDifficultyColor(cuisine.difficulty)}`}>
              {cuisine.difficulty}
            </span>
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Key Ingredients:</h4>
          <div className="flex flex-wrap gap-1">
            {cuisine.ingredients.slice(0, 4).map((ingredient, index) => (
              <span 
                key={index}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
              >
                {ingredient}
              </span>
            ))}
            {cuisine.ingredients.length > 4 && (
              <span className="text-xs text-gray-500">+{cuisine.ingredients.length - 4} more</span>
            )}
          </div>
        </div>
        
        <Button
          onClick={() => onViewDetails(cuisine)}
          variant="primary"
          fullWidth
          className="mt-4"
        >
          Learn More
        </Button>
      </div>
    </div>
  );
};

export default CuisineCard;