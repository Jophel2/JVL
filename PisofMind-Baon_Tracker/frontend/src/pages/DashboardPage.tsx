import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import BudgetCard from '../components/BudgetCard';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import SummaryView from '../components/SummaryView';
import { apiService } from '../services/api';
import type { BudgetResponse, ExpenseCategory, BudgetPeriod } from '../types';
import '../styles/Dashboard.css';

const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  'SCHOOL_ALLOWANCE',
  'PROJECTS',
  'FACILITIES',
  'WANTS',
];

const DashboardPage = () => {
  const { user, logout } = useAuth();

  const [budget, setBudget] = useState<BudgetResponse | null>(null);
  const [budgetCategory, setBudgetCategory] =
      useState<ExpenseCategory>('WANTS');
  const [budgetPeriod, setBudgetPeriod] =
      useState<BudgetPeriod>('MONTHLY');
  const [budgetInput, setBudgetInput] = useState('');
  const [budgetMessage, setBudgetMessage] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeTab, setActiveTab] = useState<'expenses' | 'summary'>(
      'expenses'
  );

  const loadBudget = async () => {
    if (!user) return;

    try {
      const budgetData = await apiService.getBudget(user.id);
      setBudget(budgetData);
    } catch (error) {
      console.error('Failed to load budget:', error);
    }
  };

  useEffect(() => {
    if (user) {
      void loadBudget();
    }
  }, [user, refreshKey]);

  const handleSetBudget = async (e: any) => {
    e.preventDefault();

    if (!user) return;

    const amount = parseFloat(budgetInput);

    if (Number.isNaN(amount) || amount <= 0) {
      setBudgetMessage(
          'Please enter a valid budget amount greater than 0.'
      );
      return;
    }

    try {
      await apiService.setBudget({
        userId: user.id,
        category: budgetCategory,
        budget: amount,
        budgetPeriod: budgetPeriod,
      });

      setBudgetInput('');
      setBudgetMessage(
          `Budget for ${budgetCategory} saved successfully.`
      );
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      setBudgetMessage(
          'Unable to save budget. Please try again.'
      );
      console.error('Failed to set budget:', error);
    }
  };

  const handleExpenseAdded = () => {
    setRefreshKey((prev) => prev + 1);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
      <div className="dashboard">
        <header className="dashboard-header">
          <div className="header-content">
            <h1>PisofMind Dashboard</h1>

            <div className="header-info">
              <span className="user-email">{user.email}</span>

              <button
                  onClick={logout}
                  className="btn-logout"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="dashboard-main">
          <section className="budget-section">
            <form
                onSubmit={handleSetBudget}
                className="budget-form"
            >
              <div className="budget-field-row">
                <div className="budget-field">
                  <label htmlFor="budgetCategory">
                    Category
                  </label>

                  <select
                      id="budgetCategory"
                      value={budgetCategory}
                      onChange={(e) =>
                          setBudgetCategory(
                              e.target.value as ExpenseCategory
                          )
                      }
                  >
                    {EXPENSE_CATEGORIES.map((category) => (
                        <option
                            key={category}
                            value={category}
                        >
                          {category}
                        </option>
                    ))}
                  </select>
                </div>

                <div className="budget-field">
                  <label htmlFor="budgetPeriod">
                    Period
                  </label>

                  <select
                      id="budgetPeriod"
                      value={budgetPeriod}
                      onChange={(e) =>
                          setBudgetPeriod(e.target.value as BudgetPeriod)
                      }
                  >
                    <option value="DAILY">Daily</option>
                    <option value="WEEKLY">Weekly</option>
                    <option value="MONTHLY">Monthly</option>
                    <option value="YEARLY">Yearly</option>
                  </select>
                </div>

                <div className="budget-field">
                  <label htmlFor="budget">
                    Budget (₱)
                  </label>

                  <input
                      id="budget"
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={budgetInput}
                      onChange={(e) =>
                          setBudgetInput(e.target.value)
                      }
                      placeholder="Enter your budget"
                  />
                </div>
              </div>

              <div className="budget-input-row">
                <button
                    type="submit"
                    className="btn-primary"
                >
                  Save Budget
                </button>
              </div>

              {budgetMessage && (
                  <p className="budget-message">
                    {budgetMessage}
                  </p>
              )}
            </form>
          </section>

          {budget && <BudgetCard budget={budget} />}

          <div className="dashboard-tabs">
            <button
                className={`tab-button ${
                    activeTab === 'expenses' ? 'active' : ''
                }`}
                onClick={() => setActiveTab('expenses')}
            >
              Expenses
            </button>

            <button
                className={`tab-button ${
                    activeTab === 'summary' ? 'active' : ''
                }`}
                onClick={() => setActiveTab('summary')}
            >
              Summary
            </button>
          </div>

          <div className="dashboard-content">
            {activeTab === 'expenses' && (
                <div className="expenses-section">
                  <ExpenseForm
                      userId={user.id}
                      onExpenseAdded={handleExpenseAdded}
                  />

                  <ExpenseList
                      userId={user.id}
                      key={refreshKey}
                  />
                </div>
            )}

            {activeTab === 'summary' && (
                <SummaryView
                    userId={user.id}
                    key={refreshKey}
                />
            )}
          </div>
        </main>
      </div>
  );
};

export default DashboardPage;