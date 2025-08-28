import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button, Input, Card } from '../ui';

interface Category {
  _id?: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  isActive: boolean;
  sortOrder: number;
}

interface CategoryFormProps {
  category?: Category | null;
  onSave: (category: Category) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  category,
  onSave,
  onCancel,
  loading = false,
}) => {
  const [formData, setFormData] = useState<Category>({
    name: '',
    slug: '',
    description: '',
    image: '',
    isActive: true,
    sortOrder: 0,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    if (category) {
      setFormData(category);
      setImagePreview(category.image || '');
    }
  }, [category]);

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you'd upload this to your server/cloud storage
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData(prev => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview('');
    setFormData(prev => ({ ...prev, image: '' }));
    // Reset file input
    const fileInput = document.getElementById('category-image') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Category name is required';
    }

    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug is required';
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = 'Slug can only contain lowercase letters, numbers, and hyphens';
    }

    if (formData.description && formData.description.length > 500) {
      newErrors.description = 'Description cannot be more than 500 characters';
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
      console.error('Error saving category:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                {category ? 'Edit Category' : 'Add New Category'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Category Name"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  error={errors.name}
                  placeholder="e.g., Kitchen Countertops"
                />

                <Input
                  label="URL Slug"
                  required
                  value={formData.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  error={errors.slug}
                  placeholder="kitchen-countertops"
                  helperText="Used in the category URL"
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={4}
                  value={formData.description || ''}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg resize-none transition-all duration-200 focus:outline-none focus:ring-4 ${
                    errors.description
                      ? 'border-error focus:border-error focus:ring-error/20'
                      : 'border-gray-300 focus:border-primary focus:ring-primary/20'
                  }`}
                  placeholder="Brief description of this category..."
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-error">{errors.description}</p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  {formData.description?.length || 0}/500 characters
                </p>
              </div>
            </div>

            {/* Category Image */}
            <div>
              <h4 className="text-md font-semibold text-gray-900 mb-4">Category Image</h4>
              
              {imagePreview ? (
                <div className="space-y-4">
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Category preview"
                      className="w-full h-48 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 p-2 bg-error text-white rounded-lg hover:bg-error/90 transition-colors duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="flex gap-3">
                    <label className="cursor-pointer">
                      <input
                        id="category-image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <span className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Replace Image
                      </span>
                    </label>
                    
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={removeImage}
                    >
                      Remove Image
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary/50 transition-colors duration-200">
                  <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  
                  <div className="space-y-2">
                    <label className="cursor-pointer">
                      <input
                        id="category-image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <span className="text-primary font-medium hover:text-primary/80 transition-colors duration-200">
                        Upload an image
                      </span>
                    </label>
                    <p className="text-sm text-gray-500">
                      PNG, JPG, WebP up to 5MB
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Settings */}
            <div>
              <h4 className="text-md font-semibold text-gray-900 mb-4">Settings</h4>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Sort Order"
                    type="number"
                    min="0"
                    value={formData.sortOrder.toString()}
                    onChange={(e) => handleInputChange('sortOrder', parseInt(e.target.value) || 0)}
                    placeholder="0"
                    helperText="Lower numbers appear first"
                  />

                  <div className="flex items-center justify-center">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) => handleInputChange('isActive', e.target.checked)}
                        className="rounded border-gray-300 text-primary focus:border-primary focus:ring-primary"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700">
                        Active Category
                      </span>
                    </label>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-primary mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-gray-900 mb-1">Category Guidelines</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Use clear, descriptive names that customers will understand</li>
                        <li>• Keep descriptions concise but informative</li>
                        <li>• Images should be high-quality and representative of the category</li>
                        <li>• Inactive categories won't appear on the website</li>
                      </ul>
                    </div>
                  </div>
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
                {category ? 'Update Category' : 'Create Category'}
              </Button>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default CategoryForm;