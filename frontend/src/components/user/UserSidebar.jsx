import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  User, 
  Settings, 
  Bell,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Home,
  Shield
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const UserSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const navigation = [
    {
      name: 'Dashboard',
      href: '/user/dashboard',
      icon: LayoutDashboard,
      current: pathname === '/user/dashboard',
    },
    {
      name: 'Profile',
      href: '/user/profile',
      icon: User,
      current: pathname === '/user/profile',
    },
    {
      name: 'Notifications',
      href: '/user/notifications',
      icon: Bell,
      current: pathname === '/user/notifications',
    },
    {
      name: 'Settings',
      href: '/user/settings',
      icon: Settings,
      current: pathname === '/user/settings',
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
          <div className="bg-blue-100 p-2 rounded-full">
            <User className="h-8 w-8 text-blue-600" />
          </div>
          {!collapsed && (
            <div>
              <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
              <p className="text-xs text-gray-500">Standard User</p>
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
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {!collapsed && <span className="ml-3">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>

        {/* Home Button */}
        <div className="mt-6">
          <Link
            href="/"
            className={`flex items-center ${collapsed ? 'justify-center' : 'px-3'} py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors`}
          >
            <Home className="h-5 w-5" />
            {!collapsed && <span className="ml-3">Home</span>}
          </Link>
        </div>

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

export default UserSidebar;