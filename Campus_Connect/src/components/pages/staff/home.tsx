// src/components/pages/staff/home/index.tsx
import React from 'react';
import StaffNavigation from '../staff/navigation';
import {
    Users,
    Bell,
    Search,
    Building,
    Calendar,
    BookOpen,
    BarChart3,
    CalendarDays,
    MessageCircle,
    TrendingUp,
    AlertCircle,
    CheckCircle,
    Clock,
    Award,
    FileText
} from 'lucide-react';

function StaffHomePage() {
    return (
        <>
            <StaffNavigation />

            {/* Main Content */}
            <main style={{
                marginLeft: window.innerWidth > 768 ? '280px' : '0',
                marginTop: '70px',
                padding: '24px',
                minHeight: 'calc(100vh - 70px)',
                transition: 'margin-left 0.3s ease'
            }}>
                {/* Dashboard Header */}
                <div style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '16px',
                    padding: '32px',
                    border: '1px solid rgba(34, 139, 34, 0.1)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                    marginBottom: '24px'
                }}>
                    <h1 style={{
                        fontSize: '32px',
                        fontWeight: '700',
                        color: '#228B22',
                        marginBottom: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                    }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            background: 'linear-gradient(135deg, #32CD32, #228B22)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white'
                        }}>
                            <BarChart3 size={28} />
                        </div>
                        Staff Dashboard
                    </h1>
                    <p style={{
                        color: '#666',
                        fontSize: '16px',
                        lineHeight: '1.6',
                        marginBottom: '24px'
                    }}>
                        Welcome to your comprehensive staff dashboard. Manage students, track activities, and oversee campus operations efficiently.
                    </p>

                    {/* Quick Stats */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '20px'
                    }}>
                        <div style={{
                            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                            borderRadius: '12px',
                            padding: '24px',
                            color: 'white',
                            textAlign: 'center'
                        }}>
                            <Users size={32} style={{ margin: '0 auto 12px' }} />
                            <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>1,234</div>
                            <div style={{ fontSize: '14px', opacity: '0.9' }}>Total Students</div>
                        </div>

                        <div style={{
                            background: 'linear-gradient(135deg, #32CD32, #228B22)',
                            borderRadius: '12px',
                            padding: '24px',
                            color: 'white',
                            textAlign: 'center'
                        }}>
                            <Bell size={32} style={{ margin: '0 auto 12px' }} />
                            <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>15</div>
                            <div style={{ fontSize: '14px', opacity: '0.9' }}>Active Announcements</div>
                        </div>

                        <div style={{
                            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                            borderRadius: '12px',
                            padding: '24px',
                            color: 'white',
                            textAlign: 'center'
                        }}>
                            <Building size={32} style={{ margin: '0 auto 12px' }} />
                            <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>23</div>
                            <div style={{ fontSize: '14px', opacity: '0.9' }}>Pending Complaints</div>
                        </div>

                        <div style={{
                            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                            borderRadius: '12px',
                            padding: '24px',
                            color: 'white',
                            textAlign: 'center'
                        }}>
                            <CalendarDays size={32} style={{ margin: '0 auto 12px' }} />
                            <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>8</div>
                            <div style={{ fontSize: '14px', opacity: '0.9' }}>Upcoming Events</div>
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '24px'
                }}>
                    {/* Recent Activities */}
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '16px',
                        padding: '24px',
                        border: '1px solid rgba(34, 139, 34, 0.1)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
                    }}>
                        <h3 style={{
                            fontSize: '18px',
                            fontWeight: '600',
                            color: '#333',
                            marginBottom: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <Clock size={20} style={{ color: '#32CD32' }} />
                            Recent Activities
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{
                                padding: '12px',
                                background: 'rgba(50, 205, 50, 0.1)',
                                borderRadius: '8px',
                                borderLeft: '4px solid #32CD32'
                            }}>
                                <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '4px' }}>New Student Registration</div>
                                <div style={{ fontSize: '12px', color: '#666' }}>John Smith registered for CSE • 2 hours ago</div>
                            </div>
                            <div style={{
                                padding: '12px',
                                background: 'rgba(50, 205, 50, 0.1)',
                                borderRadius: '8px',
                                borderLeft: '4px solid #32CD32'
                            }}>
                                <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '4px' }}>Complaint Resolved</div>
                                <div style={{ fontSize: '12px', color: '#666' }}>Hostel WiFi issue fixed • 4 hours ago</div>
                            </div>
                            <div style={{
                                padding: '12px',
                                background: 'rgba(50, 205, 50, 0.1)',
                                borderRadius: '8px',
                                borderLeft: '4px solid #32CD32'
                            }}>
                                <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '4px' }}>Event Updated</div>
                                <div style={{ fontSize: '12px', color: '#666' }}>Tech Fest schedule modified • 6 hours ago</div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '16px',
                        padding: '24px',
                        border: '1px solid rgba(34, 139, 34, 0.1)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
                    }}>
                        <h3 style={{
                            fontSize: '18px',
                            fontWeight: '600',
                            color: '#333',
                            marginBottom: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <TrendingUp size={20} style={{ color: '#32CD32' }} />
                            Quick Actions
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <button style={{
                                padding: '12px 16px',
                                background: 'rgba(50, 205, 50, 0.1)',
                                border: '1px solid rgba(50, 205, 50, 0.2)',
                                borderRadius: '8px',
                                color: '#228B22',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                                textAlign: 'left',
                                transition: 'all 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <Bell size={16} />
                                Post New Announcement
                            </button>
                            <button style={{
                                padding: '12px 16px',
                                background: 'rgba(50, 205, 50, 0.1)',
                                border: '1px solid rgba(50, 205, 50, 0.2)',
                                borderRadius: '8px',
                                color: '#228B22',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                                textAlign: 'left',
                                transition: 'all 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <Building size={16} />
                                Review Complaints
                            </button>
                            <button style={{
                                padding: '12px 16px',
                                background: 'rgba(50, 205, 50, 0.1)',
                                border: '1px solid rgba(50, 205, 50, 0.2)',
                                borderRadius: '8px',
                                color: '#228B22',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                                textAlign: 'left',
                                transition: 'all 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <CalendarDays size={16} />
                                Manage Events
                            </button>
                            <button style={{
                                padding: '12px 16px',
                                background: 'rgba(50, 205, 50, 0.1)',
                                border: '1px solid rgba(50, 205, 50, 0.2)',
                                borderRadius: '8px',
                                color: '#228B22',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                                textAlign: 'left',
                                transition: 'all 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <BarChart3 size={16} />
                                View Reports
                            </button>
                        </div>
                    </div>

                    {/* System Statistics */}
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '16px',
                        padding: '24px',
                        border: '1px solid rgba(34, 139, 34, 0.1)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                        gridColumn: 'span 2'
                    }}>
                        <h3 style={{
                            fontSize: '18px',
                            fontWeight: '600',
                            color: '#333',
                            marginBottom: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <BarChart3 size={20} style={{ color: '#32CD32' }} />
                            System Overview
                        </h3>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '16px'
                        }}>
                            <div style={{
                                padding: '16px',
                                background: 'rgba(59, 130, 246, 0.1)',
                                borderRadius: '8px',
                                textAlign: 'center'
                            }}>
                                <Users size={24} style={{ color: '#3b82f6', marginBottom: '8px' }} />
                                <div style={{ fontSize: '20px', fontWeight: '600', color: '#3b82f6' }}>1,234</div>
                                <div style={{ fontSize: '12px', color: '#666' }}>Active Students</div>
                            </div>
                            <div style={{
                                padding: '16px',
                                background: 'rgba(34, 197, 94, 0.1)',
                                borderRadius: '8px',
                                textAlign: 'center'
                            }}>
                                <BookOpen size={24} style={{ color: '#22c55e', marginBottom: '8px' }} />
                                <div style={{ fontSize: '20px', fontWeight: '600', color: '#22c55e' }}>456</div>
                                <div style={{ fontSize: '12px', color: '#666' }}>Resources Shared</div>
                            </div>
                            <div style={{
                                padding: '16px',
                                background: 'rgba(245, 158, 11, 0.1)',
                                borderRadius: '8px',
                                textAlign: 'center'
                            }}>
                                <MessageCircle size={24} style={{ color: '#f59e0b', marginBottom: '8px' }} />
                                <div style={{ fontSize: '20px', fontWeight: '600', color: '#f59e0b' }}>89</div>
                                <div style={{ fontSize: '12px', color: '#666' }}>Feedback Items</div>
                            </div>
                            <div style={{
                                padding: '16px',
                                background: 'rgba(239, 68, 68, 0.1)',
                                borderRadius: '8px',
                                textAlign: 'center'
                            }}>
                                <AlertCircle size={24} style={{ color: '#ef4444', marginBottom: '8px' }} />
                                <div style={{ fontSize: '20px', fontWeight: '600', color: '#ef4444' }}>23</div>
                                <div style={{ fontSize: '12px', color: '#666' }}>Pending Issues</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default StaffHomePage;
