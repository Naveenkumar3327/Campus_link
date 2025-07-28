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
    Plus,
    Filter,
    MapPin,
    Clock,
    Phone,
    Mail,
    Eye,
    MessageCircle,
    Upload,
    FileText,
    Trash2,
    Edit3,
    CheckCircle,
    AlertCircle
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

interface LostFoundItem {
    id: string;
    type: 'lost' | 'found';
    title: string;
    description: string;
    category: string;
    location: string;
    dateReported: string;
    dateOccurred: string;
    reporterName: string;
    reporterContact: string;
    reporterEmail: string;
    status: 'active' | 'resolved' | 'expired';
    attachments: File[];
    views: number;
    isMyItem: boolean;
}

interface NavigationItem {
    name: string;
    icon: React.ReactNode;
    path: string;
}

function LostFoundPage() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [activeItem, setActiveItem] = useState('Lost & Found');
    const [currentView, setCurrentView] = useState<'browse' | 'report'>('browse');
    const [activeTab, setActiveTab] = useState<'all' | 'lost' | 'found' | 'my-items'>('all');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedItem, setSelectedItem] = useState<LostFoundItem | null>(null);
    const [items, setItems] = useState<LostFoundItem[]>([]);

    // Form state for reporting items
    const [reportForm, setReportForm] = useState({
        type: 'lost' as 'lost' | 'found',
        title: '',
        description: '',
        category: '',
        location: '',
        dateOccurred: '',
        attachments: [] as File[]
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

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
        { name: 'Hostel Complaint', icon: <Building size={20} />, path: '/student/hostelcomplaint' },
        { name: 'Timetable Reminder', icon: <Calendar size={20} />, path: '/student/timetable' },
        { name: 'EduExchange', icon: <BookOpen size={20} />, path: '/student/edu-exchange' },
        { name: 'StudyConnect', icon: <Users size={20} />, path: '/student/study-connect' },
        { name: 'GrowTogether', icon: <TrendingUp size={20} />, path: '/student/grow-together' },
        { name: 'Profile', icon: <User size={20} />, path: '/student/profile' }
    ];

    const categories = [
        'Electronics',
        'Books & Stationery',
        'Accessories',
        'Clothing',
        'Sports Equipment',
        'ID Cards & Documents',
        'Personal Items',
        'Others'
    ];

    // Load items from localStorage on component mount
    useEffect(() => {
        const savedItems = localStorage.getItem('lostFoundItems');
        if (savedItems) {
            setItems(JSON.parse(savedItems));
        } else {
            // Add some demo items
            const demoItems: LostFoundItem[] = [
                {
                    id: 'LF001',
                    type: 'lost',
                    title: 'Blue Samsung Galaxy S21',
                    description: 'Lost my blue Samsung Galaxy S21 phone near the library. It has a clear case with my name sticker on the back. Very important as it contains all my academic notes and photos.',
                    category: 'Electronics',
                    location: 'Central Library - Ground Floor',
                    dateReported: '2025-01-25T14:30:00Z',
                    dateOccurred: '2025-01-25T12:00:00Z',
                    reporterName: 'Priya Sharma',
                    reporterContact: '+91 9876543210',
                    reporterEmail: 'priya.sharma@sece.ac.in',
                    status: 'active',
                    attachments: [],
                    views: 45,
                    isMyItem: false
                },
                {
                    id: 'LF002',
                    type: 'found',
                    title: 'Black Leather Wallet',
                    description: 'Found a black leather wallet in the canteen during lunch time. Contains some cash, cards, and student ID. Looking for the rightful owner.',
                    category: 'Personal Items',
                    location: 'College Canteen - Table 12',
                    dateReported: '2025-01-24T13:45:00Z',
                    dateOccurred: '2025-01-24T13:30:00Z',
                    reporterName: 'Rajesh Kumar',
                    reporterContact: '+91 9876543211',
                    reporterEmail: 'rajesh.kumar@sece.ac.in',
                    status: 'active',
                    attachments: [],
                    views: 67,
                    isMyItem: false
                },
                {
                    id: 'LF003',
                    type: 'lost',
                    title: 'Engineering Mathematics Textbook',
                    description: 'Lost my Engineering Mathematics textbook by B.S. Grewal. Has my name written on the first page and contains important notes for exams.',
                    category: 'Books & Stationery',
                    location: 'Classroom 201, Academic Block B',
                    dateReported: '2025-01-23T16:20:00Z',
                    dateOccurred: '2025-01-23T15:00:00Z',
                    reporterName: 'Ankit Verma',
                    reporterContact: '+91 9876543212',
                    reporterEmail: 'ankit.verma@sece.ac.in',
                    status: 'resolved',
                    attachments: [],
                    views: 23,
                    isMyItem: false
                },
                {
                    id: 'LF004',
                    type: 'found',
                    title: 'Silver Wrist Watch',
                    description: 'Found a silver wrist watch near the parking area. It appears to be a branded watch and looks expensive. Please contact if it belongs to you.',
                    category: 'Accessories',
                    location: 'Student Parking Area - Near Gate 2',
                    dateReported: '2025-01-22T09:15:00Z',
                    dateOccurred: '2025-01-22T08:30:00Z',
                    reporterName: 'Sneha Patel',
                    reporterContact: '+91 9876543213',
                    reporterEmail: 'sneha.patel@sece.ac.in',
                    status: 'active',
                    attachments: [],
                    views: 89,
                    isMyItem: false
                },
                {
                    id: 'LF005',
                    type: 'lost',
                    title: 'Red Nike Backpack',
                    description: 'Lost my red Nike backpack containing laptop, charger, and important project files. Last seen in the computer lab. Reward offered for safe return.',
                    category: 'Personal Items',
                    location: 'Computer Lab - 3rd Floor, IT Block',
                    dateReported: '2025-01-25T10:00:00Z',
                    dateOccurred: '2025-01-24T17:30:00Z',
                    reporterName: studentData.name,
                    reporterContact: studentData.phone || '',
                    reporterEmail: studentData.email,
                    status: 'active',
                    attachments: [],
                    views: 12,
                    isMyItem: true
                }
            ];

            setItems(demoItems);
            localStorage.setItem('lostFoundItems', JSON.stringify(demoItems));
        }
    }, [studentData]);

    const handleNavClick = (itemName: string, path?: string) => {
        setActiveItem(itemName);
        setIsSidebarOpen(false);

        if (path && path !== '/student/lost-found') {
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
        setReportForm(prev => ({ ...prev, [name]: value }));
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setReportForm(prev => ({
                ...prev,
                attachments: [...prev.attachments, ...newFiles]
            }));
        }
    };

    const removeAttachment = (index: number) => {
        setReportForm(prev => ({
            ...prev,
            attachments: prev.attachments.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!reportForm.title || !reportForm.description || !reportForm.category || !reportForm.location || !reportForm.dateOccurred) {
            alert('Please fill in all required fields.');
            return;
        }

        setIsSubmitting(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            const newItem: LostFoundItem = {
                id: `LF${String(items.length + 1).padStart(3, '0')}`,
                ...reportForm,
                dateReported: new Date().toISOString(),
                reporterName: studentData.name,
                reporterContact: studentData.phone || '',
                reporterEmail: studentData.email,
                status: 'active',
                views: 0,
                isMyItem: true
            };

            const updatedItems = [newItem, ...items];
            setItems(updatedItems);
            localStorage.setItem('lostFoundItems', JSON.stringify(updatedItems));

            // Reset form
            setReportForm({
                type: 'lost',
                title: '',
                description: '',
                category: '',
                location: '',
                dateOccurred: '',
                attachments: []
            });

            alert(`${reportForm.type === 'lost' ? 'Lost' : 'Found'} item reported successfully!`);
            setCurrentView('browse');
        } catch (error) {
            alert('Failed to report item. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const openItemModal = (item: LostFoundItem) => {
        // Increment view count if not own item
        if (!item.isMyItem) {
            const updatedItems = items.map(i =>
                i.id === item.id ? { ...i, views: i.views + 1 } : i
            );
            setItems(updatedItems);
            localStorage.setItem('lostFoundItems', JSON.stringify(updatedItems));
            item.views += 1;
        }
        setSelectedItem(item);
    };

    const closeItemModal = () => {
        setSelectedItem(null);
    };

    // Filter items based on active tab, search, and filters
    const filteredItems = items.filter(item => {
        const matchesTab = activeTab === 'all' ||
            (activeTab === 'lost' && item.type === 'lost') ||
            (activeTab === 'found' && item.type === 'found') ||
            (activeTab === 'my-items' && item.isMyItem);

        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.location.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

        return matchesTab && matchesSearch && matchesCategory;
    });

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

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'resolved':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'expired':
                return 'bg-gray-100 text-gray-800 border-gray-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getTypeColor = (type: string) => {
        return type === 'lost'
            ? 'bg-red-100 text-red-800 border-red-200'
            : 'bg-blue-100 text-blue-800 border-blue-200';
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            return 'Today';
        } else if (diffDays === 2) {
            return 'Yesterday';
        } else if (diffDays <= 7) {
            return `${diffDays - 1} days ago`;
        } else {
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        }
    };

    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const myItemsCount = items.filter(item => item.isMyItem).length;
    const lostItemsCount = items.filter(item => item.type === 'lost' && item.status === 'active').length;
    const foundItemsCount = items.filter(item => item.type === 'found' && item.status === 'active').length;

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
          margin-bottom: 20px;
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
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .toggle-btn.active {
          background: linear-gradient(135deg, #FF6969, #BB2525);
          color: white;
          box-shadow: 0 2px 8px rgba(255, 105, 105, 0.3);
        }

        .toggle-btn:not(.active) {
          color: #BB2525;
        }

        .stats-row {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(255, 105, 105, 0.1);
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          color: #BB2525;
        }

        /* Tabs */
        .tabs-section {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 24px;
          border: 1px solid rgba(255, 105, 105, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
        }

        .tabs-row {
          display: flex;
          gap: 16px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }

        .tab-btn {
          padding: 10px 20px;
          border: 1px solid #ddd;
          background: white;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .tab-btn.active {
          background: linear-gradient(135deg, #FF6969, #BB2525);
          color: white;
          border-color: #FF6969;
        }

        .tab-btn:not(.active):hover {
          background: rgba(255, 105, 105, 0.1);
        }

        .search-filter-row {
          display: flex;
          gap: 16px;
          align-items: center;
        }

        .search-input {
          flex: 1;
          padding: 10px 16px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 14px;
          transition: all 0.2s;
        }

        .search-input:focus {
          outline: none;
          border-color: #FF6969;
          box-shadow: 0 0 0 3px rgba(255, 105, 105, 0.1);
        }

        .filter-btn {
          padding: 10px 16px;
          background: linear-gradient(135deg, #FF6969, #BB2525);
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
        }

        .filter-btn:hover {
          box-shadow: 0 4px 12px rgba(255, 105, 105, 0.3);
        }

        .filter-select {
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 14px;
          background: white;
          display: ${showFilters ? 'block' : 'none'};
          margin-top: 16px;
        }

        .filter-select:focus {
          outline: none;
          border-color: #FF6969;
        }

        /* Form Section */
        .report-form {
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

        .type-options {
          display: flex;
          gap: 12px;
        }

        .type-option {
          flex: 1;
          padding: 12px;
          border: 2px solid #ddd;
          border-radius: 8px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
          font-weight: 500;
        }

        .type-option.selected {
          border-color: #FF6969;
          background: rgba(255, 105, 105, 0.1);
          color: #BB2525;
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

        /* Items Grid */
        .items-container {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          padding: 24px;
          border: 1px solid rgba(255, 105, 105, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
        }

        .items-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }

        .item-card {
          background: rgba(255, 255, 255, 0.8);
          border-radius: 12px;
          padding: 20px;
          border: 1px solid rgba(255, 105, 105, 0.1);
          transition: all 0.2s;
          cursor: pointer;
          position: relative;
        }

        .item-card:hover {
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }

        .item-card.my-item {
          border-left: 4px solid #FF6969;
        }

        .item-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }

        .item-badges {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .badge {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 600;
          border: 1px solid;
          text-transform: uppercase;
        }

        .item-title {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
          line-height: 1.3;
        }

        .item-description {
          color: #666;
          font-size: 14px;
          line-height: 1.5;
          margin-bottom: 12px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .item-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          color: #888;
          flex-wrap: wrap;
          gap: 8px;
        }

        .item-location {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .item-date {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .item-views {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 20px;
        }

        .modal-content {
          background: white;
          border-radius: 16px;
          padding: 0;
          max-width: 800px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
        }

        .modal-header {
          padding: 24px;
          border-bottom: 1px solid #eee;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
        }

        .modal-close {
          background: none;
          border: none;
          padding: 8px;
          border-radius: 8px;
          cursor: pointer;
          color: #666;
          transition: all 0.2s;
        }

        .modal-close:hover {
          background: rgba(255, 105, 105, 0.1);
          color: #BB2525;
        }

        .modal-body {
          padding: 24px;
        }

        .modal-title {
          font-size: 24px;
          font-weight: 700;
          color: #333;
          margin-bottom: 16px;
          line-height: 1.3;
        }

        .modal-badges {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }

        .modal-content-text {
          color: #333;
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .modal-info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 20px;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #666;
        }

        .contact-section {
          background: rgba(255, 105, 105, 0.05);
          border-radius: 12px;
          padding: 20px;
          margin-top: 20px;
        }

        .contact-title {
          font-size: 16px;
          font-weight: 600;
          color: #BB2525;
          margin-bottom: 12px;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #333;
        }

        .no-items {
          text-align: center;
          padding: 40px;
          color: #666;
        }

        .no-items-icon {
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

          .form-grid {
            grid-template-columns: 1fr;
          }

          .form-group.full-width {
            grid-column: span 1;
          }

          .type-options {
            flex-direction: column;
          }

          .tabs-row {
            flex-direction: column;
          }

          .search-filter-row {
            flex-direction: column;
          }

          .items-grid {
            grid-template-columns: 1fr;
          }

          .modal-content {
            margin: 10px;
            max-height: calc(100vh - 20px);
          }

          .modal-header {
            padding: 16px;
          }

          .modal-body {
            padding: 16px;
          }

          .modal-info-grid {
            grid-template-columns: 1fr;
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
                                    <Search size={24} />
                                </div>
                                Lost & Found
                            </h1>
                        </div>

                        <div className="view-toggle">
                            <button
                                className={`toggle-btn ${currentView === 'browse' ? 'active' : ''}`}
                                onClick={() => setCurrentView('browse')}
                            >
                                <Search size={16} />
                                Browse Items
                            </button>
                            <button
                                className={`toggle-btn ${currentView === 'report' ? 'active' : ''}`}
                                onClick={() => setCurrentView('report')}
                            >
                                <Plus size={16} />
                                Report Item
                            </button>
                        </div>
                    </div>

                    <div className="stats-row">
                        <div className="stat-item">
                            <AlertCircle size={16} />
                            <span>{lostItemsCount} Lost Items</span>
                        </div>
                        <div className="stat-item">
                            <CheckCircle size={16} />
                            <span>{foundItemsCount} Found Items</span>
                        </div>
                        <div className="stat-item">
                            <User size={16} />
                            <span>{myItemsCount} My Reports</span>
                        </div>
                    </div>
                </div>

                {/* Content Based on Current View */}
                {currentView === 'browse' ? (
                    <>
                        {/* Tabs and Search */}
                        <div className="tabs-section">
                            <div className="tabs-row">
                                <button
                                    className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('all')}
                                >
                                    All Items ({items.length})
                                </button>
                                <button
                                    className={`tab-btn ${activeTab === 'lost' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('lost')}
                                >
                                    <AlertCircle size={16} />
                                    Lost ({lostItemsCount})
                                </button>
                                <button
                                    className={`tab-btn ${activeTab === 'found' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('found')}
                                >
                                    <CheckCircle size={16} />
                                    Found ({foundItemsCount})
                                </button>
                                <button
                                    className={`tab-btn ${activeTab === 'my-items' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('my-items')}
                                >
                                    <User size={16} />
                                    My Reports ({myItemsCount})
                                </button>
                            </div>

                            <div className="search-filter-row">
                                <input
                                    type="text"
                                    placeholder="Search items by title, description, or location..."
                                    className="search-input"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button
                                    className="filter-btn"
                                    onClick={() => setShowFilters(!showFilters)}
                                >
                                    <Filter size={16} />
                                    Filters
                                </button>
                            </div>

                            <select
                                className="filter-select"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="all">All Categories</option>
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>

                        {/* Items Grid */}
                        <div className="items-container">
                            {filteredItems.length === 0 ? (
                                <div className="no-items">
                                    <div className="no-items-icon">
                                        <Search size={32} />
                                    </div>
                                    <h3>No Items Found</h3>
                                    <p>Try adjusting your search criteria or filters.</p>
                                </div>
                            ) : (
                                <div className="items-grid">
                                    {filteredItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className={`item-card ${item.isMyItem ? 'my-item' : ''}`}
                                            onClick={() => openItemModal(item)}
                                        >
                                            <div className="item-header">
                                                <div className="item-badges">
                                                    <span className={`badge ${getTypeColor(item.type)}`}>
                                                        {item.type === 'lost' ? <AlertCircle size={12} /> : <CheckCircle size={12} />}
                                                        {item.type}
                                                    </span>
                                                    <span className={`badge ${getStatusColor(item.status)}`}>
                                                        {item.status}
                                                    </span>
                                                </div>
                                            </div>

                                            <h3 className="item-title">{item.title}</h3>
                                            <p className="item-description">{item.description}</p>

                                            <div className="item-meta">
                                                <div className="item-location">
                                                    <MapPin size={12} />
                                                    <span>{item.location}</span>
                                                </div>
                                                <div className="item-date">
                                                    <Clock size={12} />
                                                    <span>{formatDate(item.dateReported)}</span>
                                                </div>
                                                <div className="item-views">
                                                    <Eye size={12} />
                                                    <span>{item.views}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    /* Report Form */
                    <div className="report-form">
                        <h2 style={{ marginBottom: '24px', color: '#333', fontSize: '20px', fontWeight: '600' }}>
                            Report Lost or Found Item
                        </h2>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">Item Type *</label>
                                <div className="type-options">
                                    <div
                                        className={`type-option ${reportForm.type === 'lost' ? 'selected' : ''}`}
                                        onClick={() => setReportForm(prev => ({ ...prev, type: 'lost' }))}
                                    >
                                        <AlertCircle size={20} style={{ margin: '0 auto 8px' }} />
                                        I Lost Something
                                    </div>
                                    <div
                                        className={`type-option ${reportForm.type === 'found' ? 'selected' : ''}`}
                                        onClick={() => setReportForm(prev => ({ ...prev, type: 'found' }))}
                                    >
                                        <CheckCircle size={20} style={{ margin: '0 auto 8px' }} />
                                        I Found Something
                                    </div>
                                </div>
                            </div>

                            <div className="form-grid">
                                <div className="form-group full-width">
                                    <label className="form-label">Item Title *</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={reportForm.title}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        placeholder="Brief description of the item (e.g., Blue Samsung Phone)"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Category *</label>
                                    <select
                                        name="category"
                                        value={reportForm.category}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Date {reportForm.type === 'lost' ? 'Lost' : 'Found'} *</label>
                                    <input
                                        type="date"
                                        name="dateOccurred"
                                        value={reportForm.dateOccurred}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        max={new Date().toISOString().split('T')[0]}
                                        required
                                    />
                                </div>

                                <div className="form-group full-width">
                                    <label className="form-label">Location *</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={reportForm.location}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        placeholder="Where did you lose/find this item?"
                                        required
                                    />
                                </div>

                                <div className="form-group full-width">
                                    <label className="form-label">Detailed Description *</label>
                                    <textarea
                                        name="description"
                                        value={reportForm.description}
                                        onChange={handleInputChange}
                                        className="form-input form-textarea"
                                        placeholder="Provide detailed information about the item including color, brand, distinctive features, etc."
                                        required
                                    />
                                </div>

                                <div className="form-group full-width">
                                    <label className="form-label">Attachments (Optional)</label>
                                    <div className="file-upload-area" onClick={() => document.getElementById('file-input')?.click()}>
                                        <div className="upload-icon">
                                            <Upload size={24} />
                                        </div>
                                        <div className="upload-text">Click to upload photos</div>
                                        <div className="upload-subtext">Images (Max 5MB each)</div>
                                    </div>
                                    <input
                                        id="file-input"
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleFileUpload}
                                        style={{ display: 'none' }}
                                    />

                                    {reportForm.attachments.length > 0 && (
                                        <div className="attachments-list">
                                            {reportForm.attachments.map((file, index) => (
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
                                <Plus size={16} />
                                {isSubmitting ? 'Submitting...' : `Report ${reportForm.type === 'lost' ? 'Lost' : 'Found'} Item`}
                            </button>
                        </form>
                    </div>
                )}
            </main>

            {/* Item Detail Modal */}
            {selectedItem && (
                <div className="modal-overlay" onClick={closeItemModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <div style={{ flex: 1 }}>
                                <div className="modal-badges">
                                    <span className={`badge ${getTypeColor(selectedItem.type)}`}>
                                        {selectedItem.type === 'lost' ? <AlertCircle size={12} /> : <CheckCircle size={12} />}
                                        {selectedItem.type}
                                    </span>
                                    <span className={`badge ${getStatusColor(selectedItem.status)}`}>
                                        {selectedItem.status}
                                    </span>
                                </div>
                            </div>
                            <button className="modal-close" onClick={closeItemModal}>
                                <X size={24} />
                            </button>
                        </div>

                        <div className="modal-body">
                            <h2 className="modal-title">{selectedItem.title}</h2>

                            <div className="modal-info-grid">
                                <div className="info-item">
                                    <MapPin size={16} />
                                    <span>{selectedItem.location}</span>
                                </div>
                                <div className="info-item">
                                    <Clock size={16} />
                                    <span>{selectedItem.type === 'lost' ? 'Lost' : 'Found'} on {formatDateTime(selectedItem.dateOccurred)}</span>
                                </div>
                                <div className="info-item">
                                    <Eye size={16} />
                                    <span>{selectedItem.views} views</span>
                                </div>
                                <div className="info-item">
                                    <BookOpen size={16} />
                                    <span>{selectedItem.category}</span>
                                </div>
                            </div>

                            <div className="modal-content-text">
                                {selectedItem.description}
                            </div>

                            {!selectedItem.isMyItem && (
                                <div className="contact-section">
                                    <h4 className="contact-title">Contact Information</h4>
                                    <div className="contact-info">
                                        <div className="contact-item">
                                            <User size={16} />
                                            <span>{selectedItem.reporterName}</span>
                                        </div>
                                        <div className="contact-item">
                                            <Phone size={16} />
                                            <span>{selectedItem.reporterContact}</span>
                                        </div>
                                        <div className="contact-item">
                                            <Mail size={16} />
                                            <span>{selectedItem.reporterEmail}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div style={{ fontSize: '12px', color: '#888', marginTop: '20px' }}>
                                Reported on {formatDateTime(selectedItem.dateReported)}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default LostFoundPage;
