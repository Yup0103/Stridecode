import React from 'react';
import Icon from './Icon';

const Header: React.FC = () => {
  return (
    <header className="bg-dark-bg/80 backdrop-blur-sm border-b border-dark-border sticky top-0 z-10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="walking" className="w-6 h-6 text-accent-cyan" />
          <h1 className="text-xl font-bold font-mono text-light-text tracking-tight">StrideCode</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;