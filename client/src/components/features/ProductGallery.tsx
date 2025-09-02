import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Modal } from '../ui';
import { getProductImage } from '../../utils/mockImages';

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
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const products: Product[] = [
    {
      id: 1,
      name: 'Mitra',
      category: 'Kültür Taşı',
      image: '/mitra-gölge.jpg',
      images: ['/mitra-gölge.jpg', '/mitra-sis.jpg', '/mitra-toprak.jpg'],
      description: 'Zengin doku ve doğal görünüm sunan kültür taşı koleksiyonu.',
      specifications: {
        dimensions: 'Değişken',
        material: 'Kompozit Taş',
        finish: 'Doğal Doku',
        colors: ['Gölge', 'Sis', 'Toprak']
      },
      tags: ['kultur-tasi', 'dekoratif', 'duvar'],
      featured: true
    },
    {
      id: 2,
      name: 'Luminar',
      category: 'Kültür Taşı',
      image: '/luminar-sis.jpg',
      images: ['/luminar-gölge.jpg', '/luminar-sis.jpg', '/luminar-toprak.jpg'],
      description: 'Modern çizgilere sahip, iç ve dış mekânlarda uyumlu kültür taşı.',
      specifications: {
        dimensions: 'Değişken',
        material: 'Kompozit Taş',
        finish: 'Mat',
        colors: ['Gölge', 'Sis', 'Toprak']
      },
      tags: ['kultur-tasi', 'modern', 'dis-cephe'],
      featured: true
    },
    {
      id: 3,
      name: 'Belezza',
      category: 'Kültür Taşı',
      image: '/belezza-yıldız.jpg',
      images: ['/belezza-günbatımı.jpg', '/belezza-yıldız.jpg'],
      description: 'Zarif dokusuyla mekanlara sofistike bir hava katar.',
      specifications: {
        dimensions: 'Değişken',
        material: 'Kompozit Taş',
        finish: 'Yarı Mat',
        colors: ['Günbatımı', 'Yıldız']
      },
      tags: ['kultur-tasi', 'zarif', 'ic-mekan'],
      featured: false
    },
    {
      id: 4,
      name: 'Arvion',
      category: 'Kültür Taşı',
      image: '/arvion-toprak.jpg',
      images: ['/arvion-gölge.jpg', '/arvion-sis.jpg', '/arvion-toprak.jpg'],
      description: 'Güçlü karaktere sahip doğal taş hissi.',
      specifications: {
        dimensions: 'Değişken',
        material: 'Kompozit Taş',
        finish: 'Doğal Kırık',
        colors: ['Gölge', 'Sis', 'Toprak']
      },
      tags: ['kultur-tasi', 'rustik', 'duvar-kaplama'],
      featured: false
    },
    {
      id: 5,
      name: 'Tivoli',
      category: 'Kültür Taşı',
      image: '/tivoli-antrasit.jpg',
      images: ['/tivoli-gölge.jpg', '/tivoli-sis.jpg', '/tivoli-toprak.jpg', '/tivoli-antrasit.jpg'],
      description: 'Zamanı aşan çizgilerle modern ve doğal bir görünüm.',
      specifications: {
        dimensions: 'Değişken',
        material: 'Kompozit Taş',
        finish: 'Doğal Doku',
        colors: ['Gölge', 'Sis', 'Toprak', 'Antrasit']
      },
      tags: ['kultur-tasi', 'modern', 'mimari'],
      featured: true
    },
    {
      id: 6,
      name: 'Leon',
      category: 'Kültür Tuğlası',
      image: '/leon-inci.jpg',
      images: [
        '/leon-inci.jpg',
        '/leon-çakıl.jpg',
        '/leon-çöl 1.jpg',
        '/leon-köz.jpg',
        '/leon-lav.jpg',
        '/leon-mix.jpg'
      ],
      description: 'Doğal tuğla dokusunu yansıtan, sıcak ve samimi görünüm.',
      specifications: {
        dimensions: 'Değişken',
        material: 'Kompozit Tuğla',
        finish: 'Mat',
        colors: ['İnci', 'Çakıl', 'Çöl', 'Köz', 'Lav', 'Mix']
      },
      tags: ['kultur-tuglasi', 'rustik', 'ic-dis-mekan'],
      featured: false
    },
    {
      id: 7,
      name: 'Leila',
      category: 'Kültür Tuğlası',
      image: '/leila-lav.jpg',
      images: [
        '/leila-inci.jpg',
        '/leila-çakıl.jpg',
        '/leila-çol 1.jpg',
        '/leila-köz.jpg',
        '/leila-lav.jpg',
        '/leila-mix.jpg'
      ],
      description: 'Zarif tuğla dokusuyla modern ve klasik çizgileri buluşturur.',
      specifications: {
        dimensions: 'Değişken',
        material: 'Kompozit Tuğla',
        finish: 'Yarı Mat',
        colors: ['İnci', 'Çakıl', 'Çöl', 'Köz', 'Lav', 'Mix']
      },
      tags: ['kultur-tuglasi', 'zarif', 'dekoratif'],
      featured: false
    },
    {
      id: 8,
      name: 'Lora',
      category: 'Kültür Tuğlası',
      image: '/lora-köz.jpg',
      images: [
        '/lora-inci.jpg',
        '/lora-çakıl.jpg',
        '/lora-çöl 1.jpg',
        '/lora-köz.jpg',
        '/lora-lav.jpg',
        '/lora-mix.jpg'
      ],
      description: 'Minimal hatlarla doğal tuğla görünümü.',
      specifications: {
        dimensions: 'Değişken',
        material: 'Kompozit Tuğla',
        finish: 'Mat',
        colors: ['İnci', 'Çakıl', 'Çöl', 'Köz', 'Lav', 'Mix']
      },
      tags: ['kultur-tuglasi', 'minimal', 'duvar-kaplama'],
      featured: false
    }
  ];

  // Debug: Log products array
  console.log('Products array loaded:', products.length, 'products');

  const categories = ['All', 'Kültür Taşı', 'Kültür Tuğlası'];

  const filteredProducts = useMemo(() => {
    console.log('Filtering products:', { selectedCategory, searchTerm, totalProducts: products.length });
    
    const filtered = products.filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = searchTerm === '' || 
                           product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      console.log(`Product ${product.name}: category=${product.category}, matchesCategory=${matchesCategory}, matchesSearch=${matchesSearch}`);
      
      return matchesCategory && matchesSearch;
    });
    
    console.log('Filtered products count:', filtered.length);
    return filtered;
  }, [selectedCategory, searchTerm]);

  const toAsciiPath = (path: string) => {
    // Replace Turkish characters and strip combining marks
    const replaced = path
      .replace(/ğ/g, 'g').replace(/Ğ/g, 'G')
      .replace(/ü/g, 'u').replace(/Ü/g, 'U')
      .replace(/ş/g, 's').replace(/Ş/g, 'S')
      .replace(/ı/g, 'i').replace(/İ/g, 'I')
      .replace(/ö/g, 'o').replace(/Ö/g, 'O')
      .replace(/ç/g, 'c').replace(/Ç/g, 'C');
    return replaced.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  const setFallbackSrc = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const triedAscii = img.getAttribute('data-tried-ascii') === 'true';
    const originalSrc = (img.getAttribute('data-original-src') || img.src).normalize('NFC');
    if (!triedAscii) {
      // First fallback: ASCII-normalized variant (encoded)
      const asciiSrc = encodeURI(toAsciiPath(originalSrc));
      img.setAttribute('data-tried-ascii', 'true');
      if (!img.src.endsWith(asciiSrc)) {
        img.src = asciiSrc;
        return;
      }
    }
    // If already tried ASCII, do nothing further
  };

  const getImageSrc = (path: string) => {
    const normalized = encodeURI(path.normalize('NFC'));
    const withSlash = normalized.startsWith('/') ? normalized : `/${normalized}`;
    const base = (process.env.PUBLIC_URL || '').replace(/\/$/, '');
    return `${base}${withSlash}`;
  };

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
            {t('gallery.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('gallery.subtitle')}
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
                placeholder={t('gallery.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200"
              />
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>{t('gallery.showing', { count: filteredProducts.length, total: products.length })}</span>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => {
                  console.log('Category selected:', category);
                  setSelectedCategory(category);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-primary/10 hover:text-primary'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category === 'All' ? t('gallery.all') : category}
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
                        {t('gallery.featured')}
                      </div>
                    )}
                    
                    <img
                      src={getImageSrc(product.image)}
                      data-original-src={product.image}
                      onError={setFallbackSrc}
                      alt={product.name}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white font-medium">{t('gallery.viewDetails')}</span>
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">{t('gallery.emptyTitle')}</h3>
            <p className="text-gray-500">{t('gallery.emptySubtitle')}</p>
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
                  src={getImageSrc(selectedProduct.images[currentImageIndex])}
                  data-original-src={selectedProduct.images[currentImageIndex]}
                  onError={setFallbackSrc}
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
                <h3 className="text-lg font-semibold text-primary mb-3">{t('gallery.specs.title')}</h3>
                <div className="space-y-2">
                  {selectedProduct.specifications.dimensions && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('gallery.specs.dimensions')}</span>
                      <span className="font-medium">{selectedProduct.specifications.dimensions}</span>
                    </div>
                  )}
                  {selectedProduct.specifications.material && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('gallery.specs.material')}</span>
                      <span className="font-medium">{selectedProduct.specifications.material}</span>
                    </div>
                  )}
                  {selectedProduct.specifications.finish && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('gallery.specs.finish')}</span>
                      <span className="font-medium">{selectedProduct.specifications.finish}</span>
                    </div>
                  )}
                  {selectedProduct.specifications.colors && (
                    <div>
                      <span className="text-gray-600">{t('gallery.specs.colors')}</span>
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
                <h3 className="text-lg font-semibold text-primary mb-3">{t('gallery.tags')}</h3>
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
                  {t('gallery.requestQuote')}
                </button>
                <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200">
                  {t('gallery.downloadSpecs')}
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