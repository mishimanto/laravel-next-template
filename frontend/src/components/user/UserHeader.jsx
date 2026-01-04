import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, Search, Menu, User, UserIcon, ChevronDown  } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const UserHeader = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="bg-white shadow-sm fixed top-0 right-0 left-0 z-50 h-16">
      <div className="px-6 h-full flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <button className="lg:hidden p-2">
            <Menu className="h-5 w-5" />
          </button>
          <div className="hidden lg:flex items-center space-x-2">
            <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
              <UserIcon className="h-5 w-5 text-blue-600" />
            </div>
            <span className="text-lg font-semibold text-gray-800">User Dashboard</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Search for larger screens */}
          <div className="hidden md:block relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-gray-900">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile */}
          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <div className="text-right hidden md:block">
                <p className="text-md  text-gray-800 font-bold">{user?.name}</p>
              </div>

              {/* Dropdown Icon */}
              <ChevronDown
                className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                  open ? 'rotate-180' : ''
                }`}
              />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border z-50">
                <button
                  onClick={() => {
                    setOpen(false);
                    router.push('/admin/profile');
                  }}
                  className="w-full text-left  text-gray-500 px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Profile
                </button>

                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;