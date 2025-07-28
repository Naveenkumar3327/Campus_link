import { User, Announcement, LostFoundItem, Complaint, Feedback, Poll, Event, TimetableEntry } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Student',
    email: 'student@campus.edu',
    role: 'student',
    rollNumber: 'CS2021001',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Sarah Staff',
    email: 'staff@campus.edu',
    role: 'staff',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    createdAt: new Date('2024-01-10')
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@campus.edu',
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    createdAt: new Date('2024-01-01')
  }
];

export const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Mid-Term Examinations Schedule',
    body: 'The mid-term examinations will commence from March 15th, 2024. Students are advised to check their respective timetables and prepare accordingly.',
    category: 'exam',
    date: new Date('2024-03-01'),
    author: 'Academic Office',
    authorRole: 'admin'
  },
  {
    id: '2',
    title: 'Annual Tech Fest - TechnoVision 2024',
    body: 'Get ready for the biggest tech event of the year! Registration opens on March 10th. Exciting competitions, workshops, and guest speakers await.',
    category: 'event',
    date: new Date('2024-03-05'),
    author: 'Event Committee',
    authorRole: 'staff'
  },
  {
    id: '3',
    title: 'Spring Break Holiday Notice',
    body: 'The campus will remain closed from March 20th to March 25th for spring break. Classes will resume on March 26th.',
    category: 'holiday',
    date: new Date('2024-03-08'),
    author: 'Administration',
    authorRole: 'admin'
  }
];

export const mockLostFoundItems: LostFoundItem[] = [
  {
    id: '1',
    name: 'iPhone 14 Pro',
    description: 'Black iPhone 14 Pro with a purple case. Lost near the library entrance.',
    category: 'electronics',
    type: 'lost',
    location: 'Library Entrance',
    date: new Date('2024-03-08'),
    image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    postedBy: 'John Student',
    resolved: false
  },
  {
    id: '2',
    name: 'Engineering Textbook',
    description: 'Found a "Digital Signal Processing" textbook in Classroom 301. Has someone\'s name written inside.',
    category: 'books',
    type: 'found',
    location: 'Classroom 301',
    date: new Date('2024-03-07'),
    postedBy: 'Sarah Staff',
    resolved: false
  }
];

export const mockComplaints: Complaint[] = [
  {
    id: '1',
    title: 'Wi-Fi Connection Issues in Hostel Block A',
    description: 'The internet connection has been very slow and unstable for the past week. Students are facing difficulties attending online classes.',
    category: 'internet',
    status: 'pending',
    date: new Date('2024-03-08'),
    userId: '1',
    userName: 'John Student'
  },
  {
    id: '2',
    title: 'Water Supply Problem',
    description: 'No water supply in the 3rd floor of Block B since yesterday morning.',
    category: 'water',
    status: 'in-progress',
    date: new Date('2024-03-07'),
    userId: '1',
    userName: 'John Student'
  }
];

export const mockFeedback: Feedback[] = [
  {
    id: '1',
    title: 'Excellent Campus Facilities',
    message: 'The new library renovation looks amazing! The study spaces are much more comfortable now. Thank you for the improvements.',
    date: new Date('2024-03-08'),
    userId: '1',
    userName: 'John Student',
    response: 'Thank you for your positive feedback! We\'re glad you\'re enjoying the new facilities.'
  },
  {
    id: '2',
    title: 'Suggestion for Food Court',
    message: 'Could we have more vegetarian options in the food court? Many students have requested this.',
    date: new Date('2024-03-07'),
    userId: '1',
    userName: 'John Student'
  }
];

export const mockPolls: Poll[] = [
  {
    id: '1',
    question: 'Which time slot would you prefer for the guest lecture?',
    options: [
      { id: '1', text: '10:00 AM - 11:00 AM', votes: 45 },
      { id: '2', text: '2:00 PM - 3:00 PM', votes: 32 },
      { id: '3', text: '4:00 PM - 5:00 PM', votes: 28 }
    ],
    createdBy: 'Academic Office',
    createdAt: new Date('2024-03-08'),
    votedUsers: []
  },
  {
    id: '2',
    question: 'What type of workshop would you be most interested in?',
    options: [
      { id: '1', text: 'AI & Machine Learning', votes: 65 },
      { id: '2', text: 'Web Development', votes: 48 },
      { id: '3', text: 'Mobile App Development', votes: 35 },
      { id: '4', text: 'Data Science', votes: 42 }
    ],
    createdBy: 'Event Committee',
    createdAt: new Date('2024-03-07'),
    votedUsers: []
  }
];

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'TechnoVision 2024 - Annual Tech Fest',
    description: 'Join us for the biggest technology festival of the year! Featuring competitions, workshops, guest speakers from top tech companies, and networking opportunities.',
    date: new Date('2024-03-25'),
    location: 'Main Auditorium & Campus Grounds',
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    createdBy: 'Event Committee',
    rsvpUsers: []
  },
  {
    id: '2',
    title: 'Career Fair 2024',
    description: 'Meet with representatives from leading companies and explore internship and job opportunities. Don\'t miss this chance to network and showcase your skills.',
    date: new Date('2024-04-10'),
    location: 'Sports Complex',
    image: 'https://images.pexels.com/photos/1181622/pexels-photo-1181622.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
    createdBy: 'Placement Office',
    rsvpUsers: []
  }
];

export const mockTimetable: TimetableEntry[] = [
  {
    id: '1',
    subject: 'Data Structures',
    time: '09:00 AM - 10:30 AM',
    day: 'Monday',
    userId: '1'
  },
  {
    id: '2',
    subject: 'Computer Networks',
    time: '11:00 AM - 12:30 PM',
    day: 'Monday',
    userId: '1'
  },
  {
    id: '3',
    subject: 'Database Systems',
    time: '02:00 PM - 03:30 PM',
    day: 'Tuesday',
    userId: '1'
  },
  {
    id: '4',
    subject: 'Software Engineering',
    time: '09:00 AM - 10:30 AM',
    day: 'Wednesday',
    userId: '1'
  }
];