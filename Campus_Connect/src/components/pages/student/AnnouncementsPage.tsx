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
  Filter,
  Clock,
  AlertCircle,
  Info,
  CheckCircle,
  Star,
  Eye,
  Download,
  Share2,
  Bookmark,
  BookmarkCheck
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

interface Announcement {
  id: number;
  title: string;
  content: string;
  category: 'academic' | 'hostel' | 'events' | 'general' | 'urgent';
  priority: 'high' | 'medium' | 'low';
  date: string;
  author: string;
  department?: string;
  targetAudience: string[];
  attachments?: { name: string; url: string; type: string }[];
  isRead: boolean;
  isBookmarked: boolean;
  views: number;
  expiryDate?: string;
}

interface NavigationItem {
  name: string;
  icon: React.ReactNode;
  path: string;
}

function AnnouncementsPage() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [activeItem, setActiveItem] = useState('Announcements');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

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

  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

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

  // Load announcements data
  useEffect(() => {
    const savedAnnouncements = localStorage.getItem('announcementsData');
    if (savedAnnouncements) {
      setAnnouncements(JSON.parse(savedAnnouncements));
    } else {
      // Default announcements data
      const defaultAnnouncements: Announcement[] = [
        {
          id: 1,
          title: "Semester Exam Schedule Released",
          content: "The semester examination schedule has been released for all departments. Students are advised to check their individual timetables and prepare accordingly. The examinations will commence from February 15th, 2025. All students must report to the examination hall 30 minutes before the scheduled time. Mobile phones and electronic devices are strictly prohibited in the examination hall.",
          category: "academic",
          priority: "high",
          date: "2025-01-25T10:30:00Z",
          author: "Academic Office",
          department: "All Departments",
          targetAudience: ["All Students"],
          attachments: [
            { name: "Exam_Schedule_2025.pdf", url: "#", type: "pdf" },
            { name: "Exam_Guidelines.pdf", url: "#", type: "pdf" }
          ],
          isRead: false,
          isBookmarked: false,
          views: 1247,
          expiryDate: "2025-02-28T23:59:59Z"
        },
        {
          id: 2,
          title: "Library Extended Hours During Exam Period",
          content: "The college library will be operating 24/7 during the examination period starting from February 1st, 2025. Additional study spaces have been arranged in the academic blocks. Students can access the library with their ID cards. Group study rooms are available for booking through the library portal.",
          category: "general",
          priority: "medium",
          date: "2025-01-24T14:20:00Z",
          author: "Library Department",
          targetAudience: ["All Students"],
          isRead: true,
          isBookmarked: true,
          views: 856,
          expiryDate: "2025-03-01T23:59:59Z"
        },
        {
          id: 3,
          title: "Annual Sports Day Registration Open",
          content: "Registration for the Annual Sports Day 2025 is now open. Students can participate in various indoor and outdoor events including cricket, football, basketball, badminton, table tennis, and athletics. Registration deadline is February 1st, 2025. Winners will receive certificates and prizes. Don't miss this opportunity to showcase your sporting talents!",
          category: "events",
          priority: "low",
          date: "2025-01-23T09:15:00Z",
          author: "Sports Committee",
          targetAudience: ["All Students"],
          attachments: [
            { name: "Sports_Day_Events.pdf", url: "#", type: "pdf" }
          ],
          isRead: false,
          isBookmarked: false,
          views: 654,
          expiryDate: "2025-02-01T23:59:59Z"
        },
        {
          id: 4,
          title: "Hostel Mess Menu Updated",
          content: "The hostel mess menu has been updated for the month of February 2025. New vegetarian and non-vegetarian options have been added based on student feedback. Special dietary requirements can be accommodated with prior notice to the mess committee. The new menu will be effective from February 1st, 2025.",
          category: "hostel",
          priority: "medium",
          date: "2025-01-22T16:45:00Z",
          author: "Hostel Administration",
          targetAudience: ["Hostel Students"],
          attachments: [
            { name: "February_Mess_Menu.pdf", url: "#", type: "pdf" }
          ],
          isRead: true,
          isBookmarked: false,
          views: 432,
          expiryDate: "2025-02-28T23:59:59Z"
        },
        {
          id: 5,
          title: "Scholarship Applications Now Open",
          content: "Merit-based scholarship applications for the academic year 2025-26 are now open. Eligible students can apply through the student portal. Required documents include academic transcripts, income certificate, and recommendation letters. The last date for submission is February 10th, 2025. Don't miss this opportunity to secure financial assistance for your education.",
          category: "academic",
          priority: "high",
          date: "2025-01-21T11:30:00Z",
          author: "Scholarship Committee",
          targetAudience: ["All Students"],
          attachments: [
            { name: "Scholarship_Application_Form.pdf", url: "#", type: "pdf" },
            { name: "Eligibility_Criteria.pdf", url: "#", type: "pdf" }
          ],
          isRead: false,
          isBookmarked: true,
          views: 1123,
          expiryDate: "2025-02-10T23:59:59Z"
        },
        {
          id: 6,
          title: "Wi-Fi Maintenance Schedule",
          content: "The campus Wi-Fi network will undergo maintenance on January 28th, 2025, from 2:00 AM to 6:00 AM. During this period, internet services may be interrupted. Students are advised to plan their online activities accordingly. Alternative internet access points will be available in the library and computer labs.",
          category: "urgent",
          priority: "high",
          date: "2025-01-20T08:00:00Z",
          author: "IT Department",
          targetAudience: ["All Students", "All Staff"],
          isRead: true,
          isBookmarked: false,
          views: 987,
          expiryDate: "2025-01-29T23:59:59Z"
        },
        {
          id: 7,
          title: "Guest Lecture on Artificial Intelligence",
          content: "The Computer Science Department is organizing a guest lecture on 'Future of Artificial Intelligence in Healthcare' by Dr. Rajesh Kumar, Senior Research Scientist at Google AI. The lecture will be held on February 5th, 2025, at 2:00 PM in the Main Auditorium. All students are invited to attend. Certificates of participation will be provided.",
          category: "events",
          priority: "medium",
          date: "2025-01-19T13:20:00Z",
          author: "Computer Science Department",
          department: "Computer Science Engineering",
          targetAudience: ["CSE Students", "All Students"],
          isRead: false,
          isBookmarked: false,
          views: 743,
          expiryDate: "2025-02-05T23:59:59Z"
        },
        {
          id: 8,
          title: "Student ID Card Renewal Process",
          content: "The process for student ID card renewal has been simplified. Students can now apply online through the student portal and collect their cards from the administrative office. The renewal fee is ₹100. Lost ID cards can also be replaced using the same process with an additional penalty of ₹50. Please ensure to carry a valid ID card at all times on campus.",
          category: "general",
          priority: "low",
          date: "2025-01-18T15:45:00Z",
          author: "Administrative Office",
          targetAudience: ["All Students"],
          isRead: true,
          isBookmarked: false,
          views: 512,
          expiryDate: "2025-12-31T23:59:59Z"
        }
      ];

      setAnnouncements(defaultAnnouncements);
      localStorage.setItem('announcementsData', JSON.stringify(defaultAnnouncements));
    }
  }, []);

  const handleNavClick = (itemName: string, path?: string) => {
    setActiveItem(itemName);
    setIsSidebarOpen(false);

    if (path && path !== '/student/announcements') {
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

  const markAsRead = (announcementId: number) => {
    const updatedAnnouncements = announcements.map(ann =>
      ann.id === announcementId ? { ...ann, isRead: true } : ann
    );
    setAnnouncements(updatedAnnouncements);
    localStorage.setItem('announcementsData', JSON.stringify(updatedAnnouncements));
  };

  const toggleBookmark = (announcementId: number) => {
    const updatedAnnouncements = announcements.map(ann =>
      ann.id === announcementId ? { ...ann, isBookmarked: !ann.isBookmarked } : ann
    );
    setAnnouncements(updatedAnnouncements);
    localStorage.setItem('announcementsData', JSON.stringify(updatedAnnouncements));
  };

  const openAnnouncementModal = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    if (!announcement.isRead) {
      markAsRead(announcement.id);
    }
  };

  const closeAnnouncementModal = () => {
    setSelectedAnnouncement(null);
  };

  // Filter announcements based on search and filters
  const filteredAnnouncements = announcements.filter(ann => {
    const matchesSearch = ann.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ann.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || ann.category === selectedCategory;
    const matchesPriority = selectedPriority === 'all' || ann.priority === selectedPriority;

    return matchesSearch && matchesCategory && matchesPriority;
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'academic':
        return <BookOpen size={16} />;
      case 'hostel':
        return <Building size={16} />;
      case 'events':
        return <Calendar size={16} />;
      case 'urgent':
        return <AlertCircle size={16} />;
      default:
        return <Info size={16} />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'hostel':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'events':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'urgent':
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

  const unreadCount = announcements.filter(ann => !ann.isRead).length;
  const bookmarkedCount = announcements.filter(ann => ann.isBookmarked).length;

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

        /* Announcements Grid */
        .announcements-container {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          padding: 24px;
          border: 1px solid rgba(255, 105, 105, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
        }

        .announcements-grid {
          display: grid;
          gap: 16px;
        }

        .announcement-card {
          background: rgba(255, 255, 255, 0.8);
          border-radius: 12px;
          padding: 20px;
          border: 1px solid rgba(255, 105, 105, 0.1);
          transition: all 0.2s;
          cursor: pointer;
          position: relative;
        }

        .announcement-card:hover {
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }

        .announcement-card.unread {
          border-left: 4px solid #FF6969;
        }

        .announcement-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }

        .announcement-meta {
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

        .announcement-actions {
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

        .action-btn.bookmarked {
          color: #FF6969;
        }

        .announcement-title {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
          line-height: 1.3;
        }

        .announcement-content {
          color: #666;
          font-size: 14px;
          line-height: 1.5;
          margin-bottom: 12px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .announcement-footer {
          display: flex;
          justify-content: between;
          align-items: center;
          font-size: 12px;
          color: #888;
          flex-wrap: wrap;
          gap: 12px;
        }

        .announcement-date {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .announcement-views {
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

        .modal-meta {
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

        .modal-attachments {
          margin-top: 20px;
        }

        .attachment-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: #f8f9fa;
          border-radius: 6px;
          margin-bottom: 8px;
          text-decoration: none;
          color: #333;
          transition: all 0.2s;
        }

        .attachment-item:hover {
          background: rgba(255, 105, 105, 0.1);
        }

        .no-announcements {
          text-align: center;
          padding: 40px;
          color: #666;
        }

        .no-announcements-icon {
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

          .search-row {
            flex-direction: column;
          }

          .filters-row {
            flex-direction: column;
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

          .announcement-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }

          .announcement-footer {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
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
            <span className="notification-badge">{unreadCount}</span>
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
                  <Bell size={24} />
                </div>
                Announcements
              </h1>
            </div>
          </div>

          <div className="stats-row">
            <div className="stat-item">
              <Bell size={16} />
              <span>{unreadCount} Unread</span>
            </div>
            <div className="stat-item">
              <Bookmark size={16} />
              <span>{bookmarkedCount} Bookmarked</span>
            </div>
            <div className="stat-item">
              <Info size={16} />
              <span>{announcements.length} Total</span>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="search-filter-section">
          <div className="search-row">
            <input
              type="text"
              placeholder="Search announcements..."
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

          <div className="filters-row">
            <select
              className="filter-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="academic">Academic</option>
              <option value="hostel">Hostel</option>
              <option value="events">Events</option>
              <option value="general">General</option>
              <option value="urgent">Urgent</option>
            </select>

            <select
              className="filter-select"
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>
        </div>

        {/* Announcements List */}
        <div className="announcements-container">
          {filteredAnnouncements.length === 0 ? (
            <div className="no-announcements">
              <div className="no-announcements-icon">
                <Bell size={32} />
              </div>
              <h3>No Announcements Found</h3>
              <p>Try adjusting your search criteria or filters.</p>
            </div>
          ) : (
            <div className="announcements-grid">
              {filteredAnnouncements.map((announcement) => (
                <div
                  key={announcement.id}
                  className={`announcement-card ${!announcement.isRead ? 'unread' : ''}`}
                  onClick={() => openAnnouncementModal(announcement)}
                >
                  <div className="announcement-header">
                    <div className="announcement-meta">
                      <span className={`badge ${getCategoryColor(announcement.category)}`}>
                        {getCategoryIcon(announcement.category)}
                        {announcement.category}
                      </span>
                      <span className={`badge ${getPriorityColor(announcement.priority)}`}>
                        {announcement.priority}
                      </span>
                    </div>

                    <div className="announcement-actions">
                      <button
                        className={`action-btn ${announcement.isBookmarked ? 'bookmarked' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(announcement.id);
                        }}
                      >
                        {announcement.isBookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                      </button>
                    </div>
                  </div>

                  <h3 className="announcement-title">{announcement.title}</h3>
                  <p className="announcement-content">{announcement.content}</p>

                  <div className="announcement-footer">
                    <div className="announcement-date">
                      <Clock size={12} />
                      <span>{formatDate(announcement.date)}</span>
                    </div>
                    <div className="announcement-views">
                      <Eye size={12} />
                      <span>{announcement.views} views</span>
                    </div>
                    <span>By {announcement.author}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Announcement Modal */}
      {selectedAnnouncement && (
        <div className="modal-overlay" onClick={closeAnnouncementModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ flex: 1 }}>
                <div className="modal-meta">
                  <span className={`badge ${getCategoryColor(selectedAnnouncement.category)}`}>
                    {getCategoryIcon(selectedAnnouncement.category)}
                    {selectedAnnouncement.category}
                  </span>
                  <span className={`badge ${getPriorityColor(selectedAnnouncement.priority)}`}>
                    {selectedAnnouncement.priority}
                  </span>
                </div>
              </div>
              <button className="modal-close" onClick={closeAnnouncementModal}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-body">
              <h2 className="modal-title">{selectedAnnouncement.title}</h2>

              <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', fontSize: '14px', color: '#666' }}>
                <span>📅 {formatDateTime(selectedAnnouncement.date)}</span>
                <span>👤 {selectedAnnouncement.author}</span>
                <span>👁️ {selectedAnnouncement.views} views</span>
              </div>

              <div className="modal-content-text">
                {selectedAnnouncement.content}
              </div>

              {selectedAnnouncement.attachments && selectedAnnouncement.attachments.length > 0 && (
                <div className="modal-attachments">
                  <h4 style={{ marginBottom: '12px', color: '#333' }}>Attachments:</h4>
                  {selectedAnnouncement.attachments.map((attachment, index) => (
                    <a
                      key={index}
                      href={attachment.url}
                      className="attachment-item"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download size={16} />
                      <span>{attachment.name}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AnnouncementsPage;
