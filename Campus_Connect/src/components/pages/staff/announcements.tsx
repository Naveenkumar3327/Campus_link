// src/components/pages/staff/announcements/index.tsx
import React, { useState, useEffect } from 'react';
import StaffNavigation from '../staff/navigation';
import {
    Bell,
    Plus,
    Edit3,
    Trash2,
    Eye,
    Send,
    Calendar,
    Users,
    AlertCircle,
    CheckCircle,
    Clock,
    Filter,
    Search,
    Save,
    X
} from 'lucide-react';

interface Announcement {
    id: string;
    title: string;
    content: string;
    category: 'general' | 'academic' | 'exam' | 'event' | 'urgent';
    targetAudience: 'all' | 'students' | 'faculty' | 'department';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    createdBy: string;
    createdDate: string;
    publishDate: string;
    expiryDate: string;
    status: 'draft' | 'published' | 'expired';
    views: number;
    isActive: boolean;
}

function StaffAnnouncementsPage() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [currentView, setCurrentView] = useState<'list' | 'create' | 'edit'>('list');
    const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: 'general' as 'general' | 'academic' | 'exam' | 'event' | 'urgent',
        targetAudience: 'all' as 'all' | 'students' | 'faculty' | 'department',
        priority: 'medium' as 'low' | 'medium' | 'high' | 'urgent',
        publishDate: '',
        expiryDate: ''
    });

    useEffect(() => {
        const savedAnnouncements = localStorage.getItem('staffAnnouncements');
        if (savedAnnouncements) {
            setAnnouncements(JSON.parse(savedAnnouncements));
        } else {
            const defaultAnnouncements: Announcement[] = [
                {
                    id: 'ANN001',
                    title: 'Mid-Semester Examination Schedule',
                    content: 'The mid-semester examinations will be conducted from March 15-22, 2025. Students are advised to check their individual timetables and prepare accordingly. All exams will be held in the main examination hall.',
                    category: 'exam',
                    targetAudience: 'students',
                    priority: 'high',
                    createdBy: 'Dr. Jane Smith',
                    createdDate: '2025-01-26T10:00:00Z',
                    publishDate: '2025-01-26T12:00:00Z',
                    expiryDate: '2025-03-25T23:59:59Z',
                    status: 'published',
                    views: 456,
                    isActive: true
                },
                {
                    id: 'ANN002',
                    title: 'Library Extended Hours During Exams',
                    content: 'The central library will remain open 24/7 during the examination period (March 10-25). Additional study spaces have been arranged in the conference halls. Students can access these facilities with their ID cards.',
                    category: 'academic',
                    targetAudience: 'students',
                    priority: 'medium',
                    createdBy: 'Dr. Jane Smith',
                    createdDate: '2025-01-25T14:30:00Z',
                    publishDate: '2025-01-25T16:00:00Z',
                    expiryDate: '2025-03-26T23:59:59Z',
                    status: 'published',
                    views: 234,
                    isActive: true
                },
                {
                    id: 'ANN003',
                    title: 'Campus WiFi Maintenance',
                    content: 'The campus WiFi network will undergo scheduled maintenance on January 28, 2025, from 2:00 AM to 6:00 AM. Internet services may be intermittent during this period. We apologize for any inconvenience.',
                    category: 'general',
                    targetAudience: 'all',
                    priority: 'medium',
                    createdBy: 'Dr. Jane Smith',
                    createdDate: '2025-01-24T09:15:00Z',
                    publishDate: '2025-01-24T10:00:00Z',
                    expiryDate: '2025-01-29T06:00:00Z',
                    status: 'published',
                    views: 189,
                    isActive: true
                }
            ];

            setAnnouncements(defaultAnnouncements);
            localStorage.setItem('staffAnnouncements', JSON.stringify(defaultAnnouncements));
        }
    }, []);

    const categories = [
        { value: 'general', label: 'General', color: 'bg-gray-100 text-gray-800 border-gray-200' },
        { value: 'academic', label: 'Academic', color: 'bg-blue-100 text-blue-800 border-blue-200' },
        { value: 'exam', label: 'Examination', color: 'bg-red-100 text-red-800 border-red-200' },
        { value: 'event', label: 'Event', color: 'bg-purple-100 text-purple-800 border-purple-200' },
        { value: 'urgent', label: 'Urgent', color: 'bg-orange-100 text-orange-800 border-orange-200' }
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            const newAnnouncement: Announcement = {
                id: `ANN${String(announcements.length + 1).padStart(3, '0')}`,
                ...formData,
                createdBy: 'Dr. Jane Smith',
                createdDate: new Date().toISOString(),
                publishDate: formData.publishDate || new Date().toISOString(),
                status: 'published',
                views: 0,
                isActive: true
            };

            const updatedAnnouncements = [newAnnouncement, ...announcements];
            setAnnouncements(updatedAnnouncements);
            localStorage.setItem('staffAnnouncements', JSON.stringify(updatedAnnouncements));

            setFormData({
                title: '',
                content: '',
                category: 'general',
                targetAudience: 'all',
                priority: 'medium',
                publishDate: '',
                expiryDate: ''
            });

            setCurrentView('list');
            alert('Announcement published successfully!');
        } catch (error) {
            alert('Failed to publish announcement. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const deleteAnnouncement = (id: string) => {
        if (window.confirm('Are you sure you want to delete this announcement?')) {
            const updatedAnnouncements = announcements.filter(ann => ann.id !== id);
            setAnnouncements(updatedAnnouncements);
            localStorage.setItem('staffAnnouncements', JSON.stringify(updatedAnnouncements));
        }
    };

    const getCategoryColor = (category: string) => {
        const cat = categories.find(c => c.value === category);
        return cat?.color || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'urgent':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'high':
                return 'bg-orange-100 text-orange-800 border-orange-200';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'low':
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

    const filteredAnnouncements = announcements.filter(ann => {
        const matchesSearch = ann.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ann.content.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || ann.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

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
                                <Bell size={24} />
                            </div>
                            Announcements Management
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
                                    Cancel
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
                                    Create Announcement
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
                            <Bell size={16} />
                            <span>{announcements.length} Total</span>
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
                            <span>{announcements.filter(a => a.status === 'published').length} Published</span>
                        </div>
                    </div>
                </div>

                {/* Content */}
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
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                <input
                                    type="text"
                                    placeholder="Search announcements..."
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

                        {/* Announcements List */}
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '16px',
                            padding: '24px',
                            border: '1px solid rgba(34, 139, 34, 0.1)',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
                        }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {filteredAnnouncements.map((announcement) => (
                                    <div
                                        key={announcement.id}
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.8)',
                                            borderRadius: '12px',
                                            padding: '20px',
                                            border: '1px solid rgba(34, 139, 34, 0.1)',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                                <span style={{
                                                    padding: '4px 8px',
                                                    borderRadius: '4px',
                                                    fontSize: '11px',
                                                    fontWeight: '600',
                                                    border: '1px solid',
                                                    textTransform: 'uppercase'
                                                }} className={getCategoryColor(announcement.category)}>
                                                    {announcement.category}
                                                </span>
                                                <span style={{
                                                    padding: '4px 8px',
                                                    borderRadius: '4px',
                                                    fontSize: '11px',
                                                    fontWeight: '600',
                                                    border: '1px solid',
                                                    textTransform: 'uppercase'
                                                }} className={getPriorityColor(announcement.priority)}>
                                                    {announcement.priority}
                                                </span>
                                            </div>

                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <button
                                                    style={{
                                                        background: 'none',
                                                        border: 'none',
                                                        padding: '6px',
                                                        borderRadius: '6px',
                                                        cursor: 'pointer',
                                                        color: '#666'
                                                    }}
                                                >
                                                    <Edit3 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => deleteAnnouncement(announcement.id)}
                                                    style={{
                                                        background: 'none',
                                                        border: 'none',
                                                        padding: '6px',
                                                        borderRadius: '6px',
                                                        cursor: 'pointer',
                                                        color: '#ef4444'
                                                    }}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>

                                        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
                                            {announcement.title}
                                        </h3>
                                        <p style={{ color: '#666', marginBottom: '16px', lineHeight: '1.5' }}>
                                            {announcement.content.substring(0, 200)}...
                                        </p>

                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#666' }}>
                                            <div>Published: {formatDate(announcement.publishDate)}</div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    <Eye size={12} />
                                                    {announcement.views}
                                                </span>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    <Users size={12} />
                                                    {announcement.targetAudience}
                                                </span>
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
                            Create New Announcement
                        </h2>

                        <form onSubmit={handleSubmit}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                                <div style={{ gridColumn: 'span 2' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                        Title *
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            fontSize: '14px'
                                        }}
                                        placeholder="Enter announcement title"
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                        Category
                                    </label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
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
                                        Priority
                                    </label>
                                    <select
                                        name="priority"
                                        value={formData.priority}
                                        onChange={handleInputChange}
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            fontSize: '14px'
                                        }}
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                        <option value="urgent">Urgent</option>
                                    </select>
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                        Target Audience
                                    </label>
                                    <select
                                        name="targetAudience"
                                        value={formData.targetAudience}
                                        onChange={handleInputChange}
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            fontSize: '14px'
                                        }}
                                    >
                                        <option value="all">All</option>
                                        <option value="students">Students</option>
                                        <option value="faculty">Faculty</option>
                                        <option value="department">Department</option>
                                    </select>
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                        Expiry Date
                                    </label>
                                    <input
                                        type="datetime-local"
                                        name="expiryDate"
                                        value={formData.expiryDate}
                                        onChange={handleInputChange}
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

                            <div style={{ marginBottom: '24px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                    Content *
                                </label>
                                <textarea
                                    name="content"
                                    value={formData.content}
                                    onChange={handleInputChange}
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
                                    placeholder="Enter announcement content"
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
                                        Publishing...
                                    </>
                                ) : (
                                    <>
                                        <Send size={16} />
                                        Publish Announcement
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

export default StaffAnnouncementsPage;
