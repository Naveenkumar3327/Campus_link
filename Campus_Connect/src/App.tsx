import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/pages/landing';
import LoginPage from './components/pages/login';
import SignupPage from './components/pages/signup';
import StudentHomePage from './components/pages/student/home';
import HostelComplaintPage from './components/pages/student/HostelComplaintPage';
import AnnouncementsPage from './components/pages/student/AnnouncementsPage';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('authToken');
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Student Routes */}
        <Route
          path="/student/home"
          element={
            <ProtectedRoute>
              <StudentHomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/HostelComplaintPage"
          element={
            <ProtectedRoute>
              <HostelComplaintPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/announcements"
          element={
            <ProtectedRoute>
              <AnnouncementsPage />
            </ProtectedRoute>
          }
        />

        {/* Redirect Routes */}
        <Route path="/home" element={<Navigate to="/student/home" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
