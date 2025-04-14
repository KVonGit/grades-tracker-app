import React from 'react';
import { useStudentData } from '../contexts/StudentDataContext';

const TransactionHistory: React.FC = () => {
    const { studentTransactions } = useStudentData();
    
    return (
        <div>
            <h2>Points History</h2>
            <ul>
                {studentTransactions.map((transaction, index) => (
                    <li key={index}>
                        {transaction.type === 'addition' ? 'Added' : 'Subtracted'}: {Math.abs(transaction.amount)} points
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TransactionHistory;