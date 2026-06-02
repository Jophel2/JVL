import React, { createContext, useState, useEffect, useCallback } from 'react';
import type { AuthContextType, User } from '../types';
import { apiService } from '../services/api';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('authUser');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
      apiService.setToken(savedToken);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const response = await apiService.login({ email, password });
    const mockUser: User = {
      id: response.userId,
      email,
      gender: 'Male',
      age: 20,
      budget: 0,
      rank: 'ROOKIE_SAVER'
    };
    
    setToken(response.token);
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('authToken', response.token);
    localStorage.setItem('authUser', JSON.stringify(mockUser));
  }, []);

  const register = useCallback(async (email: string, password: string, gender: string, age: number) => {
    await apiService.register({ email, password, gender, age });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    apiService.clearToken();
  }, []);

  const value: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
