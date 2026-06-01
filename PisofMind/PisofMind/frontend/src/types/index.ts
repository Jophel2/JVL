// User and Authentication Types
export interface User {
  id: number;
  email: string;
  gender: string;
  age: number;
  budget: number;
  rank: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  gender: string;
  age: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  userId: number;
  message: string;
}

// Budget Types
export type BudgetPeriod = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';

export interface CategoryBudget {
  category: ExpenseCategory;
  budget: number;
  spent: number;
  remaining: number;
  period: BudgetPeriod;
}

export interface BudgetResponse {
  userId: number;
  totalBudget: number;
  totalSpent: number;
  totalRemaining: number;
  categoryBudgets: CategoryBudget[];
}

export interface SetBudgetRequest {
  userId: number;
  category: ExpenseCategory;
  budget: number;
  budgetPeriod: BudgetPeriod;
}

// Expense Types
export type ExpenseCategory =
    | 'SCHOOL_ALLOWANCE'
    | 'PROJECTS'
    | 'FACILITIES'
    | 'WANTS';

export interface Expense {
  id: number;
  userId: number;
  amount: number;
  category: ExpenseCategory;
  description: string;
  createdAt: string;
}

export interface AddExpenseRequest {
  userId: number;
  amount: number;
  category: ExpenseCategory;
  description: string;
}

export interface ExpenseResponse {
  id: number;
  amount: number;
  category: ExpenseCategory;
  description: string;
  createdAt: string;
}

// Context Types
export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, gender: string, age: number) => Promise<void>;
  logout: () => void;
}
