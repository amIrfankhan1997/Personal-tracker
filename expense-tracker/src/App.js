import React, { useState } from 'react';
import ExpenseForm from './Components/ExpenseForm ';
import ExpenseSummary from './Components/ExpenseSummary ';
import ExpenseList from './Components/ExpenseList ';
import ExpenseDashboard from './Components/ExpenseDashboard ';

const App = () => {
  const [refresh, setRefresh] = useState(false);

  const handleExpenseAdded = () => {
    setRefresh(!refresh);
  };

  const handleExpenseDeleted = () => {
    setRefresh(!refresh);
  };

  return (
    <div>
      <h1>Personal Expense Tracker</h1>
      {/* <ExpenseForm onExpenseAdded={handleExpenseAdded} /> */}
      {/* <ExpenseSummary />
      <ExpenseList onExpenseDeleted={handleExpenseDeleted} /> */}
      <ExpenseDashboard onExpenseDeleted={handleExpenseDeleted} onExpenseAdded={handleExpenseAdded} />
    </div>
  );
};

export default App;
