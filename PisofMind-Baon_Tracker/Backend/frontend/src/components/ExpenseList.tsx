import React, { useState, useEffect } from 'react';
import type { Expense } from '../types';
import { apiService } from '../services/api';
import '../styles/ExpenseList.css';

interface ExpenseListProps {
  userId: number;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ userId }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadExpenses();
  }, [userId]);

  const loadExpenses = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await apiService.getUserExpenses(userId);
      setExpenses(data);
    } catch (err) {
      setError('Failed to load expenses');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (expenseId: number) => {
    try {
      await apiService.deleteExpense(expenseId);
      setExpenses(expenses.filter(e => e.id !== expenseId));
    } catch (err) {
      alert('Failed to delete expense');
    }
  };

  if (loading) {
    return <div className="expense-list"><p>Loading expenses...</p></div>;
  }

  if (error) {
    return <div className="expense-list error-message">{error}</div>;
  }

  return (
    <div className="expense-list">
      <h3>Expense History</h3>
      
      {expenses.length === 0 ? (
        <p className="no-expenses">No expenses yet. Add your first expense above!</p>
      ) : (
        <div className="expenses-grid">
          {expenses.map((expense) => (
            <div key={expense.id} className="expense-item">
              <div className="expense-header">
                <span className="category-badge">{expense.category}</span>
                <button
                  onClick={() => handleDelete(expense.id)}
                  className="btn-delete"
                  title="Delete expense"
                >
                  ✕
                </button>
              </div>
              <p className="description">{expense.description}</p>
              <div className="expense-footer">
                <span className="amount">₱{expense.amount.toFixed(2)}</span>
                <span className="date">
                  {new Date(expense.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
