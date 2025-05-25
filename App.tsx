
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import BottomNavigation from './components/BottomNavigation';
import HomePage from './pages/HomePage'; // Ensures relative path
import RecentPage from './pages/RecentPage'; // Ensures relative path
import CategoriesPage from './pages/CategoriesPage'; // Ensures relative path
import StoragePage from './pages/StoragePage'; // Ensures relative path
import { useAppContext } from './context/AppContext';

const App: React.FC = () => {
  const { searchTerm, setSearchTerm, sortOption, setSortOption } = useAppContext();

  return (
    <HashRouter>
      <div className="flex flex-col h-screen bg-background text-on-surface">
        <Header 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm}
          sortOption={sortOption}
          onSortChange={setSortOption}
        />
        <main className="flex-grow overflow-y-auto p-4">
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home/*" element={<HomePage />} />
            <Route path="/recent" element={<RecentPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/storage" element={<StoragePage />} />
          </Routes>
        </main>
        <BottomNavigation />
      </div>
    </HashRouter>
  );
};

export default App;