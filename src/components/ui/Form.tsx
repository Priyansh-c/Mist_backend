import React, { useState } from 'react';
import InputField from './InputField';
import Button from './Button';

interface FormField {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'number' | 'textarea';
  placeholder?: string;
  required?: boolean;
  rows?: number;
  validation?: (value: string) => string | null;
}

interface FormProps {
  fields: FormField[];
  onSubmit: (data: Record<string, string>) => void;
  submitLabel?: string;
  loading?: boolean;
  className?: string;
}

const Form: React.FC<FormProps> = ({
  fields,
  onSubmit,
  submitLabel = 'Submit',
  loading = false,
  className = ''
}) => {
  const [formData, setFormData] = useState<Record<string, string>>(() => {
    const initialData: Record<string, string> = {};
    fields.forEach(field => {
      initialData[field.name] = '';
    });
    return initialData;
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleFieldChange = (fieldName: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
    
    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: ''
      }));
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    fields.forEach(field => {
      const value = formData[field.name];
      
      // Required field validation
      if (field.required && !value.trim()) {
        newErrors[field.name] = `${field.label} is required`;
        return;
      }
      
      // Custom validation
      if (field.validation && value) {
        const validationError = field.validation(value);
        if (validationError) {
          newErrors[field.name] = validationError;
        }
      }
      
      // Email validation
      if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          newErrors[field.name] = 'Please enter a valid email address';
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      {fields.map((field) => (
        <InputField
          key={field.name}
          label={field.label}
          type={field.type}
          placeholder={field.placeholder}
          value={formData[field.name]}
          onChange={(value) => handleFieldChange(field.name, value)}
          required={field.required}
          error={errors[field.name]}
          rows={field.rows}
        />
      ))}
      
      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={loading}
        fullWidth
      >
        {submitLabel}
      </Button>
    </form>
  );
};

export default Form;