import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card, Modal, LoadingSpinner } from '../ui';
import { getCategoryImage } from '../../utils/mockImages';

interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  isActive: boolean;
  sortOrder: number;
  productCount: number;
  createdAt: string;
  updatedAt: string;
}

interface CategoryListProps {
  onEdit: (category: Category) => void;
  onAdd: () => void;
  refreshTrigger?: number;
}

const CategoryList: React.FC<CategoryListProps> = ({ onEdit, onAdd, refreshTrigger }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Mock data - replace with actual API call
  const mockCategories: Category[] = [
    {
      _id: '1',
      name: 'Kitchen Countertops',
      slug: 'kitchen-countertops',
      description: 'Premium countertops for modern kitchens with superior durability and aesthetics.',
      image: getCategoryImage('kitchen-countertops'),
      isActive: true,
      sortOrder: 1,
      productCount: 8,
      createdAt: '2024-01-10T10:00:00Z',
      updatedAt: '2024-01-20T14:30:00Z',
    },
    {
      _id: '2',
      name: 'Bathroom Vanities',
      slug: 'bathroom-vanities',
      description: 'Elegant vanity tops and surfaces perfect for bathroom applications.',
      image: getCategoryImage('bathroom-surfaces'),
      isActive: true,
      sortOrder: 2,
      productCount: 5,
      createdAt: '2024-01-12T11:15:00Z',
      updatedAt: '2024-01-18T16:45:00Z',
    },
    {
      _id: '3',
      name: 'Wall Cladding',
      slug: 'wall-cladding',
      description: 'Decorative and protective wall covering solutions for interior and exterior use.',
      image: getCategoryImage('wall-cladding'),
      isActive: true,
      sortOrder: 3,
      productCount: 6,
      createdAt: '2024-01-08T09:30:00Z',
      updatedAt: '2024-01-22T12:20:00Z',
    },
    {
      _id: '4',
      name: 'Flooring',
      slug: 'flooring',
      description: 'Durable flooring solutions for high-traffic residential and commercial spaces.',
      image: getCategoryImage('flooring-tiles'),
      isActive: true,
      sortOrder: 4,
      productCount: 3,
      createdAt: '2024-01-15T14:20:00Z',
      updatedAt: '2024-01-19T10:15:00Z',
    },
    {
      _id: '5',
      name: 'Feature Walls',
      slug: 'feature-walls',
      description: 'Statement walls and accent pieces for creating dramatic focal points.',
      image: '/api/placeholder/300/200',
      isActive: false,
      sortOrder: 5,
      productCount: 2,
      createdAt: '2024-01-05T16:45:00Z',
      updatedAt: '2024-01-25T13:10:00Z',
    },
    {
      _id: '6',
      name: 'Outdoor Paving',
      slug: 'outdoor-paving',
      description: 'Weather-resistant outdoor surfaces for patios, walkways, and landscapes.',
      image: '/api/placeholder/300/200',
      isActive: true,
      sortOrder: 6,
      productCount: 4,
      createdAt: '2024-01-03T12:00:00Z',
      updatedAt: '2024-01-21T15:30:00Z',
    },
  ];

  useEffect(() => {
    loadCategories();
  }, [refreshTrigger]);

  const loadCategories = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      setCategories(mockCategories.sort((a, b) => a.sortOrder - b.sortOrder));
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && category.isActive) ||
                         (statusFilter === 'inactive' && !category.isActive);

    return matchesSearch && matchesStatus;
  });

  const handleDelete = async () => {
    if (!categoryToDelete) return;
    
    setDeleting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCategories(prev => prev.filter(c => c._id !== categoryToDelete._id));
      setDeleteModalOpen(false);
      setCategoryToDelete(null);
    } catch (error) {
      console.error('Error deleting category:', error);
    } finally {
      setDeleting(false);
    }
  };

  const toggleCategoryStatus = async (category: Category) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      setCategories(prev => prev.map(c => 
        c._id === category._id 
          ? { ...c, isActive: !c.isActive }
          : c
      ));
    } catch (error) {
      console.error('Error updating category status:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div>
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          {/* Search */}
          <div className="relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full sm:w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <Button
          variant="primary"
          onClick={onAdd}
          leftIcon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          }
        >
          Add Category
        </Button>
      </div>

      {/* Results Summary */}
      <div className="mb-6">
        <p className="text-sm text-gray-600">
          Showing {filteredCategories.length} of {categories.length} categories
        </p>
      </div>

      {/* Categories List */}
      <AnimatePresence mode="wait">
        {filteredCategories.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12"
          >
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Get started by creating your first category'
              }
            </p>
            {!searchTerm && statusFilter === 'all' && (
              <Button variant="primary" onClick={onAdd}>
                Add Your First Category
              </Button>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {filteredCategories.map((category, index) => (
              <motion.div
                key={category._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                layout
              >
                <Card className="overflow-hidden group">
                  <div className="flex flex-col lg:flex-row">
                    {/* Category Image */}
                    <div className="lg:w-48 h-32 lg:h-auto">
                      {category.image ? (
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Category Info */}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {category.name}
                            </h3>
                            
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                category.isActive 
                                  ? 'bg-success/10 text-success' 
                                  : 'bg-gray-100 text-gray-600'
                              }`}>
                                {category.isActive ? 'Active' : 'Inactive'}
                              </span>
                              
                              <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                                {category.productCount} product{category.productCount !== 1 ? 's' : ''}
                              </span>
                            </div>
                          </div>

                          <p className="text-sm text-gray-500 mb-2">
                            /{category.slug}
                          </p>

                          {category.description && (
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                              {category.description}
                            </p>
                          )}

                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center space-x-4">
                              <span>Sort: {category.sortOrder}</span>
                              <span>Updated {formatDate(category.updatedAt)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2 ml-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEdit(category)}
                            className="text-primary hover:bg-primary/10"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </Button>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleCategoryStatus(category)}
                            className={category.isActive ? 'text-warning hover:bg-warning/10' : 'text-success hover:bg-success/10'}
                          >
                            {category.isActive ? (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                              </svg>
                            ) : (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            )}
                          </Button>

                          {category.productCount === 0 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setCategoryToDelete(category);
                                setDeleteModalOpen(true);
                              }}
                              className="text-error hover:bg-error/10"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Category"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete the category "{categoryToDelete?.name}"? This action cannot be undone.
          </p>
          
          {categoryToDelete && categoryToDelete.productCount > 0 && (
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-warning" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="text-warning font-medium text-sm">
                  This category contains {categoryToDelete.productCount} product{categoryToDelete.productCount !== 1 ? 's' : ''}. Please move or delete the products first.
                </span>
              </div>
            </div>
          )}
          
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setDeleteModalOpen(false)}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
              loading={deleting}
              disabled={deleting || (categoryToDelete?.productCount || 0) > 0}
            >
              {deleting ? 'Deleting...' : 'Delete Category'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CategoryList;