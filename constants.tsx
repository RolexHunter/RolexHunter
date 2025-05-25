
import React from 'react';
import { FileObjectType, SortOption, FileSystemCollection } from './types';

export const APP_TITLE = "Web File Explorer";

export const DEFAULT_SORT_OPTION: SortOption = { field: 'name', order: 'asc' };

export const ICONS: { [key: string]: React.ReactNode } = {
  FOLDER: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-400">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
    </svg>
  ),
  FILE: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
  ),
  IMAGE: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-purple-400">
      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.158 0a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" />
    </svg>
  ),
  VIDEO: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-400">
      <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9A2.25 2.25 0 0 0 13.5 5.25h-9A2.25 2.25 0 0 0 2.25 7.5v9A2.25 2.25 0 0 0 4.5 18.75Z" />
    </svg>
  ),
  AUDIO: (
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-yellow-400">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9c0-1.355.684-2.593 1.707-3.328M9 9c0 1.355-.684 2.593-1.707 3.328m0 0c1.667.728 3.333.728 5 0M3 12h.008v.008H3V12Zm2.25 0h.007v.008H5.25V12Zm2.25 0h.008v.008H7.5V12Zm2.25 0h.007v.008H9.75V12Zm2.25 0h.008v.008H12V12Zm2.25 0h.007v.008H14.25V12Zm2.25 0h.008v.008H16.5V12Zm2.25 0h.007v.008H18.75V12Zm-1.707 3.328c.951-.694 1.707-1.407 1.707-2.593M15.707 15.328c-.951.694-1.707 1.407-1.707 2.593M15.707 15.328c-1.667-.728-3.333-.728-5 0m5 0v4.5m0-4.5c0-1.355-.684-2.593-1.707-3.328" />
    </svg>
  ),
  PDF: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-orange-400">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25.75H12m8.25 3v5.25A2.25 2.25 0 0 1 18 18H6a2.25 2.25 0 0 1-2.25-2.25V6.75A2.25 2.25 0 0 1 6 4.5h2.25a2.25 2.25 0 0 0 0-3H6A2.25 2.25 0 0 0 3.75 3.75v16.5A2.25 2.25 0 0 0 6 22.5h12a2.25 2.25 0 0 0 2.25-2.25v-5.25" />
    </svg>
  ),
  DOC: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-sky-400">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2Z" />
    </svg>
  ),
  TXT: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-400">
       <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2Z" />
    </svg>
  ),
  UNKNOWN: (
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
    </svg>
  ),
};

export const INITIAL_FILESYSTEM_DATA: FileSystemCollection = {
  // FIX: Merged 'file5', 'file6', 'folder3' into root's childrenIds directly for clarity and to avoid post-definition mutation.
  'root': { id: 'root', name: 'My Drive', type: FileObjectType.FOLDER, path: '/', parentId: null, childrenIds: ['folder1', 'file1', 'folder2', 'file5', 'file6', 'folder3'] },
  'folder1': { id: 'folder1', name: 'Documents', type: FileObjectType.FOLDER, path: '/Documents', parentId: 'root', childrenIds: ['file2', 'file3'] },
  'file1': { id: 'file1', name: 'profile.jpg', type: FileObjectType.FILE, path: '/profile.jpg', parentId: 'root', size: 1024 * 150, modifiedDate: new Date(2023, 10, 15), extension: 'jpg', mimeType: 'image/jpeg' },
  'folder2': { id: 'folder2', name: 'Photos', type: FileObjectType.FOLDER, path: '/Photos', parentId: 'root', childrenIds: ['file4'] },
  'file2': { id: 'file2', name: 'report.pdf', type: FileObjectType.FILE, path: '/Documents/report.pdf', parentId: 'folder1', size: 1024 * 2048, modifiedDate: new Date(2023, 9, 20), extension: 'pdf', mimeType: 'application/pdf' },
  'file3': { id: 'file3', name: 'notes.txt', type: FileObjectType.FILE, path: '/Documents/notes.txt', parentId: 'folder1', size: 1024 * 5, modifiedDate: new Date(2023, 11, 1), extension: 'txt', mimeType: 'text/plain', content: 'This is a sample text file for preview.' },
  'file4': { id: 'file4', name: 'vacation.mp4', type: FileObjectType.FILE, path: '/Photos/vacation.mp4', parentId: 'folder2', size: 1024 * 1024 * 50, modifiedDate: new Date(2023, 7, 5), extension: 'mp4', mimeType: 'video/mp4' },
  'file5': { id: 'file5', name: 'project_brief.docx', type: FileObjectType.FILE, path: '/project_brief.docx', parentId: 'root', size: 1024 * 300, modifiedDate: new Date(2024, 0, 10), extension: 'docx', mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
  'file6': { id: 'file6', name: 'archive.zip', type: FileObjectType.FILE, path: '/archive.zip', parentId: 'root', size: 1024 * 1024 * 5, modifiedDate: new Date(2024, 0, 12), extension: 'zip', mimeType: 'application/zip' },
  'folder3': { id: 'folder3', name: 'Music', type: FileObjectType.FOLDER, path: '/Music', parentId: 'root', childrenIds: ['file7'] },
  'file7': { id: 'file7', name: 'song.mp3', type: FileObjectType.FILE, path: '/Music/song.mp3', parentId: 'folder3', size: 1024 * 1024 * 3, modifiedDate: new Date(2023, 5, 1), extension: 'mp3', mimeType: 'audio/mpeg' },
};

// FIX: Removed the logic block that previously mutated INITIAL_FILESYSTEM_DATA['root'].childrenIds.
// The children 'file5', 'file6', 'folder3' are now included directly in the definition above.
// if (INITIAL_FILESYSTEM_DATA['root'] && INITIAL_FILESYSTEM_DATA['root'].childrenIds) {
//     INITIAL_FILESYSTEM_DATA['root'].childrenIds?.push('file5', 'file6', 'folder3');
// }

export const getFileIconByExtension = (extension?: string, type?: FileObjectType): React.ReactNode => {
  if (type === FileObjectType.FOLDER) return ICONS.FOLDER;
  if (!extension) return ICONS.FILE;

  const ext = extension.toLowerCase();
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg'].includes(ext)) return ICONS.IMAGE;
  if (['mp4', 'mov', 'avi', 'wmv', 'mkv'].includes(ext)) return ICONS.VIDEO;
  if (['mp3', 'wav', 'ogg', 'aac', 'flac'].includes(ext)) return ICONS.AUDIO;
  if (ext === 'pdf') return ICONS.PDF;
  if (['doc', 'docx'].includes(ext)) return ICONS.DOC;
  if (['txt', 'md', 'json', 'xml', 'html', 'css', 'js', 'ts'].includes(ext)) return ICONS.TXT;
  return ICONS.UNKNOWN;
};

export const formatFileSize = (bytes?: number): string => {
  if (bytes === undefined || bytes === null || isNaN(bytes)) return 'N/A';
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const formatDate = (date?: Date): string => {
  if (!date) return 'N/A';
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
};
