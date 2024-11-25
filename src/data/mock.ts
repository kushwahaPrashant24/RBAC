// data.ts
import { User, Role, Permission } from './types';

export const permissions: Permission[] = [
  {
    id: '1',
    name: 'users.view',
    description: 'View users',
    module: 'Users',
  },
  {
    id: '2',
    name: 'users.create',
    description: 'Create users',
    module: 'Users',
  },
  {
    id: '3',
    name: 'users.edit',
    description: 'Edit users',
    module: 'Users',
  },
  {
    id: '4',
    name: 'roles.manage',
    description: 'Manage roles',
    module: 'Roles',
  },
];

export const roles: Role[] = [
  {
    id: '1',
    name: 'Admin',
    description: 'Full system access',
    permissions: permissions,
  },
  {
    id: '2',
    name: 'Editor',
    description: 'Can edit content',
    permissions: permissions.filter((p) => !p.name.includes('manage')),
  },
  {
    id: '3',
    name: 'Viewer',
    description: 'View only access',
    permissions: permissions.filter((p) => p.name.includes('view')),
  },
];

export const users: User[] = [
  {
    id: '1',
    name: 'Prashant Kuswaha',
    email: 'prashant@.com',
    role: roles[0], // Admin
    status: 'active',
    lastLogin: '2024-03-10T10:30:00Z',
  },
  {
    id: '2',
    name: 'Sagar Kushwaha',
    email: 'sagar@gmail.com',
    role: roles[1], // Editor
    status: 'active',
    lastLogin: '2024-03-09T15:45:00Z',
  },
  {
    id: '3',
    name: 'Tushar Kushwaha',
    email: 'tushar@gmail.com.com',
    role: roles[2], // Viewer
    status: 'inactive',
    lastLogin: '2024-03-01T08:20:00Z',
  },
];
