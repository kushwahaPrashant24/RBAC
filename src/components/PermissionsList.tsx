import React from 'react';
import { permissions } from '../data/mock';
import { Lock, Edit, Trash2 } from 'lucide-react';

export default function PermissionsList() {
  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.module]) {
      acc[permission.module] = [];
    }
    acc[permission.module].push(permission);
    return acc;
  }, {} as Record<string, typeof permissions>);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Permissions Management</h2>
        <button
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Lock className="w-4 h-4 mr-2" />
          Create Permission
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(groupedPermissions).map(([module, modulePermissions]) => (
          <div key={module} className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">{module}</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {modulePermissions.map((permission) => (
                  <div
                    key={permission.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        {permission.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {permission.description}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-indigo-600">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}