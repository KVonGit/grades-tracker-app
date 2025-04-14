export const formatBalance = (balance: number): string => {
    return `$${balance.toFixed(2)}`;
};

export const validateInput = (input: string): boolean => {
    return input.trim() !== '';
};