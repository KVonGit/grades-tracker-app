export interface Transaction {
    id: string;
    studentId: string;
    amount: number;
    type: 'addition' | 'subtraction';
    date: Date;
    description?: string;
}