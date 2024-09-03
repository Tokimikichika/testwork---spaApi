import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = (): AuthContextType => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem('token');
  });

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { username, password }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const token = response.data?.data?.token; 
      if (!token) {
        throw new Error('No token received');
      }
      console.log('Received token:', token);
      localStorage.setItem('token', token);
      axios.defaults.headers.common['x-auth'] = token; 
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Authentication failed", error);
      throw new Error("Authentication failed");
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['x-auth'];
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['x-auth'] = token;
    }
  }, []);

  return { isAuthenticated, login, logout };
};
