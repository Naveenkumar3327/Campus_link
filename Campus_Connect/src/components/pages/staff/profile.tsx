// src/components/pages/staff/profile/index.tsx
import React, { useState, useEffect } from 'react';
import StaffNavigation from '../staff/navigation';
import {
    User,
    Edit3,
    Save,
    X,
    Mail,
    Phone,
    MapPin,
    Calendar,
    BookOpen,
    Award,
    Clock,
    Users,
    Star,
    Eye,
    EyeOff,
    Camera,
    Shield,
    Settings,
    Bell,
    Lock
} from 'lucide-react';

interface StaffProfile {
    personalInfo: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        employeeId: string;
        department: string;
        designation: string;
        joiningDate: string;
        qualification: string;
        specialization: string;
        experience: number;
        address: string;
        emergencyContact: string;
        bloodGroup: string;
        dateOfBirth: string;
    };
    academicInfo: {
        subjectsTaught: string[];
        coursesHandled: string[];
        researchInterests: string[];
        publications: number;
        conferences: number;
        workingHours: string;
        officeLocation: string;
    };
    systemPreferences: {
        emailNotifications: boolean;
        smsNotifications: boolean;
        theme: 'light' | 'dark' | 'auto';
        language: string;
        timezone: string;
    };
    stats: {
        totalStudents: number;
        activeClasses: number;
        completedSessions: number;
        avgRating: number;
        totalFeedback: number;
    };
}

