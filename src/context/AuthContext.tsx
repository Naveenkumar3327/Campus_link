import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';
import { mockUsers } from '../data/mockData';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('campus_connect_token');
    const userData = localStorage.getItem('campus_connect_user');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        localStorage.removeItem('campus_connect_token');
        localStorage.removeItem('campus_connect_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundUser = mockUsers.find(u => u.email === email);
      
      if (foundUser && password === 'password123') { // Mock password check
        const token = `mock_jwt_token_${foundUser.id}`;
        localStorage.setItem('campus_connect_token', token);
        localStorage.setItem('campus_connect_user', JSON.stringify(foundUser));
        setUser(foundUser);
        return true;
      }
      
      return false;
    } catch (error) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData: Omit<User, 'id' | 'createdAt'> & { password: string }): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        role: userData.role,
        avatar: userData.avatar,
        rollNumber: userData.rollNumber,
        createdAt: new Date()
      };

      const token = `mock_jwt_token_${newUser.id}`;
      localStorage.setItem('campus_connect_token', token);
      localStorage.setItem('campus_connect_user', JSON.stringify(newUser));
      setUser(newUser);
      
      return true;
    } catch (error) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('campus_connect_token');
    localStorage.removeItem('campus_connect_user');
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};