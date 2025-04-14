import React from 'react';
import { useStudentData } from '../contexts/StudentDataContext';
import StudentCard from './StudentCard';
import { Student } from '../models/Student';

interface StudentListProps {
  students?: Student[];
  onBalanceChange?: (studentId: string, amount: number) => void;
}

const StudentList: React.FC<StudentListProps> = ({ students: propStudents, onBalanceChange }) => {
    const studentDataContext = useStudentData();
    // Use provided students or fall back to context
    const students = propStudents || studentDataContext.students;

    return (
        <div className="student-list">
            <h2>Student List</h2>
            <ul>
                {students.map(student => (
                    <li key={student.id}>
                        <StudentCard 
                            name={student.name} 
                            balance={student.balance} 
                            id={student.id}
                            onBalanceChange={onBalanceChange}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudentList;