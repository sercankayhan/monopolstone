import React, { useState, useEffect, useContext, createContext, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock users for demo
  const mockUsers = [
    {
      id: '1',
      email: 'admin@artificialstone.com',
      password: 'admin123',
      name: 'Admin User',
      role: 'admin' as const,
    },
    {
      id: '2',
      email: 'editor@artificialstone.com',
      password: 'editor123',
      name: 'Editor User',
      role: 'editor' as const,
    },
  ];


  // Check for existing token on mount
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('userData');
      if (token && userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (error) {
          localStorage.removeItem('token');
          localStorage.removeItem('userData');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Find mock user
      const mockUser = mockUsers.find(u => u.email === email && u.password === password);
      
      if (!mockUser) {
        throw new Error('Invalid email or password');
      }

      // Create user object without password
      const userData = {
        id: mockUser.id,
        email: mockUser.email,
        name: mockUser.name,
        role: mockUser.role,
      };

      // Store auth data
      const mockToken = `mock-jwt-token-${mockUser.id}`;
      localStorage.setItem('token', mockToken);
      localStorage.setItem('userData', JSON.stringify(userData));

      setUser(userData);
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };


  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    setUser(null);
    setError(null);
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    loading,
    error,
  };

  return React.createElement(AuthContext.Provider, { value }, children);
};