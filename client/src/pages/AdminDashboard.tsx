import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '../components/admin/AdminLayout';
import ProductList from '../components/admin/ProductList';
import CategoryList from '../components/admin/CategoryList';
import MediaLibrary from '../components/admin/MediaLibrary';
import ContactManagement from '../components/admin/ContactManagement';
import { Card, Button } from '../components/ui';

interface DashboardStats {
  label: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
}

const AdminDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const stats: DashboardStats[] = [
    {
      label: 'Total Products',
      value: 24,
      change: '+2 this month',
      trend: 'up',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zM12 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1V4zM12 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-3z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      label: 'Categories',
      value: 8,
      change: 'No change',
      trend: 'neutral',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      label: 'Media Files',
      value: 156,
      change: '+12 this week',
      trend: 'up',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      label: 'New Inquiries',
      value: 12,
      change: '+3 today',
      trend: 'up',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
      ),
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'product',
      action: 'added',
      item: 'Marble Elegance Countertop',
      time: '2 hours ago',
      user: 'Admin User',
    },
    {
      id: 2,
      type: 'inquiry',
      action: 'received',
      item: 'New contact inquiry from John Smith',
      time: '4 hours ago',
      user: 'System',
    },
    {
      id: 3,
      type: 'media',
      action: 'uploaded',
      item: '5 product images',
      time: '1 day ago',
      user: 'Editor User',
    },
    {
      id: 4,
      type: 'category',
      action: 'updated',
      item: 'Kitchen Countertops category',
      time: '2 days ago',
      user: 'Admin User',
    },
  ];

  const quickActions = [
    {
      title: 'Add New Product',
      description: 'Create a new product listing',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
      ),
      onClick: () => setActiveSection('products'),
      color: 'primary',
    },
    {
      title: 'Manage Categories',
      description: 'Organize product categories',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
        </svg>
      ),
      onClick: () => setActiveSection('categories'),
      color: 'accent',
    },
    {
      title: 'Upload Media',
      description: 'Add images and files',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
        </svg>
      ),
      onClick: () => setActiveSection('media'),
      color: 'success',
    },
    {
      title: 'View Inquiries',
      description: 'Check contact messages',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
      ),
      onClick: () => setActiveSection('contacts'),
      color: 'warning',
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'product':
        return (
          <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zM12 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1V4zM12 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-3z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'inquiry':
        return (
          <div className="w-8 h-8 bg-accent/10 text-accent rounded-full flex items-center justify-center">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
        );
      case 'media':
        return (
          <div className="w-8 h-8 bg-success/10 text-success rounded-full flex items-center justify-center">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'category':
        return (
          <div className="w-8 h-8 bg-warning/10 text-warning rounded-full flex items-center justify-center">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'products':
        return (
          <ProductList
            onEdit={() => {}} // TODO: Implement product editing
            onAdd={() => {}} // TODO: Implement product adding
          />
        );
      case 'categories':
        return (
          <CategoryList
            onEdit={() => {}} // TODO: Implement category editing
            onAdd={() => {}} // TODO: Implement category adding
          />
        );
      case 'media':
        return <MediaLibrary />;
      case 'contacts':
        return <ContactManagement />;
      case 'dashboard':
      default:
        return renderDashboardContent();
    }
  };

  const renderDashboardContent = () => (

    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <span className={`text-xs font-medium ${
                      stat.trend === 'up' ? 'text-success' : 
                      stat.trend === 'down' ? 'text-error' : 'text-gray-500'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className="text-gray-400">
                  {stat.icon}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="xl:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <button
                    key={action.title}
                    onClick={action.onClick}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-left group"
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`text-${action.color} bg-${action.color}/10 p-2 rounded-lg group-hover:bg-${action.color}/20 transition-colors duration-200`}>
                        {action.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 group-hover:text-primary transition-colors duration-200">
                          {action.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {action.description}
                        </p>
                      </div>
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
            
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  {getActivityIcon(activity.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.action} {activity.item}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-500">{activity.time}</span>
                      <span className="text-xs text-gray-300">•</span>
                      <span className="text-xs text-gray-500">{activity.user}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* System Status */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">System Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Website Status</p>
                <p className="text-xs text-gray-500">All systems operational</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Database</p>
                <p className="text-xs text-gray-500">Connected and healthy</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-warning rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Storage</p>
                <p className="text-xs text-gray-500">75% capacity used</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </>
  );

  const getSectionTitle = () => {
    switch (activeSection) {
      case 'products':
        return { title: 'Product Management', subtitle: 'Manage your product catalog' };
      case 'categories':
        return { title: 'Category Management', subtitle: 'Organize your product categories' };
      case 'media':
        return { title: 'Media Library', subtitle: 'Manage images and files' };
      case 'contacts':
        return { title: 'Contact Management', subtitle: 'Handle customer inquiries' };
      case 'dashboard':
      default:
        return { title: 'Dashboard', subtitle: 'Overview of your artificial stone business' };
    }
  };

  const sectionInfo = getSectionTitle();

  return (
    <AdminLayout
      title={sectionInfo.title}
      subtitle={sectionInfo.subtitle}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
    >
      {renderSectionContent()}
    </AdminLayout>
  );
};

export default AdminDashboard;