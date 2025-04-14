import React, { useEffect, useState } from 'react';
import { useStudentData } from '../contexts/StudentDataContext';
import TransactionHistory from './TransactionHistory';
import { useNavigate } from 'react-router-dom';
import { getStudentData } from '../services/storageService';
import { useAuth } from '../contexts/AuthContext';
import { Student } from '../models/Student';

const StudentDashboard: React.FC = () => {
    const { studentTransactions } = useStudentData();
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
    
    // Get fresh student data from localStorage on every render
    useEffect(() => {
        if (user) {
            const freshStudentData = getStudentData();
            const updatedStudent = freshStudentData.find(s => s.id === user.id);
            if (updatedStudent) {
                setCurrentStudent(updatedStudent);
            }
        }
    }, [user]);
    
    // Redirect if no student is logged in
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);
    
    // Show loading state or redirect
    if (!currentStudent) {
        return <div>Loading student data...</div>;
    }
    
    return (
        <div className="student-dashboard">
            <h1>Welcome, {currentStudent.name}</h1>
            <h2>Your Points: {currentStudent.balance.toFixed(0)}</h2>
            <TransactionHistory />
        </div>
    );
};

export default StudentDashboard;