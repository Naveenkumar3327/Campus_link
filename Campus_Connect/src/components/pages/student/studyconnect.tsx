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
    MapPin,
    Clock,
    Edit3,
    Trash2,
    Eye,
    Heart,
    UserPlus,
    CheckCircle,
    AlertCircle,
    Video,
    Coffee,
    Award,
    Target,
    BookmarkPlus,
    Activity
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

interface StudyGroup {
    id: string;
    name: string;
    description: string;
    subject: string;
    category: 'study-group' | 'project-team' | 'exam-prep' | 'skill-development';
    maxMembers: number;
    currentMembers: number;
    members: StudyMember[];
    creatorName: string;
    creatorEmail: string;
    createdDate: string;
    meetingSchedule: string;
    location: string;
    isOnline: boolean;
    tags: string[];
    isJoined: boolean;
    isMyGroup: boolean;
    status: 'active' | 'completed' | 'paused';
    privacy: 'public' | 'private';
    requirements: string;
    achievements: string[];
}

interface StudyMember {
    id: string;
    name: string;
    email: string;
    department: string;
    year: string;
    role: 'creator' | 'moderator' | 'member';
    joinedDate: string;
    avatar?: string;
}

interface StudyBuddy {
    id: string;
    name: string;
    email: string;
    department: string;
    year: string;
    section: string;
    subjects: string[];
    studyPreferences: string[];
    availability: string[];
    location: string;
    bio: string;
    rating: number;
    studyHours: number;
    isConnected: boolean;
    lastActive: string;
    achievements: string[];
}

interface NavigationItem {
    name: string;
    icon: React.ReactNode;
    path: string;
}

