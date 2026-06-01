import React, { useState } from 'react';
import type { ExpenseCategory } from '../types';
import { apiService } from '../services/api';
import '../styles/ExpenseForm.css';

interface ExpenseFormProps {
  userId: number;
  onExpenseAdded: () => void;
}

const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  'SCHOOL_ALLOWANCE',
  'PROJECTS',
  'FACILITIES',
  'WANTS',
];

const formatCategory = (value: string): string =>
    value.replaceAll('_', ' ').toLowerCase().replace(/(^|\s)\S/g, (l) => l.toUpperCase());

const ExpenseForm: React.FC<ExpenseFormProps> = ({ userId, onExpenseAdded }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('WANTS');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await apiService.addExpense({
        userId,
        amount: parseFloat(amount),
        category,
        description,
      });

      setAmount('');
      setDescription('');
      setCategory('WANTS');
      onExpenseAdded();
    } catch {
      setError('Failed to add expense. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="expense-form-card">
        <h3>Add New Expense</h3>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="amount">Amount (₱)</label>
            <input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
            >
              {EXPENSE_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {formatCategory(cat)}
                  </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
                id="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What did you spend on?"
                required
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Adding...' : 'Add Expense'}
          </button>
        </form>
      </div>
  );
};

export default ExpenseForm;