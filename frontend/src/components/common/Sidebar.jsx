import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Users, 
  Settings, 
  BarChart3,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User
} from 'lucide-react';

const Sidebar = ({ userRole = 'user' }) => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const getNavigationItems = () => {
    const baseItems = [
      { name: 'Dashboard', href: '/dashboard', icon: Home },
      { name: 'Profile', href: '/profile', icon: User },
      { name: 'Settings', href: '/settings', icon: Settings },
    ];

    if (userRole === 'admin' || userRole === 'super_admin') {
      baseItems.splice(1, 0, 
        { name: 'User Management', href: '/admin/users', icon: Users },
        { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 }
      );
    }

    return baseItems;
  };

  const navigationItems = getNavigationItems();

  return (
    <aside className={`bg-white shadow-lg h-screen fixed left-0 top-0 transition-all duration-300 ${
      collapsed ? 'w-20' : 'w-64'
    }`}>
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

      {/* Logo */}
      <div className="p-6 border-b">
        <div className="flex items-center space-x-3">
          <div className="bg-primary-100 p-2 rounded-lg">
            <Home className="h-6 w-6 text-primary-600" />
          </div>
          {!collapsed && (
            <span className="text-xl font-bold text-gray-900">Dashboard</span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center ${
                  collapsed ? 'justify-center' : 'px-3'
                } py-3 rounded-lg transition-colors ${
                  pathname === item.href || pathname.startsWith(item.href)
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
            className={`flex items-center ${
              collapsed ? 'justify-center' : 'px-3'
            } w-full py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors`}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;