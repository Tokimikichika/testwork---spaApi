import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { DataTablePage } from './pages/DataTablePage';
import { useAuth } from './hooks/useAuth';

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/data" element={isAuthenticated ? <DataTablePage /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={isAuthenticated ? "/data" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
