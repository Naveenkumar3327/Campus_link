import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Plus, Send, Calendar, User, Reply } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import AnimatedButton from '../components/AnimatedButton';
import { mockFeedback } from '../data/mockData';
import { Feedback } from '../types';
import { useAuth } from '../context/AuthContext';

const FeedbackPage: React.FC = () => {
  const { user } = useAuth();
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(mockFeedback);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [newFeedback, setNewFeedback] = useState({
    title: '',
    message: ''
  });
  const [response, setResponse] = useState('');

  const canRespond = user?.role === 'admin';
  const userFeedbacks = user?.role === 'student' 
    ? feedbacks.filter(f => f.userId === user.id)
    : feedbacks;

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFeedback.title || !newFeedback.message) return;

    const feedback: Feedback = {
      id: Date.now().toString(),
      title: newFeedback.title,
      message: newFeedback.message,
      date: new Date(),
      userId: user?.id || '1',
      userName: user?.name || 'Unknown'
    };

    setFeedbacks([feedback, ...feedbacks]);
    setNewFeedback({ title: '', message: '' });
    setShowAddModal(false);
  };

  const handleSubmitResponse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!response || !selectedFeedback) return;

    setFeedbacks(feedbacks.map(feedback =>
      feedback.id === selectedFeedback.id
        ? { ...feedback, response: response }
        : feedback
    ));

    setResponse('');
    setSelectedFeedback(null);
    setShowResponseModal(false);
  };

  const openResponseModal = (feedback: Feedback) => {
    setSelectedFeedback(feedback);
    setResponse(feedback.response || '');
    setShowResponseModal(true);
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
            <MessageCircle className="w-8 h-8 mr-3 text-purple-600" />
            {user?.role === 'student' ? 'My Feedback' : 'Student Feedback'}
          </h1>
          <p className="text-gray-600">
            {user?.role === 'student' 
              ? 'Share your thoughts and suggestions to help improve campus life'
              : 'Review and respond to student feedback'}
          </p>
        </div>
        
        {user?.role === 'student' && (
          <AnimatedButton
            onClick={() => setShowAddModal(true)}
            icon={Plus}
            className="mt-4 sm:mt-0"
          >
            Submit Feedback
          </AnimatedButton>
        )}
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Feedback</p>
                <p className="text-3xl font-bold text-gray-800">{userFeedbacks.length}</p>
              </div>
              <div className="p-3 rounded-2xl bg-purple-500/10">
                <MessageCircle className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Responded</p>
                <p className="text-3xl font-bold text-gray-800">
                  {userFeedbacks.filter(f => f.response).length}
                </p>
              </div>
              <div className="p-3 rounded-2xl bg-green-500/10">
                <Reply className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <GlassCard className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending</p>
                <p className="text-3xl font-bold text-gray-800">
                  {userFeedbacks.filter(f => !f.response).length}
                </p>
              </div>
              <div className="p-3 rounded-2xl bg-orange-500/10">
                <Send className="w-8 h-8 text-orange-600" />
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Feedback List */}
      <div className="space-y-6">
        <AnimatePresence>
          {userFeedbacks.map((feedback, index) => (
            <motion.div
              key={feedback.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-800">{feedback.title}</h3>
                      {feedback.response && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full border border-green-200">
                          Responded
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{feedback.date.toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{feedback.userName}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed mb-4">{feedback.message}</p>
                    
                    {feedback.response && (
                      <div className="bg-blue-50/50 border border-blue-200/50 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Reply className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium text-blue-800">Admin Response:</span>
                        </div>
                        <p className="text-blue-700 text-sm">{feedback.response}</p>
                      </div>
                    )}
                  </div>
                  
                  {canRespond && (
                    <div className="mt-4 lg:mt-0 lg:ml-6">
                      <AnimatedButton
                        onClick={() => openResponseModal(feedback)}
                        variant="secondary"
                        size="sm"
                        icon={Reply}
                      >
                        {feedback.response ? 'Edit Response' : 'Respond'}
                      </AnimatedButton>
                    </div>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {userFeedbacks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-500 mb-2">No feedback submitted</h3>
            <p className="text-gray-400">
              {user?.role === 'student' 
                ? 'Submit your first feedback to help improve campus services'
                : 'No student feedback available at the moment'}
            </p>
          </motion.div>
        )}
      </div>

      {/* Submit Feedback Modal */}
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
                <h3 className="text-xl font-semibold text-gray-800">Submit Feedback</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmitFeedback} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={newFeedback.title}
                    onChange={(e) => setNewFeedback({ ...newFeedback, title: e.target.value })}
                    className="w-full px-4 py-3 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Brief title for your feedback"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    value={newFeedback.message}
                    onChange={(e) => setNewFeedback({ ...newFeedback, message: e.target.value })}
                    className="w-full px-4 py-3 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    rows={5}
                    placeholder="Share your thoughts, suggestions, or concerns..."
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
                    icon={Send}
                  >
                    Submit
                  </AnimatedButton>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Response Modal */}
      <AnimatePresence>
        {showResponseModal && selectedFeedback && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowResponseModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 shadow-2xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Respond to Feedback</h3>
                <button
                  onClick={() => setShowResponseModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>

              <div className="mb-4 p-4 bg-gray-50/50 rounded-lg border border-gray-200/50">
                <h4 className="font-medium text-gray-800 mb-2">{selectedFeedback.title}</h4>
                <p className="text-sm text-gray-600">{selectedFeedback.message}</p>
              </div>

              <form onSubmit={handleSubmitResponse} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Response</label>
                  <textarea
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    className="w-full px-4 py-3 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    rows={4}
                    placeholder="Write your response to this feedback..."
                    required
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <AnimatedButton
                    type="button"
                    variant="secondary"
                    onClick={() => setShowResponseModal(false)}
                    className="flex-1"
                  >
                    Cancel
                  </AnimatedButton>
                  <AnimatedButton
                    type="submit"
                    className="flex-1"
                    icon={Send}
                  >
                    Send Response
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

export default FeedbackPage;