import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Cuisines from './pages/Cuisines';
import CuisineDetail from './pages/CuisineDetail';
import Contact from './pages/Contact';
import Reviews from './pages/Reviews';

type Page = 'home' | 'cuisines' | 'cuisine-detail' | 'contact' | 'reviews';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedCuisineId, setSelectedCuisineId] = useState<string>('');
  
  const handleNavigation = (page: string, cuisineId?: string) => {
    setCurrentPage(page as Page);
    if (cuisineId) {
      setSelectedCuisineId(cuisineId);
    }
    
    // Scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigation} />;
      case 'cuisines':
        return <Cuisines onNavigate={handleNavigation} />;
      case 'cuisine-detail':
        return <CuisineDetail cuisineId={selectedCuisineId} onNavigate={handleNavigation} />;
      case 'contact':
        return <Contact />;
      case 'reviews':
        return <Reviews onNavigate={handleNavigation} />;
      default:
        return <Home onNavigate={handleNavigation} />;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar currentPage={currentPage} onNavigate={handleNavigation} />
      
      <main className="flex-grow">
        {renderCurrentPage()}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;