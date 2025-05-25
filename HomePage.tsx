
import React from 'react';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { FileSystemObject, FileObjectType } from '../types';
import { getFileIconByExtension, formatFileSize, formatDate } from '../constants';
import FilePreviewModal from '../components/FilePreviewModal'; // Assuming you might want this later

const HomePage: React.FC = () => {
  const { 
    fileSystem, 
    getChildren, 
    navigateTo, 
    navigateBack, 
    currentPath, 
    getBreadcrumbs, 
    searchTerm, 
    sortOption,
    selectedItem,
    setSelectedItem,
    isFilePreviewOpen,
    setFilePreviewOpen
  } = useAppContext();
  
  const params = useParams();
  const navigate = useNavigate(); // for programmatic navigation via path string

  // Determine current folderId based on currentPath or root
  const currentFolderId = React.useMemo(() => {
    if (currentPath === '/') return 'root';
    // Find the folder that matches the currentPath
    const foundItem = Object.values(fileSystem).find(item => item.path === currentPath && item.type === FileObjectType.FOLDER);
    return foundItem ? foundItem.id : 'root';
  }, [currentPath, fileSystem]);

  const items = React.useMemo(() => {
    let children = getChildren(currentFolderId);

    // Filter by search term
    if (searchTerm) {
      children = children.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // Sort items
    children.sort((a, b) => {
      const field = sortOption.field;
      const order = sortOption.order === 'asc' ? 1 : -1;

      let valA = a[field];
      let valB = b[field];

      if (field === 'modifiedDate') {
        valA = a.modifiedDate ? a.modifiedDate.getTime() : 0;
        valB = b.modifiedDate ? b.modifiedDate.getTime() : 0;
      }
      
      if (field === 'size') {
        valA = a.size ?? (a.type === FileObjectType.FOLDER ? -1 : 0); // Folders first or based on content if calculated
        valB = b.size ?? (b.type === FileObjectType.FOLDER ? -1 : 0);
      }


      if (typeof valA === 'string' && typeof valB === 'string') {
        return valA.localeCompare(valB) * order;
      }
      if (typeof valA === 'number' && typeof valB === 'number') {
        return (valA - valB) * order;
      }
      return 0;
    });

    // Ensure folders are listed before files if not sorting by name primarily
    if (sortOption.field !== 'name') {
        children.sort((a,b) => {
            if (a.type === FileObjectType.FOLDER && b.type !== FileObjectType.FOLDER) return -1;
            if (a.type !== FileObjectType.FOLDER && b.type === FileObjectType.FOLDER) return 1;
            return 0;
        });
    }


    return children;
  }, [currentFolderId, getChildren, searchTerm, sortOption, fileSystem]);

  const breadcrumbs = getBreadcrumbs();

  const handleItemClick = (item: FileSystemObject) => {
    if (item.type === FileObjectType.FOLDER) {
      navigateTo(item.id);
      // Update URL to reflect folder navigation
      navigate(`/home${item.path === '/' ? '' : item.path}`);
    } else {
      // Handle file click (e.g., open preview)
      setSelectedItem(item);
      setFilePreviewOpen(true);
    }
  };
  
  const handleBreadcrumbClick = (path: string) => {
    if (path === '/') {
      navigateTo('root');
      navigate('/home');
    } else {
      const targetFolder = Object.values(fileSystem).find(f => f.path === path && f.type === FileObjectType.FOLDER);
      if (targetFolder) {
        navigateTo(targetFolder.id);
        navigate(`/home${targetFolder.path}`);
      }
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Breadcrumbs */}
      <nav className="mb-4 text-sm text-on-surface-muted" aria-label="Breadcrumb">
        <ol className="list-none p-0 inline-flex space-x-2">
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.path} className="flex items-center">
              {index > 0 && <span className="mx-2">/</span>}
              {index === breadcrumbs.length - 1 ? (
                <span className="font-semibold text-on-surface">{crumb.name}</span>
              ) : (
                <button onClick={() => handleBreadcrumbClick(crumb.path)} className="hover:underline hover:text-primary">
                  {crumb.name}
                </button>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* File/Folder listing */}
      {items.length === 0 && (
        <p className="text-on-surface-muted text-center py-8">This folder is empty or no items match your search.</p>
      )}
      <ul className="space-y-2">
        {items.map(item => (
          <li 
            key={item.id} 
            onClick={() => handleItemClick(item)}
            onDoubleClick={() => item.type === FileObjectType.FOLDER ? handleItemClick(item) : null}
            className="flex items-center p-3 bg-surface rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer animate-slide-up"
            role="button"
            tabIndex={0}
            aria-label={`Open ${item.name}`}
            onKeyPress={(e) => e.key === 'Enter' && handleItemClick(item)}
          >
            <div className="mr-3 w-6 h-6 flex-shrink-0">{getFileIconByExtension(item.extension, item.type)}</div>
            <div className="flex-grow truncate">
              <p className="font-medium text-on-surface">{item.name}</p>
              <p className="text-xs text-on-surface-muted">
                {item.type === FileObjectType.FILE && item.modifiedDate ? formatDate(item.modifiedDate) : 'Folder'}
              </p>
            </div>
            {item.type === FileObjectType.FILE && item.size !== undefined && (
              <div className="text-sm text-on-surface-muted ml-4 w-24 text-right flex-shrink-0">{formatFileSize(item.size)}</div>
            )}
          </li>
        ))}
      </ul>
      {selectedItem && isFilePreviewOpen && (
        <FilePreviewModal 
          item={selectedItem} 
          isOpen={isFilePreviewOpen} 
          onClose={() => setFilePreviewOpen(false)} 
        />
      )}
    </div>
  );
};

export default HomePage;