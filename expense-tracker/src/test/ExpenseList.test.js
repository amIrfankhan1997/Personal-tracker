import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import ExpenseList from '../Components/ExpenseList ';

// Mock axios for HTTP requests
jest.mock('axios');

describe('ExpenseList Component', () => {
    const mockOnExpenseDeleted = jest.fn();
    const mockOnExpenseUpdated = jest.fn();
    const mockExpenses = [
        { id: 1, date: '2024-11-08', description: 'Coffee', amount: '5', category: 'Food' },
        { id: 2, date: '2024-11-09', description: 'Groceries', amount: '50', category: 'Utilities' },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders ExpenseList with correct data', () => {
        render(
            <ExpenseList
                expenses={mockExpenses}
                onExpenseDeleted={mockOnExpenseDeleted}
                onExpenseUpdated={mockOnExpenseUpdated}
            />
        );

        // Check if expenses are displayed correctly
        expect(screen.getByText('Coffee')).toBeInTheDocument();
        expect(screen.getByText('Groceries')).toBeInTheDocument();
        expect(screen.getByText('5')).toBeInTheDocument();
        expect(screen.getByText('50')).toBeInTheDocument();
    });

    test('handles delete action and calls onExpenseDeleted', async () => {
        axios.delete.mockResolvedValueOnce({});

        render(
            <ExpenseList
                expenses={mockExpenses}
                onExpenseDeleted={mockOnExpenseDeleted}
                onExpenseUpdated={mockOnExpenseUpdated}
            />
        );

        // Click the delete button for the first expense
        const deleteButton = screen.getAllByText(/delete/i)[0];
        fireEvent.click(deleteButton);

        // Wait for delete API call
        await waitFor(() => {
            expect(axios.delete).toHaveBeenCalledWith('http://localhost:4000/expenses/1');
            expect(mockOnExpenseDeleted).toHaveBeenCalled();
        });
    });

    test('handles edit action and populates form with selected expense', () => {
        render(
            <ExpenseList
                expenses={mockExpenses}
                onExpenseDeleted={mockOnExpenseDeleted}
                onExpenseUpdated={mockOnExpenseUpdated}
            />
        );

        // Click the edit button for the first expense
        const editButton = screen.getAllByText(/edit/i)[0];
        fireEvent.click(editButton);

        // Check if form is populated with correct data
        expect(screen.getByLabelText(/date/i).value).toBe('2024-11-08');
        expect(screen.getByLabelText(/description/i).value).toBe('Coffee');
        expect(screen.getByLabelText(/amount/i).value).toBe('5');
        expect(screen.getByLabelText(/category/i).value).toBe('Food');
    });

    test('handles update action and calls onExpenseUpdated', async () => {
        axios.put.mockResolvedValueOnce({});

        render(
            <ExpenseList
                expenses={mockExpenses}
                onExpenseDeleted={mockOnExpenseDeleted}
                onExpenseUpdated={mockOnExpenseUpdated}
            />
        );

        // Click the edit button for the first expense
        const editButton = screen.getAllByText(/edit/i)[0];
        fireEvent.click(editButton);

        // Change form inputs
        fireEvent.change(screen.getByLabelText(/description/i), {
            target: { value: 'Updated Coffee' },
        });
        fireEvent.change(screen.getByLabelText(/amount/i), {
            target: { value: '10' },
        });

        // Click the update button
        const updateButton = screen.getByRole('button', { name: /update/i });
        fireEvent.click(updateButton);

        // Wait for update API call
        await waitFor(() => {
            expect(axios.put).toHaveBeenCalledWith(
                'http://localhost:4000/expenses/1',
                expect.objectContaining({
                    date: '2024-11-08',
                    description: 'Updated Coffee',
                    amount: '10',
                    category: 'Food',
                })
            );
            expect(mockOnExpenseUpdated).toHaveBeenCalled();
        });
    });

    test('cancels editing without updating the expense', () => {
        render(
            <ExpenseList
                expenses={mockExpenses}
                onExpenseDeleted={mockOnExpenseDeleted}
                onExpenseUpdated={mockOnExpenseUpdated}
            />
        );

        // Click the edit button for the first expense
        const editButton = screen.getAllByText(/edit/i)[0];
        fireEvent.click(editButton);

        // Click the cancel button
        const cancelButton = screen.getByRole('button', { name: /cancel/i });
        fireEvent.click(cancelButton);

        // Check if form is closed
        expect(screen.queryByRole('button', { name: /update/i })).not.toBeInTheDocument();
    });
});
