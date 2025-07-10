import React from 'react';
import { ArrowRight, Globe, Users, Award, Clock } from 'lucide-react';
import Button from '../components/ui/Button';
import { cuisines } from '../data/cuisines';

interface HomeProps {
  onNavigate: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const featuredCuisines = cuisines.filter(cuisine => cuisine.featured);
  
  const stats = [
    { icon: Globe, label: 'Countries', value: '25+' },
    { icon: Users, label: 'Cuisines Featured', value: '50+' },
    { icon: Award, label: 'Traditional Recipes', value: '200+' },
    { icon: Clock, label: 'Years of History', value: '1000+' }
  ];
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-50 via-white to-emerald-50 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-5"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Discover
                  <span className="text-amber-500"> World Cuisines </span>
                  & Their Stories
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl">
                  Explore the rich culinary traditions from around the globe. Learn about authentic flavors, 
                  traditional ingredients, and the fascinating history behind each cuisine.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  icon={ArrowRight}
                  iconPosition="right"
                  onClick={() => onNavigate('cuisines')}
                >
                  Explore Cuisines
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => onNavigate('contact')}
                >
                  Learn More
                </Button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <stat.icon className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10">
                <img 
                  src="https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="World cuisines"
                  className="rounded-2xl shadow-2xl w-full max-w-lg mx-auto"
                />
              </div>
              
              {/* Floating cards */}
              <div className="absolute -top-4 -left-4 bg-white rounded-lg shadow-lg p-4 z-20 hidden lg:block">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <Globe className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Italian Cuisine</div>
                    <div className="text-xs text-gray-500">Rich Mediterranean flavors</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-4 z-20 hidden lg:block">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Award className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Traditional Recipes</div>
                    <div className="text-xs text-gray-500">Authentic & time-tested</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Cuisines */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Cuisines
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the most beloved culinary traditions from around the world
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredCuisines.map((cuisine) => (
              <div key={cuisine.id} className="group cursor-pointer" onClick={() => onNavigate('cuisines')}>
                <div className="relative overflow-hidden rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <img 
                    src={cuisine.image}
                    alt={cuisine.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{cuisine.name}</h3>
                    <p className="text-sm opacity-90 mb-3">{cuisine.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                        {cuisine.country}
                      </span>
                      <span className="text-sm font-medium">{cuisine.cookingTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button
              variant="primary"
              size="lg"
              onClick={() => onNavigate('cuisines')}
            >
              View All Cuisines
            </Button>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                A Journey Through Global Flavors
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Food is more than sustenance—it's culture, history, and tradition served on a plate. 
                Our collection showcases the diverse culinary heritage from every corner of the world.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                From the spicy curries of India to the delicate sushi of Japan, each cuisine tells 
                a unique story of its people, climate, and cultural influences.
              </p>
              <Button
                variant="primary"
                size="lg"
                onClick={() => onNavigate('cuisines')}
              >
                Start Exploring
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Greek cuisine"
                className="rounded-lg shadow-md"
              />
              <img 
                src="https://images.pexels.com/photos/2456435/pexels-photo-2456435.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Chinese cuisine"
                className="rounded-lg shadow-md mt-8"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-500 to-emerald-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Explore World Cuisines?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover the stories, ingredients, and traditions behind the world's most beloved dishes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => onNavigate('cuisines')}
              className="text-white hover:bg-white hover:text-amber-600"
            >
              Browse Cuisines
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => onNavigate('contact')}
              className="border-white text-white hover:bg-white hover:text-amber-600"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;