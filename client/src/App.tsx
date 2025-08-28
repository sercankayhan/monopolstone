import React from 'react';
import { Header, Footer } from './components/layout';
import { HeroSection, ProductGallery, ContactForm } from './components/features';
import AboutSection from './components/features/AboutSection';
import ServicesSection from './components/features/ServicesSection';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header transparent />
      
      <main>
        <HeroSection />
        <AboutSection />
        <ProductGallery />
        <ServicesSection />
        <ContactForm />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
