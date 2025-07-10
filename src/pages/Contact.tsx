import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { contactAPI, suggestionsAPI } from '../services/api';
import Form from '../components/ui/Form';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';

const Contact: React.FC = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuggestionModalOpen, setIsSuggestionModalOpen] = useState(false);
  const [isSuggestionSubmitted, setIsSuggestionSubmitted] = useState(false);
  const [isSuggestionLoading, setIsSuggestionLoading] = useState(false);
  const [error, setError] = useState<string>('');
  
  const contactFormFields = [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text' as const,
      required: true
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email' as const,
      required: true
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'tel' as const,
      placeholder: '+91 9999999999'
    },
    {
      name: 'subject',
      label: 'Subject',
      type: 'text' as const,
      required: true,
      placeholder: 'How can we help you?'
    },
    {
      name: 'message',
      label: 'Message',
      type: 'textarea' as const,
      required: true,
      placeholder: 'Tell us more about your inquiry...',
      rows: 6
    }
  ];
  
  const suggestionFormFields = [
    {
      name: 'cuisineName',
      label: 'Cuisine Name',
      type: 'text' as const,
      required: true,
      placeholder: 'e.g., Ethiopian Cuisine'
    },
    {
      name: 'country',
      label: 'Country/Region',
      type: 'text' as const,
      required: true,
      placeholder: 'e.g., Ethiopia'
    },
    {
      name: 'category',
      label: 'Category',
      type: 'text' as const,
      required: true,
      placeholder: 'e.g., African, European, Asian, Latin American'
    },
    {
      name: 'description',
      label: 'Brief Description',
      type: 'textarea' as const,
      required: true,
      placeholder: 'Describe the key characteristics, flavors, and what makes this cuisine unique...',
      rows: 4
    },
    {
      name: 'keyIngredients',
      label: 'Key Ingredients',
      type: 'textarea' as const,
      required: true,
      placeholder: 'List the main ingredients used in this cuisine (comma-separated)',
      rows: 3
    },
    {
      name: 'popularDishes',
      label: 'Popular Dishes',
      type: 'textarea' as const,
      required: true,
      placeholder: 'List some well-known dishes from this cuisine (comma-separated)',
      rows: 3
    },
    {
      name: 'culturalSignificance',
      label: 'Cultural Significance',
      type: 'textarea' as const,
      placeholder: 'Share any cultural or historical context about this cuisine...',
      rows: 4
    },
    {
      name: 'suggestedBy',
      label: 'Your Name',
      type: 'text' as const,
      required: true,
      placeholder: 'Your name'
    },
    {
      name: 'email',
      label: 'Your Email',
      type: 'email' as const,
      required: true,
      placeholder: 'your.email@example.com'
    }
  ];
  
  const handleFormSubmit = async (formData: Record<string, string>) => {
    setIsLoading(true);
    setError('');
    
    try {
      await contactAPI.submitContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message
      });
      
      setIsFormSubmitted(true);
    } catch (error: any) {
      console.error('Error submitting contact form:', error);
      setError(error.response?.data?.message || 'Failed to submit form. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSuggestionSubmit = async (formData: Record<string, string>) => {
    setIsSuggestionLoading(true);
    setError('');
    
    try {
      await suggestionsAPI.submitSuggestion({
        cuisineName: formData.cuisineName,
        country: formData.country,
        category: formData.category,
        description: formData.description,
        keyIngredients: formData.keyIngredients,
        popularDishes: formData.popularDishes,
        culturalSignificance: formData.culturalSignificance,
        suggestedBy: formData.suggestedBy,
        email: formData.email
      });
      
      setIsSuggestionModalOpen(false);
      setIsSuggestionSubmitted(true);
    } catch (error: any) {
      console.error('Error submitting suggestion:', error);
      setError(error.response?.data?.message || 'Failed to submit suggestion. Please try again.');
    } finally {
      setIsSuggestionLoading(false);
    }
  };
  
  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: '+9999999999',
      subtitle: 'Mon-Fri 9AM-6PM IST'
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'hello@worldcuisines.com',
      subtitle: 'We respond within 24 hours'
    },
    {
      icon: MapPin,
      title: 'Location',
      details: 'Whitefield',
      subtitle: 'Bangalore, KA 560067'
    },
    {
      icon: Clock,
      title: 'Hours',
      details: 'Mon-Fri: 9AM-6PM',
      subtitle: 'Sat-Sun: 10AM-4PM'
    }
  ];
  
  const faqs = [
    {
      question: 'How can I suggest a new cuisine to feature?',
      answer: 'We love hearing from our community! Send us an email with details about the cuisine you\'d like to see featured, including its origin, key characteristics, and why it should be included.'
    },
    {
      question: 'Do you provide recipes for the cuisines featured?',
      answer: 'While we focus on showcasing cuisines and their cultural significance, we can provide general information about traditional cooking methods and ingredients upon request.'
    },
    {
      question: 'Can I contribute content about my local cuisine?',
      answer: 'Absolutely! We welcome contributions from people passionate about their local food traditions. Contact us to discuss how you can share your culinary knowledge.'
    },
    {
      question: 'Is the information about cuisines historically accurate?',
      answer: 'We strive for accuracy and work with culinary historians and cultural experts to ensure our content is authentic and respectful of each cuisine\'s heritage.'
    },
    {
      question: 'How often do you add new cuisines?',
      answer: 'We regularly update our collection with new cuisines and expand existing entries. Follow us or check back monthly for new additions to our culinary showcase.'
    }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions about world cuisines or want to share your culinary knowledge? 
              We'd love to hear from you and learn about your food traditions.
            </p>
          </div>
        </div>
      </section>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}
              <Form
                fields={contactFormFields}
                onSubmit={handleFormSubmit}
                submitLabel="Send Message"
                loading={isLoading}
              />
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{info.title}</h4>
                      <p className="text-gray-700">{info.details}</p>
                      <p className="text-sm text-gray-500">{info.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-amber-800 mb-4">
                Share Your Culture
              </h3>
              <p className="text-amber-700 text-sm mb-4">
                Know about a cuisine that's not featured? Help us expand our collection!
              </p>
              <div className="space-y-3">
                <Button
                  variant="secondary"
                  fullWidth
                  icon={Mail}
                  className="justify-start"
                  onClick={() => setIsSuggestionModalOpen(true)}
                >
                  Suggest a Cuisine
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  icon={Mail}
                  className="justify-start"
                  onClick={() => window.location.href = '#reviews'}
                >
                  See Other Reviews
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <section className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Find quick answers to common questions about our cuisine showcase
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-200">
            {faqs.map((faq, index) => (
              <div key={index} className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
      
      {/* Success Modal */}
      <Modal
        isOpen={isFormSubmitted}
        onClose={() => setIsFormSubmitted(false)}
        title="Message Sent Successfully!"
        size="md"
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="h-8 w-8 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Thank you for reaching out!
            </h3>
            <p className="text-gray-600">
              We've received your message and will get back to you within 24 hours. 
              Keep exploring world cuisines!
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => setIsFormSubmitted(false)}
          >
            Continue Exploring
          </Button>
        </div>
      </Modal>
      
      {/* Cuisine Suggestion Modal */}
      <Modal
        isOpen={isSuggestionModalOpen}
        onClose={() => setIsSuggestionModalOpen(false)}
        title="Suggest a Cuisine"
        size="lg"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Help us expand our collection! Share details about a cuisine you'd like to see featured. 
            Your suggestion will help others discover new culinary traditions.
          </p>
          
          <Form
            fields={suggestionFormFields}
            onSubmit={handleSuggestionSubmit}
            submitLabel="Submit Suggestion"
            loading={isSuggestionLoading}
          />
        </div>
      </Modal>
      
      {/* Suggestion Success Modal */}
      <Modal
        isOpen={isSuggestionSubmitted}
        onClose={() => setIsSuggestionSubmitted(false)}
        title="Suggestion Submitted!"
        size="md"
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="h-8 w-8 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Thank you for your suggestion!
            </h3>
            <p className="text-gray-600">
              We've received your cuisine suggestion and will review it for inclusion in our collection. 
              Your contribution helps make our platform more diverse and comprehensive.
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => setIsSuggestionSubmitted(false)}
          >
            Continue Exploring
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Contact;