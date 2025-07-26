// src/components/pages/staff/lostfound/index.tsx
import React, { useState, useEffect } from 'react';
import StaffNavigation from '../staff/navigation';
import {
    Search,
    Eye,
    CheckCircle,
    XCircle,
    MessageCircle,
    Calendar,
    MapPin,
    User,
    Phone,
    Mail,
    Clock,
    Filter,
    AlertCircle
} from 'lucide-react';

interface LostFoundItem {
    id: string;
    title: string;
    description: string;
    type: 'lost' | 'found';
    category: 'electronics' | 'books' | 'clothing' | 'accessories' | 'documents' | 'other';
    location: string;
    dateReported: string;
    reportedBy: string;
    contactEmail: string;
    contactPhone: string;
    status: 'pending' | 'verified' | 'resolved' | 'rejected';
    images?: string[];
    staffNotes?: string;
    verifiedBy?: string;
    verifiedDate?: string;
}

function StaffLostFoundPage() {
    const [items, setItems] = useState<LostFoundItem[]>([]);
    const [selectedItem, setSelectedItem] = useState<LostFoundItem | null>(null);
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [typeFilter, setTypeFilter] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [staffNotes, setStaffNotes] = useState('');

    useEffect(() => {
        const savedItems = localStorage.getItem('staffLostFoundItems');
        if (savedItems) {
            setItems(JSON.parse(savedItems));
        } else {
            const defaultItems: LostFoundItem[] = [
                {
                    id: 'LF001',
                    title: 'Black iPhone 14',
                    description: 'Lost my iPhone 14 in black color near the library. It has a clear case with my name sticker on the back.',
                    type: 'lost',
                    category: 'electronics',
                    location: 'Central Library',
                    dateReported: '2025-01-25T14:30:00Z',
                    reportedBy: 'John Smith',
                    contactEmail: 'john.smith@sece.ac.in',
                    contactPhone: '+91 9876543210',
                    status: 'pending',
                    images: []
                },
                {
                    id: 'LF002',
                    title: 'Found: Engineering Mathematics Textbook',
                    description: 'Found a textbook for Engineering Mathematics with name "Priya Sharma" written inside. Found in classroom 301.',
                    type: 'found',
                    category: 'books',
                    location: 'Classroom 301',
                    dateReported: '2025-01-24T10:15:00Z',
                    reportedBy: 'Staff Member',
                    contactEmail: 'security@sece.ac.in',
                    contactPhone: '+91 9876543211',
                    status: 'verified',
                    verifiedBy: 'Dr. Jane Smith',
                    verifiedDate: '2025-01-24T16:00:00Z'
                },
                {
                    id: 'LF003',
                    title: 'Lost Wallet',
                    description: 'Brown leather wallet containing ID cards and some cash. Lost somewhere between hostel and cafeteria.',
                    type: 'lost',
                    category: 'accessories',
                    location: 'Between Hostel and Cafeteria',
                    dateReported: '2025-01-26T08:45:00Z',
                    reportedBy: 'Rahul Kumar',
                    contactEmail: 'rahul.kumar@sece.ac.in',
                    contactPhone: '+91 9876543212',
                    status: 'pending'
                },
                {
                    id: 'LF004',
                    title: 'Found: Blue Hoodie',
                    description: 'Found a blue hoodie in the computer lab. Size M, brand: Nike. Has been in lost and found for 3 days.',
                    type: 'found',
                    category: 'clothing',
                    location: 'Computer Lab 2',
                    dateReported: '2025-01-23T16:20:00Z',
                    reportedBy: 'Lab Assistant',
                    contactEmail: 'lab@sece.ac.in',
                    contactPhone: '+91 9876543213',
                    status: 'verified',
                    verifiedBy: 'Dr. Jane Smith',
                    verifiedDate: '2025-01-23T18:00:00Z'
                }
            ];

            setItems(defaultItems);
            localStorage.setItem('staffLostFoundItems', JSON.stringify(defaultItems));
        }
    }, []);

    const categories = [
        { value: 'electronics', label: 'Electronics', color: 'bg-blue-100 text-blue-800' },
        { value: 'books', label: 'Books', color: 'bg-green-100 text-green-800' },
        { value: 'clothing', label: 'Clothing', color: 'bg-purple-100 text-purple-800' },
        { value: 'accessories', label: 'Accessories', color: 'bg-orange-100 text-orange-800' },
        { value: 'documents', label: 'Documents', color: 'bg-red-100 text-red-800' },
        { value: 'other', label: 'Other', color: 'bg-gray-100 text-gray-800' }
    ];

    const updateItemStatus = (itemId: string, newStatus: 'verified' | 'resolved' | 'rejected') => {
        const updatedItems = items.map(item => {
            if (item.id === itemId) {
                return {
                    ...item,
                    status: newStatus,
                    verifiedBy: 'Dr. Jane Smith',
                    verifiedDate: new Date().toISOString(),
                    staffNotes: staffNotes
                };
            }
            return item;
        });

        setItems(updatedItems);
        localStorage.setItem('staffLostFoundItems', JSON.stringify(updatedItems));
        setSelectedItem(null);
        setStaffNotes('');
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'verified':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'resolved':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'rejected':
                return 'bg-red-100 text-red-800 border-red-200';
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

    const filteredItems = items.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
        const matchesType = typeFilter === 'all' || item.type === typeFilter;
        return matchesSearch && matchesStatus && matchesType;
    });

    const pendingCount = items.filter(item => item.status === 'pending').length;
    const verifiedCount = items.filter(item => item.status === 'verified').length;
    const resolvedCount = items.filter(item => item.status === 'resolved').length;

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
                            <Search size={24} />
                        </div>
                        Verify Lost & Found Items
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
                            <AlertCircle size={16} />
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
                            <CheckCircle size={16} />
                            <span>{verifiedCount} Verified</span>
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
                            placeholder="Search items..."
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
                            <option value="verified">Verified</option>
                            <option value="resolved">Resolved</option>
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
                            <option value="lost">Lost</option>
                            <option value="found">Found</option>
                        </select>
                    </div>
                </div>

                {/* Items Grid */}
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
                        {filteredItems.map((item) => (
                            <div
                                key={item.id}
                                style={{
                                    background: 'rgba(255, 255, 255, 0.8)',
                                    borderRadius: '12px',
                                    padding: '20px',
                                    border: '1px solid rgba(34, 139, 34, 0.1)',
                                    transition: 'all 0.2s',
                                    cursor: 'pointer'
                                }}
                                onClick={() => setSelectedItem(item)}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                        <span style={{
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            fontSize: '11px',
                                            fontWeight: '600',
                                            textTransform: 'uppercase',
                                            background: item.type === 'lost' ? '#fef3c7' : '#dbeafe',
                                            color: item.type === 'lost' ? '#92400e' : '#1e40af'
                                        }}>
                                            {item.type}
                                        </span>
                                        <span style={{
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            fontSize: '11px',
                                            fontWeight: '600',
                                            textTransform: 'uppercase'
                                        }} className={getCategoryColor(item.category)}>
                                            {item.category}
                                        </span>
                                    </div>
                                    <span style={{
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontSize: '11px',
                                        fontWeight: '600',
                                        border: '1px solid',
                                        textTransform: 'uppercase'
                                    }} className={getStatusColor(item.status)}>
                                        {item.status}
                                    </span>
                                </div>

                                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                                    {item.title}
                                </h3>
                                <p style={{ color: '#666', fontSize: '14px', marginBottom: '12px', lineHeight: '1.4' }}>
                                    {item.description.substring(0, 100)}...
                                </p>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: '#666' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <MapPin size={12} />
                                        <span>{item.location}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <Calendar size={12} />
                                        <span>{formatDate(item.dateReported)}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <User size={12} />
                                        <span>{item.reportedBy}</span>
                                    </div>
                                </div>

                                {item.status === 'pending' && (
                                    <div style={{ marginTop: '12px', padding: '8px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '6px' }}>
                                        <div style={{ fontSize: '12px', color: '#92400e', fontWeight: '600' }}>
                                            ⚠️ Requires Verification
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Item Detail Modal */}
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
                            padding: '0',
                            maxWidth: '600px',
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
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <span style={{
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            fontSize: '11px',
                                            fontWeight: '600',
                                            textTransform: 'uppercase',
                                            background: selectedItem.type === 'lost' ? '#fef3c7' : '#dbeafe',
                                            color: selectedItem.type === 'lost' ? '#92400e' : '#1e40af'
                                        }}>
                                            {selectedItem.type}
                                        </span>
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
                                    <XCircle size={20} />
                                </button>
                            </div>

                            <div style={{ padding: '24px', maxHeight: '60vh', overflowY: 'auto' }}>
                                <div style={{ marginBottom: '20px' }}>
                                    <h4 style={{ fontWeight: '600', marginBottom: '8px' }}>Description</h4>
                                    <p style={{ color: '#666', lineHeight: '1.5' }}>{selectedItem.description}</p>
                                </div>

                                <div style={{ marginBottom: '20px' }}>
                                    <h4 style={{ fontWeight: '600', marginBottom: '12px' }}>Details</h4>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <MapPin size={16} style={{ color: '#32CD32' }} />
                                            <div>
                                                <div style={{ fontSize: '12px', color: '#666' }}>Location</div>
                                                <div style={{ fontWeight: '500' }}>{selectedItem.location}</div>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <Calendar size={16} style={{ color: '#32CD32' }} />
                                            <div>
                                                <div style={{ fontSize: '12px', color: '#666' }}>Date Reported</div>
                                                <div style={{ fontWeight: '500' }}>{formatDate(selectedItem.dateReported)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ marginBottom: '20px' }}>
                                    <h4 style={{ fontWeight: '600', marginBottom: '12px' }}>Contact Information</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <User size={16} style={{ color: '#32CD32' }} />
                                            <span>{selectedItem.reportedBy}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <Mail size={16} style={{ color: '#32CD32' }} />
                                            <span>{selectedItem.contactEmail}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <Phone size={16} style={{ color: '#32CD32' }} />
                                            <span>{selectedItem.contactPhone}</span>
                                        </div>
                                    </div>
                                </div>

                                {selectedItem.status === 'pending' && (
                                    <div style={{ marginBottom: '20px' }}>
                                        <h4 style={{ fontWeight: '600', marginBottom: '8px' }}>Staff Notes</h4>
                                        <textarea
                                            value={staffNotes}
                                            onChange={(e) => setStaffNotes(e.target.value)}
                                            placeholder="Add verification notes..."
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

                                {selectedItem.staffNotes && (
                                    <div style={{ marginBottom: '20px' }}>
                                        <h4 style={{ fontWeight: '600', marginBottom: '8px' }}>Staff Notes</h4>
                                        <div style={{
                                            padding: '12px',
                                            background: 'rgba(34, 139, 34, 0.1)',
                                            borderRadius: '8px',
                                            fontSize: '14px',
                                            color: '#666'
                                        }}>
                                            {selectedItem.staffNotes}
                                        </div>
                                        {selectedItem.verifiedBy && (
                                            <div style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
                                                Verified by {selectedItem.verifiedBy} on {formatDate(selectedItem.verifiedDate!)}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {selectedItem.status === 'pending' && (
                                <div style={{
                                    padding: '24px',
                                    borderTop: '1px solid #eee',
                                    display: 'flex',
                                    gap: '12px',
                                    justifyContent: 'flex-end'
                                }}>
                                    <button
                                        onClick={() => updateItemStatus(selectedItem.id, 'rejected')}
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
                                            gap: '8px'
                                        }}
                                    >
                                        <XCircle size={16} />
                                        Reject
                                    </button>
                                    <button
                                        onClick={() => updateItemStatus(selectedItem.id, 'verified')}
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
                                        <CheckCircle size={16} />
                                        Verify
                                    </button>
                                    <button
                                        onClick={() => updateItemStatus(selectedItem.id, 'resolved')}
                                        style={{
                                            padding: '8px 16px',
                                            background: '#22c55e',
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
                                        <CheckCircle size={16} />
                                        Mark Resolved
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

export default StaffLostFoundPage;
