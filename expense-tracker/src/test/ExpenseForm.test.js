import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import ExpenseForm from '../Components/ExpenseForm ';

// Mock axios post request
jest.mock('axios');

describe('ExpenseForm Component', () => {
    const mockOnExpenseAdded = jest.fn();
    const mockExpenses = [
        { date: '2024-11-08', description: 'Coffee', amount: '5', category: 'Food' }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders ExpenseForm and fills out the form', async () => {
        axios.post.mockResolvedValueOnce({ data: { message: "Expenses processed successfully" } });

        render(<ExpenseForm onExpenseAdded={mockOnExpenseAdded} expenses={mockExpenses} />);

        // Fill out form inputs
        fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '2024-11-09' } });
        fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Groceries' } });
        fireEvent.change(screen.getByLabelText(/amount/i), { target: { value: '50' } });
        fireEvent.change(screen.getByLabelText(/category/i), { target: { value: 'Food' } });

        // Click the submit button
        const submitButton = screen.getByRole('button', { name: /add expense/i });
        fireEvent.click(submitButton);

        // Wait for async actions to complete
        await waitFor(() => {
            expect(mockOnExpenseAdded).toHaveBeenCalled();
        });
    });

    test('prevents submission if duplicate expense is detected', async () => {
        render(<ExpenseForm onExpenseAdded={mockOnExpenseAdded} expenses={mockExpenses} />);

        // Enter duplicate expense
        fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '2024-11-08' } });
        fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Coffee' } });
        fireEvent.change(screen.getByLabelText(/amount/i), { target: { value: '5' } });
        fireEvent.change(screen.getByLabelText(/category/i), { target: { value: 'Food' } });

        // Attempt to submit
        const submitButton = screen.getByRole('button', { name: /add expense/i });
        fireEvent.click(submitButton);

        // Check if alert or message is shown for duplicate
        expect(mockOnExpenseAdded).not.toHaveBeenCalled();
        expect(screen.getByText(/this expense already exists/i)).toBeInTheDocument();
    });
});
