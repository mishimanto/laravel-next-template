'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import AdminLayout from '@/components/layouts/AdminLayout';
import DashboardStats from '@/components/admin/DashboardStats';
import UserTable from '@/components/admin/UserTable';
import { Users, UserCheck, Shield, Activity } from 'lucide-react';
import axiosInstance from '@/lib/axios';
import { toast } from 'react-hot-toast';

export default function AdminDashboard() {
  const router = useRouter();
  const { user, loading, isAdmin, isSuperAdmin } = useAuth();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.push('/login');
    }
  }, [loading, isAdmin, router]);

  useEffect(() => {
    if (isAdmin) {
      fetchDashboardData();
    }
  }, [isAdmin]);

  const fetchDashboardData = async () => {
  try {
    setLoadingStats(true);
    const [statsRes, usersRes] = await Promise.all([
      axiosInstance.get('/admin/dashboard/stats'),
      axiosInstance.get('/admin/users?per_page=5'),
    ]);
    
    // Handle different response structures
    const statsData = statsRes.data.data || statsRes.data || {};
    setStats(statsData);
    
    // Handle users response - could be direct array or paginated response
    let usersData = [];
    if (usersRes.data.data) {
      // Check if data is paginated response with data property
      if (usersRes.data.data.data && Array.isArray(usersRes.data.data.data)) {
        usersData = usersRes.data.data.data;
      } else if (Array.isArray(usersRes.data.data)) {
        usersData = usersRes.data.data;
      }
    } else if (Array.isArray(usersRes.data)) {
      usersData = usersRes.data;
    }
    
    setUsers(usersData);
  } catch (error) {
    console.error('Dashboard error:', error.response?.data || error.message);
    toast.error('Failed to fetch dashboard data');
    
    // Set empty arrays as fallback
    setUsers([]);
  } finally {
    setLoadingStats(false);
  }
};

  if (loading || loadingStats) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold">Welcome back, {user?.name}!</h1>
          <p className="mt-2 opacity-90">
            {isSuperAdmin ? 'Super Admin' : 'Admin'} Dashboard • Last login: Today
          </p>
        </div>

        {/* Stats Grid */}
        <DashboardStats stats={stats} />

        {/* Recent Users */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Recent Users</h2>
              <p className="text-gray-600">Latest registered users in the system</p>
            </div>
            <button
              onClick={() => router.push('/admin/users')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              View All
            </button>
          </div>
          <UserTable users={users?.slice(0, 5) || []} />
        </div>

        {/* Quick Actions */}
        {isSuperAdmin && (
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => router.push('/admin/users')}
                className="p-4 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition group"
              >
                <Users className="h-8 w-8 text-blue-600 mb-2 group-hover:scale-110 transition" />
                <h3 className="font-medium">Manage Users</h3>
                <p className="text-sm text-gray-600">Add, edit, or remove users</p>
              </button>
              
              <button
                onClick={() => router.push('/super-admin/roles')}
                className="p-4 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition group"
              >
                <Shield className="h-8 w-8 text-blue-600 mb-2 group-hover:scale-110 transition" />
                <h3 className="font-medium">Role Management</h3>
                <p className="text-sm text-gray-600">Configure roles & permissions</p>
              </button>
              
              <button
                className="p-4 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition group"
              >
                <Activity className="h-8 w-8 text-blue-600 mb-2 group-hover:scale-110 transition" />
                <h3 className="font-medium">System Analytics</h3>
                <p className="text-sm text-gray-600">View system performance</p>
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}