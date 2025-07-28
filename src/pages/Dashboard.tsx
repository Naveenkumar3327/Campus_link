import React from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Calendar, 
  Search, 
  MessageSquare, 
  BarChart3, 
  Calendar as CalendarIcon,
  Users,
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';
import { mockAnnouncements, mockEvents, mockComplaints } from '../data/mockData';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const getQuickStats = () => {
    if (user?.role === 'admin') {
      return [
        { label: 'Total Users', value: '1,234', icon: Users, color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-500/10' },
        { label: 'Active Complaints', value: '23', icon: MessageSquare, color: 'from-orange-500 to-orange-600', bgColor: 'bg-orange-500/10' },
        { label: 'Recent Events', value: '8', icon: CalendarIcon, color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-500/10' },
        { label: 'Announcements', value: '12', icon: Bell, color: 'from-green-500 to-green-600', bgColor: 'bg-green-500/10' }
      ];
    } else if (user?.role === 'staff') {
      return [
        { label: 'My Events', value: '5', icon: CalendarIcon, color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-500/10' },
        { label: 'Resolved Complaints', value: '18', icon: CheckCircle, color: 'from-green-500 to-green-600', bgColor: 'bg-green-500/10' },
        { label: 'Active Polls', value: '3', icon: BarChart3, color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-500/10' },
        { label: 'Lost Items', value: '7', icon: Search, color: 'from-orange-500 to-orange-600', bgColor: 'bg-orange-500/10' }
      ];
    } else {
      return [
        { label: 'My Classes', value: '6', icon: Calendar, color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-500/10' },
        { label: 'Upcoming Events', value: '4', icon: CalendarIcon, color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-500/10' },
        { label: 'My Complaints', value: '2', icon: MessageSquare, color: 'from-orange-500 to-orange-600', bgColor: 'bg-orange-500/10' },
        { label: 'Polls Participated', value: '8', icon: BarChart3, color: 'from-green-500 to-green-600', bgColor: 'bg-green-500/10' }
      ];
    }
  };

  const quickStats = getQuickStats();

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl"
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
          <div className="absolute inset-0 bg-black/20" />
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-20 h-20 bg-white/10 rounded-full"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: Math.random() * 8 + 4,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 p-8 text-white">
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold mb-2"
          >
            Welcome back, {user?.name}! 👋
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl opacity-90 capitalize"
          >
            {user?.role} Dashboard
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-4 flex items-center space-x-2 text-sm opacity-80"
          >
            <Clock className="w-4 h-4" />
            <span>{new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <GlassCard className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-2xl ${stat.bgColor}`}>
                    <Icon className={`w-8 h-8 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} style={{ 
                      background: `linear-gradient(to right, var(--tw-gradient-stops))`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }} />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+12% from last month</span>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Announcements */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0 }}
        >
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <Bell className="w-5 h-5 mr-2 text-purple-600" />
                Recent Announcements
              </h3>
              <span className="text-sm text-purple-600 font-medium">View All</span>
            </div>
            <div className="space-y-4">
              {mockAnnouncements.slice(0, 3).map((announcement, index) => (
                <motion.div
                  key={announcement.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + index * 0.1 }}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/30 transition-colors"
                >
                  <div className={`
                    p-2 rounded-lg
                    ${announcement.category === 'exam' ? 'bg-red-100 text-red-600' : 
                      announcement.category === 'event' ? 'bg-purple-100 text-purple-600' : 
                      'bg-blue-100 text-blue-600'}
                  `}>
                    <Bell className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 text-sm">{announcement.title}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      {announcement.date.toLocaleDateString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 }}
        >
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2 text-blue-600" />
                Upcoming Events
              </h3>
              <span className="text-sm text-blue-600 font-medium">View All</span>
            </div>
            <div className="space-y-4">
              {mockEvents.slice(0, 2).map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 + index * 0.1 }}
                  className="flex items-start space-x-4 p-3 rounded-lg hover:bg-white/30 transition-colors"
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 text-sm">{event.title}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      {event.date.toLocaleDateString()} • {event.location}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
      >
        <GlassCard className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {user?.role === 'student' && (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center p-4 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-all duration-300"
                >
                  <Calendar className="w-8 h-8 text-purple-600 mb-2" />
                  <span className="text-sm font-medium text-gray-700">View Timetable</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center p-4 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 transition-all duration-300"
                >
                  <MessageSquare className="w-8 h-8 text-blue-600 mb-2" />
                  <span className="text-sm font-medium text-gray-700">File Complaint</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center p-4 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transition-all duration-300"
                >
                  <Search className="w-8 h-8 text-green-600 mb-2" />
                  <span className="text-sm font-medium text-gray-700">Lost & Found</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center p-4 rounded-lg bg-gradient-to-br from-orange-50 to-yellow-50 hover:from-orange-100 hover:to-yellow-100 transition-all duration-300"
                >
                  <BarChart3 className="w-8 h-8 text-orange-600 mb-2" />
                  <span className="text-sm font-medium text-gray-700">View Polls</span>
                </motion.button>
              </>
            )}
            {(user?.role === 'staff' || user?.role === 'admin') && (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center p-4 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-all duration-300"
                >
                  <Bell className="w-8 h-8 text-purple-600 mb-2" />
                  <span className="text-sm font-medium text-gray-700">Post Announcement</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center p-4 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 transition-all duration-300"
                >
                  <CalendarIcon className="w-8 h-8 text-blue-600 mb-2" />
                  <span className="text-sm font-medium text-gray-700">Create Event</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center p-4 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transition-all duration-300"
                >
                  <BarChart3 className="w-8 h-8 text-green-600 mb-2" />
                  <span className="text-sm font-medium text-gray-700">Manage Polls</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center p-4 rounded-lg bg-gradient-to-br from-orange-50 to-yellow-50 hover:from-orange-100 hover:to-yellow-100 transition-all duration-300"
                >
                  <MessageSquare className="w-8 h-8 text-orange-600 mb-2" />
                  <span className="text-sm font-medium text-gray-700">Review Complaints</span>
                </motion.button>
              </>
            )}
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default Dashboard;