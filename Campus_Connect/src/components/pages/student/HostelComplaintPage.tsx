import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Home,
    Bell,
    Search,
    Building,
    Calendar,
    BookOpen,
    Users,
    TrendingUp,
    User,
    Menu,
    X,
    GraduationCap,
    LogOut,
    ArrowLeft,
    MessageSquare,
    Clock,
    CheckCircle,
    AlertCircle,
    XCircle,
    Send,
    Upload,
    Camera,
    FileText,
    Trash2,
    Edit
} from 'lucide-react';

interface StudentData {
    name: string;
    rollNo: string;
    department: string;
    year: string;
    section: string;
    email: string;
    accommodation: string;
    block?: string;
    roomNo?: string;
    phone?: string;
}

interface ComplaintData {
    id: string;
    category: string;
    priority: 'low' | 'medium' | 'high';
    subject: string;
    description: string;
    location: string;
    attachments: File[];
    status: 'pending' | 'in-progress' | 'resolved' | 'rejected';
    submittedAt: string;
    updatedAt: string;
    response?: string;
}

interface NavigationItem {
    name: string;
    icon: React.ReactNode;
    path: string;
}

function HostelComplaintPage() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [activeItem, setActiveItem] = useState('Hostel Complaint');
    const [currentView, setCurrentView] = useState<'form' | 'history'>('form');

    // Form state
    const [complaintForm, setComplaintForm] = useState({
        category: '',
        priority: 'medium' as 'low' | 'medium' | 'high',
        subject: '',
        description: '',
        location: '',
        attachments: [] as File[]
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [complaints, setComplaints] = useState<ComplaintData[]>([]);

    // Get student data from localStorage
    const [studentData] = useState<StudentData>(() => {
        try {
            const userData = localStorage.getItem('userData');
            if (userData) {
                const parsed = JSON.parse(userData);
                return {
                    name: parsed.name || 'John Doe',
                    rollNo: parsed.rollNo || '20CS001',
                    department: parsed.department || 'Computer Science Engineering',
                    year: parsed.year || '3rd Year',
                    section: parsed.section || 'A',
                    email: parsed.email || 'student@sece.ac.in',
                    accommodation: parsed.accommodation || 'Hostel',
                    block: parsed.block || 'A Block',
                    roomNo: parsed.roomNo || 'A-201',
                    phone: parsed.phone || '+91 9876543210'
                };
            }
        } catch (error) {
            console.error('Error parsing user data:', error);
        }
        return {
            name: "John Doe",
            rollNo: "20CS001",
            department: "Computer Science Engineering",
            year: "3rd Year",
            section: "A",
            email: "student@sece.ac.in",
            accommodation: "Hostel",
            block: "A Block",
            roomNo: "A-201",
            phone: "+91 9876543210"
        };
    });

    const navigationItems: NavigationItem[] = [
        { name: 'Home', icon: <Home size={20} />, path: '/student/home' },
        { name: 'Announcements', icon: <Bell size={20} />, path: '/student/announcements' },
        { name: 'Lost & Found', icon: <Search size={20} />, path: '/student/lost-found' },
        { name: 'Hostel Complaint', icon: <Building size={20} />, path: '/student/hostel-complaint' },
        { name: 'Timetable Reminder', icon: <Calendar size={20} />, path: '/student/timetable' },
        { name: 'EduExchange', icon: <BookOpen size={20} />, path: '/student/edu-exchange' },
        { name: 'StudyConnect', icon: <Users size={20} />, path: '/student/study-connect' },
        { name: 'GrowTogether', icon: <TrendingUp size={20} />, path: '/student/grow-together' },
        { name: 'Profile', icon: <User size={20} />, path: '/student/profile' }
    ];

    const complaintCategories = [
        'Room Maintenance',
        'Electrical Issues',
        'Plumbing Problems',
        'Cleaning Services',
        'Food Quality',
        'Wi-Fi/Internet',
        'Security Issues',
        'Laundry Services',
        'Common Area Issues',
        'Other'
    ];

    // Load complaints from localStorage on component mount
    useEffect(() => {
        const savedComplaints = localStorage.getItem('hostelComplaints');
        if (savedComplaints) {
            setComplaints(JSON.parse(savedComplaints));
        } else {
            // Add some demo complaints
            const demoComplaints: ComplaintData[] = [
                {
                    id: 'CMP001',
                    category: 'Room Maintenance',
                    priority: 'high',
                    subject: 'Air Conditioner Not Working',
                    description: 'The AC in my room has stopped working. It\'s not cooling and making strange noises.',
                    location: 'A Block - Room 201',
                    attachments: [],
                    status: 'in-progress',
                    submittedAt: '2025-01-20T10:30:00Z',
                    updatedAt: '2025-01-21T14:20:00Z',
                    response: 'Maintenance team has been notified. They will visit your room tomorrow morning.'
                },
                {
                    id: 'CMP002',
                    category: 'Plumbing Problems',
                    priority: 'medium',
                    subject: 'Leaking Tap in Bathroom',
                    description: 'The tap in the bathroom is continuously leaking water.',
                    location: 'A Block - Room 201',
                    attachments: [],
                    status: 'resolved',
                    submittedAt: '2025-01-18T15:45:00Z',
                    updatedAt: '2025-01-19T11:30:00Z',
                    response: 'Issue has been resolved. New tap has been installed.'
                }
            ];
            setComplaints(demoComplaints);
            localStorage.setItem('hostelComplaints', JSON.stringify(demoComplaints));
        }
    }, []);

    const handleNavClick = (itemName: string, path?: string) => {
        setActiveItem(itemName);
        setIsSidebarOpen(false);

        if (path && path !== '/student/hostel-complaint') {
            navigate(path);
        }
    };

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('userData');
            navigate('/login');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setComplaintForm(prev => ({ ...prev, [name]: value }));
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setComplaintForm(prev => ({
                ...prev,
                attachments: [...prev.attachments, ...newFiles]
            }));
        }
    };

    const removeAttachment = (index: number) => {
        setComplaintForm(prev => ({
            ...prev,
            attachments: prev.attachments.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!complaintForm.category || !complaintForm.subject || !complaintForm.description) {
            alert('Please fill in all required fields.');
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            const newComplaint: ComplaintData = {
                id: `CMP${String(complaints.length + 1).padStart(3, '0')}`,
                ...complaintForm,
                location: `${studentData.block} - ${studentData.roomNo}`,
                status: 'pending',
                submittedAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            const updatedComplaints = [newComplaint, ...complaints];
            setComplaints(updatedComplaints);
            localStorage.setItem('hostelComplaints', JSON.stringify(updatedComplaints));

            // Reset form
            setComplaintForm({
                category: '',
                priority: 'medium',
                subject: '',
                description: '',
                location: '',
                attachments: []
            });

            alert('Complaint submitted successfully! You can track its status in the complaint history.');
            setCurrentView('history');
        } catch (error) {
            alert('Failed to submit complaint. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const getUserInitials = (name: string): string => {
        if (!name || typeof name !== 'string') return 'JD';
        const nameParts = name.trim().split(' ');
        if (nameParts.length === 1) {
            return nameParts[0].charAt(0).toUpperCase();
        }
        return nameParts
            .slice(0, 2)
            .map(part => part.charAt(0).toUpperCase())
            .join('');
    };

    const getFirstName = (name: string): string => {
        if (!name || typeof name !== 'string') return 'Student';
        return name.trim().split(' ')[0];
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending':
                return <Clock size={16} className="text-yellow-500" />;
            case 'in-progress':
                return <AlertCircle size={16} className="text-blue-500" />;
            case 'resolved':
                return <CheckCircle size={16} className="text-green-500" />;
            case 'rejected':
                return <XCircle size={16} className="text-red-500" />;
            default:
                return <Clock size={16} className="text-gray-500" />;
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
            case 'high':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'low':
                return 'bg-green-100 text-green-800 border-green-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <>
            <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: linear-gradient(135deg, #FFF5E0 0%, #FFEBEB 50%, #FFF5E0 100%);
          min-height: 100vh;
        }

        /* Top Navigation Bar */
        .top-navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 70px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 105, 105, 0.1);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          z-index: 1000;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
        }

        .navbar-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .menu-toggle {
          display: none;
          background: none;
          border: none;
          color: #BB2525;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          transition: background 0.2s;
        }

        .menu-toggle:hover {
          background: rgba(255, 105, 105, 0.1);
        }

        .sidebar-toggle {
          background: none;
          border: none;
          color: #BB2525;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sidebar-toggle:hover {
          background: rgba(255, 105, 105, 0.1);
        }

        .app-logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #FF6969, #BB2525);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .app-name {
          font-size: 24px;
          font-weight: 700;
          color: #BB2525;
          background: linear-gradient(135deg, #BB2525, #FF6969);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .navbar-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .notification-btn {
          position: relative;
          background: none;
          border: none;
          color: #666;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          transition: all 0.2s;
        }

        .notification-btn:hover {
          background: rgba(255, 105, 105, 0.1);
          color: #BB2525;
        }

        .notification-badge {
          position: absolute;
          top: 4px;
          right: 4px;
          background: linear-gradient(135deg, #FF6969, #BB2525);
          color: white;
          font-size: 10px;
          font-weight: 600;
          min-width: 18px;
          height: 18px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #333;
          font-weight: 500;
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #FF6969, #BB2525);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 14px;
        }

        /* Side Navigation */
        .sidebar {
          position: fixed;
          top: 70px;
          left: 0;
          width: ${(isSidebarCollapsed && !isHovering) ? '70px' : '280px'};
          height: calc(100vh - 70px);
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-right: 1px solid rgba(255, 105, 105, 0.1);
          padding: 24px 0;
          overflow-y: auto;
          overflow-x: hidden;
          z-index: 999;
          transition: all 0.3s ease;
          box-shadow: 2px 0 10px rgba(0, 0, 0, 0.08);
        }

        .sidebar.closed {
          transform: translateX(-100%);
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 24px;
          color: #666;
          text-decoration: none;
          transition: all 0.3s ease;
          cursor: pointer;
          border-left: 3px solid transparent;
          font-weight: 500;
          position: relative;
          white-space: nowrap;
        }

        .nav-item:hover {
          background: rgba(255, 105, 105, 0.05);
          color: #BB2525;
          border-left-color: rgba(255, 105, 105, 0.3);
        }

        .nav-item.active {
          background: rgba(255, 105, 105, 0.1);
          color: #BB2525;
          border-left-color: #FF6969;
        }

        .nav-item.active .nav-icon {
          color: #FF6969;
        }

        .nav-icon {
          transition: color 0.3s ease;
          flex-shrink: 0;
        }

        .nav-text {
          font-size: 15px;
          opacity: ${(isSidebarCollapsed && !isHovering) ? '0' : '1'};
          transition: opacity 0.3s ease;
        }

        .logout-section {
          position: absolute;
          bottom: 24px;
          left: 0;
          right: 0;
          padding: 0 24px;
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 12px 16px;
          width: 100%;
          background: none;
          border: 1px solid rgba(255, 105, 105, 0.2);
          border-radius: 8px;
          color: #666;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
          white-space: nowrap;
        }

        .logout-btn:hover {
          background: rgba(255, 105, 105, 0.1);
          color: #BB2525;
          border-color: #FF6969;
        }

        .logout-text {
          opacity: ${(isSidebarCollapsed && !isHovering) ? '0' : '1'};
          transition: opacity 0.3s ease;
        }

        /* Main Content Area */
        .main-content {
          margin-left: ${(window.innerWidth <= 768) ? '0px' : ((isSidebarCollapsed && !isHovering) ? '70px' : '280px')};
          margin-top: 70px;
          padding: 24px;
          min-height: calc(100vh - 70px);
          transition: margin-left 0.3s ease;
          width: calc(100vw - ${(window.innerWidth <= 768) ? '0px' : ((isSidebarCollapsed && !isHovering) ? '70px' : '280px')});
          max-width: calc(100vw - ${(window.innerWidth <= 768) ? '0px' : ((isSidebarCollapsed && !isHovering) ? '70px' : '280px')});
          box-sizing: border-box;
        }

        /* Header Section */
        .page-header {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 24px;
          border: 1px solid rgba(255, 105, 105, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .back-btn {
          background: none;
          border: none;
          color: #666;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .back-btn:hover {
          background: rgba(255, 105, 105, 0.1);
          color: #BB2525;
        }

        .page-title {
          font-size: 28px;
          font-weight: 700;
          color: #BB2525;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .title-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #FF6969, #BB2525);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .view-toggle {
          display: flex;
          background: #FFF5E0;
          border-radius: 8px;
          padding: 4px;
        }

        .toggle-btn {
          padding: 8px 16px;
          border: none;
          background: none;
          cursor: pointer;
          border-radius: 6px;
          font-weight: 500;
          transition: all 0.2s;
        }

        .toggle-btn.active {
          background: linear-gradient(135deg, #FF6969, #BB2525);
          color: white;
          box-shadow: 0 2px 8px rgba(255, 105, 105, 0.3);
        }

        .toggle-btn:not(.active) {
          color: #BB2525;
        }

        /* Form Section */
        .complaint-form {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          padding: 32px;
          border: 1px solid rgba(255, 105, 105, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group.full-width {
          grid-column: span 2;
        }

        .form-label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #333;
          font-size: 14px;
        }

        .form-input {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 14px;
          transition: all 0.2s;
          background: rgba(255, 255, 255, 0.8);
        }

        .form-input:focus {
          outline: none;
          border-color: #FF6969;
          box-shadow: 0 0 0 3px rgba(255, 105, 105, 0.1);
          background: white;
        }

        .form-textarea {
          min-height: 100px;
          resize: vertical;
        }

        .priority-options {
          display: flex;
          gap: 12px;
        }

        .priority-option {
          flex: 1;
          padding: 12px;
          border: 2px solid #ddd;
          border-radius: 8px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
          font-weight: 500;
        }

        .priority-option.selected {
          border-color: #FF6969;
          background: rgba(255, 105, 105, 0.1);
          color: #BB2525;
        }

        .priority-option.high.selected {
          border-color: #ef4444;
          background: rgba(239, 68, 68, 0.1);
          color: #dc2626;
        }

        .priority-option.medium.selected {
          border-color: #f59e0b;
          background: rgba(245, 158, 11, 0.1);
          color: #d97706;
        }

        .priority-option.low.selected {
          border-color: #22c55e;
          background: rgba(34, 197, 94, 0.1);
          color: #16a34a;
        }

        /* File Upload */
        .file-upload-area {
          border: 2px dashed #ddd;
          border-radius: 8px;
          padding: 20px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .file-upload-area:hover {
          border-color: #FF6969;
          background: rgba(255, 105, 105, 0.05);
        }

        .file-upload-area.dragover {
          border-color: #FF6969;
          background: rgba(255, 105, 105, 0.1);
        }

        .upload-icon {
          width: 48px;
          height: 48px;
          margin: 0 auto 12px;
          background: linear-gradient(135deg, #FF6969, #BB2525);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .upload-text {
          font-weight: 500;
          color: #333;
          margin-bottom: 4px;
        }

        .upload-subtext {
          font-size: 12px;
          color: #666;
        }

        .attachments-list {
          margin-top: 16px;
        }

        .attachment-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 6px;
          margin-bottom: 8px;
          border: 1px solid #eee;
        }

        .attachment-info {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .remove-attachment {
          background: none;
          border: none;
          color: #ef4444;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          transition: all 0.2s;
        }

        .remove-attachment:hover {
          background: rgba(239, 68, 68, 0.1);
        }

        /* Submit Button */
        .submit-btn {
          background: linear-gradient(135deg, #FF6969, #BB2525);
          color: white;
          padding: 12px 32px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 20px;
        }

        .submit-btn:hover:not(:disabled) {
          box-shadow: 0 4px 16px rgba(255, 105, 105, 0.4);
          transform: translateY(-2px);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        /* History Section */
        .complaints-history {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          padding: 32px;
          border: 1px solid rgba(255, 105, 105, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
        }

        .complaints-grid {
          display: grid;
          gap: 20px;
        }

        .complaint-card {
          background: rgba(255, 255, 255, 0.8);
          border-radius: 12px;
          padding: 20px;
          border: 1px solid rgba(255, 105, 105, 0.1);
          transition: all 0.2s;
        }

        .complaint-card:hover {
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }

        .complaint-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }

        .complaint-id {
          font-size: 12px;
          color: #666;
          font-weight: 600;
        }

        .status-badge {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
          border: 1px solid;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .priority-badge {
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 600;
          border: 1px solid;
          text-transform: uppercase;
        }

        .complaint-title {
          font-size: 16px;
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
        }

        .complaint-description {
          color: #666;
          font-size: 14px;
          line-height: 1.5;
          margin-bottom: 12px;
        }

        .complaint-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          color: #888;
          margin-bottom: 12px;
        }

        .complaint-response {
          background: rgba(255, 105, 105, 0.05);
          border-radius: 8px;
          padding: 12px;
          border-left: 3px solid #FF6969;
          margin-top: 12px;
        }

        .response-label {
          font-size: 12px;
          font-weight: 600;
          color: #BB2525;
          margin-bottom: 4px;
        }

        .response-text {
          font-size: 14px;
          color: #333;
          line-height: 1.4;
        }

        .no-complaints {
          text-align: center;
          padding: 40px;
          color: #666;
        }

        .no-complaints-icon {
          width: 64px;
          height: 64px;
          margin: 0 auto 16px;
          background: linear-gradient(135deg, #FF6969, #BB2525);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          opacity: 0.7;
        }

        /* Mobile Responsiveness */
        @media (max-width: 768px) {
          .menu-toggle {
            display: block;
          }

          .sidebar-toggle {
            display: none;
          }

          .sidebar {
            transform: translateX(-100%);
            width: 280px !important;
          }

          .sidebar.open {
            transform: translateX(0);
          }

          .main-content {
            margin-left: 0 !important;
            width: 100vw !important;
            max-width: 100vw !important;
            padding: 16px;
          }

          .page-title {
            font-size: 24px;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .form-group.full-width {
            grid-column: span 1;
          }

          .priority-options {
            flex-direction: column;
          }

          .header-content {
            flex-direction: column;
            align-items: flex-start;
          }

          .view-toggle {
            width: 100%;
          }

          .toggle-btn {
            flex: 1;
          }
        }

        /* Loading Spinner */
        .loading-spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
          margin-right: 8px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Sidebar Overlay */
        .sidebar-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 998;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }

        .sidebar-overlay.active {
          opacity: 1;
          visibility: visible;
        }
      `}</style>

            {/* Top Navigation Bar */}
            <nav className="top-navbar">
                <div className="navbar-left">
                    <button
                        className="menu-toggle"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        aria-label="Toggle navigation menu"
                    >
                        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    <button
                        className="sidebar-toggle"
                        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                        aria-label="Toggle sidebar collapse"
                    >
                        <Menu size={24} />
                    </button>

                    <div className="app-logo">
                        <div className="logo-icon">
                            <GraduationCap size={24} />
                        </div>
                        <div className="app-name">CampusLink</div>
                    </div>
                </div>

                <div className="navbar-right">
                    <button className="notification-btn" aria-label="View notifications">
                        <Bell size={20} />
                        <span className="notification-badge">5</span>
                    </button>

                    <div className="user-info">
                        <div className="user-avatar">
                            {getUserInitials(studentData.name)}
                        </div>
                        <span>{getFirstName(studentData.name)}</span>
                    </div>
                </div>
            </nav>

            {/* Sidebar Overlay for Mobile */}
            <div
                className={`sidebar-overlay ${isSidebarOpen ? 'active' : ''}`}
                onClick={() => setIsSidebarOpen(false)}
                aria-hidden="true"
            />

            {/* Side Navigation */}
            <nav
                className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''} ${isSidebarOpen ? 'open' : window.innerWidth <= 768 ? 'closed' : ''}`}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                {navigationItems.map((item) => (
                    <div
                        key={item.name}
                        className={`nav-item ${activeItem === item.name ? 'active' : ''}`}
                        onClick={() => handleNavClick(item.name, item.path)}
                        role="button"
                        tabIndex={0}
                    >
                        <div className="nav-icon">{item.icon}</div>
                        <div className="nav-text">{item.name}</div>
                    </div>
                ))}

                <div className="logout-section">
                    <button className="logout-btn" onClick={handleLogout}>
                        <LogOut size={18} />
                        <span className="logout-text">Logout</span>
                    </button>
                </div>
            </nav>

            {/* Main Content Area */}
            <main className="main-content">
                {/* Page Header */}
                <div className="page-header">
                    <div className="header-content">
                        <div className="header-left">
                            <button className="back-btn" onClick={() => navigate('/student/home')}>
                                <ArrowLeft size={20} />
                                <span>Back to Home</span>
                            </button>
                            <h1 className="page-title">
                                <div className="title-icon">
                                    <Building size={24} />
                                </div>
                                Hostel Complaint System
                            </h1>
                        </div>

                        <div className="view-toggle">
                            <button
                                className={`toggle-btn ${currentView === 'form' ? 'active' : ''}`}
                                onClick={() => setCurrentView('form')}
                            >
                                New Complaint
                            </button>
                            <button
                                className={`toggle-btn ${currentView === 'history' ? 'active' : ''}`}
                                onClick={() => setCurrentView('history')}
                            >
                                Complaint History
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content Based on Current View */}
                {currentView === 'form' ? (
                    /* Complaint Form */
                    <div className="complaint-form">
                        <h2 style={{ marginBottom: '24px', color: '#333', fontSize: '20px', fontWeight: '600' }}>
                            Submit New Complaint
                        </h2>

                        <form onSubmit={handleSubmit}>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label className="form-label">Category *</label>
                                    <select
                                        name="category"
                                        value={complaintForm.category}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        {complaintCategories.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Priority Level</label>
                                    <div className="priority-options">
                                        {(['low', 'medium', 'high'] as const).map(priority => (
                                            <div
                                                key={priority}
                                                className={`priority-option ${priority} ${complaintForm.priority === priority ? 'selected' : ''}`}
                                                onClick={() => setComplaintForm(prev => ({ ...prev, priority }))}
                                            >
                                                {priority.charAt(0).toUpperCase() + priority.slice(1)}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="form-group full-width">
                                    <label className="form-label">Subject *</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={complaintForm.subject}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        placeholder="Brief description of the issue"
                                        required
                                    />
                                </div>

                                <div className="form-group full-width">
                                    <label className="form-label">Detailed Description *</label>
                                    <textarea
                                        name="description"
                                        value={complaintForm.description}
                                        onChange={handleInputChange}
                                        className="form-input form-textarea"
                                        placeholder="Please provide detailed information about the issue, including when it started, how it affects you, and any other relevant details..."
                                        required
                                    />
                                </div>

                                <div className="form-group full-width">
                                    <label className="form-label">Location</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={`${studentData.block} - ${studentData.roomNo}`}
                                        className="form-input"
                                        disabled
                                        style={{ background: '#f8f9fa', color: '#666' }}
                                    />
                                </div>

                                <div className="form-group full-width">
                                    <label className="form-label">Attachments (Optional)</label>
                                    <div className="file-upload-area" onClick={() => document.getElementById('file-input')?.click()}>
                                        <div className="upload-icon">
                                            <Upload size={24} />
                                        </div>
                                        <div className="upload-text">Click to upload files</div>
                                        <div className="upload-subtext">Images, documents (Max 5MB each)</div>
                                    </div>
                                    <input
                                        id="file-input"
                                        type="file"
                                        multiple
                                        accept="image/*,.pdf,.doc,.docx"
                                        onChange={handleFileUpload}
                                        style={{ display: 'none' }}
                                    />

                                    {complaintForm.attachments.length > 0 && (
                                        <div className="attachments-list">
                                            {complaintForm.attachments.map((file, index) => (
                                                <div key={index} className="attachment-item">
                                                    <div className="attachment-info">
                                                        <FileText size={16} />
                                                        <span>{file.name}</span>
                                                        <span style={{ fontSize: '12px', color: '#666' }}>
                                                            ({(file.size / 1024 / 1024).toFixed(1)} MB)
                                                        </span>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="remove-attachment"
                                                        onClick={() => removeAttachment(index)}
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="submit-btn"
                                disabled={isSubmitting}
                            >
                                {isSubmitting && <span className="loading-spinner"></span>}
                                <Send size={16} />
                                {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
                            </button>
                        </form>
                    </div>
                ) : (
                    /* Complaint History */
                    <div className="complaints-history">
                        <h2 style={{ marginBottom: '24px', color: '#333', fontSize: '20px', fontWeight: '600' }}>
                            Your Complaint History
                        </h2>

                        {complaints.length === 0 ? (
                            <div className="no-complaints">
                                <div className="no-complaints-icon">
                                    <MessageSquare size={32} />
                                </div>
                                <h3>No Complaints Found</h3>
                                <p>You haven't submitted any complaints yet. Click on "New Complaint" to submit your first complaint.</p>
                            </div>
                        ) : (
                            <div className="complaints-grid">
                                {complaints.map((complaint) => (
                                    <div key={complaint.id} className="complaint-card">
                                        <div className="complaint-header">
                                            <div>
                                                <div className="complaint-id">#{complaint.id}</div>
                                                <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                                                    <span className={`priority-badge ${getPriorityColor(complaint.priority)}`}>
                                                        {complaint.priority}
                                                    </span>
                                                </div>
                                            </div>
                                            <span className={`status-badge ${getStatusColor(complaint.status)}`}>
                                                {getStatusIcon(complaint.status)}
                                                {complaint.status.replace('-', ' ')}
                                            </span>
                                        </div>

                                        <h3 className="complaint-title">{complaint.subject}</h3>
                                        <p className="complaint-description">{complaint.description}</p>

                                        <div className="complaint-meta">
                                            <span>📍 {complaint.location}</span>
                                            <span>📂 {complaint.category}</span>
                                        </div>

                                        <div className="complaint-meta">
                                            <span>Submitted: {formatDate(complaint.submittedAt)}</span>
                                            <span>Updated: {formatDate(complaint.updatedAt)}</span>
                                        </div>

                                        {complaint.response && (
                                            <div className="complaint-response">
                                                <div className="response-label">Staff Response:</div>
                                                <div className="response-text">{complaint.response}</div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </main>
        </>
    );
}

export default HostelComplaintPage;
