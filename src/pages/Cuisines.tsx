import React, { useState, useMemo } from 'react';
import { Search, Filter, MapPin, Clock } from 'lucide-react';
import CuisineCard from '../components/CuisineCard';
import InputField from '../components/ui/InputField';
import Button from '../components/ui/Button';
import { cuisines, Cuisine } from '../data/cuisines';

interface CuisinesProps {
  onNavigate: (page: string, cuisineId?: string) => void;
}

const Cuisines: React.FC<CuisinesProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [isLoading, setIsLoading] = useState(false);
  
  const categories = ['All', 'European', 'Asian', 'Latin American', 'African'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];
  
  const filteredAndSortedCuisines = useMemo(() => {
    let filtered = cuisines.filter(cuisine => {
      const matchesSearch = cuisine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           cuisine.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           cuisine.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || cuisine.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'All' || cuisine.difficulty === selectedDifficulty;
      
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
    
    // Sort cuisines
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'country':
          return a.country.localeCompare(b.country);
        case 'difficulty':
          const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        default:
          return 0;
      }
    });
    
    return filtered;
  }, [searchTerm, selectedCategory, selectedDifficulty, sortBy]);
  
  const handleViewDetails = (cuisine: Cuisine) => {
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      onNavigate('cuisine-detail', cuisine.id);
    }, 500);
  };
  
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedDifficulty('All');
    setSortBy('name');
  };
  
  const hasActiveFilters = searchTerm || selectedCategory !== 'All' || selectedDifficulty !== 'All' || sortBy !== 'name';
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              World Cuisines
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore the diverse culinary traditions from around the globe. 
              Discover authentic flavors, traditional ingredients, and rich cultural histories.
            </p>
          </div>
        </div>
      </section>
      
      {/* Filters */}
      <section className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <InputField
              placeholder="Search cuisines or countries..."
              value={searchTerm}
              onChange={setSearchTerm}
              icon={Search}
            />
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>
                  {difficulty === 'All' ? 'All Difficulties' : difficulty}
                </option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="name">Sort by Name</option>
              <option value="country">Sort by Country</option>
              <option value="difficulty">Sort by Difficulty</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {filteredAndSortedCuisines.length} cuisines found
            </div>
            
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </section>
      
      {/* Cuisines Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
            </div>
          ) : filteredAndSortedCuisines.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAndSortedCuisines.map((cuisine) => (
                <CuisineCard
                  key={cuisine.id}
                  cuisine={cuisine}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="mb-6">
                <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No cuisines found</h3>
                <p className="text-gray-600">
                  Try adjusting your search criteria or browse all available cuisines.
                </p>
              </div>
              <Button
                variant="primary"
                onClick={clearFilters}
              >
                Show All Cuisines
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Cuisines;