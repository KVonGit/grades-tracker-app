import React from 'react';
import { useStudentData } from '../contexts/StudentDataContext';
import { useAuth } from '../contexts/AuthContext';
import StudentList from './StudentList';

const TeacherDashboard: React.FC = () => {
    const { students, updateStudentBalance } = useStudentData();
    const { user } = useAuth();
    
    const handleBalanceChange = (studentId: string, amount: number) => {
        updateStudentBalance(studentId, amount);
    };
    
    return (
        <div className="teacher-dashboard">
            <h1>Welcome, Teacher</h1>
            <h2>Student Points</h2>
            <StudentList students={students} onBalanceChange={handleBalanceChange} />
        </div>
    );
};

export default TeacherDashboard;