// src/components/pages/staff/pollsfeedback/index.tsx
import React, { useState, useEffect } from 'react';
import StaffNavigation from '../staff/navigation';
import {
    MessageSquare,
    Plus,
    BarChart3,
    Users,
    Eye,
    Edit3,
    Trash2,
    Calendar,
    Clock,
    CheckCircle,
    X,
    Search,
    Filter,
    Star,
    MessageCircle,
    Send,
    Save,
    TrendingUp
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
    results?: { [key: string]: number };
    isActive: boolean;
    isPublic: boolean;
}

interface Feedback {
    id: string;
    title: string;
    content: string;
    category: 'academic' | 'facilities' | 'events' | 'services' | 'general';
    rating: number;
    submittedBy: string;
    submittedDate: string;
    status: 'new' | 'reviewed' | 'addressed';
    staffResponse?: string;
    respondedBy?: string;
    responseDate?: string;
    isAnonymous: boolean;
}

function StaffPollsFeedbackPage() {
    const [polls, setPolls] = useState<Poll[]>([]);
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [currentView, setCurrentView] = useState<'polls' | 'feedback' | 'create-poll'>('polls');
    const [selectedItem, setSelectedItem] = useState<Poll | Feedback | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [staffResponse, setStaffResponse] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [pollForm, setPollForm] = useState({
        title: '',
        description: '',
        category: 'general' as 'academic' | 'facilities' | 'events' | 'services' | 'general',
        type: 'multiple-choice' as 'multiple-choice' | 'rating' | 'yes-no' | 'text',
        options: ['', ''],
        endDate: '',
        isPublic: true
    });

    useEffect(() => {
        // Load polls from localStorage
        const savedPolls = localStorage.getItem('staffPolls');
        if (savedPolls) {
            setPolls(JSON.parse(savedPolls));
        } else {
            const defaultPolls: Poll[] = [
                {
                    id: 'POLL001',
                    title: 'Campus Food Quality Assessment',
                    description: 'Please rate the overall quality of food served in the campus cafeteria and mess.',
                    category: 'facilities',
                    type: 'rating',
                    createdBy: 'Dr. Jane Smith',
                    createdDate: '2025-01-20T10:00:00Z',
                    endDate: '2025-02-20T23:59:59Z',
                    totalVotes: 156,
                    results: { '1': 8, '2': 15, '3': 32, '4': 67, '5': 34 },
                    isActive: true,
                    isPublic: true
                },
                {
                    id: 'POLL002',
                    title: 'Library Hours Extension',
                    description: 'Should the library hours be extended during exam periods?',
                    category: 'academic',
                    type: 'yes-no',
                    options: ['Yes', 'No'],
                    createdBy: 'Dr. Jane Smith',
                    createdDate: '2025-01-18T14:30:00Z',
                    endDate: '2025-02-15T23:59:59Z',
                    totalVotes: 234,
                    results: { 'Yes': 189, 'No': 45 },
                    isActive: true,
                    isPublic: true
                }
            ];

            setPolls(defaultPolls);
            localStorage.setItem('staffPolls', JSON.stringify(defaultPolls));
        }

        // Load feedback from localStorage
        const savedFeedback = localStorage.getItem('staffFeedback');
        if (savedFeedback) {
            setFeedbacks(JSON.parse(savedFeedback));
        } else {
            const defaultFeedback: Feedback[] = [
                {
                    id: 'FB001',
                    title: 'Excellent Teaching Method',
                    content: 'Dr. Smith\'s interactive teaching method in Database Management is very effective. The practical examples help understand complex concepts easily.',
                    category: 'academic',
                    rating: 5,
                    submittedBy: 'John Doe',
                    submittedDate: '2025-01-25T16:20:00Z',
                    status: 'new',
                    isAnonymous: false
                },
                {
                    id: 'FB002',
                    title: 'WiFi Connectivity Issues',
                    content: 'The WiFi connection in the library is very slow during peak hours. This affects our ability to access online resources for research.',
                    category: 'facilities',
                    rating: 2,
                    submittedBy: 'Anonymous',
                    submittedDate: '2025-01-24T11:45:00Z',
                    status: 'reviewed',
                    staffResponse: 'Thank you for your feedback. We are working with the IT department to upgrade the WiFi infrastructure.',
                    respondedBy: 'Dr. Jane Smith',
                    responseDate: '2025-01-24T18:00:00Z',
                    isAnonymous: true
                }
            ];

            setFeedbacks(defaultFeedback);
            localStorage.setItem('staffFeedback', JSON.stringify(defaultFeedback));
        }
    }, []);

    const categories = [
        { value: 'academic', label: 'Academic', color: 'bg-blue-100 text-blue-800' },
        { value: 'facilities', label: 'Facilities', color: 'bg-green-100 text-green-800' },
        { value: 'events', label: 'Events', color: 'bg-purple-100 text-purple-800' },
        { value: 'services', label: 'Services', color: 'bg-orange-100 text-orange-800' },
        { value: 'general', label: 'General', color: 'bg-gray-100 text-gray-800' }
    ];

    const handlePollSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            const newPoll: Poll = {
                id: `POLL${String(polls.length + 1).padStart(3, '0')}`,
                ...pollForm,
                options: pollForm.type === 'multiple-choice' ? pollForm.options.filter(opt => opt.trim()) :
                    pollForm.type === 'yes-no' ? ['Yes', 'No'] : undefined,
                createdBy: 'Dr. Jane Smith',
                createdDate: new Date().toISOString(),
                totalVotes: 0,
                results: {},
                isActive: true
            };

            const updatedPolls = [newPoll, ...polls];
            setPolls(updatedPolls);
            localStorage.setItem('staffPolls', JSON.stringify(updatedPolls));

            setPollForm({
                title: '',
                description: '',
                category: 'general',
                type: 'multiple-choice',
                options: ['', ''],
                endDate: '',
                isPublic: true
            });

            setCurrentView('polls');
            alert('Poll created successfully!');
        } catch (error) {
            alert('Failed to create poll. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const respondToFeedback = async (feedbackId: string) => {
        setIsSubmitting(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            const updatedFeedbacks = feedbacks.map(feedback => {
                if (feedback.id === feedbackId) {
                    return {
                        ...feedback,
                        status: 'addressed' as const,
                        staffResponse: staffResponse,
                        respondedBy: 'Dr. Jane Smith',
                        responseDate: new Date().toISOString()
                    };
                }
                return feedback;
            });

            setFeedbacks(updatedFeedbacks);
            localStorage.setItem('staffFeedback', JSON.stringify(updatedFeedbacks));
            setSelectedItem(null);
            setStaffResponse('');

            alert('Response sent successfully!');
        } catch (error) {
            alert('Failed to send response. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const getCategoryColor = (category: string) => {
        const cat = categories.find(c => c.value === category);
        return cat?.color || 'bg-gray-100 text-gray-800';
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'new':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'reviewed':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'addressed':
                return 'bg-green-100 text-green-800 border-green-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const filteredPolls = polls.filter(poll => {
        const matchesSearch = poll.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            poll.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
    });

    const filteredFeedbacks = feedbacks.filter(feedback => {
        const matchesSearch = feedback.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            feedback.content.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || feedback.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const activePolls = polls.filter(p => p.isActive).length;
    const totalVotes = polls.reduce((sum, p) => sum + p.totalVotes, 0);
    const newFeedbacks = feedbacks.filter(f => f.status === 'new').length;
    const avgRating = feedbacks.length > 0 ?
        (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1) : '0.0';

    return (
        <>
            <StaffNavigation />

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
                    border: '1px solid rgba(34, 139, 34, 0.1)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h1 style={{
                            fontSize: '28px',
                            fontWeight: '700',
                            color: '#228B22',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                        }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                background: 'linear-gradient(135deg, #32CD32, #228B22)',
                                borderRadius: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white'
                            }}>
                                <MessageSquare size={24} />
                            </div>
                            Polls & Feedback
                        </h1>

                        <div style={{ display: 'flex', gap: '12px' }}>
                            {currentView !== 'polls' && currentView !== 'feedback' && (
                                <button
                                    style={{
                                        padding: '8px 16px',
                                        background: 'rgba(34, 139, 34, 0.1)',
                                        color: '#228B22',
                                        border: '1px solid rgba(34, 139, 34, 0.2)',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontWeight: '500',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}
                                    onClick={() => setCurrentView('polls')}
                                >
                                    <X size={16} />
                                    Back
                                </button>
                            )}
                            {currentView === 'polls' && (
                                <button
                                    style={{
                                        padding: '8px 16px',
                                        background: 'linear-gradient(135deg, #32CD32, #228B22)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontWeight: '500',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}
                                    onClick={() => setCurrentView('create-poll')}
                                >
                                    <Plus size={16} />
                                    Create Poll
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                        <button
                            onClick={() => setCurrentView('polls')}
                            style={{
                                padding: '8px 16px',
                                border: 'none',
                                borderRadius: '8px',
                                background: currentView === 'polls' ? 'linear-gradient(135deg, #32CD32, #228B22)' : 'rgba(34, 139, 34, 0.1)',
                                color: currentView === 'polls' ? 'white' : '#228B22',
                                cursor: 'pointer',
                                fontWeight: '500',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                            }}
                        >
                            <BarChart3 size={14} />
                            Polls ({activePolls})
                        </button>
                        <button
                            onClick={() => setCurrentView('feedback')}
                            style={{
                                padding: '8px 16px',
                                border: 'none',
                                borderRadius: '8px',
                                background: currentView === 'feedback' ? 'linear-gradient(135deg, #32CD32, #228B22)' : 'rgba(34, 139, 34, 0.1)',
                                color: currentView === 'feedback' ? 'white' : '#228B22',
                                cursor: 'pointer',
                                fontWeight: '500',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                            }}
                        >
                            <MessageCircle size={14} />
                            Feedback ({newFeedbacks} new)
                        </button>
                    </div>

                    {/* Stats */}
                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 16px',
                            background: 'rgba(34, 139, 34, 0.1)',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '500',
                            color: '#228B22'
                        }}>
                            <Users size={16} />
                            <span>{totalVotes} Total Votes</span>
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 16px',
                            background: 'rgba(34, 139, 34, 0.1)',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '500',
                            color: '#228B22'
                        }}>
                            <Star size={16} />
                            <span>{avgRating} Avg Rating</span>
                        </div>
                    </div>
                </div>

                {/* Content based on current view */}
                {currentView === 'polls' && (
                    <>
                        {/* Search */}
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '16px',
                            padding: '20px',
                            marginBottom: '24px',
                            border: '1px solid rgba(34, 139, 34, 0.1)',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
                        }}>
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                <input
                                    type="text"
                                    placeholder="Search polls..."
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
                            </div>
                        </div>

                        {/* Polls Grid */}
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '16px',
                            padding: '24px',
                            border: '1px solid rgba(34, 139, 34, 0.1)',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
                        }}>
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
                                            border: '1px solid rgba(34, 139, 34, 0.1)',
                                            transition: 'all 0.2s',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => setSelectedItem(poll)}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                            <span style={{
                                                padding: '4px 8px',
                                                borderRadius: '4px',
                                                fontSize: '11px',
                                                fontWeight: '600',
                                                textTransform: 'uppercase'
                                            }} className={getCategoryColor(poll.category)}>
                                                {poll.category}
                                            </span>
                                            <div style={{
                                                padding: '4px 8px',
                                                borderRadius: '4px',
                                                fontSize: '11px',
                                                fontWeight: '600',
                                                background: poll.isActive ? '#dcfce7' : '#f3f4f6',
                                                color: poll.isActive ? '#166534' : '#6b7280'
                                            }}>
                                                {poll.isActive ? 'Active' : 'Ended'}
                                            </div>
                                        </div>

                                        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                                            {poll.title}
                                        </h3>
                                        <p style={{ color: '#666', fontSize: '14px', marginBottom: '12px', lineHeight: '1.4' }}>
                                            {poll.description.substring(0, 100)}...
                                        </p>

                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#666' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    <Users size={12} />
                                                    {poll.totalVotes} votes
                                                </span>
                                                <span>{poll.type}</span>
                                            </div>
                                            <div>Ends: {formatDate(poll.endDate)}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {currentView === 'feedback' && (
                    <>
                        {/* Search and Filter */}
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '16px',
                            padding: '20px',
                            marginBottom: '24px',
                            border: '1px solid rgba(34, 139, 34, 0.1)',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
                        }}>
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                <input
                                    type="text"
                                    placeholder="Search feedback..."
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
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    style={{
                                        padding: '10px 16px',
                                        border: '1px solid #ddd',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        background: 'white'
                                    }}
                                >
                                    <option value="all">All Status</option>
                                    <option value="new">New</option>
                                    <option value="reviewed">Reviewed</option>
                                    <option value="addressed">Addressed</option>
                                </select>
                            </div>
                        </div>

                        {/* Feedback List */}
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '16px',
                            padding: '24px',
                            border: '1px solid rgba(34, 139, 34, 0.1)',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
                        }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {filteredFeedbacks.map((feedback) => (
                                    <div
                                        key={feedback.id}
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.8)',
                                            borderRadius: '12px',
                                            padding: '20px',
                                            border: '1px solid rgba(34, 139, 34, 0.1)',
                                            transition: 'all 0.2s',
                                            cursor: 'pointer',
                                            borderLeft: `4px solid ${feedback.status === 'new' ? '#eab308' :
                                                feedback.status === 'addressed' ? '#22c55e' : '#3b82f6'
                                                }`
                                        }}
                                        onClick={() => setSelectedItem(feedback)}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                                <span style={{
                                                    padding: '4px 8px',
                                                    borderRadius: '4px',
                                                    fontSize: '11px',
                                                    fontWeight: '600',
                                                    textTransform: 'uppercase'
                                                }} className={getCategoryColor(feedback.category)}>
                                                    {feedback.category}
                                                </span>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            size={12}
                                                            style={{
                                                                color: i < feedback.rating ? '#fbbf24' : '#e5e7eb',
                                                                fill: i < feedback.rating ? '#fbbf24' : 'none'
                                                            }}
                                                        />
                                                    ))}
                                                    <span style={{ fontSize: '12px', color: '#666', marginLeft: '4px' }}>
                                                        ({feedback.rating}/5)
                                                    </span>
                                                </div>
                                            </div>
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
                                        <p style={{ color: '#666', fontSize: '14px', marginBottom: '12px', lineHeight: '1.4' }}>
                                            {feedback.content.substring(0, 150)}...
                                        </p>

                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#666' }}>
                                            <div>
                                                By {feedback.isAnonymous ? 'Anonymous' : feedback.submittedBy}
                                            </div>
                                            <div>{formatDate(feedback.submittedDate)}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {currentView === 'create-poll' && (
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '16px',
                        padding: '32px',
                        border: '1px solid rgba(34, 139, 34, 0.1)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
                    }}>
                        <h2 style={{ marginBottom: '24px', color: '#333', fontSize: '20px', fontWeight: '600' }}>
                            Create New Poll
                        </h2>

                        <form onSubmit={handlePollSubmit}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                                <div style={{ gridColumn: 'span 2' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                        Poll Title *
                                    </label>
                                    <input
                                        type="text"
                                        value={pollForm.title}
                                        onChange={(e) => setPollForm(prev => ({ ...prev, title: e.target.value }))}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            fontSize: '14px'
                                        }}
                                        placeholder="Enter poll title"
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                        Category
                                    </label>
                                    <select
                                        value={pollForm.category}
                                        onChange={(e) => setPollForm(prev => ({ ...prev, category: e.target.value as any }))}
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            fontSize: '14px'
                                        }}
                                    >
                                        {categories.map(category => (
                                            <option key={category.value} value={category.value}>{category.label}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                        Poll Type
                                    </label>
                                    <select
                                        value={pollForm.type}
                                        onChange={(e) => setPollForm(prev => ({ ...prev, type: e.target.value as any }))}
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            fontSize: '14px'
                                        }}
                                    >
                                        <option value="multiple-choice">Multiple Choice</option>
                                        <option value="rating">Rating (1-5)</option>
                                        <option value="yes-no">Yes/No</option>
                                        <option value="text">Text Response</option>
                                    </select>
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                        End Date *
                                    </label>
                                    <input
                                        type="datetime-local"
                                        value={pollForm.endDate}
                                        onChange={(e) => setPollForm(prev => ({ ...prev, endDate: e.target.value }))}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            fontSize: '14px'
                                        }}
                                    />
                                </div>
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                    Description *
                                </label>
                                <textarea
                                    value={pollForm.description}
                                    onChange={(e) => setPollForm(prev => ({ ...prev, description: e.target.value }))}
                                    required
                                    rows={4}
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        border: '1px solid #ddd',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        resize: 'vertical'
                                    }}
                                    placeholder="Enter poll description"
                                />
                            </div>

                            {pollForm.type === 'multiple-choice' && (
                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                        Options
                                    </label>
                                    {pollForm.options.map((option, index) => (
                                        <div key={index} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                                            <input
                                                type="text"
                                                value={option}
                                                onChange={(e) => {
                                                    const newOptions = [...pollForm.options];
                                                    newOptions[index] = e.target.value;
                                                    setPollForm(prev => ({ ...prev, options: newOptions }));
                                                }}
                                                style={{
                                                    flex: 1,
                                                    padding: '10px 16px',
                                                    border: '1px solid #ddd',
                                                    borderRadius: '8px',
                                                    fontSize: '14px'
                                                }}
                                                placeholder={`Option ${index + 1}`}
                                            />
                                            {pollForm.options.length > 2 && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newOptions = pollForm.options.filter((_, i) => i !== index);
                                                        setPollForm(prev => ({ ...prev, options: newOptions }));
                                                    }}
                                                    style={{
                                                        padding: '10px',
                                                        background: '#ef4444',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '8px',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => setPollForm(prev => ({ ...prev, options: [...prev.options, ''] }))}
                                        style={{
                                            padding: '8px 16px',
                                            background: 'rgba(34, 139, 34, 0.1)',
                                            color: '#228B22',
                                            border: '1px solid rgba(34, 139, 34, 0.2)',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            fontWeight: '500',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px'
                                        }}
                                    >
                                        <Plus size={14} />
                                        Add Option
                                    </button>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                style={{
                                    background: 'linear-gradient(135deg, #32CD32, #228B22)',
                                    color: 'white',
                                    padding: '12px 32px',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontWeight: '600',
                                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    opacity: isSubmitting ? 0.7 : 1
                                }}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div style={{
                                            width: '16px',
                                            height: '16px',
                                            border: '2px solid rgba(255, 255, 255, 0.3)',
                                            borderRadius: '50%',
                                            borderTopColor: 'white',
                                            animation: 'spin 1s ease-in-out infinite'
                                        }} />
                                        Creating Poll...
                                    </>
                                ) : (
                                    <>
                                        <Save size={16} />
                                        Create Poll
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                )}

                {/* Detail Modal */}
                {selectedItem && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2000,
                        padding: '20px'
                    }}>
                        <div style={{
                            background: 'white',
                            borderRadius: '16px',
                            maxWidth: '700px',
                            width: '100%',
                            maxHeight: '90vh',
                            overflow: 'hidden',
                            position: 'relative'
                        }}>
                            <div style={{
                                padding: '24px',
                                borderBottom: '1px solid #eee',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start'
                            }}>
                                <div>
                                    <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>
                                        {selectedItem.title}
                                    </h2>
                                    {'category' in selectedItem && (
                                        <span style={{
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            fontSize: '11px',
                                            fontWeight: '600',
                                            textTransform: 'uppercase'
                                        }} className={getCategoryColor(selectedItem.category)}>
                                            {selectedItem.category}
                                        </span>
                                    )}
                                </div>
                                <button
                                    onClick={() => setSelectedItem(null)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        padding: '8px',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        color: '#666'
                                    }}
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div style={{ padding: '24px', maxHeight: '60vh', overflowY: 'auto' }}>
                                {'type' in selectedItem ? (
                                    /* Poll Details */
                                    <>
                                        <div style={{ marginBottom: '20px' }}>
                                            <h4 style={{ fontWeight: '600', marginBottom: '8px' }}>Description</h4>
                                            <p style={{ color: '#666', lineHeight: '1.5' }}>{selectedItem.description}</p>
                                        </div>

                                        <div style={{ marginBottom: '20px' }}>
                                            <h4 style={{ fontWeight: '600', marginBottom: '12px' }}>Poll Results</h4>
                                            {selectedItem.results && Object.keys(selectedItem.results).length > 0 ? (
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                    {Object.entries(selectedItem.results).map(([option, votes]) => (
                                                        <div key={option} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                            <div style={{ width: '100px', fontSize: '14px', fontWeight: '500' }}>{option}</div>
                                                            <div style={{ flex: 1, height: '24px', background: '#f3f4f6', borderRadius: '12px', overflow: 'hidden' }}>
                                                                <div style={{
                                                                    height: '100%',
                                                                    width: `${selectedItem.totalVotes > 0 ? (votes / selectedItem.totalVotes) * 100 : 0}%`,
                                                                    background: 'linear-gradient(135deg, #32CD32, #228B22)',
                                                                    transition: 'width 0.3s ease'
                                                                }} />
                                                            </div>
                                                            <div style={{ fontWeight: '600', minWidth: '40px', textAlign: 'right' }}>
                                                                {votes} ({selectedItem.totalVotes > 0 ? Math.round((votes / selectedItem.totalVotes) * 100) : 0}%)
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p style={{ color: '#666', fontStyle: 'italic' }}>No votes yet</p>
                                            )}
                                        </div>

                                        <div style={{ marginBottom: '20px' }}>
                                            <h4 style={{ fontWeight: '600', marginBottom: '8px' }}>Poll Information</h4>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '14px' }}>
                                                <div>
                                                    <div style={{ color: '#666' }}>Type</div>
                                                    <div style={{ fontWeight: '500' }}>{selectedItem.type}</div>
                                                </div>
                                                <div>
                                                    <div style={{ color: '#666' }}>Total Votes</div>
                                                    <div style={{ fontWeight: '500' }}>{selectedItem.totalVotes}</div>
                                                </div>
                                                <div>
                                                    <div style={{ color: '#666' }}>Created</div>
                                                    <div style={{ fontWeight: '500' }}>{formatDate(selectedItem.createdDate)}</div>
                                                </div>
                                                <div>
                                                    <div style={{ color: '#666' }}>Ends</div>
                                                    <div style={{ fontWeight: '500' }}>{formatDate(selectedItem.endDate)}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    /* Feedback Details */
                                    <>
                                        <div style={{ marginBottom: '20px' }}>
                                            <h4 style={{ fontWeight: '600', marginBottom: '8px' }}>Feedback Content</h4>
                                            <p style={{ color: '#666', lineHeight: '1.5' }}>{selectedItem.content}</p>
                                        </div>

                                        <div style={{ marginBottom: '20px' }}>
                                            <h4 style={{ fontWeight: '600', marginBottom: '8px' }}>Rating</h4>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={20}
                                                        style={{
                                                            color: i < selectedItem.rating ? '#fbbf24' : '#e5e7eb',
                                                            fill: i < selectedItem.rating ? '#fbbf24' : 'none'
                                                        }}
                                                    />
                                                ))}
                                                <span style={{ marginLeft: '8px', fontWeight: '500' }}>
                                                    {selectedItem.rating}/5
                                                </span>
                                            </div>
                                        </div>

                                        <div style={{ marginBottom: '20px' }}>
                                            <h4 style={{ fontWeight: '600', marginBottom: '8px' }}>Feedback Information</h4>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '14px' }}>
                                                <div>
                                                    <div style={{ color: '#666' }}>Submitted By</div>
                                                    <div style={{ fontWeight: '500' }}>
                                                        {selectedItem.isAnonymous ? 'Anonymous' : selectedItem.submittedBy}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div style={{ color: '#666' }}>Status</div>
                                                    <div>
                                                        <span style={{
                                                            padding: '4px 8px',
                                                            borderRadius: '4px',
                                                            fontSize: '11px',
                                                            fontWeight: '600',
                                                            border: '1px solid',
                                                            textTransform: 'uppercase'
                                                        }} className={getStatusColor(selectedItem.status)}>
                                                            {selectedItem.status}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div style={{ color: '#666' }}>Submitted Date</div>
                                                    <div style={{ fontWeight: '500' }}>{formatDate(selectedItem.submittedDate)}</div>
                                                </div>
                                            </div>
                                        </div>

                                        {selectedItem.staffResponse && (
                                            <div style={{ marginBottom: '20px' }}>
                                                <h4 style={{ fontWeight: '600', marginBottom: '8px' }}>Staff Response</h4>
                                                <div style={{
                                                    padding: '12px',
                                                    background: 'rgba(34, 139, 34, 0.1)',
                                                    borderRadius: '8px',
                                                    fontSize: '14px',
                                                    color: '#666'
                                                }}>
                                                    {selectedItem.staffResponse}
                                                </div>
                                                {selectedItem.respondedBy && (
                                                    <div style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
                                                        Responded by {selectedItem.respondedBy} on {formatDate(selectedItem.responseDate!)}
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {!selectedItem.staffResponse && (
                                            <div style={{ marginBottom: '20px' }}>
                                                <h4 style={{ fontWeight: '600', marginBottom: '8px' }}>Add Response</h4>
                                                <textarea
                                                    value={staffResponse}
                                                    onChange={(e) => setStaffResponse(e.target.value)}
                                                    placeholder="Write your response to this feedback..."
                                                    style={{
                                                        width: '100%',
                                                        padding: '12px',
                                                        border: '1px solid #ddd',
                                                        borderRadius: '8px',
                                                        fontSize: '14px',
                                                        minHeight: '100px',
                                                        resize: 'vertical'
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>

                            {!('type' in selectedItem) && !selectedItem.staffResponse && (
                                <div style={{
                                    padding: '24px',
                                    borderTop: '1px solid #eee',
                                    display: 'flex',
                                    gap: '12px',
                                    justifyContent: 'flex-end'
                                }}>
                                    <button
                                        onClick={() => respondToFeedback(selectedItem.id)}
                                        disabled={isSubmitting || !staffResponse.trim()}
                                        style={{
                                            padding: '8px 16px',
                                            background: 'linear-gradient(135deg, #32CD32, #228B22)',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '8px',
                                            cursor: isSubmitting || !staffResponse.trim() ? 'not-allowed' : 'pointer',
                                            fontWeight: '500',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            opacity: isSubmitting || !staffResponse.trim() ? 0.7 : 1
                                        }}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div style={{
                                                    width: '16px',
                                                    height: '16px',
                                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                                    borderRadius: '50%',
                                                    borderTopColor: 'white',
                                                    animation: 'spin 1s ease-in-out infinite'
                                                }} />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send size={16} />
                                                Send Response
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}

export default StaffPollsFeedbackPage;
