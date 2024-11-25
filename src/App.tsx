import React from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import UsersList from './components/UsersList';
import RolesList from './components/RolesList';
import PermissionsList from './components/PermissionsList';

function App() {
  const [activeTab, setActiveTab] = React.useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <UsersList />;
      case 'roles':
        return <RolesList />;
      case 'permissions':
        return <PermissionsList />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className= "  sm:flex min-h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;