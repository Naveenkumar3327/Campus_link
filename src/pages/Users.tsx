import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users as UsersIcon, Search, Filter, User as UserIcon, Mail, Calendar, Shield } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { mockUsers } from '../data/mockData';
import { User } from '../types';
// import { User } from '../types';

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.rollNumber && user.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-700 border-red-200';
      case 'staff': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'student': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return Shield;
      case 'staff': return UserIcon;
      case 'student': return UserIcon;
      default: return UserIcon;
    }
  };

  const roleStats = {
    admin: users.filter(u => u.role === 'admin').length,
    staff: users.filter(u => u.role === 'staff').length,
    student: users.filter(u => u.role === 'student').length
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
            <UsersIcon className="w-8 h-8 mr-3 text-purple-600" />
            User Management
          </h1>
          <p className="text-gray-600">Manage and monitor all campus users</p>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Users</p>
                <p className="text-3xl font-bold text-gray-800">{users.length}</p>
              </div>
              <div className="p-3 rounded-2xl bg-purple-500/10">
                <UsersIcon className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {Object.entries(roleStats).map(([role, count], index) => {
          const RoleIcon = getRoleIcon(role);
          return (
            <motion.div
              key={role}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <GlassCard className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1 capitalize">{role}s</p>
                    <p className="text-3xl font-bold text-gray-800">{count}</p>
                  </div>
                  <div className={`p-3 rounded-2xl ${getRoleColor(role).split(' ')[0]}/10`}>
                    <RoleIcon className="w-8 h-8" />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <GlassCard className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search users by name, email, or roll number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-4 py-3 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admins</option>
                <option value="staff">Staff</option>
                <option value="student">Students</option>
              </select>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredUsers.map((user, index) => {
            const RoleIcon = getRoleIcon(user.role);

            return (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="relative">
                      <img
                        src={user.avatar || `https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop`}
                        alt={user.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-white/30"
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-800">{user.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center ${getRoleColor(user.role)}`}>
                          <RoleIcon className="w-3 h-3 mr-1" />
                          {user.role}
                        </span>
                      </div>

                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4" />
                          <span className="truncate">{user.email}</span>
                        </div>

                        {user.rollNumber && (
                          <div className="flex items-center space-x-2">
                            <UserIcon className="w-4 h-4" />
                            <span>{user.rollNumber}</span>
                          </div>
                        )}

                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>Joined {user.createdAt.toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredUsers.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <UsersIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-500 mb-2">No users found</h3>
          <p className="text-gray-400">Try adjusting your search or filter criteria</p>
        </motion.div>
      )}
    </div>
  );
};

export default Users;