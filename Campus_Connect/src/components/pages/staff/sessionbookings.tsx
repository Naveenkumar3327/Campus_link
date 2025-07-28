// src/components/pages/staff/sessionbookings/index.tsx
import React, { useState, useEffect } from 'react';
import StaffNavigation from '../staff/navigation'; // Fixed import path
import {
    Users,
    Calendar,
    Clock,
    MapPin,
    User,
    CheckCircle,
    XCircle,
    Eye,
    Edit3,
    Filter,
    Search,
    AlertTriangle,
    MessageCircle,
    Phone,
    Mail
} from 'lucide-react';

interface SessionBooking {
    id: string;
    title: string;
    description: string;
    bookedBy: string;
    bookerEmail: string;
    bookerPhone: string;
    date: string;
    startTime: string;
    endTime: string;
    duration: number; // in minutes
    location: string;
    room: string;
    type: 'study-group' | 'tutorial' | 'project-meeting' | 'presentation' | 'discussion' | 'other';
    attendees: number;
    maxAttendees: number;
    status: 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled';
    bookingDate: string;
    requirements?: string[];
    staffNotes?: string;
    approvedBy?: string;
    approvalDate?: string;
}

function StaffSessionBookingsPage() {
    const [bookings, setBookings] = useState<SessionBooking[]>([]);
    const [selectedBooking, setSelectedBooking] = useState<SessionBooking | null>(null);
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [typeFilter, setTypeFilter] = useState<string>('all');
    const [dateFilter, setDateFilter] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [staffNotes, setStaffNotes] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        const savedBookings = localStorage.getItem('staffSessionBookings');
        if (savedBookings) {
            setBookings(JSON.parse(savedBookings));
        } else {
            const defaultBookings: SessionBooking[] = [
                {
                    id: 'SB001',
                    title: 'Data Structures Study Group',
                    description: 'Weekly study group session to discuss complex data structure algorithms and practice coding problems together.',
                    bookedBy: 'John Smith',
                    bookerEmail: 'john.smith@sece.ac.in',
                    bookerPhone: '+91 9876543210',
                    date: '2025-01-28',
                    startTime: '14:00',
                    endTime: '16:00',
                    duration: 120,
                    location: 'Library Block',
                    room: 'Study Room 1',
                    type: 'study-group',
                    attendees: 8,
                    maxAttendees: 12,
                    status: 'pending',
                    bookingDate: '2025-01-25T10:30:00Z',
                    requirements: ['Whiteboard', 'Projector', 'Power outlets']
                },
                {
                    id: 'SB002',
                    title: 'Database Project Discussion',
                    description: 'Team meeting to discuss the library management system project implementation and divide tasks among team members.',
                    bookedBy: 'Priya Sharma',
                    bookerEmail: 'priya.sharma@sece.ac.in',
                    bookerPhone: '+91 9876543211',
                    date: '2025-01-27',
                    startTime: '10:00',
                    endTime: '12:00',
                    duration: 120,
                    location: 'CSE Block',
                    room: 'Conference Room A',
                    type: 'project-meeting',
                    attendees: 5,
                    maxAttendees: 8,
                    status: 'approved',
                    bookingDate: '2025-01-24T14:15:00Z',
                    requirements: ['Projector', 'WiFi', 'Laptop charging points'],
                    staffNotes: 'Approved for academic project work',
                    approvedBy: 'Dr. Jane Smith',
                    approvalDate: '2025-01-24T16:00:00Z'
                },
                {
                    id: 'SB003',
                    title: 'Machine Learning Tutorial',
                    description: 'Interactive tutorial session on machine learning algorithms with hands-on coding examples and practical implementations.',
                    bookedBy: 'Rahul Kumar',
                    bookerEmail: 'rahul.kumar@sece.ac.in',
                    bookerPhone: '+91 9876543212',
                    date: '2025-01-29',
                    startTime: '15:30',
                    endTime: '17:30',
                    duration: 120,
                    location: 'Computer Lab',
                    room: 'Lab B',
                    type: 'tutorial',
                    attendees: 15,
                    maxAttendees: 20,
                    status: 'approved',
                    bookingDate: '2025-01-23T09:45:00Z',
                    requirements: ['Computers', 'Internet access', 'Python environment'],
                    staffNotes: 'Great initiative for peer learning',
                    approvedBy: 'Dr. Jane Smith',
                    approvalDate: '2025-01-23T12:00:00Z'
                },
                {
                    id: 'SB004',
                    title: 'Presentation Practice Session',
                    description: 'Practice session for final year project presentations. Students will present their work and receive feedback.',
                    bookedBy: 'Sara Wilson',
                    bookerEmail: 'sara.wilson@sece.ac.in',
                    bookerPhone: '+91 9876543213',
                    date: '2025-01-26',
                    startTime: '13:00',
                    endTime: '15:00',
                    duration: 120,
                    location: 'Main Block',
                    room: 'Seminar Hall 2',
                    type: 'presentation',
                    attendees: 12,
                    maxAttendees: 15,
                    status: 'completed',
                    bookingDate: '2025-01-22T11:20:00Z',
                    requirements: ['Projector', 'Microphone', 'Screen'],
                    staffNotes: 'Session completed successfully',
                    approvedBy: 'Dr. Jane Smith',
                    approvalDate: '2025-01-22T14:00:00Z'
                },
                {
                    id: 'SB005',
                    title: 'Web Development Workshop',
                    description: 'Hands-on workshop on modern web development frameworks and best practices.',
                    bookedBy: 'Michael Chen',
                    bookerEmail: 'michael.chen@sece.ac.in',
                    bookerPhone: '+91 9876543214',
                    date: '2025-01-30',
                    startTime: '09:00',
                    endTime: '12:00',
                    duration: 180,
                    location: 'Computer Lab',
                    room: 'Lab A',
                    type: 'tutorial',
                    attendees: 18,
                    maxAttendees: 25,
                    status: 'pending',
                    bookingDate: '2025-01-26T08:15:00Z',
                    requirements: ['Computers', 'Internet access', 'VS Code installed']
                },
                {
                    id: 'SB006',
                    title: 'Algorithm Design Discussion',
                    description: 'Discussion group for advanced algorithm design patterns and optimization techniques.',
                    bookedBy: 'Emma Davis',
                    bookerEmail: 'emma.davis@sece.ac.in',
                    bookerPhone: '+91 9876543215',
                    date: '2025-01-31',
                    startTime: '16:00',
                    endTime: '18:00',
                    duration: 120,
                    location: 'Library Block',
                    room: 'Study Room 3',
                    type: 'discussion',
                    attendees: 6,
                    maxAttendees: 10,
                    status: 'pending',
                    bookingDate: '2025-01-26T14:45:00Z',
                    requirements: ['Whiteboard', 'Markers', 'Reference books']
                }
            ];
            setBookings(defaultBookings);
            localStorage.setItem('staffSessionBookings', JSON.stringify(defaultBookings));
        }
    }, []);

    const sessionTypes = [
        { value: 'study-group', label: 'Study Group', color: 'bg-blue-100 text-blue-800' },
        { value: 'tutorial', label: 'Tutorial', color: 'bg-green-100 text-green-800' },
        { value: 'project-meeting', label: 'Project Meeting', color: 'bg-purple-100 text-purple-800' },
        { value: 'presentation', label: 'Presentation', color: 'bg-orange-100 text-orange-800' },
        { value: 'discussion', label: 'Discussion', color: 'bg-cyan-100 text-cyan-800' },
        { value: 'other', label: 'Other', color: 'bg-gray-100 text-gray-800' }
    ];

    const updateBookingStatus = async (bookingId: string, newStatus: 'approved' | 'rejected') => {
        setIsUpdating(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            const updatedBookings = bookings.map(booking => {
                if (booking.id === bookingId) {
                    return {
                        ...booking,
                        status: newStatus,
                        approvedBy: 'Dr. Jane Smith',
                        approvalDate: new Date().toISOString(),
                        staffNotes: staffNotes || `Booking ${newStatus}`
                    };
                }
                return booking;
            });

            setBookings(updatedBookings);
            localStorage.setItem('staffSessionBookings', JSON.stringify(updatedBookings));
            setSelectedBooking(null);
            setStaffNotes('');

            // Show success message
            const message = `Booking ${newStatus} successfully!`;
            alert(message);
        } catch (error) {
            const errorMessage = 'Failed to update booking. Please try again.';
            alert(errorMessage);
        } finally {
            setIsUpdating(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'approved':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'rejected':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'completed':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'cancelled':
                return 'bg-gray-100 text-gray-800 border-gray-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getTypeColor = (type: string) => {
        const sessionType = sessionTypes.find(t => t.value === type);
        return sessionType?.color || 'bg-gray-100 text-gray-800';
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatTime = (timeString: string) => {
        return new Date(`1970-01-01T${timeString}:00`).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const isUpcoming = (date: string) => {
        return new Date(date) >= new Date(new Date().toDateString());
    };

    const filteredBookings = bookings.filter(booking => {
        const matchesSearch = booking.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.bookedBy.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
        const matchesType = typeFilter === 'all' || booking.type === typeFilter;

        let matchesDate = true;
        if (dateFilter === 'today') {
            matchesDate = booking.date === new Date().toISOString().split('T')[0];
        } else if (dateFilter === 'upcoming') {
            matchesDate = isUpcoming(booking.date);
        } else if (dateFilter === 'past') {
            matchesDate = !isUpcoming(booking.date);
        }

        return matchesSearch && matchesStatus && matchesType && matchesDate;
    });

    const pendingCount = bookings.filter(b => b.status === 'pending').length;
    const approvedCount = bookings.filter(b => b.status === 'approved').length;
    const todayBookings = bookings.filter(b => b.date === new Date().toISOString().split('T')[0]).length;
    const upcomingBookings = bookings.filter(b => isUpcoming(b.date) && b.status === 'approved').length;

    // Prevent event bubbling to avoid navigation issues
    const handleCardClick = (booking: SessionBooking, event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        setSelectedBooking(booking);
    };

    const handleModalClose = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        setSelectedBooking(null);
        setStaffNotes('');
    };

    return (
        <>
            <StaffNavigation userName="Dr. Jane Smith" />

            <main style={{
                marginLeft: window.innerWidth > 768 ? '280px' : '0',
                marginTop: '70px',
                padding: '24px',
                minHeight: 'calc(100vh - 70px)',
                transition: 'margin-left 0.3s ease',
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                background: '#f8fafc'
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
                    <h1 style={{
                        fontSize: '28px',
                        fontWeight: '700',
                        color: '#228B22',
                        marginBottom: '16px',
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
                            <Users size={24} />
                        </div>
                        Session Bookings Management
                    </h1>

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
                            <Clock size={16} />
                            <span>{pendingCount} Pending Approvals</span>
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
                            <CheckCircle size={16} />
                            <span>{upcomingBookings} Upcoming Sessions</span>
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
                            <Calendar size={16} />
                            <span>{todayBookings} Today's Bookings</span>
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
                    border: '1px solid rgba(34, 139, 34, 0.1)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
                }}>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
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
                                placeholder="Search bookings..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px 16px 10px 40px',
                                    border: '1px solid #ddd',
                                    borderRadius: '8px',
                                    fontSize: '14px'
                                }}
                            />
                        </div>
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
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                        <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            style={{
                                padding: '10px 16px',
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                fontSize: '14px',
                                background: 'white'
                            }}
                        >
                            <option value="all">All Types</option>
                            {sessionTypes.map(type => (
                                <option key={type.value} value={type.value}>{type.label}</option>
                            ))}
                        </select>
                        <select
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                            style={{
                                padding: '10px 16px',
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                fontSize: '14px',
                                background: 'white'
                            }}
                        >
                            <option value="all">All Dates</option>
                            <option value="today">Today</option>
                            <option value="upcoming">Upcoming</option>
                            <option value="past">Past</option>
                        </select>
                    </div>
                </div>

                {/* Bookings Grid */}
                <div style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '16px',
                    padding: '24px',
                    border: '1px solid rgba(34, 139, 34, 0.1)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
                }}>
                    {filteredBookings.length === 0 ? (
                        <div style={{
                            textAlign: 'center',
                            padding: '60px 20px',
                            color: '#666'
                        }}>
                            <Users size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
                            <h3 style={{ marginBottom: '8px', color: '#333' }}>No bookings found</h3>
                            <p>No session bookings match your current filters.</p>
                        </div>
                    ) : (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
                            gap: '20px'
                        }}>
                            {filteredBookings.map((booking) => (
                                <div
                                    key={booking.id}
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.8)',
                                        borderRadius: '12px',
                                        padding: '20px',
                                        border: '1px solid rgba(34, 139, 34, 0.1)',
                                        transition: 'all 0.2s',
                                        cursor: 'pointer',
                                        borderLeft: `4px solid ${booking.status === 'approved' ? '#22c55e' :
                                            booking.status === 'pending' ? '#eab308' :
                                                booking.status === 'completed' ? '#3b82f6' : '#ef4444'
                                            }`
                                    }}
                                    onClick={(e) => handleCardClick(booking, e)}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.boxShadow = 'none';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                            <span style={{
                                                padding: '4px 8px',
                                                borderRadius: '4px',
                                                fontSize: '11px',
                                                fontWeight: '600',
                                                textTransform: 'uppercase',
                                                background: sessionTypes.find(t => t.value === booking.type)?.color.includes('blue') ? '#dbeafe' :
                                                    sessionTypes.find(t => t.value === booking.type)?.color.includes('green') ? '#dcfce7' :
                                                        sessionTypes.find(t => t.value === booking.type)?.color.includes('purple') ? '#f3e8ff' :
                                                            sessionTypes.find(t => t.value === booking.type)?.color.includes('orange') ? '#fed7aa' :
                                                                sessionTypes.find(t => t.value === booking.type)?.color.includes('cyan') ? '#cffafe' : '#f3f4f6',
                                                color: sessionTypes.find(t => t.value === booking.type)?.color.includes('blue') ? '#1e40af' :
                                                    sessionTypes.find(t => t.value === booking.type)?.color.includes('green') ? '#166534' :
                                                        sessionTypes.find(t => t.value === booking.type)?.color.includes('purple') ? '#7c3aed' :
                                                            sessionTypes.find(t => t.value === booking.type)?.color.includes('orange') ? '#ea580c' :
                                                                sessionTypes.find(t => t.value === booking.type)?.color.includes('cyan') ? '#0891b2' : '#374151'
                                            }}>
                                                {booking.type.replace('-', ' ')}
                                            </span>
                                        </div>
                                        <span style={{
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            fontSize: '11px',
                                            fontWeight: '600',
                                            border: '1px solid',
                                            textTransform: 'uppercase',
                                            background: booking.status === 'pending' ? '#fef3c7' :
                                                booking.status === 'approved' ? '#dcfce7' :
                                                    booking.status === 'rejected' ? '#fecaca' :
                                                        booking.status === 'completed' ? '#dbeafe' : '#f3f4f6',
                                            color: booking.status === 'pending' ? '#92400e' :
                                                booking.status === 'approved' ? '#166534' :
                                                    booking.status === 'rejected' ? '#dc2626' :
                                                        booking.status === 'completed' ? '#1e40af' : '#374151',
                                            borderColor: booking.status === 'pending' ? '#fbbf24' :
                                                booking.status === 'approved' ? '#22c55e' :
                                                    booking.status === 'rejected' ? '#ef4444' :
                                                        booking.status === 'completed' ? '#3b82f6' : '#6b7280'
                                        }}>
                                            {booking.status}
                                        </span>
                                    </div>

                                    <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                                        {booking.title}
                                    </h3>
                                    <p style={{ color: '#666', fontSize: '14px', marginBottom: '12px', lineHeight: '1.4' }}>
                                        {booking.description.length > 100
                                            ? `${booking.description.substring(0, 100)}...`
                                            : booking.description}
                                    </p>

                                    <div style={{ marginBottom: '12px', fontSize: '12px', color: '#666' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                                            <Calendar size={12} />
                                            <span>{formatDate(booking.date)} • {formatTime(booking.startTime)} - {formatTime(booking.endTime)}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                                            <MapPin size={12} />
                                            <span>{booking.location} - {booking.room}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <Users size={12} />
                                            <span>{booking.attendees}/{booking.maxAttendees} attendees</span>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#666' }}>
                                        <div style={{ fontWeight: '500' }}>
                                            Booked by {booking.bookedBy}
                                        </div>
                                        <div style={{ fontSize: '11px' }}>
                                            {booking.duration} minutes
                                        </div>
                                    </div>

                                    {booking.status === 'pending' && (
                                        <div style={{ marginTop: '12px', padding: '8px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '6px' }}>
                                            <div style={{ fontSize: '12px', color: '#92400e', fontWeight: '600' }}>
                                                ⚠️ Awaiting Approval
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Booking Detail Modal */}
                {selectedBooking && (
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
                    }} onClick={handleModalClose}>
                        <div style={{
                            background: 'white',
                            borderRadius: '16px',
                            maxWidth: '700px',
                            width: '100%',
                            maxHeight: '90vh',
                            overflow: 'hidden',
                            position: 'relative'
                        }} onClick={(e) => e.stopPropagation()}>
                            <div style={{
                                padding: '24px',
                                borderBottom: '1px solid #eee',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start'
                            }}>
                                <div>
                                    <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>
                                        {selectedBooking.title}
                                    </h2>
                                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                        <span style={{
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            fontSize: '11px',
                                            fontWeight: '600',
                                            textTransform: 'uppercase',
                                            background: sessionTypes.find(t => t.value === selectedBooking.type)?.color.includes('blue') ? '#dbeafe' :
                                                sessionTypes.find(t => t.value === selectedBooking.type)?.color.includes('green') ? '#dcfce7' :
                                                    sessionTypes.find(t => t.value === selectedBooking.type)?.color.includes('purple') ? '#f3e8ff' :
                                                        sessionTypes.find(t => t.value === selectedBooking.type)?.color.includes('orange') ? '#fed7aa' :
                                                            sessionTypes.find(t => t.value === selectedBooking.type)?.color.includes('cyan') ? '#cffafe' : '#f3f4f6',
                                            color: sessionTypes.find(t => t.value === selectedBooking.type)?.color.includes('blue') ? '#1e40af' :
                                                sessionTypes.find(t => t.value === selectedBooking.type)?.color.includes('green') ? '#166534' :
                                                    sessionTypes.find(t => t.value === selectedBooking.type)?.color.includes('purple') ? '#7c3aed' :
                                                        sessionTypes.find(t => t.value === selectedBooking.type)?.color.includes('orange') ? '#ea580c' :
                                                            sessionTypes.find(t => t.value === selectedBooking.type)?.color.includes('cyan') ? '#0891b2' : '#374151'
                                        }}>
                                            {selectedBooking.type.replace('-', ' ')}
                                        </span>
                                        <span style={{
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            fontSize: '11px',
                                            fontWeight: '600',
                                            border: '1px solid',
                                            textTransform: 'uppercase',
                                            background: selectedBooking.status === 'pending' ? '#fef3c7' :
                                                selectedBooking.status === 'approved' ? '#dcfce7' :
                                                    selectedBooking.status === 'rejected' ? '#fecaca' :
                                                        selectedBooking.status === 'completed' ? '#dbeafe' : '#f3f4f6',
                                            color: selectedBooking.status === 'pending' ? '#92400e' :
                                                selectedBooking.status === 'approved' ? '#166534' :
                                                    selectedBooking.status === 'rejected' ? '#dc2626' :
                                                        selectedBooking.status === 'completed' ? '#1e40af' : '#374151',
                                            borderColor: selectedBooking.status === 'pending' ? '#fbbf24' :
                                                selectedBooking.status === 'approved' ? '#22c55e' :
                                                    selectedBooking.status === 'rejected' ? '#ef4444' :
                                                        selectedBooking.status === 'completed' ? '#3b82f6' : '#6b7280'
                                        }}>
                                            {selectedBooking.status}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={handleModalClose}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        padding: '8px',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        color: '#666'
                                    }}
                                >
                                    <XCircle size={20} />
                                </button>
                            </div>

                            <div style={{ padding: '24px', maxHeight: '60vh', overflowY: 'auto' }}>
                                <div style={{ marginBottom: '20px' }}>
                                    <h4 style={{ fontWeight: '600', marginBottom: '8px' }}>Description</h4>
                                    <p style={{ color: '#666', lineHeight: '1.5' }}>{selectedBooking.description}</p>
                                </div>

                                <div style={{ marginBottom: '20px' }}>
                                    <h4 style={{ fontWeight: '600', marginBottom: '12px' }}>Session Details</h4>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                        <div>
                                            <div style={{ fontSize: '12px', color: '#666' }}>Date & Time</div>
                                            <div style={{ fontWeight: '500' }}>
                                                {formatDate(selectedBooking.date)}<br />
                                                {formatTime(selectedBooking.startTime)} - {formatTime(selectedBooking.endTime)}
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '12px', color: '#666' }}>Duration</div>
                                            <div style={{ fontWeight: '500' }}>{selectedBooking.duration} minutes</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '12px', color: '#666' }}>Location</div>
                                            <div style={{ fontWeight: '500' }}>{selectedBooking.location} - {selectedBooking.room}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '12px', color: '#666' }}>Attendees</div>
                                            <div style={{ fontWeight: '500' }}>{selectedBooking.attendees}/{selectedBooking.maxAttendees}</div>
                                        </div>
                                    </div>
                                </div>

                                {selectedBooking.requirements && selectedBooking.requirements.length > 0 && (
                                    <div style={{ marginBottom: '20px' }}>
                                        <h4 style={{ fontWeight: '600', marginBottom: '8px' }}>Requirements</h4>
                                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                            {selectedBooking.requirements.map(req => (
                                                <span key={req} style={{
                                                    padding: '4px 8px',
                                                    background: 'rgba(34, 139, 34, 0.1)',
                                                    color: '#228B22',
                                                    borderRadius: '4px',
                                                    fontSize: '12px',
                                                    fontWeight: '500'
                                                }}>
                                                    {req}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div style={{ marginBottom: '20px' }}>
                                    <h4 style={{ fontWeight: '600', marginBottom: '12px' }}>Booking Information</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <User size={16} style={{ color: '#32CD32' }} />
                                            <span>{selectedBooking.bookedBy}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <Mail size={16} style={{ color: '#32CD32' }} />
                                            <span>{selectedBooking.bookerEmail}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <Phone size={16} style={{ color: '#32CD32' }} />
                                            <span>{selectedBooking.bookerPhone}</span>
                                        </div>
                                        <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                                            Booked on {formatDate(selectedBooking.bookingDate)}
                                        </div>
                                    </div>
                                </div>

                                {selectedBooking.staffNotes && (
                                    <div style={{ marginBottom: '20px' }}>
                                        <h4 style={{ fontWeight: '600', marginBottom: '8px' }}>Staff Notes</h4>
                                        <div style={{
                                            padding: '12px',
                                            background: 'rgba(34, 139, 34, 0.1)',
                                            borderRadius: '8px',
                                            fontSize: '14px',
                                            color: '#666'
                                        }}>
                                            {selectedBooking.staffNotes}
                                        </div>
                                        {selectedBooking.approvedBy && (
                                            <div style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
                                                {selectedBooking.status === 'approved' ? 'Approved' : 'Reviewed'} by {selectedBooking.approvedBy} on {formatDate(selectedBooking.approvalDate!)}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {selectedBooking.status === 'pending' && (
                                    <div style={{ marginBottom: '20px' }}>
                                        <h4 style={{ fontWeight: '600', marginBottom: '8px' }}>Review Notes</h4>
                                        <textarea
                                            value={staffNotes}
                                            onChange={(e) => setStaffNotes(e.target.value)}
                                            placeholder="Add notes about the booking approval/rejection..."
                                            style={{
                                                width: '100%',
                                                padding: '12px',
                                                border: '1px solid #ddd',
                                                borderRadius: '8px',
                                                fontSize: '14px',
                                                minHeight: '80px',
                                                resize: 'vertical',
                                                fontFamily: 'inherit'
                                            }}
                                        />
                                    </div>
                                )}
                            </div>

                            {selectedBooking.status === 'pending' && (
                                <div style={{
                                    padding: '24px',
                                    borderTop: '1px solid #eee',
                                    display: 'flex',
                                    gap: '12px',
                                    justifyContent: 'flex-end'
                                }}>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            updateBookingStatus(selectedBooking.id, 'rejected');
                                        }}
                                        disabled={isUpdating}
                                        style={{
                                            padding: '8px 16px',
                                            background: '#ef4444',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '8px',
                                            cursor: isUpdating ? 'not-allowed' : 'pointer',
                                            fontWeight: '500',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            opacity: isUpdating ? 0.7 : 1
                                        }}
                                    >
                                        <XCircle size={16} />
                                        Reject
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            updateBookingStatus(selectedBooking.id, 'approved');
                                        }}
                                        disabled={isUpdating}
                                        style={{
                                            padding: '8px 16px',
                                            background: 'linear-gradient(135deg, #32CD32, #228B22)',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '8px',
                                            cursor: isUpdating ? 'not-allowed' : 'pointer',
                                            fontWeight: '500',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            opacity: isUpdating ? 0.7 : 1
                                        }}
                                    >
                                        {isUpdating && (
                                            <div style={{
                                                width: '16px',
                                                height: '16px',
                                                border: '2px solid rgba(255, 255, 255, 0.3)',
                                                borderRadius: '50%',
                                                borderTopColor: 'white',
                                                animation: 'spin 1s ease-in-out infinite'
                                            }} />
                                        )}
                                        <CheckCircle size={16} />
                                        Approve
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Add spinning animation */}
                <style>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    
                    @media (max-width: 768px) {
                        main {
                            margin-left: 0 !important;
                            padding: 16px !important;
                        }
                    }
                `}</style>
            </main>
        </>
    );
}

export default StaffSessionBookingsPage;
