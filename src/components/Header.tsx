import React from 'react';
import { Sprout, Leaf } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-4 md:px-8 flex items-center justify-between border-b border-olive-200 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <div className="bg-olive-600 p-2 rounded-full text-white">
          <Sprout size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-serif font-bold text-olive-900 leading-none">AgroSolve AI</h1>
          <p className="text-xs text-olive-600 font-medium uppercase tracking-wider">Agricultural Intelligence</p>
        </div>
      </div>
      
      <nav className="hidden md:flex items-center gap-6">
        <a href="#" className="text-sm font-medium text-olive-700 hover:text-olive-900 transition-colors">Dashboard</a>
        <a href="#" className="text-sm font-medium text-olive-700 hover:text-olive-900 transition-colors">Resources</a>
        <a href="#" className="text-sm font-medium text-olive-700 hover:text-olive-900 transition-colors">Community</a>
        <button className="bg-olive-700 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-olive-800 transition-colors flex items-center gap-2">
          <Leaf size={16} />
          Get Advice
        </button>
      </nav>
    </header>
  );
};
