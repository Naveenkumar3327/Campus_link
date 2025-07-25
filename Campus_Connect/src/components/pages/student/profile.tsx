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
    Edit3,
    Save,
    Camera,
    Mail,
    Phone,
    MapPin,
    Award,
    Star,
    Trophy,
    Target,
    Clock,
    Eye,
    EyeOff,
    Shield,
    Settings,
    Download,
    Upload,
    Trash2,
    Check,
    AlertCircle,
    BookmarkPlus,
    Activity,
    Calendar as CalendarIcon,
    FileText,
    Image as ImageIcon
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
    dateOfBirth?: string;
    bloodGroup?: string;
    address?: string;
    parentName?: string;
    parentPhone?: string;
    emergencyContact?: string;
    profilePicture?: string;
    bio?: string;
    interests?: string[];
    skills?: string[];
    achievements?: string[];
    socialLinks?: {
        linkedin?: string;
        github?: string;
        portfolio?: string;
    };
    academicInfo?: {
        cgpa?: number;
        semester?: string;
        batch?: string;
        admissionYear?: string;
        courseDuration?: string;
    };
    privacySettings?: {
        showEmail: boolean;
        showPhone: boolean;
        showAddress: boolean;
        showAcademics: boolean;
        profileVisibility: 'public' | 'friends' | 'private';
    };
}

interface ActivityLog {
    id: string;
    action: string;
    description: string;
    timestamp: string;
    category: 'academic' | 'profile' | 'system' | 'social';
    icon: React.ReactNode;
}

interface NavigationItem {
    name: string;
    icon: React.ReactNode;
    path: string;
}

