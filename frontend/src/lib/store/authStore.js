import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: true,

      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setIsLoading: (isLoading) => set({ isLoading }),

      login: (userData, token) => {
        localStorage.setItem('access_token', token);
        set({ 
          user: userData, 
          token: token, 
          isAuthenticated: true,
          isLoading: false 
        });
      },

      logout: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        set({ 
          user: null, 
          token: null, 
          isAuthenticated: false,
          isLoading: false 
        });
      },

      updateUser: (userData) => {
        set({ user: { ...get().user, ...userData } });
      },

      checkAuth: () => {
        const token = localStorage.getItem('access_token');
        if (token) {
          set({ isAuthenticated: true, token });
        } else {
          set({ isAuthenticated: false, token: null });
        }
        set({ isLoading: false });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;