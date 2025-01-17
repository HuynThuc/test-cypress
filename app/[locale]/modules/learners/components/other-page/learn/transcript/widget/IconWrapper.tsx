import React from 'react';

interface IconWrapperProps {
  children: React.ReactNode;
}

const IconWrapper: React.FC<IconWrapperProps> = ({ children }) => {
  return (
    <div className="w-5 h-5 rounded-md shadow-e1 flex items-center justify-center bg-background text-text-light">
      {children}
    </div>
  );
};

export default IconWrapper;
