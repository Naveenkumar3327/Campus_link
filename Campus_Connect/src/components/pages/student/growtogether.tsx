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
    Award,
    Trophy,
    Target,
    Zap,
    BarChart3,
    Flame,
    CheckCircle,
    Clock,
    Medal,
    Crown,
    ChevronUp,
    ChevronDown,
    Eye,
    MessageCircle,
    Share2,
    BookmarkPlus,
    Rocket,
    ThumbsUp,
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

interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    category: 'academic' | 'extracurricular' | 'leadership' | 'community';
    points: number;
    dateEarned: string;
    difficulty: 'bronze' | 'silver' | 'gold' | 'platinum';
    isEarned: boolean;
    requirements: string[];
    progress?: number;
}

interface LeaderboardEntry {
    rank: number;
    name: string;
    email: string;
    department: string;
    year: string;
    totalPoints: number;
    achievements: number;
    badges: string[];
    weeklyPoints: number;
    monthlyPoints: number;
    avatar?: string;
    isCurrentUser: boolean;
}

interface Activity {
    id: string;
    type: 'achievement' | 'milestone' | 'challenge' | 'recognition';
    title: string;
    description: string;
    studentName: string;
    studentEmail: string;
    points: number;
    timestamp: string;
    icon: React.ReactNode;
    category: string;
}

interface Challenge {
    id: string;
    title: string;
    description: string;
    category: 'academic' | 'skill' | 'leadership' | 'community';
    difficulty: 'easy' | 'medium' | 'hard';
    points: number;
    startDate: string;
    endDate: string;
    participants: number;
    maxParticipants: number;
    requirements: string[];
    progress: number;
    isJoined: boolean;
    isCompleted: boolean;
    rewards: string[];
}

interface NavigationItem {
    name: string;
    icon: React.ReactNode;
    path: string;
}

