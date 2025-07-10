import React from 'react';
import { Globe, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Globe className="h-8 w-8 text-amber-500 mr-2" />
              <span className="text-xl font-bold">World Cuisines</span>
            </div>
            <p className="text-gray-300 text-sm">
              Discover the rich culinary traditions from around the globe. 
              Explore authentic flavors, ingredients, and the fascinating stories behind each cuisine.
            </p>
            <div className="flex space-x-3">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-amber-500 cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-amber-500 cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-amber-500 cursor-pointer transition-colors" />
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-amber-500 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Our Mission</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Cultural Heritage</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Food History</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Contributors</a></li>
            </ul>
          </div>
          
          {/* Cuisine Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Popular Cuisines</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-amber-500 transition-colors">Italian</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Japanese</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">French</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Indian</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Mexican</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-3 text-amber-500" />
                <span>+91 9999999999</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-3 text-amber-500" />
                <span>hello@worldcuisines.com</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-3 text-amber-500 mt-0.5" />
                <span>Whitefield<br />Bangalore, KA 560067</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © {currentYear} World Cuisines. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-400 hover:text-amber-500 transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-400 hover:text-amber-500 transition-colors">Terms of Service</a>
              <a href="#" className="text-sm text-gray-400 hover:text-amber-500 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;