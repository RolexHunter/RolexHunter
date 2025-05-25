
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { SortOption, FileSystemObject, FileSystemCollection, FileObjectType } from '../types';
import { DEFAULT_SORT_OPTION, INITIAL_FILESYSTEM_DATA } from '../constants';

interface AppContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
  fileSystem: FileSystemCollection;
  setFileSystem: React.Dispatch<React.SetStateAction<FileSystemCollection>>;
  getItem: (id: string) => FileSystemObject | undefined;
  getChildren: (parentId: string | null) => FileSystemObject[];
  currentPath: string; // e.g. /Documents/Reports
  setCurrentPath: (path: string) => void; // Setter for currentPath
  navigateTo: (folderId: string) => void;
  navigateBack: () => void;
  getBreadcrumbs: () => { name: string, path: string }[];
  createFolder: (name: string, parentId: string) => void;
  renameItem: (id: string, newName: string) => void;
  deleteItem: (id: string) => void;
  selectedItem: FileSystemObject | null;
  setSelectedItem: (item: FileSystemObject | null) => void;
  isFilePreviewOpen: boolean;
  setFilePreviewOpen: (isOpen: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOption, setSortOption] = useState<SortOption>(DEFAULT_SORT_OPTION);
  const [fileSystem, setFileSystem] = useState<FileSystemCollection>(INITIAL_FILESYSTEM_DATA);
  const [currentPath, setCurrentPathState] = useState<string>('/'); // Represents the path string like '/folder1/subfolderA'
  const [currentFolderId, setCurrentFolderId] = useState<string>('root');

  const [selectedItem, setSelectedItem] = useState<FileSystemObject | null>(null);
  const [isFilePreviewOpen, setFilePreviewOpen] = useState<boolean>(false);
  
  const getItem = useCallback((id: string) => fileSystem[id], [fileSystem]);

  const getChildren = useCallback((parentIdToQuery: string | null) => {
    const idToQuery = parentIdToQuery === '/' ? 'root' : parentIdToQuery; // map path '/' to 'root' id
    if (!idToQuery) return []; // Should not happen with root
    
    const parent = fileSystem[idToQuery];
    if (parent && parent.type === FileObjectType.FOLDER && parent.childrenIds) {
      return parent.childrenIds.map(childId => fileSystem[childId]).filter(Boolean) as FileSystemObject[];
    }
    return [];
  }, [fileSystem]);


  const setCurrentPath = useCallback((path: string) => {
    const segments = path.split('/').filter(Boolean);
    let currentId = 'root';
    let resolvedPath = '/';

    for (const segment of segments) {
      const children = getChildren(currentId);
      const nextFolder = children.find(child => child.name === segment && child.type === FileObjectType.FOLDER);
      if (nextFolder) {
        currentId = nextFolder.id;
        resolvedPath = nextFolder.path;
      } else {
        // Path segment not found, reset to root or handle error
        currentId = 'root';
        resolvedPath = '/';
        break;
      }
    }
    setCurrentFolderId(currentId);
    setCurrentPathState(resolvedPath);
  }, [fileSystem, getChildren]);


  const navigateTo = useCallback((folderId: string) => {
    const folder = getItem(folderId);
    if (folder && folder.type === FileObjectType.FOLDER) {
      setCurrentFolderId(folder.id);
      setCurrentPathState(folder.path);
    }
  }, [getItem]);

  const navigateBack = useCallback(() => {
    const currentFolder = getItem(currentFolderId);
    if (currentFolder && currentFolder.parentId) {
      navigateTo(currentFolder.parentId);
    } else if (currentFolderId !== 'root') { // if current is not root but has no parentId (e.g. a detached item), go to root
       navigateTo('root');
    }
  }, [currentFolderId, getItem, navigateTo]);

  // FIX: Corrected useCallback signature from _0x3c_any_0x3e_ to explicit return type.
  const getBreadcrumbs = useCallback((): { name: string, path: string }[] => {
    const crumbs: { name: string, path: string }[] = [];
    let tempId: string | null = currentFolderId;
    while (tempId) {
      const item = getItem(tempId);
      if (item) {
        crumbs.unshift({ name: item.name, path: item.path });
        tempId = item.parentId;
      } else {
        break;
      }
    }
    if (crumbs.length === 0 && currentFolderId === 'root' && fileSystem['root']) {
         crumbs.push({ name: fileSystem['root'].name, path: '/' });
    } else if (crumbs.length > 0 && crumbs[0].path !== '/') {
        // ensure root is always there if not already
        const rootItem = fileSystem['root'];
        // FIX: Removed check for crumbs[0].id as breadcrumb items ({name, path}) don't have an 'id' property.
        // The outer condition `crumbs[0].path !== '/'` already ensures that the first crumb is not the root.
        // If rootItem exists and the first crumb isn't root, prepend the root crumb.
        if(rootItem) {
             crumbs.unshift({ name: rootItem.name, path: '/' });
        }
    }
    return crumbs;
  }, [currentFolderId, getItem, fileSystem]);


  const createFolder = (name: string, parentId: string) => {
    const newFolderId = `folder_${Date.now()}`;
    const parentFolder = fileSystem[parentId];
    if (!parentFolder || parentFolder.type !== FileObjectType.FOLDER) return;

    const newPath = parentFolder.path === '/' ? `/${name}` : `${parentFolder.path}/${name}`;

    const newFolder: FileSystemObject = {
      id: newFolderId,
      name,
      type: FileObjectType.FOLDER,
      path: newPath,
      parentId,
      childrenIds: [],
      modifiedDate: new Date(),
    };

    setFileSystem(prevFS => ({
      ...prevFS,
      [newFolderId]: newFolder,
      [parentId]: {
        ...parentFolder,
        childrenIds: [...(parentFolder.childrenIds || []), newFolderId],
      },
    }));
  };

  const renameItem = (id: string, newName: string) => {
    setFileSystem(prevFS => {
      const item = prevFS[id];
      if (!item) return prevFS;

      const parentFolder = item.parentId ? prevFS[item.parentId] : null;
      let newPath = item.path;
      if (parentFolder) {
          newPath = parentFolder.path === '/' ? `/${newName}` : `${parentFolder.path}/${newName}`;
          if (item.type === FileObjectType.FILE && item.extension) {
              newPath += `.${item.extension}`;
          }
      } else if (id === 'root') { // Renaming root - special case, path doesn't change
        newPath = '/'; 
      } else { // Item is at root level (parentId is 'root' or null interpreted as root)
         newPath = `/${newName}`;
         if (item.type === FileObjectType.FILE && item.extension) {
              newPath += `.${item.extension}`;
          }
      }
      
      const updatedItem = { ...item, name: newName, path: newPath, modifiedDate: new Date() };
      
      // If it's a folder, we might need to update paths of children recursively.
      // For simplicity, this example doesn't implement recursive path updates for children.
      // In a real system, this would be necessary.

      return { ...prevFS, [id]: updatedItem };
    });
  };

  const deleteItem = (id: string) => {
    setFileSystem(prevFS => {
      const newFS = { ...prevFS };
      const itemToDelete = newFS[id];

      if (!itemToDelete) return prevFS;

      // Recursive deletion for folders
      const itemsToDelete = new Set<string>();
      const queue = [id];
      
      while(queue.length > 0) {
        const currentId = queue.shift()!;
        itemsToDelete.add(currentId);
        const currentItem = newFS[currentId];
        if (currentItem && currentItem.type === FileObjectType.FOLDER && currentItem.childrenIds) {
          currentItem.childrenIds.forEach(childId => queue.push(childId));
        }
      }

      itemsToDelete.forEach(itemId => delete newFS[itemId]);

      // Remove from parent's childrenIds
      if (itemToDelete.parentId && newFS[itemToDelete.parentId]) {
        const parent = newFS[itemToDelete.parentId];
        if (parent.childrenIds) {
          newFS[itemToDelete.parentId] = {
            ...parent,
            childrenIds: parent.childrenIds.filter(childId => childId !== id),
          };
        }
      }
      return newFS;
    });
    setSelectedItem(null); // Clear selection
  };


  const value = {
    searchTerm,
    setSearchTerm,
    sortOption,
    setSortOption,
    fileSystem,
    setFileSystem,
    getItem,
    getChildren,
    currentPath: currentFolderId === 'root' ? '/' : (getItem(currentFolderId)?.path || '/'), // derived current path
    setCurrentPath, // exposing the path string setter
    navigateTo,
    navigateBack,
    getBreadcrumbs,
    createFolder,
    renameItem,
    deleteItem,
    selectedItem,
    setSelectedItem,
    isFilePreviewOpen,
    setFilePreviewOpen,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
