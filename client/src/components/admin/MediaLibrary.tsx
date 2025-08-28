import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card, Modal, LoadingSpinner, Input } from '../ui';
import { mockGalleryImages } from '../../utils/mockImages';

interface MediaFile {
  _id: string;
  filename: string;
  originalName: string;
  url: string;
  type: 'image' | 'video' | 'document';
  size: number;
  dimensions?: {
    width: number;
    height: number;
  };
  alt?: string;
  createdAt: string;
  updatedAt: string;
}

interface MediaLibraryProps {
  onSelect?: (file: MediaFile) => void;
  multiple?: boolean;
  acceptedTypes?: string[];
  maxFiles?: number;
}

const MediaLibrary: React.FC<MediaLibraryProps> = ({
  onSelect,
  multiple = false,
  acceptedTypes = ['image/*'],
  maxFiles = 10,
}) => {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<MediaFile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<MediaFile | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [fileToEdit, setFileToEdit] = useState<MediaFile | null>(null);
  const [editAlt, setEditAlt] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock data - replace with actual API call
  const mockFiles: MediaFile[] = [
    {
      _id: '1',
      filename: 'marble-kitchen-1.jpg',
      originalName: 'Beautiful Marble Kitchen Countertop.jpg',
      url: mockGalleryImages[0],
      type: 'image',
      size: 1234567,
      dimensions: { width: 1920, height: 1080 },
      alt: 'Beautiful marble kitchen countertop',
      createdAt: '2024-01-20T10:30:00Z',
      updatedAt: '2024-01-20T10:30:00Z',
    },
    {
      _id: '2',
      filename: 'bathroom-vanity-2.jpg',
      originalName: 'Modern Bathroom Vanity.jpg',
      url: mockGalleryImages[1],
      type: 'image',
      size: 987654,
      dimensions: { width: 1600, height: 1200 },
      alt: 'Modern bathroom vanity with artificial stone',
      createdAt: '2024-01-19T14:20:00Z',
      updatedAt: '2024-01-19T14:20:00Z',
    },
    {
      _id: '3',
      filename: 'wall-cladding-3.jpg',
      originalName: 'Stone Wall Cladding.jpg',
      url: mockGalleryImages[2],
      type: 'image',
      size: 2100000,
      dimensions: { width: 2048, height: 1536 },
      alt: 'Textured stone wall cladding',
      createdAt: '2024-01-18T09:15:00Z',
      updatedAt: '2024-01-18T09:15:00Z',
    },
    {
      _id: '4',
      filename: 'product-catalog.pdf',
      originalName: 'Product Catalog 2024.pdf',
      url: '/api/placeholder/file.pdf',
      type: 'document',
      size: 5432100,
      createdAt: '2024-01-17T11:45:00Z',
      updatedAt: '2024-01-17T11:45:00Z',
    },
  ];

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFiles(mockFiles);
    } catch (error) {
      console.error('Error loading files:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.originalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.alt?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'all' || file.type === typeFilter;

    return matchesSearch && matchesType;
  });

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleFileSelect = (file: MediaFile) => {
    if (multiple) {
      setSelectedFiles(prev => {
        const isSelected = prev.find(f => f._id === file._id);
        if (isSelected) {
          return prev.filter(f => f._id !== file._id);
        } else if (prev.length < maxFiles) {
          return [...prev, file];
        }
        return prev;
      });
    } else {
      if (onSelect) {
        onSelect(file);
      }
    }
  };

  const handleUpload = async (uploadFiles: FileList) => {
    setUploading(true);
    try {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create mock uploaded files
      const newFiles: MediaFile[] = Array.from(uploadFiles).map((file, index) => ({
        _id: Date.now() + index.toString(),
        filename: `${Date.now()}-${file.name}`,
        originalName: file.name,
        url: URL.createObjectURL(file),
        type: file.type.startsWith('image/') ? 'image' : 'document',
        size: file.size,
        dimensions: file.type.startsWith('image/') ? { width: 800, height: 600 } : undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));

      setFiles(prev => [...newFiles, ...prev]);
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadFiles = e.target.files;
    if (uploadFiles && uploadFiles.length > 0) {
      handleUpload(uploadFiles);
    }
  };

  const handleDelete = async () => {
    if (!fileToDelete) return;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setFiles(prev => prev.filter(f => f._id !== fileToDelete._id));
      setSelectedFiles(prev => prev.filter(f => f._id !== fileToDelete._id));
      setDeleteModalOpen(false);
      setFileToDelete(null);
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const handleEditSave = async () => {
    if (!fileToEdit) return;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setFiles(prev => prev.map(f => 
        f._id === fileToEdit._id 
          ? { ...f, alt: editAlt, updatedAt: new Date().toISOString() }
          : f
      ));
      setEditModalOpen(false);
      setFileToEdit(null);
      setEditAlt('');
    } catch (error) {
      console.error('Error updating file:', error);
    }
  };

  const openEditModal = (file: MediaFile) => {
    setFileToEdit(file);
    setEditAlt(file.alt || '');
    setEditModalOpen(true);
  };

  const getFileIcon = (file: MediaFile) => {
    switch (file.type) {
      case 'image':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        );
      case 'video':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm12.553 1.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" clipRule="evenodd" />
          </svg>
        );
      case 'document':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Upload Files</h3>
          {uploading && (
            <div className="flex items-center space-x-2">
              <LoadingSpinner size="sm" />
              <span className="text-sm text-gray-600">Uploading...</span>
            </div>
          )}
        </div>

        <div 
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary/50 transition-colors duration-200 cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          
          <div className="space-y-2">
            <p className="text-primary font-medium">
              Click to upload or drag and drop
            </p>
            <p className="text-sm text-gray-500">
              PNG, JPG, WebP, PDF up to 10MB each
            </p>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={handleFileInput}
          className="hidden"
        />
      </Card>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          {/* Search */}
          <div className="relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full sm:w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="all">All Types</option>
              <option value="image">Images</option>
              <option value="video">Videos</option>
              <option value="document">Documents</option>
            </select>

            <div className="flex rounded-lg border border-gray-300 overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {multiple && selectedFiles.length > 0 && (
          <Button
            variant="primary"
            onClick={() => {
              if (onSelect) {
                selectedFiles.forEach(file => onSelect(file));
              }
            }}
          >
            Select {selectedFiles.length} File{selectedFiles.length !== 1 ? 's' : ''}
          </Button>
        )}
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {filteredFiles.length} of {files.length} files
        </p>
        {multiple && (
          <p className="text-sm text-gray-600">
            {selectedFiles.length} selected
          </p>
        )}
      </div>

      {/* Files Grid/List */}
      <AnimatePresence mode="wait">
        {filteredFiles.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12"
          >
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No files found</h3>
            <p className="text-gray-500">
              {searchTerm || typeFilter !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Upload your first file to get started'
              }
            </p>
          </motion.div>
        ) : viewMode === 'grid' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
          >
            {filteredFiles.map((file, index) => (
              <motion.div
                key={file._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                layout
              >
                <Card 
                  className={`group cursor-pointer transition-all duration-200 ${
                    multiple && selectedFiles.find(f => f._id === file._id)
                      ? 'ring-2 ring-primary bg-primary/5'
                      : 'hover:shadow-lg'
                  }`}
                  onClick={() => handleFileSelect(file)}
                >
                  <div className="aspect-square relative overflow-hidden rounded-t-lg">
                    {file.type === 'image' ? (
                      <img
                        src={file.url}
                        alt={file.alt || file.originalName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <div className="text-gray-400">
                          {getFileIcon(file)}
                        </div>
                      </div>
                    )}
                    
                    {/* Actions Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditModal(file);
                        }}
                        className="p-2 bg-white/90 text-gray-700 rounded-lg hover:bg-white transition-colors duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setFileToDelete(file);
                          setDeleteModalOpen(true);
                        }}
                        className="p-2 bg-white/90 text-gray-700 rounded-lg hover:bg-white hover:text-error transition-colors duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-3">
                    <h4 className="text-sm font-medium text-gray-900 truncate" title={file.originalName}>
                      {file.originalName}
                    </h4>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-500">
                        {formatFileSize(file.size)}
                      </span>
                      <div className="flex items-center text-gray-400">
                        {getFileIcon(file)}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-2"
          >
            {filteredFiles.map((file, index) => (
              <motion.div
                key={file._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                layout
              >
                <Card 
                  className={`p-4 cursor-pointer transition-all duration-200 ${
                    multiple && selectedFiles.find(f => f._id === file._id)
                      ? 'ring-2 ring-primary bg-primary/5'
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => handleFileSelect(file)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-12 h-12">
                      {file.type === 'image' ? (
                        <img
                          src={file.url}
                          alt={file.alt || file.originalName}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                          {getFileIcon(file)}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {file.originalName}
                      </h4>
                      <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                        <span>{formatFileSize(file.size)}</span>
                        {file.dimensions && (
                          <span>{file.dimensions.width} × {file.dimensions.height}</span>
                        )}
                        <span>{formatDate(file.createdAt)}</span>
                      </div>
                      {file.alt && (
                        <p className="text-xs text-gray-500 mt-1 truncate">
                          Alt: {file.alt}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditModal(file);
                        }}
                        className="p-2 text-gray-400 hover:text-primary rounded-lg hover:bg-primary/10 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setFileToDelete(file);
                          setDeleteModalOpen(true);
                        }}
                        className="p-2 text-gray-400 hover:text-error rounded-lg hover:bg-error/10 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
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
        title="Delete File"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete "{fileToDelete?.originalName}"? This action cannot be undone.
          </p>
          
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
            >
              Delete File
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit File Modal */}
      <Modal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edit File Details"
        size="md"
      >
        <div className="space-y-6">
          {fileToEdit && (
            <div className="space-y-4">
              {fileToEdit.type === 'image' && (
                <div>
                  <img
                    src={fileToEdit.url}
                    alt={fileToEdit.alt || fileToEdit.originalName}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}
              
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Filename</p>
                <p className="text-sm text-gray-900">{fileToEdit.originalName}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Size</p>
                <p className="text-sm text-gray-900">{formatFileSize(fileToEdit.size)}</p>
              </div>
              
              {fileToEdit.dimensions && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Dimensions</p>
                  <p className="text-sm text-gray-900">
                    {fileToEdit.dimensions.width} × {fileToEdit.dimensions.height} pixels
                  </p>
                </div>
              )}
              
              <Input
                label="Alt Text"
                value={editAlt}
                onChange={(e) => setEditAlt(e.target.value)}
                placeholder="Describe this image for accessibility"
                helperText="Used for screen readers and SEO"
              />
            </div>
          )}
          
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setEditModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleEditSave}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MediaLibrary;