import React from 'react';

const Input = ({ className, ...props }) => {
  return (
    <input
      className={`block w-full px-3 py-2 border rounded-md text-sm text-gray-700 focus:ring-1 focus:ring-primary focus:border-primary ${className}`}
      {...props}
    />
  );
};

export default Input;
