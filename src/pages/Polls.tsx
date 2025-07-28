import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, Plus, Vote, Users, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import GlassCard from '../components/GlassCard';
import AnimatedButton from '../components/AnimatedButton';
import { mockPolls } from '../data/mockData';
import { Poll, PollOption } from '../types';
import { useAuth } from '../context/AuthContext';

const Polls: React.FC = () => {
  const { user } = useAuth();
  const [polls, setPolls] = useState<Poll[]>(mockPolls);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPoll, setNewPoll] = useState({
    question: '',
    options: ['', '']
  });
  const [votedPolls, setVotedPolls] = useState<Set<string>>(new Set());

  const canCreatePolls = user?.role === 'admin' || user?.role === 'staff';

  const handleCreatePoll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPoll.question || newPoll.options.some(opt => !opt.trim())) return;

    const poll: Poll = {
      id: Date.now().toString(),
      question: newPoll.question,
      options: newPoll.options.map((text, index) => ({
        id: (index + 1).toString(),
        text: text.trim(),
        votes: 0
      })),
      createdBy: user?.name || 'Unknown',
      createdAt: new Date(),
      votedUsers: []
    };

    setPolls([poll, ...polls]);
    setNewPoll({ question: '', options: ['', ''] });
    setShowCreateModal(false);
  };

  const handleVote = (pollId: string, optionId: string) => {
    if (votedPolls.has(pollId)) return;

    setPolls(polls.map(poll => {
      if (poll.id === pollId) {
        return {
          ...poll,
          options: poll.options.map(option =>
            option.id === optionId
              ? { ...option, votes: option.votes + 1 }
              : option
          ),
          votedUsers: [...poll.votedUsers, user?.id || 'anonymous']
        };
      }
      return poll;
    }));

    setVotedPolls(new Set([...votedPolls, pollId]));
  };

  const addOption = () => {
    if (newPoll.options.length < 6) {
      setNewPoll({ ...newPoll, options: [...newPoll.options, ''] });
    }
  };

  const removeOption = (index: number) => {
    if (newPoll.options.length > 2) {
      setNewPoll({
        ...newPoll,
        options: newPoll.options.filter((_, i) => i !== index)
      });
    }
  };

  const updateOption = (index: number, value: string) => {
    const updatedOptions = [...newPoll.options];
    updatedOptions[index] = value;
    setNewPoll({ ...newPoll, options: updatedOptions });
  };

  const getTotalVotes = (poll: Poll) => {
    return poll.options.reduce((total, option) => total + option.votes, 0);
  };

  const getChartData = (poll: Poll) => {
    return poll.options.map(option => ({
      name: option.text.length > 20 ? option.text.substring(0, 20) + '...' : option.text,
      votes: option.votes,
      percentage: getTotalVotes(poll) > 0 ? Math.round((option.votes / getTotalVotes(poll)) * 100) : 0
    }));
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
            <BarChart3 className="w-8 h-8 mr-3 text-purple-600" />
            Polls
          </h1>
          <p className="text-gray-600">Voice your opinion and see community insights</p>
        </div>
        
        {canCreatePolls && (
          <AnimatedButton
            onClick={() => setShowCreateModal(true)}
            icon={Plus}
            className="mt-4 sm:mt-0"
          >
            Create Poll
          </AnimatedButton>
        )}
      </motion.div>

      {/* Polls List */}
      <div className="space-y-8">
        <AnimatePresence>
          {polls.map((poll, index) => {
            const totalVotes = getTotalVotes(poll);
            const hasVoted = votedPolls.has(poll.id);
            const chartData = getChartData(poll);

            return (
              <motion.div
                key={poll.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">{poll.question}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>Created by {poll.createdBy}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{poll.createdAt.toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Vote className="w-4 h-4" />
                        <span>{totalVotes} votes</span>
                      </div>
                    </div>
                  </div>

                  {!hasVoted && user?.role === 'student' ? (
                    <div className="space-y-3">
                      <p className="text-gray-600 mb-4">Choose your option:</p>
                      {poll.options.map((option) => (
                        <motion.button
                          key={option.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleVote(poll.id, option.id)}
                          className="w-full p-4 text-left bg-white/30 border border-white/30 rounded-lg hover:bg-white/40 hover:border-purple-300 transition-all duration-300 group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-800">{option.text}</span>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <Vote className="w-5 h-5 text-purple-600" />
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {hasVoted && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                          <p className="text-green-700 text-sm font-medium">✓ Thank you for voting!</p>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Results List */}
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-800 mb-3">Results:</h4>
                          {poll.options.map((option) => {
                            const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
                            
                            return (
                              <div key={option.id} className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-gray-700 font-medium">{option.text}</span>
                                  <span className="text-sm text-gray-500">
                                    {option.votes} votes ({Math.round(percentage)}%)
                                  </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percentage}%` }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Chart */}
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-3">Visual Results:</h4>
                          <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis 
                                  dataKey="name" 
                                  tick={{ fontSize: 12 }}
                                  stroke="#6b7280"
                                />
                                <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
                                <Tooltip 
                                  contentStyle={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                    border: '1px solid rgba(0, 0, 0, 0.1)',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                                  }}
                                />
                                <Bar 
                                  dataKey="votes" 
                                  fill="url(#gradient)"
                                  radius={[4, 4, 0, 0]}
                                />
                                <defs>
                                  <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#8b5cf6" />
                                    <stop offset="100%" stopColor="#ec4899" />
                                  </linearGradient>
                                </defs>
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </GlassCard>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {polls.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-500 mb-2">No polls available</h3>
            <p className="text-gray-400">Check back later for new polls</p>
          </motion.div>
        )}
      </div>

      {/* Create Poll Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 shadow-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Create Poll</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleCreatePoll} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
                  <textarea
                    value={newPoll.question}
                    onChange={(e) => setNewPoll({ ...newPoll, question: e.target.value })}
                    className="w-full px-4 py-3 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    rows={2}
                    placeholder="What would you like to ask?"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
                  <div className="space-y-2">
                    {newPoll.options.map((option, index) => (
                      <div key={index} className="flex space-x-2">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => updateOption(index, e.target.value)}
                          className="flex-1 px-4 py-3 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder={`Option ${index + 1}`}
                          required
                        />
                        {newPoll.options.length > 2 && (
                          <button
                            type="button"
                            onClick={() => removeOption(index)}
                            className="px-3 py-3 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {newPoll.options.length < 6 && (
                    <button
                      type="button"
                      onClick={addOption}
                      className="mt-2 text-sm text-purple-600 hover:text-purple-700 font-medium"
                    >
                      + Add option
                    </button>
                  )}
                </div>

                <div className="flex space-x-3 pt-4">
                  <AnimatedButton
                    type="button"
                    variant="secondary"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1"
                  >
                    Cancel
                  </AnimatedButton>
                  <AnimatedButton
                    type="submit"
                    className="flex-1"
                  >
                    Create Poll
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

export default Polls;