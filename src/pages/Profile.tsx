import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Shield, Hash, Calendar, Edit2, Save, X } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import AnimatedButton from '../components/AnimatedButton';
import { useAuth } from '../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || '',
    rollNumber: user?.rollNumber || ''
  });

  const handleSave = () => {
    // In a real app, this would call an API to update the user
    toast.success('Profile updated successfully!');
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser({
      name: user?.name || '',
      email: user?.email || '',
      avatar: user?.avatar || '',
      rollNumber: user?.rollNumber || ''
    });
    setIsEditing(false);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-700 border-red-200';
      case 'staff': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'student': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'from-red-500 to-red-600';
      case 'staff': return 'from-blue-500 to-blue-600';
      case 'student': return 'from-green-500 to-green-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Toaster position="top-right" />
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
            <User className="w-8 h-8 mr-3 text-purple-600" />
            My Profile
          </h1>
          <p className="text-gray-600">Manage your account information and preferences</p>
        </div>
        
        <div className="mt-4 sm:mt-0">
          {isEditing ? (
            <div className="flex space-x-3">
              <AnimatedButton
                onClick={handleCancel}
                variant="secondary"
                icon={X}
              >
                Cancel
              </AnimatedButton>
              <AnimatedButton
                onClick={handleSave}
                icon={Save}
              >
                Save Changes
              </AnimatedButton>
            </div>
          ) : (
            <AnimatedButton
              onClick={() => setIsEditing(true)}
              icon={Edit2}
            >
              Edit Profile
            </AnimatedButton>
          )}
        </div>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <GlassCard className="overflow-hidden">
          {/* Header with gradient */}
          <div className={`h-32 bg-gradient-to-r ${getRoleBadgeColor(user.role)} relative`}>
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-4 left-6 text-white">
              <h2 className="text-2xl font-bold capitalize">{user.role} Profile</h2>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-8">
            <div className="flex flex-col lg:flex-row lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
              {/* Avatar Section */}
              <div className="flex flex-col items-center lg:items-start">
                <div className="relative -mt-16 mb-4">
                  <img
                    src={isEditing && editedUser.avatar ? editedUser.avatar : (user.avatar || `https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop`)}
                    alt={user.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
                
                {isEditing && (
                  <div className="w-full max-w-xs">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Avatar URL</label>
                    <input
                      type="url"
                      value={editedUser.avatar}
                      onChange={(e) => setEditedUser({ ...editedUser, avatar: e.target.value })}
                      className="w-full px-3 py-2 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                      placeholder="Enter image URL"
                    />
                  </div>
                )}
              </div>
              
              {/* Details Section */}
              <div className="flex-1 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedUser.name}
                        onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                        className="w-full px-4 py-3 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="p-3 bg-white/30 rounded-lg border border-white/20">
                        <span className="text-gray-800 font-medium">{user.name}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editedUser.email}
                        onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                        className="w-full px-4 py-3 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="p-3 bg-white/30 rounded-lg border border-white/20">
                        <span className="text-gray-800">{user.email}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Role */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Shield className="w-4 h-4 inline mr-2" />
                      Role
                    </label>
                    <div className="p-3 bg-white/30 rounded-lg border border-white/20">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border capitalize ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                    </div>
                  </div>
                  
                  {/* Roll Number (for students) */}
                  {user.role === 'student' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Hash className="w-4 h-4 inline mr-2" />
                        Roll Number
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedUser.rollNumber}
                          onChange={(e) => setEditedUser({ ...editedUser, rollNumber: e.target.value })}
                          className="w-full px-4 py-3 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      ) : (
                        <div className="p-3 bg-white/30 rounded-lg border border-white/20">
                          <span className="text-gray-800 font-mono">{user.rollNumber}</span>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Member Since */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Member Since
                    </label>
                    <div className="p-3 bg-white/30 rounded-lg border border-white/20">
                      <span className="text-gray-800">{user.createdAt.toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <GlassCard className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Account Activity</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-white/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {user.role === 'student' ? '12' : user.role === 'staff' ? '8' : '25'}
              </div>
              <div className="text-sm text-gray-600">
                {user.role === 'student' ? 'Classes This Week' : user.role === 'staff' ? 'Events Created' : 'Total Announcements'}
              </div>
            </div>
            
            <div className="text-center p-4 bg-white/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {user.role === 'student' ? '3' : user.role === 'staff' ? '15' : '47'}
              </div>
              <div className="text-sm text-gray-600">
                {user.role === 'student' ? 'Feedback Submitted' : user.role === 'staff' ? 'Complaints Resolved' : 'Users Managed'}
              </div>
            </div>
            
            <div className="text-center p-4 bg-white/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {user.role === 'student' ? '5' : user.role === 'staff' ? '6' : '18'}
              </div>
              <div className="text-sm text-gray-600">
                {user.role === 'student' ? 'Events Attended' : user.role === 'staff' ? 'Polls Created' : 'System Updates'}
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default Profile;