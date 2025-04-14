import { Student } from '../models/Student';

export const saveStudentData = (students: Student[]): void => {
    localStorage.setItem('students', JSON.stringify(students));
};

export const getStudentData = (): Student[] => {
    const data = localStorage.getItem('students');
    if (!data) {
        // Initialize with default students if storage is empty
        const defaultStudents: Student[] = [
            { id: '1', name: 'Alice', balance: 100 },
            { id: '2', name: 'Bob', balance: 80 },
            { id: '3', name: 'Charlie', balance: 90 },
        ];
        saveStudentData(defaultStudents);
        return defaultStudents;
    }
    return JSON.parse(data) as Student[];
};

export const updateStudentBalance = (studentId: string, amount: number): boolean => {
    const students = getStudentData();
    const studentIndex = students.findIndex(student => student.id === studentId);
    if (studentIndex !== -1) {
        students[studentIndex].balance += amount;
        saveStudentData(students);
        return true;
    }
    return false;
};