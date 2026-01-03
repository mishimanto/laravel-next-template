'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { ArrowRight, Shield, Users, Zap } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, getUserRole, loading } = useAuth();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      const role = getUserRole();
      switch (role) {
        case 'super_admin':
        case 'admin':
          router.push('/admin/dashboard');
          break;
        case 'user':
          router.push('/user/dashboard');
          break;
        default:
          router.push('/login');
      }
    }
  }, [isAuthenticated, loading, getUserRole, router]);

  if (loading || isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Shield className="h-8 w-8 text-primary-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">AuthTemplate</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/login')}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign In
              </button>
              <button
                onClick={() => router.push('/register')}
                className="bg-primary-600 text-white hover:bg-primary-700 px-4 py-2 rounded-md text-sm font-medium"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Modern Authentication</span>
            <span className="block text-primary-600">Template System</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            A complete, production-ready authentication system with role-based access control, 
            JWT authentication, Redis caching, and beautiful dashboards.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <button
                onClick={() => router.push('/register')}
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <button
                onClick={() => router.push('/login')}
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
              >
                View Demo
              </button>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="pt-6">
              <div className="flow-root bg-white rounded-lg px-6 pb-8">
                <div className="-mt-6">
                  <div className="inline-flex items-center justify-center p-3 bg-primary-500 rounded-md shadow-lg">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                    Role-Based Access Control
                  </h3>
                  <p className="mt-5 text-base text-gray-500">
                    Super Admin, Admin, and User roles with granular permissions. 
                    Each role has separate dashboards and capabilities.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flow-root bg-white rounded-lg px-6 pb-8">
                <div className="-mt-6">
                  <div className="inline-flex items-center justify-center p-3 bg-green-500 rounded-md shadow-lg">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                    High Performance
                  </h3>
                  <p className="mt-5 text-base text-gray-500">
                    Redis caching for blazing fast performance. JWT authentication 
                    with automatic token refresh for seamless user experience.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flow-root bg-white rounded-lg px-6 pb-8">
                <div className="-mt-6">
                  <div className="inline-flex items-center justify-center p-3 bg-purple-500 rounded-md shadow-lg">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                    User Management
                  </h3>
                  <p className="mt-5 text-base text-gray-500">
                    Complete user management system with activation/deactivation, 
                    role assignment, and search functionality for administrators.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="mt-16 bg-primary-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center">Try Demo Accounts</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900">Super Admin</h3>
              <p className="mt-2 text-gray-600">Email: superadmin@example.com</p>
              <p className="text-gray-600">Password: password</p>
              <p className="mt-3 text-sm text-gray-500">Full system access</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900">Admin</h3>
              <p className="mt-2 text-gray-600">Email: admin@example.com</p>
              <p className="text-gray-600">Password: password</p>
              <p className="mt-3 text-sm text-gray-500">User management access</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900">User</h3>
              <p className="mt-2 text-gray-600">Email: user@example.com</p>
              <p className="text-gray-600">Password: password</p>
              <p className="mt-3 text-sm text-gray-500">Basic user access</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Shield className="h-8 w-8 text-primary-600 mx-auto" />
            <p className="mt-4 text-base text-gray-500">
              &copy; {new Date().getFullYear()} Auth Template System. All rights reserved.
            </p>
            <p className="mt-2 text-sm text-gray-400">
              Built with Laravel, Next.js, JWT, Redis, and Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}