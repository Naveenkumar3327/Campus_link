import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  Bell,
  Search,
  Building,
  Calendar,
  BookOpen,
  Users,
  TrendingUp,
  User,
  Menu,
  X,
  GraduationCap,
  LogOut,
  Clock,
  MapPin,
  Star,
  Activity,
  Award,
  ChevronRight,
  MessageSquare,
  Trophy,
  Target
} from 'lucide-react';

interface StudentData {
  name: string;
  rollNo: string;
  department: string;
  year: string;
  section: string;
  email: string;
  accommodation: string;
  block?: string;
  roomNo?: string;
}

interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
}

interface NavigationItem {
  name: string;
  icon: React.ReactNode;
  path: string;
}

function StudentHomePage() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Get student data from localStorage with proper error handling
  const [studentData] = useState<StudentData>(() => {
    try {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const parsed = JSON.parse(userData);
        if (parsed && typeof parsed === 'object') {
          return {
            name: parsed.name || 'John Doe',
            rollNo: parsed.rollNo || '20CS001',
            department: parsed.department || 'Computer Science Engineering',
            year: parsed.year || '3rd Year',
            section: parsed.section || 'A',
            email: parsed.email || 'student@sece.ac.in',
            accommodation: parsed.accommodation || 'Hostel',
            block: parsed.block || 'A Block',
            roomNo: parsed.roomNo || 'A-201'
          };
        }
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
    }

    return {
      name: "John Doe",
      rollNo: "20CS001",
      department: "Computer Science Engineering",
      year: "3rd Year",
      section: "A",
      email: "student@sece.ac.in",
      accommodation: "Hostel",
      block: "A Block",
      roomNo: "A-201"
    };
  });

  const announcements: Announcement[] = [
    {
      id: 1,
      title: "Semester Exam Schedule Released",
      content: "The semester examination schedule has been released. Please check your timetable for detailed information.",
      date: "2025-01-20",
      priority: "high"
    },
    {
      id: 2,
      title: "Library Extended Hours",
      content: "Library will be open 24/7 during exam period starting from next week. Make the most of it!",
      date: "2025-01-19",
      priority: "medium"
    },
    {
      id: 3,
      title: "Sports Day Registration Open",
      content: "Registration for annual sports day is now open. Register before February 1st to participate.",
      date: "2025-01-18",
      priority: "low"
    },
    {
      id: 4,
      title: "Scholarship Applications Available",
      content: "Merit-based scholarship applications are now available. Submit your applications by January 30th.",
      date: "2025-01-17",
      priority: "medium"
    }
  ];

  const navigationItems: NavigationItem[] = [
    { name: 'Home', icon: <Home size={20} />, path: '/student/home' },
    { name: 'Announcements', icon: <Bell size={20} />, path: '/student/announcements' },
    { name: 'Lost & Found', icon: <Search size={20} />, path: '/student/lost-found' },
    { name: 'Hostel Complaint', icon: <Building size={20} />, path: '/student/hostel-complaint' },
    { name: 'Timetable Reminder', icon: <Calendar size={20} />, path: '/student/timetable' },
    { name: 'EduExchange', icon: <BookOpen size={20} />, path: '/student/edu-exchange' },
    { name: 'StudyConnect', icon: <Users size={20} />, path: '/student/study-connect' },
    { name: 'GrowTogether', icon: <TrendingUp size={20} />, path: '/student/grow-together' },
    { name: 'Profile', icon: <User size={20} />, path: '/student/profile' }
  ];

  const inspirationalQuotes = [
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "Education is the most powerful weapon which you can use to change the world.",
    "Your limitation—it's only your imagination.",
    "Great things never come from comfort zones."
  ];

  const [currentQuote] = useState(() => {
    return inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)];
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleNavClick = (itemName: string, path?: string) => {
    setActiveItem(itemName);
    setIsSidebarOpen(false);

    if (path && path !== '/student/home') {
      console.log(`Navigating to: ${path}`);
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      navigate('/login');
    }
  };

  const getUserInitials = (name: string): string => {
    if (!name || typeof name !== 'string') return 'JD';
    const nameParts = name.trim().split(' ');
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();
    }
    return nameParts
      .slice(0, 2)
      .map(part => part.charAt(0).toUpperCase())
      .join('');
  };

  const getFirstName = (name: string): string => {
    if (!name || typeof name !== 'string') return 'Student';
    return name.trim().split(' ')[0];
  };

  const getAccommodationText = (): string => {
    if (studentData.accommodation === 'Hostel') {
      const block = studentData.block || 'N/A';
      const roomNo = studentData.roomNo || 'N/A';
      return `${block} - ${roomNo}`;
    }
    return 'Day Scholar';
  };

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: linear-gradient(135deg, #FFF5E0 0%, #FFEBEB 50%, #FFF5E0 100%);
          min-height: 100vh;
        }

        /* Top Navigation Bar */
        .top-navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 70px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 105, 105, 0.1);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          z-index: 1000;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
        }

        .navbar-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .menu-toggle {
          display: none;
          background: none;
          border: none;
          color: #BB2525;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          transition: background 0.2s;
        }

        .menu-toggle:hover {
          background: rgba(255, 105, 105, 0.1);
        }

        .sidebar-toggle {
          background: none;
          border: none;
          color: #BB2525;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sidebar-toggle:hover {
          background: rgba(255, 105, 105, 0.1);
        }

        .app-logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #FF6969, #BB2525);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .app-name {
          font-size: 24px;
          font-weight: 700;
          color: #BB2525;
          background: linear-gradient(135deg, #BB2525, #FF6969);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .navbar-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .notification-btn {
          position: relative;
          background: none;
          border: none;
          color: #666;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          transition: all 0.2s;
        }

        .notification-btn:hover {
          background: rgba(255, 105, 105, 0.1);
          color: #BB2525;
        }

        .notification-badge {
          position: absolute;
          top: 4px;
          right: 4px;
          background: linear-gradient(135deg, #FF6969, #BB2525);
          color: white;
          font-size: 10px;
          font-weight: 600;
          min-width: 18px;
          height: 18px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #333;
          font-weight: 500;
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #FF6969, #BB2525);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 14px;
        }

        /* Side Navigation */
        .sidebar {
          position: fixed;
          top: 70px;
          left: 0;
          width: ${(isSidebarCollapsed && !isHovering) ? '70px' : '280px'};
          height: calc(100vh - 70px);
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-right: 1px solid rgba(255, 105, 105, 0.1);
          padding: 24px 0;
          overflow-y: auto;
          overflow-x: hidden;
          z-index: 999;
          transition: all 0.3s ease;
          box-shadow: 2px 0 10px rgba(0, 0, 0, 0.08);
        }

        .sidebar.closed {
          transform: translateX(-100%);
        }

        .sidebar::-webkit-scrollbar {
          width: 4px;
        }

        .sidebar::-webkit-scrollbar-track {
          background: transparent;
        }

        .sidebar::-webkit-scrollbar-thumb {
          background: rgba(255, 105, 105, 0.3);
          border-radius: 2px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 24px;
          color: #666;
          text-decoration: none;
          transition: all 0.3s ease;
          cursor: pointer;
          border-left: 3px solid transparent;
          font-weight: 500;
          position: relative;
          white-space: nowrap;
        }

        .nav-item:hover {
          background: rgba(255, 105, 105, 0.05);
          color: #BB2525;
          border-left-color: rgba(255, 105, 105, 0.3);
        }

        .nav-item.active {
          background: rgba(255, 105, 105, 0.1);
          color: #BB2525;
          border-left-color: #FF6969;
        }

        .nav-item.active .nav-icon {
          color: #FF6969;
        }

        .nav-icon {
          transition: color 0.3s ease;
          flex-shrink: 0;
        }

        .nav-text {
          font-size: 15px;
          opacity: ${(isSidebarCollapsed && !isHovering) ? '0' : '1'};
          transition: opacity 0.3s ease;
        }

        .logout-section {
          position: absolute;
          bottom: 24px;
          left: 0;
          right: 0;
          padding: 0 24px;
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 12px 16px;
          width: 100%;
          background: none;
          border: 1px solid rgba(255, 105, 105, 0.2);
          border-radius: 8px;
          color: #666;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
          white-space: nowrap;
        }

        .logout-btn:hover {
          background: rgba(255, 105, 105, 0.1);
          color: #BB2525;
          border-color: #FF6969;
        }

        .logout-text {
          opacity: ${(isSidebarCollapsed && !isHovering) ? '0' : '1'};
          transition: opacity 0.3s ease;
        }

        /* Main Content Area */
        .main-content {
          margin-left: ${(window.innerWidth <= 768) ? '0px' : ((isSidebarCollapsed && !isHovering) ? '70px' : '280px')};
          margin-top: 70px;
          padding: 24px;
          min-height: calc(100vh - 70px);
          transition: margin-left 0.3s ease;
          width: calc(100vw - ${(window.innerWidth <= 768) ? '0px' : ((isSidebarCollapsed && !isHovering) ? '70px' : '280px')});
          max-width: calc(100vw - ${(window.innerWidth <= 768) ? '0px' : ((isSidebarCollapsed && !isHovering) ? '70px' : '280px')});
          box-sizing: border-box;
        }

        /* Welcome Section - Centered */
        .welcome-section {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 40px;
          margin-bottom: 30px;
          border: 1px solid rgba(255, 105, 105, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .welcome-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          margin-bottom: 30px;
        }

        .welcome-text-section {
          flex: 1;
          text-align: left;
        }

        .welcome-title {
          font-size: 48px;
          font-weight: 800;
          color: #BB2525;
          margin-bottom: 16px;
          background: linear-gradient(135deg, #BB2525, #FF6969);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.2;
        }

        .welcome-subtitle {
          font-size: 28px;
          font-weight: 600;
          color: #333;
          margin-bottom: 20px;
        }

        .quote-section {
          background: rgba(255, 105, 105, 0.05);
          border-radius: 12px;
          padding: 20px;
          border-left: 4px solid #FF6969;
          margin-bottom: 20px;
        }

        .quote-text {
          font-style: italic;
          font-size: 16px;
          color: #555;
          line-height: 1.6;
        }

        .welcome-image {
          flex: 0 0 300px;
          height: 250px;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }

        .welcome-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Student Info at bottom of welcome section */
        .student-info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-top: 30px;
          padding-top: 30px;
          border-top: 1px solid rgba(255, 105, 105, 0.1);
        }

        .info-card {
          background: rgba(255, 255, 255, 0.6);
          border-radius: 12px;
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          border: 1px solid rgba(255, 105, 105, 0.1);
        }

        .info-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: linear-gradient(135deg, #FF6969, #BB2525);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .info-details {
          flex: 1;
        }

        .info-label {
          font-size: 12px;
          color: #666;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .info-value {
          font-size: 14px;
          color: #333;
          font-weight: 600;
          margin-top: 2px;
        }

        /* Quick Links Grid */
        .quick-links-section {
          margin-bottom: 30px;
        }

        .section-title {
          font-size: 24px;
          font-weight: 700;
          color: #333;
          margin-bottom: 20px;
          text-align: center;
        }

        .quick-links-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }

        .quick-link-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          padding: 24px;
          text-align: center;
          border: 1px solid rgba(255, 105, 105, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .quick-link-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
        }

        .quick-link-icon {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px auto;
          color: white;
        }

        .quick-link-text {
          font-size: 16px;
          font-weight: 600;
          color: #333;
        }

        /* Announcements Section */
        .announcements-section {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          padding: 30px;
          border: 1px solid rgba(255, 105, 105, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
        }

        .announcements-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }

        .announcement-card {
          background: rgba(255, 255, 255, 0.8);
          border-radius: 12px;
          padding: 20px;
          border-left: 4px solid;
          transition: all 0.2s ease;
        }

        .announcement-card:hover {
          transform: translateX(4px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .announcement-card.high {
          border-left-color: #ef4444;
        }

        .announcement-card.medium {
          border-left-color: #f59e0b;
        }

        .announcement-card.low {
          border-left-color: #22c55e;
        }

        .announcement-title {
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
          font-size: 16px;
        }

        .announcement-content {
          font-size: 14px;
          color: #666;
          margin-bottom: 12px;
          line-height: 1.5;
        }

        .announcement-date {
          font-size: 12px;
          color: #888;
          font-weight: 500;
        }

        /* Mobile Overlay */
        .sidebar-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 998;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }

        .sidebar-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .welcome-content {
            flex-direction: column;
            text-align: center;
          }

          .welcome-text-section {
            text-align: center;
          }

          .welcome-image {
            flex: none;
            width: 100%;
            max-width: 400px;
          }

          .quick-links-grid {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .menu-toggle {
            display: block;
          }

          .sidebar-toggle {
            display: none;
          }

          .sidebar {
            transform: translateX(-100%);
            width: 280px !important;
          }

          .sidebar.open {
            transform: translateX(0);
          }

          .main-content {
            margin-left: 0 !important;
            width: 100vw !important;
            max-width: 100vw !important;
          }

          .welcome-title {
            font-size: 36px;
          }

          .welcome-subtitle {
            font-size: 24px;
          }

          .main-content {
            padding: 16px;
          }

          .welcome-section {
            padding: 24px;
          }

          .student-info-grid {
            grid-template-columns: 1fr;
          }

          .quick-links-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .announcements-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .welcome-title {
            font-size: 28px;
          }

          .welcome-subtitle {
            font-size: 20px;
          }

          .quick-links-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Top Navigation Bar */}
      <nav className="top-navbar">
        <div className="navbar-left">
          <button
            className="menu-toggle"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label="Toggle navigation menu"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <button
            className="sidebar-toggle"
            onClick={toggleSidebarCollapse}
            aria-label="Toggle sidebar collapse"
          >
            <Menu size={24} />
          </button>

          <div className="app-logo">
            <div className="logo-icon">
              <GraduationCap size={24} />
            </div>
            <div className="app-name">CampusLink</div>
          </div>
        </div>

        <div className="navbar-right">
          <button className="notification-btn" aria-label="View notifications">
            <Bell size={20} />
            <span className="notification-badge">5</span>
          </button>

          <div className="user-info">
            <div className="user-avatar">
              {getUserInitials(studentData.name)}
            </div>
            <span>{getFirstName(studentData.name)}</span>
          </div>
        </div>
      </nav>

      {/* Sidebar Overlay for Mobile */}
      <div
        className={`sidebar-overlay ${isSidebarOpen ? 'active' : ''}`}
        onClick={() => setIsSidebarOpen(false)}
        aria-hidden="true"
      />

      {/* Side Navigation */}
      <nav
        className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''} ${isSidebarOpen ? 'open' : window.innerWidth <= 768 ? 'closed' : ''}`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {navigationItems.map((item) => (
          <div
            key={item.name}
            className={`nav-item ${activeItem === item.name ? 'active' : ''}`}
            onClick={() => handleNavClick(item.name, item.path)}
            data-tooltip={item.name}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleNavClick(item.name, item.path);
              }
            }}
          >
            <div className="nav-icon">{item.icon}</div>
            <div className="nav-text">{item.name}</div>
          </div>
        ))}

        <div className="logout-section">
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={18} />
            <span className="logout-text">Logout</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Welcome Section with Centered Content */}
        <div className="welcome-section">
          <div className="welcome-content">
            <div className="welcome-text-section">
              <h1 className="welcome-title">Welcome</h1>
              <h2 className="welcome-subtitle">{studentData.name}! 👋</h2>

              <div className="quote-section">
                <p className="quote-text">"{currentQuote}"</p>
              </div>
            </div>

            <div className="welcome-image">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Students studying"
              />
            </div>
          </div>

          {/* Student Info Grid at bottom */}
          <div className="student-info-grid">
            <div className="info-card">
              <div className="info-icon">
                <User size={20} />
              </div>
              <div className="info-details">
                <div className="info-label">Roll Number</div>
                <div className="info-value">{studentData.rollNo}</div>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <BookOpen size={20} />
              </div>
              <div className="info-details">
                <div className="info-label">Department</div>
                <div className="info-value">{studentData.department}</div>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <Calendar size={20} />
              </div>
              <div className="info-details">
                <div className="info-label">Year & Section</div>
                <div className="info-value">{studentData.year} - {studentData.section}</div>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <MapPin size={20} />
              </div>
              <div className="info-details">
                <div className="info-label">Accommodation</div>
                <div className="info-value">{getAccommodationText()}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="quick-links-section">
          <h2 className="section-title">Quick Links</h2>
          <div className="quick-links-grid">
            <div
              className="quick-link-card"
              onClick={() => handleNavClick('Hostel Complaint', '/student/hostel-complaint')}
            >
              <div
                className="quick-link-icon"
                style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}
              >
                <MessageSquare size={24} />
              </div>
              <div className="quick-link-text">Complaint</div>
            </div>

            <div
              className="quick-link-card"
              onClick={() => handleNavClick('Profile', '/student/profile')}
            >
              <div
                className="quick-link-icon"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }}
              >
                <Award size={24} />
              </div>
              <div className="quick-link-text">My Credits</div>
            </div>

            <div
              className="quick-link-card"
              onClick={() => handleNavClick('GrowTogether', '/student/grow-together')}
            >
              <div
                className="quick-link-icon"
                style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}
              >
                <Trophy size={24} />
              </div>
              <div className="quick-link-text">Leadership Board</div>
            </div>

            <div
              className="quick-link-card"
              onClick={() => handleNavClick('Timetable Reminder', '/student/timetable')}
            >
              <div
                className="quick-link-icon"
                style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}
              >
                <Clock size={24} />
              </div>
              <div className="quick-link-text">Timetable</div>
            </div>
          </div>
        </div>

        {/* Recent Announcements */}
        <div className="announcements-section">
          <h2 className="section-title">Recent Announcements</h2>
          <div className="announcements-grid">
            {announcements.map((announcement) => (
              <div key={announcement.id} className={`announcement-card ${announcement.priority}`}>
                <div className="announcement-title">{announcement.title}</div>
                <div className="announcement-content">{announcement.content}</div>
                <div className="announcement-date">
                  {new Date(announcement.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default StudentHomePage;
