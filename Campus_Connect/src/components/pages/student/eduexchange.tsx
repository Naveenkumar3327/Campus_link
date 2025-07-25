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
    Star,
    MessageCircle,
    Download,
    Upload,
    Edit3,
    Trash2,
    Eye,
    Share2,
    Heart,
    Clock,
    Tag,
    FileText,
    Image as ImageIcon,
    Video,
    Link as LinkIcon,
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

interface EduResource {
    id: string;
    title: string;
    description: string;
    category: string;
    subject: string;
    type: 'notes' | 'assignment' | 'project' | 'book' | 'video' | 'link' | 'question-paper';
    fileUrl?: string;
    linkUrl?: string;
    thumbnailUrl?: string;
    uploaderName: string;
    uploaderEmail: string;
    uploadDate: string;
    downloads: number;
    likes: number;
    views: number;
    tags: string[];
    semester: string;
    year: string;
    department: string;
    isMyResource: boolean;
    isLiked: boolean;
    status: 'pending' | 'approved' | 'rejected';
    fileSize?: string;
    rating: number;
    reviews: Review[];
}

interface Review {
    id: string;
    reviewerName: string;
    rating: number;
    comment: string;
    date: string;
}

interface NavigationItem {
    name: string;
    icon: React.ReactNode;
    path: string;
}

