import React from 'react';
import { User, Role } from '../types';
import { usersApi, rolesApi } from '../utils/api';
import { Users, Shield, Lock, Activity, Loader2 } from 'lucide-react';
import { useAsync } from '../hooks/useAsync';

export default function Dashboard() {
  const { data: users, loading: loadingUsers } = useAsync<User[]>();
  const { data: roles, loading: loadingRoles } = useAsync<Role[]>();

  React.useEffect(() => {
    usersApi.getUsers();
    rolesApi.getRoles();
  }, []);

  const stats = [
    {
      title: 'Total Users',
      value: users?.length ?? 0,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Active Roles',
      value: roles?.length ?? 0,
      icon: Shield,
      color: 'bg-green-500',
    },
    {
      title: 'Permissions',
      value: roles?.reduce(
        (acc, role) => acc + role.permissions.length,
        0
      ) ?? 0,
      icon: Lock,
      color: 'bg-purple-500',
    },
    {
      title: 'Active Sessions',
      value: users?.filter((u) => u.status === 'active').length ?? 0,
      icon: Activity,
      color: 'bg-yellow-500',
    },
  ];

  if (loadingUsers || loadingRoles) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Dashboard</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-500">{stat.title}</p>
                <p className="text-lg sm:text-2xl font-semibold mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-2 sm:p-3 rounded-full`}>
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {users?.slice(0, 5).map((user) => (
              <div key={user.id} className="flex items-center space-x-4">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500">
                    Last login: {new Date(user.lastLogin).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Role Distribution</h3>
          <div className="space-y-4">
            {roles?.map((role) => (
              <div key={role.id}>
                <div className="flex justify-between text-xs sm:text-sm mb-1">
                  <span>{role.name}</span>
                  <span className="text-gray-500">
                    {users?.filter((u) => u.role.id === role.id).length} users
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{
                      width: `${
                        ((users?.filter((u) => u.role.id === role.id).length ?? 0) /
                          (users?.length ?? 1)) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
