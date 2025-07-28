import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Plus, Clock, BookOpen, Edit2, Trash2 } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import AnimatedButton from '../components/AnimatedButton';
import { mockTimetable } from '../data/mockData';
import { TimetableEntry } from '../types';
import { useAuth } from '../context/AuthContext';

const Timetable: React.FC = () => {
  const { user } = useAuth();
  const [timetable, setTimetable] = useState<TimetableEntry[]>(
    mockTimetable.filter(entry => entry.userId === user?.id)
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingEntry, setEditingEntry] = useState<TimetableEntry | null>(null);
  const [newEntry, setNewEntry] = useState({
    subject: '',
    time: '',
    day: 'Monday'
  });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntry.subject || !newEntry.time) return;

    if (editingEntry) {
      setTimetable(timetable.map(entry => 
        entry.id === editingEntry.id 
          ? { ...entry, ...newEntry }
          : entry
      ));
      setEditingEntry(null);
    } else {
      const entry: TimetableEntry = {
        id: Date.now().toString(),
        subject: newEntry.subject,
        time: newEntry.time,
        day: newEntry.day,
        userId: user?.id || '1'
      };
      setTimetable([...timetable, entry]);
    }
    
    setNewEntry({ subject: '', time: '', day: 'Monday' });
    setShowAddModal(false);
  };

  const handleEdit = (entry: TimetableEntry) => {
    setEditingEntry(entry);
    setNewEntry({
      subject: entry.subject,
      time: entry.time,
      day: entry.day
    });
    setShowAddModal(true);
  };

  const handleDelete = (id: string) => {
    setTimetable(timetable.filter(entry => entry.id !== id));
  };

  const getEntriesForDay = (day: string) => {
    return timetable
      .filter(entry => entry.day === day)
      .sort((a, b) => a.time.localeCompare(b.time));
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
            <Calendar className="w-8 h-8 mr-3 text-purple-600" />
            My Timetable
          </h1>
          <p className="text-gray-600">Manage your weekly class schedule</p>
        </div>
        
        <AnimatedButton
          onClick={() => {
            setEditingEntry(null);
            setNewEntry({ subject: '', time: '', day: 'Monday' });
            setShowAddModal(true);
          }}
          icon={Plus}
          className="mt-4 sm:mt-0"
        >
          Add Class
        </AnimatedButton>
      </motion.div>

      {/* Timetable Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {days.map((day, dayIndex) => {
          const dayEntries = getEntriesForDay(day);
          
          return (
            <motion.div
              key={day}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: dayIndex * 0.1 }}
            >
              <GlassCard className="p-6 h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">{day}</h3>
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                </div>
                
                <div className="space-y-3 min-h-[200px]">
                  <AnimatePresence>
                    {dayEntries.map((entry, index) => (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white/30 backdrop-blur-sm rounded-lg p-4 border border-white/20 group hover:border-purple-300 transition-all duration-300"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <BookOpen className="w-4 h-4 text-purple-600" />
                              <h4 className="font-medium text-gray-800 text-sm">{entry.subject}</h4>
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-gray-600">
                              <Clock className="w-3 h-3" />
                              <span>{entry.time}</span>
                            </div>
                          </div>
                          
                          <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleEdit(entry)}
                              className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handleDelete(entry.id)}
                              className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {dayEntries.length === 0 && (
                    <div className="flex items-center justify-center h-32 text-gray-400">
                      <div className="text-center">
                        <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No classes</p>
                      </div>
                    </div>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      {/* Add/Edit Modal */}
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
                <h3 className="text-xl font-semibold text-gray-800">
                  {editingEntry ? 'Edit Class' : 'Add New Class'}
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    value={newEntry.subject}
                    onChange={(e) => setNewEntry({ ...newEntry, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter subject name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <input
                    type="text"
                    value={newEntry.time}
                    onChange={(e) => setNewEntry({ ...newEntry, time: e.target.value })}
                    className="w-full px-4 py-3 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., 09:00 AM - 10:30 AM"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Day</label>
                  <select
                    value={newEntry.day}
                    onChange={(e) => setNewEntry({ ...newEntry, day: e.target.value })}
                    className="w-full px-4 py-3 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {days.map(day => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
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
                    {editingEntry ? 'Update' : 'Add'}
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

export default Timetable;