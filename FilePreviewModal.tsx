
import React from 'react';
import { FileSystemObject, FileObjectType } from '../types';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { getFileIconByExtension, formatFileSize, formatDate } from '../constants';

interface FilePreviewModalProps {
  item: FileSystemObject | null;
  isOpen: boolean;
  onClose: () => void;
}

const FilePreviewModal: React.FC<FilePreviewModalProps> = ({ item, isOpen, onClose }) => {
  if (!isOpen || !item) return null;

  const getPreviewContent = () => {
    if (item.type === FileObjectType.FOLDER) {
      return <p className="text-on-surface-muted">Folders cannot be previewed directly.</p>;
    }

    const extension = item.extension?.toLowerCase();
    const mimeType = item.mimeType?.toLowerCase();

    if (mimeType?.startsWith('image/')) {
      // For a real app, you'd use item.path or a data URL if content is embedded
      return <img src={`https://via.placeholder.com/400x300?text=${item.name}`} alt={item.name} className="max-w-full max-h-96 object-contain rounded" />;
    }
    if (mimeType?.startsWith('video/')) {
      return (
        <div className="bg-black rounded">
          <video controls className="max-w-full max-h-96">
            {/* In a real app, src would be item.path or a data URL */}
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    }
    if (mimeType?.startsWith('audio/')) {
         return (
        <div className="p-4">
          <audio controls className="w-full">
            {/* In a real app, src would be item.path or a data URL */}
            <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      );
    }
    if (mimeType === 'application/pdf') {
      return <p className="text-on-surface-muted">PDF preview is not available in this demo. File: {item.name}</p>;
      // For a real app, you might embed a PDF viewer or link to it
      // <iframe src={`/path/to/your/pdf/viewer?file=${item.path}`} className="w-full h-96" title={item.name}></iframe>
    }
    if (mimeType === 'text/plain' && item.content) {
      return <pre className="bg-gray-700 p-3 rounded text-sm text-on-surface whitespace-pre-wrap max-h-80 overflow-y-auto">{item.content}</pre>;
    }
    if (item.extension && ['txt', 'md', 'json', 'xml', 'html', 'css', 'js', 'ts'].includes(item.extension)) {
         return <pre className="bg-gray-700 p-3 rounded text-sm text-on-surface whitespace-pre-wrap max-h-80 overflow-y-auto">{item.content || "No preview content available for this text-based file."}</pre>;
    }

    return <p className="text-on-surface-muted">No preview available for this file type ({item.extension || 'unknown'}).</p>;
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="file-preview-title"
    >
      <div 
        className="bg-surface p-6 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col animate-slide-up"
        onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="mr-3 w-6 h-6 flex-shrink-0">{getFileIconByExtension(item.extension, item.type)}</div>
            <h2 id="file-preview-title" className="text-xl font-semibold text-on-surface truncate pr-2" title={item.name}>{item.name}</h2>
          </div>
          <button 
            onClick={onClose} 
            className="text-on-surface-muted hover:text-on-surface"
            aria-label="Close preview"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        
        <div className="overflow-y-auto mb-4 flex-grow flex items-center justify-center">
          {getPreviewContent()}
        </div>

        <div className="text-sm text-on-surface-muted border-t border-gray-700 pt-4">
          <p><strong>Size:</strong> {formatFileSize(item.size)}</p>
          <p><strong>Modified:</strong> {formatDate(item.modifiedDate)}</p>
          <p><strong>Type:</strong> {item.mimeType || item.extension || (item.type === FileObjectType.FOLDER ? 'Folder' : 'Unknown')}</p>
          <p><strong>Path:</strong> {item.path}</p>
        </div>
      </div>
    </div>
  );
};

export default FilePreviewModal;