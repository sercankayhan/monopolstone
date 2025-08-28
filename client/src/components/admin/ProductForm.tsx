import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button, Input, Card, LoadingSpinner } from '../ui';

interface Product {
  _id?: string;
  name: string;
  slug: string;
  description: string;
  specifications: {
    dimensions?: string;
    weight?: string;
    material?: string;
    finish?: string;
    thickness?: string;
    colors?: string[];
  };
  images: {
    url: string;
    alt: string;
    isPrimary: boolean;
    sortOrder: number;
  }[];
  category: string;
  tags: string[];
  isActive: boolean;
  isFeatured: boolean;
  sortOrder: number;
  seoTitle?: string;
  seoDescription?: string;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
}

interface ProductFormProps {
  product?: Product | null;
  onSave: (product: Product) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onSave,
  onCancel,
  loading = false,
}) => {
  const [formData, setFormData] = useState<Product>({
    name: '',
    slug: '',
    description: '',
    specifications: {
      colors: [],
    },
    images: [],
    category: '',
    tags: [],
    isActive: true,
    isFeatured: false,
    sortOrder: 0,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [categories, setCategories] = useState<Category[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [colorInput, setColorInput] = useState('');

  // Mock categories - replace with actual API call
  useEffect(() => {
    const mockCategories: Category[] = [
      { _id: '1', name: 'Kitchen Countertops', slug: 'kitchen-countertops' },
      { _id: '2', name: 'Bathroom Vanities', slug: 'bathroom-vanities' },
      { _id: '3', name: 'Wall Cladding', slug: 'wall-cladding' },
      { _id: '4', name: 'Flooring', slug: 'flooring' },
      { _id: '5', name: 'Feature Walls', slug: 'feature-walls' },
      { _id: '6', name: 'Outdoor Paving', slug: 'outdoor-paving' },
    ];
    setCategories(mockCategories);
  }, []);

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    // Auto-generate slug from name
    if (field === 'name') {
      const slug = generateSlug(value);
      setFormData(prev => ({
        ...prev,
        slug,
      }));
    }

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSpecificationChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [field]: value,
      },
    }));
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  const addColor = () => {
    if (colorInput.trim() && !formData.specifications.colors?.includes(colorInput.trim())) {
      setFormData(prev => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          colors: [...(prev.specifications.colors || []), colorInput.trim()],
        },
      }));
      setColorInput('');
    }
  };

  const removeColor = (colorToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        colors: prev.specifications.colors?.filter(color => color !== colorToRemove) || [],
      },
    }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await onSave(formData);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Basic Information</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Input
                  label="Product Name"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  error={errors.name}
                  placeholder="e.g., Marble Elegance Series"
                />

                <Input
                  label="URL Slug"
                  required
                  value={formData.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  error={errors.slug}
                  placeholder="marble-elegance-series"
                  helperText="Used in the product URL"
                />

                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description <span className="text-error">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg resize-none transition-all duration-200 focus:outline-none focus:ring-4 ${
                      errors.description
                        ? 'border-error focus:border-error focus:ring-error/20'
                        : 'border-gray-300 focus:border-primary focus:ring-primary/20'
                    }`}
                    placeholder="Describe the product features, benefits, and applications..."
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-error">{errors.description}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category <span className="text-error">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-4 ${
                      errors.category
                        ? 'border-error focus:border-error focus:ring-error/20'
                        : 'border-gray-300 focus:border-primary focus:ring-primary/20'
                    }`}
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-error">{errors.category}</p>
                  )}
                </div>

                <div className="flex items-center space-x-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => handleInputChange('isActive', e.target.checked)}
                      className="rounded border-gray-300 text-primary focus:border-primary focus:ring-primary"
                    />
                    <span className="ml-2 text-sm text-gray-700">Active</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => handleInputChange('isFeatured', e.target.checked)}
                      className="rounded border-gray-300 text-primary focus:border-primary focus:ring-primary"
                    />
                    <span className="ml-2 text-sm text-gray-700">Featured</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Specifications</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Input
                  label="Dimensions"
                  value={formData.specifications.dimensions || ''}
                  onChange={(e) => handleSpecificationChange('dimensions', e.target.value)}
                  placeholder="e.g., 3000mm x 1400mm x 20mm"
                />

                <Input
                  label="Weight"
                  value={formData.specifications.weight || ''}
                  onChange={(e) => handleSpecificationChange('weight', e.target.value)}
                  placeholder="e.g., 45 kg/m²"
                />

                <Input
                  label="Material"
                  value={formData.specifications.material || ''}
                  onChange={(e) => handleSpecificationChange('material', e.target.value)}
                  placeholder="e.g., Quartz Composite"
                />

                <Input
                  label="Finish"
                  value={formData.specifications.finish || ''}
                  onChange={(e) => handleSpecificationChange('finish', e.target.value)}
                  placeholder="e.g., Polished"
                />

                <Input
                  label="Thickness"
                  value={formData.specifications.thickness || ''}
                  onChange={(e) => handleSpecificationChange('thickness', e.target.value)}
                  placeholder="e.g., 20mm"
                />

                {/* Colors */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available Colors
                  </label>
                  <div className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      value={colorInput}
                      onChange={(e) => setColorInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addColor())}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="Add a color"
                    />
                    <Button type="button" variant="outline" size="md" onClick={addColor}>
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.specifications.colors?.map((color) => (
                      <span
                        key={color}
                        className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                      >
                        {color}
                        <button
                          type="button"
                          onClick={() => removeColor(color)}
                          className="ml-2 text-primary/60 hover:text-primary"
                        >
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Tags</h3>
              <div className="flex space-x-2 mb-4">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="Add a tag"
                />
                <Button type="button" variant="outline" size="md" onClick={addTag}>
                  Add Tag
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 bg-accent/10 text-accent rounded-full text-sm"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-accent/60 hover:text-accent"
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* SEO */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">SEO Settings</h3>
              <div className="space-y-6">
                <Input
                  label="SEO Title"
                  value={formData.seoTitle || ''}
                  onChange={(e) => handleInputChange('seoTitle', e.target.value)}
                  placeholder="Custom title for search engines"
                  helperText="Leave blank to use product name"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SEO Description
                  </label>
                  <textarea
                    rows={3}
                    value={formData.seoDescription || ''}
                    onChange={(e) => handleInputChange('seoDescription', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="Meta description for search engines"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Leave blank to use product description
                  </p>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                loading={loading}
                disabled={loading}
              >
                {product ? 'Update Product' : 'Create Product'}
              </Button>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default ProductForm;