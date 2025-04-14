import React, { createContext, useContext, useState } from 'react';
import { Student } from '../models/Student';
import { login as authLogin } from '../services/authService';

interface AuthContextType {
  isAuthenticated: boolean;
  user: Student | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isTeacher: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<Student | null>(null);
  const [isTeacher, setIsTeacher] = useState<boolean>(false);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Teacher login
    if (username === 'teacher' && password === 'password') {
      setIsTeacher(true);
      setIsAuthenticated(true);
      return true;
    }

    // Student login
    const numericId = parseInt(username, 10);
    if (!isNaN(numericId)) {
      const student = authLogin(numericId);
      if (student) {
        setUser(student);
        setIsAuthenticated(true);
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setIsTeacher(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isTeacher }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};