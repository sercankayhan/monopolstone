import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card, Modal, LoadingSpinner, Input } from '../ui';

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'closed';
  priority: 'low' | 'medium' | 'high';
  notes: string;
  createdAt: string;
  updatedAt: string;
}

const ContactManagement: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const [notes, setNotes] = useState('');
  const [bulkAction, setBulkAction] = useState('');
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

  // Mock data - replace with actual API call
  const mockContacts: Contact[] = [
    {
      _id: '1',
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+1 (555) 123-4567',
      company: 'ABC Construction',
      subject: 'Kitchen Countertop Inquiry',
      message: 'Hi, I\'m interested in your marble elegance series for my kitchen renovation project. Could you please provide pricing and availability information?',
      status: 'new',
      priority: 'high',
      notes: '',
      createdAt: '2024-01-25T10:30:00Z',
      updatedAt: '2024-01-25T10:30:00Z',
    },
    {
      _id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '',
      company: 'Interior Design Studio',
      subject: 'Bulk Order Quote Request',
      message: 'We\'re working on a commercial project and need pricing for bathroom vanities. Looking for 20 units of your industrial concrete collection.',
      status: 'read',
      priority: 'high',
      notes: 'Called client - waiting for project specifications',
      createdAt: '2024-01-24T14:20:00Z',
      updatedAt: '2024-01-25T09:15:00Z',
    },
    {
      _id: '3',
      name: 'Michael Brown',
      email: 'mbrown@residential.com',
      phone: '+1 (555) 987-6543',
      company: '',
      subject: 'Wall Cladding Options',
      message: 'Looking for outdoor wall cladding solutions for a residential project. Need weather-resistant options.',
      status: 'replied',
      priority: 'medium',
      notes: 'Sent catalog and pricing. Follow up in 1 week.',
      createdAt: '2024-01-23T16:45:00Z',
      updatedAt: '2024-01-24T11:30:00Z',
    },
    {
      _id: '4',
      name: 'Emily Davis',
      email: 'emily.davis@homeowner.com',
      phone: '+1 (555) 456-7890',
      company: '',
      subject: 'Maintenance Instructions',
      message: 'I purchased your flooring products last year. Could you send me the maintenance guidelines?',
      status: 'closed',
      priority: 'low',
      notes: 'Maintenance guide sent. Issue resolved.',
      createdAt: '2024-01-22T11:15:00Z',
      updatedAt: '2024-01-22T15:20:00Z',
    },
    {
      _id: '5',
      name: 'David Wilson',
      email: 'dwilson@contractor.com',
      phone: '+1 (555) 234-5678',
      company: 'Wilson Contractors',
      subject: 'Installation Services',
      message: 'Do you provide installation services for your products? We have a large commercial project coming up.',
      status: 'new',
      priority: 'medium',
      notes: '',
      createdAt: '2024-01-25T08:45:00Z',
      updatedAt: '2024-01-25T08:45:00Z',
    },
  ];

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setContacts(mockContacts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } catch (error) {
      console.error('Error loading contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || contact.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: Contact['status']) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'read':
        return 'bg-yellow-100 text-yellow-800';
      case 'replied':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: Contact['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-error/10 text-error';
      case 'medium':
        return 'bg-warning/10 text-warning';
      case 'low':
        return 'bg-success/10 text-success';
      default:
        return 'bg-gray-100 text-gray-600';
    }
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

  const openDetailModal = (contact: Contact) => {
    setSelectedContact(contact);
    setNotes(contact.notes);
    setDetailModalOpen(true);
    
    // Mark as read if it's new
    if (contact.status === 'new') {
      updateContactStatus(contact._id, 'read');
    }
  };

  const openReplyModal = (contact: Contact) => {
    setSelectedContact(contact);
    setReplyMessage(`Dear ${contact.name},\n\nThank you for your inquiry regarding "${contact.subject}".\n\n\n\nBest regards,\nArtificialStone Team`);
    setReplyModalOpen(true);
  };

  const updateContactStatus = async (contactId: string, newStatus: Contact['status']) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      setContacts(prev => prev.map(c => 
        c._id === contactId 
          ? { ...c, status: newStatus, updatedAt: new Date().toISOString() }
          : c
      ));
    } catch (error) {
      console.error('Error updating contact status:', error);
    }
  };

  const updateContactPriority = async (contactId: string, newPriority: Contact['priority']) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      setContacts(prev => prev.map(c => 
        c._id === contactId 
          ? { ...c, priority: newPriority, updatedAt: new Date().toISOString() }
          : c
      ));
    } catch (error) {
      console.error('Error updating contact priority:', error);
    }
  };

  const saveNotes = async () => {
    if (!selectedContact) return;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setContacts(prev => prev.map(c => 
        c._id === selectedContact._id 
          ? { ...c, notes: notes, updatedAt: new Date().toISOString() }
          : c
      ));
      setDetailModalOpen(false);
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  };

  const sendReply = async () => {
    if (!selectedContact || !replyMessage.trim()) return;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update contact status to replied
      setContacts(prev => prev.map(c => 
        c._id === selectedContact._id 
          ? { ...c, status: 'replied', updatedAt: new Date().toISOString() }
          : c
      ));
      
      setReplyModalOpen(false);
      setReplyMessage('');
    } catch (error) {
      console.error('Error sending reply:', error);
    }
  };

  const handleBulkAction = async () => {
    if (!bulkAction || selectedContacts.length === 0) return;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (bulkAction.startsWith('status-')) {
        const newStatus = bulkAction.replace('status-', '') as Contact['status'];
        setContacts(prev => prev.map(c => 
          selectedContacts.includes(c._id) 
            ? { ...c, status: newStatus, updatedAt: new Date().toISOString() }
            : c
        ));
      } else if (bulkAction.startsWith('priority-')) {
        const newPriority = bulkAction.replace('priority-', '') as Contact['priority'];
        setContacts(prev => prev.map(c => 
          selectedContacts.includes(c._id) 
            ? { ...c, priority: newPriority, updatedAt: new Date().toISOString() }
            : c
        ));
      }
      
      setSelectedContacts([]);
      setBulkAction('');
    } catch (error) {
      console.error('Error performing bulk action:', error);
    }
  };

  const toggleContactSelection = (contactId: string) => {
    setSelectedContacts(prev => 
      prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const selectAllContacts = () => {
    if (selectedContacts.length === filteredContacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(filteredContacts.map(c => c._id));
    }
  };

  const getStatusStats = () => {
    const stats = {
      new: contacts.filter(c => c.status === 'new').length,
      read: contacts.filter(c => c.status === 'read').length,
      replied: contacts.filter(c => c.status === 'replied').length,
      closed: contacts.filter(c => c.status === 'closed').length,
    };
    return stats;
  };

  const stats = getStatusStats();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">New</p>
              <p className="text-2xl font-bold text-gray-900">{stats.new}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Read</p>
              <p className="text-2xl font-bold text-gray-900">{stats.read}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Replied</p>
              <p className="text-2xl font-bold text-gray-900">{stats.replied}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Closed</p>
              <p className="text-2xl font-bold text-gray-900">{stats.closed}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          {/* Search */}
          <div className="relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full sm:w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
              <option value="closed">Closed</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedContacts.length > 0 && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">
              {selectedContacts.length} selected
            </span>
            
            <select
              value={bulkAction}
              onChange={(e) => setBulkAction(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="">Bulk Actions</option>
              <optgroup label="Change Status">
                <option value="status-read">Mark as Read</option>
                <option value="status-replied">Mark as Replied</option>
                <option value="status-closed">Mark as Closed</option>
              </optgroup>
              <optgroup label="Change Priority">
                <option value="priority-high">Set High Priority</option>
                <option value="priority-medium">Set Medium Priority</option>
                <option value="priority-low">Set Low Priority</option>
              </optgroup>
            </select>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleBulkAction}
              disabled={!bulkAction}
            >
              Apply
            </Button>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {filteredContacts.length} of {contacts.length} contacts
        </p>
        
        <label className="flex items-center text-sm text-gray-600">
          <input
            type="checkbox"
            checked={selectedContacts.length === filteredContacts.length && filteredContacts.length > 0}
            onChange={selectAllContacts}
            className="mr-2 rounded border-gray-300 text-primary focus:border-primary focus:ring-primary"
          />
          Select All
        </label>
      </div>

      {/* Contacts List */}
      <AnimatePresence mode="wait">
        {filteredContacts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12"
          >
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts found</h3>
            <p className="text-gray-500">
              {searchTerm || statusFilter !== 'all' || priorityFilter !== 'all'
                ? 'Try adjusting your search or filters'
                : 'No contact inquiries have been received yet'
              }
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {filteredContacts.map((contact, index) => (
              <motion.div
                key={contact._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                layout
              >
                <Card className={`p-6 transition-all duration-200 ${selectedContacts.includes(contact._id) ? 'ring-2 ring-primary bg-primary/5' : 'hover:shadow-md'}`}>
                  <div className="flex items-start space-x-4">
                    <input
                      type="checkbox"
                      checked={selectedContacts.includes(contact._id)}
                      onChange={() => toggleContactSelection(contact._id)}
                      className="mt-1 rounded border-gray-300 text-primary focus:border-primary focus:ring-primary"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-medium text-gray-900">
                              {contact.name}
                            </h3>
                            
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(contact.status)}`}>
                                {contact.status}
                              </span>
                              
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(contact.priority)}`}>
                                {contact.priority} priority
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                            <div>
                              <p className="text-sm text-gray-600">Email: {contact.email}</p>
                              {contact.phone && (
                                <p className="text-sm text-gray-600">Phone: {contact.phone}</p>
                              )}
                              {contact.company && (
                                <p className="text-sm text-gray-600">Company: {contact.company}</p>
                              )}
                            </div>
                            
                            <div>
                              <p className="text-sm text-gray-600">Subject: {contact.subject}</p>
                              <p className="text-sm text-gray-600">Received: {formatDate(contact.createdAt)}</p>
                              <p className="text-sm text-gray-600">Updated: {formatDate(contact.updatedAt)}</p>
                            </div>
                          </div>

                          <p className="text-gray-700 text-sm line-clamp-3 mb-4">
                            {contact.message}
                          </p>

                          {contact.notes && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                              <p className="text-sm text-yellow-800">
                                <span className="font-medium">Notes:</span> {contact.notes}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-start space-x-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openDetailModal(contact)}
                          >
                            View Details
                          </Button>
                          
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => openReplyModal(contact)}
                            leftIcon={
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                              </svg>
                            }
                          >
                            Reply
                          </Button>

                          {/* Quick Status Actions */}
                          <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                            <button
                              onClick={() => updateContactStatus(contact._id, 'read')}
                              className={`p-2 text-xs ${contact.status === 'read' ? 'bg-yellow-100 text-yellow-800' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                              title="Mark as Read"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </button>
                            
                            <button
                              onClick={() => updateContactStatus(contact._id, 'replied')}
                              className={`p-2 text-xs ${contact.status === 'replied' ? 'bg-green-100 text-green-800' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                              title="Mark as Replied"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                            </button>
                            
                            <button
                              onClick={() => updateContactStatus(contact._id, 'closed')}
                              className={`p-2 text-xs ${contact.status === 'closed' ? 'bg-gray-100 text-gray-800' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                              title="Mark as Closed"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </button>
                          </div>
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

      {/* Contact Detail Modal */}
      <Modal
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        title="Contact Details"
        size="lg"
      >
        {selectedContact && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Contact Information</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="text-gray-600">Name:</span> {selectedContact.name}</p>
                  <p><span className="text-gray-600">Email:</span> {selectedContact.email}</p>
                  {selectedContact.phone && (
                    <p><span className="text-gray-600">Phone:</span> {selectedContact.phone}</p>
                  )}
                  {selectedContact.company && (
                    <p><span className="text-gray-600">Company:</span> {selectedContact.company}</p>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Status & Priority</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Status</label>
                    <select
                      value={selectedContact.status}
                      onChange={(e) => updateContactStatus(selectedContact._id, e.target.value as Contact['status'])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                    >
                      <option value="new">New</option>
                      <option value="read">Read</option>
                      <option value="replied">Replied</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Priority</label>
                    <select
                      value={selectedContact.priority}
                      onChange={(e) => updateContactPriority(selectedContact._id, e.target.value as Contact['priority'])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Subject</h4>
              <p className="text-sm text-gray-700">{selectedContact.subject}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Message</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedContact.message}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Internal Notes
              </label>
              <textarea
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Add internal notes about this contact..."
              />
            </div>

            <div className="flex justify-between">
              <div className="text-xs text-gray-500">
                <p>Created: {formatDate(selectedContact.createdAt)}</p>
                <p>Updated: {formatDate(selectedContact.updatedAt)}</p>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setDetailModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={saveNotes}
                >
                  Save Notes
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Reply Modal */}
      <Modal
        isOpen={replyModalOpen}
        onClose={() => setReplyModalOpen(false)}
        title="Reply to Contact"
        size="lg"
      >
        {selectedContact && (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Original Message</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p><span className="font-medium">From:</span> {selectedContact.name} ({selectedContact.email})</p>
                <p><span className="font-medium">Subject:</span> {selectedContact.subject}</p>
              </div>
              <div className="mt-3 p-3 bg-white rounded border">
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedContact.message}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Your Reply
              </label>
              <textarea
                rows={12}
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Type your reply..."
              />
            </div>

            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setReplyModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={sendReply}
                disabled={!replyMessage.trim()}
              >
                Send Reply
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ContactManagement;