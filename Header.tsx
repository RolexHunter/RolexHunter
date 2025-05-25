
import React from 'react';
import { APP_TITLE } from '../constants';
import { SortOption } from '../types';
import { FunnelIcon, MagnifyingGlassIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline'; // Example icons

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, onSearchChange, sortOption, onSortChange }) => {
  
  const handleSortFieldChange = (field: SortOption['field']) => {
    onSortChange({ ...sortOption, field });
  };

  const toggleSortOrder = () => {
    onSortChange({ ...sortOption, order: sortOption.order === 'asc' ? 'desc' : 'asc' });
  };

  return (
    <header className="bg-surface shadow-md p-4 sticky top-0 z-10">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold text-primary mb-2 sm:mb-0">{APP_TITLE}</h1>
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full p-2 pl-10 rounded-lg bg-background border border-gray-700 focus:ring-primary focus:border-primary text-on-surface placeholder-on-surface-muted"
            />
            <MagnifyingGlassIcon className="w-5 h-5 text-on-surface-muted absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          <div className="flex items-center space-x-2">
             <FunnelIcon className="w-5 h-5 text-on-surface-muted" />
            <select 
              value={sortOption.field} 
              onChange={(e) => handleSortFieldChange(e.target.value as SortOption['field'])}
              className="bg-background border border-gray-700 rounded-md p-2 text-on-surface focus:ring-primary focus:border-primary"
            >
              <option value="name">Name</option>
              <option value="size">Size</option>
              <option value="modifiedDate">Date</option>
            </select>
            <button onClick={toggleSortOrder} className="p-2 bg-background border border-gray-700 rounded-md hover:bg-gray-700">
              {sortOption.order === 'asc' ? 
                <ArrowUpIcon className="w-5 h-5 text-on-surface" /> : 
                <ArrowDownIcon className="w-5 h-5 text-on-surface" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
