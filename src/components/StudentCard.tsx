import React, { useState } from 'react';
import { Student } from '../models/Student';

interface StudentCardProps {
    name: string;
    balance: number;
    id?: string;
    onBalanceChange?: (studentId: string, amount: number) => void;
}

const StudentCard: React.FC<StudentCardProps> = ({ name, balance, id, onBalanceChange }) => {
    const [amount, setAmount] = useState<number>(0);

    const handleAddBalance = () => {
        if (id && onBalanceChange && amount > 0) {
            onBalanceChange(id, amount);
            setAmount(0);
        }
    };

    const handleSubtractBalance = () => {
        if (id && onBalanceChange && amount > 0) {
            onBalanceChange(id, -amount);
            setAmount(0);
        }
    };

    return (
        <div className="student-card">
            <h3>{name}</h3>
            <p>Points: {balance.toFixed(0)}</p>
            
            {onBalanceChange && id && (
                <div className="balance-controls">
                    <input
                        type="number"
                        min="0"
                        value={amount}
                        onChange={(e) => setAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                        placeholder="Points"
                    />
                    <div className="buttons">
                        <button onClick={handleAddBalance}>Add Points</button>
                        <button onClick={handleSubtractBalance}>Subtract Points</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentCard;