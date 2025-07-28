// src/components/pages/staff/timetables/index.tsx
import React, { useState, useEffect } from 'react';
import StaffNavigation from '../staff/navigation';
import {
    Calendar,
    Plus,
    Edit3,
    Trash2,
    Clock,
    MapPin,
    User,
    BookOpen,
    Save,
    X,
    Eye,
    Download,
    Upload,
    Search,
    Filter,
    Copy
} from 'lucide-react';

interface TimeSlot {
    id: string;
    startTime: string;
    endTime: string;
    subject: string;
    faculty: string;
    room: string;
    type: 'lecture' | 'lab' | 'tutorial' | 'break';
    color: string;
}

interface DaySchedule {
    day: string;
    slots: TimeSlot[];
}

interface Timetable {
    id: string;
    name: string;
    department: string;
    year: string;
    section: string;
    semester: string;
    academicYear: string;
    schedule: DaySchedule[];
    createdBy: string;
    createdDate: string;
    isActive: boolean;
}

function StaffTimetablesPage() {
    const [timetables, setTimetables] = useState<Timetable[]>([]);
    const [selectedTimetable, setSelectedTimetable] = useState<Timetable | null>(null);
    const [currentView, setCurrentView] = useState<'list' | 'view' | 'create' | 'edit'>('list');
    const [searchQuery, setSearchQuery] = useState('');
    const [departmentFilter, setDepartmentFilter] = useState<string>('all');
    const [yearFilter, setYearFilter] = useState<string>('all');
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        department: '',
        year: '',
        section: '',
        semester: '',
        academicYear: '2024-2025'
    });

    const timeSlots = [
        '08:00 - 09:00',
        '09:00 - 10:00',
        '10:00 - 11:00',
        '11:00 - 11:15', // Break
        '11:15 - 12:15',
        '12:15 - 13:15',
        '13:15 - 14:15', // Lunch Break
        '14:15 - 15:15',
        '15:15 - 16:15',
        '16:15 - 17:15'
    ];

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const subjects = [
        'Data Structures',
        'Database Management',
        'Computer Networks',
        'Operating Systems',
        'Software Engineering',
        'Web Technologies',
        'Mobile App Development',
        'Machine Learning',
        'Artificial Intelligence',
        'Compiler Design'
    ];

    const facultyMembers = [
        'Dr. John Smith',
        'Dr. Jane Doe',
        'Prof. Mike Johnson',
        'Dr. Sarah Wilson',
        'Prof. David Brown',
        'Dr. Lisa Garcia',
        'Prof. Robert Taylor'
    ];

    const rooms = [
        'Room 101', 'Room 102', 'Room 103', 'Room 201', 'Room 202', 'Room 203',
        'Lab A', 'Lab B', 'Lab C', 'Seminar Hall 1', 'Seminar Hall 2', 'Auditorium'
    ];

    useEffect(() => {
        const savedTimetables = localStorage.getItem('staffTimetables');
        if (savedTimetables) {
            setTimetables(JSON.parse(savedTimetables));
        } else {
            const defaultTimetables: Timetable[] = [
                {
                    id: 'TT001',
                    name: 'CSE 3rd Year A Section',
                    department: 'Computer Science Engineering',
                    year: '3rd Year',
                    section: 'A',
                    semester: '6th Semester',
                    academicYear: '2024-2025',
                    createdBy: 'Dr. Jane Smith',
                    createdDate: '2025-01-20T10:00:00Z',
                    isActive: true,
                    schedule: [
                        {
                            day: 'Monday',
                            slots: [
                                {
                                    id: 'slot1',
                                    startTime: '08:00',
                                    endTime: '09:00',
                                    subject: 'Data Structures',
                                    faculty: 'Dr. John Smith',
                                    room: 'Room 101',
                                    type: 'lecture',
                                    color: '#3b82f6'
                                },
                                {
                                    id: 'slot2',
                                    startTime: '09:00',
                                    endTime: '10:00',
                                    subject: 'Database Management',
                                    faculty: 'Dr. Jane Doe',
                                    room: 'Room 102',
                                    type: 'lecture',
                                    color: '#22c55e'
                                },
                                {
                                    id: 'slot3',
                                    startTime: '11:15',
                                    endTime: '12:15',
                                    subject: 'Computer Networks Lab',
                                    faculty: 'Prof. Mike Johnson',
                                    room: 'Lab A',
                                    type: 'lab',
                                    color: '#f59e0b'
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 'TT002',
                    name: 'CSE 2nd Year B Section',
                    department: 'Computer Science Engineering',
                    year: '2nd Year',
                    section: 'B',
                    semester: '4th Semester',
                    academicYear: '2024-2025',
                    createdBy: 'Dr. Jane Smith',
                    createdDate: '2025-01-18T14:30:00Z',
                    isActive: true,
                    schedule: []
                }
            ];

            setTimetables(defaultTimetables);
            localStorage.setItem('staffTimetables', JSON.stringify(defaultTimetables));
        }
    }, []);

    const handleCreateTimetable = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            const newTimetable: Timetable = {
                id: `TT${String(timetables.length + 1).padStart(3, '0')}`,
                ...formData,
                name: `${formData.department} ${formData.year} ${formData.section} Section`,
                createdBy: 'Dr. Jane Smith',
                createdDate: new Date().toISOString(),
                isActive: true,
                schedule: days.map(day => ({ day, slots: [] }))
            };

            const updatedTimetables = [newTimetable, ...timetables];
            setTimetables(updatedTimetables);
            localStorage.setItem('staffTimetables', JSON.stringify(updatedTimetables));

            setFormData({
                name: '',
                department: '',
                year: '',
                section: '',
                semester: '',
                academicYear: '2024-2025'
            });

            setCurrentView('list');
            alert('Timetable created successfully!');
        } catch (error) {
            alert('Failed to create timetable. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const deleteTimetable = (id: string) => {
        if (window.confirm('Are you sure you want to delete this timetable?')) {
            const updatedTimetables = timetables.filter(tt => tt.id !== id);
            setTimetables(updatedTimetables);
            localStorage.setItem('staffTimetables', JSON.stringify(updatedTimetables));
        }
    };

    const duplicateTimetable = (timetable: Timetable) => {
        const newTimetable: Timetable = {
            ...timetable,
            id: `TT${String(timetables.length + 1).padStart(3, '0')}`,
            name: `${timetable.name} (Copy)`,
            createdDate: new Date().toISOString()
        };

        const updatedTimetables = [newTimetable, ...timetables];
        setTimetables(updatedTimetables);
        localStorage.setItem('staffTimetables', JSON.stringify(updatedTimetables));
        alert('Timetable duplicated successfully!');
    };

    const filteredTimetables = timetables.filter(tt => {
        const matchesSearch = tt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tt.department.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDepartment = departmentFilter === 'all' || tt.department === departmentFilter;
        const matchesYear = yearFilter === 'all' || tt.year === yearFilter;
        return matchesSearch && matchesDepartment && matchesYear;
    });

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

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
                                <Calendar size={24} />
                            </div>
                            Manage Timetables
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
                                    Create Timetable
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
                            <Calendar size={16} />
                            <span>{timetables.length} Total Timetables</span>
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
                            <Eye size={16} />
                            <span>{timetables.filter(t => t.isActive).length} Active</span>
                        </div>
                    </div>
                </div>

                {/* Content Based on Current View */}
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
                                    placeholder="Search timetables..."
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
                                    value={departmentFilter}
                                    onChange={(e) => setDepartmentFilter(e.target.value)}
                                    style={{
                                        padding: '10px 16px',
                                        border: '1px solid #ddd',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        background: 'white'
                                    }}
                                >
                                    <option value="all">All Departments</option>
                                    <option value="Computer Science Engineering">CSE</option>
                                    <option value="Electronics & Communication">ECE</option>
                                    <option value="Mechanical Engineering">MECH</option>
                                    <option value="Civil Engineering">CIVIL</option>
                                </select>
                                <select
                                    value={yearFilter}
                                    onChange={(e) => setYearFilter(e.target.value)}
                                    style={{
                                        padding: '10px 16px',
                                        border: '1px solid #ddd',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        background: 'white'
                                    }}
                                >
                                    <option value="all">All Years</option>
                                    <option value="1st Year">1st Year</option>
                                    <option value="2nd Year">2nd Year</option>
                                    <option value="3rd Year">3rd Year</option>
                                    <option value="4th Year">4th Year</option>
                                </select>
                            </div>
                        </div>

                        {/* Timetables Grid */}
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
                                {filteredTimetables.map((timetable) => (
                                    <div
                                        key={timetable.id}
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.8)',
                                            borderRadius: '12px',
                                            padding: '20px',
                                            border: '1px solid rgba(34, 139, 34, 0.1)',
                                            transition: 'all 0.2s',
                                            borderLeft: timetable.isActive ? '4px solid #32CD32' : '4px solid #ccc'
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                            <div>
                                                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>
                                                    {timetable.name}
                                                </h3>
                                                <div style={{ fontSize: '12px', color: '#666' }}>
                                                    {timetable.semester} • {timetable.academicYear}
                                                </div>
                                            </div>
                                            <div style={{
                                                padding: '4px 8px',
                                                borderRadius: '4px',
                                                fontSize: '11px',
                                                fontWeight: '600',
                                                background: timetable.isActive ? '#dcfce7' : '#f3f4f6',
                                                color: timetable.isActive ? '#166534' : '#6b7280'
                                            }}>
                                                {timetable.isActive ? 'Active' : 'Inactive'}
                                            </div>
                                        </div>

                                        <div style={{ marginBottom: '16px', fontSize: '14px', color: '#666' }}>
                                            <div style={{ marginBottom: '4px' }}>Department: {timetable.department}</div>
                                            <div style={{ marginBottom: '4px' }}>Created by: {timetable.createdBy}</div>
                                            <div>Created: {formatDate(timetable.createdDate)}</div>
                                        </div>

                                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between' }}>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <button
                                                    onClick={() => {
                                                        setSelectedTimetable(timetable);
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
                                                        setSelectedTimetable(timetable);
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
                                                <button
                                                    onClick={() => duplicateTimetable(timetable)}
                                                    style={{
                                                        padding: '6px 12px',
                                                        background: 'rgba(245, 158, 11, 0.1)',
                                                        color: '#f59e0b',
                                                        border: '1px solid rgba(245, 158, 11, 0.2)',
                                                        borderRadius: '6px',
                                                        cursor: 'pointer',
                                                        fontSize: '12px',
                                                        fontWeight: '500',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '4px'
                                                    }}
                                                >
                                                    <Copy size={12} />
                                                    Copy
                                                </button>
                                                <button
                                                    onClick={() => deleteTimetable(timetable.id)}
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
                            Create New Timetable
                        </h2>

                        <form onSubmit={handleCreateTimetable}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                        Department *
                                    </label>
                                    <select
                                        value={formData.department}
                                        onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            fontSize: '14px'
                                        }}
                                    >
                                        <option value="">Select Department</option>
                                        <option value="Computer Science Engineering">Computer Science Engineering</option>
                                        <option value="Electronics & Communication">Electronics & Communication</option>
                                        <option value="Mechanical Engineering">Mechanical Engineering</option>
                                        <option value="Civil Engineering">Civil Engineering</option>
                                    </select>
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                        Academic Year
                                    </label>
                                    <select
                                        value={formData.academicYear}
                                        onChange={(e) => setFormData(prev => ({ ...prev, academicYear: e.target.value }))}
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            fontSize: '14px'
                                        }}
                                    >
                                        <option value="2024-2025">2024-2025</option>
                                        <option value="2025-2026">2025-2026</option>
                                    </select>
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                        Year *
                                    </label>
                                    <select
                                        value={formData.year}
                                        onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            fontSize: '14px'
                                        }}
                                    >
                                        <option value="">Select Year</option>
                                        <option value="1st Year">1st Year</option>
                                        <option value="2nd Year">2nd Year</option>
                                        <option value="3rd Year">3rd Year</option>
                                        <option value="4th Year">4th Year</option>
                                    </select>
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                        Section *
                                    </label>
                                    <select
                                        value={formData.section}
                                        onChange={(e) => setFormData(prev => ({ ...prev, section: e.target.value }))}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            fontSize: '14px'
                                        }}
                                    >
                                        <option value="">Select Section</option>
                                        <option value="A">Section A</option>
                                        <option value="B">Section B</option>
                                        <option value="C">Section C</option>
                                    </select>
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                        Semester *
                                    </label>
                                    <select
                                        value={formData.semester}
                                        onChange={(e) => setFormData(prev => ({ ...prev, semester: e.target.value }))}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            fontSize: '14px'
                                        }}
                                    >
                                        <option value="">Select Semester</option>
                                        <option value="1st Semester">1st Semester</option>
                                        <option value="2nd Semester">2nd Semester</option>
                                        <option value="3rd Semester">3rd Semester</option>
                                        <option value="4th Semester">4th Semester</option>
                                        <option value="5th Semester">5th Semester</option>
                                        <option value="6th Semester">6th Semester</option>
                                        <option value="7th Semester">7th Semester</option>
                                        <option value="8th Semester">8th Semester</option>
                                    </select>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                style={{
                                    background: 'linear-gradient(135deg, #32CD32, #228B22)',
                                    color: 'white',
                                    padding: '12px 32px',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontWeight: '600',
                                    cursor: isLoading ? 'not-allowed' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    opacity: isLoading ? 0.7 : 1
                                }}
                            >
                                {isLoading ? (
                                    <>
                                        <div style={{
                                            width: '16px',
                                            height: '16px',
                                            border: '2px solid rgba(255, 255, 255, 0.3)',
                                            borderRadius: '50%',
                                            borderTopColor: 'white',
                                            animation: 'spin 1s ease-in-out infinite'
                                        }} />
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        <Save size={16} />
                                        Create Timetable
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                )}

                {(currentView === 'view' || currentView === 'edit') && selectedTimetable && (
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '16px',
                        padding: '24px',
                        border: '1px solid rgba(34, 139, 34, 0.1)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
                    }}>
                        <div style={{ marginBottom: '24px' }}>
                            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>
                                {selectedTimetable.name}
                            </h2>
                            <div style={{ color: '#666', fontSize: '14px' }}>
                                {selectedTimetable.department} • {selectedTimetable.semester} • {selectedTimetable.academicYear}
                            </div>
                        </div>

                        {/* Timetable Grid */}
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{
                                width: '100%',
                                borderCollapse: 'collapse',
                                minWidth: '800px',
                                background: 'white',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                            }}>
                                <thead>
                                    <tr style={{ background: 'linear-gradient(135deg, #32CD32, #228B22)' }}>
                                        <th style={{
                                            padding: '12px',
                                            color: 'white',
                                            fontWeight: '600',
                                            textAlign: 'left',
                                            borderRight: '1px solid rgba(255, 255, 255, 0.2)'
                                        }}>
                                            Time / Day
                                        </th>
                                        {days.map(day => (
                                            <th key={day} style={{
                                                padding: '12px',
                                                color: 'white',
                                                fontWeight: '600',
                                                textAlign: 'center',
                                                borderRight: '1px solid rgba(255, 255, 255, 0.2)',
                                                minWidth: '120px'
                                            }}>
                                                {day}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {timeSlots.map((timeSlot, timeIndex) => (
                                        <tr key={timeSlot} style={{
                                            borderBottom: '1px solid #eee',
                                            background: timeIndex % 2 === 0 ? '#f9fafb' : 'white'
                                        }}>
                                            <td style={{
                                                padding: '12px',
                                                fontWeight: '600',
                                                color: '#333',
                                                borderRight: '1px solid #eee',
                                                background: timeSlot.includes('11:00 - 11:15') || timeSlot.includes('13:15 - 14:15') ? '#fef3c7' : 'inherit'
                                            }}>
                                                {timeSlot}
                                                {(timeSlot.includes('11:00 - 11:15') || timeSlot.includes('13:15 - 14:15')) && (
                                                    <div style={{ fontSize: '10px', color: '#92400e' }}>Break</div>
                                                )}
                                            </td>
                                            {days.map(day => {
                                                const daySchedule = selectedTimetable.schedule.find(s => s.day === day);
                                                const slot = daySchedule?.slots.find(s =>
                                                    `${s.startTime} - ${s.endTime}` === timeSlot ||
                                                    timeSlot.startsWith(s.startTime)
                                                );

                                                return (
                                                    <td key={`${day}-${timeSlot}`} style={{
                                                        padding: '8px',
                                                        borderRight: '1px solid #eee',
                                                        textAlign: 'center',
                                                        verticalAlign: 'top',
                                                        minHeight: '60px'
                                                    }}>
                                                        {slot ? (
                                                            <div style={{
                                                                background: slot.color || '#3b82f6',
                                                                color: 'white',
                                                                padding: '8px',
                                                                borderRadius: '6px',
                                                                minHeight: '50px',
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                justifyContent: 'center',
                                                                fontSize: '11px'
                                                            }}>
                                                                <div style={{ fontWeight: '600', marginBottom: '2px' }}>
                                                                    {slot.subject}
                                                                </div>
                                                                <div style={{ opacity: '0.9', marginBottom: '2px' }}>
                                                                    {slot.faculty}
                                                                </div>
                                                                <div style={{ opacity: '0.8', fontSize: '10px' }}>
                                                                    {slot.room}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            timeSlot.includes('11:00 - 11:15') || timeSlot.includes('13:15 - 14:15') ? (
                                                                <div style={{
                                                                    background: '#fbbf24',
                                                                    color: 'white',
                                                                    padding: '8px',
                                                                    borderRadius: '6px',
                                                                    fontSize: '11px',
                                                                    fontWeight: '600'
                                                                }}>
                                                                    {timeSlot.includes('13:15 - 14:15') ? 'Lunch Break' : 'Break'}
                                                                </div>
                                                            ) : null
                                                        )}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {currentView === 'edit' && (
                            <div style={{ marginTop: '24px', textAlign: 'center' }}>
                                <div style={{
                                    padding: '16px',
                                    background: 'rgba(34, 139, 34, 0.1)',
                                    borderRadius: '8px',
                                    color: '#228B22',
                                    fontSize: '14px'
                                }}>
                                    📝 Advanced timetable editing with drag-and-drop functionality coming soon!
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </>
    );
}

export default StaffTimetablesPage;
