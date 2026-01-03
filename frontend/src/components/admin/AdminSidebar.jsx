import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  Shield,
  ChevronLeft,
  ChevronRight,
  LogOut,
  UserCircle,
  BarChart3
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, isSuperAdmin, logout } = useAuth();

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: LayoutDashboard,
      current: pathname === '/admin/dashboard',
    },
    {
      name: 'User Management',
      href: '/admin/users',
      icon: Users,
      current: pathname.startsWith('/admin/users'),
    },
    {
      name: 'Analytics',
      href: '/admin/analytics',
      icon: BarChart3,
      current: pathname === '/admin/analytics',
    },
    ...(isSuperAdmin ? [{
      name: 'Role Management',
      href: '/super-admin/roles',
      icon: Shield,
      current: pathname.startsWith('/super-admin/roles'),
    }] : []),
    {
      name: 'Settings',
      href: '/admin/settings',
      icon: Settings,
      current: pathname === '/admin/settings',
    },
  ];

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <aside className={`bg-white shadow-lg fixed left-0 top-0 h-screen z-40 transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'} mt-16`}>
      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-6 bg-white border border-gray-200 rounded-full p-1 shadow-md hover:bg-gray-50"
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </button>

      {/* User Info */}
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="bg-primary-100 p-2 rounded-full">
            <UserCircle className="h-8 w-8 text-primary-600" />
          </div>
          {!collapsed && (
            <div>
              <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
              <p className="text-xs text-gray-500">{isSuperAdmin ? 'Super Admin' : 'Admin'}</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-2">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center ${collapsed ? 'justify-center' : 'px-3'} py-2 rounded-lg transition-colors ${
                  item.current
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {!collapsed && <span className="ml-3">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>

        {/* Logout Button */}
        <div className="mt-8 pt-4 border-t">
          <button
            onClick={handleLogout}
            className={`flex items-center ${collapsed ? 'justify-center' : 'px-3'} w-full py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors`}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default AdminSidebar;