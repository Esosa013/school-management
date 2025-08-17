// Input.tsx

import React from 'react';

interface InputProps {
  type: string;
  value: string;  // Ensure `value` is typed here
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

const Input = ({ type, value, onChange, placeholder, className }: InputProps) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`px-3 py-2 rounded-md border ${className}`}
    />
  );
};

export { Input };
