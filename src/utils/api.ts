import { User, Role, Permission } from '../types';
import { users, roles, permissions } from '../data/mock';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Users API
export const usersApi = {
  getUsers: async (): Promise<User[]> => {
    await delay(500);
    return [...users];
  },

  createUser: async (userData: Partial<User>): Promise<User> => {
    await delay(500);
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: userData.name!,
      email: userData.email!,
      role: userData.role!,
      status: userData.status || 'active',
      lastLogin: new Date().toISOString(),
    };
    users.push(newUser);
    return newUser;
  },

  updateUser: async (id: string, userData: Partial<User>): Promise<User> => {
    await delay(500);
    const index = users.findIndex(u => u.id === id);
    if (index === -1) throw new Error('User not found');
    
    const updatedUser = { ...users[index], ...userData };
    users[index] = updatedUser;
    return updatedUser;
  },

  deleteUser: async (id: string): Promise<void> => {
    await delay(500);
    const index = users.findIndex(u => u.id === id);
    if (index === -1) throw new Error('User not found');
    users.splice(index, 1);
  },
};

// Roles API
export const rolesApi = {
  getRoles: async (): Promise<Role[]> => {
    await delay(500);
    return [...roles];
  },

  createRole: async (roleData: Partial<Role>): Promise<Role> => {
    await delay(500);
    const newRole: Role = {
      id: Math.random().toString(36).substr(2, 9),
      name: roleData.name!,
      description: roleData.description!,
      permissions: roleData.permissions || [],
    };
    roles.push(newRole);
    return newRole;
  },

  updateRole: async (id: string, roleData: Partial<Role>): Promise<Role> => {
    await delay(500);
    const index = roles.findIndex(r => r.id === id);
    if (index === -1) throw new Error('Role not found');
    
    const updatedRole = { ...roles[index], ...roleData };
    roles[index] = updatedRole;
    return updatedRole;
  },

  deleteRole: async (id: string): Promise<void> => {
    await delay(500);
    const index = roles.findIndex(r => r.id === id);
    if (index === -1) throw new Error('Role not found');
    roles.splice(index, 1);
  },
};

// Permissions API
export const permissionsApi = {
  getPermissions: async (): Promise<Permission[]> => {
    await delay(500);
    return [...permissions];
  },

  createPermission: async (permissionData: Partial<Permission>): Promise<Permission> => {
    await delay(500);
    const newPermission: Permission = {
      id: Math.random().toString(36).substr(2, 9),
      name: permissionData.name!,
      description: permissionData.description!,
      module: permissionData.module!,
    };
    permissions.push(newPermission);
    return newPermission;
  },

  updatePermission: async (id: string, permissionData: Partial<Permission>): Promise<Permission> => {
    await delay(500);
    const index = permissions.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Permission not found');
    
    const updatedPermission = { ...permissions[index], ...permissionData };
    permissions[index] = updatedPermission;
    return updatedPermission;
  },

  deletePermission: async (id: string): Promise<void> => {
    await delay(500);
    const index = permissions.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Permission not found');
    permissions.splice(index, 1);
  },
};