function ProfilePage() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [activeItem, setActiveItem] = useState('Profile');
    const [currentView, setCurrentView] = useState<'overview' | 'edit' | 'settings' | 'activity'>('overview');
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [showPasswordChange, setShowPasswordChange] = useState(false);
    const [studentData, setStudentData] = useState<StudentData>({} as StudentData);
    const [editForm, setEditForm] = useState<StudentData>({} as StudentData);
    const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    // Get student data from localStorage
    useEffect(() => {
        try {
            const userData = localStorage.getItem('userData');
            if (userData) {
                const parsed = JSON.parse(userData);
                const fullStudentData: StudentData = {
                    name: parsed.name || 'John Doe',
                    rollNo: parsed.rollNo || '20CS001',
                    department: parsed.department || 'Computer Science Engineering',
                    year: parsed.year || '3rd Year',
                    section: parsed.section || 'A',
                    email: parsed.email || 'student@sece.ac.in',
                    accommodation: parsed.accommodation || 'Hostel',
                    block: parsed.block || 'A Block',
                    roomNo: parsed.roomNo || 'A-201',
                    phone: parsed.phone || '+91 9876543210',
                    dateOfBirth: parsed.dateOfBirth || '2003-05-15',
                    bloodGroup: parsed.bloodGroup || 'B+',
                    address: parsed.address || '123 Main Street, Chennai, Tamil Nadu 600001',
                    parentName: parsed.parentName || 'Mr. John Smith',
                    parentPhone: parsed.parentPhone || '+91 9876543211',
                    emergencyContact: parsed.emergencyContact || '+91 9876543212',
                    profilePicture: parsed.profilePicture || '',
                    bio: parsed.bio || 'Computer Science student passionate about technology and innovation. Love to code and explore new technologies.',
                    interests: parsed.interests || ['Programming', 'Web Development', 'Machine Learning', 'Gaming', 'Reading'],
                    skills: parsed.skills || ['JavaScript', 'React', 'Node.js', 'Python', 'Java', 'SQL'],
                    achievements: parsed.achievements || ['Dean\'s List 2024', 'Coding Competition Winner', 'Best Project Award'],
                    socialLinks: parsed.socialLinks || {
                        linkedin: 'https://linkedin.com/in/johndoe',
                        github: 'https://github.com/johndoe',
                        portfolio: 'https://johndoe.dev'
                    },
                    academicInfo: parsed.academicInfo || {
                        cgpa: 8.7,
                        semester: '6th Semester',
                        batch: '2020-2024',
                        admissionYear: '2020',
                        courseDuration: '4 Years'
                    },
                    privacySettings: parsed.privacySettings || {
                        showEmail: true,
                        showPhone: false,
                        showAddress: false,
                        showAcademics: true,
                        profileVisibility: 'public'
                    }
                };

                setStudentData(fullStudentData);
                setEditForm(fullStudentData);
            }
        } catch (error) {
            console.error('Error parsing user data:', error);
            // Set default data if parsing fails
            const defaultData: StudentData = {
                name: "John Doe",
                rollNo: "20CS001",
                department: "Computer Science Engineering",
                year: "3rd Year",
                section: "A",
                email: "student@sece.ac.in",
                accommodation: "Hostel",
                block: "A Block",
                roomNo: "A-201",
                phone: "+91 9876543210",
                dateOfBirth: "2003-05-15",
                bloodGroup: "B+",
                address: "123 Main Street, Chennai, Tamil Nadu 600001",
                parentName: "Mr. John Smith",
                parentPhone: "+91 9876543211",
                emergencyContact: "+91 9876543212",
                profilePicture: "",
                bio: "Computer Science student passionate about technology and innovation.",
                interests: ['Programming', 'Web Development', 'Machine Learning'],
                skills: ['JavaScript', 'React', 'Python'],
                achievements: ['Dean\'s List 2024'],
                socialLinks: {
                    linkedin: '',
                    github: '',
                    portfolio: ''
                },
                academicInfo: {
                    cgpa: 8.7,
                    semester: '6th Semester',
                    batch: '2020-2024',
                    admissionYear: '2020',
                    courseDuration: '4 Years'
                },
                privacySettings: {
                    showEmail: true,
                    showPhone: false,
                    showAddress: false,
                    showAcademics: true,
                    profileVisibility: 'public'
                }
            };

            setStudentData(defaultData);
            setEditForm(defaultData);
        }

        // Load activity logs
        const savedLogs = localStorage.getItem('profileActivityLogs');
        if (savedLogs) {
            setActivityLogs(JSON.parse(savedLogs));
        } else {
            // Default activity logs
            const defaultLogs: ActivityLog[] = [
                {
                    id: 'LOG001',
                    action: 'Profile Updated',
                    description: 'Updated profile picture and bio information',
                    timestamp: '2025-01-26T10:30:00Z',
                    category: 'profile',
                    icon: <User size={16} />
                },
                {
                    id: 'LOG002',
                    action: 'Achievement Earned',
                    description: 'Earned "Team Player" achievement',
                    timestamp: '2025-01-25T14:15:00Z',
                    category: 'academic',
                    icon: <Award size={16} />
                },
                {
                    id: 'LOG003',
                    action: 'Privacy Settings Changed',
                    description: 'Updated profile visibility settings',
                    timestamp: '2025-01-24T16:45:00Z',
                    category: 'system',
                    icon: <Shield size={16} />
                },
                {
                    id: 'LOG004',
                    action: 'Study Group Joined',
                    description: 'Joined "Data Structures Mastery" study group',
                    timestamp: '2025-01-23T11:20:00Z',
                    category: 'social',
                    icon: <Users size={16} />
                },
                {
                    id: 'LOG005',
                    action: 'Resource Uploaded',
                    description: 'Uploaded "OS Lab Manual" to EduExchange',
                    timestamp: '2025-01-22T09:15:00Z',
                    category: 'academic',
                    icon: <BookOpen size={16} />
                }
            ];

            setActivityLogs(defaultLogs);
            localStorage.setItem('profileActivityLogs', JSON.stringify(defaultLogs));
        }
    }, []);

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

    const handleNavClick = (itemName: string, path?: string) => {
        setActiveItem(itemName);
        setIsSidebarOpen(false);

        if (path && path !== '/student/profile') {
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

        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setEditForm(prev => {
                const parentValue = prev[parent as keyof StudentData];
                return {
                    ...prev,
                    [parent]: {
                        ...(typeof parentValue === 'object' && parentValue !== null ? parentValue : {}),
                        [child]: value
                    }
                };
            });
        } else {
            setEditForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleArrayInputChange = (field: 'interests' | 'skills' | 'achievements', value: string) => {
        const items = value.split(',').map(item => item.trim()).filter(item => item);
        setEditForm(prev => ({ ...prev, [field]: items }));
    };

    const handlePrivacyChange = (setting: string, value: boolean | string) => {
        setEditForm(prev => ({
            ...prev,
            privacySettings: {
                ...prev.privacySettings!,
                [setting]: value
            }
        }));
    };

    const handleSave = async () => {
        setIsSaving(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Save to localStorage
            localStorage.setItem('userData', JSON.stringify(editForm));
            setStudentData(editForm);

            // Add activity log
            const newLog: ActivityLog = {
                id: `LOG${Date.now()}`,
                action: 'Profile Updated',
                description: 'Updated profile information successfully',
                timestamp: new Date().toISOString(),
                category: 'profile',
                icon: <User size={16} />
            };

            const updatedLogs = [newLog, ...activityLogs];
            setActivityLogs(updatedLogs);
            localStorage.setItem('profileActivityLogs', JSON.stringify(updatedLogs));

            setIsEditing(false);
            alert('Profile updated successfully!');
        } catch (error) {
            alert('Failed to update profile. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handlePasswordChange = async () => {
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            alert('New passwords do not match!');
            return;
        }

        if (passwordForm.newPassword.length < 6) {
            alert('Password must be at least 6 characters long!');
            return;
        }

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Add activity log
            const newLog: ActivityLog = {
                id: `LOG${Date.now()}`,
                action: 'Password Changed',
                description: 'Account password updated successfully',
                timestamp: new Date().toISOString(),
                category: 'system',
                icon: <Shield size={16} />
            };

            const updatedLogs = [newLog, ...activityLogs];
            setActivityLogs(updatedLogs);
            localStorage.setItem('profileActivityLogs', JSON.stringify(updatedLogs));

            setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
            setShowPasswordChange(false);
            alert('Password changed successfully!');
        } catch (error) {
            alert('Failed to change password. Please try again.');
        }
    };

    const handleProfilePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onload = (event) => {
                const imageUrl = event.target?.result as string;
                setEditForm(prev => ({ ...prev, profilePicture: imageUrl }));
            };

            reader.readAsDataURL(file);
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

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'academic':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'profile':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'system':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'social':
                return 'bg-orange-100 text-orange-800 border-orange-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
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

        .profile-actions {
          display: flex;
          gap: 12px;
        }

        .action-btn {
          padding: 8px 16px;
          border: none;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
        }

        .action-btn.primary {
          background: linear-gradient(135deg, #FF6969, #BB2525);
          color: white;
        }

        .action-btn.secondary {
          background: rgba(255, 105, 105, 0.1);
          color: #BB2525;
          border: 1px solid rgba(255, 105, 105, 0.2);
        }

        .action-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .action-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        /* Profile Overview */
        .profile-overview {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 24px;
          margin-bottom: 24px;
        }

        .profile-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          padding: 32px;
          border: 1px solid rgba(255, 105, 105, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
          text-align: center;
          position: relative;
        }

        .profile-picture {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          margin: 0 auto 20px;
          position: relative;
          overflow: hidden;
          border: 4px solid rgba(255, 105, 105, 0.2);
        }

        .profile-picture img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .profile-picture-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #FF6969, #BB2525);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 48px;
          font-weight: 600;
        }

        .picture-upload-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          transform: translateY(100%);
        }

        .profile-picture:hover .picture-upload-overlay {
          transform: translateY(0);
        }

        .profile-name {
          font-size: 24px;
          font-weight: 700;
          color: #333;
          margin-bottom: 8px;
        }

        .profile-role {
          color: #BB2525;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .profile-department {
          color: #666;
          font-size: 14px;
          margin-bottom: 20px;
        }

        .profile-stats {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 16px;
          margin-top: 20px;
        }

        .stat-item {
          text-align: center;
        }

        .stat-value {
          font-size: 24px;
          font-weight: 700;
          color: #BB2525;
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 12px;
          color: #666;
          font-weight: 500;
        }

        .profile-info {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          padding: 32px;
          border: 1px solid rgba(255, 105, 105, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
        }

        .info-section {
          margin-bottom: 32px;
        }

        .info-section:last-child {
          margin-bottom: 0;
        }

        .section-title {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 16px;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 8px;
          border: 1px solid rgba(255, 105, 105, 0.1);
        }

        .info-icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: linear-gradient(135deg, #FF6969, #BB2525);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .info-content {
          flex: 1;
        }

        .info-label {
          font-size: 12px;
          color: #666;
          font-weight: 500;
          margin-bottom: 2px;
        }

        .info-value {
          font-size: 14px;
          color: #333;
          font-weight: 600;
        }

        .bio-text {
          color: #666;
          line-height: 1.6;
          font-size: 14px;
        }

        .tags-container {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .tag {
          background: rgba(255, 105, 105, 0.1);
          color: #BB2525;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
        }

        .social-links {
          display: flex;
          gap: 12px;
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: linear-gradient(135deg, #FF6969, #BB2525);
          color: white;
          text-decoration: none;
          transition: all 0.2s;
        }

        .social-link:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 105, 105, 0.3);
        }

        /* Edit Form */
        .edit-form {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          padding: 32px;
          border: 1px solid rgba(255, 105, 105, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin-bottom: 24px;
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

        .checkbox-group {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }

        .checkbox-input {
          width: auto;
          margin: 0;
        }

        /* Settings */
        .settings-container {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          padding: 32px;
          border: 1px solid rgba(255, 105, 105, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
        }

        .settings-section {
          margin-bottom: 32px;
          padding-bottom: 24px;
          border-bottom: 1px solid rgba(255, 105, 105, 0.1);
        }

        .settings-section:last-child {
          margin-bottom: 0;
          border-bottom: none;
        }

        .setting-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 8px;
          border: 1px solid rgba(255, 105, 105, 0.1);
          margin-bottom: 12px;
        }

        .setting-info {
          flex: 1;
        }

        .setting-title {
          font-weight: 600;
          color: #333;
          margin-bottom: 4px;
        }

        .setting-description {
          font-size: 12px;
          color: #666;
        }

        .toggle-switch {
          width: 44px;
          height: 24px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          position: relative;
          transition: all 0.2s;
        }

        .toggle-switch.enabled {
          background: linear-gradient(135deg, #FF6969, #BB2525);
        }

        .toggle-switch.disabled {
          background: #ddd;
        }

        .toggle-switch::after {
          content: '';
          position: absolute;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: white;
          top: 2px;
          transition: all 0.2s;
        }

        .toggle-switch.enabled::after {
          right: 2px;
        }

        .toggle-switch.disabled::after {
          left: 2px;
        }

        .password-form {
          background: rgba(255, 105, 105, 0.05);
          border-radius: 12px;
          padding: 20px;
          margin-top: 16px;
        }

        /* Activity Log */
        .activity-container {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          padding: 32px;
          border: 1px solid rgba(255, 105, 105, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
        }

        .activity-timeline {
          position: relative;
        }

        .activity-timeline::before {
          content: '';
          position: absolute;
          left: 20px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(135deg, #FF6969, #BB2525);
          opacity: 0.2;
        }

        .activity-item {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
          position: relative;
        }

        .activity-item::before {
          content: '';
          position: absolute;
          left: 16px;
          top: 16px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: linear-gradient(135deg, #FF6969, #BB2525);
          z-index: 1;
        }

        .activity-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: linear-gradient(135deg, #FF6969, #BB2525);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .activity-content {
          flex: 1;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 12px;
          padding: 16px;
          border: 1px solid rgba(255, 105, 105, 0.1);
        }

        .activity-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 8px;
        }

        .activity-title {
          font-weight: 600;
          color: #333;
          font-size: 14px;
        }

        .activity-time {
          font-size: 12px;
          color: #666;
        }

        .activity-description {
          color: #666;
          font-size: 13px;
          line-height: 1.4;
        }

        .activity-category {
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          border: 1px solid;
          display: inline-block;
          margin-top: 8px;
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
            justify-content: center;
          }

          .profile-overview {
            grid-template-columns: 1fr;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .form-group.full-width {
            grid-column: span 1;
          }

          .info-grid {
            grid-template-columns: 1fr;
          }

          .profile-stats {
            grid-template-columns: 1fr 1fr;
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
                        <span className="notification-badge">{activityLogs.length}</span>
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
                                    <User size={24} />
                                </div>
                                My Profile
                            </h1>
                        </div>

                        <div className="view-toggle">
                            <button
                                className={`toggle-btn ${currentView === 'overview' ? 'active' : ''}`}
                                onClick={() => setCurrentView('overview')}
                            >
                                <User size={16} />
                                Overview
                            </button>
                            <button
                                className={`toggle-btn ${currentView === 'edit' ? 'active' : ''}`}
                                onClick={() => setCurrentView('edit')}
                            >
                                <Edit3 size={16} />
                                Edit
                            </button>
                            <button
                                className={`toggle-btn ${currentView === 'settings' ? 'active' : ''}`}
                                onClick={() => setCurrentView('settings')}
                            >
                                <Settings size={16} />
                                Settings
                            </button>
                            <button
                                className={`toggle-btn ${currentView === 'activity' ? 'active' : ''}`}
                                onClick={() => setCurrentView('activity')}
                            >
                                <Activity size={16} />
                                Activity
                            </button>
                        </div>
                    </div>

                    {currentView === 'edit' && (
                        <div className="profile-actions">
                            <button
                                className="action-btn secondary"
                                onClick={() => {
                                    setEditForm(studentData);
                                    setIsEditing(false);
                                }}
                            >
                                <X size={16} />
                                Cancel
                            </button>
                            <button
                                className="action-btn primary"
                                onClick={handleSave}
                                disabled={isSaving}
                            >
                                {isSaving && <span className="loading-spinner"></span>}
                                <Save size={16} />
                                {isSaving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    )}
                </div>

                {/* Content Based on Current View */}
                {currentView === 'overview' && (
                    <div className="profile-overview">
                        {/* Profile Card */}
                        <div className="profile-card">
                            <div className="profile-picture">
                                {studentData.profilePicture ? (
                                    <img src={studentData.profilePicture} alt="Profile" />
                                ) : (
                                    <div className="profile-picture-placeholder">
                                        {getUserInitials(studentData.name)}
                                    </div>
                                )}
                            </div>

                            <div className="profile-name">{studentData.name}</div>
                            <div className="profile-role">{studentData.rollNo}</div>
                            <div className="profile-department">
                                {studentData.department} • {studentData.year} {studentData.section}
                            </div>

                            <div className="profile-stats">
                                <div className="stat-item">
                                    <div className="stat-value">8.7</div>
                                    <div className="stat-label">CGPA</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-value">15</div>
                                    <div className="stat-label">Achievements</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-value">245</div>
                                    <div className="stat-label">Points</div>
                                </div>
                            </div>

                            {studentData.socialLinks && (
                                <div className="social-links">
                                    {studentData.socialLinks.linkedin && (
                                        <a href={studentData.socialLinks.linkedin} className="social-link" target="_blank" rel="noopener noreferrer">
                                            <User size={16} />
                                        </a>
                                    )}
                                    {studentData.socialLinks.github && (
                                        <a href={studentData.socialLinks.github} className="social-link" target="_blank" rel="noopener noreferrer">
                                            <BookOpen size={16} />
                                        </a>
                                    )}
                                    {studentData.socialLinks.portfolio && (
                                        <a href={studentData.socialLinks.portfolio} className="social-link" target="_blank" rel="noopener noreferrer">
                                            <Star size={16} />
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Profile Information */}
                        <div className="profile-info">
                            {/* Personal Information */}
                            <div className="info-section">
                                <h3 className="section-title">
                                    <User size={20} />
                                    Personal Information
                                </h3>
                                <div className="info-grid">
                                    <div className="info-item">
                                        <div className="info-icon">
                                            <Mail size={16} />
                                        </div>
                                        <div className="info-content">
                                            <div className="info-label">Email</div>
                                            <div className="info-value">{studentData.email}</div>
                                        </div>
                                    </div>

                                    <div className="info-item">
                                        <div className="info-icon">
                                            <Phone size={16} />
                                        </div>
                                        <div className="info-content">
                                            <div className="info-label">Phone</div>
                                            <div className="info-value">{studentData.phone}</div>
                                        </div>
                                    </div>

                                    <div className="info-item">
                                        <div className="info-icon">
                                            <CalendarIcon size={16} />
                                        </div>
                                        <div className="info-content">
                                            <div className="info-label">Date of Birth</div>
                                            <div className="info-value">{studentData.dateOfBirth ? new Date(studentData.dateOfBirth).toLocaleDateString() : 'Not provided'}</div>
                                        </div>
                                    </div>

                                    <div className="info-item">
                                        <div className="info-icon">
                                            <Activity size={16} />
                                        </div>
                                        <div className="info-content">
                                            <div className="info-label">Blood Group</div>
                                            <div className="info-value">{studentData.bloodGroup || 'Not provided'}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Academic Information */}
                            <div className="info-section">
                                <h3 className="section-title">
                                    <GraduationCap size={20} />
                                    Academic Information
                                </h3>
                                <div className="info-grid">
                                    <div className="info-item">
                                        <div className="info-icon">
                                            <Trophy size={16} />
                                        </div>
                                        <div className="info-content">
                                            <div className="info-label">CGPA</div>
                                            <div className="info-value">{studentData.academicInfo?.cgpa || 'N/A'}</div>
                                        </div>
                                    </div>

                                    <div className="info-item">
                                        <div className="info-icon">
                                            <BookOpen size={16} />
                                        </div>
                                        <div className="info-content">
                                            <div className="info-label">Current Semester</div>
                                            <div className="info-value">{studentData.academicInfo?.semester || 'N/A'}</div>
                                        </div>
                                    </div>

                                    <div className="info-item">
                                        <div className="info-icon">
                                            <Building size={16} />
                                        </div>
                                        <div className="info-content">
                                            <div className="info-label">Accommodation</div>
                                            <div className="info-value">{studentData.accommodation}</div>
                                        </div>
                                    </div>

                                    <div className="info-item">
                                        <div className="info-icon">
                                            <MapPin size={16} />
                                        </div>
                                        <div className="info-content">
                                            <div className="info-label">Room</div>
                                            <div className="info-value">{studentData.block} - {studentData.roomNo}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Bio */}
                            {studentData.bio && (
                                <div className="info-section">
                                    <h3 className="section-title">
                                        <FileText size={20} />
                                        About Me
                                    </h3>
                                    <div className="bio-text">{studentData.bio}</div>
                                </div>
                            )}

                            {/* Interests */}
                            {studentData.interests && studentData.interests.length > 0 && (
                                <div className="info-section">
                                    <h3 className="section-title">
                                        <Star size={20} />
                                        Interests
                                    </h3>
                                    <div className="tags-container">
                                        {studentData.interests.map(interest => (
                                            <span key={interest} className="tag">{interest}</span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Skills */}
                            {studentData.skills && studentData.skills.length > 0 && (
                                <div className="info-section">
                                    <h3 className="section-title">
                                        <Target size={20} />
                                        Skills
                                    </h3>
                                    <div className="tags-container">
                                        {studentData.skills.map(skill => (
                                            <span key={skill} className="tag">{skill}</span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Achievements */}
                            {studentData.achievements && studentData.achievements.length > 0 && (
                                <div className="info-section">
                                    <h3 className="section-title">
                                        <Award size={20} />
                                        Achievements
                                    </h3>
                                    <div className="tags-container">
                                        {studentData.achievements.map(achievement => (
                                            <span key={achievement} className="tag">{achievement}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {currentView === 'edit' && (
                    <div className="edit-form">
                        <h2 style={{ marginBottom: '24px', color: '#333', fontSize: '20px', fontWeight: '600' }}>
                            Edit Profile Information
                        </h2>

                        {/* Profile Picture Upload */}
                        <div className="form-group full-width">
                            <label className="form-label">Profile Picture</label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <div className="profile-picture" style={{ width: '80px', height: '80px' }}>
                                    {editForm.profilePicture ? (
                                        <img src={editForm.profilePicture} alt="Profile" />
                                    ) : (
                                        <div className="profile-picture-placeholder">
                                            {getUserInitials(editForm.name)}
                                        </div>
                                    )}
                                    <div className="picture-upload-overlay" onClick={() => document.getElementById('profile-picture-input')?.click()}>
                                        <Camera size={16} />
                                    </div>
                                </div>
                                <div>
                                    <input
                                        id="profile-picture-input"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleProfilePictureUpload}
                                        style={{ display: 'none' }}
                                    />
                                    <button
                                        type="button"
                                        className="action-btn secondary"
                                        onClick={() => document.getElementById('profile-picture-input')?.click()}
                                    >
                                        <Upload size={16} />
                                        Upload Photo
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="form-grid">
                            {/* Basic Information */}
                            <div className="form-group">
                                <label className="form-label">Full Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={editForm.name || ''}
                                    onChange={handleInputChange}
                                    className="form-input"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Roll Number</label>
                                <input
                                    type="text"
                                    name="rollNo"
                                    value={editForm.rollNo || ''}
                                    onChange={handleInputChange}
                                    className="form-input"
                                    disabled
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={editForm.email || ''}
                                    onChange={handleInputChange}
                                    className="form-input"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={editForm.phone || ''}
                                    onChange={handleInputChange}
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Date of Birth</label>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={editForm.dateOfBirth || ''}
                                    onChange={handleInputChange}
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Blood Group</label>
                                <select
                                    name="bloodGroup"
                                    value={editForm.bloodGroup || ''}
                                    onChange={handleInputChange}
                                    className="form-input"
                                >
                                    <option value="">Select Blood Group</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Parent/Guardian Name</label>
                                <input
                                    type="text"
                                    name="parentName"
                                    value={editForm.parentName || ''}
                                    onChange={handleInputChange}
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Parent/Guardian Phone</label>
                                <input
                                    type="tel"
                                    name="parentPhone"
                                    value={editForm.parentPhone || ''}
                                    onChange={handleInputChange}
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Emergency Contact</label>
                                <input
                                    type="tel"
                                    name="emergencyContact"
                                    value={editForm.emergencyContact || ''}
                                    onChange={handleInputChange}
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">CGPA</label>
                                <input
                                    type="number"
                                    name="academicInfo.cgpa"
                                    value={editForm.academicInfo?.cgpa || ''}
                                    onChange={handleInputChange}
                                    className="form-input"
                                    step="0.01"
                                    min="0"
                                    max="10"
                                />
                            </div>
                        </div>

                        <div className="form-group full-width">
                            <label className="form-label">Address</label>
                            <textarea
                                name="address"
                                value={editForm.address || ''}
                                onChange={handleInputChange}
                                className="form-input form-textarea"
                                rows={3}
                            />
                        </div>

                        <div className="form-group full-width">
                            <label className="form-label">Bio</label>
                            <textarea
                                name="bio"
                                value={editForm.bio || ''}
                                onChange={handleInputChange}
                                className="form-input form-textarea"
                                placeholder="Tell us about yourself..."
                                rows={4}
                            />
                        </div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label">Interests (comma-separated)</label>
                                <input
                                    type="text"
                                    value={editForm.interests?.join(', ') || ''}
                                    onChange={(e) => handleArrayInputChange('interests', e.target.value)}
                                    className="form-input"
                                    placeholder="Programming, Reading, Music"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Skills (comma-separated)</label>
                                <input
                                    type="text"
                                    value={editForm.skills?.join(', ') || ''}
                                    onChange={(e) => handleArrayInputChange('skills', e.target.value)}
                                    className="form-input"
                                    placeholder="JavaScript, Python, React"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">LinkedIn Profile</label>
                                <input
                                    type="url"
                                    name="socialLinks.linkedin"
                                    value={editForm.socialLinks?.linkedin || ''}
                                    onChange={handleInputChange}
                                    className="form-input"
                                    placeholder="https://linkedin.com/in/yourprofile"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">GitHub Profile</label>
                                <input
                                    type="url"
                                    name="socialLinks.github"
                                    value={editForm.socialLinks?.github || ''}
                                    onChange={handleInputChange}
                                    className="form-input"
                                    placeholder="https://github.com/yourusername"
                                />
                            </div>
                        </div>

                        <div className="form-group full-width">
                            <label className="form-label">Portfolio Website</label>
                            <input
                                type="url"
                                name="socialLinks.portfolio"
                                value={editForm.socialLinks?.portfolio || ''}
                                onChange={handleInputChange}
                                className="form-input"
                                placeholder="https://yourportfolio.com"
                            />
                        </div>
                    </div>
                )}

                {currentView === 'settings' && (
                    <div className="settings-container">
                        <div className="settings-section">
                            <h3 className="section-title">
                                <Eye size={20} />
                                Privacy Settings
                            </h3>

                            <div className="setting-item">
                                <div className="setting-info">
                                    <div className="setting-title">Show Email Address</div>
                                    <div className="setting-description">Allow others to see your email address on your profile</div>
                                </div>
                                <button
                                    className={`toggle-switch ${editForm.privacySettings?.showEmail ? 'enabled' : 'disabled'}`}
                                    onClick={() => handlePrivacyChange('showEmail', !editForm.privacySettings?.showEmail)}
                                />
                            </div>

                            <div className="setting-item">
                                <div className="setting-info">
                                    <div className="setting-title">Show Phone Number</div>
                                    <div className="setting-description">Allow others to see your phone number on your profile</div>
                                </div>
                                <button
                                    className={`toggle-switch ${editForm.privacySettings?.showPhone ? 'enabled' : 'disabled'}`}
                                    onClick={() => handlePrivacyChange('showPhone', !editForm.privacySettings?.showPhone)}
                                />
                            </div>

                            <div className="setting-item">
                                <div className="setting-info">
                                    <div className="setting-title">Show Academic Information</div>
                                    <div className="setting-description">Allow others to see your CGPA and academic details</div>
                                </div>
                                <button
                                    className={`toggle-switch ${editForm.privacySettings?.showAcademics ? 'enabled' : 'disabled'}`}
                                    onClick={() => handlePrivacyChange('showAcademics', !editForm.privacySettings?.showAcademics)}
                                />
                            </div>

                            <div className="setting-item">
                                <div className="setting-info">
                                    <div className="setting-title">Profile Visibility</div>
                                    <div className="setting-description">Control who can view your profile</div>
                                </div>
                                <select
                                    value={editForm.privacySettings?.profileVisibility || 'public'}
                                    onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                                    className="form-input"
                                    style={{ width: 'auto', minWidth: '120px' }}
                                >
                                    <option value="public">Public</option>
                                    <option value="friends">Friends Only</option>
                                    <option value="private">Private</option>
                                </select>
                            </div>
                        </div>

                        <div className="settings-section">
                            <h3 className="section-title">
                                <Shield size={20} />
                                Security Settings
                            </h3>

                            <div className="setting-item">
                                <div className="setting-info">
                                    <div className="setting-title">Change Password</div>
                                    <div className="setting-description">Update your account password for better security</div>
                                </div>
                                <button
                                    className="action-btn secondary"
                                    onClick={() => setShowPasswordChange(!showPasswordChange)}
                                >
                                    <Shield size={16} />
                                    {showPasswordChange ? 'Cancel' : 'Change Password'}
                                </button>
                            </div>

                            {showPasswordChange && (
                                <div className="password-form">
                                    <div className="form-group">
                                        <label className="form-label">Current Password</label>
                                        <input
                                            type="password"
                                            value={passwordForm.currentPassword}
                                            onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                                            className="form-input"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">New Password</label>
                                        <input
                                            type="password"
                                            value={passwordForm.newPassword}
                                            onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                                            className="form-input"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Confirm New Password</label>
                                        <input
                                            type="password"
                                            value={passwordForm.confirmPassword}
                                            onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                            className="form-input"
                                        />
                                    </div>

                                    <button
                                        className="action-btn primary"
                                        onClick={handlePasswordChange}
                                    >
                                        <Save size={16} />
                                        Update Password
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="settings-section">
                            <h3 className="section-title">
                                <Download size={20} />
                                Data Management
                            </h3>

                            <div className="setting-item">
                                <div className="setting-info">
                                    <div className="setting-title">Export Profile Data</div>
                                    <div className="setting-description">Download a copy of your profile information</div>
                                </div>
                                <button className="action-btn secondary">
                                    <Download size={16} />
                                    Export Data
                                </button>
                            </div>

                            <div className="setting-item">
                                <div className="setting-info">
                                    <div className="setting-title">Delete Account</div>
                                    <div className="setting-description">Permanently delete your account and all associated data</div>
                                </div>
                                <button className="action-btn" style={{ background: '#ef4444', color: 'white' }}>
                                    <Trash2 size={16} />
                                    Delete Account
                                </button>
                            </div>
                        </div>

                        <div style={{ textAlign: 'center', marginTop: '24px' }}>
                            <button
                                className="action-btn primary"
                                onClick={handleSave}
                                disabled={isSaving}
                            >
                                {isSaving && <span className="loading-spinner"></span>}
                                <Save size={16} />
                                {isSaving ? 'Saving...' : 'Save Settings'}
                            </button>
                        </div>
                    </div>
                )}

                {currentView === 'activity' && (
                    <div className="activity-container">
                        <h2 style={{ marginBottom: '24px', color: '#333', fontSize: '20px', fontWeight: '600' }}>
                            Activity Log
                        </h2>

                        <div className="activity-timeline">
                            {activityLogs.map((log) => (
                                <div key={log.id} className="activity-item">
                                    <div className="activity-icon">
                                        {log.icon}
                                    </div>
                                    <div className="activity-content">
                                        <div className="activity-header">
                                            <div className="activity-title">{log.action}</div>
                                            <div className="activity-time">{formatDate(log.timestamp)}</div>
                                        </div>
                                        <div className="activity-description">{log.description}</div>
                                        <span className={`activity-category ${getCategoryColor(log.category)}`}>
                                            {log.category}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}

export default ProfilePage;
