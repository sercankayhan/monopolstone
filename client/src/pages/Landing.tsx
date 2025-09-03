import React from 'react';
import { useTranslation } from 'react-i18next';
import { Header, Footer } from '../components/layout';
import { HeroSection, ProductGallery, ContactForm } from '../components/features';
import AboutSection from '../components/features/AboutSection';
import ServicesSection from '../components/features/ServicesSection';
import { WhatsAppButton } from '../components/ui';

const Landing: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-white">
      <Header transparent />
      
      <main>
        <section id="hero">
          <HeroSection />
        </section>
        <section id="about">
          <AboutSection />
        </section>
        <section id="products">
          <ProductGallery />
        </section>
        <section id="services">
          <ServicesSection />
        </section>
        <section id="contact">
          <ContactForm />
        </section>
      </main>
      
      <Footer />
      
      {/* WhatsApp Button */}
      <WhatsAppButton 
        phoneNumber="+905314720269"
        message={t('contact.whatsapp.message')}
      />
    </div>
  );
};

export default Landing;