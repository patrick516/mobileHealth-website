import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AppLayout } from './components/Layout/AppLayout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Dashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admins"
          element={
            <ProtectedRoute>
              <AppLayout>
                <div className="card">
                  <h2 className="text-xl font-bold text-text">Admins Management</h2>
                  <p className="text-text-secondary mt-2">Coming soon...</p>
                </div>
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/blog"
          element={
            <ProtectedRoute>
              <AppLayout>
                <div className="card">
                  <h2 className="text-xl font-bold text-text">Blog Management</h2>
                  <p className="text-text-secondary mt-2">Coming soon...</p>
                </div>
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/contacts"
          element={
            <ProtectedRoute>
              <AppLayout>
                <div className="card">
                  <h2 className="text-xl font-bold text-text">Contacts</h2>
                  <p className="text-text-secondary mt-2">Coming soon...</p>
                </div>
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <AppLayout>
                <div className="card">
                  <h2 className="text-xl font-bold text-text">Analytics</h2>
                  <p className="text-text-secondary mt-2">Coming soon...</p>
                </div>
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <AppLayout>
                <div className="card">
                  <h2 className="text-xl font-bold text-text">Settings</h2>
                  <p className="text-text-secondary mt-2">Coming soon...</p>
                </div>
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
