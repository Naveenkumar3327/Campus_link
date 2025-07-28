import React, { useState } from 'react';
import {
    Home, Megaphone, Search, User, ClipboardCheck, BellRing, BookOpenText,
    GraduationCap, Users, BarChart2, ClipboardList
} from 'lucide-react';

type UserType = 'student' | 'staff';

export default function DashboardLayout() {
    const [userType, setUserType] = useState<UserType>('student');
    const [username, setUsername] = useState('John Doe');

    const navItems: Record<UserType, { label: string; icon: React.ReactElement }[]> = {
        student: [
            { label: 'Home', icon: <Home size={18} /> },
            { label: 'Announcements', icon: <Megaphone size={18} /> },
            { label: 'Lost & Found', icon: <ClipboardCheck size={18} /> },
            { label: 'Hostel Complain', icon: <BellRing size={18} /> },
            { label: 'Timetable Remainder', icon: <ClipboardList size={18} /> },
            { label: 'EduExchange', icon: <BookOpenText size={18} /> },
            { label: 'StudyConnect', icon: <GraduationCap size={18} /> },
            { label: 'GrowTogether', icon: <Users size={18} /> },
            { label: 'Profile', icon: <User size={18} /> },
        ],
        staff: [
            { label: 'Home', icon: <Home size={18} /> },
            { label: 'Post Announcements', icon: <Megaphone size={18} /> },
            { label: 'Verify Lost & Found', icon: <ClipboardCheck size={18} /> },
            { label: 'Manage Complaints', icon: <BellRing size={18} /> },
            { label: 'Manage Timetables', icon: <ClipboardList size={18} /> },
            { label: 'Monitor EduExchange', icon: <BookOpenText size={18} /> },
            { label: 'Track Session Bookings', icon: <GraduationCap size={18} /> },
            { label: 'Reports & Insights', icon: <BarChart2 size={18} /> },
            { label: 'Profile', icon: <User size={18} /> },
        ]
    };

    return (
        <div style={{ display: 'flex', height: '100vh', fontFamily: 'Segoe UI, sans-serif' }}>
            {/* Sidebar */}
            <div style={{
                width: '240px',
                background: 'linear-gradient(135deg, #FF6969, #BB2525)',
                color: 'white',
                padding: '20px 0',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{ textAlign: 'center', fontWeight: 700, fontSize: 20, marginBottom: 30 }}>
                    CampusLink
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {navItems[userType].map((item, idx) => (
                        <div key={idx} style={{
                            padding: '10px 24px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                            cursor: 'pointer',
                            transition: '0.3s'
                        }}
                            onMouseEnter={e => e.currentTarget.style.background = '#FF7A7A'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                            {item.icon}
                            <span>{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Area */}
            <div style={{ flex: 1, background: '#FFF5E0', position: 'relative' }}>
                {/* Top Bar */}
                <div style={{
                    height: '60px',
                    background: 'white',
                    borderBottom: '1px solid #eee',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 24px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                    position: 'sticky',
                    top: 0,
                    zIndex: 999
                }}>
                    <div style={{ fontWeight: 700, fontSize: 20, color: '#BB2525' }}>
                        CampusLink
                    </div>

                    <div style={{ flex: 1, maxWidth: 400, margin: '0 24px', position: 'relative' }}>
                        <Search size={16} style={{
                            position: 'absolute', top: '50%', left: 12, transform: 'translateY(-50%)', color: '#999'
                        }} />
                        <input
                            type="text"
                            placeholder="Search here..."
                            style={{
                                width: '100%',
                                padding: '10px 12px 10px 36px',
                                borderRadius: 10,
                                border: '1px solid #ccc',
                                fontSize: 14
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <User size={20} color="#BB2525" />
                        <span style={{ fontWeight: 600, fontSize: 14 }}>{username}</span>
                    </div>
                </div>

                {/* Main Content */}
                <div style={{ padding: '24px' }}>
                    <h2>Welcome {userType === 'student' ? 'Student' : 'Staff'} 👋</h2>
                    <p>This is your {userType} dashboard.</p>
                    <button
                        onClick={() => setUserType(prev => prev === 'student' ? 'staff' : 'student')}
                        style={{
                            marginTop: 20,
                            background: '#BB2525',
                            color: 'white',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: 8,
                            cursor: 'pointer'
                        }}>
                        Switch to {userType === 'student' ? 'Staff' : 'Student'} View
                    </button>
                </div>
            </div>
        </div>
    );
}
