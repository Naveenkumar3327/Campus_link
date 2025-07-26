// src/components/pages/staff/complaints/index.tsx
import React, { useState, useEffect } from 'react';
import StaffNavigation from '../staff/navigation';
import {
    Building,
    Eye,
    CheckCircle,
    XCircle,
    Clock,
    User,
    Calendar,
    MapPin,
    Phone,
    Mail,
    MessageCircle,
    AlertTriangle,
    Filter,
    Search,
    Edit3,
    Send,
    FileText,
    Image as ImageIcon
} from 'lucide-react';

interface Complaint {
    id: string;
    title: string;
    description: string;
    category: 'maintenance' | 'food' | 'cleanliness' | 'security' | 'facilities' | 'wifi' | 'other';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    status: 'pending' | 'in-progress' | 'resolved' | 'rejected';
    location: string;
    block?: string;
    roomNo?: string;
    reportedBy: string;
    reporterEmail: string;
    reporterPhone: string;
    reportedDate: string;
    assignedTo?: string;
    resolvedDate?: string;
    staffNotes?: string;
    images?: string[];
    escalated: boolean;
}

function StaffComplaintsPage() {
    const [complaints, setComplaints] = useState<Complaint[]>([]);
    const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [priorityFilter, setPriorityFilter] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [staffNotes, setStaffNotes] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        const savedComplaints = localStorage.getItem('staffComplaints');
        if (savedComplaints) {
            setComplaints(JSON.parse(savedComplaints));
        } else {
            const defaultComplaints: Complaint[] = [
                {
                    id: 'COMP001',
                    title: 'WiFi Not Working in A Block',
                    description: 'The WiFi connection in A Block has been down for the past 2 days. Students are unable to access online resources for their assignments.',
                    category: 'wifi',
                    priority: 'high',
                    status: 'pending',
                    location: 'A Block',
                    block: 'A Block',
                    roomNo: 'Multiple Rooms',
                    reportedBy: 'John Smith',
                    reporterEmail: 'john.smith@sece.ac.in',
                    reporterPhone: '+91 9876543210',
                    reportedDate: '2025-01-25T14:30:00Z',
                    escalated: false
                },
                {
                    id: 'COMP002',
                    title: 'Broken AC in Room B-301',
                    description: 'The air conditioning unit in room B-301 is not working properly. It makes loud noises and does not cool the room effectively.',
                    category: 'maintenance',
                    priority: 'medium',
                    status: 'in-progress',
                    location: 'B Block',
                    block: 'B Block',
                    roomNo: 'B-301',
                    reportedBy: 'Priya Sharma',
                    reporterEmail: 'priya.sharma@sece.ac.in',
                    reporterPhone: '+91 9876543211',
                    reportedDate: '2025-01-24T10:15:00Z',
                    assignedTo: 'Maintenance Team',
                    staffNotes: 'Technician scheduled to visit on Jan 26, 2025',
                    escalated: false
                },
                {
                    id: 'COMP003',
                    title: 'Poor Food Quality in Mess',
                    description: 'The food served in the mess today was not fresh and many students complained of stomach issues. Please look into the food preparation process.',
                    category: 'food',
                    priority: 'urgent',
                    status: 'resolved',
                    location: 'Main Mess',
                    reportedBy: 'Rahul Kumar',
                    reporterEmail: 'rahul.kumar@sece.ac.in',
                    reporterPhone: '+91 9876543212',
                    reportedDate: '2025-01-23T18:45:00Z',
                    assignedTo: 'Mess Committee',
                    resolvedDate: '2025-01-24T08:00:00Z',
                    staffNotes: 'Food quality improved, new supplier arranged',
                    escalated: true
                },
                {
                    id: 'COMP004',
                    title: 'Washroom Cleaning Issue',
                    description: 'The washrooms on the 2nd floor of C Block are not being cleaned regularly. There is a bad smell and lack of basic supplies.',
                    category: 'cleanliness',
                    priority: 'medium',
                    status: 'pending',
                    location: 'C Block - 2nd Floor',
                    block: 'C Block',
                    reportedBy: 'Anonymous',
                    reporterEmail: 'anonymous@sece.ac.in',
                    reporterPhone: 'Not provided',
                    reportedDate: '2025-01-26T09:20:00Z',
                    escalated: false
                }
            ];

            setComplaints(defaultComplaints);
            localStorage.setItem('staffComplaints', JSON.stringify(defaultComplaints));
        }
    }, []);

    const categories = [
        { value: 'maintenance', label: 'Maintenance', color: 'bg-blue-100 text-blue-800' },
        { value: 'food', label: 'Food', color: 'bg-green-100 text-green-800' },
        { value: 'cleanliness', label: 'Cleanliness', color: 'bg-purple-100 text-purple-800' },
        { value: 'security', label: 'Security', color: 'bg-red-100 text-red-800' },
        { value: 'facilities', label: 'Facilities', color: 'bg-orange-100 text-orange-800' },
        { value: 'wifi', label: 'WiFi/Internet', color: 'bg-cyan-100 text-cyan-800' },
        { value: 'other', label: 'Other', color: 'bg-gray-100 text-gray-800' }
    ];

    const updateComplaintStatus = async (complaintId: string, newStatus: 'in-progress' | 'resolved' | 'rejected') => {
        setIsUpdating(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            const updatedComplaints = complaints.map(complaint => {
                if (complaint.id === complaintId) {
                    return {
                        ...complaint,
                        status: newStatus,
                        assignedTo: 'Dr. Jane Smith',
                        resolvedDate: newStatus === 'resolved' ? new Date().toISOString() : undefined,
                        staffNotes: staffNotes
                    };
                }
                return complaint;
            });

            setComplaints(updatedComplaints);
            localStorage.setItem('staffComplaints', JSON.stringify(updatedComplaints));
            setSelectedComplaint(null);
            setStaffNotes('');

            alert(`Complaint ${newStatus === 'resolved' ? 'resolved' : newStatus === 'rejected' ? 'rejected' : 'updated'} successfully!`);
        } catch (error) {
            alert('Failed to update complaint. Please try again.');
        } finally {
            setIsUpdating(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'in-progress':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'resolved':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'rejected':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
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

    const getCategoryColor = (category: string) => {
        const cat = categories.find(c => c.value === category);
        return cat?.color || 'bg-gray-100 text-gray-800';
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

    const filteredComplaints = complaints.filter(complaint => {
        const matchesSearch = complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            complaint.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || complaint.status === statusFilter;
        const matchesPriority = priorityFilter === 'all' || complaint.priority === priorityFilter;
        return matchesSearch && matchesStatus && matchesPriority;
    });

    const pendingCount = complaints.filter(c => c.status === 'pending').length;
    const inProgressCount = complaints.filter(c => c.status === 'in-progress').length;
    const resolvedCount = complaints.filter(c => c.status === 'resolved').length;
    const urgentCount = complaints.filter(c => c.priority === 'urgent' && c.status !== 'resolved').length;

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
                            <Building size={24} />
                        </div>
                        Manage Complaints
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
                            <span>{pendingCount} Pending</span>
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
                            <Edit3 size={16} />
                            <span>{inProgressCount} In Progress</span>
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
                            <span>{resolvedCount} Resolved</span>
                        </div>
                        {urgentCount > 0 && (
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '8px 16px',
                                background: 'rgba(239, 68, 68, 0.1)',
                                borderRadius: '8px',
                                fontSize: '14px',
                                fontWeight: '500',
                                color: '#ef4444'
                            }}>
                                <AlertTriangle size={16} />
                                <span>{urgentCount} Urgent</span>
                            </div>
                        )}
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
                            placeholder="Search complaints..."
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
                            <option value="in-progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                        <select
                            value={priorityFilter}
                            onChange={(e) => setPriorityFilter(e.target.value)}
                            style={{
                                padding: '10px 16px',
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                fontSize: '14px',
                                background: 'white'
                            }}
                        >
                            <option value="all">All Priority</option>
                            <option value="urgent">Urgent</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>
                </div>

                {/* Complaints Grid */}
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
                        {filteredComplaints.map((complaint) => (
                            <div
                                key={complaint.id}
                                style={{
                                    background: 'rgba(255, 255, 255, 0.8)',
                                    borderRadius: '12px',
                                    padding: '20px',
                                    border: '1px solid rgba(34, 139, 34, 0.1)',
                                    transition: 'all 0.2s',
                                    cursor: 'pointer',
                                    borderLeft: `4px solid ${complaint.priority === 'urgent' ? '#ef4444' :
                                        complaint.priority === 'high' ? '#f59e0b' :
                                            complaint.priority === 'medium' ? '#eab308' : '#22c55e'
                                        }`
                                }}
                                onClick={() => setSelectedComplaint(complaint)}
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
                                            textTransform: 'uppercase'
                                        }} className={getCategoryColor(complaint.category)}>
                                            {complaint.category}
                                        </span>
                                        <span style={{
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            fontSize: '11px',
                                            fontWeight: '600',
                                            border: '1px solid',
                                            textTransform: 'uppercase'
                                        }} className={getPriorityColor(complaint.priority)}>
                                            {complaint.priority}
                                        </span>
                                    </div>
                                    <span style={{
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontSize: '11px',
                                        fontWeight: '600',
                                        border: '1px solid',
                                        textTransform: 'uppercase'
                                    }} className={getStatusColor(complaint.status)}>
                                        {complaint.status}
                                    </span>
                                </div>

                                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                                    {complaint.title}
                                    {complaint.escalated && (
                                        <AlertTriangle size={14} style={{ color: '#ef4444', marginLeft: '8px', display: 'inline' }} />
                                    )}
                                </h3>
                                <p style={{ color: '#666', fontSize: '14px', marginBottom: '12px', lineHeight: '1.4' }}>
                                    {complaint.description.substring(0, 120)}...
                                </p>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: '#666' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <MapPin size={12} />
                                        <span>{complaint.location}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <Calendar size={12} />
                                        <span>{formatDate(complaint.reportedDate)}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <User size={12} />
                                        <span>{complaint.reportedBy}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Complaint Detail Modal */}
                {selectedComplaint && (
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
                                        {selectedComplaint.title}
                                    </h2>
                                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                        <span style={{
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            fontSize: '11px',
                                            fontWeight: '600',
                                            textTransform: 'uppercase'
                                        }} className={getCategoryColor(selectedComplaint.category)}>
                                            {selectedComplaint.category}
                                        </span>
                                        <span style={{
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            fontSize: '11px',
                                            fontWeight: '600',
                                            border: '1px solid',
                                            textTransform: 'uppercase'
                                        }} className={getPriorityColor(selectedComplaint.priority)}>
                                            {selectedComplaint.priority}
                                        </span>
                                        <span style={{
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            fontSize: '11px',
                                            fontWeight: '600',
                                            border: '1px solid',
                                            textTransform: 'uppercase'
                                        }} className={getStatusColor(selectedComplaint.status)}>
                                            {selectedComplaint.status}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedComplaint(null)}
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
                                    <p style={{ color: '#666', lineHeight: '1.5' }}>{selectedComplaint.description}</p>
                                </div>

                                <div style={{ marginBottom: '20px' }}>
                                    <h4 style={{ fontWeight: '600', marginBottom: '12px' }}>Details</h4>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <MapPin size={16} style={{ color: '#32CD32' }} />
                                            <div>
                                                <div style={{ fontSize: '12px', color: '#666' }}>Location</div>
                                                <div style={{ fontWeight: '500' }}>{selectedComplaint.location}</div>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <Calendar size={16} style={{ color: '#32CD32' }} />
                                            <div>
                                                <div style={{ fontSize: '12px', color: '#666' }}>Reported Date</div>
                                                <div style={{ fontWeight: '500' }}>{formatDate(selectedComplaint.reportedDate)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ marginBottom: '20px' }}>
                                    <h4 style={{ fontWeight: '600', marginBottom: '12px' }}>Reporter Information</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <User size={16} style={{ color: '#32CD32' }} />
                                            <span>{selectedComplaint.reportedBy}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <Mail size={16} style={{ color: '#32CD32' }} />
                                            <span>{selectedComplaint.reporterEmail}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <Phone size={16} style={{ color: '#32CD32' }} />
                                            <span>{selectedComplaint.reporterPhone}</span>
                                        </div>
                                    </div>
                                </div>

                                {selectedComplaint.staffNotes && (
                                    <div style={{ marginBottom: '20px' }}>
                                        <h4 style={{ fontWeight: '600', marginBottom: '8px' }}>Staff Notes</h4>
                                        <div style={{
                                            padding: '12px',
                                            background: 'rgba(34, 139, 34, 0.1)',
                                            borderRadius: '8px',
                                            fontSize: '14px',
                                            color: '#666'
                                        }}>
                                            {selectedComplaint.staffNotes}
                                        </div>
                                    </div>
                                )}

                                {selectedComplaint.status === 'pending' && (
                                    <div style={{ marginBottom: '20px' }}>
                                        <h4 style={{ fontWeight: '600', marginBottom: '8px' }}>Add Notes</h4>
                                        <textarea
                                            value={staffNotes}
                                            onChange={(e) => setStaffNotes(e.target.value)}
                                            placeholder="Add staff notes or resolution details..."
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

                            {selectedComplaint.status === 'pending' && (
                                <div style={{
                                    padding: '24px',
                                    borderTop: '1px solid #eee',
                                    display: 'flex',
                                    gap: '12px',
                                    justifyContent: 'flex-end'
                                }}>
                                    <button
                                        onClick={() => updateComplaintStatus(selectedComplaint.id, 'rejected')}
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
                                        onClick={() => updateComplaintStatus(selectedComplaint.id, 'in-progress')}
                                        disabled={isUpdating}
                                        style={{
                                            padding: '8px 16px',
                                            background: '#3b82f6',
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
                                        <Edit3 size={16} />
                                        Start Progress
                                    </button>
                                    <button
                                        onClick={() => updateComplaintStatus(selectedComplaint.id, 'resolved')}
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
                                        Resolve
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

export default StaffComplaintsPage;
