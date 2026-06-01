import React from 'react';
import type { BudgetResponse } from '../types';
import '../styles/BudgetCard.css';

interface BudgetCardProps {
  budget: BudgetResponse;
}

const BudgetCard: React.FC<BudgetCardProps> = ({ budget }) => {
  const percentageSpent = budget.totalBudget > 0 ? (budget.totalSpent / budget.totalBudget) * 100 : 0;

  return (
    <div className="budget-card">
      <h2>Budget Overview</h2>

      <div className="budget-stats">
        <div className="stat">
          <label>Total Budget</label>
          <p className="amount">₱{budget.totalBudget.toFixed(2)}</p>
        </div>

        <div className="stat">
          <label>Spent</label>
          <p className="amount spent">₱{budget.totalSpent.toFixed(2)}</p>
        </div>

        <div className="stat">
          <label>Remaining</label>
          <p className={`amount ${budget.totalRemaining >= 0 ? 'positive' : 'negative'}`}>
            ₱{budget.totalRemaining.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${Math.min(percentageSpent, 100)}%` }}></div>
      </div>

      <p className="progress-text">
        {percentageSpent.toFixed(1)}% of total budget spent
      </p>

      <div className="category-budget-list">
        <h3>Category Budgets</h3>
        {budget.categoryBudgets.length === 0 ? (
          <p className="no-budgets">No category budgets set yet.</p>
        ) : (
          <div className="category-budget-grid">
            {budget.categoryBudgets.map((item) => (
              <div key={item.category} className="category-budget-item">
                <div className="category-budget-header">
                  <span className="category-name">{item.category}</span>
                  <span className="category-remaining">₱{item.remaining.toFixed(2)}</span>
                </div>
                <div className="category-budget-values">
                  <span>Budget: ₱{item.budget.toFixed(2)}</span>
                  <span>Spent: ₱{item.spent.toFixed(2)}</span>
                  <span>Period: {item.period}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetCard;
