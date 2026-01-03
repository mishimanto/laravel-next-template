import { create } from 'zustand';

const useUserStore = create((set) => ({
  users: [],
  totalUsers: 0,
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  searchQuery: '',

  setUsers: (users) => set({ users }),
  setTotalUsers: (totalUsers) => set({ totalUsers }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setCurrentPage: (currentPage) => set({ currentPage }),
  setTotalPages: (totalPages) => set({ totalPages }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),

  addUser: (user) => set((state) => ({ 
    users: [user, ...state.users],
    totalUsers: state.totalUsers + 1 
  })),

  updateUser: (userId, updatedData) => set((state) => ({
    users: state.users.map(user => 
      user.id === userId ? { ...user, ...updatedData } : user
    )
  })),

  deleteUser: (userId) => set((state) => ({
    users: state.users.filter(user => user.id !== userId),
    totalUsers: state.totalUsers - 1
  })),

  toggleUserStatus: (userId) => set((state) => ({
    users: state.users.map(user =>
      user.id === userId ? { ...user, is_active: !user.is_active } : user
    )
  })),

  clearStore: () => set({
    users: [],
    totalUsers: 0,
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    searchQuery: '',
  }),
}));

export default useUserStore;