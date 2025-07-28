import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Plus, Filter, Calendar, User, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import AnimatedButton from '../components/AnimatedButton';
import { mockComplaints } from '../data/mockData';
import { Complaint } from '../types';
import { useAuth } from '../context/AuthContext';

const Complaints: React.FC = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState<Complaint[]>(mockComplaints);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newComplaint, setNewComplaint] = useState({
    title: '',
    description: '',
    category: 'other' as 'water' | 'cleaning' | 'electricity' | 'internet' | 'other'
  });

  const canUpdateStatus = user?.role === 'admin' || user?.role === 'staff';
  const userComplaints = user?.role === 'student' 
    ? complaints.filter(c => c.userId === user.id)
    : complaints;

  const filteredComplaints = userComplaints.filter(complaint => {
    const matchesStatus = filterStatus === 'all' || complaint.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || complaint.category === filterCategory;
    return matchesStatus && matchesCategory;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComplaint.title || !newComplaint.description) return;

    const complaint: Complaint = {
      id: Date.now().toString(),
      title: newComplaint.title,
      description: newComplaint.description,
      category: newComplaint.category,
      status: 'pending',
      date: new Date(),
      userId: user?.id || '1',
      userName: user?.name || 'Unknown'
    };

    setComplaints([complaint, ...complaints]);
    setNewComplaint({ title: '', description: '', category: 'other' });
    setShowAddModal(false);
  };

  const updateComplaintStatus = (id: string, status: 'pending' | 'in-progress' | 'resolved') => {
    setComplaints(complaints.map(complaint =>
      complaint.id === id ? { ...complaint, status } : complaint
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'in-progress': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'resolved': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return AlertTriangle;
      case 'in-progress': return Clock;
      case 'resolved': return CheckCircle;
      default: return AlertTriangle;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'water': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'cleaning': return 'bg-green-100 text-green-700 border-green-200';
      case 'electricity': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'internet': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
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
            <MessageSquare className="w-8 h-8 mr-3 text-purple-600" />
            {user?.role === 'student' ? 'My Complaints' : 'All Complaints'}
          </h1>
          <p className="text-gray-600">
            {user?.role === 'student' 
              ? 'Track your hostel complaints and their resolution status'
              : 'Manage and resolve student complaints'}
          </p>
        </div>
        
        {user?.role === 'student' && (
          <AnimatedButton
            onClick={() => setShowAddModal(true)}
            icon={Plus}
            className="mt-4 sm:mt-0"
          >
            File Complaint
          </AnimatedButton>
        )}
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['pending', 'in-progress', 'resolved'].map((status, index) => {
          const count = userComplaints.filter(c => c.status === status).length;
          const StatusIcon = getStatusIcon(status);
          
          return (
            <motion.div
              key={status}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1 capitalize">{status.replace('-', ' ')}</p>
                    <p className="text-3xl font-bold text-gray-800">{count}</p>
                  </div>
                  <div className={`p-3 rounded-2xl ${getStatusColor(status).split(' ')[0]}/10`}>
                    <StatusIcon className="w-8 h-8" />
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
        transition={{ delay: 0.4 }}
      >
        <GlassCard className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
            
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-3 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="water">Water</option>
              <option value="cleaning">Cleaning</option>
              <option value="electricity">Electricity</option>
              <option value="internet">Internet</option>
              <option value="other">Other</option>
            </select>
          </div>
        </GlassCard>
      </motion.div>

      {/* Complaints List */}
      <div className="space-y-6">
        <AnimatePresence>
          {filteredComplaints.map((complaint, index) => {
            const StatusIcon = getStatusIcon(complaint.status);
            
            return (
              <motion.div
                key={complaint.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center ${getStatusColor(complaint.status)}`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {complaint.status.replace('-', ' ').charAt(0).toUpperCase() + complaint.status.replace('-', ' ').slice(1)}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(complaint.category)}`}>
                          {complaint.category.charAt(0).toUpperCase() + complaint.category.slice(1)}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{complaint.title}</h3>
                      <p className="text-gray-600 mb-4">{complaint.description}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{complaint.date.toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{complaint.userName}</span>
                        </div>
                      </div>
                    </div>
                    
                    {canUpdateStatus && complaint.status !== 'resolved' && (
                      <div className="mt-4 lg:mt-0 lg:ml-6">
                        <div className="flex flex-col space-y-2">
                          <label className="text-sm font-medium text-gray-700">Update Status:</label>
                          <select
                            value={complaint.status}
                            onChange={(e) => updateComplaintStatus(complaint.id, e.target.value as any)}
                            className="px-3 py-2 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                          >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        {filteredComplaints.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-500 mb-2">No complaints found</h3>
            <p className="text-gray-400">
              {user?.role === 'student' 
                ? 'You haven\'t filed any complaints yet'
                : 'No complaints match your current filters'}
            </p>
          </motion.div>
        )}
      </div>

      {/* Add Complaint Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 shadow-2xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800">File Complaint</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={newComplaint.title}
                    onChange={(e) => setNewComplaint({ ...newComplaint, title: e.target.value })}
                    className="w-full px-4 py-3 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Brief description of the issue"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={newComplaint.category}
                    onChange={(e) => setNewComplaint({ ...newComplaint, category: e.target.value as any })}
                    className="w-full px-4 py-3 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="water">Water</option>
                    <option value="cleaning">Cleaning</option>
                    <option value="electricity">Electricity</option>
                    <option value="internet">Internet</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={newComplaint.description}
                    onChange={(e) => setNewComplaint({ ...newComplaint, description: e.target.value })}
                    className="w-full px-4 py-3 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    rows={4}
                    placeholder="Provide detailed information about the issue"
                    required
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <AnimatedButton
                    type="button"
                    variant="secondary"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1"
                  >
                    Cancel
                  </AnimatedButton>
                  <AnimatedButton
                    type="submit"
                    className="flex-1"
                  >
                    Submit
                  </AnimatedButton>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Complaints;