import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Card, Button } from '../ui';

interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  image: string;
  process: {
    title: string;
    steps: string[];
  };
}

const ServicesSection: React.FC = () => {
  const { t } = useTranslation();
  const [activeService, setActiveService] = useState('design');

  const services: Service[] = [
    {
      id: 'design',
      title: t('services.design.title'),
      description: t('services.design.description'),
      features: t('services.design.features', { returnObjects: true }) as string[],
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15.586 13H14a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      ),
      image: '/tasarimplanlama.jpeg',
      process: {
        title: t('services.design.processTitle'),
        steps: t('services.design.processSteps', { returnObjects: true }) as string[]
      }
    },
    {
      id: 'installation',
      title: t('services.installation.title'),
      description: t('services.installation.description'),
      features: t('services.installation.features', { returnObjects: true }) as string[],
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>
      ),
      image: '/profesyonelkurulum.jpg',
      process: {
        title: t('services.installation.processTitle'),
        steps: t('services.installation.processSteps', { returnObjects: true }) as string[]
      }
    },
    {
      id: 'maintenance',
      title: t('services.maintenance.title'),
      description: t('services.maintenance.description'),
      features: t('services.maintenance.features', { returnObjects: true }) as string[],
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
      image: '/bakımkoruma.jpg',
      process: {
        title: t('services.maintenance.processTitle'),
        steps: t('services.maintenance.processSteps', { returnObjects: true }) as string[]
      }
    },
    {
      id: 'consultation',
      title: t('services.consultation.title'),
      description: t('services.consultation.description'),
      features: t('services.consultation.features', { returnObjects: true }) as string[],
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      ),
      image: '/uzmandanismanlik.jpg',
      process: {
        title: t('services.consultation.processTitle'),
        steps: t('services.consultation.processSteps', { returnObjects: true }) as string[]
      }
    }
  ];

  const currentService = services.find(service => service.id === activeService) || services[0];

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-heading">
            {t('services.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Service Navigation */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-2">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setActiveService(service.id)}
                  className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                    activeService === service.id
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-primary/5 hover:text-primary'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`flex-shrink-0 ${activeService === service.id ? 'text-accent' : 'text-gray-400'}`}>
                      {service.icon}
                    </div>
                    <div>
                      <div className="font-medium">{service.title}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <Card className="mt-6 p-6">
              <h3 className="font-semibold text-primary mb-3">{t('services.needHelp')}</h3>
              <p className="text-gray-600 text-sm mb-4">
                {t('services.needHelpText')}
              </p>
              <Button
                variant="outline"
                size="sm"
                fullWidth
                onClick={scrollToContact}
              >
                {t('services.getConsultation')}
              </Button>
            </Card>
          </motion.div>

          {/* Service Details */}
          <div className="lg:col-span-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="mb-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Service Info */}
                    <div className="p-6 lg:p-8">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent">
                          {currentService.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-primary font-heading">
                          {currentService.title}
                        </h3>
                      </div>

                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {currentService.description}
                      </p>

                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-primary mb-4">
                          {t('services.whatIncluded')}
                        </h4>
                        <ul className="space-y-2">
                          {currentService.features.map((feature, index) => (
                            <li key={index} className="flex items-start space-x-3">
                              <div className="w-5 h-5 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <svg className="w-3 h-3 text-success" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <span className="text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                          variant="primary"
                          onClick={scrollToContact}
                          rightIcon={
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          }
                        >
                          {t('services.getQuote')}
                        </Button>
                        <Button variant="outline">
                          {t('services.learnMore')}
                        </Button>
                      </div>
                    </div>

                    {/* Service Image */}
                    <div className="p-6 lg:p-8">
                      <div className="relative">
                        <img
                          src={currentService.image}
                          alt={currentService.title}
                          className="w-full h-64 lg:h-80 object-cover rounded-lg shadow-md"
                        />
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Process Steps */}
                <Card className="p-6 lg:p-8">
                  <h4 className="text-xl font-semibold text-primary mb-6 font-heading">
                    {currentService.process.title}
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    {currentService.process.steps.map((step, index) => (
                      <motion.div
                        key={index}
                        className="relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <div className="flex flex-col items-center text-center">
                          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold mb-3 relative z-10">
                            {index + 1}
                          </div>
                          
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {step}
                          </p>
                        </div>

                        {/* Connector Line */}
                        {index < currentService.process.steps.length - 1 && (
                          <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-gray-200 -translate-x-6 z-0" />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>



        {/* CTA Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="p-8 lg:p-12 bg-gradient-to-r from-primary to-primary/90 text-white">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4 font-heading">
              {t('services.readyToStart')}
            </h3>
            <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
              {t('services.readyText')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                variant="secondary"
                size="lg"
                onClick={scrollToContact}
                rightIcon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                }
              >
                {t('services.getFreeConsultation')}
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="text-white border-white hover:bg-white/10"
                onClick={() => window.open('tel:+905314720269', '_self')}
                leftIcon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                }
              >
                {t('services.callNow')}
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;