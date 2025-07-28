import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/pages/landing';
import LoginPage from './components/pages/login';
import SignupPage from './components/pages/signup';

// Student Pages
import StudentHomePage from './components/pages/student/home';
import HostelComplaintPage from './components/pages/student/hostelcomplaint';
import AnnouncementsPage from './components/pages/student/announcements';
import LostFoundPage from './components/pages/student/lostfound';
import TimetablePage from './components/pages/student/timetable';
import EduExchangePage from './components/pages/student/eduexchange';
import StudyConnectPage from './components/pages/student/studyconnect';
import GrowTogetherPage from './components/pages/student/growtogether';
import ProfilePage from './components/pages/student/profile';
import EventsPage from './components/pages/student/events';
import FeedbackPollsPage from './components/pages/student/feedbackpolls';

// Staff Pages
import StaffHomePage from './components/pages/staff/home';
import StaffAnnouncementsPage from './components/pages/staff/announcements';
import StaffLostFoundPage from './components/pages/staff/lostfound';
import StaffComplaintsPage from './components/pages/staff/complaints';
import StaffTimetablesPage from './components/pages/staff/timetables';
import StaffEduExchangePage from './components/pages/staff/eduexchange';
import StaffReportsPage from './components/pages/staff/reports';
import StaffProfilePage from './components/pages/staff/profile';
import StaffEventsPage from './components/pages/staff/events';
import StaffFeedbackPollsPage from './components/pages/staff/pollsfeedback';


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
        <Route
          path="/student/timetable"
          element={
            <ProtectedRoute>
              <TimetablePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/edu-exchange"
          element={
            <ProtectedRoute>
              <EduExchangePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/study-connect"
          element={
            <ProtectedRoute>
              <StudyConnectPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/grow-together"
          element={
            <ProtectedRoute>
              <GrowTogetherPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/events"
          element={
            <ProtectedRoute>
              <EventsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/feedback-polls"
          element={
            <ProtectedRoute>
              <FeedbackPollsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        {/* Protected Staff Routes */}
        <Route
          path="/staff/home"
          element={
            <ProtectedRoute>
              <StaffHomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff/announcements"
          element={
            <ProtectedRoute>
              <StaffAnnouncementsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff/lost-found"
          element={
            <ProtectedRoute>
              <StaffLostFoundPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/staff/complaints"
          element={
            <ProtectedRoute>
              <StaffComplaintsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff/timetables"
          element={
            <ProtectedRoute>
              <StaffTimetablesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff/edu-exchange"
          element={
            <ProtectedRoute>
              <StaffEduExchangePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/staff/reports"
          element={
            <ProtectedRoute>
              <StaffReportsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/staff/profile"
          element={
            <ProtectedRoute>
              <StaffProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/staff/events"
          element={
            <ProtectedRoute>
              <StaffEventsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/staff/feedback-polls"
          element={
            <ProtectedRoute>
              <StaffFeedbackPollsPage />
            </ProtectedRoute>
          }
        />


        {/* Add other staff routes as you create them */}

        {/* Redirect Routes */}
        <Route path="/home" element={<Navigate to="/student/home" replace />} />

        {/* Catch-all route for 404 */}
        <Route path="*" element={<Navigate to="/student/home" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
