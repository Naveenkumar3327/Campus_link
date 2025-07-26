// src/components/pages/staff/eduexchange/index.tsx
import React, { useState, useEffect } from 'react';
import StaffNavigation from '../staff/navigation';
import {
    BookOpen,
    Eye,
    CheckCircle,
    XCircle,
    AlertTriangle,
    User,
    Calendar,
    Star,
    MessageCircle,
    Download,
    Upload,
    Filter,
    Search,
    FileText,
    Tag,
    Clock
} from 'lucide-react';

interface Resource {
    id: string;
    title: string;
    description: string;
    type: 'notes' | 'assignment' | 'project' | 'presentation' | 'book' | 'other';
    subject: string;
    uploadedBy: string;
    uploaderEmail: string;
    uploadDate: string;
    fileSize: string;
    downloadCount: number;
    rating: number;
    reviews: number;
    status: 'pending' | 'approved' | 'rejected';
    tags: string[];
    verifiedBy?: string;
    verificationDate?: string;
    staffNotes?: string;
}

function StaffEduExchangePage() {
    const [resources, setResources] = useState<Resource[]>([]);
    const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [typeFilter, setTypeFilter] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [staffNotes, setStaffNotes] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        const savedResources = localStorage.getItem('staffEduExchange');
        if (savedResources) {
            setResources(JSON.parse(savedResources));
        } else {
            const defaultResources: Resource[] = [
                {
                    id: 'EDU001',
                    title: 'Data Structures Complete Notes',
                    description: 'Comprehensive notes covering all topics in Data Structures including Arrays, Linked Lists, Stacks, Queues, Trees, and Graphs with examples and algorithms.',
                    type: 'notes',
                    subject: 'Data Structures',
                    uploadedBy: 'John Smith',
                    uploaderEmail: 'john.smith@sece.ac.in',
                    uploadDate: '2025-01-25T14:30:00Z',
                    fileSize: '2.5 MB',
                    downloadCount: 156,
                    rating: 4.8,
                    reviews: 23,
                    status: 'pending',
                    tags: ['data-structures', 'algorithms', 'computer-science', 'notes']
                },
                {
                    id: 'EDU002',
                    title: 'Database Management System Project',
                    description: 'A complete library management system project built using MySQL and PHP. Includes source code, documentation, and setup instructions.',
                    type: 'project',
                    subject: 'Database Management',
                    uploadedBy: 'Priya Sharma',
                    uploaderEmail: 'priya.sharma@sece.ac.in',
                    uploadDate: '2025-01-24T10:15:00Z',
                    fileSize: '15.2 MB',
                    downloadCount: 89,
                    rating: 4.6,
                    reviews: 18,
                    status: 'approved',
                    tags: ['database', 'mysql', 'php', 'project', 'library-management'],
                    verifiedBy: 'Dr. Jane Smith',
                    verificationDate: '2025-01-24T16:00:00Z',
                    staffNotes: 'Well-structured project with good documentation'
                },
                {
                    id: 'EDU003',
                    title: 'Operating Systems Assignment Solutions',
                    description: 'Solutions to all assignment questions from OS course including process scheduling, memory management, and file systems.',
                    type: 'assignment',
                    subject: 'Operating Systems',
                    uploadedBy: 'Rahul Kumar',
                    uploaderEmail: 'rahul.kumar@sece.ac.in',
                    uploadDate: '2025-01-26T08:45:00Z',
                    fileSize: '1.8 MB',
                    downloadCount: 234,
                    rating: 4.2,
                    reviews: 31,
                    status: 'rejected',
                    tags: ['operating-systems', 'assignments', 'solutions'],
                    verifiedBy: 'Dr. Jane Smith',
                    verificationDate: '2025-01-26T12:00:00Z',
                    staffNotes: 'Contains direct answers without explanations. Please add detailed explanations for approval.'
                },
                {
                    id: 'EDU004',
                    title: 'Machine Learning Presentation',
                    description: 'Introduction to Machine Learning concepts, algorithms, and applications. Includes practical examples and case studies.',
                    type: 'presentation',
                    subject: 'Machine Learning',
                    uploadedBy: 'Sara Wilson',
                    uploaderEmail: 'sara.wilson@sece.ac.in',
                    uploadDate: '2025-01-23T16:20:00Z',
                    fileSize: '8.7 MB',
                    downloadCount: 67,
                    rating: 4.9,
                    reviews: 14,
                    status: 'approved',
                    tags: ['machine-learning', 'ai', 'presentation', 'algorithms'],
                    verifiedBy: 'Dr. Jane Smith',
                    verificationDate: '2025-01-23T18:00:00Z',
                    staffNotes: 'Excellent presentation with clear explanations and examples'
                }
            ];

            setResources(defaultResources);
            localStorage.setItem('staffEduExchange', JSON.stringify(defaultResources));
        }
    }, []);

    const resourceTypes = [
        { value: 'notes', label: 'Notes', color: 'bg-blue-100 text-blue-800', icon: FileText },
        { value: 'assignment', label: 'Assignment', color: 'bg-green-100 text-green-800', icon: BookOpen },
        { value: 'project', label: 'Project', color: 'bg-purple-100 text-purple-800', icon: Star },
        { value: 'presentation', label: 'Presentation', color: 'bg-orange-100 text-orange-800', icon: Upload },
        { value: 'book', label: 'Book', color: 'bg-red-100 text-red-800', icon: BookOpen },
        { value: 'other', label: 'Other', color: 'bg-gray-100 text-gray-800', icon: FileText }
    ];

    const updateResourceStatus = async (resourceId: string, newStatus: 'approved' | 'rejected') => {
        setIsUpdating(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            const updatedResources = resources.map(resource => {
                if (resource.id === resourceId) {
                    return {
                        ...resource,
                        status: newStatus,
                        verifiedBy: 'Dr. Jane Smith',
                        verificationDate: new Date().toISOString(),
                        staffNotes: staffNotes
                    };
                }
                return resource;
            });

            setResources(updatedResources);
            localStorage.setItem('staffEduExchange', JSON.stringify(updatedResources));
            setSelectedResource(null);
            setStaffNotes('');

            alert(`Resource ${newStatus} successfully!`);
        } catch (error) {
            alert('Failed to update resource. Please try again.');
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
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getTypeInfo = (type: string) => {
        return resourceTypes.find(t => t.value === type) || resourceTypes[resourceTypes.length - 1];
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

    const filteredResources = resources.filter(resource => {
        const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.subject.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || resource.status === statusFilter;
        const matchesType = typeFilter === 'all' || resource.type === typeFilter;
        return matchesSearch && matchesStatus && matchesType;
    });

    const pendingCount = resources.filter(r => r.status === 'pending').length;
    const approvedCount = resources.filter(r => r.status === 'approved').length;
    const rejectedCount = resources.filter(r => r.status === 'rejected').length;
    const totalDownloads = resources.reduce((sum, r) => sum + r.downloadCount, 0);

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
                            <BookOpen size={24} />
                        </div>
                        Monitor EduExchange
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
                            <span>{pendingCount} Pending Review</span>
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
                            <span>{approvedCount} Approved</span>
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
                            <Download size={16} />
                            <span>{totalDownloads} Total Downloads</span>
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
                        <input
                            type="text"
                            placeholder="Search resources..."
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
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
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
                            {resourceTypes.map(type => (
                                <option key={type.value} value={type.value}>{type.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Resources Grid */}
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
                        {filteredResources.map((resource) => {
                            const typeInfo = getTypeInfo(resource.type);
                            const IconComponent = typeInfo.icon;

                            return (
                                <div
                                    key={resource.id}
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.8)',
                                        borderRadius: '12px',
                                        padding: '20px',
                                        border: '1px solid rgba(34, 139, 34, 0.1)',
                                        transition: 'all 0.2s',
                                        cursor: 'pointer',
                                        borderLeft: `4px solid ${resource.status === 'approved' ? '#22c55e' :
                                            resource.status === 'pending' ? '#eab308' : '#ef4444'
                                            }`
                                    }}
                                    onClick={() => setSelectedResource(resource)}
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
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px'
                                            }} className={typeInfo.color}>
                                                <IconComponent size={10} />
                                                {resource.type}
                                            </span>
                                        </div>
                                        <span style={{
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            fontSize: '11px',
                                            fontWeight: '600',
                                            border: '1px solid',
                                            textTransform: 'uppercase'
                                        }} className={getStatusColor(resource.status)}>
                                            {resource.status}
                                        </span>
                                    </div>

                                    <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                                        {resource.title}
                                    </h3>
                                    <p style={{ color: '#666', fontSize: '14px', marginBottom: '12px', lineHeight: '1.4' }}>
                                        {resource.description.substring(0, 120)}...
                                    </p>

                                    <div style={{ marginBottom: '12px' }}>
                                        <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                                            Subject: <span style={{ fontWeight: '500' }}>{resource.subject}</span>
                                        </div>
                                        <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                                            Size: <span style={{ fontWeight: '500' }}>{resource.fileSize}</span>
                                        </div>
                                        <div style={{ fontSize: '12px', color: '#666' }}>
                                            Uploaded: <span style={{ fontWeight: '500' }}>{formatDate(resource.uploadDate)}</span>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#666' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <Download size={12} />
                                                {resource.downloadCount}
                                            </span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <Star size={12} />
                                                {resource.rating}
                                            </span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <MessageCircle size={12} />
                                                {resource.reviews}
                                            </span>
                                        </div>
                                        <div style={{ fontWeight: '500' }}>
                                            by {resource.uploadedBy}
                                        </div>
                                    </div>

                                    {resource.status === 'pending' && (
                                        <div style={{ marginTop: '12px', padding: '8px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '6px' }}>
                                            <div style={{ fontSize: '12px', color: '#92400e', fontWeight: '600' }}>
                                                ⚠️ Requires Review
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Resource Detail Modal */}
                {selectedResource && (
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
                                        {selectedResource.title}
                                    </h2>
                                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                        <span style={{
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            fontSize: '11px',
                                            fontWeight: '600',
                                            textTransform: 'uppercase'
                                        }} className={getTypeInfo(selectedResource.type).color}>
                                            {selectedResource.type}
                                        </span>
                                        <span style={{
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            fontSize: '11px',
                                            fontWeight: '600',
                                            border: '1px solid',
                                            textTransform: 'uppercase'
                                        }} className={getStatusColor(selectedResource.status)}>
                                            {selectedResource.status}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedResource(null)}
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
                                    <p style={{ color: '#666', lineHeight: '1.5' }}>{selectedResource.description}</p>
                                </div>

                                <div style={{ marginBottom: '20px' }}>
                                    <h4 style={{ fontWeight: '600', marginBottom: '12px' }}>Details</h4>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                        <div>
                                            <div style={{ fontSize: '12px', color: '#666' }}>Subject</div>
                                            <div style={{ fontWeight: '500' }}>{selectedResource.subject}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '12px', color: '#666' }}>File Size</div>
                                            <div style={{ fontWeight: '500' }}>{selectedResource.fileSize}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '12px', color: '#666' }}>Upload Date</div>
                                            <div style={{ fontWeight: '500' }}>{formatDate(selectedResource.uploadDate)}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '12px', color: '#666' }}>Downloads</div>
                                            <div style={{ fontWeight: '500' }}>{selectedResource.downloadCount}</div>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ marginBottom: '20px' }}>
                                    <h4 style={{ fontWeight: '600', marginBottom: '8px' }}>Tags</h4>
                                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                        {selectedResource.tags.map(tag => (
                                            <span key={tag} style={{
                                                padding: '4px 8px',
                                                background: 'rgba(34, 139, 34, 0.1)',
                                                color: '#228B22',
                                                borderRadius: '4px',
                                                fontSize: '12px',
                                                fontWeight: '500'
                                            }}>
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div style={{ marginBottom: '20px' }}>
                                    <h4 style={{ fontWeight: '600', marginBottom: '12px' }}>Uploader Information</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <User size={16} style={{ color: '#32CD32' }} />
                                            <span>{selectedResource.uploadedBy}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <MessageCircle size={16} style={{ color: '#32CD32' }} />
                                            <span>{selectedResource.uploaderEmail}</span>
                                        </div>
                                    </div>
                                </div>

                                {selectedResource.staffNotes && (
                                    <div style={{ marginBottom: '20px' }}>
                                        <h4 style={{ fontWeight: '600', marginBottom: '8px' }}>Staff Notes</h4>
                                        <div style={{
                                            padding: '12px',
                                            background: 'rgba(34, 139, 34, 0.1)',
                                            borderRadius: '8px',
                                            fontSize: '14px',
                                            color: '#666'
                                        }}>
                                            {selectedResource.staffNotes}
                                        </div>
                                        {selectedResource.verifiedBy && (
                                            <div style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
                                                Verified by {selectedResource.verifiedBy} on {formatDate(selectedResource.verificationDate!)}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {selectedResource.status === 'pending' && (
                                    <div style={{ marginBottom: '20px' }}>
                                        <h4 style={{ fontWeight: '600', marginBottom: '8px' }}>Review Notes</h4>
                                        <textarea
                                            value={staffNotes}
                                            onChange={(e) => setStaffNotes(e.target.value)}
                                            placeholder="Add review notes or feedback..."
                                            style={{
                                                width: '100%',
                                                padding: '12px',
                                                border: '1px solid #ddd',
                                                borderRadius: '8px',
                                                fontSize: '14px',
                                                minHeight: '80px',
                                                resize: 'vertical'
                                            }}
                                        />
                                    </div>
                                )}
                            </div>

                            {selectedResource.status === 'pending' && (
                                <div style={{
                                    padding: '24px',
                                    borderTop: '1px solid #eee',
                                    display: 'flex',
                                    gap: '12px',
                                    justifyContent: 'flex-end'
                                }}>
                                    <button
                                        onClick={() => updateResourceStatus(selectedResource.id, 'rejected')}
                                        disabled={isUpdating}
                                        style={{
                                            padding: '8px 16px',
                                            background: '#ef4444',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
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
                                        onClick={() => updateResourceStatus(selectedResource.id, 'approved')}
                                        disabled={isUpdating}
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
            </main>
        </>
    );
}

export default StaffEduExchangePage;
