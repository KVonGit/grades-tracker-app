import { Student } from '../models/Student';

const students: Student[] = [
    { id: "1", name: 'Alice', balance: 100 },
    { id: "2", name: 'Bob', balance: 80 },
    { id: "3", name: 'Charlie', balance: 90 },
];

export const login = (studentId: number): Student | null => {
    const student = students.find(s => s.id === studentId.toString());
    return student || null;
};

export const checkCredentials = (studentId: number): boolean => {
    return students.some(s => s.id === studentId.toString());
};