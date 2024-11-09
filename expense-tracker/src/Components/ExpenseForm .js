import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExpenseForm = ({ onExpenseAdded, expenses }) => {
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('Food');
    const [isDuplicate, setIsDuplicate] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Function to check if the expense already exists
    const checkDuplicate = () => {
        // Check if there's any existing expense with the same date, amount, category, and description
        const duplicate = expenses.some(expense =>
            expense.date === date &&
            expense.amount === amount &&
            expense.category === category &&
            expense.description.toLowerCase() === description.toLowerCase()
        );
        setIsDuplicate(duplicate); // Set isDuplicate to true if a duplicate is found
    };

    useEffect(() => {
        checkDuplicate(); // Re-check for duplicates whenever the form fields  change
    }, [date, description, amount, category, expenses]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isDuplicate) {
            alert('Duplicate expense detected!'); // Alert if duplicate found
            return;
        }

        const expense = { date, description, amount, category };

        try {
            // Send the expense to the backend
            const response = await axios.post('http://localhost:4000/expenses', [expense]);

            if (response.data.message === "Expenses processed successfully") {
                const duplicateFlagged = response.data.flaggedDuplicates.find(flaggedExpense =>
                    flaggedExpense.date === date && flaggedExpense.description.toLowerCase() === description.toLowerCase()
                );

                if (duplicateFlagged) {
                    setIsDuplicate(true);
                    setErrorMessage('This expense is a duplicate!');
                    return;
                }

                onExpenseAdded();
                setDate('');
                setDescription('');
                setAmount('');
                setCategory('Food');
                setIsDuplicate(false); // Reset duplicate state
                setErrorMessage('');
            }
        } catch (error) {
            console.error("Error adding expense:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
                <label htmlFor="date" style={styles.label}>Date</label>
                <input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    style={isDuplicate ? { ...styles.input, borderColor: 'red' } : styles.input}
                />
            </div>

            <div style={styles.inputGroup}>
                <label htmlFor="description" style={styles.label}>Description</label>
                <input
                    id="description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    style={isDuplicate ? { ...styles.input, borderColor: 'red' } : styles.input}
                />
            </div>

            <div style={styles.inputGroup}>
                <label htmlFor="amount" style={styles.label}>Amount</label>
                <input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    style={isDuplicate ? { ...styles.input, borderColor: 'red' } : styles.input}
                />
            </div>

            <div style={styles.inputGroup}>
                <label htmlFor="category" style={styles.label}>Category</label>
                <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={isDuplicate ? { ...styles.input, borderColor: 'red' } : styles.input}
                >
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Entertainment">Entertainment</option>
                </select>
            </div>

            {/* Display error message when duplicate is found */}
            {errorMessage && <p style={styles.errorText}>{errorMessage}</p>}

            {/* Disable submit button if it's a duplicate */}
            <button type="submit" disabled={isDuplicate} style={isDuplicate ? { ...styles.button, ...styles.buttonDisabled } : styles.button}>
                Add Expense
            </button>
        </form>
    );
};

// Inline CSS styles for the form and inputs
const styles = {
    form: {
        width: '100%',
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    inputGroup: {
        marginBottom: '15px',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold',
        color: '#333',
    },
    input: {
        width: '100%',
        padding: '8px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        boxSizing: 'border-box',
    },
    button: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
        cursor: 'not-allowed',
    },
    errorText: {
        color: 'red',
        fontSize: '14px',
        marginTop: '10px',
    }
};

export default ExpenseForm;
