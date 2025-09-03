import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { WhatsAppButton } from '../ui';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  const companyInfo = {
    name: 'Monopol Stone',
    description: t('footer.description', { defaultValue: 'Premium engineered stone solutions for modern architecture and interior design.' }),
    address: t('contact.info.address'),
    phone: t('contact.info.phone'),
    email: t('contact.info.email'),
  };

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: 'M18.77 7.46H15.5v-1.9c0-.9.6-1.1 1-1.1h2.2v-3.4H15.5C13.54 1.06 12 2.6 12 4.56v2.9H9.5v3.4H12V22h3.5v-10.64h2.6l.67-3.4z' },
    { name: 'Instagram', href: '#', icon: 'M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9a3.7 3.7 0 01-.9-1.38c-.16-.43-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07zm0-2.16C8.74 0 8.33.01 7.05.07c-1.28.06-2.15.26-2.91.56-.79.31-1.46.72-2.13 1.39S.93 3.23.62 4.02c-.3.76-.5 1.63-.56 2.91C.01 8.21 0 8.62 0 12s.01 3.79.07 5.07c.06 1.28.26 2.15.56 2.91.31.79.72 1.46 1.39 2.13.67.67 1.34 1.08 2.13 1.39.76.3 1.63.5 2.91.56C8.21 23.99 8.62 24 12 24s3.79-.01 5.07-.07c1.28-.06 2.15-.26 2.91-.56.79-.31 1.46-.72 2.13-1.39.67-.67 1.08-1.34 1.39-2.13.3-.76.5-1.63.56-2.91.06-1.28.07-1.69.07-5.07s-.01-3.79-.07-5.07c-.06-1.28-.26-2.15-.56-2.91-.31-.79-.72-1.46-1.39-2.13C19.44.93 18.77.52 17.98.22c-.76-.3-1.63-.5-2.91-.56C15.79.01 15.38 0 12 0zm0 5.84A6.16 6.16 0 1018.16 12 6.16 6.16 0 0012 5.84zm0 10.16A4 4 0 1116 12a4 4 0 01-4 4zm7.85-10.4a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z' },
    { name: 'LinkedIn', href: '#', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' }
  ];

  const quickLinks = [
    { name: t('nav.home'), href: '#hero' },
    { name: t('nav.products'), href: '#products' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.services'), href: '#services' },
    { name: t('nav.contact'), href: '#contact' }
  ];

  const services = [
    { name: t('footer.servicesList.design'), href: '#' },
    { name: t('footer.servicesList.installation'), href: '#' },
    { name: t('footer.servicesList.maintenance'), href: '#' },
    { name: t('footer.servicesList.consultation'), href: '#' }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden">
                  <img src="/logo.jpeg" alt="Monopol Stone" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold font-heading">{companyInfo.name}</h2>
                  <p className="text-accent text-sm">Premium Quality</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 max-w-md">
                {companyInfo.description}
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300 text-sm">{companyInfo.address}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <a 
                    href="tel:+905314720269" 
                    className="text-gray-300 text-sm hover:text-accent transition-colors duration-200 cursor-pointer"
                  >
                    {companyInfo.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span className="text-gray-300 text-sm">{companyInfo.email}</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4 mt-8">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white hover:bg-accent transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold font-heading mb-6">{t('footer.quickLinks', { defaultValue: 'Quick Links' })}</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-gray-300 hover:text-accent transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold font-heading mb-6">{t('footer.services', { defaultValue: 'Services' })}</h3>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.name}>
                    <a
                      href={service.href}
                      className="text-gray-300 hover:text-accent transition-colors duration-200 text-sm"
                    >
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          className="border-t border-white/20 py-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
            </p>
            
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-accent transition-colors duration-200 text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-accent transition-colors duration-200 text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-accent transition-colors duration-200 text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* WhatsApp Button */}
      <WhatsAppButton 
        phoneNumber="+905314720269"
        message={t('contact.whatsapp.message')}
      />
    </footer>
  );
};

export default Footer;