export const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    REFRESH: '/auth/refresh',
  },
  ADMIN: {
    DASHBOARD: '/admin/dashboard/stats',
    USERS: '/admin/users',
    USER_TOGGLE: (id) => `/admin/users/${id}/toggle-status`,
  },
  USER: {
    DASHBOARD: '/user/dashboard',
  },
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  ADMIN_DASHBOARD: '/admin/dashboard',
  USER_DASHBOARD: '/user/dashboard',
  ADMIN_USERS: '/admin/users',
};

export const USER_ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  USER: 'user',
};

export const TOAST_DURATION = {
  SUCCESS: 3000,
  ERROR: 4000,
  INFO: 5000,
};

export const LOCAL_STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
};