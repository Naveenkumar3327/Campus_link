// src/components/pages/student/feedbackpolls/index.tsx
import React, { useState, useEffect } from 'react';
import StudentNavigation from '../student/navigationbar';
import {
    MessageSquare,
    ThumbsUp,
    ThumbsDown,
    BarChart3,
    Users,
    Clock,
    Star,
    CheckCircle,
    Plus,
    Filter,
    Search,
    Send,
    Eye,
    Calendar
} from 'lucide-react';

interface Poll {
    id: string;
    title: string;
    description: string;
    category: 'academic' | 'facilities' | 'events' | 'services' | 'general';
    type: 'multiple-choice' | 'rating' | 'yes-no' | 'text';
    options?: string[];
    createdBy: string;
    createdDate: string;
    endDate: string;
    totalVotes: number;
    hasVoted: boolean;
    userVote?: string | number;
    results?: { [key: string]: number };
    isActive: boolean;
}

interface Feedback {
    id: string;
    title: string;
    description: string;
    category: 'academic' | 'facilities' | 'events' | 'services' | 'general';
    rating: number;
    createdBy: string;
    createdDate: string;
    status: 'pending' | 'reviewed' | 'resolved';
    responses: number;
    isAnonymous: boolean;
}

function FeedbackPollsPage() {
    const [polls, setPolls] = useState<Poll[]>([]);
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [currentView, setCurrentView] = useState<'polls' | 'feedback' | 'my-submissions'>('polls');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [showCreateForm, setShowCreateForm] = useState(false);

    useEffect(() => {
        // Load polls from localStorage
        const savedPolls = localStorage.getItem('campusPolls');
        if (savedPolls) {
            setPolls(JSON.parse(savedPolls));
        } else {
            const defaultPolls: Poll[] = [
                {
                    id: 'POLL001',
                    title: 'Campus Food Quality Improvement',
                    description: 'How would you rate the overall quality of food served in the campus cafeteria?',
                    category: 'facilities',
                    type: 'rating',
                    createdBy: 'Student Council',
                    createdDate: '2025-01-20T10:00:00Z',
                    endDate: '2025-02-20T23:59:59Z',
                    totalVotes: 234,
                    hasVoted: true,
                    userVote: 4,
                    results: { '1': 12, '2': 23, '3': 45, '4': 89, '5': 65 },
                    isActive: true
                },
                {
                    id: 'POLL002',
                    title: 'Preferred Study Hours for Library',
                    description: 'What should be the extended study hours for the library during exam periods?',
                    category: 'academic',
                    type: 'multiple-choice',
                    options: ['6 AM - 10 PM', '24/7 Access', '7 AM - 11 PM', '8 AM - 12 AM'],
                    createdBy: 'Library Committee',
                    createdDate: '2025-01-18T14:30:00Z',
                    endDate: '2025-02-15T23:59:59Z',
                    totalVotes: 156,
                    hasVoted: false,
                    results: { '6 AM - 10 PM': 34, '24/7 Access': 67, '7 AM - 11 PM': 28, '8 AM - 12 AM': 27 },
                    isActive: true
                },
                {
                    id: 'POLL003',
                    title: 'Should we have more cultural events?',
                    description: 'Do you think the college should organize more cultural events throughout the semester?',
                    category: 'events',
                    type: 'yes-no',
                    options: ['Yes', 'No'],
                    createdBy: 'Cultural Committee',
                    createdDate: '2025-01-15T09:15:00Z',
                    endDate: '2025-02-10T23:59:59Z',
                    totalVotes: 298,
                    hasVoted: true,
                    userVote: 'Yes',
                    results: { 'Yes': 234, 'No': 64 },
                    isActive: true
                }
            ];

            setPolls(defaultPolls);
            localStorage.setItem('campusPolls', JSON.stringify(defaultPolls));
        }

        // Load feedback from localStorage
        const savedFeedback = localStorage.getItem('campusFeedback');
        if (savedFeedback) {
            setFeedbacks(JSON.parse(savedFeedback));
        } else {
            const defaultFeedback: Feedback[] = [
                {
                    id: 'FB001',
                    title: 'Improve WiFi Connectivity in Hostels',
                    description: 'The WiFi connection in hostel blocks is very slow and frequently disconnects. Please improve the infrastructure.',
                    category: 'facilities',
                    rating: 2,
                    createdBy: 'Anonymous',
                    createdDate: '2025-01-25T16:20:00Z',
                    status: 'reviewed',
                    responses: 15,
                    isAnonymous: true
                },
                {
                    id: 'FB002',
                    title: 'Request for More Lab Sessions',
                    description: 'We need more practical lab sessions for Database Management course to better understand the concepts.',
                    category: 'academic',
                    rating: 4,
                    createdBy: 'John Doe',
                    createdDate: '2025-01-22T11:45:00Z',
                    status: 'pending',
                    responses: 8,
                    isAnonymous: false
                },
                {
                    id: 'FB003',
                    title: 'Campus Security Concerns',
                    description: 'There are insufficient security personnel during late evening hours. This needs immediate attention.',
                    category: 'services',
                    rating: 3,
                    createdBy: 'Anonymous',
                    createdDate: '2025-01-20T20:30:00Z',
                    status: 'resolved',
                    responses: 23,
                    isAnonymous: true
                }
            ];

            setFeedbacks(defaultFeedback);
            localStorage.setItem('campusFeedback', JSON.stringify(defaultFeedback));
        }
    }, []);

    const categories = [
        { value: 'academic', label: 'Academic', color: 'bg-blue-100 text-blue-800 border-blue-200' },
        { value: 'facilities', label: 'Facilities', color: 'bg-green-100 text-green-800 border-green-200' },
        { value: 'events', label: 'Events', color: 'bg-purple-100 text-purple-800 border-purple-200' },
        { value: 'services', label: 'Services', color: 'bg-orange-100 text-orange-800 border-orange-200' },
        { value: 'general', label: 'General', color: 'bg-gray-100 text-gray-800 border-gray-200' }
    ];

    const filteredPolls = polls.filter(poll => {
        const matchesSearch = poll.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            poll.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || poll.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const filteredFeedback = feedbacks.filter(feedback => {
        const matchesSearch = feedback.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            feedback.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || feedback.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const votePoll = (pollId: string, vote: string | number) => {
        const updatedPolls = polls.map(poll => {
            if (poll.id === pollId && !poll.hasVoted) {
                const newResults = { ...poll.results };
                if (poll.type === 'rating') {
                    newResults[vote.toString()] = (newResults[vote.toString()] || 0) + 1;
                } else {
                    newResults[vote.toString()] = (newResults[vote.toString()] || 0) + 1;
                }

                return {
                    ...poll,
                    hasVoted: true,
                    userVote: vote,
                    totalVotes: poll.totalVotes + 1,
                    results: newResults
                };
            }
            return poll;
        });

        setPolls(updatedPolls);
        localStorage.setItem('campusPolls', JSON.stringify(updatedPolls));
    };

    const getCategoryColor = (category: string) => {
        const cat = categories.find(c => c.value === category);
        return cat?.color || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'reviewed':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'resolved':
                return 'bg-green-100 text-green-800 border-green-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, index) => (
            <Star
                key={index}
                size={12}
                className={index < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}
                style={{ color: index < rating ? '#f59e0b' : '#d1d5db' }}
            />
        ));
    };

    const activePolls = polls.filter(p => p.isActive).length;
    const myVotes = polls.filter(p => p.hasVoted).length;
    const myFeedback = feedbacks.filter(f => f.createdBy !== 'Anonymous').length;

    return (
        <>
            <StudentNavigation />

            {/* Main Content */}
            <main style={{
                marginLeft: window.innerWidth > 768 ? '280px' : '0',
                marginTop: '70px',
                padding: '24px',
                minHeight: 'calc(100vh - 70px)',
                transition: 'margin-left 0.3s ease'
            }}>
                {/* Page Header */}
                <div style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '16px',
                    padding: '24px',
                    marginBottom: '24px',
                    border: '1px solid rgba(255, 105, 105, 0.1)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h1 style={{
                            fontSize: '28px',
                            fontWeight: '700',
                            color: '#BB2525',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                        }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                background: 'linear-gradient(135deg, #FF6969, #BB2525)',
                                borderRadius: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white'
                            }}>
                                <MessageSquare size={24} />
                            </div>
                            Feedback & Polls
                        </h1>

                        <div style={{ display: 'flex', background: '#FFF5E0', borderRadius: '8px', padding: '4px' }}>
                            <button
                                style={{
                                    padding: '8px 16px',
                                    border: 'none',
                                    background: currentView === 'polls' ? 'linear-gradient(135deg, #FF6969, #BB2525)' : 'none',
                                    color: currentView === 'polls' ? 'white' : '#BB2525',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontWeight: '500',
                                    transition: 'all 0.2s'
                                }}
                                onClick={() => setCurrentView('polls')}
                            >
                                Polls
                            </button>
                            <button
                                style={{
                                    padding: '8px 16px',
                                    border: 'none',
                                    background: currentView === 'feedback' ? 'linear-gradient(135deg, #FF6969, #BB2525)' : 'none',
                                    color: currentView === 'feedback' ? 'white' : '#BB2525',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontWeight: '500',
                                    transition: 'all 0.2s'
                                }}
                                onClick={() => setCurrentView('feedback')}
                            >
                                Feedback
                            </button>
                            <button
                                style={{
                                    padding: '8px 16px',
                                    border: 'none',
                                    background: currentView === 'my-submissions' ? 'linear-gradient(135deg, #FF6969, #BB2525)' : 'none',
                                    color: currentView === 'my-submissions' ? 'white' : '#BB2525',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontWeight: '500',
                                    transition: 'all 0.2s'
                                }}
                                onClick={() => setCurrentView('my-submissions')}
                            >
                                My Submissions
                            </button>
                        </div>
                    </div>

                    {/* Stats Row */}
                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 16px',
                            background: 'rgba(255, 105, 105, 0.1)',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '500',
                            color: '#BB2525'
                        }}>
                            <BarChart3 size={16} />
                            <span>{activePolls} Active Polls</span>
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 16px',
                            background: 'rgba(255, 105, 105, 0.1)',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '500',
                            color: '#BB2525'
                        }}>
                            <CheckCircle size={16} />
                            <span>{myVotes} Votes Cast</span>
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 16px',
                            background: 'rgba(255, 105, 105, 0.1)',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '500',
                            color: '#BB2525'
                        }}>
                            <MessageSquare size={16} />
                            <span>{feedbacks.length} Total Feedback</span>
                        </div>
                    </div>
                </div>

                {/* Search and Filter */}
                <div style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '16px',
                    padding: '20px',
                    marginBottom: '24px',
                    border: '1px solid rgba(255, 105, 105, 0.1)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
                }}>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <input
                            type="text"
                            placeholder="Search polls and feedback..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                flex: 1,
                                padding: '10px 16px',
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                fontSize: '14px'
                            }}
                        />
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            style={{
                                padding: '10px 16px',
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                fontSize: '14px',
                                background: 'white'
                            }}
                        >
                            <option value="all">All Categories</option>
                            {categories.map(category => (
                                <option key={category.value} value={category.value}>{category.label}</option>
                            ))}
                        </select>
                        <button
                            style={{
                                padding: '10px 16px',
                                background: 'linear-gradient(135deg, #FF6969, #BB2525)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: '500',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                            onClick={() => setShowCreateForm(true)}
                        >
                            <Plus size={16} />
                            Create
                        </button>
                    </div>
                </div>

                {/* Content Grid */}
                <div style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '16px',
                    padding: '24px',
                    border: '1px solid rgba(255, 105, 105, 0.1)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
                }}>
                    {currentView === 'polls' && (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                            gap: '20px'
                        }}>
                            {filteredPolls.map((poll) => (
                                <div
                                    key={poll.id}
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.8)',
                                        borderRadius: '12px',
                                        padding: '20px',
                                        border: '1px solid rgba(255, 105, 105, 0.1)',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {/* Poll Header */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                        <span style={{
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            fontSize: '11px',
                                            fontWeight: '600',
                                            border: '1px solid',
                                            textTransform: 'uppercase'
                                        }} className={getCategoryColor(poll.category)}>
                                            {poll.category}
                                        </span>
                                        <div style={{ fontSize: '12px', color: '#666' }}>
                                            Ends: {formatDate(poll.endDate)}
                                        </div>
                                    </div>

                                    <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                                        {poll.title}
                                    </h3>
                                    <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px', lineHeight: '1.4' }}>
                                        {poll.description}
                                    </p>

                                    {/* Poll Options */}
                                    {poll.hasVoted ? (
                                        <div style={{ marginBottom: '16px' }}>
                                            <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Results:</h4>
                                            {poll.type === 'rating' ? (
                                                <div style={{ display: 'flex', gap: '4px' }}>
                                                    {[1, 2, 3, 4, 5].map(rating => (
                                                        <div key={rating} style={{ textAlign: 'center', flex: 1 }}>
                                                            <div style={{ fontSize: '12px', marginBottom: '4px' }}>{rating}★</div>
                                                            <div style={{
                                                                height: '40px',
                                                                background: '#e5e7eb',
                                                                borderRadius: '4px',
                                                                position: 'relative',
                                                                overflow: 'hidden'
                                                            }}>
                                                                <div style={{
                                                                    height: `${((poll.results?.[rating.toString()] || 0) / poll.totalVotes) * 100}%`,
                                                                    background: 'linear-gradient(135deg, #FF6969, #BB2525)',
                                                                    position: 'absolute',
                                                                    bottom: 0,
                                                                    width: '100%',
                                                                    transition: 'height 0.3s ease'
                                                                }} />
                                                            </div>
                                                            <div style={{ fontSize: '10px', marginTop: '2px' }}>
                                                                {poll.results?.[rating.toString()] || 0}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                    {poll.options?.map(option => (
                                                        <div key={option} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                            <div style={{
                                                                flex: 1,
                                                                height: '24px',
                                                                background: '#e5e7eb',
                                                                borderRadius: '4px',
                                                                position: 'relative',
                                                                overflow: 'hidden'
                                                            }}>
                                                                <div style={{
                                                                    width: `${((poll.results?.[option] || 0) / poll.totalVotes) * 100}%`,
                                                                    height: '100%',
                                                                    background: 'linear-gradient(135deg, #FF6969, #BB2525)',
                                                                    transition: 'width 0.3s ease'
                                                                }} />
                                                                <div style={{
                                                                    position: 'absolute',
                                                                    top: '50%',
                                                                    left: '8px',
                                                                    transform: 'translateY(-50%)',
                                                                    fontSize: '12px',
                                                                    fontWeight: '500',
                                                                    color: '#333'
                                                                }}>
                                                                    {option}
                                                                </div>
                                                            </div>
                                                            <div style={{ fontSize: '12px', fontWeight: '600', minWidth: '30px', textAlign: 'right' }}>
                                                                {poll.results?.[option] || 0}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div style={{ marginBottom: '16px' }}>
                                            {poll.type === 'rating' ? (
                                                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                                    {[1, 2, 3, 4, 5].map(rating => (
                                                        <button
                                                            key={rating}
                                                            onClick={() => votePoll(poll.id, rating)}
                                                            style={{
                                                                padding: '8px',
                                                                border: '1px solid #ddd',
                                                                borderRadius: '6px',
                                                                background: 'white',
                                                                cursor: 'pointer',
                                                                transition: 'all 0.2s'
                                                            }}
                                                            onMouseEnter={(e) => {
                                                                e.currentTarget.style.borderColor = '#FF6969';
                                                                e.currentTarget.style.background = 'rgba(255, 105, 105, 0.1)';
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                e.currentTarget.style.borderColor = '#ddd';
                                                                e.currentTarget.style.background = 'white';
                                                            }}
                                                        >
                                                            {rating}★
                                                        </button>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                    {poll.options?.map(option => (
                                                        <button
                                                            key={option}
                                                            onClick={() => votePoll(poll.id, option)}
                                                            style={{
                                                                padding: '8px 12px',
                                                                border: '1px solid #ddd',
                                                                borderRadius: '6px',
                                                                background: 'white',
                                                                cursor: 'pointer',
                                                                textAlign: 'left',
                                                                transition: 'all 0.2s'
                                                            }}
                                                            onMouseEnter={(e) => {
                                                                e.currentTarget.style.borderColor = '#FF6969';
                                                                e.currentTarget.style.background = 'rgba(255, 105, 105, 0.1)';
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                e.currentTarget.style.borderColor = '#ddd';
                                                                e.currentTarget.style.background = 'white';
                                                            }}
                                                        >
                                                            {option}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Poll Footer */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#666' }}>
                                        <div>By {poll.createdBy}</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <Users size={12} />
                                            <span>{poll.totalVotes} votes</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {currentView === 'feedback' && (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                            gap: '20px'
                        }}>
                            {filteredFeedback.map((feedback) => (
                                <div
                                    key={feedback.id}
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.8)',
                                        borderRadius: '12px',
                                        padding: '20px',
                                        border: '1px solid rgba(255, 105, 105, 0.1)',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {/* Feedback Header */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                        <span style={{
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            fontSize: '11px',
                                            fontWeight: '600',
                                            border: '1px solid',
                                            textTransform: 'uppercase'
                                        }} className={getCategoryColor(feedback.category)}>
                                            {feedback.category}
                                        </span>
                                        <span style={{
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            fontSize: '11px',
                                            fontWeight: '600',
                                            border: '1px solid',
                                            textTransform: 'uppercase'
                                        }} className={getStatusColor(feedback.status)}>
                                            {feedback.status}
                                        </span>
                                    </div>

                                    <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                                        {feedback.title}
                                    </h3>
                                    <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px', lineHeight: '1.4' }}>
                                        {feedback.description}
                                    </p>

                                    {/* Rating */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                                        <span style={{ fontSize: '14px', fontWeight: '600' }}>Rating:</span>
                                        <div style={{ display: 'flex', gap: '2px' }}>
                                            {renderStars(feedback.rating)}
                                        </div>
                                        <span style={{ fontSize: '12px', color: '#666' }}>({feedback.rating}/5)</span>
                                    </div>

                                    {/* Feedback Footer */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#666' }}>
                                        <div>By {feedback.createdBy}</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <MessageSquare size={12} />
                                            <span>{feedback.responses} responses</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {currentView === 'my-submissions' && (
                        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                            <div style={{
                                width: '64px',
                                height: '64px',
                                margin: '0 auto 16px',
                                background: 'linear-gradient(135deg, #FF6969, #BB2525)',
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                opacity: '0.7'
                            }}>
                                <MessageSquare size={32} />
                            </div>
                            <h3>My Submissions</h3>
                            <p>View and manage your submitted polls and feedback here.</p>
                            <p style={{ marginTop: '8px', fontSize: '14px' }}>
                                You have voted on {myVotes} polls and submitted {myFeedback} feedback items.
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}

export default FeedbackPollsPage;
