import React, { useState } from 'react';
import StudentNavigation from '../student/navigationbar';
import {
    TrendingUp,
    Target,
    BookOpen,
    Users,
    Calendar,
    Award,
    Clock,
    Plus,
    ChevronRight,
    Star,
    CheckCircle,
    BarChart3,
    User,
    MessageCircle,
    Share2,
    Filter,
    Search
} from 'lucide-react';

interface Goal {
    id: number;
    title: string;
    description: string;
    category: 'Academic' | 'Personal' | 'Skill' | 'Health';
    progress: number;
    targetDate: string;
    priority: 'High' | 'Medium' | 'Low';
    status: 'In Progress' | 'Completed' | 'Paused';
}

interface Achievement {
    id: number;
    title: string;
    description: string;
    icon: string;
    dateEarned: string;
    points: number;
}

interface StudyGroup {
    id: number;
    name: string;
    subject: string;
    members: number;
    nextSession: string;
    description: string;
}

function GrowTogether() {
    const [activeTab, setActiveTab] = useState('goals');
    const [showAddGoal, setShowAddGoal] = useState(false);
    const [filterCategory, setFilterCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    // Sample data
    const goals: Goal[] = [
        {
            id: 1,
            title: 'Complete Data Structures Course',
            description: 'Finish all modules and assignments in the DS course',
            category: 'Academic',
            progress: 75,
            targetDate: '2025-08-15',
            priority: 'High',
            status: 'In Progress'
        },
        {
            id: 2,
            title: 'Read 2 Books This Month',
            description: 'Focus on self-improvement and technical books',
            category: 'Personal',
            progress: 50,
            targetDate: '2025-07-31',
            priority: 'Medium',
            status: 'In Progress'
        },
        {
            id: 3,
            title: 'Learn React Native',
            description: 'Build mobile app development skills',
            category: 'Skill',
            progress: 30,
            targetDate: '2025-09-01',
            priority: 'Medium',
            status: 'In Progress'
        },
        {
            id: 4,
            title: 'Exercise 4 Times a Week',
            description: 'Maintain physical fitness and health',
            category: 'Health',
            progress: 85,
            targetDate: '2025-12-31',
            priority: 'High',
            status: 'In Progress'
        }
    ];

    const achievements: Achievement[] = [
        {
            id: 1,
            title: 'First Goal Completed',
            description: 'Successfully completed your first goal',
            icon: '🎯',
            dateEarned: '2025-07-15',
            points: 100
        },
        {
            id: 2,
            title: 'Study Streak',
            description: '7 days of consistent study sessions',
            icon: '🔥',
            dateEarned: '2025-07-20',
            points: 150
        },
        {
            id: 3,
            title: 'Team Player',
            description: 'Joined 3 study groups',
            icon: '👥',
            dateEarned: '2025-07-22',
            points: 120
        }
    ];

    const studyGroups: StudyGroup[] = [
        {
            id: 1,
            name: 'Algorithm Masters',
            subject: 'Data Structures & Algorithms',
            members: 12,
            nextSession: '2025-07-28 15:00',
            description: 'Weekly problem-solving sessions'
        },
        {
            id: 2,
            name: 'Web Dev Warriors',
            subject: 'Full Stack Development',
            members: 8,
            nextSession: '2025-07-29 18:00',
            description: 'Project-based learning group'
        },
        {
            id: 3,
            name: 'AI Enthusiasts',
            subject: 'Machine Learning',
            members: 15,
            nextSession: '2025-07-30 16:00',
            description: 'Exploring AI concepts together'
        }
    ];

    const filteredGoals = goals.filter(goal => {
        const matchesCategory = filterCategory === 'All' || goal.category === filterCategory;
        const matchesSearch = goal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            goal.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'High': return '#FF6969';
            case 'Medium': return '#FFA500';
            case 'Low': return '#4CAF50';
            default: return '#666';
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'Academic': return '#2196F3';
            case 'Personal': return '#9C27B0';
            case 'Skill': return '#FF9800';
            case 'Health': return '#4CAF50';
            default: return '#666';
        }
    };

    return (
        <>
            {/* Navigation Bar */}
            <StudentNavigation userName="John Doe" notificationCount={3} />

            {/* Main Content */}
            <div style={{
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                background: '#f8fafc',
                minHeight: '100vh',
                marginLeft: '280px', // Account for sidebar width
                marginTop: '70px', // Account for top navbar height
                padding: '24px',
                transition: 'margin-left 0.3s ease'
            }}>
                {/* Header */}
                <div style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '32px',
                    marginBottom: '24px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                    border: '1px solid rgba(255, 105, 105, 0.1)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            background: 'linear-gradient(135deg, #FF6969, #BB2525)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white'
                        }}>
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <h1 style={{
                                fontSize: '28px',
                                fontWeight: '700',
                                color: '#BB2525',
                                margin: 0
                            }}>
                                GrowTogether
                            </h1>
                            <p style={{
                                color: '#666',
                                margin: '4px 0 0 0',
                                fontSize: '16px'
                            }}>
                                Track your progress, achieve your goals, and grow with peers
                            </p>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '16px',
                        marginTop: '24px'
                    }}>
                        <div style={{
                            background: 'linear-gradient(135deg, #FF6969, #BB2525)',
                            borderRadius: '12px',
                            padding: '20px',
                            color: 'white'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <Target size={24} />
                                <div>
                                    <div style={{ fontSize: '24px', fontWeight: '700' }}>4</div>
                                    <div style={{ fontSize: '14px', opacity: 0.9 }}>Active Goals</div>
                                </div>
                            </div>
                        </div>

                        <div style={{
                            background: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
                            borderRadius: '12px',
                            padding: '20px',
                            color: 'white'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <Award size={24} />
                                <div>
                                    <div style={{ fontSize: '24px', fontWeight: '700' }}>370</div>
                                    <div style={{ fontSize: '14px', opacity: 0.9 }}>Total Points</div>
                                </div>
                            </div>
                        </div>

                        <div style={{
                            background: 'linear-gradient(135deg, #2196F3, #1565C0)',
                            borderRadius: '12px',
                            padding: '20px',
                            color: 'white'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <Users size={24} />
                                <div>
                                    <div style={{ fontSize: '24px', fontWeight: '700' }}>3</div>
                                    <div style={{ fontSize: '14px', opacity: 0.9 }}>Study Groups</div>
                                </div>
                            </div>
                        </div>

                        <div style={{
                            background: 'linear-gradient(135deg, #FF9800, #F57C00)',
                            borderRadius: '12px',
                            padding: '20px',
                            color: 'white'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <BarChart3 size={24} />
                                <div>
                                    <div style={{ fontSize: '24px', fontWeight: '700' }}>60%</div>
                                    <div style={{ fontSize: '14px', opacity: 0.9 }}>Avg Progress</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '4px',
                    display: 'flex',
                    gap: '4px',
                    marginBottom: '24px',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)'
                }}>
                    {[
                        { id: 'goals', label: 'My Goals', icon: <Target size={18} /> },
                        { id: 'achievements', label: 'Achievements', icon: <Award size={18} /> },
                        { id: 'groups', label: 'Study Groups', icon: <Users size={18} /> },
                        { id: 'progress', label: 'Progress', icon: <BarChart3 size={18} /> }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                flex: 1,
                                padding: '12px 16px',
                                border: 'none',
                                borderRadius: '8px',
                                background: activeTab === tab.id ? 'linear-gradient(135deg, #FF6969, #BB2525)' : 'transparent',
                                color: activeTab === tab.id ? 'white' : '#666',
                                fontWeight: '500',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Goals Tab */}
                {activeTab === 'goals' && (
                    <div>
                        {/* Goals Header */}
                        <div style={{
                            background: 'white',
                            borderRadius: '12px',
                            padding: '24px',
                            marginBottom: '24px',
                            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <h2 style={{ margin: 0, color: '#333', fontSize: '20px', fontWeight: '600' }}>Your Goals</h2>
                                <button
                                    onClick={() => setShowAddGoal(true)}
                                    style={{
                                        background: 'linear-gradient(135deg, #FF6969, #BB2525)',
                                        color: 'white',
                                        border: 'none',
                                        padding: '10px 20px',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        fontWeight: '500'
                                    }}
                                >
                                    <Plus size={18} />
                                    Add Goal
                                </button>
                            </div>

                            {/* Filters */}
                            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                                <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
                                    <Search size={18} style={{
                                        position: 'absolute',
                                        left: '12px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: '#666'
                                    }} />
                                    <input
                                        type="text"
                                        placeholder="Search goals..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '10px 12px 10px 40px',
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            fontSize: '14px'
                                        }}
                                    />
                                </div>
                                <select
                                    value={filterCategory}
                                    onChange={(e) => setFilterCategory(e.target.value)}
                                    style={{
                                        padding: '10px 12px',
                                        border: '1px solid #ddd',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        minWidth: '120px'
                                    }}
                                >
                                    <option value="All">All Categories</option>
                                    <option value="Academic">Academic</option>
                                    <option value="Personal">Personal</option>
                                    <option value="Skill">Skill</option>
                                    <option value="Health">Health</option>
                                </select>
                            </div>
                        </div>

                        {/* Goals List */}
                        <div style={{ display: 'grid', gap: '16px' }}>
                            {filteredGoals.map(goal => (
                                <div key={goal.id} style={{
                                    background: 'white',
                                    borderRadius: '12px',
                                    padding: '24px',
                                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
                                    border: '1px solid rgba(255, 105, 105, 0.1)'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                                <h3 style={{
                                                    margin: 0,
                                                    color: '#333',
                                                    fontSize: '18px',
                                                    fontWeight: '600'
                                                }}>
                                                    {goal.title}
                                                </h3>
                                                <span style={{
                                                    padding: '4px 8px',
                                                    borderRadius: '4px',
                                                    fontSize: '12px',
                                                    fontWeight: '500',
                                                    color: 'white',
                                                    background: getCategoryColor(goal.category)
                                                }}>
                                                    {goal.category}
                                                </span>
                                                <span style={{
                                                    padding: '4px 8px',
                                                    borderRadius: '4px',
                                                    fontSize: '12px',
                                                    fontWeight: '500',
                                                    color: 'white',
                                                    background: getPriorityColor(goal.priority)
                                                }}>
                                                    {goal.priority}
                                                </span>
                                            </div>
                                            <p style={{
                                                margin: '0 0 16px 0',
                                                color: '#666',
                                                fontSize: '14px'
                                            }}>
                                                {goal.description}
                                            </p>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                                                Target: {new Date(goal.targetDate).toLocaleDateString()}
                                            </div>
                                            <div style={{
                                                padding: '4px 8px',
                                                borderRadius: '4px',
                                                fontSize: '12px',
                                                fontWeight: '500',
                                                background: goal.status === 'Completed' ? '#4CAF50' :
                                                    goal.status === 'Paused' ? '#FF9800' : '#2196F3',
                                                color: 'white'
                                            }}>
                                                {goal.status}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div style={{ marginBottom: '16px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                            <span style={{ fontSize: '14px', color: '#666' }}>Progress</span>
                                            <span style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>{goal.progress}%</span>
                                        </div>
                                        <div style={{
                                            width: '100%',
                                            height: '8px',
                                            background: '#f0f0f0',
                                            borderRadius: '4px',
                                            overflow: 'hidden'
                                        }}>
                                            <div style={{
                                                height: '100%',
                                                width: `${goal.progress}%`,
                                                background: 'linear-gradient(135deg, #FF6969, #BB2525)',
                                                borderRadius: '4px',
                                                transition: 'width 0.3s ease'
                                            }} />
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button style={{
                                            padding: '8px 16px',
                                            border: '1px solid #FF6969',
                                            borderRadius: '6px',
                                            background: 'transparent',
                                            color: '#FF6969',
                                            cursor: 'pointer',
                                            fontSize: '14px',
                                            fontWeight: '500'
                                        }}>
                                            Update Progress
                                        </button>
                                        <button style={{
                                            padding: '8px 16px',
                                            border: '1px solid #ddd',
                                            borderRadius: '6px',
                                            background: 'transparent',
                                            color: '#666',
                                            cursor: 'pointer',
                                            fontSize: '14px'
                                        }}>
                                            Edit
                                        </button>
                                        <button style={{
                                            padding: '8px 16px',
                                            border: '1px solid #ddd',
                                            borderRadius: '6px',
                                            background: 'transparent',
                                            color: '#666',
                                            cursor: 'pointer',
                                            fontSize: '14px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px'
                                        }}>
                                            <Share2 size={14} />
                                            Share
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Achievements Tab */}
                {activeTab === 'achievements' && (
                    <div style={{
                        background: 'white',
                        borderRadius: '12px',
                        padding: '24px',
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)'
                    }}>
                        <h2 style={{ margin: '0 0 24px 0', color: '#333', fontSize: '20px', fontWeight: '600' }}>
                            Your Achievements
                        </h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
                            {achievements.map(achievement => (
                                <div key={achievement.id} style={{
                                    border: '1px solid rgba(255, 105, 105, 0.2)',
                                    borderRadius: '12px',
                                    padding: '20px',
                                    background: 'linear-gradient(135deg, rgba(255, 105, 105, 0.05), rgba(187, 37, 37, 0.05))'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                                        <div style={{ fontSize: '32px' }}>{achievement.icon}</div>
                                        <div>
                                            <h3 style={{ margin: 0, color: '#333', fontSize: '16px', fontWeight: '600' }}>
                                                {achievement.title}
                                            </h3>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                                                <span style={{
                                                    background: 'linear-gradient(135deg, #FF6969, #BB2525)',
                                                    color: 'white',
                                                    padding: '2px 8px',
                                                    borderRadius: '12px',
                                                    fontSize: '12px',
                                                    fontWeight: '500'
                                                }}>
                                                    +{achievement.points} pts
                                                </span>
                                                <span style={{ fontSize: '12px', color: '#666' }}>
                                                    {new Date(achievement.dateEarned).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                                        {achievement.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Study Groups Tab */}
                {activeTab === 'groups' && (
                    <div style={{
                        background: 'white',
                        borderRadius: '12px',
                        padding: '24px',
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h2 style={{ margin: 0, color: '#333', fontSize: '20px', fontWeight: '600' }}>
                                Study Groups
                            </h2>
                            <button style={{
                                background: 'linear-gradient(135deg, #FF6969, #BB2525)',
                                color: 'white',
                                border: 'none',
                                padding: '10px 20px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: '500'
                            }}>
                                Create Group
                            </button>
                        </div>

                        <div style={{ display: 'grid', gap: '16px' }}>
                            {studyGroups.map(group => (
                                <div key={group.id} style={{
                                    border: '1px solid #ddd',
                                    borderRadius: '12px',
                                    padding: '20px',
                                    transition: 'all 0.3s ease'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                        <div>
                                            <h3 style={{ margin: '0 0 8px 0', color: '#333', fontSize: '18px', fontWeight: '600' }}>
                                                {group.name}
                                            </h3>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
                                                <span style={{
                                                    padding: '4px 8px',
                                                    background: '#f0f0f0',
                                                    borderRadius: '4px',
                                                    fontSize: '12px',
                                                    color: '#666'
                                                }}>
                                                    {group.subject}
                                                </span>
                                                <span style={{ fontSize: '14px', color: '#666' }}>
                                                    {group.members} members
                                                </span>
                                            </div>
                                            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                                                {group.description}
                                            </p>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                                                Next Session
                                            </div>
                                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>
                                                {new Date(group.nextSession).toLocaleDateString()}<br />
                                                {new Date(group.nextSession).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                                        <button style={{
                                            background: 'linear-gradient(135deg, #FF6969, #BB2525)',
                                            color: 'white',
                                            border: 'none',
                                            padding: '8px 16px',
                                            borderRadius: '6px',
                                            cursor: 'pointer',
                                            fontSize: '14px',
                                            fontWeight: '500'
                                        }}>
                                            Join Session
                                        </button>
                                        <button style={{
                                            border: '1px solid #ddd',
                                            background: 'transparent',
                                            color: '#666',
                                            padding: '8px 16px',
                                            borderRadius: '6px',
                                            cursor: 'pointer',
                                            fontSize: '14px'
                                        }}>
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Progress Tab */}
                {activeTab === 'progress' && (
                    <div style={{
                        background: 'white',
                        borderRadius: '12px',
                        padding: '24px',
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)'
                    }}>
                        <h2 style={{ margin: '0 0 24px 0', color: '#333', fontSize: '20px', fontWeight: '600' }}>
                            Progress Overview
                        </h2>

                        {/* Progress Charts Placeholder */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                            <div style={{
                                border: '1px solid #ddd',
                                borderRadius: '12px',
                                padding: '20px',
                                textAlign: 'center'
                            }}>
                                <h3 style={{ margin: '0 0 16px 0', color: '#333' }}>Weekly Progress</h3>
                                <div style={{
                                    width: '100px',
                                    height: '100px',
                                    borderRadius: '50%',
                                    background: `conic-gradient(#FF6969 0deg 216deg, #f0f0f0 216deg 360deg)`,
                                    margin: '0 auto 16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '20px',
                                    fontWeight: '600',
                                    color: '#333'
                                }}>
                                    60%
                                </div>
                                <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                                    You've completed 60% of your weekly goals
                                </p>
                            </div>

                            <div style={{
                                border: '1px solid #ddd',
                                borderRadius: '12px',
                                padding: '20px'
                            }}>
                                <h3 style={{ margin: '0 0 16px 0', color: '#333' }}>Category Breakdown</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {['Academic', 'Personal', 'Skill', 'Health'].map((category, index) => {
                                        const progress = [75, 50, 30, 85][index];
                                        return (
                                            <div key={category}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                                    <span style={{ fontSize: '14px', color: '#666' }}>{category}</span>
                                                    <span style={{ fontSize: '14px', fontWeight: '600' }}>{progress}%</span>
                                                </div>
                                                <div style={{
                                                    width: '100%',
                                                    height: '6px',
                                                    background: '#f0f0f0',
                                                    borderRadius: '3px',
                                                    overflow: 'hidden'
                                                }}>
                                                    <div style={{
                                                        height: '100%',
                                                        width: `${progress}%`,
                                                        background: getCategoryColor(category),
                                                        borderRadius: '3px'
                                                    }} />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Add responsive styles for mobile */}
            <style>{`
                @media (max-width: 768px) {
                    .grow-together-content {
                        margin-left: 0 !important;
                        margin-top: 70px !important;
                    }
                }
            `}</style>
        </>
    );
}

export default GrowTogether;
