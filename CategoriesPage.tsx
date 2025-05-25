
import React from 'react';

const CategoriesPage: React.FC = () => {
  return (
    <div className="p-4 animate-fade-in">
      <h2 className="text-xl font-semibold text-on-surface mb-4">Categories</h2>
      <p className="text-on-surface-muted">Browse files by category (Images, Videos, Documents, etc.).</p>
      {/* Placeholder content for categories */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
        {['Images', 'Videos', 'Audio', 'Documents', 'Archives', 'Others'].map(category => (
          <div key={category} className="p-6 bg-surface rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer">
            <p className="text-on-surface font-medium text-center">{category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;