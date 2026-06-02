import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import '../styles/SummaryView.css';

interface SummaryViewProps {
  userId: number;
}

interface CategorySummary {
  category: string;
  total: number;
  percentage: number;
}

interface SummaryData {
  totalExpenses: number;
  totalSpent: number;
  remainingBudget: number;
  budget: number;
  rank: string;
  spendingPercentage: number;
  isOverBudget: boolean;
  topCategory: string;
  categorySummary?: CategorySummary[];
  expenseBreakdown?: Record<string, number>;
}

const rankMessages: Record<string, string> = {
  IMMORTAL_SAVER: 'Outstanding! You have spent nothing yet and are in perfect savings shape.',
  MYTHICAL_SAVER: 'Amazing discipline — you are spending less than 5% of your budget.',
  LEGENDARY_SAVER: 'Excellent work — keep your spending below 15% and stay ahead.',
  MASTER_SAVER: 'Strong saver! Your budget use is under control.',
  ELITE_SAVER: 'Nice progress — you are using less than half of your budget.',
  ROOKIE_SAVER: 'Keep tracking your expenses to improve your savings rank.'
};

const SummaryView: React.FC<SummaryViewProps> = ({ userId }) => {
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadSummary();
  }, [userId]);

  const loadSummary = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await apiService.getSummary(userId);
      setSummary(data);
    } catch (err) {
      setError('Failed to load summary');
      setSummary(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="summary-view"><p>Loading summary...</p></div>;
  }

  if (error && !summary) {
    return <div className="summary-view error-message">{error}</div>;
  }

  const getCategorySummary = (): CategorySummary[] => {
    if (summary?.categorySummary && summary.categorySummary.length > 0) {
      return summary.categorySummary;
    }

    if (summary?.expenseBreakdown) {
      const total = Object.values(summary.expenseBreakdown).reduce((sum, value) => sum + value, 0);
      return Object.entries(summary.expenseBreakdown).map(([category, totalValue]) => ({
        category,
        total: totalValue,
        percentage: total > 0 ? parseFloat(((totalValue / total) * 100).toFixed(2)) : 0
      }));
    }

    return [];
  };

  const summaryCategories = getCategorySummary();

  const rankMessage = summary ? rankMessages[summary.rank] || 'Keep tracking your expenses to improve your rank.' : '';

  return (
    <div className="summary-view">
      <h3>Spending Summary</h3>
      
      {summary && (
        <>
          <div className="summary-panel">
            <div className="rank-card">
              <p className="label">Your Rank</p>
              <h4>{summary.rank}</h4>
              <p className="rank-message">{rankMessage}</p>
            </div>

            <div className={`budget-status ${summary.isOverBudget ? 'over-budget' : 'under-budget'}`}>
              <p className="label">Budget Health</p>
              <p className="amount">₱{summary.remainingBudget?.toFixed(2) || '0.00'}</p>
              <p className="status-text">
                {summary.isOverBudget
                  ? 'You are over budget. Review your spending categories.'
                  : `${summary.spendingPercentage?.toFixed(1) || 0}% of budget used`}
              </p>
              <p className="top-category-text">Top category: {summary.topCategory}</p>
            </div>
          </div>

          <div className="total-expenses">
            <p className="label">Total Expenses</p>
            <p className="amount">₱{summary.totalSpent?.toFixed(2) || '0.00'}</p>
          </div>

          <div className="category-breakdown">
            <h4>Breakdown by Category</h4>
            {summaryCategories.length > 0 ? (
              <div className="category-list">
                {summaryCategories.map((cat: CategorySummary, idx: number) => (
                  <div key={idx} className="category-item">
                    <div className="category-info">
                      <span className="category-name">{cat.category}</span>
                      <span className="category-amount">₱{cat.total?.toFixed(2) || '0.00'}</span>
                    </div>
                    <div className="category-percentage">
                      <div className="percentage-bar">
                        <div
                          className="percentage-fill"
                          style={{ width: `${cat.percentage || 0}%` }}
                        ></div>
                      </div>
                      <span className="percentage-text">{cat.percentage || 0}%</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-data">No expenses to summarize</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SummaryView;
