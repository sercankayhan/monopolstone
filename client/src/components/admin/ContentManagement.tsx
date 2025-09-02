import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, Button, Input, Modal } from '../ui';

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

interface AboutContent {
  mainTitle: string;
  description1: string;
  description2: string;
  description3: string;
  stats: {
    experience: string;
    projects: string;
    products: string;
    satisfaction: string;
  };
}

interface ContentManagementProps {
  onSave?: () => void;
}

const ContentManagement: React.FC<ContentManagementProps> = ({ onSave }) => {
  const [activeTab, setActiveTab] = useState('hero');
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImageType, setSelectedImageType] = useState('');
  const [uploading, setUploading] = useState(false);

  // Hero Slides
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([
    {
      id: 1,
              title: 'Premium Taş',
      subtitle: 'Mükemmellik İçin Üretildi',
              description: 'Mekanlarınızı premium taş çözümlerimizle dönüştürün. Dayanıklı, zarif ve ömür boyu tasarlandı.',
      image: '/mitra-gölge.jpg',
      ctaPrimary: 'Ürünleri Keşfet',
      ctaSecondary: 'Teklif Al'
    },
    {
      id: 2,
      title: 'Özel Tasarım Çözümleri',
      subtitle: 'Vizyonunuza Göre Tasarlanmış',
              description: 'Özel taş tasarımlarımızla benzersiz mimari unsurlar yaratın. Konseptten kuruluma kadar.',
      image: '/luminar-sis.jpg',
      ctaPrimary: 'Galeriyi Görüntüle',
      ctaSecondary: 'Bizimle İletişime Geçin'
    },
    {
      id: 3,
      title: 'Profesyonel Kurulum',
      subtitle: 'Uzman İşçilik',
      description: 'Sertifikalı profesyonellerimiz her detaya dikkat ederek mükemmel kurulum sağlar. Kalite garantili.',
      image: '/belezza-günbatımı.jpg',
      ctaPrimary: 'Hizmetlerimiz',
      ctaSecondary: 'Danışmanlık Planla'
    }
  ]);

  // About Content
  const [aboutContent, setAboutContent] = useState<AboutContent>({
            mainTitle: 'Taş Çözümlerinde Güvenilir Partneriniz',
          description1: 'Monopol Stone, kalite, yenilik ve müşteri memnuniyeti konusunda güvenilir bir marka haline gelmiştir.',
          description2: 'Estetik çekiciliği olağanüstü dayanıklılıkla birleştiren premium taş ürünleri üretiminde uzmanız.',
    description3: 'Konut projelerinden büyük ölçekli ticari geliştirmelere kadar, mekanları dönüştüren ve kalıcı izlenimler yaratan kapsamlı çözümler sunuyoruz.',
    stats: {
      experience: '20+ Yıl Deneyim',
      projects: '1000+ Tamamlanan Proje',
      products: '50+ Ürün Çeşidi',
      satisfaction: '98% Müşteri Memnuniyeti'
    }
  });

  const handleHeroSlideChange = (index: number, field: keyof HeroSlide, value: string) => {
    const updatedSlides = [...heroSlides];
    updatedSlides[index] = { ...updatedSlides[index], [field]: value };
    setHeroSlides(updatedSlides);
  };

  const handleAboutChange = (field: keyof AboutContent, value: string) => {
    setAboutContent(prev => ({ ...prev, [field]: value }));
  };

  const handleStatsChange = (field: keyof AboutContent['stats'], value: string) => {
    setAboutContent(prev => ({
      ...prev,
      stats: { ...prev.stats, [field]: value }
    }));
  };

  const handleImageUpload = async (file: File, slideIndex?: number) => {
    setUploading(true);
    try {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const imageUrl = URL.createObjectURL(file);
      
      if (slideIndex !== undefined) {
        handleHeroSlideChange(slideIndex, 'image', imageUrl);
      }
      
      setShowImageModal(false);
    } catch (error) {
      console.error('Image upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      // Save content to backend/localStorage
      localStorage.setItem('heroSlides', JSON.stringify(heroSlides));
      localStorage.setItem('aboutContent', JSON.stringify(aboutContent));
      
      onSave?.();
    } catch (error) {
      console.error('Save failed:', error);
    }
  };

  const renderHeroSlides = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-primary">Hero Slider Yönetimi</h3>
        <Button variant="outline" size="sm">
          Yeni Slide Ekle
        </Button>
      </div>
      
      {heroSlides.map((slide, index) => (
        <Card key={slide.id} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Input
                label="Başlık"
                value={slide.title}
                onChange={(e) => handleHeroSlideChange(index, 'title', e.target.value)}
              />
              <Input
                label="Alt Başlık"
                value={slide.subtitle}
                onChange={(e) => handleHeroSlideChange(index, 'subtitle', e.target.value)}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Açıklama
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  rows={3}
                  value={slide.description}
                  onChange={(e) => handleHeroSlideChange(index, 'description', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Birincil CTA"
                  value={slide.ctaPrimary}
                  onChange={(e) => handleHeroSlideChange(index, 'ctaPrimary', e.target.value)}
                />
                <Input
                  label="İkincil CTA"
                  value={slide.ctaSecondary}
                  onChange={(e) => handleHeroSlideChange(index, 'ctaSecondary', e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slide Görseli
                </label>
                <div className="relative">
                  <img
                    src={slide.image}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      setSelectedImageType(`slide-${index}`);
                      setShowImageModal(true);
                    }}
                  >
                    Değiştir
                  </Button>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Önizle
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Sil
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderAboutContent = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-primary">Hakkımızda Bölümü</h3>
      
      <Card className="p-6">
        <div className="space-y-4">
          <Input
            label="Ana Başlık"
            value={aboutContent.mainTitle}
            onChange={(e) => handleAboutChange('mainTitle', e.target.value)}
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Açıklama 1
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              rows={3}
              value={aboutContent.description1}
              onChange={(e) => handleAboutChange('description1', e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Açıklama 2
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              rows={3}
              value={aboutContent.description2}
              onChange={(e) => handleAboutChange('description2', e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Açıklama 3
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              rows={3}
              value={aboutContent.description3}
              onChange={(e) => handleAboutChange('description3', e.target.value)}
            />
          </div>
        </div>
      </Card>
      
      <Card className="p-6">
        <h4 className="text-md font-semibold text-primary mb-4">İstatistikler</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Deneyim"
            value={aboutContent.stats.experience}
            onChange={(e) => handleStatsChange('experience', e.target.value)}
          />
          <Input
            label="Projeler"
            value={aboutContent.stats.projects}
            onChange={(e) => handleStatsChange('projects', e.target.value)}
          />
          <Input
            label="Ürünler"
            value={aboutContent.stats.products}
            onChange={(e) => handleStatsChange('products', e.target.value)}
          />
          <Input
            label="Memnuniyet"
            value={aboutContent.stats.satisfaction}
            onChange={(e) => handleStatsChange('satisfaction', e.target.value)}
          />
        </div>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primary">İçerik Yönetimi</h2>
        <Button variant="primary" onClick={handleSave}>
          Değişiklikleri Kaydet
        </Button>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'hero', label: 'Hero Slider' },
            { id: 'about', label: 'Hakkımızda' },
            { id: 'services', label: 'Hizmetler' },
            { id: 'contact', label: 'İletişim' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'hero' && renderHeroSlides()}
        {activeTab === 'about' && renderAboutContent()}
        {activeTab === 'services' && (
          <div className="text-center py-12">
            <p className="text-gray-500">Hizmetler içerik yönetimi yakında eklenecek</p>
          </div>
        )}
        {activeTab === 'contact' && (
          <div className="text-center py-12">
            <p className="text-gray-500">İletişim içerik yönetimi yakında eklenecek</p>
          </div>
        )}
      </motion.div>

      {/* Image Upload Modal */}
      <Modal
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        title="Görsel Yükle"
      >
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const slideIndex = parseInt(selectedImageType.split('-')[1]);
                  handleImageUpload(file, slideIndex);
                }
              }}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="mt-2 text-sm text-gray-600">
                Görsel seçmek için tıklayın veya sürükleyin
              </p>
            </label>
          </div>
          
          {uploading && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-sm text-gray-600">Yükleniyor...</p>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ContentManagement;

