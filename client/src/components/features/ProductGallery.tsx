import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Modal } from '../ui';

interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  images: string[];
  description: string;
  specifications: {
    dimensions?: string;
    material?: string;
    finish?: string;
    colors?: string[];
  };
  tags: string[];
  featured: boolean;
}

const ProductGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const products: Product[] = [
    {
      id: 1,
      name: 'Marble Elegance Series',
      category: 'Kitchen Countertops',
      image: '/api/placeholder/400/300',
      images: ['/api/placeholder/400/300', '/api/placeholder/400/300', '/api/placeholder/400/300'],
      description: 'Premium marble-look artificial stone perfect for kitchen countertops with superior durability and stain resistance.',
      specifications: {
        dimensions: '3000mm x 1400mm x 20mm',
        material: 'Quartz Composite',
        finish: 'Polished',
        colors: ['Carrara White', 'Calacatta Gold', 'Statuario']
      },
      tags: ['premium', 'kitchen', 'marble', 'durable'],
      featured: true
    },
    {
      id: 2,
      name: 'Industrial Concrete Look',
      category: 'Bathroom Vanities',
      image: '/api/placeholder/400/300',
      images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
      description: 'Modern concrete aesthetic with the benefits of engineered stone. Perfect for contemporary bathroom designs.',
      specifications: {
        dimensions: '2400mm x 600mm x 15mm',
        material: 'Engineered Stone',
        finish: 'Matte',
        colors: ['Charcoal Grey', 'Industrial White']
      },
      tags: ['modern', 'bathroom', 'concrete', 'contemporary'],
      featured: false
    },
    {
      id: 3,
      name: 'Granite Premium Collection',
      category: 'Wall Cladding',
      image: '/api/placeholder/400/300',
      images: ['/api/placeholder/400/300', '/api/placeholder/400/300', '/api/placeholder/400/300', '/api/placeholder/400/300'],
      description: 'Authentic granite appearance with consistent patterns. Ideal for interior and exterior wall applications.',
      specifications: {
        dimensions: '1200mm x 800mm x 10mm',
        material: 'Porcelain Composite',
        finish: 'Textured',
        colors: ['Black Galaxy', 'Kashmir Gold', 'Absolute Black']
      },
      tags: ['granite', 'wall', 'exterior', 'textured'],
      featured: true
    },
    {
      id: 4,
      name: 'Travertine Natural',
      category: 'Flooring',
      image: '/api/placeholder/400/300',
      images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
      description: 'Classic travertine look with modern performance. Perfect for high-traffic flooring applications.',
      specifications: {
        dimensions: '600mm x 400mm x 12mm',
        material: 'Ceramic Stone',
        finish: 'Honed',
        colors: ['Ivory Cream', 'Walnut Brown']
      },
      tags: ['travertine', 'flooring', 'natural', 'classic'],
      featured: false
    },
    {
      id: 5,
      name: 'Onyx Luxury Line',
      category: 'Feature Walls',
      image: '/api/placeholder/400/300',
      images: ['/api/placeholder/400/300', '/api/placeholder/400/300', '/api/placeholder/400/300'],
      description: 'Stunning onyx patterns with backlight capabilities. Create dramatic feature walls and accent pieces.',
      specifications: {
        dimensions: '3200mm x 1600mm x 6mm',
        material: 'Translucent Composite',
        finish: 'Polished',
        colors: ['Honey Onyx', 'Green Onyx', 'White Onyx']
      },
      tags: ['onyx', 'luxury', 'backlit', 'feature'],
      featured: true
    },
    {
      id: 6,
      name: 'Sandstone Rustic',
      category: 'Outdoor Paving',
      image: '/api/placeholder/400/300',
      images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
      description: 'Weather-resistant sandstone effect for outdoor applications. Non-slip surface for safety.',
      specifications: {
        dimensions: '400mm x 400mm x 20mm',
        material: 'Weather Composite',
        finish: 'Anti-slip',
        colors: ['Desert Sand', 'River Rock', 'Sunset Red']
      },
      tags: ['sandstone', 'outdoor', 'paving', 'weather-resistant'],
      featured: false
    }
  ];

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProduct.images.length);
    }
  };

  const prevImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedProduct.images.length) % selectedProduct.images.length);
    }
  };

  return (
    <section id="products" className="py-16 lg:py-24 bg-gray-50">
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
            Our Product Gallery
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our extensive collection of premium artificial stone products designed for every application
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Search Bar */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-8">
            <div className="relative w-full lg:w-96">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200"
              />
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Showing {filteredProducts.length} of {products.length} products</span>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-primary/10 hover:text-primary'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Product Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${searchTerm}`}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  hover
                  className="group cursor-pointer h-full"
                  onClick={() => openProductModal(product)}
                >
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    {product.featured && (
                      <div className="absolute top-3 left-3 z-10 bg-accent text-white px-2 py-1 rounded-full text-xs font-medium">
                        Featured
                      </div>
                    )}
                    
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white font-medium">View Details</span>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-sm text-accent font-medium">{product.category}</span>
                    <h3 className="text-lg font-semibold text-primary mt-1 mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">{product.description}</p>
                    
                    <div className="flex flex-wrap gap-1">
                      {product.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProducts.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 20.4a7.962 7.962 0 01-5.657-2.109L5 17l1.293-1.293A7.962 7.962 0 014.6 12 7.962 7.962 0 016.343 6.343M17.657 6.343A7.962 7.962 0 0119.4 12c0 1.21-.27 2.364-.757 3.391L20 17l-1.343 1.291z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <Modal
          isOpen={!!selectedProduct}
          onClose={closeProductModal}
          title={selectedProduct.name}
          size="xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div>
              <div className="relative mb-4">
                <img
                  src={selectedProduct.images[currentImageIndex]}
                  alt={selectedProduct.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
                
                {selectedProduct.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-black/20 text-white rounded-full hover:bg-black/40 transition-colors duration-200"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-black/20 text-white rounded-full hover:bg-black/40 transition-colors duration-200"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
              
              {selectedProduct.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {selectedProduct.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors duration-200 ${
                        currentImageIndex === index ? 'border-primary' : 'border-gray-200'
                      }`}
                    >
                      <img src={image} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div>
              <span className="text-accent font-medium text-sm">{selectedProduct.category}</span>
              <h2 className="text-2xl font-bold text-primary mt-2 mb-4">{selectedProduct.name}</h2>
              
              <p className="text-gray-600 mb-6">{selectedProduct.description}</p>
              
              {/* Specifications */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-primary mb-3">Specifications</h3>
                <div className="space-y-2">
                  {selectedProduct.specifications.dimensions && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Dimensions:</span>
                      <span className="font-medium">{selectedProduct.specifications.dimensions}</span>
                    </div>
                  )}
                  {selectedProduct.specifications.material && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Material:</span>
                      <span className="font-medium">{selectedProduct.specifications.material}</span>
                    </div>
                  )}
                  {selectedProduct.specifications.finish && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Finish:</span>
                      <span className="font-medium">{selectedProduct.specifications.finish}</span>
                    </div>
                  )}
                  {selectedProduct.specifications.colors && (
                    <div>
                      <span className="text-gray-600">Available Colors:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedProduct.specifications.colors.map((color) => (
                          <span key={color} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Tags */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-primary mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    closeProductModal();
                    setTimeout(() => {
                      const element = document.querySelector('#contact');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }, 100);
                  }}
                  className="flex-1 bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
                >
                  Request Quote
                </button>
                <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200">
                  Download Specs
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default ProductGallery;