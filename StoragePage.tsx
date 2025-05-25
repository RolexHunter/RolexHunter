
import React from 'react';

const StoragePage: React.FC = () => {
  return (
    <div className="p-4 animate-fade-in">
      <h2 className="text-xl font-semibold text-on-surface mb-4">Storage Information</h2>
      <p className="text-on-surface-muted">Details about internal storage and SD card (if available).</p>
      {/* Placeholder content for storage info */}
      <div className="mt-4 space-y-4">
        <div className="p-6 bg-surface rounded-lg shadow">
          <h3 className="text-lg font-medium text-on-surface">Internal Storage</h3>
          <p className="text-on-surface-muted text-sm">Simulated: 50 GB used of 128 GB</p>
          <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
            <div className="bg-primary h-2.5 rounded-full" style={{ width: `${(50/128)*100}%` }}></div>
          </div>
        </div>
        <div className="p-6 bg-surface rounded-lg shadow">
          <h3 className="text-lg font-medium text-on-surface">SD Card</h3>
          <p className="text-on-surface-muted text-sm">Simulated: Not available (This is a web demo)</p>
        </div>
      </div>
    </div>
  );
};

export default StoragePage;