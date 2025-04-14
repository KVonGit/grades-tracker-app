import React, { createContext, useContext, useState, useEffect } from 'react';
import { Student } from '../models/Student';
import { Transaction } from '../models/Transaction';
import { getStudentData, updateStudentBalance as updateBalance } from '../services/storageService';
import { useAuth } from './AuthContext';

interface StudentDataContextType {
    students: Student[];
    student: Student | null;
    transactions: Transaction[];
    studentTransactions: Transaction[];
    updateStudentBalance: (studentId: string, amount: number) => void;
    addBalance: (studentId: string, amount: number) => void;
    subtractBalance: (studentId: string, amount: number) => void;
}

const StudentDataContext = createContext<StudentDataContextType | undefined>(undefined);

export const StudentDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth(); // Get logged in user from AuthContext
    const [students, setStudents] = useState<Student[]>([]);
    const [student, setStudent] = useState<Student | null>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        // Load student data
        const data = getStudentData();
        setStudents(data);
    }, []);

    // Set the student state when the user from AuthContext changes
    useEffect(() => {
        if (user) {
            setStudent(user);
        } else {
            setStudent(null);
        }
    }, [user]);

    const updateStudentBalance = (studentId: string, amount: number) => {
        updateBalance(studentId, amount);
        setStudents(getStudentData());
        
        // Add transaction record
        const newTransaction: Transaction = {
            id: Date.now().toString(),
            studentId: studentId,
            amount: amount,
            type: amount > 0 ? 'addition' : 'subtraction',
            date: new Date(),
            description: amount > 0 ? 'Added to balance' : 'Subtracted from balance'
        };
        
        setTransactions([...transactions, newTransaction]);
    };

    const addBalance = (studentId: string, amount: number) => {
        updateStudentBalance(studentId, Math.abs(amount));
    };

    const subtractBalance = (studentId: string, amount: number) => {
        updateStudentBalance(studentId, -Math.abs(amount));
    };

    // Filter transactions for current student
    const studentTransactions = transactions.filter(t => student && t.studentId === student.id);

    return (
        <StudentDataContext.Provider value={{ 
            students, 
            student, 
            transactions, 
            studentTransactions, 
            updateStudentBalance,
            addBalance,
            subtractBalance
        }}>
            {children}
        </StudentDataContext.Provider>
    );
};

export const useStudentData = () => {
    const context = useContext(StudentDataContext);
    if (context === undefined) {
        throw new Error('useStudentData must be used within a StudentDataProvider');
    }
    return context;
};