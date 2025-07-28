export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'staff' | 'admin';
  avatar?: string;
  rollNumber?: string;
  createdAt: Date;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  category: 'exam' | 'event' | 'holiday' | 'general';
  date: Date;
  author: string;
  authorRole: string;
}

export interface LostFoundItem {
  id: string;
  name: string;
  description: string;
  category: 'electronics' | 'books' | 'clothing' | 'accessories' | 'other';
  type: 'lost' | 'found';
  location: string;
  date: Date;
  image?: string;
  postedBy: string;
  resolved: boolean;
}

export interface TimetableEntry {
  id: string;
  subject: string;
  time: string;
  day: string;
  userId: string;
}

export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: 'water' | 'cleaning' | 'electricity' | 'internet' | 'other';
  status: 'pending' | 'in-progress' | 'resolved';
  date: Date;
  userId: string;
  userName: string;
}

export interface Feedback {
  id: string;
  title: string;
  message: string;
  date: Date;
  userId: string;
  userName: string;
  response?: string;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  createdBy: string;
  createdAt: Date;
  votedUsers: string[];
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  image?: string;
  createdBy: string;
  rsvpUsers: string[];
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: Omit<User, 'id' | 'createdAt'> & { password: string }) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}