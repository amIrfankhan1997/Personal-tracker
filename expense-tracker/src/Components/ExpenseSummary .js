import React from 'react';

const ExpenseSummary = ({ summary }) => {
    const { totalAmount, categoryTotals } = summary;

    // Ensure totalAmount is a valid number before calling toFixed
    const formattedTotalAmount = typeof totalAmount === 'number' ? totalAmount.toFixed(2) : '0.00';

    return (
        <div style={styles.container}>
            <h3 style={styles.totalAmount}>Total Expenses: ${formattedTotalAmount}</h3>
            <ul style={styles.categoryList}>
                {Object.entries(categoryTotals).map(([category, amount]) => (
                    <li key={category} style={styles.categoryItem}>
                        <strong style={styles.categoryName}>{category}</strong>: ${amount.toFixed(2)}
                    </li>
                ))}
            </ul>
        </div>
    );
};

// Inline CSS for styling
const styles = {
    container: {
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        padding: '20px',
        width: '100%',
        maxWidth: '450px',
        margin: '20px auto',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    },
    totalAmount: {
        fontSize: '24px',
        color: '#2c3e50',
        fontWeight: 'bold',
        marginBottom: '20px',
    },
    categoryList: {
        listStyleType: 'none',
        paddingLeft: '0',
        marginTop: '10px',
    },
    categoryItem: {
        fontSize: '18px',
        color: '#34495e',
        marginBottom: '12px',
        padding: '8px',
        borderRadius: '6px',
        backgroundColor: '#ecf0f1',
        transition: 'background-color 0.3s',
    },
    categoryItemHover: {
        backgroundColor: '#dcdfe1',
    },
    categoryName: {
        fontWeight: 'bold',
        color: '#2980b9',
    }
};

export default ExpenseSummary;
