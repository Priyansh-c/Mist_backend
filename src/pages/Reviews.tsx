import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mail, Calendar, User, MessageSquare, Filter, Search } from 'lucide-react';
import { contactAPI } from '../services/api';
import { ContactMessage } from '../types/api';
import Button from '../components/ui/Button';
import InputField from '../components/ui/InputField';

interface ReviewsProps {
  onNavigate: (page: string) => void;
}

const Reviews: React.FC<ReviewsProps> = ({ onNavigate }) => {
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await contactAPI.getContacts();
      setContacts(response.data || []);
    } catch (error: any) {
      console.error('Error fetching contacts:', error);
      setError('Failed to load reviews. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'read': return 'bg-yellow-100 text-yellow-800';
      case 'responded': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="outline"
            size="sm"
            icon={ArrowLeft}
            onClick={() => onNavigate('contact')}
            className="border-none mb-4"
          >
            Back to Contact
          </Button>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Community Reviews & Messages
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See what our community is saying about world cuisines and their experiences
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              placeholder="Search reviews..."
              value={searchTerm}
              onChange={setSearchTerm}
              icon={Search}
            />
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="all">All Messages</option>
              <option value="new">New</option>
              <option value="read">Read</option>
              <option value="responded">Responded</option>
            </select>
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredContacts.length} of {contacts.length} messages
          </div>
        </div>

        {/* Reviews Grid */}
        {filteredContacts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContacts.map((contact) => (
              <div key={contact._id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                      <p className="text-sm text-gray-500">{contact.email}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contact.status)}`}>
                    {contact.status}
                  </span>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2 text-amber-500" />
                    {contact.subject}
                  </h4>
                  <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
                    {contact.message}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDate(contact.createdAt)}
                  </div>
                  {contact.phone && (
                    <div className="flex items-center">
                      <Mail className="h-3 w-3 mr-1" />
                      Contact available
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No messages found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search criteria' 
                : 'No community messages have been submitted yet'}
            </p>
            <Button
              variant="primary"
              onClick={() => onNavigate('contact')}
            >
              Submit a Message
            </Button>
          </div>
        )}

        {/* Stats */}
        <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Community Stats</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">{contacts.length}</div>
              <div className="text-sm text-gray-600">Total Messages</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {contacts.filter(c => c.status === 'new').length}
              </div>
              <div className="text-sm text-gray-600">New Messages</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {contacts.filter(c => c.status === 'responded').length}
              </div>
              <div className="text-sm text-gray-600">Responded</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {new Set(contacts.map(c => c.email)).size}
              </div>
              <div className="text-sm text-gray-600">Unique Contributors</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;