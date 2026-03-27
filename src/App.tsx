import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import HomePage from './components/HomePage';
import AdminLayout from './components/Admin/AdminLayout';
import AdminDashboard from './components/Admin/AdminDashboard';
import ProductManagement from './components/Admin/ProductManagement';
import UsersManagement from './components/Admin/UsersManagement';
import AdminAuth from './components/Admin/AdminAuth';
import AdminSettings from './components/Admin/AdminSettings';
import FavoritesPage from './components/FavoritesPage';
import ProductDetails from './components/ProductDetails';
import { UserProfile } from './types';
import { auth, db } from './firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { Toaster } from 'sonner';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        onSnapshot(doc(db, 'users', user.uid), (snap) => {
          if (snap.exists()) setUserProfile(snap.data() as UserProfile);
        });
      } else {
        setUserProfile(null);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  return (
    <Router>
      <ErrorBoundary>
        <Toaster position="top-right" richColors />
        <Routes>
          {/* Main Site Routes */}
          <Route 
            path="/" 
            element={
              <MainLayout 
                isDarkMode={isDarkMode} 
                toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              >
                <HomePage isDarkMode={isDarkMode} userProfile={userProfile} searchTerm={searchTerm} />
              </MainLayout>
            } 
          />

          <Route 
            path="/favorites" 
            element={
              <MainLayout 
                isDarkMode={isDarkMode} 
                toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              >
                <FavoritesPage isDarkMode={isDarkMode} userProfile={userProfile} />
              </MainLayout>
            } 
          />

          <Route 
            path="/product/:id" 
            element={
              <MainLayout 
                isDarkMode={isDarkMode} 
                toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              >
                <ProductDetails isDarkMode={isDarkMode} userProfile={userProfile} />
              </MainLayout>
            } 
          />

          {/* Admin Routes */}
          <Route 
            path="/admin" 
            element={
              <AdminAuth>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </AdminAuth>
            } 
          />
          <Route 
            path="/admin/products" 
            element={
              <AdminAuth>
                <AdminLayout>
                  <ProductManagement />
                </AdminLayout>
              </AdminAuth>
            } 
          />
          <Route 
            path="/admin/users" 
            element={
              <AdminAuth>
                <AdminLayout>
                  <UsersManagement />
                </AdminLayout>
              </AdminAuth>
            } 
          />
          <Route 
            path="/admin/settings" 
            element={
              <AdminAuth>
                <AdminLayout>
                  <AdminSettings />
                </AdminLayout>
              </AdminAuth>
            } 
          />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}
