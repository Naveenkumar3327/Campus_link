import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Home, 
  Bell, 
  Calendar, 
  Search, 
  MessageSquare, 
  BarChart3, 
  Calendar as CalendarIcon, 
  MessageCircle, 
  User,
  Users,
  LogOut,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const getMenuItems = () => {
    const baseItems = [
      { path: '/dashboard', label: 'Dashboard', icon: Home },
      { path: '/announcements', label: 'Announcements', icon: Bell },
    ];

    const studentItems = [
      { path: '/timetable', label: 'Timetable', icon: Calendar },
      { path: '/lost-found', label: 'Lost & Found', icon: Search },
      { path: '/complaints', label: 'Complaints', icon: MessageSquare },
      { path: '/polls', label: 'Polls', icon: BarChart3 },
      { path: '/events', label: 'Events', icon: CalendarIcon },
      { path: '/feedback', label: 'Feedback', icon: MessageCircle },
    ];

    const staffItems = [
      { path: '/lost-found', label: 'Lost & Found', icon: Search },
      { path: '/complaints', label: 'Complaints', icon: MessageSquare },
      { path: '/polls', label: 'Polls', icon: BarChart3 },
      { path: '/events', label: 'Events', icon: CalendarIcon },
    ];

    const adminItems = [
      { path: '/complaints', label: 'Complaints', icon: MessageSquare },
      { path: '/users', label: 'Users', icon: Users },
      { path: '/feedback', label: 'Feedback', icon: MessageCircle },
      { path: '/polls', label: 'Polls', icon: BarChart3 },
      { path: '/events', label: 'Events', icon: CalendarIcon },
    ];

    let menuItems = [...baseItems];

    if (user?.role === 'student') {
      menuItems = [...menuItems, ...studentItems];
    } else if (user?.role === 'staff') {
      menuItems = [...menuItems, ...staffItems];
    } else if (user?.role === 'admin') {
      menuItems = [...menuItems, ...adminItems];
    }

    menuItems.push({ path: '/profile', label: 'Profile', icon: User });

    return menuItems;
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const sidebarVariants = {
    open: {
      width: '16rem',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
    closed: {
      width: '4rem',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const menuItems = getMenuItems();

  return (
    <>
      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        variants={sidebarVariants}
        animate={isOpen ? 'open' : 'closed'}
        className="fixed left-0 top-0 h-screen bg-white/10 backdrop-blur-xl border-r border-white/20 z-50 shadow-2xl"
      >
        <div className="flex flex-col h-full p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex items-center space-x-2"
                >
                  <GraduationCap className="w-8 h-8 text-purple-600" />
                  <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Campus Connect
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 group relative overflow-hidden ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-700 shadow-lg'
                      : 'hover:bg-white/10 text-gray-700 hover:text-purple-600'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {/* Glowing underline effect */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
                      initial={false}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                  
                  <Icon className={`w-5 h-5 ${isActive ? 'text-purple-600' : ''}`} />
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="font-medium"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all duration-300" />
                </Link>
              );
            })}
          </nav>

          {/* User Profile & Logout */}
          <div className="border-t border-white/20 pt-4 space-y-2">
            <AnimatePresence>
              {isOpen && user && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-white/5"
                >
                  <img
                    src={user.avatar || `https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop`}
                    alt={user.name}
                    className="w-8 h-8 rounded-full border-2 border-purple-300"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-600 capitalize">{user.role}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 p-3 rounded-lg w-full text-left hover:bg-red-500/10 text-red-600 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <AnimatePresence>
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="font-medium"
                  >
                    Logout
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;