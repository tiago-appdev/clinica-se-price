/* eslint-disable react/prop-types */
import React from 'react';
import './DropdownMenu.module.css'; 

export const DropdownMenu = ({ children }) => {
  return <div className="dropdown-menu">{children}</div>;
};

export const DropdownMenuTrigger = ({ children }) => {
  return (
    <div className="dropdown-trigger">
      {React.cloneElement(children, { className: `${children.props.className} dropdown-trigger-button` })}
    </div>
  );
};

export const DropdownMenuContent = ({ align = "start", children }) => {
  return (
    <div className={`dropdown-content dropdown-content-${align}`}>
      {children}
    </div>
  );
};

export const DropdownMenuLabel = ({ children }) => {
  return <div className="dropdown-label">{children}</div>;
};

export const DropdownMenuSeparator = () => {
  return <div className="dropdown-separator" />;
};

export const DropdownMenuItem = ({ children, onClick }) => {
  return (
    <div className="dropdown-item" onClick={onClick}>
      {children}
    </div>
  );
};
