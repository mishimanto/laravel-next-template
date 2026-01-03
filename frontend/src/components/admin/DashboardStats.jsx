import { Users, UserCheck, Shield, Activity } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color, change }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold mt-2">{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change >= 0 ? '↗' : '↘'} {Math.abs(change)}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );
};

const DashboardStats = ({ stats }) => {
  const statItems = [
    {
      title: 'Total Users',
      value: stats?.total_users || 0,
      icon: Users,
      color: 'bg-blue-500',
      change: +12,
    },
    {
      title: 'Active Users',
      value: stats?.active_users || 0,
      icon: UserCheck,
      color: 'bg-green-500',
      change: +8,
    },
    {
      title: 'Administrators',
      value: stats?.total_admins || 0,
      icon: Shield,
      color: 'bg-purple-500',
      change: +2,
    },
    {
      title: 'Total Roles',
      value: stats?.total_roles || 0,
      icon: Activity,
      color: 'bg-orange-500',
      change: 0,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statItems.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default DashboardStats;