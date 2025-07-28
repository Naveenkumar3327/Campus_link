// src/components/pages/staff/reports/index.tsx
import React, { useState, useEffect } from 'react';
import StaffNavigation from '../staff/navigation';
import {
    BarChart3,
    TrendingUp,
    Users,
    BookOpen,
    Calendar,
    Download,
    Filter,
    Eye,
    AlertCircle,
    CheckCircle,
    Clock,
    Star,
    MessageSquare,
    Activity,
    PieChart,
    LineChart
} from 'lucide-react';

interface ReportData {
    students: {
        total: number;
        active: number;
        newThisMonth: number;
        byYear: { [key: string]: number };
        byDepartment: { [key: string]: number };
    };
    complaints: {
        total: number;
        pending: number;
        resolved: number;
        byCategory: { [key: string]: number };
        averageResolutionTime: number;
    };
    resources: {
        total: number;
        approved: number;
        pending: number;
        totalDownloads: number;
        byType: { [key: string]: number };
    };
    sessions: {
        total: number;
        approved: number;
        completed: number;
        byType: { [key: string]: number };
        utilizationRate: number;
    };
    announcements: {
        total: number;
        thisMonth: number;
        views: number;
        byCategory: { [key: string]: number };
    };
}

function StaffReportsPage() {
    const [reportData, setReportData] = useState<ReportData | null>(null);
    const [selectedReport, setSelectedReport] = useState<string>('overview');
    const [dateRange, setDateRange] = useState<string>('last30days');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate API call to fetch report data
        const fetchReportData = async () => {
            setIsLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1500));

            const mockData: ReportData = {
                students: {
                    total: 1234,
                    active: 1156,
                    newThisMonth: 45,
                    byYear: {
                        '1st Year': 345,
                        '2nd Year': 312,
                        '3rd Year': 298,
                        '4th Year': 279
                    },
                    byDepartment: {
                        'Computer Science': 456,
                        'Electronics': 298,
                        'Mechanical': 234,
                        'Civil': 189,
                        'Other': 57
                    }
                },
                complaints: {
                    total: 156,
                    pending: 23,
                    resolved: 133,
                    byCategory: {
                        'WiFi/Internet': 45,
                        'Maintenance': 38,
                        'Food': 32,
                        'Cleanliness': 25,
                        'Security': 16
                    },
                    averageResolutionTime: 2.5
                },
                resources: {
                    total: 234,
                    approved: 189,
                    pending: 45,
                    totalDownloads: 5678,
                    byType: {
                        'Notes': 89,
                        'Projects': 67,
                        'Assignments': 45,
                        'Presentations': 33
                    }
                },
                sessions: {
                    total: 89,
                    approved: 76,
                    completed: 65,
                    byType: {
                        'Study Groups': 34,
                        'Tutorials': 28,
                        'Project Meetings': 19,
                        'Presentations': 8
                    },
                    utilizationRate: 78.5
                },
                announcements: {
                    total: 45,
                    thisMonth: 12,
                    views: 12456,
                    byCategory: {
                        'Academic': 18,
                        'Events': 12,
                        'General': 10,
                        'Urgent': 5
                    }
                }
            };

            setReportData(mockData);
            setIsLoading(false);
        };

        fetchReportData();
    }, [dateRange]);

    const generateReport = () => {
        // Simulate report generation
        alert('Report generated successfully! Download will start shortly.');
    };

    const exportData = (format: 'pdf' | 'excel' | 'csv') => {
        alert(`Exporting data as ${format.toUpperCase()}...`);
    };

    if (isLoading || !reportData) {
        return (
            <>
                <StaffNavigation />
                <main style={{
                    marginLeft: window.innerWidth > 768 ? '280px' : '0',
                    marginTop: '70px',
                    padding: '24px',
                    minHeight: 'calc(100vh - 70px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{
                            width: '64px',
                            height: '64px',
                            margin: '0 auto 16px',
                            border: '4px solid rgba(34, 139, 34, 0.2)',
                            borderRadius: '50%',
                            borderTopColor: '#32CD32',
                            animation: 'spin 1s ease-in-out infinite'
                        }} />
                        <h3 style={{ color: '#228B22', marginBottom: '8px' }}>Loading Reports...</h3>
                        <p style={{ color: '#666' }}>Please wait while we fetch the latest data</p>
                    </div>
                </main>
            </>
        );
    }

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
                                <BarChart3 size={24} />
                            </div>
                            Reports & Insights
                        </h1>

                        <div style={{ display: 'flex', gap: '12px' }}>
                            <select
                                value={dateRange}
                                onChange={(e) => setDateRange(e.target.value)}
                                style={{
                                    padding: '8px 16px',
                                    border: '1px solid #ddd',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    background: 'white'
                                }}
                            >
                                <option value="last7days">Last 7 Days</option>
                                <option value="last30days">Last 30 Days</option>
                                <option value="last3months">Last 3 Months</option>
                                <option value="last6months">Last 6 Months</option>
                                <option value="lastyear">Last Year</option>
                            </select>
                            <button
                                onClick={generateReport}
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
                            >
                                <Download size={16} />
                                Generate Report
                            </button>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {[
                            { id: 'overview', label: 'Overview', icon: Activity },
                            { id: 'students', label: 'Students', icon: Users },
                            { id: 'complaints', label: 'Complaints', icon: AlertCircle },
                            { id: 'resources', label: 'Resources', icon: BookOpen },
                            { id: 'sessions', label: 'Sessions', icon: Calendar }
                        ].map(tab => {
                            const IconComponent = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setSelectedReport(tab.id)}
                                    style={{
                                        padding: '8px 16px',
                                        border: 'none',
                                        borderRadius: '8px',
                                        background: selectedReport === tab.id ? 'linear-gradient(135deg, #32CD32, #228B22)' : 'rgba(34, 139, 34, 0.1)',
                                        color: selectedReport === tab.id ? 'white' : '#228B22',
                                        cursor: 'pointer',
                                        fontWeight: '500',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        fontSize: '14px'
                                    }}
                                >
                                    <IconComponent size={14} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Overview Dashboard */}
                {selectedReport === 'overview' && (
                    <div style={{ display: 'grid', gap: '24px' }}>
                        {/* Key Metrics */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: '20px'
                        }}>
                            <div style={{
                                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                                borderRadius: '16px',
                                padding: '24px',
                                color: 'white'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                    <Users size={32} />
                                    <div>
                                        <div style={{ fontSize: '28px', fontWeight: '700' }}>{reportData.students.total}</div>
                                        <div style={{ fontSize: '14px', opacity: '0.9' }}>Total Students</div>
                                    </div>
                                </div>
                                <div style={{ fontSize: '12px', opacity: '0.8' }}>
                                    +{reportData.students.newThisMonth} new this month
                                </div>
                            </div>

                            <div style={{
                                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                                borderRadius: '16px',
                                padding: '24px',
                                color: 'white'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                    <AlertCircle size={32} />
                                    <div>
                                        <div style={{ fontSize: '28px', fontWeight: '700' }}>{reportData.complaints.pending}</div>
                                        <div style={{ fontSize: '14px', opacity: '0.9' }}>Pending Complaints</div>
                                    </div>
                                </div>
                                <div style={{ fontSize: '12px', opacity: '0.8' }}>
                                    Avg resolution: {reportData.complaints.averageResolutionTime} days
                                </div>
                            </div>

                            <div style={{
                                background: 'linear-gradient(135deg, #32CD32, #228B22)',
                                borderRadius: '16px',
                                padding: '24px',
                                color: 'white'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                    <BookOpen size={32} />
                                    <div>
                                        <div style={{ fontSize: '28px', fontWeight: '700' }}>{reportData.resources.approved}</div>
                                        <div style={{ fontSize: '14px', opacity: '0.9' }}>Approved Resources</div>
                                    </div>
                                </div>
                                <div style={{ fontSize: '12px', opacity: '0.8' }}>
                                    {reportData.resources.totalDownloads} total downloads
                                </div>
                            </div>

                            <div style={{
                                background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                                borderRadius: '16px',
                                padding: '24px',
                                color: 'white'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                    <Calendar size={32} />
                                    <div>
                                        <div style={{ fontSize: '28px', fontWeight: '700' }}>{reportData.sessions.approved}</div>
                                        <div style={{ fontSize: '14px', opacity: '0.9' }}>Active Sessions</div>
                                    </div>
                                </div>
                                <div style={{ fontSize: '12px', opacity: '0.8' }}>
                                    {reportData.sessions.utilizationRate}% utilization rate
                                </div>
                            </div>
                        </div>

                        {/* Charts Section */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                            {/* Students by Department */}
                            <div style={{
                                background: 'rgba(255, 255, 255, 0.9)',
                                backdropFilter: 'blur(20px)',
                                borderRadius: '16px',
                                padding: '24px',
                                border: '1px solid rgba(34, 139, 34, 0.1)',
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
                            }}>
                                <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <PieChart size={20} style={{ color: '#32CD32' }} />
                                    Students by Department
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {Object.entries(reportData.students.byDepartment).map(([dept, count]) => (
                                        <div key={dept} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{
                                                width: '12px',
                                                height: '12px',
                                                borderRadius: '50%',
                                                background: `hsl(${Object.keys(reportData.students.byDepartment).indexOf(dept) * 72}, 70%, 50%)`
                                            }} />
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontWeight: '500' }}>{dept}</div>
                                                <div style={{ fontSize: '12px', color: '#666' }}>
                                                    {count} students ({Math.round((count / reportData.students.total) * 100)}%)
                                                </div>
                                            </div>
                                            <div style={{ fontWeight: '600' }}>{count}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Complaints by Category */}
                            <div style={{
                                background: 'rgba(255, 255, 255, 0.9)',
                                backdropFilter: 'blur(20px)',
                                borderRadius: '16px',
                                padding: '24px',
                                border: '1px solid rgba(34, 139, 34, 0.1)',
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
                            }}>
                                <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <BarChart3 size={20} style={{ color: '#32CD32' }} />
                                    Complaints by Category
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {Object.entries(reportData.complaints.byCategory).map(([category, count]) => (
                                        <div key={category} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ width: '80px', fontSize: '12px', fontWeight: '500' }}>{category}</div>
                                            <div style={{ flex: 1, height: '20px', background: '#f3f4f6', borderRadius: '10px', overflow: 'hidden' }}>
                                                <div style={{
                                                    height: '100%',
                                                    width: `${(count / Math.max(...Object.values(reportData.complaints.byCategory))) * 100}%`,
                                                    background: 'linear-gradient(135deg, #32CD32, #228B22)',
                                                    transition: 'width 0.3s ease'
                                                }} />
                                            </div>
                                            <div style={{ fontWeight: '600', minWidth: '30px', textAlign: 'right' }}>{count}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Activity Summary */}
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '16px',
                            padding: '24px',
                            border: '1px solid rgba(34, 139, 34, 0.1)',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
                        }}>
                            <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Activity size={20} style={{ color: '#32CD32' }} />
                                Recent Activity Summary
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                                <div style={{ textAlign: 'center', padding: '16px', background: 'rgba(34, 139, 34, 0.05)', borderRadius: '8px' }}>
                                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#228B22' }}>{reportData.announcements.thisMonth}</div>
                                    <div style={{ fontSize: '14px', color: '#666' }}>Announcements This Month</div>
                                </div>
                                <div style={{ textAlign: 'center', padding: '16px', background: 'rgba(34, 139, 34, 0.05)', borderRadius: '8px' }}>
                                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#228B22' }}>{reportData.resources.pending}</div>
                                    <div style={{ fontSize: '14px', color: '#666' }}>Resources Pending Review</div>
                                </div>
                                <div style={{ textAlign: 'center', padding: '16px', background: 'rgba(34, 139, 34, 0.05)', borderRadius: '8px' }}>
                                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#228B22' }}>{reportData.sessions.completed}</div>
                                    <div style={{ fontSize: '14px', color: '#666' }}>Sessions Completed</div>
                                </div>
                                <div style={{ textAlign: 'center', padding: '16px', background: 'rgba(34, 139, 34, 0.05)', borderRadius: '8px' }}>
                                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#228B22' }}>{reportData.announcements.views}</div>
                                    <div style={{ fontSize: '14px', color: '#666' }}>Total Announcement Views</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Export Options */}
                <div style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '16px',
                    padding: '24px',
                    marginTop: '24px',
                    border: '1px solid rgba(34, 139, 34, 0.1)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
                }}>
                    <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Download size={20} style={{ color: '#32CD32' }} />
                        Export Data
                    </h3>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <button
                            onClick={() => exportData('pdf')}
                            style={{
                                padding: '8px 16px',
                                background: 'rgba(239, 68, 68, 0.1)',
                                color: '#ef4444',
                                border: '1px solid rgba(239, 68, 68, 0.2)',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: '500',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            <Download size={14} />
                            Export as PDF
                        </button>
                        <button
                            onClick={() => exportData('excel')}
                            style={{
                                padding: '8px 16px',
                                background: 'rgba(34, 197, 94, 0.1)',
                                color: '#22c55e',
                                border: '1px solid rgba(34, 197, 94, 0.2)',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: '500',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            <Download size={14} />
                            Export as Excel
                        </button>
                        <button
                            onClick={() => exportData('csv')}
                            style={{
                                padding: '8px 16px',
                                background: 'rgba(59, 130, 246, 0.1)',
                                color: '#3b82f6',
                                border: '1px solid rgba(59, 130, 246, 0.2)',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: '500',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            <Download size={14} />
                            Export as CSV
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
}

export default StaffReportsPage;
