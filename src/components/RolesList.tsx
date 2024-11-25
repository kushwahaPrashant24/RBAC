import React from 'react';
import { Role } from '../types';
import { rolesApi } from '../utils/api';
import { Shield, Edit, Trash2, Loader2 } from 'lucide-react';
import RoleForm from './roles/RoleForm';
import { useAsync } from '../hooks/useAsync';

export default function RolesList() {
  const { data: roles, loading, error, execute } = useAsync<Role[]>();
  const [selectedRole, setSelectedRole] = React.useState<Role | null>(null);
  const [showForm, setShowForm] = React.useState(false);

  React.useEffect(() => {
    execute(rolesApi.getRoles());
  }, [execute]);

  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
    setShowForm(true);
  };

  const handleSubmit = async (roleData: Partial<Role>) => {
    try {
      if (selectedRole) {
        await rolesApi.updateRole(selectedRole.id, roleData);
      } else {
        await rolesApi.createRole(roleData);
      }
      await execute(rolesApi.getRoles());
      setShowForm(false);
      setSelectedRole(null);
    } catch (err) {
      console.error('Failed to save role:', err);
    }
  };

  const handleDeleteRole = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      try {
        await rolesApi.deleteRole(id);
        await execute(rolesApi.getRoles());
      } catch (err) {
        console.error('Failed to delete role:', err);
      }
    }
  };

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-600">Error loading roles: {error.message}</p>
        <button
          onClick={() => execute(rolesApi.getRoles())}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Roles Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          disabled={loading}
        >
          <Shield className="w-4 h-4 mr-2" />
          Create Role
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles?.map((role) => (
            <div
              key={role.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {role.name}
                  </h3>
                  <p className="text-sm text-gray-500">{role.description}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditRole(role)}
                    className="text-gray-400 hover:text-indigo-600"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteRole(role.id)}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Permissions ({role.permissions.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {role.permissions.map((permission) => (
                    <span
                      key={permission.id}
                      className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700"
                    >
                      {permission.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <RoleForm
          role={selectedRole || undefined}
          onClose={() => {
            setShowForm(false);
            setSelectedRole(null);
          }}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}