function StaffProfilePage() {
    const [profile, setProfile] = useState<StaffProfile | null>(null);
    const [currentTab, setCurrentTab] = useState<'personal' | 'academic' | 'preferences' | 'security'>('personal');
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: ''
    });

    useEffect(() => {
        // Simulate loading profile data
        const loadProfile = async () => {
            setIsLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1000));

            const savedProfile = localStorage.getItem('staffProfile');
            if (savedProfile) {
                setProfile(JSON.parse(savedProfile));
            } else {
                const defaultProfile: StaffProfile = {
                    personalInfo: {
                        firstName: 'Jane',
                        lastName: 'Smith',
                        email: 'jane.smith@sece.ac.in',
                        phone: '+91 9876543210',
                        employeeId: 'EMP001',
                        department: 'Computer Science Engineering',
                        designation: 'Associate Professor',
                        joiningDate: '2020-06-15',
                        qualification: 'Ph.D in Computer Science',
                        specialization: 'Machine Learning & Data Science',
                        experience: 8,
                        address: '123 Faculty Housing, SECE Campus, Salem',
                        emergencyContact: '+91 9876543211',
                        bloodGroup: 'O+',
                        dateOfBirth: '1985-03-15'
                    },
                    academicInfo: {
                        subjectsTaught: ['Data Structures', 'Database Management', 'Machine Learning', 'Software Engineering'],
                        coursesHandled: ['CSE 3A', 'CSE 3B', 'CSE 4A'],
                        researchInterests: ['Artificial Intelligence', 'Deep Learning', 'Natural Language Processing'],
                        publications: 25,
                        conferences: 12,
                        workingHours: '9:00 AM - 5:00 PM',
                        officeLocation: 'Room 301, CSE Block'
                    },
                    systemPreferences: {
                        emailNotifications: true,
                        smsNotifications: false,
                        theme: 'light',
                        language: 'English',
                        timezone: 'Asia/Kolkata'
                    },
                    stats: {
                        totalStudents: 145,
                        activeClasses: 6,
                        completedSessions: 124,
                        avgRating: 4.8,
                        totalFeedback: 89
                    }
                };

                setProfile(defaultProfile);
                localStorage.setItem('staffProfile', JSON.stringify(defaultProfile));
            }
            setIsLoading(false);
        };

        loadProfile();
    }, []);

    const handleSave = async () => {
        if (!profile) return;

        setIsSaving(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            localStorage.setItem('staffProfile', JSON.stringify(profile));
            setIsEditing(false);
            alert('Profile updated successfully!');
        } catch (error) {
            alert('Failed to save profile. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handlePasswordChange = async () => {
        if (!passwords.current || !passwords.new || !passwords.confirm) {
            alert('Please fill all password fields');
            return;
        }

        if (passwords.new !== passwords.confirm) {
            alert('New passwords do not match');
            return;
        }

        if (passwords.new.length < 6) {
            alert('Password must be at least 6 characters long');
            return;
        }

        setIsSaving(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setPasswords({ current: '', new: '', confirm: '' });
            alert('Password changed successfully!');
        } catch (error) {
            alert('Failed to change password. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const updateProfile = (section: keyof StaffProfile, field: string, value: any) => {
        if (!profile) return;

        setProfile(prev => ({
            ...prev!,
            [section]: {
                ...prev![section],
                [field]: value
            }
        }));
    };

    const updateArrayField = (section: keyof StaffProfile, field: string, index: number, value: string) => {
        if (!profile) return;

        const currentArray = (profile[section] as any)[field] as string[];
        const newArray = [...currentArray];
        newArray[index] = value;

        setProfile(prev => ({
            ...prev!,
            [section]: {
                ...prev![section],
                [field]: newArray
            }
        }));
    };

    const addArrayItem = (section: keyof StaffProfile, field: string) => {
        if (!profile) return;

        const currentArray = (profile[section] as any)[field] as string[];
        const newArray = [...currentArray, ''];

        setProfile(prev => ({
            ...prev!,
            [section]: {
                ...prev![section],
                [field]: newArray
            }
        }));
    };

    const removeArrayItem = (section: keyof StaffProfile, field: string, index: number) => {
        if (!profile) return;

        const currentArray = (profile[section] as any)[field] as string[];
        const newArray = currentArray.filter((_, i) => i !== index);

        setProfile(prev => ({
            ...prev!,
            [section]: {
                ...prev![section],
                [field]: newArray
            }
        }));
    };

    if (isLoading || !profile) {
        return (
            <>
                <StaffNavigation />
                <main style={{
                    marginLeft: window.innerWidth > 768 ? '280px' : '0',
                    marginTop: '70px',
                    padding: '24px',
                    minHeight: 'calc(100vh - 70px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{
                            width: '64px',
                            height: '64px',
                            margin: '0 auto 16px',
                            border: '4px solid rgba(34, 139, 34, 0.2)',
                            borderRadius: '50%',
                            borderTopColor: '#32CD32',
                            animation: 'spin 1s ease-in-out infinite'
                        }} />
                        <h3 style={{ color: '#228B22', marginBottom: '8px' }}>Loading Profile...</h3>
                        <p style={{ color: '#666' }}>Please wait while we fetch your information</p>
                    </div>
                </main>
            </>
        );
    }

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
                {/* Profile Header */}
                <div style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '16px',
                    padding: '32px',
                    marginBottom: '24px',
                    border: '1px solid rgba(34, 139, 34, 0.1)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '24px' }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            background: 'linear-gradient(135deg, #32CD32, #228B22)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '28px',
                            fontWeight: '700',
                            position: 'relative'
                        }}>
                            {profile.personalInfo.firstName.charAt(0)}{profile.personalInfo.lastName.charAt(0)}
                            <button style={{
                                position: 'absolute',
                                bottom: '0',
                                right: '0',
                                width: '24px',
                                height: '24px',
                                background: 'white',
                                border: '2px solid #32CD32',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: '#32CD32'
                            }}>
                                <Camera size={12} />
                            </button>
                        </div>

                        <div style={{ flex: 1 }}>
                            <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#228B22', marginBottom: '8px' }}>
                                Dr. {profile.personalInfo.firstName} {profile.personalInfo.lastName}
                            </h1>
                            <p style={{ fontSize: '16px', color: '#666', marginBottom: '8px' }}>
                                {profile.personalInfo.designation} • {profile.personalInfo.department}
                            </p>
                            <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: '#666', flexWrap: 'wrap' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <Mail size={14} />
                                    {profile.personalInfo.email}
                                </span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <Phone size={14} />
                                    {profile.personalInfo.phone}
                                </span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <MapPin size={14} />
                                    {profile.academicInfo.officeLocation}
                                </span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                style={{
                                    padding: '8px 16px',
                                    background: isEditing ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 139, 34, 0.1)',
                                    color: isEditing ? '#ef4444' : '#228B22',
                                    border: `1px solid ${isEditing ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 139, 34, 0.2)'}`,
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontWeight: '500',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}
                            >
                                {isEditing ? <X size={16} /> : <Edit3 size={16} />}
                                {isEditing ? 'Cancel' : 'Edit Profile'}
                            </button>
                            {isEditing && (
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    style={{
                                        padding: '8px 16px',
                                        background: 'linear-gradient(135deg, #32CD32, #228B22)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: isSaving ? 'not-allowed' : 'pointer',
                                        fontWeight: '500',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        opacity: isSaving ? 0.7 : 1
                                    }}
                                >
                                    {isSaving ? (
                                        <>
                                            <div style={{
                                                width: '16px',
                                                height: '16px',
                                                border: '2px solid rgba(255, 255, 255, 0.3)',
                                                borderRadius: '50%',
                                                borderTopColor: 'white',
                                                animation: 'spin 1s ease-in-out infinite'
                                            }} />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save size={16} />
                                            Save Changes
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '16px'
                    }}>
                        <div style={{
                            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                            borderRadius: '12px',
                            padding: '20px',
                            color: 'white',
                            textAlign: 'center'
                        }}>
                            <Users size={24} style={{ margin: '0 auto 8px' }} />
                            <div style={{ fontSize: '20px', fontWeight: '700', marginBottom: '4px' }}>
                                {profile.stats.totalStudents}
                            </div>
                            <div style={{ fontSize: '12px', opacity: '0.9' }}>Total Students</div>
                        </div>

                        <div style={{
                            background: 'linear-gradient(135deg, #32CD32, #228B22)',
                            borderRadius: '12px',
                            padding: '20px',
                            color: 'white',
                            textAlign: 'center'
                        }}>
                            <BookOpen size={24} style={{ margin: '0 auto 8px' }} />
                            <div style={{ fontSize: '20px', fontWeight: '700', marginBottom: '4px' }}>
                                {profile.stats.activeClasses}
                            </div>
                            <div style={{ fontSize: '12px', opacity: '0.9' }}>Active Classes</div>
                        </div>

                        <div style={{
                            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                            borderRadius: '12px',
                            padding: '20px',
                            color: 'white',
                            textAlign: 'center'
                        }}>
                            <Clock size={24} style={{ margin: '0 auto 8px' }} />
                            <div style={{ fontSize: '20px', fontWeight: '700', marginBottom: '4px' }}>
                                {profile.stats.completedSessions}
                            </div>
                            <div style={{ fontSize: '12px', opacity: '0.9' }}>Sessions Completed</div>
                        </div>

                        <div style={{
                            background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                            borderRadius: '12px',
                            padding: '20px',
                            color: 'white',
                            textAlign: 'center'
                        }}>
                            <Star size={24} style={{ margin: '0 auto 8px' }} />
                            <div style={{ fontSize: '20px', fontWeight: '700', marginBottom: '4px' }}>
                                {profile.stats.avgRating}/5
                            </div>
                            <div style={{ fontSize: '12px', opacity: '0.9' }}>Average Rating</div>
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '16px',
                    padding: '8px',
                    marginBottom: '24px',
                    border: '1px solid rgba(34, 139, 34, 0.1)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                    display: 'flex',
                    gap: '8px',
                    flexWrap: 'wrap'
                }}>
                    {[
                        { id: 'personal', label: 'Personal Info', icon: User },
                        { id: 'academic', label: 'Academic Info', icon: BookOpen },
                        { id: 'preferences', label: 'Preferences', icon: Settings },
                        { id: 'security', label: 'Security', icon: Shield }
                    ].map(tab => {
                        const IconComponent = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setCurrentTab(tab.id as any)}
                                style={{
                                    padding: '12px 20px',
                                    border: 'none',
                                    borderRadius: '8px',
                                    background: currentTab === tab.id ? 'linear-gradient(135deg, #32CD32, #228B22)' : 'transparent',
                                    color: currentTab === tab.id ? 'white' : '#666',
                                    cursor: 'pointer',
                                    fontWeight: '500',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <IconComponent size={16} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Tab Content */}
                <div style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '16px',
                    padding: '32px',
                    border: '1px solid rgba(34, 139, 34, 0.1)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
                }}>
                    {/* Personal Information Tab */}
                    {currentTab === 'personal' && (
                        <div>
                            <h3 style={{ marginBottom: '24px', color: '#333', fontSize: '20px', fontWeight: '600' }}>
                                Personal Information
                            </h3>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        value={profile.personalInfo.firstName}
                                        onChange={(e) => updateProfile('personalInfo', 'firstName', e.target.value)}
                                        disabled={!isEditing}
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            fontSize: '14px',
                                            background: isEditing ? 'white' : '#f9fafb'
                                        }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        value={profile.personalInfo.lastName}
                                        onChange={(e) => updateProfile('personalInfo', 'lastName', e.target.value)}
                                        disabled={!isEditing}
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            fontSize: '14px',
                                            background: isEditing ? 'white' : '#f9fafb'
                                        }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={profile.personalInfo.email}
                                        onChange={(e) => updateProfile('personalInfo', 'email', e.target.value)}
                                        disabled={!isEditing}
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            fontSize: '14px',
                                            background: isEditing ? 'white' : '#f9fafb'
                                        }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        value={profile.personalInfo.phone}
                                        onChange={(e) => updateProfile('personalInfo', 'phone', e.target.value)}
                                        disabled={!isEditing}
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            fontSize: '14px',
                                            background: isEditing ? 'white' : '#f9fafb'
                                        }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                        Employee ID
                                    </label>
                                    <input
                                        type="text"
                                        value={profile.personalInfo.employeeId}
                                        disabled
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            fontSize: '14px',
                                            background: '#f9fafb',
                                            color: '#666'
                                        }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                        Department
                                    </label>
                                    <input
                                        type="text"
                                        value={profile.personalInfo.department}
                                        onChange={(e) => updateProfile('personalInfo', 'department', e.target.value)}
                                        disabled={!isEditing}
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            fontSize: '14px',
                                            background: isEditing ? 'white' : '#f9fafb'
                                        }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                        Designation
                                    </label>
                                    <input
                                        type="text"
                                        value={profile.personalInfo.designation}
                                        onChange={(e) => updateProfile('personalInfo', 'designation', e.target.value)}
                                        disabled={!isEditing}
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            fontSize: '14px',
                                            background: isEditing ? 'white' : '#f9fafb'
                                        }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                        Joining Date
                                    </label>
                                    <input
                                        type="date"
                                        value={profile.personalInfo.joiningDate}
                                        disabled
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            fontSize: '14px',
                                            background: '#f9fafb',
                                            color: '#666'
                                        }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                        Qualification
                                    </label>
                                    <input
                                        type="text"
                                        value={profile.personalInfo.qualification}
                                        onChange={(e) => updateProfile('personalInfo', 'qualification', e.target.value)}
                                        disabled={!isEditing}
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            fontSize: '14px',
                                            background: isEditing ? 'white' : '#f9fafb'
                                        }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                        Specialization
                                    </label>
                                    <input
                                        type="text"
                                        value={profile.personalInfo.specialization}
                                        onChange={(e) => updateProfile('personalInfo', 'specialization', e.target.value)}
                                        disabled={!isEditing}
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            fontSize: '14px',
                                            background: isEditing ? 'white' : '#f9fafb'
                                        }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                        Experience (Years)
                                    </label>
                                    <input
                                        type="number"
                                        value={profile.personalInfo.experience}
                                        onChange={(e) => updateProfile('personalInfo', 'experience', parseInt(e.target.value) || 0)}
                                        disabled={!isEditing}
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            fontSize: '14px',
                                            background: isEditing ? 'white' : '#f9fafb'
                                        }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                        Date of Birth
                                    </label>
                                    <input
                                        type="date"
                                        value={profile.personalInfo.dateOfBirth}
                                        onChange={(e) => updateProfile('personalInfo', 'dateOfBirth', e.target.value)}
                                        disabled={!isEditing}
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            fontSize: '14px',
                                            background: isEditing ? 'white' : '#f9fafb'
                                        }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                        Blood Group
                                    </label>
                                    <select
                                        value={profile.personalInfo.bloodGroup}
                                        onChange={(e) => updateProfile('personalInfo', 'bloodGroup', e.target.value)}
                                        disabled={!isEditing}
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            fontSize: '14px',
                                            background: isEditing ? 'white' : '#f9fafb'
                                        }}
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

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                        Emergency Contact
                                    </label>
                                    <input
                                        type="tel"
                                        value={profile.personalInfo.emergencyContact}
                                        onChange={(e) => updateProfile('personalInfo', 'emergencyContact', e.target.value)}
                                        disabled={!isEditing}
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            fontSize: '14px',
                                            background: isEditing ? 'white' : '#f9fafb'
                                        }}
                                    />
                                </div>

                                <div style={{ gridColumn: 'span 2' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                        Address
                                    </label>
                                    <textarea
                                        value={profile.personalInfo.address}
                                        onChange={(e) => updateProfile('personalInfo', 'address', e.target.value)}
                                        disabled={!isEditing}
                                        rows={3}
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            fontSize: '14px',
                                            background: isEditing ? 'white' : '#f9fafb',
                                            resize: 'vertical'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Academic Information Tab */}
                    {currentTab === 'academic' && (
                        <div>
                            <h3 style={{ marginBottom: '24px', color: '#333', fontSize: '20px', fontWeight: '600' }}>
                                Academic Information
                            </h3>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                        Working Hours
                                    </label>
                                    <input
                                        type="text"
                                        value={profile.academicInfo.workingHours}
                                        onChange={(e) => updateProfile('academicInfo', 'workingHours', e.target.value)}
                                        disabled={!isEditing}
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            fontSize: '14px',
                                            background: isEditing ? 'white' : '#f9fafb'
                                        }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                        Office Location
                                    </label>
                                    <input
                                        type="text"
                                        value={profile.academicInfo.officeLocation}
                                        onChange={(e) => updateProfile('academicInfo', 'officeLocation', e.target.value)}
                                        disabled={!isEditing}
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            fontSize: '14px',
                                            background: isEditing ? 'white' : '#f9fafb'
                                        }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                        Publications
                                    </label>
                                    <input
                                        type="number"
                                        value={profile.academicInfo.publications}
                                        onChange={(e) => updateProfile('academicInfo', 'publications', parseInt(e.target.value) || 0)}
                                        disabled={!isEditing}
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            fontSize: '14px',
                                            background: isEditing ? 'white' : '#f9fafb'
                                        }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                        Conferences
                                    </label>
                                    <input
                                        type="number"
                                        value={profile.academicInfo.conferences}
                                        onChange={(e) => updateProfile('academicInfo', 'conferences', parseInt(e.target.value) || 0)}
                                        disabled={!isEditing}
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            fontSize: '14px',
                                            background: isEditing ? 'white' : '#f9fafb'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Dynamic Arrays */}
                            <div style={{ display: 'grid', gap: '24px' }}>
                                {/* Subjects Taught */}
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                        <label style={{ fontWeight: '600', color: '#333' }}>Subjects Taught</label>
                                        {isEditing && (
                                            <button
                                                onClick={() => addArrayItem('academicInfo', 'subjectsTaught')}
                                                style={{
                                                    padding: '4px 8px',
                                                    background: 'rgba(34, 139, 34, 0.1)',
                                                    color: '#228B22',
                                                    border: '1px solid rgba(34, 139, 34, 0.2)',
                                                    borderRadius: '6px',
                                                    cursor: 'pointer',
                                                    fontSize: '12px',
                                                    fontWeight: '500'
                                                }}
                                            >
                                                Add Subject
                                            </button>
                                        )}
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        {profile.academicInfo.subjectsTaught.map((subject, index) => (
                                            <div key={index} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                                <input
                                                    type="text"
                                                    value={subject}
                                                    onChange={(e) => updateArrayField('academicInfo', 'subjectsTaught', index, e.target.value)}
                                                    disabled={!isEditing}
                                                    style={{
                                                        flex: 1,
                                                        padding: '10px 12px',
                                                        border: '1px solid #ddd',
                                                        borderRadius: '8px',
                                                        fontSize: '14px',
                                                        background: isEditing ? 'white' : '#f9fafb'
                                                    }}
                                                />
                                                {isEditing && profile.academicInfo.subjectsTaught.length > 1 && (
                                                    <button
                                                        onClick={() => removeArrayItem('academicInfo', 'subjectsTaught', index)}
                                                        style={{
                                                            padding: '8px',
                                                            background: '#ef4444',
                                                            color: 'white',
                                                            border: 'none',
                                                            borderRadius: '6px',
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Courses Handled */}
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                        <label style={{ fontWeight: '600', color: '#333' }}>Courses Handled</label>
                                        {isEditing && (
                                            <button
                                                onClick={() => addArrayItem('academicInfo', 'coursesHandled')}
                                                style={{
                                                    padding: '4px 8px',
                                                    background: 'rgba(34, 139, 34, 0.1)',
                                                    color: '#228B22',
                                                    border: '1px solid rgba(34, 139, 34, 0.2)',
                                                    borderRadius: '6px',
                                                    cursor: 'pointer',
                                                    fontSize: '12px',
                                                    fontWeight: '500'
                                                }}
                                            >
                                                Add Course
                                            </button>
                                        )}
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        {profile.academicInfo.coursesHandled.map((course, index) => (
                                            <div key={index} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                                <input
                                                    type="text"
                                                    value={course}
                                                    onChange={(e) => updateArrayField('academicInfo', 'coursesHandled', index, e.target.value)}
                                                    disabled={!isEditing}
                                                    style={{
                                                        flex: 1,
                                                        padding: '10px 12px',
                                                        border: '1px solid #ddd',
                                                        borderRadius: '8px',
                                                        fontSize: '14px',
                                                        background: isEditing ? 'white' : '#f9fafb'
                                                    }}
                                                />
                                                {isEditing && profile.academicInfo.coursesHandled.length > 1 && (
                                                    <button
                                                        onClick={() => removeArrayItem('academicInfo', 'coursesHandled', index)}
                                                        style={{
                                                            padding: '8px',
                                                            background: '#ef4444',
                                                            color: 'white',
                                                            border: 'none',
                                                            borderRadius: '6px',
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Research Interests */}
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                        <label style={{ fontWeight: '600', color: '#333' }}>Research Interests</label>
                                        {isEditing && (
                                            <button
                                                onClick={() => addArrayItem('academicInfo', 'researchInterests')}
                                                style={{
                                                    padding: '4px 8px',
                                                    background: 'rgba(34, 139, 34, 0.1)',
                                                    color: '#228B22',
                                                    border: '1px solid rgba(34, 139, 34, 0.2)',
                                                    borderRadius: '6px',
                                                    cursor: 'pointer',
                                                    fontSize: '12px',
                                                    fontWeight: '500'
                                                }}
                                            >
                                                Add Interest
                                            </button>
                                        )}
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        {profile.academicInfo.researchInterests.map((interest, index) => (
                                            <div key={index} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                                <input
                                                    type="text"
                                                    value={interest}
                                                    onChange={(e) => updateArrayField('academicInfo', 'researchInterests', index, e.target.value)}
                                                    disabled={!isEditing}
                                                    style={{
                                                        flex: 1,
                                                        padding: '10px 12px',
                                                        border: '1px solid #ddd',
                                                        borderRadius: '8px',
                                                        fontSize: '14px',
                                                        background: isEditing ? 'white' : '#f9fafb'
                                                    }}
                                                />
                                                {isEditing && profile.academicInfo.researchInterests.length > 1 && (
                                                    <button
                                                        onClick={() => removeArrayItem('academicInfo', 'researchInterests', index)}
                                                        style={{
                                                            padding: '8px',
                                                            background: '#ef4444',
                                                            color: 'white',
                                                            border: 'none',
                                                            borderRadius: '6px',
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Preferences Tab */}
                    {currentTab === 'preferences' && (
                        <div>
                            <h3 style={{ marginBottom: '24px', color: '#333', fontSize: '20px', fontWeight: '600' }}>
                                System Preferences
                            </h3>

                            <div style={{ display: 'grid', gap: '24px' }}>
                                {/* Notification Settings */}
                                <div>
                                    <h4 style={{ marginBottom: '16px', color: '#333', fontSize: '16px', fontWeight: '600' }}>
                                        Notifications
                                    </h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                                            <input
                                                type="checkbox"
                                                checked={profile.systemPreferences.emailNotifications}
                                                onChange={(e) => updateProfile('systemPreferences', 'emailNotifications', e.target.checked)}
                                                disabled={!isEditing}
                                                style={{ transform: 'scale(1.2)' }}
                                            />
                                            <div>
                                                <div style={{ fontWeight: '500', color: '#333' }}>Email Notifications</div>
                                                <div style={{ fontSize: '12px', color: '#666' }}>Receive notifications via email</div>
                                            </div>
                                        </label>

                                        <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                                            <input
                                                type="checkbox"
                                                checked={profile.systemPreferences.smsNotifications}
                                                onChange={(e) => updateProfile('systemPreferences', 'smsNotifications', e.target.checked)}
                                                disabled={!isEditing}
                                                style={{ transform: 'scale(1.2)' }}
                                            />
                                            <div>
                                                <div style={{ fontWeight: '500', color: '#333' }}>SMS Notifications</div>
                                                <div style={{ fontSize: '12px', color: '#666' }}>Receive notifications via SMS</div>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                {/* Display Settings */}
                                <div>
                                    <h4 style={{ marginBottom: '16px', color: '#333', fontSize: '16px', fontWeight: '600' }}>
                                        Display Settings
                                    </h4>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                                Theme
                                            </label>
                                            <select
                                                value={profile.systemPreferences.theme}
                                                onChange={(e) => updateProfile('systemPreferences', 'theme', e.target.value)}
                                                disabled={!isEditing}
                                                style={{
                                                    width: '100%',
                                                    padding: '12px 16px',
                                                    border: '1px solid #ddd',
                                                    borderRadius: '8px',
                                                    fontSize: '14px',
                                                    background: isEditing ? 'white' : '#f9fafb'
                                                }}
                                            >
                                                <option value="light">Light</option>
                                                <option value="dark">Dark</option>
                                                <option value="auto">Auto</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                                Language
                                            </label>
                                            <select
                                                value={profile.systemPreferences.language}
                                                onChange={(e) => updateProfile('systemPreferences', 'language', e.target.value)}
                                                disabled={!isEditing}
                                                style={{
                                                    width: '100%',
                                                    padding: '12px 16px',
                                                    border: '1px solid #ddd',
                                                    borderRadius: '8px',
                                                    fontSize: '14px',
                                                    background: isEditing ? 'white' : '#f9fafb'
                                                }}
                                            >
                                                <option value="English">English</option>
                                                <option value="Tamil">Tamil</option>
                                                <option value="Hindi">Hindi</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                                Timezone
                                            </label>
                                            <select
                                                value={profile.systemPreferences.timezone}
                                                onChange={(e) => updateProfile('systemPreferences', 'timezone', e.target.value)}
                                                disabled={!isEditing}
                                                style={{
                                                    width: '100%',
                                                    padding: '12px 16px',
                                                    border: '1px solid #ddd',
                                                    borderRadius: '8px',
                                                    fontSize: '14px',
                                                    background: isEditing ? 'white' : '#f9fafb'
                                                }}
                                            >
                                                <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                                                <option value="UTC">UTC</option>
                                                <option value="America/New_York">America/New_York (EST)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Security Tab */}
                    {currentTab === 'security' && (
                        <div>
                            <h3 style={{ marginBottom: '24px', color: '#333', fontSize: '20px', fontWeight: '600' }}>
                                Security Settings
                            </h3>

                            <div style={{ display: 'grid', gap: '24px' }}>
                                {/* Change Password */}
                                <div>
                                    <h4 style={{ marginBottom: '16px', color: '#333', fontSize: '16px', fontWeight: '600' }}>
                                        Change Password
                                    </h4>
                                    <div style={{ display: 'grid', gap: '16px', maxWidth: '400px' }}>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                                Current Password
                                            </label>
                                            <div style={{ position: 'relative' }}>
                                                <input
                                                    type={showPassword ? 'text' : 'password'}
                                                    value={passwords.current}
                                                    onChange={(e) => setPasswords(prev => ({ ...prev, current: e.target.value }))}
                                                    style={{
                                                        width: '100%',
                                                        padding: '12px 16px',
                                                        paddingRight: '48px',
                                                        border: '1px solid #ddd',
                                                        borderRadius: '8px',
                                                        fontSize: '14px'
                                                    }}
                                                    placeholder="Enter current password"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    style={{
                                                        position: 'absolute',
                                                        right: '12px',
                                                        top: '50%',
                                                        transform: 'translateY(-50%)',
                                                        background: 'none',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        color: '#666'
                                                    }}
                                                >
                                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                                New Password
                                            </label>
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                value={passwords.new}
                                                onChange={(e) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
                                                style={{
                                                    width: '100%',
                                                    padding: '12px 16px',
                                                    border: '1px solid #ddd',
                                                    borderRadius: '8px',
                                                    fontSize: '14px'
                                                }}
                                                placeholder="Enter new password"
                                            />
                                        </div>

                                        <div>
                                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                                                Confirm New Password
                                            </label>
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                value={passwords.confirm}
                                                onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
                                                style={{
                                                    width: '100%',
                                                    padding: '12px 16px',
                                                    border: '1px solid #ddd',
                                                    borderRadius: '8px',
                                                    fontSize: '14px'
                                                }}
                                                placeholder="Confirm new password"
                                            />
                                        </div>

                                        <button
                                            onClick={handlePasswordChange}
                                            disabled={isSaving || !passwords.current || !passwords.new || !passwords.confirm}
                                            style={{
                                                padding: '12px 24px',
                                                background: 'linear-gradient(135deg, #32CD32, #228B22)',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '8px',
                                                fontWeight: '600',
                                                cursor: isSaving || !passwords.current || !passwords.new || !passwords.confirm ? 'not-allowed' : 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                opacity: isSaving || !passwords.current || !passwords.new || !passwords.confirm ? 0.7 : 1
                                            }}
                                        >
                                            {isSaving ? (
                                                <>
                                                    <div style={{
                                                        width: '16px',
                                                        height: '16px',
                                                        border: '2px solid rgba(255, 255, 255, 0.3)',
                                                        borderRadius: '50%',
                                                        borderTopColor: 'white',
                                                        animation: 'spin 1s ease-in-out infinite'
                                                    }} />
                                                    Changing Password...
                                                </>
                                            ) : (
                                                <>
                                                    <Lock size={16} />
                                                    Change Password
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Security Information */}
                                <div style={{
                                    background: 'rgba(34, 139, 34, 0.05)',
                                    borderRadius: '12px',
                                    padding: '20px',
                                    border: '1px solid rgba(34, 139, 34, 0.1)'
                                }}>
                                    <h4 style={{ marginBottom: '12px', color: '#333', fontSize: '16px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Shield size={20} style={{ color: '#32CD32' }} />
                                        Security Tips
                                    </h4>
                                    <ul style={{ color: '#666', fontSize: '14px', lineHeight: '1.6', paddingLeft: '20px' }}>
                                        <li>Use a strong password with at least 8 characters</li>
                                        <li>Include uppercase, lowercase, numbers, and special characters</li>
                                        <li>Don't share your password with anyone</li>
                                        <li>Change your password regularly</li>
                                        <li>Log out from shared computers</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}

export default StaffProfilePage;