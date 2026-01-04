
import React, { useState, useEffect } from 'react';
import { UserRole, User } from './types';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import StudentDashboard from './screens/StudentDashboard';
import TeacherDashboard from './screens/TeacherDashboard';
import AdminDashboard from './screens/AdminDashboard';
import ParentDashboard from './screens/ParentDashboard';
import RewardsPage from './screens/RewardsPage';
import AIInsightsPage from './screens/AIInsightsPage';
import Onboarding from './screens/Onboarding';
import AssignmentsPage from './screens/AssignmentsPage';
import ExamPrepPage from './screens/ExamPrepPage';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isOnboarding, setIsOnboarding] = useState(true);

  // Initial setup
  useEffect(() => {
    const savedUser = localStorage.getItem('tingstudip_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsOnboarding(false);
    }
  }, []);

  const handleOnboardingComplete = (user: User) => {
    setCurrentUser(user);
    setIsOnboarding(false);
    localStorage.setItem('tingstudip_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    localStorage.removeItem('tingstudip_user');
    setCurrentUser(null);
    setIsOnboarding(true);
  };

  if (isOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  const renderScreen = () => {
    if (activeTab === 'rewards') return <RewardsPage user={currentUser!} />;
    if (activeTab === 'insights') return <AIInsightsPage user={currentUser!} />;
    if (activeTab === 'assignments') return <AssignmentsPage user={currentUser!} />;
    if (activeTab === 'exams') return <ExamPrepPage user={currentUser!} />;

    switch (currentUser?.role) {
      case UserRole.STUDENT:
        return <StudentDashboard />;
      case UserRole.TEACHER:
        return <TeacherDashboard />;
      case UserRole.ADMIN:
        return <AdminDashboard />;
      case UserRole.PARENT:
        return <ParentDashboard />;
      default:
        return <StudentDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-[#0a0a1a] text-slate-200 overflow-hidden font-inter selection:bg-cyan-500/30">
      {/* Decorative Background Elements */}
      <div className="fixed top-[-10%] left-[-5%] w-1/3 h-[50%] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-5%] w-1/3 h-[50%] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      <Sidebar 
        role={currentUser?.role || UserRole.STUDENT} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={handleLogout}
      />
      
      <main className="flex-1 flex flex-col overflow-hidden relative z-10">
        <Navbar user={currentUser!} setActiveTab={setActiveTab} />
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 scroll-smooth">
          {renderScreen()}
        </div>
      </main>
    </div>
  );
};

export default App;
