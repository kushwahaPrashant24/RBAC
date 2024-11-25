import { useState } from 'react';
import { Users, Shield, Lock, Layout, Menu, X } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', icon: Layout, label: 'Dashboard' },
    { id: 'users', icon: Users, label: 'Users' },
    { id: 'roles', icon: Shield, label: 'Roles' },
    { id: 'permissions', icon: Lock, label: 'Permissions' },
  ];

  return (
    <>
      {/* Mobile Hamburger Menu */}
      <div className="md:hidden flex items-center justify-between bg-gray-900 p-4">
        <div className="flex items-center space-x-2">
          <Shield className="w-6 h-6 text-indigo-500" />
          <span className="text-white text-lg font-bold">RBAC Admin</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="text-white"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar for Desktop and Mobile */}
      <div
        className={`fixed md:static z-50 md:z-auto inset-y-0 left-0 transform bg-gray-900 transition-transform duration-300 md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64 min-h-screen p-4`}
      >
        <div className="flex items-center space-x-2 mb-8 px-4">
          <Shield className="w-8 h-8 text-indigo-500" />
          <span className="text-white text-xl font-bold">RBAC Admin</span>
        </div>
        <nav>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onTabChange(item.id);
                setSidebarOpen(false); // Close sidebar on mobile after selection
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 ${
                activeTab === item.id
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
