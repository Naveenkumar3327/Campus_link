// src/components/pages/student/events/index.tsx
import React, { useState, useEffect } from 'react';
import StudentNavigation from '../student/navigationbar';
import {
    CalendarDays,
    MapPin,
    Clock,
    Users,
    Star,
    Filter,
    Search,
    Plus,
    Calendar,
    User,
    Award,
    Ticket,
    Heart,
    Share2,
    Eye
} from 'lucide-react';

interface Event {
    id: string;
    title: string;
    description: string;
    category: 'academic' | 'cultural' | 'sports' | 'technical' | 'social';
    date: string;
    time: string;
    venue: string;
    organizer: string;
    maxParticipants: number;
    currentParticipants: number;
    isRegistered: boolean;
    registrationDeadline: string;
    image?: string;
    tags: string[];
    isBookmarked: boolean;
    likes: number;
    views: number;
}

function EventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [currentView, setCurrentView] = useState<'all' | 'registered' | 'bookmarked'>('all');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Load events from localStorage or set default events
        const savedEvents = localStorage.getItem('campusEvents');
        if (savedEvents) {
            setEvents(JSON.parse(savedEvents));
        } else {
            const defaultEvents: Event[] = [
                {
                    id: 'EVT001',
                    title: 'Annual Tech Fest 2025',
                    description: 'Join us for the biggest technical event of the year featuring coding competitions, hackathons, tech talks, and exhibitions.',
                    category: 'technical',
                    date: '2025-02-15',
                    time: '09:00 AM',
                    venue: 'Main Auditorium',
                    organizer: 'Tech Club',
                    maxParticipants: 500,
                    currentParticipants: 324,
                    isRegistered: true,
                    registrationDeadline: '2025-02-10',
                    tags: ['coding', 'hackathon', 'technology', 'innovation'],
                    isBookmarked: true,
                    likes: 156,
                    views: 1234
                },
                {
                    id: 'EVT002',
                    title: 'Cultural Night: Expressions 2025',
                    description: 'An evening of music, dance, drama, and cultural performances by students from different departments.',
                    category: 'cultural',
                    date: '2025-02-08',
                    time: '06:00 PM',
                    venue: 'Open Air Theatre',
                    organizer: 'Cultural Committee',
                    maxParticipants: 300,
                    currentParticipants: 189,
                    isRegistered: false,
                    registrationDeadline: '2025-02-05',
                    tags: ['music', 'dance', 'drama', 'cultural'],
                    isBookmarked: false,
                    likes: 98,
                    views: 567
                },
                {
                    id: 'EVT003',
                    title: 'Inter-College Sports Meet',
                    description: 'Annual sports competition featuring cricket, football, basketball, badminton, and athletics.',
                    category: 'sports',
                    date: '2025-02-20',
                    time: '08:00 AM',
                    venue: 'Sports Complex',
                    organizer: 'Sports Department',
                    maxParticipants: 200,
                    currentParticipants: 145,
                    isRegistered: true,
                    registrationDeadline: '2025-02-15',
                    tags: ['sports', 'competition', 'athletics', 'teamwork'],
                    isBookmarked: true,
                    likes: 203,
                    views: 890
                },
                {
                    id: 'EVT004',
                    title: 'Career Guidance Workshop',
                    description: 'Expert guidance on career opportunities, resume building, interview skills, and industry insights.',
                    category: 'academic',
                    date: '2025-02-12',
                    time: '10:00 AM',
                    venue: 'Seminar Hall',
                    organizer: 'Placement Cell',
                    maxParticipants: 150,
                    currentParticipants: 78,
                    isRegistered: false,
                    registrationDeadline: '2025-02-10',
                    tags: ['career', 'placement', 'resume', 'interview'],
                    isBookmarked: false,
                    likes: 67,
                    views: 234
                },
                {
                    id: 'EVT005',
                    title: 'Photography Contest: Campus Moments',
                    description: 'Capture the beauty of campus life through your lens. Multiple categories and exciting prizes.',
                    category: 'cultural',
                    date: '2025-02-25',
                    time: '02:00 PM',
                    venue: 'Art Gallery',
                    organizer: 'Photography Club',
                    maxParticipants: 100,
                    currentParticipants: 45,
                    isRegistered: false,
                    registrationDeadline: '2025-02-20',
                    tags: ['photography', 'contest', 'creativity', 'art'],
                    isBookmarked: false,
                    likes: 89,
                    views: 456
                }
            ];

            setEvents(defaultEvents);
            localStorage.setItem('campusEvents', JSON.stringify(defaultEvents));
        }
    }, []);

    const categories = [
        { value: 'academic', label: 'Academic', color: 'bg-blue-100 text-blue-800 border-blue-200' },
        { value: 'cultural', label: 'Cultural', color: 'bg-purple-100 text-purple-800 border-purple-200' },
        { value: 'sports', label: 'Sports', color: 'bg-green-100 text-green-800 border-green-200' },
        { value: 'technical', label: 'Technical', color: 'bg-orange-100 text-orange-800 border-orange-200' },
        { value: 'social', label: 'Social', color: 'bg-pink-100 text-pink-800 border-pink-200' }
    ];

    const filteredEvents = events.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
        const matchesView = currentView === 'all' ||
            (currentView === 'registered' && event.isRegistered) ||
            (currentView === 'bookmarked' && event.isBookmarked);

        return matchesSearch && matchesCategory && matchesView;
    });

    const registerForEvent = (eventId: string) => {
        const updatedEvents = events.map(event => {
            if (event.id === eventId && !event.isRegistered && event.currentParticipants < event.maxParticipants) {
                return {
                    ...event,
                    isRegistered: true,
                    currentParticipants: event.currentParticipants + 1
                };
            }
            return event;
        });

        setEvents(updatedEvents);
        localStorage.setItem('campusEvents', JSON.stringify(updatedEvents));
    };

    const toggleBookmark = (eventId: string) => {
        const updatedEvents = events.map(event => {
            if (event.id === eventId) {
                return { ...event, isBookmarked: !event.isBookmarked };
            }
            return event;
        });

        setEvents(updatedEvents);
        localStorage.setItem('campusEvents', JSON.stringify(updatedEvents));
    };

    const getCategoryColor = (category: string) => {
        const cat = categories.find(c => c.value === category);
        return cat?.color || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const registeredCount = events.filter(e => e.isRegistered).length;
    const bookmarkedCount = events.filter(e => e.isBookmarked).length;

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
                                <CalendarDays size={24} />
                            </div>
                            Campus Events
                        </h1>

                        <div style={{ display: 'flex', background: '#FFF5E0', borderRadius: '8px', padding: '4px' }}>
                            <button
                                style={{
                                    padding: '8px 16px',
                                    border: 'none',
                                    background: currentView === 'all' ? 'linear-gradient(135deg, #FF6969, #BB2525)' : 'none',
                                    color: currentView === 'all' ? 'white' : '#BB2525',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontWeight: '500',
                                    transition: 'all 0.2s'
                                }}
                                onClick={() => setCurrentView('all')}
                            >
                                All Events
                            </button>
                            <button
                                style={{
                                    padding: '8px 16px',
                                    border: 'none',
                                    background: currentView === 'registered' ? 'linear-gradient(135deg, #FF6969, #BB2525)' : 'none',
                                    color: currentView === 'registered' ? 'white' : '#BB2525',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontWeight: '500',
                                    transition: 'all 0.2s'
                                }}
                                onClick={() => setCurrentView('registered')}
                            >
                                Registered ({registeredCount})
                            </button>
                            <button
                                style={{
                                    padding: '8px 16px',
                                    border: 'none',
                                    background: currentView === 'bookmarked' ? 'linear-gradient(135deg, #FF6969, #BB2525)' : 'none',
                                    color: currentView === 'bookmarked' ? 'white' : '#BB2525',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontWeight: '500',
                                    transition: 'all 0.2s'
                                }}
                                onClick={() => setCurrentView('bookmarked')}
                            >
                                Bookmarked ({bookmarkedCount})
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
                            <CalendarDays size={16} />
                            <span>{events.length} Total Events</span>
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
                            <Ticket size={16} />
                            <span>{registeredCount} Registered</span>
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
                            <Heart size={16} />
                            <span>{bookmarkedCount} Bookmarked</span>
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
                            placeholder="Search events..."
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
                    </div>
                </div>

                {/* Events Grid */}
                <div style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '16px',
                    padding: '24px',
                    border: '1px solid rgba(255, 105, 105, 0.1)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
                }}>
                    {filteredEvents.length === 0 ? (
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
                                <CalendarDays size={32} />
                            </div>
                            <h3>No Events Found</h3>
                            <p>Try adjusting your search criteria or filters.</p>
                        </div>
                    ) : (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                            gap: '20px'
                        }}>
                            {filteredEvents.map((event) => (
                                <div
                                    key={event.id}
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.8)',
                                        borderRadius: '12px',
                                        padding: '20px',
                                        border: '1px solid rgba(255, 105, 105, 0.1)',
                                        transition: 'all 0.2s',
                                        cursor: 'pointer',
                                        position: 'relative',
                                        borderLeft: event.isRegistered ? '4px solid #22c55e' : '1px solid rgba(255, 105, 105, 0.1)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.boxShadow = 'none';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    {/* Event Header */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                        <span style={{
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            fontSize: '11px',
                                            fontWeight: '600',
                                            border: '1px solid',
                                            textTransform: 'uppercase'
                                        }} className={getCategoryColor(event.category)}>
                                            {event.category}
                                        </span>

                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleBookmark(event.id);
                                                }}
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    padding: '6px',
                                                    borderRadius: '6px',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s',
                                                    color: event.isBookmarked ? '#ef4444' : '#666'
                                                }}
                                            >
                                                <Heart size={16} />
                                            </button>
                                            <button
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    padding: '6px',
                                                    borderRadius: '6px',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s',
                                                    color: '#666'
                                                }}
                                            >
                                                <Share2 size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    <h3 style={{
                                        fontSize: '18px',
                                        fontWeight: '600',
                                        color: '#333',
                                        marginBottom: '8px',
                                        lineHeight: '1.3'
                                    }}>
                                        {event.title}
                                    </h3>

                                    <p style={{
                                        color: '#666',
                                        fontSize: '14px',
                                        lineHeight: '1.5',
                                        marginBottom: '16px',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden'
                                    }}>
                                        {event.description}
                                    </p>

                                    {/* Event Details */}
                                    <div style={{ marginBottom: '16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '12px', color: '#666' }}>
                                            <Calendar size={12} />
                                            <span>{formatDate(event.date)}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '12px', color: '#666' }}>
                                            <Clock size={12} />
                                            <span>{event.time}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '12px', color: '#666' }}>
                                            <MapPin size={12} />
                                            <span>{event.venue}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#666' }}>
                                            <User size={12} />
                                            <span>By {event.organizer}</span>
                                        </div>
                                    </div>

                                    {/* Participants Progress */}
                                    <div style={{ marginBottom: '16px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '12px', color: '#666' }}>
                                            <span>Participants</span>
                                            <span>{event.currentParticipants}/{event.maxParticipants}</span>
                                        </div>
                                        <div style={{ width: '100%', height: '6px', background: '#e5e7eb', borderRadius: '3px', overflow: 'hidden' }}>
                                            <div style={{
                                                width: `${(event.currentParticipants / event.maxParticipants) * 100}%`,
                                                height: '100%',
                                                background: 'linear-gradient(135deg, #FF6969, #BB2525)',
                                                transition: 'width 0.3s ease'
                                            }} />
                                        </div>
                                    </div>

                                    {/* Event Footer */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: '#888' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <Heart size={12} />
                                                <span>{event.likes}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <Eye size={12} />
                                                <span>{event.views}</span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (!event.isRegistered) {
                                                    registerForEvent(event.id);
                                                }
                                            }}
                                            disabled={event.isRegistered || event.currentParticipants >= event.maxParticipants}
                                            style={{
                                                padding: '8px 16px',
                                                border: 'none',
                                                borderRadius: '6px',
                                                fontWeight: '500',
                                                cursor: event.isRegistered || event.currentParticipants >= event.maxParticipants ? 'not-allowed' : 'pointer',
                                                fontSize: '12px',
                                                background: event.isRegistered ? '#22c55e' :
                                                    event.currentParticipants >= event.maxParticipants ? '#6b7280' :
                                                        'linear-gradient(135deg, #FF6969, #BB2525)',
                                                color: 'white',
                                                opacity: event.currentParticipants >= event.maxParticipants ? 0.7 : 1,
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            {event.isRegistered ? 'Registered' :
                                                event.currentParticipants >= event.maxParticipants ? 'Full' :
                                                    'Register'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}

export default EventsPage;
