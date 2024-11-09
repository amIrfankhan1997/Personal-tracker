import React, { useState } from 'react';
import axios from 'axios';

const ExpenseList = ({ expenses, onExpenseDeleted, onExpenseUpdated }) => {
    const [editingExpense, setEditingExpense] = useState(null);
    const [formData, setFormData] = useState({
        date: '',
        description: '',
        amount: '',
        category: ''
    });

    // Handle Delete
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/expenses/${id}`);
            onExpenseDeleted();  // Notify parent that an expense was deleted
        } catch (error) {
            console.error("Error deleting expense:", error);
        }
    };

    // Handle Edit
    const handleEdit = (expense) => {
        setEditingExpense(expense.id);  // Set the ID to identify the expense to update
        setFormData({
            date: expense.date,
            description: expense.description,
            amount: expense.amount,
            category: expense.category
        });
    };

    // Handle Update (Submit edited data)
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:4000/expenses/${editingExpense}`, formData);
            setEditingExpense(null); // Clear editing mode
            onExpenseUpdated();  // Notify parent that an expense was updated
            setFormData({ date: '', description: '', amount: '', category: '' }); // Reset form
        } catch (error) {
            console.error("Error updating expense:", error);
        }
    };

    // Handle form input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Expenses</h2>

            {editingExpense && (
                <div style={styles.editFormContainer}>
                    <h3 style={styles.subHeader}>Edit Expense</h3>
                    <form onSubmit={handleUpdate} style={styles.form}>
                        <label style={styles.label}>
                            Date:
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                style={styles.input}
                            />
                        </label>
                        <label style={styles.label}>
                            Description:
                            <input
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                style={styles.input}
                            />
                        </label>
                        <label style={styles.label}>
                            Amount:
                            <input
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={handleInputChange}
                                style={styles.input}
                            />
                        </label>
                        <label style={styles.label}>
                            Category:
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                style={styles.select}
                            >
                                <option value="Food">Food</option>
                                <option value="Transport">Transport</option>
                                <option value="Utilities">Utilities</option>
                                <option value="Makeup">Makeup</option>
                            </select>
                        </label>
                        <div style={styles.buttonContainer}>
                            <button type="submit" style={styles.submitButton}>Update</button>
                            <button type="button" onClick={() => setEditingExpense(null)} style={styles.cancelButton}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.tableHeader}>Date</th>
                        <th style={styles.tableHeader}>Description</th>
                        <th style={styles.tableHeader}>Amount</th>
                        <th style={styles.tableHeader}>Category</th>
                        <th style={styles.tableHeader}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map(expense => (
                        <tr key={expense.id} style={styles.tableRow}>
                            <td>{expense.date}</td>
                            <td>{expense.description}</td>
                            <td>{expense.amount}</td>
                            <td>{expense.category}</td>
                            <td>
                                <button onClick={() => handleDelete(expense.id)} style={styles.deleteButton}>Delete</button>
                                <button onClick={() => handleEdit(expense)} style={styles.editButton}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        margin: '20px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    header: {
        fontSize: '24px',
        color: '#333',
        fontWeight: 'bold',
        marginBottom: '20px',
    },
    subHeader: {
        fontSize: '20px',
        color: '#333',
        marginBottom: '15px',
    },
    editFormContainer: {
        marginBottom: '20px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    label: {
        fontSize: '14px',
        color: '#333',
    },
    input: {
        padding: '10px',
        fontSize: '14px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    select: {
        padding: '10px',
        fontSize: '14px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '10px',
    },
    submitButton: {
        backgroundColor: '#007BFF',
        color: '#fff',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    cancelButton: {
        backgroundColor: '#ccc',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
    },
    tableHeader: {
        textAlign: 'left',
        padding: '10px',
        backgroundColor: '#007BFF',
        color: '#fff',
    },
    tableRow: {
        borderBottom: '1px solid #ccc',
    },
    deleteButton: {
        backgroundColor: '#e74c3c',
        color: '#fff',
        padding: '5px 10px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginRight: '10px',
    },
    editButton: {
        backgroundColor: '#2ecc71',
        color: '#fff',
        padding: '5px 10px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default ExpenseList;
