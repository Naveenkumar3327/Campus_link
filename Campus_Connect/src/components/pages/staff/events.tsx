// src/components/pages/staff/events/index.tsx
import React, { useState, useEffect } from 'react';
import StaffNavigation from '../staff/navigation';
import {
    CalendarDays,
    Plus,
    Edit3,
    Trash2,
    Eye,
    Users,
    MapPin,
    Calendar,
    Clock,
    Star,
    CheckCircle,
    X,
    Search,
    Filter,
    Save,
    Send,
    Image as ImageIcon,
    Tag,
    AlertCircle
} from 'lucide-react';

interface Event {
    id: string;
    title: string;
    description: string;
    category: 'academic' | 'cultural' | 'sports' | 'technical' | 'social' | 'workshop' | 'competition';
    date: string;
    startTime: string;
    endTime: string;
    venue: string;
    organizer: string;
    maxParticipants: number;
    currentParticipants: number;
    registrationDeadline: string;
    registrationFee: number;
    status: 'draft' | 'published' | 'ongoing' | 'completed' | 'cancelled';
    createdBy: string;
    createdDate: string;
    tags: string[];
    requirements?: string[];
    contactEmail: string;
    contactPhone: string;
    prizes?: string[];
    isPublic: boolean;
}

function StaffEventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [currentView, setCurrentView] = useState<'list' | 'create' | 'edit' | 'view'>('list');
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [categoryFilter, setCategoryFilter] = useState<string>('all');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [eventForm, setEventForm] = useState({
        title: '',
        description: '',
        category: 'academic' as 'academic' | 'cultural' | 'sports' | 'technical' | 'social' | 'workshop' | 'competition',
        date: '',
        startTime: '',
        endTime: '',
        venue: '',
        organizer: '',
        maxParticipants: 50,
        registrationDeadline: '',
        registrationFee: 0,
        contactEmail: '',
        contactPhone: '',
        tags: [] as string[],
        requirements: [] as string[],
        prizes: [] as string[],
        isPublic: true
    });

    useEffect(() => {
        const savedEvents = localStorage.getItem('staffEvents');
        if (savedEvents) {
            setEvents(JSON.parse(savedEvents));
        } else {
            const defaultEvents: Event[] = [
                {
                    id: 'EVT001',
                    title: 'Annual Tech Fest 2025',
                    description: 'Join us for the biggest technical event of the year featuring coding competitions, hackathons, tech talks, workshops, and exhibitions. Connect with industry experts and showcase your skills.',
                    category: 'technical',
                    date: '2025-02-15',
                    startTime: '09:00',
                    endTime: '18:00',
                    venue: 'Main Auditorium & Tech Labs',
                    organizer: 'Tech Club',
                    maxParticipants: 500,
                    currentParticipants: 324,
                    registrationDeadline: '2025-02-10',
                    registrationFee: 200,
                    status: 'published',
                    createdBy: 'Dr. Jane Smith',
                    createdDate: '2025-01-20T10:00:00Z',
                    tags: ['coding', 'hackathon', 'technology', 'innovation', 'competition'],
                    requirements: ['Laptop', 'Student ID', 'Team of 2-4 members'],
                    contactEmail: 'techfest@sece.ac.in',
                    contactPhone: '+91 9876543210',
                    prizes: ['₹50,000 Cash Prize', 'Internship Opportunities', 'Certificates'],
                    isPublic: true
                },
                {
                    id: 'EVT002',
                    title: 'Cultural Night: Expressions 2025',
                    description: 'An evening of music, dance, drama, and cultural performances by students from different departments. Celebrate diversity and showcase your talents.',
                    category: 'cultural',
                    date: '2025-02-08',
                    startTime: '18:00',
                    endTime: '22:00',
                    venue: 'Open Air Theatre',
                    organizer: 'Cultural Committee',
                    maxParticipants: 300,
                    currentParticipants: 189,
                    registrationDeadline: '2025-02-05',
                    registrationFee: 50,
                    status: 'published',
                    createdBy: 'Dr. Jane Smith',
                    createdDate: '2025-01-18T14:30:00Z',
                    tags: ['music', 'dance', 'drama', 'cultural', 'performance'],
                    requirements: ['Performance registration', 'Costume/Props if needed'],
                    contactEmail: 'cultural@sece.ac.in',
                    contactPhone: '+91 9876543211',
                    prizes: ['Best Performance Award', 'Participation Certificates'],
                    isPublic: true
                },
                {
                    id: 'EVT003',
                    title: 'Machine Learning Workshop',
                    description: 'Hands-on workshop on machine learning fundamentals, algorithms, and practical implementations using Python. Perfect for beginners and intermediate learners.',
                    category: 'workshop',
                    date: '2025-01-30',
                    startTime: '10:00',
                    endTime: '16:00',
                    venue: 'Computer Lab A',
                    organizer: 'AI & ML Club',
                    maxParticipants: 40,
                    currentParticipants: 35,
                    registrationDeadline: '2025-01-28',
                    registrationFee: 100,
                    status: 'published',
                    createdBy: 'Dr. Jane Smith',
                    createdDate: '2025-01-15T09:15:00Z',
                    tags: ['machine-learning', 'python', 'ai', 'workshop', 'hands-on'],
                    requirements: ['Basic Python knowledge', 'Laptop with Python installed'],
                    contactEmail: 'aiml@sece.ac.in',
                    contactPhone: '+91 9876543212',
                    isPublic: true
                }
            ];

            setEvents(defaultEvents);
            localStorage.setItem('staffEvents', JSON.stringify(defaultEvents));
        }
    }, []);

    const categories = [
        { value: 'academic', label: 'Academic', color: 'bg-blue-100 text-blue-800' },
        { value: 'cultural', label: 'Cultural', color: 'bg-purple-100 text-purple-800' },
        { value: 'sports', label: 'Sports', color: 'bg-green-100 text-green-800' },
        { value: 'technical', label: 'Technical', color: 'bg-orange-100 text-orange-800' },
        { value: 'social', label: 'Social', color: 'bg-pink-100 text-pink-800' },
        { value: 'workshop', label: 'Workshop', color: 'bg-cyan-100 text-cyan-800' },
        { value: 'competition', label: 'Competition', color: 'bg-red-100 text-red-800' }
    ];

    const handleEventSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            const newEvent: Event = {
                id: `EVT${String(events.length + 1).padStart(3, '0')}`,
                ...eventForm,
                currentParticipants: 0,
                status: 'draft',
                createdBy: 'Dr. Jane Smith',
                createdDate: new Date().toISOString()
            };

            const updatedEvents = [newEvent, ...events];
            setEvents(updatedEvents);
            localStorage.setItem('staffEvents', JSON.stringify(updatedEvents));

            setEventForm({
                title: '',
                description: '',
                category: 'academic',
                date: '',
                startTime: '',
                endTime: '',
                venue: '',
                organizer: '',
                maxParticipants: 50,
                registrationDeadline: '',
                registrationFee: 0,
                contactEmail: '',
                contactPhone: '',
                tags: [],
                requirements: [],
                prizes: [],
                isPublic: true
            });

            setCurrentView('list');
            alert('Event created successfully!');
        } catch (error) {
            alert('Failed to create event. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const updateEventStatus = (eventId: string, newStatus: 'published' | 'cancelled') => {
        const updatedEvents = events.map(event => {
            if (event.id === eventId) {
                return { ...event, status: newStatus };
            }
            return event;
        });

        setEvents(updatedEvents);
        localStorage.setItem('staffEvents', JSON.stringify(updatedEvents));
        alert(`Event ${newStatus} successfully!`);
    };

    const deleteEvent = (eventId: string) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            const updatedEvents = events.filter(event => event.id !== eventId);
            setEvents(updatedEvents);
            localStorage.setItem('staffEvents', JSON.stringify(updatedEvents));
        }
    };

    const getCategoryColor = (category: string) => {
        const cat = categories.find(c => c.value === category);
        return cat?.color || 'bg-gray-100 text-gray-800';
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'draft':
                return 'bg-gray-100 text-gray-800 border-gray-200';
            case 'published':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'ongoing':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'completed':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'cancelled':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
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

    const filteredEvents = events.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
        const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter;
        return matchesSearch && matchesStatus && matchesCategory;
    });

    const publishedCount = events.filter(e => e.status === 'published').length;
    const draftCount = events.filter(e => e.status === 'draft').length;
    const totalParticipants = events.reduce((sum, e) => sum + e.currentParticipants, 0);

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
                                <CalendarDays size={24} />
                            </div>
                            Events Management
                        </h1>

                        <div style={{ display: 'flex', gap: '12px' }}>
                            {currentView !== 'list' && (
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
                                    onClick={() => setCurrentView('list')}
                                >
                                    <X size={16} />
                                    Back to List
                                </button>
                            )}
                            {currentView === 'list' && (
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
                                    onClick={() => setCurrentView('create')}
                                >
                                    <Plus size={16} />
                                    Create Event
                                </button>
                            )}
                        </div>
                    </div>

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
                            <CalendarDays size={16} />
                            <span>{events.length} Total Events</span>
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
                            <span>{publishedCount} Published</span>
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
                            <Users size={16} />
                            <span>{totalParticipants} Total Participants</span>
                        </div>
                    </div>
                </div>

                {/* Content based on current view */}
                {currentView === 'list' && (
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
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                                <input
                                    type="text"
                                    placeholder="Search events..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{
                                        flex: 1,
                                        minWidth: '200px',
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
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                    <option value="ongoing">Ongoing</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                                <select
                                    value={categoryFilter}
                                    onChange={(e) => setCategoryFilter(e.target.value)}
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
                            </div>
                        </div>

                        {/* Events Grid */}
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
                                gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
                                gap: '20px'
                            }}>
                                {filteredEvents.map((event) => (
                                    <div
                                        key={event.id}
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.8)',
                                            borderRadius: '12px',
                                            padding: '20px',
                                            border: '1px solid rgba(34, 139, 34, 0.1)',
                                            transition: 'all 0.2s',
                                            borderLeft: `4px solid ${event.status === 'published' ? '#22c55e' :
                                                event.status === 'draft' ? '#6b7280' :
                                                    event.status === 'ongoing' ? '#3b82f6' : '#ef4444'
                                                }`
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                                <span style={{
                                                    padding: '4px 8px',
                                                    borderRadius: '4px',
                                                    fontSize: '11px',
                                                    fontWeight: '600',
                                                    textTransform: 'uppercase'
                                                }} className={getCategoryColor(event.category)}>
                                                    {event.category}
                                                </span>
                                            </div>
                                            <span style={{
                                                padding: '4px 8px',
                                                borderRadius: '4px',
                                                fontSize: '11px',
                                                fontWeight: '600',
                                                border: '1px solid',
                                                textTransform: 'uppercase'
                                            }} className={getStatusColor(event.status)}>
                                                {event.status}
                                            </span>
                                        </div>

                                        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                                            {event.title}
                                        </h3>
                                        <p style={{ color: '#666', fontSize: '14px', marginBottom: '12px', lineHeight: '1.4' }}>
                                            {event.description.substring(0, 120)}...
                                        </p>

                                        <div style={{ marginBottom: '12px', fontSize: '12px', color: '#666' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                                                <Calendar size={12} />
                                                <span>{formatDate(event.date)}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                                                <Clock size={12} />
                                                <span>{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                <MapPin size={12} />
                                                <span>{event.venue}</span>
                                            </div>
                                        </div>

                                        <div style={{ marginBottom: '16px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '12px', color: '#666' }}>
                                                <span>Participants</span>
                                                <span>{event.currentParticipants}/{event.maxParticipants}</span>
                                            </div>
                                            <div style={{ width: '100%', height: '6px', background: '#e5e7eb', borderRadius: '3px', overflow: 'hidden' }}>
                                                <div style={{
                                                    width: `${(event.currentParticipants / event.maxParticipants) * 100}%`,
                                                    height: '100%',
                                                    background: 'linear-gradient(135deg, #32CD32, #228B22)',
                                                    transition: 'width 0.3s ease'
                                                }} />
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between' }}>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <button
                                                    onClick={() => {
                                                        setSelectedEvent(event);
                                                        setCurrentView('view');
                                                    }}
                                                    style={{
                                                        padding: '6px 12px',
                                                        background: 'rgba(34, 139, 34, 0.1)',
                                                        color: '#228B22',
                                                        border: '1px solid rgba(34, 139, 34, 0.2)',
                                                        borderRadius: '6px',
                                                        cursor: 'pointer',
                                                        fontSize: '12px',
                                                        fontWeight: '500',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '4px'
                                                    }}
                                                >
                                                    <Eye size={12} />
                                                    View
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setSelectedEvent(event);
                                                        setCurrentView('edit');
                                                    }}
                                                    style={{
                                                        padding: '6px 12px',
                                                        background: 'rgba(59, 130, 246, 0.1)',
                                                        color: '#3b82f6',
                                                        border: '1px solid rgba(59, 130, 246, 0.2)',
                                                        borderRadius: '6px',
                                                        cursor: 'pointer',
                                                        fontSize: '12px',
                                                        fontWeight: '500',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '4px'
                                                    }}
                                                >
                                                    <Edit3 size={12} />
                                                    Edit
                                                </button>
                                            </div>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                {event.status === 'draft' && (
                                                    <button
                                                        onClick={() => updateEventStatus(event.id, 'published')}
                                                        style={{
                                                            padding: '6px 12px',
                                                            background: 'rgba(34, 197, 94, 0.1)',
                                                            color: '#22c55e',
                                                            border: '1px solid rgba(34, 197, 94, 0.2)',
                                                            borderRadius: '6px',
                                                            cursor: 'pointer',
                                                            fontSize: '12px',
                                                            fontWeight: '500'
                                                        }}
                                                    >
                                                        Publish
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => deleteEvent(event.id)}
                                                    style={{
                                                        padding: '6px 12px',
                                                        background: 'rgba(239, 68, 68, 0.1)',
                                                        color: '#ef4444',
                                                        border: '1px solid rgba(239, 68, 68, 0.2)',
                                                        borderRadius: '6px',
                                                        cursor: 'pointer',
                                                        fontSize: '12px',
                                                        fontWeight: '500',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '4px'
                                                    }}
                                                >
                                                    <Trash2 size={12} />
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {currentView === 'create' && (
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '16px',
                        padding: '32px',
                        border: '1px solid rgba(34, 139, 34, 0.1)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
                    }}>
                        <h2 style={{ marginBottom: '24px', color: '#333', fontSize: '20px', fontWeight: '600' }}>
                            Create New Event
                        </h2>

                        <form onSubmit={handleEventSubmit}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                                <div style={{ gridColumn: 'span 2' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                        Event Title *
                                    </label>
                                    <input
                                        type="text"
                                        value={eventForm.title}
                                        onChange={(e) => setEventForm(prev => ({ ...prev, title: e.target.value }))}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            fontSize: '14px'
                                        }}
                                        placeholder="Enter event title"
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                        Category *
                                    </label>
                                    <select
                                        value={eventForm.category}
                                        onChange={(e) => setEventForm(prev => ({ ...prev, category: e.target.value as any }))}
                                        required
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
                                        Organizer *
                                    </label>
                                    <input
                                        type="text"
                                        value={eventForm.organizer}
                                        onChange={(e) => setEventForm(prev => ({ ...prev, organizer: e.target.value }))}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            fontSize: '14px'
                                        }}
                                        placeholder="Enter organizer name"
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                        Event Date *
                                    </label>
                                    <input
                                        type="date"
                                        value={eventForm.date}
                                        onChange={(e) => setEventForm(prev => ({ ...prev, date: e.target.value }))}
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

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                        Start Time *
                                    </label>
                                    <input
                                        type="time"
                                        value={eventForm.startTime}
                                        onChange={(e) => setEventForm(prev => ({ ...prev, startTime: e.target.value }))}
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

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                        End Time *
                                    </label>
                                    <input
                                        type="time"
                                        value={eventForm.endTime}
                                        onChange={(e) => setEventForm(prev => ({ ...prev, endTime: e.target.value }))}
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

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                        Venue *
                                    </label>
                                    <input
                                        type="text"
                                        value={eventForm.venue}
                                        onChange={(e) => setEventForm(prev => ({ ...prev, venue: e.target.value }))}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            fontSize: '14px'
                                        }}
                                        placeholder="Enter venue"
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                        Max Participants
                                    </label>
                                    <input
                                        type="number"
                                        value={eventForm.maxParticipants}
                                        onChange={(e) => setEventForm(prev => ({ ...prev, maxParticipants: parseInt(e.target.value) || 0 }))}
                                        min="1"
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            fontSize: '14px'
                                        }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                        Registration Fee (₹)
                                    </label>
                                    <input
                                        type="number"
                                        value={eventForm.registrationFee}
                                        onChange={(e) => setEventForm(prev => ({ ...prev, registrationFee: parseInt(e.target.value) || 0 }))}
                                        min="0"
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            fontSize: '14px'
                                        }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                        Registration Deadline
                                    </label>
                                    <input
                                        type="date"
                                        value={eventForm.registrationDeadline}
                                        onChange={(e) => setEventForm(prev => ({ ...prev, registrationDeadline: e.target.value }))}
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            fontSize: '14px'
                                        }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                        Contact Email *
                                    </label>
                                    <input
                                        type="email"
                                        value={eventForm.contactEmail}
                                        onChange={(e) => setEventForm(prev => ({ ...prev, contactEmail: e.target.value }))}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            fontSize: '14px'
                                        }}
                                        placeholder="contact@example.com"
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                        Contact Phone
                                    </label>
                                    <input
                                        type="tel"
                                        value={eventForm.contactPhone}
                                        onChange={(e) => setEventForm(prev => ({ ...prev, contactPhone: e.target.value }))}
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            fontSize: '14px'
                                        }}
                                        placeholder="+91 9876543210"
                                    />
                                </div>
                            </div>

                            <div style={{ marginBottom: '24px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                    Event Description *
                                </label>
                                <textarea
                                    value={eventForm.description}
                                    onChange={(e) => setEventForm(prev => ({ ...prev, description: e.target.value }))}
                                    required
                                    rows={6}
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        border: '1px solid #ddd',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        resize: 'vertical'
                                    }}
                                    placeholder="Enter detailed event description"
                                />
                            </div>

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
                                        Creating Event...
                                    </>
                                ) : (
                                    <>
                                        <Save size={16} />
                                        Create Event
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                )}
            </main>
        </>
    );
}

export default StaffEventsPage;
