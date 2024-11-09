import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExpenseList from './ExpenseList ';
import ExpenseForm from './ExpenseForm ';
import ExpenseSummary from './ExpenseSummary ';

const ExpenseDashboard = () => {
    const [expenses, setExpenses] = useState([]);
    const [summary, setSummary] = useState({ totalAmount: 0, categoryTotals: {} });

    // Fetch expenses
    const fetchExpenses = async () => {
        try {
            const response = await axios.get('http://localhost:4000/expenses');
            setExpenses(response.data);
            updateSummary(response.data);
        } catch (error) {
            console.error("Error fetching expenses:", error);
        }
    };

    // Update expense summary
    const updateSummary = (expensesData) => {
        let totalAmount = 0;
        let categoryTotals = {};

        expensesData.forEach(expense => {
            // Parse amount as a number before adding
            const amount = parseFloat(expense.amount);
            if (!isNaN(amount)) {
                totalAmount += amount;  // Add the parsed number to totalAmount
                categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + amount;
            }
        });

        // Ensure totalAmount is a number
        totalAmount = isNaN(totalAmount) ? 0 : totalAmount;

        setSummary({ totalAmount, categoryTotals });
    };

    // Handle expense added
    const handleExpenseAdded = () => {
        fetchExpenses();  // Re-fetch expenses after adding a new one
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    return (
        <div style={styles.container}>
            <div style={styles.leftContainer}>
                <div style={styles.formContainer}>
                    <ExpenseForm onExpenseAdded={handleExpenseAdded} expenses={expenses} />
                </div>
                <div style={styles.summaryContainer}>
                    <ExpenseSummary summary={summary} />
                </div>
            </div>

            <div style={styles.rightContainer}>
                <div style={styles.listContainer}>
                    <ExpenseList
                        expenses={expenses}
                        onExpenseDeleted={() => fetchExpenses()}
                        onExpenseUpdated={() => fetchExpenses()}
                    />
                </div>
            </div>
        </div>
    );
};

// Styling using Flexbox for a two-column layout
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'space-between', //  / Space between left and right
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    leftContainer: {
        display: 'flex',
        flexDirection: 'column',  // Stack the form and summary vertically
        flex: 1,  // Takes up remaining space
        marginRight: '20px',  // Space between left and right sections
    },
    rightContainer: {
        flex: 2,  // Right side gets more space
        maxWidth: '700px',
    },
    formContainer: {
        width: '100%',
        marginBottom: '20px',
        padding: '10px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    summaryContainer: {
        width: '100%',
        marginBottom: '20px',
        padding: '10px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    listContainer: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
};

export default ExpenseDashboard;
