import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Announcements from './pages/Announcements';
import Timetable from './pages/Timetable';
import LostFound from './pages/LostFound';
import Complaints from './pages/Complaints';
import Polls from './pages/Polls';
import Events from './pages/Events';
import Feedback from './pages/Feedback';
import Users from './pages/Users';
import Profile from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/announcements" element={
              <ProtectedRoute>
                <Layout>
                  <Announcements />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/timetable" element={
              <ProtectedRoute allowedRoles={['student']}>
                <Layout>
                  <Timetable />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/lost-found" element={
              <ProtectedRoute>
                <Layout>
                  <LostFound />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/complaints" element={
              <ProtectedRoute>
                <Layout>
                  <Complaints />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/polls" element={
              <ProtectedRoute>
                <Layout>
                  <Polls />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/events" element={
              <ProtectedRoute>
                <Layout>
                  <Events />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/feedback" element={
              <ProtectedRoute allowedRoles={['student', 'admin']}>
                <Layout>
                  <Feedback />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/users" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Layout>
                  <Users />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/profile" element={
              <ProtectedRoute>
                <Layout>
                  <Profile />
                </Layout>
              </ProtectedRoute>
            } />
            
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;