function EduExchangePage() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [activeItem, setActiveItem] = useState('EduExchange');
    const [currentView, setCurrentView] = useState<'browse' | 'upload' | 'my-resources'>('browse');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedSubject, setSelectedSubject] = useState<string>('all');
    const [selectedType, setSelectedType] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedResource, setSelectedResource] = useState<EduResource | null>(null);
    const [resources, setResources] = useState<EduResource[]>([]);
    const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'rating'>('recent');

    // Upload form state
    const [uploadForm, setUploadForm] = useState({
        title: '',
        description: '',
        category: '',
        subject: '',
        type: 'notes' as 'notes' | 'assignment' | 'project' | 'book' | 'video' | 'link' | 'question-paper',
        semester: '',
        tags: '',
        linkUrl: '',
        file: null as File | null
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
        'Academic Notes',
        'Assignments',
        'Projects',
        'Reference Books',
        'Video Lectures',
        'Question Papers',
        'Study Materials',
        'Research Papers'
    ];

    const subjects = [
        'Data Structures',
        'Database Management',
        'Computer Networks',
        'Operating Systems',
        'Software Engineering',
        'Computer Architecture',
        'Mathematics III',
        'Professional Communication',
        'Environmental Studies'
    ];

    const resourceTypes = [
        { value: 'notes', label: 'Notes', icon: <FileText size={16} /> },
        { value: 'assignment', label: 'Assignment', icon: <Edit3 size={16} /> },
        { value: 'project', label: 'Project', icon: <Star size={16} /> },
        { value: 'book', label: 'Book', icon: <BookOpen size={16} /> },
        { value: 'video', label: 'Video', icon: <Video size={16} /> },
        { value: 'link', label: 'Link', icon: <LinkIcon size={16} /> },
        { value: 'question-paper', label: 'Question Paper', icon: <FileText size={16} /> }
    ];

    // Load resources from localStorage
    useEffect(() => {
        const savedResources = localStorage.getItem('eduExchangeResources');
        if (savedResources) {
            setResources(JSON.parse(savedResources));
        } else {
            // Default resources data
            const defaultResources: EduResource[] = [
                {
                    id: 'EDU001',
                    title: 'Data Structures Complete Notes',
                    description: 'Comprehensive notes covering all topics in Data Structures including Arrays, Linked Lists, Stacks, Queues, Trees, and Graphs. Includes examples and practice problems.',
                    category: 'Academic Notes',
                    subject: 'Data Structures',
                    type: 'notes',
                    fileUrl: '#',
                    uploaderName: 'Priya Sharma',
                    uploaderEmail: 'priya.sharma@sece.ac.in',
                    uploadDate: '2025-01-20T10:30:00Z',
                    downloads: 156,
                    likes: 34,
                    views: 245,
                    tags: ['arrays', 'linked-lists', 'trees', 'algorithms'],
                    semester: '3rd Semester',
                    year: '2nd Year',
                    department: 'Computer Science Engineering',
                    isMyResource: false,
                    isLiked: false,
                    status: 'approved',
                    fileSize: '2.5 MB',
                    rating: 4.5,
                    reviews: [
                        {
                            id: 'rev1',
                            reviewerName: 'Rahul Kumar',
                            rating: 5,
                            comment: 'Excellent notes! Very helpful for exam preparation.',
                            date: '2025-01-21T15:30:00Z'
                        }
                    ]
                },
                {
                    id: 'EDU002',
                    title: 'DBMS Lab Assignment Solutions',
                    description: 'Complete solutions for all DBMS lab assignments including SQL queries, database design, and normalization examples. Well documented with explanations.',
                    category: 'Assignments',
                    subject: 'Database Management',
                    type: 'assignment',
                    fileUrl: '#',
                    uploaderName: 'Ankit Verma',
                    uploaderEmail: 'ankit.verma@sece.ac.in',
                    uploadDate: '2025-01-18T14:15:00Z',
                    downloads: 89,
                    likes: 28,
                    views: 134,
                    tags: ['sql', 'database', 'normalization', 'queries'],
                    semester: '5th Semester',
                    year: '3rd Year',
                    department: 'Computer Science Engineering',
                    isMyResource: false,
                    isLiked: true,
                    status: 'approved',
                    fileSize: '1.8 MB',
                    rating: 4.2,
                    reviews: []
                },
                {
                    id: 'EDU003',
                    title: 'E-Commerce Website Project',
                    description: 'Complete source code for an e-commerce website built with React.js and Node.js. Includes user authentication, product management, cart functionality, and payment integration.',
                    category: 'Projects',
                    subject: 'Software Engineering',
                    type: 'project',
                    fileUrl: '#',
                    uploaderName: 'Sneha Patel',
                    uploaderEmail: 'sneha.patel@sece.ac.in',
                    uploadDate: '2025-01-15T09:45:00Z',
                    downloads: 67,
                    likes: 45,
                    views: 189,
                    tags: ['react', 'nodejs', 'ecommerce', 'fullstack'],
                    semester: '6th Semester',
                    year: '3rd Year',
                    department: 'Computer Science Engineering',
                    isMyResource: false,
                    isLiked: false,
                    status: 'approved',
                    fileSize: '15.2 MB',
                    rating: 4.8,
                    reviews: []
                },
                {
                    id: 'EDU004',
                    title: 'Computer Networks Video Lectures',
                    description: 'Series of video lectures covering OSI model, TCP/IP, routing protocols, and network security. Perfect for visual learners.',
                    category: 'Video Lectures',
                    subject: 'Computer Networks',
                    type: 'video',
                    linkUrl: 'https://youtube.com/playlist',
                    uploaderName: 'Dr. Rajesh Kumar',
                    uploaderEmail: 'rajesh.kumar@sece.ac.in',
                    uploadDate: '2025-01-12T16:20:00Z',
                    downloads: 0,
                    likes: 78,
                    views: 356,
                    tags: ['networking', 'osi-model', 'tcp-ip', 'protocols'],
                    semester: '4th Semester',
                    year: '2nd Year',
                    department: 'Computer Science Engineering',
                    isMyResource: false,
                    isLiked: true,
                    status: 'approved',
                    rating: 4.6,
                    reviews: []
                },
                {
                    id: 'EDU005',
                    title: 'My OS Lab Manual',
                    description: 'Complete lab manual for Operating Systems with all programs and explanations. Covers process scheduling, memory management, and file systems.',
                    category: 'Academic Notes',
                    subject: 'Operating Systems',
                    type: 'notes',
                    fileUrl: '#',
                    uploaderName: studentData.name,
                    uploaderEmail: studentData.email,
                    uploadDate: '2025-01-25T11:00:00Z',
                    downloads: 23,
                    likes: 12,
                    views: 45,
                    tags: ['os', 'scheduling', 'memory', 'filesystem'],
                    semester: '4th Semester',
                    year: '2nd Year',
                    department: 'Computer Science Engineering',
                    isMyResource: true,
                    isLiked: false,
                    status: 'approved',
                    fileSize: '3.1 MB',
                    rating: 4.0,
                    reviews: []
                },
                {
                    id: 'EDU006',
                    title: 'Previous Year Question Papers - DS',
                    description: 'Collection of previous year question papers for Data Structures from 2020-2024. Includes answer keys and marking schemes.',
                    category: 'Question Papers',
                    subject: 'Data Structures',
                    type: 'question-paper',
                    fileUrl: '#',
                    uploaderName: 'Kavita Joshi',
                    uploaderEmail: 'kavita.joshi@sece.ac.in',
                    uploadDate: '2025-01-10T13:30:00Z',
                    downloads: 234,
                    likes: 89,
                    views: 445,
                    tags: ['question-papers', 'previous-year', 'exam', 'data-structures'],
                    semester: '3rd Semester',
                    year: '2nd Year',
                    department: 'Computer Science Engineering',
                    isMyResource: false,
                    isLiked: false,
                    status: 'approved',
                    fileSize: '5.7 MB',
                    rating: 4.7,
                    reviews: []
                }
            ];

            setResources(defaultResources);
            localStorage.setItem('eduExchangeResources', JSON.stringify(defaultResources));
        }
    }, [studentData]);

    const handleNavClick = (itemName: string, path?: string) => {
        setActiveItem(itemName);
        setIsSidebarOpen(false);

        if (path && path !== '/student/edu-exchange') {
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
        setUploadForm(prev => ({ ...prev, [name]: value }));
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setUploadForm(prev => ({ ...prev, file: e.target.files![0] }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!uploadForm.title || !uploadForm.description || !uploadForm.category || !uploadForm.subject) {
            alert('Please fill in all required fields.');
            return;
        }

        if (uploadForm.type !== 'link' && !uploadForm.file) {
            alert('Please upload a file or provide a link.');
            return;
        }

        if (uploadForm.type === 'link' && !uploadForm.linkUrl) {
            alert('Please provide a valid link URL.');
            return;
        }

        setIsSubmitting(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            const newResource: EduResource = {
                id: `EDU${String(resources.length + 1).padStart(3, '0')}`,
                title: uploadForm.title,
                description: uploadForm.description,
                category: uploadForm.category,
                subject: uploadForm.subject,
                type: uploadForm.type,
                fileUrl: uploadForm.type !== 'link' ? '#' : undefined,
                linkUrl: uploadForm.type === 'link' ? uploadForm.linkUrl : undefined,
                uploaderName: studentData.name,
                uploaderEmail: studentData.email,
                uploadDate: new Date().toISOString(),
                downloads: 0,
                likes: 0,
                views: 0,
                tags: uploadForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
                semester: uploadForm.semester,
                year: studentData.year,
                department: studentData.department,
                isMyResource: true,
                isLiked: false,
                status: 'approved',
                fileSize: uploadForm.file ? `${(uploadForm.file.size / 1024 / 1024).toFixed(1)} MB` : undefined,
                rating: 0,
                reviews: []
            };

            const updatedResources = [newResource, ...resources];
            setResources(updatedResources);
            localStorage.setItem('eduExchangeResources', JSON.stringify(updatedResources));

            // Reset form
            setUploadForm({
                title: '',
                description: '',
                category: '',
                subject: '',
                type: 'notes',
                semester: '',
                tags: '',
                linkUrl: '',
                file: null
            });

            alert('Resource uploaded successfully!');
            setCurrentView('browse');
        } catch (error) {
            alert('Failed to upload resource. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const toggleLike = (resourceId: string) => {
        const updatedResources = resources.map(resource => {
            if (resource.id === resourceId) {
                return {
                    ...resource,
                    isLiked: !resource.isLiked,
                    likes: resource.isLiked ? resource.likes - 1 : resource.likes + 1
                };
            }
            return resource;
        });
        setResources(updatedResources);
        localStorage.setItem('eduExchangeResources', JSON.stringify(updatedResources));
    };

    const incrementViews = (resourceId: string) => {
        const updatedResources = resources.map(resource => {
            if (resource.id === resourceId) {
                return { ...resource, views: resource.views + 1 };
            }
            return resource;
        });
        setResources(updatedResources);
        localStorage.setItem('eduExchangeResources', JSON.stringify(updatedResources));
    };

    const openResourceModal = (resource: EduResource) => {
        incrementViews(resource.id);
        setSelectedResource(resource);
    };

    const closeResourceModal = () => {
        setSelectedResource(null);
    };

    // Filter and sort resources
    const filteredResources = resources.filter(resource => {
        const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
        const matchesSubject = selectedSubject === 'all' || resource.subject === selectedSubject;
        const matchesType = selectedType === 'all' || resource.type === selectedType;

        const matchesView = currentView === 'browse' ||
            (currentView === 'my-resources' && resource.isMyResource);

        return matchesSearch && matchesCategory && matchesSubject && matchesType && matchesView;
    }).sort((a, b) => {
        switch (sortBy) {
            case 'popular':
                return (b.downloads + b.likes) - (a.downloads + a.likes);
            case 'rating':
                return b.rating - a.rating;
            case 'recent':
            default:
                return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
        }
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

    const getTypeIcon = (type: string) => {
        const typeObj = resourceTypes.find(t => t.value === type);
        return typeObj?.icon || <FileText size={16} />;
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'notes':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'assignment':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'project':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'book':
                return 'bg-orange-100 text-orange-800 border-orange-200';
            case 'video':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'link':
                return 'bg-indigo-100 text-indigo-800 border-indigo-200';
            case 'question-paper':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
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

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, index) => (
            <Star
                key={index}
                size={12}
                className={index < Math.floor(rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}
            />
        ));
    };

    const myResourcesCount = resources.filter(r => r.isMyResource).length;

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

        /* Search and Filter Section */
        .search-filter-section {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 24px;
          border: 1px solid rgba(255, 105, 105, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
        }

        .search-row {
          display: flex;
          gap: 16px;
          align-items: center;
          margin-bottom: 16px;
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

        .filters-row {
          display: ${showFilters ? 'flex' : 'none'};
          gap: 16px;
          flex-wrap: wrap;
        }

        .filter-select {
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 14px;
          background: white;
        }

        .filter-select:focus {
          outline: none;
          border-color: #FF6969;
        }

        .sort-select {
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 14px;
          background: white;
        }

        /* Upload Form */
        .upload-form {
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

        /* Resources Grid */
        .resources-container {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          padding: 24px;
          border: 1px solid rgba(255, 105, 105, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
        }

        .resources-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 20px;
        }

        .resource-card {
          background: rgba(255, 255, 255, 0.8);
          border-radius: 12px;
          padding: 20px;
          border: 1px solid rgba(255, 105, 105, 0.1);
          transition: all 0.2s;
          cursor: pointer;
          position: relative;
        }

        .resource-card:hover {
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }

        .resource-card.my-resource {
          border-left: 4px solid #FF6969;
        }

        .resource-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }

        .resource-badges {
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
          display: flex;
          align-items: center;
          gap: 4px;
          text-transform: uppercase;
        }

        .resource-actions {
          display: flex;
          gap: 8px;
        }

        .action-btn {
          background: none;
          border: none;
          padding: 6px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
          color: #666;
        }

        .action-btn:hover {
          background: rgba(255, 105, 105, 0.1);
          color: #BB2525;
        }

        .action-btn.liked {
          color: #ef4444;
        }

        .resource-title {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
          line-height: 1.3;
        }

        .resource-description {
          color: #666;
          font-size: 14px;
          line-height: 1.5;
          margin-bottom: 12px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .resource-tags {
          display: flex;
          gap: 4px;
          flex-wrap: wrap;
          margin-bottom: 12px;
        }

        .tag {
          background: rgba(255, 105, 105, 0.1);
          color: #BB2525;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 500;
        }

        .resource-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          color: #888;
          flex-wrap: wrap;
          gap: 8px;
        }

        .meta-left {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .meta-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .meta-stat {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .rating-display {
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

        .download-section {
          background: rgba(255, 105, 105, 0.05);
          border-radius: 12px;
          padding: 20px;
          margin-top: 20px;
          text-align: center;
        }

        .download-btn {
          background: linear-gradient(135deg, #FF6969, #BB2525);
          color: white;
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .download-btn:hover {
          box-shadow: 0 4px 12px rgba(255, 105, 105, 0.3);
        }

        .no-resources {
          text-align: center;
          padding: 40px;
          color: #666;
        }

        .no-resources-icon {
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

          .search-row {
            flex-direction: column;
          }

          .filters-row {
            flex-direction: column;
          }

          .resources-grid {
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
                        <span className="notification-badge">3</span>
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
                                    <BookOpen size={24} />
                                </div>
                                EduExchange
                            </h1>
                        </div>

                        <div className="view-toggle">
                            <button
                                className={`toggle-btn ${currentView === 'browse' ? 'active' : ''}`}
                                onClick={() => setCurrentView('browse')}
                            >
                                <Search size={16} />
                                Browse
                            </button>
                            <button
                                className={`toggle-btn ${currentView === 'upload' ? 'active' : ''}`}
                                onClick={() => setCurrentView('upload')}
                            >
                                <Plus size={16} />
                                Upload
                            </button>
                            <button
                                className={`toggle-btn ${currentView === 'my-resources' ? 'active' : ''}`}
                                onClick={() => setCurrentView('my-resources')}
                            >
                                <User size={16} />
                                My Resources
                            </button>
                        </div>
                    </div>

                    <div className="stats-row">
                        <div className="stat-item">
                            <BookOpen size={16} />
                            <span>{resources.length} Total Resources</span>
                        </div>
                        <div className="stat-item">
                            <User size={16} />
                            <span>{myResourcesCount} My Uploads</span>
                        </div>
                        <div className="stat-item">
                            <Download size={16} />
                            <span>{resources.reduce((sum, r) => sum + r.downloads, 0)} Downloads</span>
                        </div>
                    </div>
                </div>

                {/* Content Based on Current View */}
                {currentView === 'browse' || currentView === 'my-resources' ? (
                    <>
                        {/* Search and Filter Section */}
                        <div className="search-filter-section">
                            <div className="search-row">
                                <input
                                    type="text"
                                    placeholder="Search resources by title, description, or tags..."
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
                                <select
                                    className="sort-select"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as any)}
                                >
                                    <option value="recent">Recent</option>
                                    <option value="popular">Popular</option>
                                    <option value="rating">Rating</option>
                                </select>
                            </div>

                            <div className="filters-row">
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

                                <select
                                    className="filter-select"
                                    value={selectedSubject}
                                    onChange={(e) => setSelectedSubject(e.target.value)}
                                >
                                    <option value="all">All Subjects</option>
                                    {subjects.map(subject => (
                                        <option key={subject} value={subject}>{subject}</option>
                                    ))}
                                </select>

                                <select
                                    className="filter-select"
                                    value={selectedType}
                                    onChange={(e) => setSelectedType(e.target.value)}
                                >
                                    <option value="all">All Types</option>
                                    {resourceTypes.map(type => (
                                        <option key={type.value} value={type.value}>{type.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Resources Grid */}
                        <div className="resources-container">
                            {filteredResources.length === 0 ? (
                                <div className="no-resources">
                                    <div className="no-resources-icon">
                                        <BookOpen size={32} />
                                    </div>
                                    <h3>No Resources Found</h3>
                                    <p>Try adjusting your search criteria or filters.</p>
                                </div>
                            ) : (
                                <div className="resources-grid">
                                    {filteredResources.map((resource) => (
                                        <div
                                            key={resource.id}
                                            className={`resource-card ${resource.isMyResource ? 'my-resource' : ''}`}
                                            onClick={() => openResourceModal(resource)}
                                        >
                                            <div className="resource-header">
                                                <div className="resource-badges">
                                                    <span className={`badge ${getTypeColor(resource.type)}`}>
                                                        {getTypeIcon(resource.type)}
                                                        {resourceTypes.find(t => t.value === resource.type)?.label}
                                                    </span>
                                                </div>

                                                <div className="resource-actions">
                                                    <button
                                                        className={`action-btn ${resource.isLiked ? 'liked' : ''}`}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            toggleLike(resource.id);
                                                        }}
                                                    >
                                                        <Heart size={16} />
                                                    </button>
                                                    <button className="action-btn">
                                                        <Share2 size={16} />
                                                    </button>
                                                </div>
                                            </div>

                                            <h3 className="resource-title">{resource.title}</h3>
                                            <p className="resource-description">{resource.description}</p>

                                            {resource.tags.length > 0 && (
                                                <div className="resource-tags">
                                                    {resource.tags.slice(0, 3).map(tag => (
                                                        <span key={tag} className="tag">#{tag}</span>
                                                    ))}
                                                    {resource.tags.length > 3 && <span className="tag">+{resource.tags.length - 3}</span>}
                                                </div>
                                            )}

                                            <div className="resource-meta">
                                                <div className="meta-left">
                                                    <span>{resource.subject} • {resource.semester}</span>
                                                    <span>By {resource.uploaderName} • {formatDate(resource.uploadDate)}</span>
                                                </div>
                                                <div className="meta-right">
                                                    <div className="meta-stat">
                                                        <Download size={12} />
                                                        <span>{resource.downloads}</span>
                                                    </div>
                                                    <div className="meta-stat">
                                                        <Heart size={12} />
                                                        <span>{resource.likes}</span>
                                                    </div>
                                                    <div className="meta-stat">
                                                        <Eye size={12} />
                                                        <span>{resource.views}</span>
                                                    </div>
                                                    <div className="rating-display">
                                                        {renderStars(resource.rating)}
                                                        <span>({resource.rating.toFixed(1)})</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    /* Upload Form */
                    <div className="upload-form">
                        <h2 style={{ marginBottom: '24px', color: '#333', fontSize: '20px', fontWeight: '600' }}>
                            Share Educational Resource
                        </h2>

                        <form onSubmit={handleSubmit}>
                            <div className="form-grid">
                                <div className="form-group full-width">
                                    <label className="form-label">Resource Title *</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={uploadForm.title}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        placeholder="Enter a descriptive title for your resource"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Category *</label>
                                    <select
                                        name="category"
                                        value={uploadForm.category}
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
                                    <label className="form-label">Subject *</label>
                                    <select
                                        name="subject"
                                        value={uploadForm.subject}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        required
                                    >
                                        <option value="">Select Subject</option>
                                        {subjects.map(subject => (
                                            <option key={subject} value={subject}>{subject}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Resource Type *</label>
                                    <select
                                        name="type"
                                        value={uploadForm.type}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        required
                                    >
                                        {resourceTypes.map(type => (
                                            <option key={type.value} value={type.value}>{type.label}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Semester</label>
                                    <input
                                        type="text"
                                        name="semester"
                                        value={uploadForm.semester}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        placeholder="e.g., 3rd Semester"
                                    />
                                </div>

                                <div className="form-group full-width">
                                    <label className="form-label">Description *</label>
                                    <textarea
                                        name="description"
                                        value={uploadForm.description}
                                        onChange={handleInputChange}
                                        className="form-input form-textarea"
                                        placeholder="Provide a detailed description of your resource"
                                        required
                                    />
                                </div>

                                <div className="form-group full-width">
                                    <label className="form-label">Tags (comma-separated)</label>
                                    <input
                                        type="text"
                                        name="tags"
                                        value={uploadForm.tags}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        placeholder="e.g., algorithm, data-structure, programming"
                                    />
                                </div>

                                {uploadForm.type === 'link' ? (
                                    <div className="form-group full-width">
                                        <label className="form-label">Resource URL *</label>
                                        <input
                                            type="url"
                                            name="linkUrl"
                                            value={uploadForm.linkUrl}
                                            onChange={handleInputChange}
                                            className="form-input"
                                            placeholder="https://example.com/resource"
                                            required
                                        />
                                    </div>
                                ) : (
                                    <div className="form-group full-width">
                                        <label className="form-label">Upload File *</label>
                                        <div className="file-upload-area" onClick={() => document.getElementById('file-input')?.click()}>
                                            <div className="upload-icon">
                                                <Upload size={24} />
                                            </div>
                                            <div className="upload-text">
                                                {uploadForm.file ? uploadForm.file.name : 'Click to upload file'}
                                            </div>
                                            <div className="upload-subtext">
                                                {uploadForm.file ?
                                                    `${(uploadForm.file.size / 1024 / 1024).toFixed(1)} MB` :
                                                    'PDF, DOC, PPT, ZIP files (Max 50MB)'
                                                }
                                            </div>
                                        </div>
                                        <input
                                            id="file-input"
                                            type="file"
                                            onChange={handleFileUpload}
                                            style={{ display: 'none' }}
                                            accept=".pdf,.doc,.docx,.ppt,.pptx,.zip,.rar"
                                        />
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="submit-btn"
                                disabled={isSubmitting}
                            >
                                {isSubmitting && <span className="loading-spinner"></span>}
                                <Upload size={16} />
                                {isSubmitting ? 'Uploading...' : 'Share Resource'}
                            </button>
                        </form>
                    </div>
                )}
            </main>

            {/* Resource Detail Modal */}
            {selectedResource && (
                <div className="modal-overlay" onClick={closeResourceModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <div style={{ flex: 1 }}>
                                <div className="modal-badges">
                                    <span className={`badge ${getTypeColor(selectedResource.type)}`}>
                                        {getTypeIcon(selectedResource.type)}
                                        {resourceTypes.find(t => t.value === selectedResource.type)?.label}
                                    </span>
                                </div>
                            </div>
                            <button className="modal-close" onClick={closeResourceModal}>
                                <X size={24} />
                            </button>
                        </div>

                        <div className="modal-body">
                            <h2 className="modal-title">{selectedResource.title}</h2>

                            <div className="modal-info-grid">
                                <div className="info-item">
                                    <BookOpen size={16} />
                                    <span>{selectedResource.subject}</span>
                                </div>
                                <div className="info-item">
                                    <Calendar size={16} />
                                    <span>{selectedResource.semester}</span>
                                </div>
                                <div className="info-item">
                                    <User size={16} />
                                    <span>{selectedResource.uploaderName}</span>
                                </div>
                                <div className="info-item">
                                    <Clock size={16} />
                                    <span>Uploaded {formatDate(selectedResource.uploadDate)}</span>
                                </div>
                                <div className="info-item">
                                    <Download size={16} />
                                    <span>{selectedResource.downloads} downloads</span>
                                </div>
                                <div className="info-item">
                                    <Eye size={16} />
                                    <span>{selectedResource.views} views</span>
                                </div>
                            </div>

                            <div className="modal-content-text">
                                {selectedResource.description}
                            </div>

                            {selectedResource.tags.length > 0 && (
                                <div style={{ marginBottom: '20px' }}>
                                    <h4 style={{ marginBottom: '8px', color: '#333' }}>Tags:</h4>
                                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                                        {selectedResource.tags.map(tag => (
                                            <span key={tag} className="tag">#{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="download-section">
                                <h4 style={{ marginBottom: '12px', color: '#BB2525' }}>Download Resource</h4>
                                <button className="download-btn">
                                    <Download size={16} />
                                    {selectedResource.type === 'link' ? 'Open Link' : `Download ${selectedResource.fileSize || 'File'}`}
                                </button>
                                <p style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
                                    This resource has been downloaded {selectedResource.downloads} times
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default EduExchangePage;
