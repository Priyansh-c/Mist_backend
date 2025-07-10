import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface InputFieldProps {
  label?: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'number' | 'textarea';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  icon?: LucideIcon;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  rows?: number;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  icon: Icon,
  error,
  disabled = false,
  required = false,
  rows = 4,
  className = ''
}) => {
  const baseClasses = 'w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed';
  
  const errorClasses = error 
    ? 'border-red-500 focus:ring-red-500' 
    : 'border-gray-300 hover:border-gray-400';
  
  const iconPadding = Icon ? 'pl-11' : '';
  
  const inputClasses = `${baseClasses} ${errorClasses} ${iconPadding} ${className}`;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };
  
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        
        {type === 'textarea' ? (
          <textarea
            className={inputClasses}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            required={required}
            rows={rows}
          />
        ) : (
          <input
            type={type}
            className={inputClasses}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            required={required}
          />
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default InputField;