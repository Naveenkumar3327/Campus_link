import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/pages/landing';
import LoginPage from './components/pages/login';
import SignupPage from './components/pages/signup';
import StudentHomePage from './components/pages/student/home';
import HostelComplaintPage from './components/pages/student/hostelcomplaint';
import AnnouncementsPage from './components/pages/student/announcements';
import LostFoundPage from './components/pages/student/lostfound';
import TimetablePage from './components/pages/student/timetable';
import EduExchangePage from './components/pages/student/eduexchange';
import StudyConnectPage from './components/pages/student/studyconnect';
import GrowTogetherPage from './components/pages/student/growtogether';
import ProfilePage from './components/pages/student/profile';

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
          path="/student/hostelcomplaint"
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
        <Route
          path="/student/lost-found"
          element={
            <ProtectedRoute>
              <LostFoundPage />
            </ProtectedRoute>
          }
        />

// Add this route to your App.tsx
        <Route
          path="/student/timetable"
          element={
            <ProtectedRoute>
              <TimetablePage />
            </ProtectedRoute>
          }
        />

// Add this route to your App.tsx
        <Route
          path="/student/edu-exchange"
          element={
            <ProtectedRoute>
              <EduExchangePage />
            </ProtectedRoute>
          }
        />

// Add this route to your App.tsx
        <Route
          path="/student/study-connect"
          element={
            <ProtectedRoute>
              <StudyConnectPage />
            </ProtectedRoute>
          }
        />
// Add this route to your App.tsx
        <Route
          path="/student/growtogether"
          element={
            <ProtectedRoute>
              <GrowTogetherPage />
            </ProtectedRoute>
          }
        />

// Add this route to your App.tsx
        <Route
          path="/student/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        {/* Redirect Routes */}
        <Route path="/home" element={<Navigate to="/student/home" replace />} />

        {/* Catch-all route for 404 */}
        <Route path="*" element={<Navigate to="/student/home" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
