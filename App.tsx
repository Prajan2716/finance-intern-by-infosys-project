
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  ShieldCheck, 
  Camera, 
  CreditCard,
  User as UserIcon,
  LogOut,
  Bell,
  Search,
  Menu,
  X
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import ClaimsAssistant from './components/ClaimsAssistant';
import RiskEstimator from './components/RiskEstimator';
import PolicyCenter from './components/PolicyCenter';
import PaymentPage from './components/PaymentPage';
import ProfilePage from './components/ProfilePage';
import Auth from './components/Auth';
import { User } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'chat' | 'risk' | 'policies' | 'payment' | 'profile'>('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const savedSession = localStorage.getItem('insureai_session');
    if (savedSession) {
      setUser(JSON.parse(savedSession));
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('insureai_session', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('insureai_session');
  };

  const updateProfile = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('insureai_session', JSON.stringify(updatedUser));
    localStorage.setItem('insureai_user', JSON.stringify(updatedUser));
  };

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  const navigation = [
    { id: 'dashboard', name: 'Overview', icon: LayoutDashboard },
    { id: 'policies', name: 'Policies', icon: ShieldCheck },
    { id: 'chat', name: 'Claims AI', icon: MessageSquare },
    { id: 'risk', name: 'Damage Scan', icon: Camera },
    { id: 'payment', name: 'Payments', icon: CreditCard },
    { id: 'profile', name: 'My Profile', icon: UserIcon },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <aside className={`
        ${isSidebarOpen ? 'w-64' : 'w-20'} 
        transition-all duration-300 ease-in-out
        bg-white border-r border-slate-200 flex flex-col z-50
      `}>
        <div className="p-6 flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <ShieldCheck className="text-white w-6 h-6" />
          </div>
          {isSidebarOpen && <span className="font-bold text-xl tracking-tight text-slate-800">InsureAI</span>}
        </div>

        <nav className="flex-1 mt-6 px-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`
                  w-full flex items-center gap-3 p-3 rounded-xl transition-colors
                  ${activeTab === item.id 
                    ? 'bg-indigo-50 text-indigo-700 font-semibold' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}
                `}
              >
                <Icon size={20} />
                {isSidebarOpen && <span>{item.name}</span>}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 text-slate-500 hover:text-rose-600 transition-colors"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between">
          <button 
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-slate-50 rounded-lg text-slate-500"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Policy or Claim ID..." 
                className="bg-slate-50 border-none rounded-full pl-10 pr-4 py-2 text-sm w-64 focus:ring-2 focus:ring-indigo-100 transition-all outline-none"
              />
            </div>
            <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-full">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <button 
              onClick={() => setActiveTab('profile')}
              className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200"
            >
              {user.name.charAt(0)}
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {activeTab === 'dashboard' && <Dashboard user={user} />}
          {activeTab === 'chat' && <ClaimsAssistant />}
          {activeTab === 'risk' && <RiskEstimator />}
          {activeTab === 'policies' && <PolicyCenter />}
          {activeTab === 'payment' && <PaymentPage user={user} />}
          {activeTab === 'profile' && <ProfilePage user={user} onUpdate={updateProfile} />}
        </div>
      </main>
    </div>
  );
};

export default App;
