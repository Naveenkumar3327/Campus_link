import React, { useState } from 'react';
import {
    Home,
    Bell,
    Search,
    FileText,
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
    Settings
} from 'lucide-react';

interface NavigationProps {
    userName?: string;
    notificationCount?: number;
}

function StudentNavigation({ userName = "John Doe", notificationCount = 3 }: NavigationProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeItem, setActiveItem] = useState('Home');

    const navigationItems = [
        { name: 'Home', icon: <Home size={20} />, path: '/home' },
        { name: 'Announcements', icon: <Bell size={20} />, path: '/announcements' },
        { name: 'Lost & Found', icon: <Search size={20} />, path: '/lost-found' },
        { name: 'Hostel Complaint', icon: <Building size={20} />, path: '/hostel-complaint' },
        { name: 'Timetable Reminder', icon: <Calendar size={20} />, path: '/timetable' },
        { name: 'EduExchange', icon: <BookOpen size={20} />, path: '/edu-exchange' },
        { name: 'StudyConnect', icon: <Users size={20} />, path: '/study-connect' },
        { name: 'GrowTogether', icon: <TrendingUp size={20} />, path: '/grow-together' },
        { name: 'Profile', icon: <User size={20} />, path: '/profile' }
    ];

    const handleNavClick = (itemName: string) => {
        setActiveItem(itemName);
        setIsSidebarOpen(false); // Close sidebar on mobile after selection
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
          background: #f8fafc;
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
          width: 280px;
          height: calc(100vh - 70px);
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-right: 1px solid rgba(255, 105, 105, 0.1);
          padding: 24px 0;
          overflow-y: auto;
          z-index: 999;
          transition: transform 0.3s ease;
          box-shadow: 2px 0 10px rgba(0, 0, 0, 0.08);
        }

        .sidebar.closed {
          transform: translateX(-100%);
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
        }

        .nav-text {
          font-size: 15px;
        }

        /* Main Content Area */
        .main-content {
          margin-left: 280px;
          margin-top: 70px;
          padding: 24px;
          min-height: calc(100vh - 70px);
          transition: margin-left 0.3s ease;
        }

        .main-content.expanded {
          margin-left: 0;
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
        @media (max-width: 768px) {
          .menu-toggle {
            display: block;
          }

          .app-name {
            font-size: 20px;
          }

          .sidebar {
            transform: translateX(-100%);
          }

          .sidebar.open {
            transform: translateX(0);
          }

          .main-content {
            margin-left: 0;
          }

          .user-info span {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .top-navbar {
            padding: 0 16px;
          }

          .app-name {
            font-size: 18px;
          }

          .navbar-right {
            gap: 12px;
          }
        }

        /* Demo Content Styling */
        .demo-content {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(255, 105, 105, 0.1);
        }

        .demo-title {
          font-size: 24px;
          font-weight: 600;
          color: #BB2525;
          margin-bottom: 16px;
        }

        .demo-text {
          color: #666;
          line-height: 1.6;
        }

        /* Logout Button */
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
        }

        .logout-btn:hover {
          background: rgba(255, 105, 105, 0.1);
          color: #BB2525;
          border-color: #FF6969;
        }
      `}</style>

            {/* Top Navigation Bar */}
            <nav className="top-navbar">
                <div className="navbar-left">
                    <button
                        className="menu-toggle"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    <div className="app-logo">
                        <div className="logo-icon">
                            <GraduationCap size={24} />
                        </div>
                        <div className="app-name">CampusLink</div>
                    </div>
                </div>

                <div className="navbar-right">
                    <button className="notification-btn">
                        <Bell size={20} />
                        {notificationCount > 0 && (
                            <span className="notification-badge">
                                {notificationCount > 9 ? '9+' : notificationCount}
                            </span>
                        )}
                    </button>

                    <div className="user-info">
                        <div className="user-avatar">
                            {userName.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </div>
                        <span>{userName}</span>
                    </div>
                </div>
            </nav>

            {/* Sidebar Overlay for Mobile */}
            <div
                className={`sidebar-overlay ${isSidebarOpen ? 'active' : ''}`}
                onClick={() => setIsSidebarOpen(false)}
            />

            {/* Side Navigation */}
            <nav className={`sidebar ${isSidebarOpen ? 'open' : window.innerWidth <= 768 ? 'closed' : ''}`}>
                {navigationItems.map((item) => (
                    <div
                        key={item.name}
                        className={`nav-item ${activeItem === item.name ? 'active' : ''}`}
                        onClick={() => handleNavClick(item.name)}
                    >
                        <div className="nav-icon">{item.icon}</div>
                        <div className="nav-text">{item.name}</div>
                    </div>
                ))}

                <div className="logout-section">
                    <button className="logout-btn">
                        <LogOut size={18} />
                        <span>Logout</span>
                    </button>
                </div>
            </nav>

            {/* Main Content Area */}
            <main className={`main-content ${isSidebarOpen && window.innerWidth <= 768 ? '' : 'expanded'}`}>
                <div className="demo-content">
                    <h1 className="demo-title">Welcome to {activeItem}</h1>
                    <p className="demo-text">
                        This is the {activeItem} section of your CampusLink dashboard.
                        Here you can access all the features related to {activeItem.toLowerCase()}.
                        The navigation is fully responsive and works great on both desktop and mobile devices.
                    </p>
                </div>
            </main>
        </>
    );
}

export default StudentNavigation;
