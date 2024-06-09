import React, { useState } from "react";

const Dialog = ({ children, open, onOpenChange }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-md shadow-lg max-w-lg w-full">
        {children}
      </div>
    </div>
  );
};

const DialogContent = ({ children, className, ...props }) => (
  <div className={`p-4 ${className}`} {...props}>
    {children}
  </div>
);

const DialogHeader = ({ children }) => <div className="border-b p-4">{children}</div>;
const DialogTitle = ({ children }) => <h2 className="text-lg font-semibold">{children}</h2>;
const DialogDescription = ({ children }) => <p className="text-sm text-gray-500">{children}</p>;
const DialogFooter = ({ children }) => <div className="border-t p-4 flex justify-end space-x-2">{children}</div>;

export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter };
