
import React from 'react';

const RecentPage: React.FC = () => {
  return (
    <div className="p-4 animate-fade-in">
      <h2 className="text-xl font-semibold text-on-surface mb-4">Recent Files</h2>
      <p className="text-on-surface-muted">This page will show recently accessed files.</p>
      {/* Placeholder content for recent files */}
      <div className="mt-4 p-6 bg-surface rounded-lg shadow">
        <p className="text-on-surface">Recent files functionality will be implemented here.</p>
      </div>
    </div>
  );
};

export default RecentPage;