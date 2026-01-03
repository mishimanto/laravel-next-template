'use client';

import { useState, useEffect, useCallback } from 'react';
import axiosInstance from '@/lib/axios';
import authService from '@/lib/auth';
import { toast } from 'react-hot-toast';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post('/auth/login', {
        email,
        password,
      });

      const { token, user: userData } = response.data.data;
      authService.setToken(token);
      setUser(userData);
      
      toast.success('Login successful!');
      return { success: true, role: userData.role?.slug };
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      toast.error(message);
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post('/auth/register', userData);
      
      toast.success('Registration successful! Please login.');
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed';
      toast.error(message);
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const logout = useCallback(async () => {
    try {
      await axiosInstance.post('/auth/logout');
      authService.logout();
      setUser(null);
      toast.success('Logged out successfully!');
    } catch (err) {
      console.error('Logout error:', err);
    }
  }, []);

  const fetchUser = useCallback(async () => {
    if (!authService.isAuthenticated()) {
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.get('/auth/me');
      setUser(response.data.data);
    } catch (err) {
      if (err.response?.status === 401) {
        authService.logout();
      }
      setError(err.response?.data?.message || 'Failed to fetch user');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [fetchUser]);

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    fetchUser,
    isAuthenticated: authService.isAuthenticated(),
    isAdmin: authService.isAdmin(),
    isSuperAdmin: authService.isSuperAdmin(),
    isUser: authService.isUser(),
    getUserRole: authService.getUserRole,
  };
};