function StudyConnectPage() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [activeItem, setActiveItem] = useState('StudyConnect');
    const [currentView, setCurrentView] = useState<'groups' | 'buddies' | 'create' | 'my-groups'>('groups');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedSubject, setSelectedSubject] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<StudyGroup | null>(null);
    const [selectedBuddy, setSelectedBuddy] = useState<StudyBuddy | null>(null);
    const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([]);
    const [studyBuddies, setStudyBuddies] = useState<StudyBuddy[]>([]);

    // Create group form state
    const [groupForm, setGroupForm] = useState({
        name: '',
        description: '',
        subject: '',
        category: 'study-group' as 'study-group' | 'project-team' | 'exam-prep' | 'skill-development',
        maxMembers: 5,
        meetingSchedule: '',
        location: '',
        isOnline: false,
        privacy: 'public' as 'public' | 'private',
        requirements: '',
        tags: ''
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
        { value: 'study-group', label: 'Study Group', icon: <BookOpen size={16} />, description: 'Regular study sessions' },
        { value: 'project-team', label: 'Project Team', icon: <Users size={16} />, description: 'Collaborative projects' },
        { value: 'exam-prep', label: 'Exam Preparation', icon: <Target size={16} />, description: 'Exam focused study' },
        { value: 'skill-development', label: 'Skill Development', icon: <Award size={16} />, description: 'Learn new skills' }
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
        'Environmental Studies',
        'Web Development',
        'Machine Learning',
        'Competitive Programming'
    ];

    // Load data from localStorage
    useEffect(() => {
        const savedGroups = localStorage.getItem('studyConnectGroups');
        const savedBuddies = localStorage.getItem('studyBuddies');

        if (savedGroups) {
            setStudyGroups(JSON.parse(savedGroups));
        } else {
            // Default study groups data
            const defaultGroups: StudyGroup[] = [
                {
                    id: 'SC001',
                    name: 'Data Structures Mastery',
                    description: 'Join us for comprehensive Data Structures study sessions. We cover all topics from basic arrays to advanced trees and graphs. Perfect for exam preparation and interview prep.',
                    subject: 'Data Structures',
                    category: 'study-group',
                    maxMembers: 6,
                    currentMembers: 4,
                    members: [
                        { id: 'm1', name: 'Priya Sharma', email: 'priya@sece.ac.in', department: 'CSE', year: '3rd Year', role: 'creator', joinedDate: '2025-01-20T00:00:00Z' },
                        { id: 'm2', name: 'Rahul Kumar', email: 'rahul@sece.ac.in', department: 'CSE', year: '3rd Year', role: 'member', joinedDate: '2025-01-21T00:00:00Z' },
                        { id: 'm3', name: 'Sneha Patel', email: 'sneha@sece.ac.in', department: 'CSE', year: '3rd Year', role: 'member', joinedDate: '2025-01-22T00:00:00Z' },
                        { id: 'm4', name: 'Ankit Verma', email: 'ankit@sece.ac.in', department: 'CSE', year: '3rd Year', role: 'moderator', joinedDate: '2025-01-23T00:00:00Z' }
                    ],
                    creatorName: 'Priya Sharma',
                    creatorEmail: 'priya.sharma@sece.ac.in',
                    createdDate: '2025-01-20T10:30:00Z',
                    meetingSchedule: 'Mon, Wed, Fri - 6:00 PM',
                    location: 'Library Study Hall 2',
                    isOnline: false,
                    tags: ['algorithms', 'data-structures', 'programming', 'interviews'],
                    isJoined: false,
                    isMyGroup: false,
                    status: 'active',
                    privacy: 'public',
                    requirements: 'Basic programming knowledge required',
                    achievements: ['Completed 15 study sessions', 'Solved 100+ problems']
                },
                {
                    id: 'SC002',
                    name: 'Web Dev Warriors',
                    description: 'Learn modern web development technologies together. We focus on React, Node.js, MongoDB, and deployment strategies. Build real projects while learning.',
                    subject: 'Web Development',
                    category: 'skill-development',
                    maxMembers: 8,
                    currentMembers: 6,
                    members: [
                        { id: 'm5', name: 'Kavita Joshi', email: 'kavita@sece.ac.in', department: 'CSE', year: '2nd Year', role: 'creator', joinedDate: '2025-01-18T00:00:00Z' }
                    ],
                    creatorName: 'Kavita Joshi',
                    creatorEmail: 'kavita.joshi@sece.ac.in',
                    createdDate: '2025-01-18T14:15:00Z',
                    meetingSchedule: 'Tues, Thurs - 7:00 PM',
                    location: 'Online (Discord)',
                    isOnline: true,
                    tags: ['react', 'nodejs', 'fullstack', 'projects'],
                    isJoined: true,
                    isMyGroup: false,
                    status: 'active',
                    privacy: 'public',
                    requirements: 'HTML, CSS, JavaScript basics',
                    achievements: ['Built 3 full-stack projects', '50+ GitHub commits']
                },
                {
                    id: 'SC003',
                    name: 'DBMS Final Exam Prep',
                    description: 'Intensive preparation for DBMS final exams. We solve previous year papers, practice SQL queries, and review all concepts thoroughly.',
                    subject: 'Database Management',
                    category: 'exam-prep',
                    maxMembers: 10,
                    currentMembers: 8,
                    members: [
                        { id: 'm6', name: 'Rajesh Kumar', email: 'rajesh@sece.ac.in', department: 'CSE', year: '3rd Year', role: 'creator', joinedDate: '2025-01-15T00:00:00Z' }
                    ],
                    creatorName: 'Rajesh Kumar',
                    creatorEmail: 'rajesh.kumar@sece.ac.in',
                    createdDate: '2025-01-15T09:45:00Z',
                    meetingSchedule: 'Daily - 5:00 PM',
                    location: 'CS Department Lab 1',
                    isOnline: false,
                    tags: ['dbms', 'sql', 'exam-prep', 'previous-papers'],
                    isJoined: false,
                    isMyGroup: false,
                    status: 'active',
                    privacy: 'public',
                    requirements: 'Must be enrolled in DBMS course',
                    achievements: ['Solved 50+ SQL problems', 'Completed 10 mock tests']
                },
                {
                    id: 'SC004',
                    name: 'My Study Circle',
                    description: 'A focused study group for Computer Networks and Software Engineering. We meet regularly to discuss concepts, solve problems, and prepare for exams together.',
                    subject: 'Computer Networks',
                    category: 'study-group',
                    maxMembers: 5,
                    currentMembers: 3,
                    members: [
                        { id: 'm7', name: studentData.name, email: studentData.email, department: 'CSE', year: '3rd Year', role: 'creator', joinedDate: '2025-01-25T00:00:00Z' },
                        { id: 'm8', name: 'Meera Singh', email: 'meera@sece.ac.in', department: 'CSE', year: '3rd Year', role: 'member', joinedDate: '2025-01-26T00:00:00Z' },
                        { id: 'm9', name: 'Suresh Reddy', email: 'suresh@sece.ac.in', department: 'CSE', year: '3rd Year', role: 'member', joinedDate: '2025-01-26T00:00:00Z' }
                    ],
                    creatorName: studentData.name,
                    creatorEmail: studentData.email,
                    createdDate: '2025-01-25T11:00:00Z',
                    meetingSchedule: 'Mon, Wed - 4:00 PM',
                    location: 'Study Room 3, Library',
                    isOnline: false,
                    tags: ['networking', 'protocols', 'study-group'],
                    isJoined: true,
                    isMyGroup: true,
                    status: 'active',
                    privacy: 'public',
                    requirements: 'Regular attendance expected',
                    achievements: ['Consistent study schedule', 'Good progress tracking']
                },
                {
                    id: 'SC005',
                    name: 'Competitive Programming Club',
                    description: 'Practice competitive programming problems together. We solve challenges from Codeforces, LeetCode, and prepare for coding contests.',
                    subject: 'Competitive Programming',
                    category: 'skill-development',
                    maxMembers: 12,
                    currentMembers: 9,
                    members: [
                        { id: 'm10', name: 'Arjun Patel', email: 'arjun@sece.ac.in', department: 'CSE', year: '2nd Year', role: 'creator', joinedDate: '2025-01-10T00:00:00Z' }
                    ],
                    creatorName: 'Arjun Patel',
                    creatorEmail: 'arjun.patel@sece.ac.in',
                    createdDate: '2025-01-10T16:20:00Z',
                    meetingSchedule: 'Sat, Sun - 10:00 AM',
                    location: 'Computer Lab 3',
                    isOnline: false,
                    tags: ['competitive-programming', 'algorithms', 'contests', 'problem-solving'],
                    isJoined: false,
                    isMyGroup: false,
                    status: 'active',
                    privacy: 'public',
                    requirements: 'Basic DSA knowledge, coding experience',
                    achievements: ['Participated in 5 contests', 'Improved average rating']
                }
            ];

            setStudyGroups(defaultGroups);
            localStorage.setItem('studyConnectGroups', JSON.stringify(defaultGroups));
        }

        if (savedBuddies) {
            setStudyBuddies(JSON.parse(savedBuddies));
        } else {
            // Default study buddies data
            const defaultBuddies: StudyBuddy[] = [
                {
                    id: 'SB001',
                    name: 'Ravi Sharma',
                    email: 'ravi.sharma@sece.ac.in',
                    department: 'Computer Science Engineering',
                    year: '3rd Year',
                    section: 'B',
                    subjects: ['Data Structures', 'Computer Networks', 'Operating Systems'],
                    studyPreferences: ['Group Study', 'Problem Solving', 'Mock Tests'],
                    availability: ['Weekday Evenings', 'Weekend Mornings'],
                    location: 'Campus Library',
                    bio: 'Passionate about algorithms and data structures. Love solving complex problems and helping others understand difficult concepts.',
                    rating: 4.8,
                    studyHours: 156,
                    isConnected: false,
                    lastActive: '2025-01-26T18:30:00Z',
                    achievements: ['Top 10 in class', 'Coding contest winner', 'Study group leader']
                },
                {
                    id: 'SB002',
                    name: 'Nikita Agarwal',
                    email: 'nikita.agarwal@sece.ac.in',
                    department: 'Computer Science Engineering',
                    year: '3rd Year',
                    section: 'A',
                    subjects: ['Database Management', 'Software Engineering', 'Web Development'],
                    studyPreferences: ['Project Work', 'Practical Learning', 'Code Reviews'],
                    availability: ['Weekday Afternoons', 'Weekend Evenings'],
                    location: 'CS Department Lab',
                    bio: 'Full-stack developer enthusiast. Enjoy building projects and learning new technologies. Always ready to collaborate on interesting projects.',
                    rating: 4.6,
                    studyHours: 142,
                    isConnected: true,
                    lastActive: '2025-01-26T20:15:00Z',
                    achievements: ['Published 2 projects', 'Internship at tech company', 'Mentor to juniors']
                },
                {
                    id: 'SB003',
                    name: 'Amit Kumar',
                    email: 'amit.kumar@sece.ac.in',
                    department: 'Computer Science Engineering',
                    year: '2nd Year',
                    section: 'A',
                    subjects: ['Mathematics III', 'Computer Architecture', 'Data Structures'],
                    studyPreferences: ['Theory Discussion', 'Concept Clarity', 'Regular Practice'],
                    availability: ['Morning Sessions', 'Evening Study'],
                    location: 'Study Hall 1',
                    bio: 'Strong foundation in mathematics and logical thinking. Enjoy explaining concepts and learning through discussions.',
                    rating: 4.4,
                    studyHours: 128,
                    isConnected: false,
                    lastActive: '2025-01-26T14:45:00Z',
                    achievements: ['Mathematics topper', 'Regular study schedule', 'Helped 15+ students']
                },
                {
                    id: 'SB004',
                    name: 'Pooja Reddy',
                    email: 'pooja.reddy@sece.ac.in',
                    department: 'Computer Science Engineering',
                    year: '3rd Year',
                    section: 'B',
                    subjects: ['Machine Learning', 'Data Structures', 'Python Programming'],
                    studyPreferences: ['Research Work', 'Advanced Topics', 'Innovation'],
                    availability: ['Flexible Schedule', 'Weekend Sessions'],
                    location: 'Research Lab',
                    bio: 'Interested in AI/ML and research. Currently working on machine learning projects and always looking for study partners with similar interests.',
                    rating: 4.9,
                    studyHours: 189,
                    isConnected: false,
                    lastActive: '2025-01-26T16:20:00Z',
                    achievements: ['Research paper published', 'ML project winner', 'Innovation award']
                }
            ];

            setStudyBuddies(defaultBuddies);
            localStorage.setItem('studyBuddies', JSON.stringify(defaultBuddies));
        }
    }, [studentData]);

    const handleNavClick = (itemName: string, path?: string) => {
        setActiveItem(itemName);
        setIsSidebarOpen(false);

        if (path && path !== '/student/study-connect') {
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
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const checkbox = e.target as HTMLInputElement;
            setGroupForm(prev => ({ ...prev, [name]: checkbox.checked }));
        } else {
            setGroupForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!groupForm.name || !groupForm.description || !groupForm.subject) {
            alert('Please fill in all required fields.');
            return;
        }

        setIsSubmitting(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            const newGroup: StudyGroup = {
                id: `SC${String(studyGroups.length + 1).padStart(3, '0')}`,
                name: groupForm.name,
                description: groupForm.description,
                subject: groupForm.subject,
                category: groupForm.category,
                maxMembers: groupForm.maxMembers,
                currentMembers: 1,
                members: [{
                    id: 'creator',
                    name: studentData.name,
                    email: studentData.email,
                    department: studentData.department,
                    year: studentData.year,
                    role: 'creator',
                    joinedDate: new Date().toISOString()
                }],
                creatorName: studentData.name,
                creatorEmail: studentData.email,
                createdDate: new Date().toISOString(),
                meetingSchedule: groupForm.meetingSchedule,
                location: groupForm.location,
                isOnline: groupForm.isOnline,
                tags: groupForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
                isJoined: true,
                isMyGroup: true,
                status: 'active',
                privacy: groupForm.privacy,
                requirements: groupForm.requirements,
                achievements: []
            };

            const updatedGroups = [newGroup, ...studyGroups];
            setStudyGroups(updatedGroups);
            localStorage.setItem('studyConnectGroups', JSON.stringify(updatedGroups));

            // Reset form
            setGroupForm({
                name: '',
                description: '',
                subject: '',
                category: 'study-group',
                maxMembers: 5,
                meetingSchedule: '',
                location: '',
                isOnline: false,
                privacy: 'public',
                requirements: '',
                tags: ''
            });

            alert('Study group created successfully!');
            setCurrentView('groups');
        } catch (error) {
            alert('Failed to create study group. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const joinGroup = (groupId: string) => {
        const updatedGroups = studyGroups.map(group => {
            if (group.id === groupId && !group.isJoined && group.currentMembers < group.maxMembers) {
                const newMember: StudyMember = {
                    id: `member-${Date.now()}`,
                    name: studentData.name,
                    email: studentData.email,
                    department: studentData.department,
                    year: studentData.year,
                    role: 'member',
                    joinedDate: new Date().toISOString()
                };

                return {
                    ...group,
                    isJoined: true,
                    currentMembers: group.currentMembers + 1,
                    members: [...group.members, newMember]
                };
            }
            return group;
        });

        setStudyGroups(updatedGroups);
        localStorage.setItem('studyConnectGroups', JSON.stringify(updatedGroups));
    };

    const leaveGroup = (groupId: string) => {
        if (window.confirm('Are you sure you want to leave this group?')) {
            const updatedGroups = studyGroups.map(group => {
                if (group.id === groupId && group.isJoined) {
                    const updatedMembers = group.members.filter(member => member.email !== studentData.email);
                    return {
                        ...group,
                        isJoined: false,
                        currentMembers: group.currentMembers - 1,
                        members: updatedMembers
                    };
                }
                return group;
            });

            setStudyGroups(updatedGroups);
            localStorage.setItem('studyConnectGroups', JSON.stringify(updatedGroups));
        }
    };

    const connectWithBuddy = (buddyId: string) => {
        const updatedBuddies = studyBuddies.map(buddy => {
            if (buddy.id === buddyId) {
                return { ...buddy, isConnected: !buddy.isConnected };
            }
            return buddy;
        });

        setStudyBuddies(updatedBuddies);
        localStorage.setItem('studyBuddies', JSON.stringify(updatedBuddies));
    };

    const openGroupModal = (group: StudyGroup) => {
        setSelectedGroup(group);
    };

    const closeGroupModal = () => {
        setSelectedGroup(null);
    };

    const openBuddyModal = (buddy: StudyBuddy) => {
        setSelectedBuddy(buddy);
    };

    const closeBuddyModal = () => {
        setSelectedBuddy(null);
    };

    // Filter groups and buddies
    const filteredGroups = studyGroups.filter(group => {
        const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            group.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesCategory = selectedCategory === 'all' || group.category === selectedCategory;
        const matchesSubject = selectedSubject === 'all' || group.subject === selectedSubject;

        const matchesView = currentView === 'groups' ||
            (currentView === 'my-groups' && group.isMyGroup);

        return matchesSearch && matchesCategory && matchesSubject && matchesView;
    });

    const filteredBuddies = studyBuddies.filter(buddy => {
        const matchesSearch = buddy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            buddy.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
            buddy.subjects.some(subject => subject.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesSubject = selectedSubject === 'all' || buddy.subjects.includes(selectedSubject);

        return matchesSearch && matchesSubject;
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

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'study-group':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'project-team':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'exam-prep':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'skill-development':
                return 'bg-purple-100 text-purple-800 border-purple-200';
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

    const myGroupsCount = studyGroups.filter(g => g.isMyGroup).length;
    const joinedGroupsCount = studyGroups.filter(g => g.isJoined).length;
    const connectedBuddiesCount = studyBuddies.filter(b => b.isConnected).length;

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

        /* Create Form */
        .create-form {
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

        .checkbox-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .checkbox-input {
          width: auto;
          margin: 0;
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

        /* Content Containers */
        .content-container {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          padding: 24px;
          border: 1px solid rgba(255, 105, 105, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
        }

        .content-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 20px;
        }

        /* Study Group Cards */
        .group-card {
          background: rgba(255, 255, 255, 0.8);
          border-radius: 12px;
          padding: 20px;
          border: 1px solid rgba(255, 105, 105, 0.1);
          transition: all 0.2s;
          cursor: pointer;
          position: relative;
        }

        .group-card:hover {
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }

        .group-card.my-group {
          border-left: 4px solid #FF6969;
        }

        .group-card.joined {
          border-left: 4px solid #22c55e;
        }

        .group-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }

        .group-badges {
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

        .group-actions {
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

        .group-title {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
          line-height: 1.3;
        }

        .group-description {
          color: #666;
          font-size: 14px;
          line-height: 1.5;
          margin-bottom: 12px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .group-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          color: #888;
          margin-bottom: 12px;
        }

        .group-members {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .members-avatars {
          display: flex;
          margin-right: 8px;
        }

        .member-avatar {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #FF6969, #BB2525);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 10px;
          font-weight: 600;
          margin-left: -4px;
          border: 2px solid white;
        }

        .group-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 12px;
        }

        .join-btn {
          padding: 8px 16px;
          border: none;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 12px;
        }

        .join-btn.join {
          background: linear-gradient(135deg, #FF6969, #BB2525);
          color: white;
        }

        .join-btn.joined {
          background: #22c55e;
          color: white;
        }

        .join-btn.leave {
          background: #ef4444;
          color: white;
        }

        .join-btn:hover {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        /* Study Buddy Cards */
        .buddy-card {
          background: rgba(255, 255, 255, 0.8);
          border-radius: 12px;
          padding: 20px;
          border: 1px solid rgba(255, 105, 105, 0.1);
          transition: all 0.2s;
          cursor: pointer;
          position: relative;
        }

        .buddy-card:hover {
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }

        .buddy-card.connected {
          border-left: 4px solid #22c55e;
        }

        .buddy-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }

        .buddy-avatar-large {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #FF6969, #BB2525);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .buddy-name {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin-bottom: 4px;
        }

        .buddy-info {
          font-size: 12px;
          color: #666;
          margin-bottom: 8px;
        }

        .buddy-bio {
          color: #666;
          font-size: 14px;
          line-height: 1.5;
          margin-bottom: 12px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .buddy-subjects {
          display: flex;
          gap: 4px;
          flex-wrap: wrap;
          margin-bottom: 12px;
        }

        .subject-tag {
          background: rgba(255, 105, 105, 0.1);
          color: #BB2525;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 500;
        }

        .buddy-stats {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          color: #888;
          margin-bottom: 12px;
        }

        .buddy-rating {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .connect-btn {
          padding: 8px 16px;
          border: none;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 12px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .connect-btn.connect {
          background: linear-gradient(135deg, #FF6969, #BB2525);
          color: white;
        }

        .connect-btn.connected {
          background: #22c55e;
          color: white;
        }

        .connect-btn:hover {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
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

        .members-section {
          background: rgba(255, 105, 105, 0.05);
          border-radius: 12px;
          padding: 20px;
          margin-top: 20px;
        }

        .members-title {
          font-size: 16px;
          font-weight: 600;
          color: #BB2525;
          margin-bottom: 12px;
        }

        .members-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .member-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 8px;
        }

        .member-info {
          flex: 1;
        }

        .member-name {
          font-weight: 600;
          color: #333;
          font-size: 14px;
        }

        .member-details {
          font-size: 12px;
          color: #666;
        }

        .member-role {
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .member-role.creator {
          background: linear-gradient(135deg, #FF6969, #BB2525);
          color: white;
        }

        .member-role.moderator {
          background: #f59e0b;
          color: white;
        }

        .member-role.member {
          background: #6b7280;
          color: white;
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
            justify-content: center;
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

          .content-grid {
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
                        <span className="notification-badge">{joinedGroupsCount}</span>
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
                                    <Users size={24} />
                                </div>
                                StudyConnect
                            </h1>
                        </div>

                        <div className="view-toggle">
                            <button
                                className={`toggle-btn ${currentView === 'groups' ? 'active' : ''}`}
                                onClick={() => setCurrentView('groups')}
                            >
                                <Users size={16} />
                                Groups
                            </button>
                            <button
                                className={`toggle-btn ${currentView === 'buddies' ? 'active' : ''}`}
                                onClick={() => setCurrentView('buddies')}
                            >
                                <User size={16} />
                                Buddies
                            </button>
                            <button
                                className={`toggle-btn ${currentView === 'create' ? 'active' : ''}`}
                                onClick={() => setCurrentView('create')}
                            >
                                <Plus size={16} />
                                Create
                            </button>
                            <button
                                className={`toggle-btn ${currentView === 'my-groups' ? 'active' : ''}`}
                                onClick={() => setCurrentView('my-groups')}
                            >
                                <Star size={16} />
                                My Groups
                            </button>
                        </div>
                    </div>

                    <div className="stats-row">
                        <div className="stat-item">
                            <Users size={16} />
                            <span>{studyGroups.length} Total Groups</span>
                        </div>
                        <div className="stat-item">
                            <CheckCircle size={16} />
                            <span>{joinedGroupsCount} Joined</span>
                        </div>
                        <div className="stat-item">
                            <Star size={16} />
                            <span>{myGroupsCount} My Groups</span>
                        </div>
                        <div className="stat-item">
                            <UserPlus size={16} />
                            <span>{connectedBuddiesCount} Connections</span>
                        </div>
                    </div>
                </div>

                {/* Content Based on Current View */}
                {currentView === 'groups' || currentView === 'my-groups' ? (
                    <>
                        {/* Search and Filter Section */}
                        <div className="search-filter-section">
                            <div className="search-row">
                                <input
                                    type="text"
                                    placeholder="Search groups by name, description, or tags..."
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
                                    {categories.map(category => (
                                        <option key={category.value} value={category.value}>{category.label}</option>
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
                            </div>
                        </div>

                        {/* Study Groups Grid */}
                        <div className="content-container">
                            {filteredGroups.length === 0 ? (
                                <div className="no-items">
                                    <div className="no-items-icon">
                                        <Users size={32} />
                                    </div>
                                    <h3>No Study Groups Found</h3>
                                    <p>Try adjusting your search criteria or create a new group.</p>
                                </div>
                            ) : (
                                <div className="content-grid">
                                    {filteredGroups.map((group) => (
                                        <div
                                            key={group.id}
                                            className={`group-card ${group.isMyGroup ? 'my-group' : ''} ${group.isJoined ? 'joined' : ''}`}
                                            onClick={() => openGroupModal(group)}
                                        >
                                            <div className="group-header">
                                                <div className="group-badges">
                                                    <span className={`badge ${getCategoryColor(group.category)}`}>
                                                        {categories.find(c => c.value === group.category)?.icon}
                                                        {categories.find(c => c.value === group.category)?.label}
                                                    </span>
                                                </div>

                                                <div className="group-actions">
                                                    <button className="action-btn">
                                                        <Heart size={16} />
                                                    </button>
                                                </div>
                                            </div>

                                            <h3 className="group-title">{group.name}</h3>
                                            <p className="group-description">{group.description}</p>

                                            <div className="group-info">
                                                <div className="group-members">
                                                    <div className="members-avatars">
                                                        {group.members.slice(0, 3).map((member, index) => (
                                                            <div key={member.id} className="member-avatar" title={member.name}>
                                                                {getUserInitials(member.name)}
                                                            </div>
                                                        ))}
                                                        {group.members.length > 3 && (
                                                            <div className="member-avatar" title={`+${group.members.length - 3} more`}>
                                                                +{group.members.length - 3}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <span>{group.currentMembers}/{group.maxMembers} members</span>
                                                </div>
                                                <div>
                                                    <span>{group.subject}</span>
                                                </div>
                                            </div>

                                            <div className="group-footer">
                                                <div style={{ fontSize: '12px', color: '#888' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
                                                        <Clock size={12} />
                                                        <span>{group.meetingSchedule}</span>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                        <MapPin size={12} />
                                                        <span>{group.location}</span>
                                                    </div>
                                                </div>

                                                <button
                                                    className={`join-btn ${group.isJoined ? (group.isMyGroup ? 'joined' : 'leave') : 'join'}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (group.isJoined && !group.isMyGroup) {
                                                            leaveGroup(group.id);
                                                        } else if (!group.isJoined) {
                                                            joinGroup(group.id);
                                                        }
                                                    }}
                                                >
                                                    {group.isMyGroup ? 'My Group' : (group.isJoined ? 'Leave' : 'Join')}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                ) : currentView === 'buddies' ? (
                    <>
                        {/* Search Section for Buddies */}
                        <div className="search-filter-section">
                            <div className="search-row">
                                <input
                                    type="text"
                                    placeholder="Search study buddies by name, subjects, or bio..."
                                    className="search-input"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
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
                            </div>
                        </div>

                        {/* Study Buddies Grid */}
                        <div className="content-container">
                            {filteredBuddies.length === 0 ? (
                                <div className="no-items">
                                    <div className="no-items-icon">
                                        <User size={32} />
                                    </div>
                                    <h3>No Study Buddies Found</h3>
                                    <p>Try adjusting your search criteria.</p>
                                </div>
                            ) : (
                                <div className="content-grid">
                                    {filteredBuddies.map((buddy) => (
                                        <div
                                            key={buddy.id}
                                            className={`buddy-card ${buddy.isConnected ? 'connected' : ''}`}
                                            onClick={() => openBuddyModal(buddy)}
                                        >
                                            <div className="buddy-avatar-large">
                                                {getUserInitials(buddy.name)}
                                            </div>

                                            <div className="buddy-name">{buddy.name}</div>
                                            <div className="buddy-info">
                                                {buddy.department} • {buddy.year} {buddy.section}
                                            </div>

                                            <div className="buddy-bio">{buddy.bio}</div>

                                            <div className="buddy-subjects">
                                                {buddy.subjects.slice(0, 3).map(subject => (
                                                    <span key={subject} className="subject-tag">{subject}</span>
                                                ))}
                                                {buddy.subjects.length > 3 && (
                                                    <span className="subject-tag">+{buddy.subjects.length - 3}</span>
                                                )}
                                            </div>

                                            <div className="buddy-stats">
                                                <div className="buddy-rating">
                                                    {renderStars(buddy.rating)}
                                                    <span>({buddy.rating})</span>
                                                </div>
                                                <div>
                                                    <span>{buddy.studyHours}h studied</span>
                                                </div>
                                            </div>

                                            <button
                                                className={`connect-btn ${buddy.isConnected ? 'connected' : 'connect'}`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    connectWithBuddy(buddy.id);
                                                }}
                                            >
                                                {buddy.isConnected ? (
                                                    <>
                                                        <CheckCircle size={14} />
                                                        Connected
                                                    </>
                                                ) : (
                                                    <>
                                                        <UserPlus size={14} />
                                                        Connect
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    /* Create Group Form */
                    <div className="create-form">
                        <h2 style={{ marginBottom: '24px', color: '#333', fontSize: '20px', fontWeight: '600' }}>
                            Create New Study Group
                        </h2>

                        <form onSubmit={handleSubmit}>
                            <div className="form-grid">
                                <div className="form-group full-width">
                                    <label className="form-label">Group Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={groupForm.name}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        placeholder="Enter group name"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Category *</label>
                                    <select
                                        name="category"
                                        value={groupForm.category}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        required
                                    >
                                        {categories.map(category => (
                                            <option key={category.value} value={category.value}>
                                                {category.label} - {category.description}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Subject *</label>
                                    <select
                                        name="subject"
                                        value={groupForm.subject}
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
                                    <label className="form-label">Max Members</label>
                                    <input
                                        type="number"
                                        name="maxMembers"
                                        value={groupForm.maxMembers}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        min="2"
                                        max="20"
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Meeting Schedule</label>
                                    <input
                                        type="text"
                                        name="meetingSchedule"
                                        value={groupForm.meetingSchedule}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        placeholder="e.g., Mon, Wed, Fri - 6:00 PM"
                                    />
                                </div>

                                <div className="form-group full-width">
                                    <label className="form-label">Description *</label>
                                    <textarea
                                        name="description"
                                        value={groupForm.description}
                                        onChange={handleInputChange}
                                        className="form-input form-textarea"
                                        placeholder="Describe your study group, goals, and what members can expect"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Location</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={groupForm.location}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        placeholder="Meeting location"
                                    />
                                </div>

                                <div className="form-group">
                                    <div className="checkbox-group">
                                        <input
                                            type="checkbox"
                                            name="isOnline"
                                            checked={groupForm.isOnline}
                                            onChange={handleInputChange}
                                            className="checkbox-input"
                                        />
                                        <label className="form-label">Online Group</label>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Privacy</label>
                                    <select
                                        name="privacy"
                                        value={groupForm.privacy}
                                        onChange={handleInputChange}
                                        className="form-input"
                                    >
                                        <option value="public">Public</option>
                                        <option value="private">Private</option>
                                    </select>
                                </div>

                                <div className="form-group full-width">
                                    <label className="form-label">Requirements</label>
                                    <textarea
                                        name="requirements"
                                        value={groupForm.requirements}
                                        onChange={handleInputChange}
                                        className="form-input form-textarea"
                                        placeholder="Any specific requirements or expectations for members"
                                    />
                                </div>

                                <div className="form-group full-width">
                                    <label className="form-label">Tags (comma-separated)</label>
                                    <input
                                        type="text"
                                        name="tags"
                                        value={groupForm.tags}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        placeholder="e.g., algorithms, exam-prep, projects"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="submit-btn"
                                disabled={isSubmitting}
                            >
                                {isSubmitting && <span className="loading-spinner"></span>}
                                <Plus size={16} />
                                {isSubmitting ? 'Creating...' : 'Create Study Group'}
                            </button>
                        </form>
                    </div>
                )}
            </main>

            {/* Group Detail Modal */}
            {selectedGroup && (
                <div className="modal-overlay" onClick={closeGroupModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <div style={{ flex: 1 }}>
                                <div className="modal-badges">
                                    <span className={`badge ${getCategoryColor(selectedGroup.category)}`}>
                                        {categories.find(c => c.value === selectedGroup.category)?.icon}
                                        {categories.find(c => c.value === selectedGroup.category)?.label}
                                    </span>
                                    <span className="badge bg-gray-100 text-gray-800 border-gray-200">
                                        {selectedGroup.privacy}
                                    </span>
                                </div>
                            </div>
                            <button className="modal-close" onClick={closeGroupModal}>
                                <X size={24} />
                            </button>
                        </div>

                        <div className="modal-body">
                            <h2 className="modal-title">{selectedGroup.name}</h2>

                            <div className="modal-info-grid">
                                <div className="info-item">
                                    <BookOpen size={16} />
                                    <span>{selectedGroup.subject}</span>
                                </div>
                                <div className="info-item">
                                    <Users size={16} />
                                    <span>{selectedGroup.currentMembers}/{selectedGroup.maxMembers} members</span>
                                </div>
                                <div className="info-item">
                                    <Clock size={16} />
                                    <span>{selectedGroup.meetingSchedule}</span>
                                </div>
                                <div className="info-item">
                                    <MapPin size={16} />
                                    <span>{selectedGroup.location}</span>
                                </div>
                                <div className="info-item">
                                    <User size={16} />
                                    <span>Created by {selectedGroup.creatorName}</span>
                                </div>
                                <div className="info-item">
                                    <Calendar size={16} />
                                    <span>Created {formatDate(selectedGroup.createdDate)}</span>
                                </div>
                            </div>

                            <div className="modal-content-text">
                                {selectedGroup.description}
                            </div>

                            {selectedGroup.requirements && (
                                <div style={{ marginBottom: '20px' }}>
                                    <h4 style={{ marginBottom: '8px', color: '#333' }}>Requirements:</h4>
                                    <p style={{ color: '#666' }}>{selectedGroup.requirements}</p>
                                </div>
                            )}

                            {selectedGroup.tags.length > 0 && (
                                <div style={{ marginBottom: '20px' }}>
                                    <h4 style={{ marginBottom: '8px', color: '#333' }}>Tags:</h4>
                                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                                        {selectedGroup.tags.map(tag => (
                                            <span key={tag} className="subject-tag">#{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="members-section">
                                <h4 className="members-title">Group Members</h4>
                                <div className="members-list">
                                    {selectedGroup.members.map(member => (
                                        <div key={member.id} className="member-item">
                                            <div className="member-avatar">
                                                {getUserInitials(member.name)}
                                            </div>
                                            <div className="member-info">
                                                <div className="member-name">{member.name}</div>
                                                <div className="member-details">
                                                    {member.department} • {member.year} • Joined {formatDate(member.joinedDate)}
                                                </div>
                                            </div>
                                            <span className={`member-role ${member.role}`}>
                                                {member.role}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Buddy Detail Modal */}
            {selectedBuddy && (
                <div className="modal-overlay" onClick={closeBuddyModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div className="buddy-avatar-large">
                                        {getUserInitials(selectedBuddy.name)}
                                    </div>
                                    <div>
                                        <h2 className="modal-title" style={{ marginBottom: '4px' }}>{selectedBuddy.name}</h2>
                                        <p style={{ color: '#666', margin: 0 }}>
                                            {selectedBuddy.department} • {selectedBuddy.year} {selectedBuddy.section}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <button className="modal-close" onClick={closeBuddyModal}>
                                <X size={24} />
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="modal-info-grid">
                                <div className="info-item">
                                    <Star size={16} />
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        {renderStars(selectedBuddy.rating)}
                                        <span>({selectedBuddy.rating})</span>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <Clock size={16} />
                                    <span>{selectedBuddy.studyHours} hours studied</span>
                                </div>
                                <div className="info-item">
                                    <MapPin size={16} />
                                    <span>{selectedBuddy.location}</span>
                                </div>
                                <div className="info-item">
                                    <Activity size={16} />
                                    <span>Last active {formatDate(selectedBuddy.lastActive)}</span>
                                </div>
                            </div>

                            <div className="modal-content-text">
                                {selectedBuddy.bio}
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <h4 style={{ marginBottom: '8px', color: '#333' }}>Subjects:</h4>
                                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '16px' }}>
                                    {selectedBuddy.subjects.map(subject => (
                                        <span key={subject} className="subject-tag">{subject}</span>
                                    ))}
                                </div>
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <h4 style={{ marginBottom: '8px', color: '#333' }}>Study Preferences:</h4>
                                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '16px' }}>
                                    {selectedBuddy.studyPreferences.map(pref => (
                                        <span key={pref} className="subject-tag">{pref}</span>
                                    ))}
                                </div>
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <h4 style={{ marginBottom: '8px', color: '#333' }}>Availability:</h4>
                                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                                    {selectedBuddy.availability.map(time => (
                                        <span key={time} className="subject-tag">{time}</span>
                                    ))}
                                </div>
                            </div>

                            {selectedBuddy.achievements.length > 0 && (
                                <div style={{ marginBottom: '20px' }}>
                                    <h4 style={{ marginBottom: '8px', color: '#333' }}>Achievements:</h4>
                                    <ul style={{ listStyle: 'none', padding: 0 }}>
                                        {selectedBuddy.achievements.map((achievement, index) => (
                                            <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                                <Award size={14} style={{ color: '#f59e0b' }} />
                                                <span style={{ fontSize: '14px', color: '#666' }}>{achievement}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div style={{ textAlign: 'center', marginTop: '24px' }}>
                                <button
                                    className={`connect-btn ${selectedBuddy.isConnected ? 'connected' : 'connect'}`}
                                    onClick={() => {
                                        connectWithBuddy(selectedBuddy.id);
                                        closeBuddyModal();
                                    }}
                                    style={{ padding: '12px 24px', fontSize: '14px' }}
                                >
                                    {selectedBuddy.isConnected ? (
                                        <>
                                            <CheckCircle size={16} />
                                            Connected
                                        </>
                                    ) : (
                                        <>
                                            <UserPlus size={16} />
                                            Connect
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default StudyConnectPage;
