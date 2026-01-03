import { UserCircle, Calendar, Activity, Settings, Bell, Shield } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const UserDashboard = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Account Created', value: '2 months ago', icon: Calendar },
    { label: 'Last Login', value: 'Today', icon: Activity },
    { label: 'Notifications', value: '3 Unread', icon: Bell },
    { label: 'Account Type', value: user?.role || 'User', icon: Shield },
  ];

  const recentActivities = [
    { id: 1, action: 'Profile Updated', time: '2 hours ago', icon: Settings },
    { id: 2, action: 'Password Changed', time: '1 week ago', icon: Shield },
    { id: 3, action: 'Account Verified', time: '1 month ago', icon: UserCircle },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user?.name}!</h1>
            <p className="mt-2 opacity-90">
              Here's what's happening with your account today
            </p>
          </div>
          <div className="bg-white/20 p-3 rounded-full">
            <UserCircle className="h-12 w-12" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold mt-2">{stat.value}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="flex items-center p-4 border rounded-lg hover:bg-gray-50">
                <div className="bg-blue-100 p-2 rounded-lg mr-4">
                  <Icon className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Profile Completion</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Basic Info</span>
              <span className="text-sm font-medium text-green-600">Complete</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Profile Picture</span>
              <span className="text-sm font-medium text-yellow-600">Pending</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">2FA Setup</span>
              <span className="text-sm font-medium text-red-600">Not Started</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Security Status</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm">Password strength: Strong</span>
            </div>
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-yellow-500 mr-2" />
              <span className="text-sm">Login activity: Normal</span>
            </div>
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-sm">2FA: Not enabled</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Account Summary</h3>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              Member since: <span className="font-medium">November 2023</span>
            </p>
            <p className="text-sm text-gray-600">
              Email status: <span className="font-medium text-green-600">Verified</span>
            </p>
            <p className="text-sm text-gray-600">
              Account type: <span className="font-medium capitalize">{user?.role || 'User'}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;