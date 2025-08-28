// Mock image utility for generating placeholder images
export const generateMockImage = (
  width: number = 400,
  height: number = 300,
  category: string = 'stone',
  seed?: string
): string => {
  const baseUrl = 'https://picsum.photos';
  const seedParam = seed ? `?random=${encodeURIComponent(seed)}` : `?random=${Math.floor(Math.random() * 1000)}`;
  return `${baseUrl}/${width}/${height}${seedParam}`;
};

// Predefined mock images for artificial stone products
export const mockProductImages = {
  // Kitchen Countertops
  'marble-elegance-countertop': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
  'granite-supreme-surface': 'https://images.unsplash.com/photo-1556909043-f42c4e8b5f65?w=400&h=300&fit=crop',
  'quartz-modern-kitchen': 'https://images.unsplash.com/photo-1556909114-32a0ac8dba7b?w=400&h=300&fit=crop',
  'calacatta-gold-countertop': 'https://images.unsplash.com/photo-1556909043-4cc08c18b7c8?w=400&h=300&fit=crop',
  
  // Bathroom Surfaces
  'carrara-marble-vanity': 'https://images.unsplash.com/photo-1564540574859-0dfb63985735?w=400&h=300&fit=crop',
  'travertine-shower-walls': 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=300&fit=crop',
  'onyx-luxury-bathroom': 'https://images.unsplash.com/photo-1571508601891-ca5e7a713859?w=400&h=300&fit=crop',
  'slate-modern-tiles': 'https://images.unsplash.com/photo-1571508602851-ac7bf0ce8c9d?w=400&h=300&fit=crop',
  
  // Flooring
  'marble-floor-tiles': 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
  'granite-outdoor-paving': 'https://images.unsplash.com/photo-1558618053-eab31c13b34a?w=400&h=300&fit=crop',
  'limestone-interior-floor': 'https://images.unsplash.com/photo-1558618047-4c8c76ca7d13?w=400&h=300&fit=crop',
  'sandstone-patio-tiles': 'https://images.unsplash.com/photo-1558618047-85c8c76ca7d13?w=400&h=300&fit=crop',
  
  // Wall Cladding
  'natural-stone-wall': 'https://images.unsplash.com/photo-1558618040-ac7bf0ce8c9d?w=400&h=300&fit=crop',
  'cultured-stone-facade': 'https://images.unsplash.com/photo-1558618067-4c8c76ca7d13?w=400&h=300&fit=crop',
  'brick-texture-wall': 'https://images.unsplash.com/photo-1558618047-85c8c76ca7d13?w=400&h=300&fit=crop',
  'slate-accent-wall': 'https://images.unsplash.com/photo-1558618040-85c8c76ca7d13?w=400&h=300&fit=crop',
  
  // Decorative Elements
  'marble-fireplace-surround': 'https://images.unsplash.com/photo-1556909043-85c8c76ca7d13?w=400&h=300&fit=crop',
  'granite-outdoor-kitchen': 'https://images.unsplash.com/photo-1556909114-85c8c76ca7d13?w=400&h=300&fit=crop',
  'quartz-bar-counter': 'https://images.unsplash.com/photo-1556909043-85c8c76ca7d13?w=400&h=300&fit=crop',
  'limestone-garden-features': 'https://images.unsplash.com/photo-1558618047-85c8c76ca7d13?w=400&h=300&fit=crop',
};

// Category images
export const mockCategoryImages = {
  'kitchen-countertops': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=250&fit=crop',
  'bathroom-surfaces': 'https://images.unsplash.com/photo-1564540574859-0dfb63985735?w=400&h=250&fit=crop',
  'flooring-tiles': 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=250&fit=crop',
  'wall-cladding': 'https://images.unsplash.com/photo-1558618040-ac7bf0ce8c9d?w=400&h=250&fit=crop',
  'decorative-elements': 'https://images.unsplash.com/photo-1556909043-85c8c76ca7d13?w=400&h=250&fit=crop',
  'outdoor-surfaces': 'https://images.unsplash.com/photo-1558618053-eab31c13b34a?w=400&h=250&fit=crop',
  'commercial-applications': 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=250&fit=crop',
  'specialty-finishes': 'https://images.unsplash.com/photo-1556909043-4cc08c18b7c8?w=400&h=250&fit=crop',
};

// Hero section images
export const mockHeroImages = [
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=600&fit=crop',
  'https://images.unsplash.com/photo-1564540574859-0dfb63985735?w=1200&h=600&fit=crop',
  'https://images.unsplash.com/photo-1556909043-f42c4e8b5f65?w=1200&h=600&fit=crop',
  'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1200&h=600&fit=crop',
  'https://images.unsplash.com/photo-1556909043-4cc08c18b7c8?w=1200&h=600&fit=crop',
];

// Gallery thumbnails for media library
export const mockGalleryImages = [
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop',
  'https://images.unsplash.com/photo-1564540574859-0dfb63985735?w=300&h=200&fit=crop',
  'https://images.unsplash.com/photo-1556909043-f42c4e8b5f65?w=300&h=200&fit=crop',
  'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop',
  'https://images.unsplash.com/photo-1556909043-4cc08c18b7c8?w=300&h=200&fit=crop',
  'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=300&h=200&fit=crop',
  'https://images.unsplash.com/photo-1571508601891-ca5e7a713859?w=300&h=200&fit=crop',
  'https://images.unsplash.com/photo-1571508602851-ac7bf0ce8c9d?w=300&h=200&fit=crop',
  'https://images.unsplash.com/photo-1558618053-eab31c13b34a?w=300&h=200&fit=crop',
  'https://images.unsplash.com/photo-1558618040-ac7bf0ce8c9d?w=300&h=200&fit=crop',
  'https://images.unsplash.com/photo-1558618047-85c8c76ca7d13?w=300&h=200&fit=crop',
  'https://images.unsplash.com/photo-1556909043-85c8c76ca7d13?w=300&h=200&fit=crop',
];

// Company/About section images
export const mockCompanyImages = {
  'factory': 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop',
  'team': 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop',
  'showroom': 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
  'installation': 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop',
};

export const getProductImage = (productSlug: string): string => {
  return mockProductImages[productSlug as keyof typeof mockProductImages] || 
         generateMockImage(400, 300, 'stone', productSlug);
};

export const getCategoryImage = (categorySlug: string): string => {
  return mockCategoryImages[categorySlug as keyof typeof mockCategoryImages] || 
         generateMockImage(400, 250, 'category', categorySlug);
};

export const getRandomHeroImage = (): string => {
  const randomIndex = Math.floor(Math.random() * mockHeroImages.length);
  return mockHeroImages[randomIndex];
};

export const getGalleryImages = (count: number = 12): string[] => {
  return mockGalleryImages.slice(0, count);
};