function GrowTogetherPage() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [activeItem, setActiveItem] = useState('GrowTogether');
    const [currentView, setCurrentView] = useState<'dashboard' | 'achievements' | 'leaderboard' | 'challenges'>('dashboard');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [leaderboardFilter, setLeaderboardFilter] = useState<'overall' | 'weekly' | 'monthly'>('overall');
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [challenges, setChallenges] = useState<Challenge[]>([]);

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
        { name: 'GrowTogether', icon: <TrendingUp size={20} />, path: '/student/growtogether' },
        { name: 'Profile', icon: <User size={20} />, path: '/student/profile' }
    ];

    const categories = [
        { value: 'academic', label: 'Academic', icon: <BookOpen size={16} />, color: 'bg-blue-100 text-blue-800 border-blue-200' },
        { value: 'extracurricular', label: 'Extracurricular', icon: <Trophy size={16} />, color: 'bg-green-100 text-green-800 border-green-200' },
        { value: 'leadership', label: 'Leadership', icon: <Crown size={16} />, color: 'bg-purple-100 text-purple-800 border-purple-200' },
        { value: 'community', label: 'Community', icon: <Users size={16} />, color: 'bg-orange-100 text-orange-800 border-orange-200' }
    ];

    // Load data from localStorage
    useEffect(() => {
        const savedAchievements = localStorage.getItem('growTogetherAchievements');
        const savedLeaderboard = localStorage.getItem('growTogetherLeaderboard');
        const savedActivities = localStorage.getItem('growTogetherActivities');
        const savedChallenges = localStorage.getItem('growTogetherChallenges');

        if (savedAchievements) {
            setAchievements(JSON.parse(savedAchievements));
        } else {
            // Default achievements data
            const defaultAchievements: Achievement[] = [
                {
                    id: 'ACH001',
                    title: 'First Steps',
                    description: 'Complete your first assignment submission',
                    icon: <Star size={20} />,
                    category: 'academic',
                    points: 10,
                    dateEarned: '2025-01-20T10:30:00Z',
                    difficulty: 'bronze',
                    isEarned: true,
                    requirements: ['Submit first assignment'],
                    progress: 100
                },
                {
                    id: 'ACH002',
                    title: 'Study Streak',
                    description: 'Maintain a 7-day study streak',
                    icon: <Flame size={20} />,
                    category: 'academic',
                    points: 25,
                    dateEarned: '2025-01-22T18:00:00Z',
                    difficulty: 'silver',
                    isEarned: true,
                    requirements: ['Study for 7 consecutive days'],
                    progress: 100
                },
                {
                    id: 'ACH003',
                    title: 'Code Master',
                    description: 'Solve 50 programming problems',
                    icon: <Trophy size={20} />,
                    category: 'academic',
                    points: 50,
                    dateEarned: '',
                    difficulty: 'gold',
                    isEarned: false,
                    requirements: ['Solve 50+ coding problems'],
                    progress: 72
                },
                {
                    id: 'ACH004',
                    title: 'Team Player',
                    description: 'Join and contribute to 3 study groups',
                    icon: <Users size={20} />,
                    category: 'leadership',
                    points: 30,
                    dateEarned: '2025-01-25T14:15:00Z',
                    difficulty: 'silver',
                    isEarned: true,
                    requirements: ['Join 3 study groups', 'Active participation'],
                    progress: 100
                },
                {
                    id: 'ACH005',
                    title: 'Resource Sharer',
                    description: 'Upload 10 educational resources',
                    icon: <BookOpen size={20} />,
                    category: 'community',
                    points: 40,
                    dateEarned: '',
                    difficulty: 'gold',
                    isEarned: false,
                    requirements: ['Upload 10+ resources', 'Get positive ratings'],
                    progress: 60
                },
                {
                    id: 'ACH006',
                    title: 'Perfect Attendance',
                    description: 'Attend all classes for a month',
                    icon: <Calendar size={20} />,
                    category: 'academic',
                    points: 35,
                    dateEarned: '',
                    difficulty: 'silver',
                    isEarned: false,
                    requirements: ['100% attendance for 30 days'],
                    progress: 85
                },
                {
                    id: 'ACH007',
                    title: 'Event Organizer',
                    description: 'Successfully organize a campus event',
                    icon: <Award size={20} />,
                    category: 'leadership',
                    points: 75,
                    dateEarned: '',
                    difficulty: 'platinum',
                    isEarned: false,
                    requirements: ['Organize event with 50+ participants', 'Positive feedback'],
                    progress: 20
                },
                {
                    id: 'ACH008',
                    title: 'Mentor',
                    description: 'Help 5 junior students with their studies',
                    icon: <Users size={20} />,
                    category: 'community',
                    points: 45,
                    dateEarned: '',
                    difficulty: 'gold',
                    isEarned: false,
                    requirements: ['Mentor 5+ junior students', 'Positive feedback'],
                    progress: 40
                }
            ];

            setAchievements(defaultAchievements);
            localStorage.setItem('growTogetherAchievements', JSON.stringify(defaultAchievements));
        }

        if (savedLeaderboard) {
            setLeaderboard(JSON.parse(savedLeaderboard));
        } else {
            // Default leaderboard data
            const defaultLeaderboard: LeaderboardEntry[] = [
                {
                    rank: 1,
                    name: 'Priya Sharma',
                    email: 'priya.sharma@sece.ac.in',
                    department: 'Computer Science Engineering',
                    year: '3rd Year',
                    totalPoints: 485,
                    achievements: 12,
                    badges: ['Study Master', 'Code Ninja', 'Team Leader'],
                    weeklyPoints: 95,
                    monthlyPoints: 285,
                    isCurrentUser: false
                },
                {
                    rank: 2,
                    name: 'Rahul Kumar',
                    email: 'rahul.kumar@sece.ac.in',
                    department: 'Computer Science Engineering',
                    year: '3rd Year',
                    totalPoints: 462,
                    achievements: 11,
                    badges: ['Problem Solver', 'Consistent Learner'],
                    weeklyPoints: 88,
                    monthlyPoints: 275,
                    isCurrentUser: false
                },
                {
                    rank: 3,
                    name: 'Sneha Patel',
                    email: 'sneha.patel@sece.ac.in',
                    department: 'Computer Science Engineering',
                    year: '3rd Year',
                    totalPoints: 438,
                    achievements: 10,
                    badges: ['Project Leader', 'Resource Creator'],
                    weeklyPoints: 82,
                    monthlyPoints: 268,
                    isCurrentUser: false
                },
                {
                    rank: 4,
                    name: studentData.name,
                    email: studentData.email,
                    department: studentData.department,
                    year: studentData.year,
                    totalPoints: 195,
                    achievements: 3,
                    badges: ['First Steps', 'Team Player'],
                    weeklyPoints: 45,
                    monthlyPoints: 125,
                    isCurrentUser: true
                },
                {
                    rank: 5,
                    name: 'Ankit Verma',
                    email: 'ankit.verma@sece.ac.in',
                    department: 'Computer Science Engineering',
                    year: '2nd Year',
                    totalPoints: 378,
                    achievements: 9,
                    badges: ['Study Buddy', 'Helper'],
                    weeklyPoints: 75,
                    monthlyPoints: 245,
                    isCurrentUser: false
                },
                {
                    rank: 6,
                    name: 'Kavita Joshi',
                    email: 'kavita.joshi@sece.ac.in',
                    department: 'Computer Science Engineering',
                    year: '2nd Year',
                    totalPoints: 356,
                    achievements: 8,
                    badges: ['Creative Thinker'],
                    weeklyPoints: 68,
                    monthlyPoints: 230,
                    isCurrentUser: false
                },
                {
                    rank: 7,
                    name: 'Rajesh Gupta',
                    email: 'rajesh.gupta@sece.ac.in',
                    department: 'Computer Science Engineering',
                    year: '3rd Year',
                    totalPoints: 325,
                    achievements: 7,
                    badges: ['Dedicated Student'],
                    weeklyPoints: 62,
                    monthlyPoints: 215,
                    isCurrentUser: false
                },
                {
                    rank: 8,
                    name: 'Meera Singh',
                    email: 'meera.singh@sece.ac.in',
                    department: 'Computer Science Engineering',
                    year: '2nd Year',
                    totalPoints: 298,
                    achievements: 6,
                    badges: ['Rising Star'],
                    weeklyPoints: 58,
                    monthlyPoints: 198,
                    isCurrentUser: false
                }
            ];

            setLeaderboard(defaultLeaderboard);
            localStorage.setItem('growTogetherLeaderboard', JSON.stringify(defaultLeaderboard));
        }

        if (savedActivities) {
            setActivities(JSON.parse(savedActivities));
        } else {
            // Default activities data
            const defaultActivities: Activity[] = [
                {
                    id: 'ACT001',
                    type: 'achievement',
                    title: 'Achievement Unlocked: Team Player',
                    description: 'Joined and contributed to 3 study groups',
                    studentName: studentData.name,
                    studentEmail: studentData.email,
                    points: 30,
                    timestamp: '2025-01-25T14:15:00Z',
                    icon: <Users size={16} />,
                    category: 'leadership'
                },
                {
                    id: 'ACT002',
                    type: 'achievement',
                    title: 'Achievement Unlocked: Study Streak',
                    description: 'Maintained a 7-day study streak',
                    studentName: studentData.name,
                    studentEmail: studentData.email,
                    points: 25,
                    timestamp: '2025-01-22T18:00:00Z',
                    icon: <Flame size={16} />,
                    category: 'academic'
                },
                {
                    id: 'ACT003',
                    type: 'milestone',
                    title: 'Reached 100 Total Points',
                    description: 'Milestone achievement for consistent performance',
                    studentName: studentData.name,
                    studentEmail: studentData.email,
                    points: 20,
                    timestamp: '2025-01-21T12:30:00Z',
                    icon: <Target size={16} />,
                    category: 'milestone'
                },
                {
                    id: 'ACT004',
                    type: 'achievement',
                    title: 'Priya earned Code Master',
                    description: 'Solved 50+ programming problems',
                    studentName: 'Priya Sharma',
                    studentEmail: 'priya.sharma@sece.ac.in',
                    points: 50,
                    timestamp: '2025-01-24T16:45:00Z',
                    icon: <Trophy size={16} />,
                    category: 'academic'
                },
                {
                    id: 'ACT005',
                    type: 'recognition',
                    title: 'Top Contributor of the Week',
                    description: 'Recognized for outstanding community contributions',
                    studentName: 'Rahul Kumar',
                    studentEmail: 'rahul.kumar@sece.ac.in',
                    points: 40,
                    timestamp: '2025-01-23T20:00:00Z',
                    icon: <Award size={16} />,
                    category: 'community'
                }
            ];

            setActivities(defaultActivities);
            localStorage.setItem('growTogetherActivities', JSON.stringify(defaultActivities));
        }

        if (savedChallenges) {
            setChallenges(JSON.parse(savedChallenges));
        } else {
            // Default challenges data
            const defaultChallenges: Challenge[] = [
                {
                    id: 'CHA001',
                    title: '30-Day Study Challenge',
                    description: 'Study for at least 2 hours every day for 30 consecutive days. Track your progress and maintain consistency.',
                    category: 'academic',
                    difficulty: 'medium',
                    points: 75,
                    startDate: '2025-01-15T00:00:00Z',
                    endDate: '2025-02-14T23:59:59Z',
                    participants: 156,
                    maxParticipants: 200,
                    requirements: ['Study 2+ hours daily', 'Log study sessions', 'No breaks longer than 1 day'],
                    progress: 65,
                    isJoined: true,
                    isCompleted: false,
                    rewards: ['Study Master Badge', '75 Points', 'Certificate of Completion']
                },
                {
                    id: 'CHA002',
                    title: 'Code-a-thon February',
                    description: 'Solve 100 coding problems in the month of February. Improve your problem-solving skills and algorithm knowledge.',
                    category: 'skill',
                    difficulty: 'hard',
                    points: 100,
                    startDate: '2025-02-01T00:00:00Z',
                    endDate: '2025-02-28T23:59:59Z',
                    participants: 89,
                    maxParticipants: 150,
                    requirements: ['Solve 100+ problems', 'At least 5 different topics', 'Maintain 70% accuracy'],
                    progress: 0,
                    isJoined: false,
                    isCompleted: false,
                    rewards: ['Code Ninja Badge', '100 Points', 'Programming Certificate', 'Mentorship Opportunity']
                },
                {
                    id: 'CHA003',
                    title: 'Community Helper',
                    description: 'Help 10 fellow students with their academic queries. Build a supportive learning community.',
                    category: 'community',
                    difficulty: 'easy',
                    points: 50,
                    startDate: '2025-01-20T00:00:00Z',
                    endDate: '2025-02-20T23:59:59Z',
                    participants: 134,
                    maxParticipants: 300,
                    requirements: ['Help 10+ students', 'Positive feedback required', 'Active community participation'],
                    progress: 30,
                    isJoined: true,
                    isCompleted: false,
                    rewards: ['Helper Badge', '50 Points', 'Community Recognition']
                },
                {
                    id: 'CHA004',
                    title: 'Leadership Workshop Series',
                    description: 'Attend all 5 leadership workshops and complete the practical assignments to develop leadership skills.',
                    category: 'leadership',
                    difficulty: 'medium',
                    points: 85,
                    startDate: '2025-01-25T00:00:00Z',
                    endDate: '2025-03-15T23:59:59Z',
                    participants: 67,
                    maxParticipants: 100,
                    requirements: ['Attend all 5 workshops', 'Complete assignments', 'Lead a team project'],
                    progress: 20,
                    isJoined: false,
                    isCompleted: false,
                    rewards: ['Leadership Badge', '85 Points', 'Leadership Certificate', 'Recommendation Letter']
                },
                {
                    id: 'CHA005',
                    title: 'Perfect Attendance Month',
                    description: 'Achieve 100% attendance for all classes in the month of February.',
                    category: 'academic',
                    difficulty: 'easy',
                    points: 40,
                    startDate: '2025-02-01T00:00:00Z',
                    endDate: '2025-02-28T23:59:59Z',
                    participants: 245,
                    maxParticipants: 500,
                    requirements: ['100% class attendance', 'No unauthorized absences', 'Punctuality maintained'],
                    progress: 0,
                    isJoined: false,
                    isCompleted: false,
                    rewards: ['Attendance Star Badge', '40 Points', 'Appreciation Certificate']
                }
            ];

            setChallenges(defaultChallenges);
            localStorage.setItem('growTogetherChallenges', JSON.stringify(defaultChallenges));
        }
    }, [studentData]);

    const handleNavClick = (itemName: string, path?: string) => {
        setActiveItem(itemName);
        setIsSidebarOpen(false);

        if (path && path !== '/student/growtogether') {
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

    const joinChallenge = (challengeId: string) => {
        const updatedChallenges = challenges.map(challenge => {
            if (challenge.id === challengeId && !challenge.isJoined && challenge.participants < challenge.maxParticipants) {
                return {
                    ...challenge,
                    isJoined: true,
                    participants: challenge.participants + 1
                };
            }
            return challenge;
        });

        setChallenges(updatedChallenges);
        localStorage.setItem('growTogetherChallenges', JSON.stringify(updatedChallenges));
    };

    const leaveChallenge = (challengeId: string) => {
        if (window.confirm('Are you sure you want to leave this challenge?')) {
            const updatedChallenges = challenges.map(challenge => {
                if (challenge.id === challengeId && challenge.isJoined) {
                    return {
                        ...challenge,
                        isJoined: false,
                        participants: challenge.participants - 1
                    };
                }
                return challenge;
            });

            setChallenges(updatedChallenges);
            localStorage.setItem('growTogetherChallenges', JSON.stringify(updatedChallenges));
        }
    };

    // Filter data based on current view and filters
    const filteredAchievements = achievements.filter(achievement => {
        const matchesSearch = achievement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            achievement.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || achievement.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const filteredLeaderboard = leaderboard.sort((a, b) => {
        switch (leaderboardFilter) {
            case 'weekly':
                return b.weeklyPoints - a.weeklyPoints;
            case 'monthly':
                return b.monthlyPoints - a.monthlyPoints;
            case 'overall':
            default:
                return b.totalPoints - a.totalPoints;
        }
    });

    const filteredChallenges = challenges.filter(challenge => {
        const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            challenge.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || challenge.category === selectedCategory;
        return matchesSearch && matchesCategory;
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

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'bronze':
                return 'bg-amber-100 text-amber-800 border-amber-200';
            case 'silver':
                return 'bg-gray-100 text-gray-800 border-gray-200';
            case 'gold':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'platinum':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getChallengeColor = (difficulty: string) => {
        switch (difficulty) {
            case 'easy':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'hard':
                return 'bg-red-100 text-red-800 border-red-200';
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

    const renderProgressBar = (progress: number) => {
        return (
            <div style={{ width: '100%', height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                <div
                    style={{
                        width: `${progress}%`,
                        height: '100%',
                        background: 'linear-gradient(135deg, #FF6969, #BB2525)',
                        transition: 'width 0.3s ease'
                    }}
                />
            </div>
        );
    };

    // Calculate user stats
    const currentUser = leaderboard.find(entry => entry.isCurrentUser);
    const earnedAchievements = achievements.filter(a => a.isEarned);
    const totalPoints = earnedAchievements.reduce((sum, a) => sum + a.points, 0);
    const joinedChallenges = challenges.filter(c => c.isJoined);
    const completedChallenges = challenges.filter(c => c.isCompleted);

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

        /* Dashboard Stats Cards */
        .dashboard-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 24px;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          padding: 24px;
          border: 1px solid rgba(255, 105, 105, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
          text-align: center;
        }

        .stat-icon {
          width: 60px;
          height: 60px;
          margin: 0 auto 16px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .stat-value {
          font-size: 32px;
          font-weight: 700;
          color: #333;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 14px;
          color: #666;
          font-weight: 500;
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

        .filter-select {
          padding: 10px 16px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 14px;
          background: white;
        }

        .filter-select:focus {
          outline: none;
          border-color: #FF6969;
        }

        /* Content Container */
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
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }

        /* Achievement Cards */
        .achievement-card {
          background: rgba(255, 255, 255, 0.8);
          border-radius: 12px;
          padding: 20px;
          border: 1px solid rgba(255, 105, 105, 0.1);
          transition: all 0.2s;
          position: relative;
          overflow: hidden;
        }

        .achievement-card:hover {
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }

        .achievement-card.earned {
          border-left: 4px solid #22c55e;
          background: rgba(34, 197, 94, 0.05);
        }

        .achievement-card.in-progress {
          border-left: 4px solid #f59e0b;
          background: rgba(245, 158, 11, 0.05);
        }

        .achievement-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }

        .achievement-icon {
          width: 50px;
          height: 50px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin-bottom: 12px;
        }

        .achievement-badges {
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

        .achievement-title {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
        }

        .achievement-description {
          color: #666;
          font-size: 14px;
          line-height: 1.5;
          margin-bottom: 12px;
        }

        .achievement-progress {
          margin-bottom: 12px;
        }

        .progress-label {
          font-size: 12px;
          color: #666;
          margin-bottom: 4px;
          display: flex;
          justify-content: space-between;
        }

        .achievement-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          color: #888;
        }

        .points-earned {
          display: flex;
          align-items: center;
          gap: 4px;
          font-weight: 600;
          color: #BB2525;
        }

        /* Leaderboard */
        .leaderboard-table {
          width: 100%;
          border-collapse: collapse;
        }

        .leaderboard-table th,
        .leaderboard-table td {
          padding: 16px;
          text-align: left;
          border-bottom: 1px solid rgba(255, 105, 105, 0.1);
        }

        .leaderboard-table th {
          background: rgba(255, 105, 105, 0.05);
          font-weight: 600;
          color: #BB2525;
        }

        .leaderboard-row {
          transition: all 0.2s;
        }

        .leaderboard-row:hover {
          background: rgba(255, 105, 105, 0.05);
        }

        .leaderboard-row.current-user {
          background: rgba(255, 105, 105, 0.1);
          border-left: 4px solid #FF6969;
        }

        .rank-cell {
          font-weight: 700;
          color: #BB2525;
          width: 60px;
        }

        .rank-1 {
          color: #f59e0b;
        }

        .rank-2 {
          color: #6b7280;
        }

        .rank-3 {
          color: #cd7c0e;
        }

        .user-cell {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .leaderboard-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #FF6969, #BB2525);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 14px;
        }

        .user-info {
          flex: 1;
        }

        .user-name {
          font-weight: 600;
          color: #333;
          font-size: 14px;
        }

        .user-details {
          font-size: 12px;
          color: #666;
        }

        .badges-cell {
          display: flex;
          gap: 4px;
          flex-wrap: wrap;
        }

        .mini-badge {
          background: rgba(255, 105, 105, 0.1);
          color: #BB2525;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 500;
        }

        /* Challenge Cards */
        .challenge-card {
          background: rgba(255, 255, 255, 0.8);
          border-radius: 12px;
          padding: 20px;
          border: 1px solid rgba(255, 105, 105, 0.1);
          transition: all 0.2s;
          position: relative;
        }

        .challenge-card:hover {
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }

        .challenge-card.joined {
          border-left: 4px solid #22c55e;
          background: rgba(34, 197, 94, 0.05);
        }

        .challenge-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }

        .challenge-title {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
        }

        .challenge-description {
          color: #666;
          font-size: 14px;
          line-height: 1.5;
          margin-bottom: 16px;
        }

        .challenge-meta {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 16px;
          font-size: 12px;
          color: #666;
        }

        .challenge-participants {
          font-size: 12px;
          color: #666;
          margin-bottom: 12px;
        }

        .participants-bar {
          width: 100%;
          height: 6px;
          background: #e5e7eb;
          border-radius: 3px;
          overflow: hidden;
        }

        .participants-fill {
          height: 100%;
          background: linear-gradient(135deg, #FF6969, #BB2525);
          transition: width 0.3s ease;
        }

        .challenge-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 16px;
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

        /* Activity Feed */
        .activity-feed {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .activity-item {
          display: flex;
          gap: 12px;
          padding: 16px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 8px;
          border: 1px solid rgba(255, 105, 105, 0.1);
        }

        .activity-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .activity-content {
          flex: 1;
        }

        .activity-title {
          font-weight: 600;
          color: #333;
          font-size: 14px;
          margin-bottom: 4px;
        }

        .activity-description {
          font-size: 12px;
          color: #666;
          margin-bottom: 4px;
        }

        .activity-meta {
          font-size: 11px;
          color: #888;
        }

        .activity-points {
          font-weight: 600;
          color: #BB2525;
          font-size: 12px;
        }

        /* No Items */
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

          .dashboard-stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .content-grid {
            grid-template-columns: 1fr;
          }

          .leaderboard-table th,
          .leaderboard-table td {
            padding: 12px 8px;
            font-size: 12px;
          }

          .challenge-meta {
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
                        <span className="notification-badge">{activities.length}</span>
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
                                    <TrendingUp size={24} />
                                </div>
                                GrowTogether
                            </h1>
                        </div>

                        <div className="view-toggle">
                            <button
                                className={`toggle-btn ${currentView === 'dashboard' ? 'active' : ''}`}
                                onClick={() => setCurrentView('dashboard')}
                            >
                                <BarChart3 size={16} />
                                Dashboard
                            </button>
                            <button
                                className={`toggle-btn ${currentView === 'achievements' ? 'active' : ''}`}
                                onClick={() => setCurrentView('achievements')}
                            >
                                <Award size={16} />
                                Achievements
                            </button>
                            <button
                                className={`toggle-btn ${currentView === 'leaderboard' ? 'active' : ''}`}
                                onClick={() => setCurrentView('leaderboard')}
                            >
                                <Trophy size={16} />
                                Leaderboard
                            </button>
                            <button
                                className={`toggle-btn ${currentView === 'challenges' ? 'active' : ''}`}
                                onClick={() => setCurrentView('challenges')}
                            >
                                <Target size={16} />
                                Challenges
                            </button>
                        </div>
                    </div>

                    <div className="stats-row">
                        <div className="stat-item">
                            <Trophy size={16} />
                            <span>Rank #{currentUser?.rank || 'N/A'}</span>
                        </div>
                        <div className="stat-item">
                            <Star size={16} />
                            <span>{totalPoints} Points</span>
                        </div>
                        <div className="stat-item">
                            <Award size={16} />
                            <span>{earnedAchievements.length} Achievements</span>
                        </div>
                        <div className="stat-item">
                            <Target size={16} />
                            <span>{joinedChallenges.length} Active Challenges</span>
                        </div>
                    </div>
                </div>

                {/* Content Based on Current View */}
                {currentView === 'dashboard' && (
                    <>
                        {/* Dashboard Stats Cards */}
                        <div className="dashboard-stats">
                            <div className="stat-card">
                                <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
                                    <Trophy size={24} />
                                </div>
                                <div className="stat-value">#{currentUser?.rank || 'N/A'}</div>
                                <div className="stat-label">Current Rank</div>
                            </div>

                            <div className="stat-card">
                                <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #FF6969, #BB2525)' }}>
                                    <Star size={24} />
                                </div>
                                <div className="stat-value">{totalPoints}</div>
                                <div className="stat-label">Total Points</div>
                            </div>

                            <div className="stat-card">
                                <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}>
                                    <Award size={24} />
                                </div>
                                <div className="stat-value">{earnedAchievements.length}</div>
                                <div className="stat-label">Achievements Earned</div>
                            </div>

                            <div className="stat-card">
                                <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }}>
                                    <Target size={24} />
                                </div>
                                <div className="stat-value">{joinedChallenges.length}</div>
                                <div className="stat-label">Active Challenges</div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="content-container">
                            <h2 style={{ marginBottom: '20px', color: '#333', fontSize: '20px', fontWeight: '600' }}>
                                Recent Activity
                            </h2>

                            {activities.length === 0 ? (
                                <div className="no-items">
                                    <div className="no-items-icon">
                                        <Activity size={32} />
                                    </div>
                                    <h3>No Recent Activity</h3>
                                    <p>Start earning achievements and participating in challenges!</p>
                                </div>
                            ) : (
                                <div className="activity-feed">
                                    {activities.slice(0, 10).map((activity) => (
                                        <div key={activity.id} className="activity-item">
                                            <div
                                                className="activity-icon"
                                                style={{ background: 'linear-gradient(135deg, #FF6969, #BB2525)' }}
                                            >
                                                {activity.icon}
                                            </div>
                                            <div className="activity-content">
                                                <div className="activity-title">{activity.title}</div>
                                                <div className="activity-description">{activity.description}</div>
                                                <div className="activity-meta">
                                                    {activity.studentName} • {formatDate(activity.timestamp)}
                                                </div>
                                            </div>
                                            <div className="activity-points">+{activity.points} pts</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}

                {currentView === 'achievements' && (
                    <>
                        {/* Search and Filter Section */}
                        <div className="search-filter-section">
                            <div className="search-row">
                                <input
                                    type="text"
                                    placeholder="Search achievements..."
                                    className="search-input"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
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
                            </div>
                        </div>

                        {/* Achievements Grid */}
                        <div className="content-container">
                            {filteredAchievements.length === 0 ? (
                                <div className="no-items">
                                    <div className="no-items-icon">
                                        <Award size={32} />
                                    </div>
                                    <h3>No Achievements Found</h3>
                                    <p>Try adjusting your search criteria.</p>
                                </div>
                            ) : (
                                <div className="content-grid">
                                    {filteredAchievements.map((achievement) => (
                                        <div
                                            key={achievement.id}
                                            className={`achievement-card ${achievement.isEarned ? 'earned' : 'in-progress'}`}
                                        >
                                            <div className="achievement-header">
                                                <div
                                                    className="achievement-icon"
                                                    style={{ background: 'linear-gradient(135deg, #FF6969, #BB2525)' }}
                                                >
                                                    {achievement.icon}
                                                </div>

                                                <div className="achievement-badges">
                                                    <span className={`badge ${getDifficultyColor(achievement.difficulty)}`}>
                                                        {achievement.difficulty}
                                                    </span>
                                                    <span className={`badge ${categories.find(c => c.value === achievement.category)?.color}`}>
                                                        {categories.find(c => c.value === achievement.category)?.icon}
                                                        {categories.find(c => c.value === achievement.category)?.label}
                                                    </span>
                                                </div>
                                            </div>

                                            <h3 className="achievement-title">{achievement.title}</h3>
                                            <p className="achievement-description">{achievement.description}</p>

                                            {!achievement.isEarned && achievement.progress !== undefined && (
                                                <div className="achievement-progress">
                                                    <div className="progress-label">
                                                        <span>Progress</span>
                                                        <span>{achievement.progress}%</span>
                                                    </div>
                                                    {renderProgressBar(achievement.progress)}
                                                </div>
                                            )}

                                            <div className="achievement-meta">
                                                <div>
                                                    {achievement.isEarned ? (
                                                        <span style={{ color: '#22c55e', fontSize: '12px', fontWeight: '600' }}>
                                                            ✓ Earned {formatDate(achievement.dateEarned)}
                                                        </span>
                                                    ) : (
                                                        <span style={{ color: '#f59e0b', fontSize: '12px' }}>
                                                            In Progress
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="points-earned">
                                                    <Star size={12} />
                                                    <span>{achievement.points} pts</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}

                {currentView === 'leaderboard' && (
                    <>
                        {/* Leaderboard Filter */}
                        <div className="search-filter-section">
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                <span style={{ fontWeight: '600', color: '#333' }}>View:</span>
                                <select
                                    className="filter-select"
                                    value={leaderboardFilter}
                                    onChange={(e) => setLeaderboardFilter(e.target.value as any)}
                                >
                                    <option value="overall">Overall Rankings</option>
                                    <option value="weekly">This Week</option>
                                    <option value="monthly">This Month</option>
                                </select>
                            </div>
                        </div>

                        {/* Leaderboard Table */}
                        <div className="content-container">
                            <table className="leaderboard-table">
                                <thead>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Student</th>
                                        <th>Points</th>
                                        <th>Achievements</th>
                                        <th>Badges</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredLeaderboard.slice(0, 20).map((entry) => (
                                        <tr
                                            key={entry.email}
                                            className={`leaderboard-row ${entry.isCurrentUser ? 'current-user' : ''}`}
                                        >
                                            <td className={`rank-cell ${entry.rank <= 3 ? `rank-${entry.rank}` : ''}`}>
                                                #{entry.rank}
                                                {entry.rank === 1 && <Crown size={16} style={{ marginLeft: '4px', color: '#f59e0b' }} />}
                                                {entry.rank === 2 && <Medal size={16} style={{ marginLeft: '4px', color: '#6b7280' }} />}
                                                {entry.rank === 3 && <Award size={16} style={{ marginLeft: '4px', color: '#cd7c0e' }} />}
                                            </td>
                                            <td>
                                                <div className="user-cell">
                                                    <div className="leaderboard-avatar">
                                                        {getUserInitials(entry.name)}
                                                    </div>
                                                    <div className="user-info">
                                                        <div className="user-name">
                                                            {entry.name}
                                                            {entry.isCurrentUser && <span style={{ color: '#FF6969', marginLeft: '4px' }}>(You)</span>}
                                                        </div>
                                                        <div className="user-details">
                                                            {entry.department} • {entry.year}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{ fontWeight: '600', color: '#BB2525' }}>
                                                    {leaderboardFilter === 'weekly' ? entry.weeklyPoints :
                                                        leaderboardFilter === 'monthly' ? entry.monthlyPoints :
                                                            entry.totalPoints}
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{ fontWeight: '600' }}>
                                                    {entry.achievements}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="badges-cell">
                                                    {entry.badges.slice(0, 2).map(badge => (
                                                        <span key={badge} className="mini-badge">{badge}</span>
                                                    ))}
                                                    {entry.badges.length > 2 && (
                                                        <span className="mini-badge">+{entry.badges.length - 2}</span>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}

                {currentView === 'challenges' && (
                    <>
                        {/* Search and Filter Section */}
                        <div className="search-filter-section">
                            <div className="search-row">
                                <input
                                    type="text"
                                    placeholder="Search challenges..."
                                    className="search-input"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <select
                                    className="filter-select"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    <option value="all">All Categories</option>
                                    <option value="academic">Academic</option>
                                    <option value="skill">Skill Development</option>
                                    <option value="leadership">Leadership</option>
                                    <option value="community">Community</option>
                                </select>
                            </div>
                        </div>

                        {/* Challenges Grid */}
                        <div className="content-container">
                            {filteredChallenges.length === 0 ? (
                                <div className="no-items">
                                    <div className="no-items-icon">
                                        <Target size={32} />
                                    </div>
                                    <h3>No Challenges Found</h3>
                                    <p>Try adjusting your search criteria.</p>
                                </div>
                            ) : (
                                <div className="content-grid">
                                    {filteredChallenges.map((challenge) => (
                                        <div
                                            key={challenge.id}
                                            className={`challenge-card ${challenge.isJoined ? 'joined' : ''}`}
                                        >
                                            <div className="challenge-header">
                                                <div style={{ flex: 1 }}>
                                                    <span className={`badge ${getChallengeColor(challenge.difficulty)}`}>
                                                        {challenge.difficulty}
                                                    </span>
                                                </div>
                                            </div>

                                            <h3 className="challenge-title">{challenge.title}</h3>
                                            <p className="challenge-description">{challenge.description}</p>

                                            <div className="challenge-meta">
                                                <div>
                                                    <strong>Category:</strong> {challenge.category}
                                                </div>
                                                <div>
                                                    <strong>Rewards:</strong> {challenge.points} pts
                                                </div>
                                                <div>
                                                    <strong>Start:</strong> {new Date(challenge.startDate).toLocaleDateString()}
                                                </div>
                                                <div>
                                                    <strong>End:</strong> {new Date(challenge.endDate).toLocaleDateString()}
                                                </div>
                                            </div>

                                            <div className="challenge-participants">
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                                    <span>Participants</span>
                                                    <span>{challenge.participants}/{challenge.maxParticipants}</span>
                                                </div>
                                                <div className="participants-bar">
                                                    <div
                                                        className="participants-fill"
                                                        style={{ width: `${(challenge.participants / challenge.maxParticipants) * 100}%` }}
                                                    />
                                                </div>
                                            </div>

                                            {challenge.isJoined && challenge.progress > 0 && (
                                                <div style={{ marginTop: '12px' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '12px' }}>
                                                        <span>Your Progress</span>
                                                        <span>{challenge.progress}%</span>
                                                    </div>
                                                    {renderProgressBar(challenge.progress)}
                                                </div>
                                            )}

                                            <div className="challenge-footer">
                                                <div style={{ fontSize: '12px', color: '#666' }}>
                                                    Ends in {Math.ceil((new Date(challenge.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                                                </div>

                                                <button
                                                    className={`join-btn ${challenge.isJoined ? 'leave' : 'join'}`}
                                                    onClick={() => {
                                                        if (challenge.isJoined) {
                                                            leaveChallenge(challenge.id);
                                                        } else {
                                                            joinChallenge(challenge.id);
                                                        }
                                                    }}
                                                    disabled={!challenge.isJoined && challenge.participants >= challenge.maxParticipants}
                                                >
                                                    {challenge.isJoined ? 'Leave Challenge' : 'Join Challenge'}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </main>
        </>
    );
}

export default GrowTogetherPage;
