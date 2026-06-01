import axios, { type AxiosInstance } from 'axios';
import type {
  RegisterRequest,
  LoginRequest,
  AuthResponse,
  SetBudgetRequest,
  BudgetResponse,
  ExpenseResponse,
  Expense,
  AddExpenseRequest
} from '../types';

const API_BASE_URL = '/api';

class ApiService {
  private client: AxiosInstance;
  private token: string | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Load token from localStorage if available
    this.token = localStorage.getItem('authToken');
    this.updateAuthHeader();
  }

  private updateAuthHeader() {
    if (this.token) {
      this.client.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
    } else {
      delete this.client.defaults.headers.common['Authorization'];
    }
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('authToken', token);
    this.updateAuthHeader();
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('authToken');
    this.updateAuthHeader();
  }

  getToken(): string | null {
    return this.token;
  }

  // Authentication APIs
  async register(request: RegisterRequest): Promise<AuthResponse> {
    const response = await this.client.post('/auth/register', request);
    return response.data;
  }

  async login(request: LoginRequest): Promise<AuthResponse> {
    const response = await this.client.post('/auth/login', request);
    const data = response.data;
    this.setToken(data.token);
    return data;
  }

  // Budget APIs
  async setBudget(request: SetBudgetRequest): Promise<BudgetResponse> {
    const response = await this.client.post('/budget/set', request);
    return response.data;
  }

  async getBudget(userId: number): Promise<BudgetResponse> {
    const response = await this.client.get(`/budget/${userId}`);
    return response.data;
  }

  // Expense APIs
  async addExpense(request: AddExpenseRequest): Promise<ExpenseResponse> {
    const response = await this.client.post('/expenses', request);
    return response.data;
  }

  async getUserExpenses(userId: number): Promise<Expense[]> {
    const response = await this.client.get<Expense[]>(`/expenses/${userId}`);
    return response.data;
  }

  async deleteExpense(expenseId: number): Promise<void> {
    await this.client.delete(`/expenses/${expenseId}`);
  }

  // Summary APIs
  async getSummary(userId: number): Promise<any> {
    const response = await this.client.get(`/summary/${userId}`);
    return response.data;
  }
}

export const apiService = new ApiService();
