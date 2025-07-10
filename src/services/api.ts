import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Contact API
export const contactAPI = {
  // Submit contact form
  submitContact: async (data: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }) => {
    const response = await api.post('/contact', data);
    return response.data;
  },

  // Get all contact messages (for reviews)
  getContacts: async () => {
    const response = await api.get('/contact');
    return response.data;
  },

  // Update contact status
  updateContactStatus: async (id: string, status: 'new' | 'read' | 'responded') => {
    const response = await api.put(`/contact/${id}/status`, { status });
    return response.data;
  }
};

// Cuisine Suggestions API
export const suggestionsAPI = {
  // Submit cuisine suggestion
  submitSuggestion: async (data: {
    cuisineName: string;
    country: string;
    category: string;
    description: string;
    keyIngredients: string;
    popularDishes: string;
    culturalSignificance?: string;
    suggestedBy: string;
    email: string;
  }) => {
    const response = await api.post('/suggestions', data);
    return response.data;
  },

  // Get all suggestions
  getSuggestions: async () => {
    const response = await api.get('/suggestions');
    return response.data;
  }
};

export default api;