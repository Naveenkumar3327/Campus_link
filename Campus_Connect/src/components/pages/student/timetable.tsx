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
    Clock,
    MapPin,
    Plus,
    Edit3,
    Trash2,
    Save,
    AlertCircle,
    CheckCircle,
    Settings,
    Download,
    Upload,
    RefreshCw,
    Filter,
    ChevronLeft,
    ChevronRight
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

interface TimeSlot {
    id: string;
    startTime: string;
    endTime: string;
    subject: string;
    faculty: string;
    room: string;
    type: 'lecture' | 'lab' | 'tutorial' | 'break';
    department: string;
    year: string;
    section: string;
}

interface DaySchedule {
    day: string;
    slots: TimeSlot[];
}

interface Reminder {
    id: string;
    slotId: string;
    reminderTime: number;
    isEnabled: boolean;
    message: string;
}

interface NavigationItem {
    name: string;
    icon: React.ReactNode;
    path: string;
}

interface Period {
    period: number;
    startTime: string;
    endTime: string;
    isBreak?: boolean;
    breakName?: string;
}

function TimetablePage() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [activeItem, setActiveItem] = useState('Timetable Reminder');
    const [currentView, setCurrentView] = useState<'timetable' | 'reminders' | 'settings'>('timetable');
    const [currentTime, setCurrentTime] = useState(new Date());

    // Define standard periods
    const periods: Period[] = [
        { period: 1, startTime: '09:00', endTime: '09:50' },
        { period: 2, startTime: '09:50', endTime: '10:40' },
        { period: 0, startTime: '10:40', endTime: '11:00', isBreak: true, breakName: 'Break' },
        { period: 3, startTime: '11:00', endTime: '11:50' },
        { period: 4, startTime: '11:50', endTime: '12:40' },
        { period: 0, startTime: '12:40', endTime: '01:30', isBreak: true, breakName: 'Lunch' },
        { period: 5, startTime: '01:30', endTime: '02:20' },
        { period: 6, startTime: '02:20', endTime: '03:10' },
        { period: 7, startTime: '03:10', endTime: '04:00' },
        { period: 8, startTime: '04:00', endTime: '04:50' }
    ];

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

    const [timetableData, setTimetableData] = useState<{ [key: string]: { [key: number]: TimeSlot | null } }>({});
    const [reminders, setReminders] = useState<Reminder[]>([]);

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

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Load timetable data
    useEffect(() => {
        const savedTimetable = localStorage.getItem('timetableData');
        const savedReminders = localStorage.getItem('timetableReminders');

        if (savedTimetable) {
            setTimetableData(JSON.parse(savedTimetable));
        } else {
            // Default timetable data in table format
            const defaultTimetable = {
                'Monday': {
                    1: { id: 'mon-1', startTime: '09:00', endTime: '09:50', subject: 'Data Structures', faculty: 'Dr. Rajesh Kumar', room: 'CS-101', type: 'lecture' as const, department: 'CSE', year: '3rd', section: 'A' },
                    2: { id: 'mon-2', startTime: '09:50', endTime: '10:40', subject: 'Database Management', faculty: 'Prof. Priya Sharma', room: 'CS-102', type: 'lecture' as const, department: 'CSE', year: '3rd', section: 'A' },
                    3: { id: 'mon-3', startTime: '11:00', endTime: '11:50', subject: 'Computer Networks', faculty: 'Dr. Ankit Verma', room: 'CS-103', type: 'lecture' as const, department: 'CSE', year: '3rd', section: 'A' },
                    4: { id: 'mon-4', startTime: '11:50', endTime: '12:40', subject: 'Software Engineering', faculty: 'Prof. Sneha Patel', room: 'CS-104', type: 'lecture' as const, department: 'CSE', year: '3rd', section: 'A' },
                    5: { id: 'mon-5', startTime: '01:30', endTime: '02:20', subject: 'Data Structures Lab', faculty: 'Dr. Rajesh Kumar', room: 'CS-Lab-1', type: 'lab' as const, department: 'CSE', year: '3rd', section: 'A' },
                    6: { id: 'mon-6', startTime: '02:20', endTime: '03:10', subject: 'Data Structures Lab', faculty: 'Dr. Rajesh Kumar', room: 'CS-Lab-1', type: 'lab' as const, department: 'CSE', year: '3rd', section: 'A' },
                    7: { id: 'mon-7', startTime: '03:10', endTime: '04:00', subject: 'Data Structures Lab', faculty: 'Dr. Rajesh Kumar', room: 'CS-Lab-1', type: 'lab' as const, department: 'CSE', year: '3rd', section: 'A' },
                    8: null
                },
                'Tuesday': {
                    1: { id: 'tue-1', startTime: '09:00', endTime: '09:50', subject: 'Operating Systems', faculty: 'Dr. Meera Singh', room: 'CS-105', type: 'lecture' as const, department: 'CSE', year: '3rd', section: 'A' },
                    2: { id: 'tue-2', startTime: '09:50', endTime: '10:40', subject: 'Computer Architecture', faculty: 'Prof. Rahul Gupta', room: 'CS-106', type: 'lecture' as const, department: 'CSE', year: '3rd', section: 'A' },
                    3: { id: 'tue-3', startTime: '11:00', endTime: '11:50', subject: 'Mathematics III', faculty: 'Dr. Kavita Joshi', room: 'Math-201', type: 'lecture' as const, department: 'CSE', year: '3rd', section: 'A' },
                    4: { id: 'tue-4', startTime: '11:50', endTime: '12:40', subject: 'Data Structures', faculty: 'Dr. Rajesh Kumar', room: 'CS-101', type: 'tutorial' as const, department: 'CSE', year: '3rd', section: 'A' },
                    5: { id: 'tue-5', startTime: '01:30', endTime: '02:20', subject: 'DBMS Lab', faculty: 'Prof. Priya Sharma', room: 'CS-Lab-2', type: 'lab' as const, department: 'CSE', year: '3rd', section: 'A' },
                    6: { id: 'tue-6', startTime: '02:20', endTime: '03:10', subject: 'DBMS Lab', faculty: 'Prof. Priya Sharma', room: 'CS-Lab-2', type: 'lab' as const, department: 'CSE', year: '3rd', section: 'A' },
                    7: { id: 'tue-7', startTime: '03:10', endTime: '04:00', subject: 'DBMS Lab', faculty: 'Prof. Priya Sharma', room: 'CS-Lab-2', type: 'lab' as const, department: 'CSE', year: '3rd', section: 'A' },
                    8: null
                },
                'Wednesday': {
                    1: { id: 'wed-1', startTime: '09:00', endTime: '09:50', subject: 'Software Engineering', faculty: 'Prof. Sneha Patel', room: 'CS-104', type: 'lecture' as const, department: 'CSE', year: '3rd', section: 'A' },
                    2: { id: 'wed-2', startTime: '09:50', endTime: '10:40', subject: 'Computer Networks', faculty: 'Dr. Ankit Verma', room: 'CS-103', type: 'lecture' as const, department: 'CSE', year: '3rd', section: 'A' },
                    3: { id: 'wed-3', startTime: '11:00', endTime: '11:50', subject: 'Database Management', faculty: 'Prof. Priya Sharma', room: 'CS-102', type: 'lecture' as const, department: 'CSE', year: '3rd', section: 'A' },
                    4: { id: 'wed-4', startTime: '11:50', endTime: '12:40', subject: 'Operating Systems', faculty: 'Dr. Meera Singh', room: 'CS-105', type: 'tutorial' as const, department: 'CSE', year: '3rd', section: 'A' },
                    5: { id: 'wed-5', startTime: '01:30', endTime: '02:20', subject: 'Mathematics III', faculty: 'Dr. Kavita Joshi', room: 'Math-201', type: 'lecture' as const, department: 'CSE', year: '3rd', section: 'A' },
                    6: { id: 'wed-6', startTime: '02:20', endTime: '03:10', subject: 'Computer Architecture', faculty: 'Prof. Rahul Gupta', room: 'CS-106', type: 'tutorial' as const, department: 'CSE', year: '3rd', section: 'A' },
                    7: null,
                    8: null
                },
                'Thursday': {
                    1: { id: 'thu-1', startTime: '09:00', endTime: '09:50', subject: 'Database Management', faculty: 'Prof. Priya Sharma', room: 'CS-102', type: 'lecture' as const, department: 'CSE', year: '3rd', section: 'A' },
                    2: { id: 'thu-2', startTime: '09:50', endTime: '10:40', subject: 'Data Structures', faculty: 'Dr. Rajesh Kumar', room: 'CS-101', type: 'lecture' as const, department: 'CSE', year: '3rd', section: 'A' },
                    3: { id: 'thu-3', startTime: '11:00', endTime: '11:50', subject: 'Operating Systems', faculty: 'Dr. Meera Singh', room: 'CS-105', type: 'lecture' as const, department: 'CSE', year: '3rd', section: 'A' },
                    4: { id: 'thu-4', startTime: '11:50', endTime: '12:40', subject: 'Computer Networks', faculty: 'Dr. Ankit Verma', room: 'CS-103', type: 'tutorial' as const, department: 'CSE', year: '3rd', section: 'A' },
                    5: { id: 'thu-5', startTime: '01:30', endTime: '02:20', subject: 'Networks Lab', faculty: 'Dr. Ankit Verma', room: 'CS-Lab-3', type: 'lab' as const, department: 'CSE', year: '3rd', section: 'A' },
                    6: { id: 'thu-6', startTime: '02:20', endTime: '03:10', subject: 'Networks Lab', faculty: 'Dr. Ankit Verma', room: 'CS-Lab-3', type: 'lab' as const, department: 'CSE', year: '3rd', section: 'A' },
                    7: { id: 'thu-7', startTime: '03:10', endTime: '04:00', subject: 'Networks Lab', faculty: 'Dr. Ankit Verma', room: 'CS-Lab-3', type: 'lab' as const, department: 'CSE', year: '3rd', section: 'A' },
                    8: null
                },
                'Friday': {
                    1: { id: 'fri-1', startTime: '09:00', endTime: '09:50', subject: 'Mathematics III', faculty: 'Dr. Kavita Joshi', room: 'Math-201', type: 'lecture' as const, department: 'CSE', year: '3rd', section: 'A' },
                    2: { id: 'fri-2', startTime: '09:50', endTime: '10:40', subject: 'Software Engineering', faculty: 'Prof. Sneha Patel', room: 'CS-104', type: 'lecture' as const, department: 'CSE', year: '3rd', section: 'A' },
                    3: { id: 'fri-3', startTime: '11:00', endTime: '11:50', subject: 'Computer Architecture', faculty: 'Prof. Rahul Gupta', room: 'CS-106', type: 'lecture' as const, department: 'CSE', year: '3rd', section: 'A' },
                    4: { id: 'fri-4', startTime: '11:50', endTime: '12:40', subject: 'Database Management', faculty: 'Prof. Priya Sharma', room: 'CS-102', type: 'tutorial' as const, department: 'CSE', year: '3rd', section: 'A' },
                    5: { id: 'fri-5', startTime: '01:30', endTime: '02:20', subject: 'Software Engineering', faculty: 'Prof. Sneha Patel', room: 'CS-104', type: 'tutorial' as const, department: 'CSE', year: '3rd', section: 'A' },
                    6: { id: 'fri-6', startTime: '02:20', endTime: '03:10', subject: 'Mathematics III', faculty: 'Dr. Kavita Joshi', room: 'Math-201', type: 'tutorial' as const, department: 'CSE', year: '3rd', section: 'A' },
                    7: null,
                    8: null
                },
                'Saturday': {
                    1: { id: 'sat-1', startTime: '09:00', endTime: '09:50', subject: 'Professional Communication', faculty: 'Prof. Rekha Nair', room: 'Eng-201', type: 'lecture' as const, department: 'CSE', year: '3rd', section: 'A' },
                    2: { id: 'sat-2', startTime: '09:50', endTime: '10:40', subject: 'Environmental Studies', faculty: 'Dr. Suresh Reddy', room: 'Gen-101', type: 'lecture' as const, department: 'CSE', year: '3rd', section: 'A' },
                    3: { id: 'sat-3', startTime: '11:00', endTime: '11:50', subject: 'Seminar', faculty: 'Class Coordinator', room: 'CS-Seminar Hall', type: 'tutorial' as const, department: 'CSE', year: '3rd', section: 'A' },
                    4: null,
                    5: null,
                    6: null,
                    7: null,
                    8: null
                }
            };

            setTimetableData(defaultTimetable);
            localStorage.setItem('timetableData', JSON.stringify(defaultTimetable));
        }

        if (savedReminders) {
            setReminders(JSON.parse(savedReminders));
        }
    }, []);

    // Update current time every minute
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);
        return () => clearInterval(timer);
    }, []);

    const handleNavClick = (itemName: string, path?: string) => {
        setActiveItem(itemName);
        setIsSidebarOpen(false);

        if (path && path !== '/student/timetable') {
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

    const getSlotTypeColor = (type: string) => {
        switch (type) {
            case 'lecture':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'lab':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'tutorial':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
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

    const formatTime = (time: string) => {
        const [hours, minutes] = time.split(':').map(Number);
        const period = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
        return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
    };

    const getCurrentSlot = () => {
        const today = new Date().getDay();
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const currentDay = dayNames[today];

        if (!timetableData[currentDay]) return null;

        const now = currentTime.getHours().toString().padStart(2, '0') + ':' + currentTime.getMinutes().toString().padStart(2, '0');

        for (const period of periods) {
            if (!period.isBreak) {
                const slot = timetableData[currentDay][period.period];
                if (slot && now >= slot.startTime && now <= slot.endTime) {
                    return slot;
                }
            }
        }
        return null;
    };

    const getNextSlot = () => {
        const today = new Date().getDay();
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const currentDay = dayNames[today];

        if (!timetableData[currentDay]) return null;

        const now = currentTime.getHours().toString().padStart(2, '0') + ':' + currentTime.getMinutes().toString().padStart(2, '0');

        for (const period of periods) {
            if (!period.isBreak) {
                const slot = timetableData[currentDay][period.period];
                if (slot && slot.startTime > now) {
                    return slot;
                }
            }
        }
        return null;
    };

    const currentSlot = getCurrentSlot();
    const nextSlot = getNextSlot();

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

        .current-status {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .status-card {
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

        /* Current Class Overview */
        .current-class-section {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 24px;
          border: 1px solid rgba(255, 105, 105, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
        }

        .current-next-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .class-card {
          background: rgba(255, 255, 255, 0.8);
          border-radius: 12px;
          padding: 20px;
          border: 1px solid rgba(255, 105, 105, 0.1);
          text-align: center;
        }

        .class-card.current {
          border-left: 4px solid #22c55e;
          background: rgba(34, 197, 94, 0.05);
        }

        .class-card.next {
          border-left: 4px solid #3b82f6;
          background: rgba(59, 130, 246, 0.05);
        }

        .class-card.empty {
          border-left: 4px solid #9ca3af;
          background: rgba(156, 163, 175, 0.05);
          color: #666;
        }

        .class-status {
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }

        .class-status.current {
          color: #22c55e;
        }

        .class-status.next {
          color: #3b82f6;
        }

        .class-title {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
        }

        .class-details {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 14px;
          color: #666;
        }

        /* Timetable Table */
        .timetable-section {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 24px;
          border: 1px solid rgba(255, 105, 105, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
          overflow-x: auto;
        }

        .timetable-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 800px;
        }

        .timetable-table th,
        .timetable-table td {
          border: 1px solid rgba(255, 105, 105, 0.2);
          padding: 12px 8px;
          text-align: center;
          vertical-align: middle;
        }

        .timetable-table th {
          background: linear-gradient(135deg, #FF6969, #BB2525);
          color: white;
          font-weight: 600;
          font-size: 14px;
        }

        .time-header {
          background: rgba(255, 105, 105, 0.1) !important;
          color: #BB2525 !important;
          font-weight: 600;
          min-width: 100px;
        }

        .break-row {
          background: rgba(156, 163, 175, 0.1);
          color: #666;
          font-weight: 500;
        }

        .subject-cell {
          background: rgba(255, 255, 255, 0.8);
          min-width: 120px;
          position: relative;
          cursor: pointer;
          transition: all 0.2s;
        }

        .subject-cell:hover {
          background: rgba(255, 105, 105, 0.05);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .subject-cell.lecture {
          background: rgba(59, 130, 246, 0.05);
          border-left: 3px solid #3b82f6;
        }

        .subject-cell.lab {
          background: rgba(34, 197, 94, 0.05);
          border-left: 3px solid #22c55e;
        }

        .subject-cell.tutorial {
          background: rgba(147, 51, 234, 0.05);
          border-left: 3px solid #9333ea;
        }

        .subject-cell.empty {
          background: #f9fafb;
          color: #9ca3af;
        }

        .subject-name {
          font-weight: 600;
          color: #333;
          font-size: 13px;
          margin-bottom: 2px;
        }

        .faculty-name {
          font-size: 11px;
          color: #666;
          margin-bottom: 2px;
        }

        .room-number {
          font-size: 10px;
          color: #888;
        }

        .subject-type {
          position: absolute;
          top: 2px;
          right: 2px;
          padding: 1px 4px;
          border-radius: 3px;
          font-size: 8px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .subject-type.lecture {
          background: #3b82f6;
          color: white;
        }

        .subject-type.lab {
          background: #22c55e;
          color: white;
        }

        .subject-type.tutorial {
          background: #9333ea;
          color: white;
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

          .current-next-cards {
            grid-template-columns: 1fr;
          }

          .timetable-section {
            padding: 16px;
          }

          .timetable-table th,
          .timetable-table td {
            padding: 8px 4px;
            font-size: 12px;
          }

          .subject-name {
            font-size: 11px;
          }

          .faculty-name {
            font-size: 9px;
          }

          .room-number {
            font-size: 8px;
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
                        <span className="notification-badge">{reminders.filter(r => r.isEnabled).length}</span>
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
                                    <Calendar size={24} />
                                </div>
                                Weekly Timetable
                            </h1>
                        </div>
                    </div>

                    <div className="current-status">
                        <div className="status-card">
                            <Clock size={16} />
                            <span>Current Time: {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <div className="status-card">
                            <Calendar size={16} />
                            <span>{currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
                        </div>
                    </div>
                </div>

                {/* Current Class Overview */}
                <div className="current-class-section">
                    <h2 style={{ marginBottom: '20px', color: '#333', fontSize: '20px', fontWeight: '600' }}>
                        Current Status
                    </h2>

                    <div className="current-next-cards">
                        <div className={`class-card ${currentSlot ? 'current' : 'empty'}`}>
                            {currentSlot ? (
                                <>
                                    <div className="class-status current">Current Class</div>
                                    <div className="class-title">{currentSlot.subject}</div>
                                    <div className="class-details">
                                        <span>👨‍🏫 {currentSlot.faculty}</span>
                                        <span>📍 {currentSlot.room}</span>
                                        <span>⏰ {formatTime(currentSlot.startTime)} - {formatTime(currentSlot.endTime)}</span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="class-status">No Current Class</div>
                                    <div>
                                        <Calendar size={32} style={{ margin: '0 auto 8px', opacity: 0.6 }} />
                                        <p>No class is currently in session</p>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className={`class-card ${nextSlot ? 'next' : 'empty'}`}>
                            {nextSlot ? (
                                <>
                                    <div className="class-status next">Next Class</div>
                                    <div className="class-title">{nextSlot.subject}</div>
                                    <div className="class-details">
                                        <span>👨‍🏫 {nextSlot.faculty}</span>
                                        <span>📍 {nextSlot.room}</span>
                                        <span>⏰ {formatTime(nextSlot.startTime)} - {formatTime(nextSlot.endTime)}</span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="class-status">No More Classes</div>
                                    <div>
                                        <CheckCircle size={32} style={{ margin: '0 auto 8px', opacity: 0.6 }} />
                                        <p>No more classes today</p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Timetable Table */}
                <div className="timetable-section">
                    <h2 style={{ marginBottom: '20px', color: '#333', fontSize: '20px', fontWeight: '600' }}>
                        Weekly Timetable - {studentData.year} {studentData.section} ({studentData.department})
                    </h2>

                    <table className="timetable-table">
                        <thead>
                            <tr>
                                <th className="time-header">Period / Day</th>
                                {daysOfWeek.map(day => (
                                    <th key={day}>{day}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {periods.map((period, index) => (
                                <tr key={index} className={period.isBreak ? 'break-row' : ''}>
                                    <td className="time-header">
                                        {period.isBreak ? (
                                            <div>
                                                <div style={{ fontWeight: '600', fontSize: '12px' }}>{period.breakName}</div>
                                                <div style={{ fontSize: '10px' }}>
                                                    {formatTime(period.startTime)} - {formatTime(period.endTime)}
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <div style={{ fontWeight: '600', fontSize: '12px' }}>Period {period.period}</div>
                                                <div style={{ fontSize: '10px' }}>
                                                    {formatTime(period.startTime)} - {formatTime(period.endTime)}
                                                </div>
                                            </div>
                                        )}
                                    </td>
                                    {daysOfWeek.map(day => (
                                        <td key={`${day}-${period.period}`} className={period.isBreak ? 'break-row' : 'subject-cell'}>
                                            {period.isBreak ? (
                                                <span style={{ fontSize: '12px', fontWeight: '500' }}>{period.breakName}</span>
                                            ) : (
                                                (() => {
                                                    const slot = timetableData[day]?.[period.period];
                                                    if (slot) {
                                                        return (
                                                            <div className={`subject-cell ${slot.type}`}>
                                                                <div className="subject-name">{slot.subject}</div>
                                                                <div className="faculty-name">{slot.faculty}</div>
                                                                <div className="room-number">{slot.room}</div>
                                                                <span className={`subject-type ${slot.type}`}>{slot.type}</span>
                                                            </div>
                                                        );
                                                    } else {
                                                        return (
                                                            <div className="subject-cell empty">
                                                                <span style={{ fontSize: '12px', color: '#9ca3af' }}>Free Period</span>
                                                            </div>
                                                        );
                                                    }
                                                })()
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Legend */}
                <div className="timetable-section">
                    <h3 style={{ marginBottom: '16px', color: '#333', fontSize: '16px', fontWeight: '600' }}>
                        Legend
                    </h3>
                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '16px', height: '16px', background: '#3b82f6', borderRadius: '3px' }}></div>
                            <span style={{ fontSize: '14px' }}>Lecture</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '16px', height: '16px', background: '#22c55e', borderRadius: '3px' }}></div>
                            <span style={{ fontSize: '14px' }}>Lab</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '16px', height: '16px', background: '#9333ea', borderRadius: '3px' }}></div>
                            <span style={{ fontSize: '14px' }}>Tutorial</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '16px', height: '16px', background: '#9ca3af', borderRadius: '3px' }}></div>
                            <span style={{ fontSize: '14px' }}>Break</span>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default TimetablePage;
