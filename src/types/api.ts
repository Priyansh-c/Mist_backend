export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'new' | 'read' | 'responded';
}

export interface CuisineSuggestion {
  _id: string;
  cuisineName: string;
  country: string;
  category: string;
  description: string;
  keyIngredients: string;
  popularDishes: string;
  culturalSignificance?: string;
  suggestedBy: string;
  email: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}