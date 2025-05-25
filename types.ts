
export enum FileObjectType {
  FILE = 'file',
  FOLDER = 'folder',
}

export interface FileSystemObject {
  id: string;
  name: string;
  type: FileObjectType;
  path: string; // Full path, e.g., /documents/report.pdf
  parentId: string | null; // ID of parent folder, null for root
  size?: number; // in bytes
  modifiedDate?: Date;
  childrenIds?: string[]; // For folders, IDs of direct children
  extension?: string; // e.g., 'pdf', 'txt'
  content?: string; // For previewable text files
  mimeType?: string; // e.g. 'image/jpeg', 'application/pdf'
}

export interface SortOption {
  field: 'name' | 'size' | 'modifiedDate';
  order: 'asc' | 'desc';
}

export type ActiveView = 'home' | 'recent' | 'categories' | 'storage';

export interface FileSystemCollection {
  [id: string]: FileSystemObject;
}
