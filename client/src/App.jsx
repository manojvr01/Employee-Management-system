import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import Dashboard from './pages/Dashboard';
import AddEmployee from './pages/AddEmployee';
import EditEmployee from './pages/EditEmployee';
import EmployeeDetailsPage from './pages/EmployeeDetailsPage';
import { ArrowLeft, AlertOctagon } from 'lucide-react';

const NotFound = () => (
  <div className="cyber-empty-panel" style={{ maxWidth: 480, margin: '60px auto' }}>
    <div className="empty-geometric-hex" style={{ color: 'var(--accent-rose)', borderColor: 'rgba(244, 63, 94, 0.4)' }}>
      <AlertOctagon size={28} />
    </div>
    <h2 className="empty-head-text">404 // INVALID ROUTE NODE</h2>
    <p className="empty-sub-text">
      The requested route coordinates do not exist in the neural registry.
    </p>
    <Link to="/" className="btn btn-primary btn-sm">
      <ArrowLeft size={15} /> Return to Dashboard
    </Link>
  </div>
);

// Layout wrapper to bind page metadata
function MainLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const getPageMeta = () => {
    const path = location.pathname;
    if (path === '/') return { title: 'Dashboard // Neural Matrix', subtitle: 'Real-time workforce intelligence telemetry' };
    if (path === '/employees/new') return { title: 'Register Staff Node', subtitle: 'Deploy new workforce entity into MongoDB Atlas' };
    if (path.includes('/edit')) return { title: 'Modify Staff Record', subtitle: 'Commit parameter updates to cluster' };
    if (path.startsWith('/employees/')) return { title: 'Employee Dossier', subtitle: 'Synchronized workforce identity metadata' };
    return { title: 'EMPLOYEE OS', subtitle: 'Workforce Intelligence Control Center' };
  };

  const meta = getPageMeta();

  return (
    <div className="app-layout">
      {/* Futuristic Sidebar */}
      <Sidebar 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
      />

      {/* Main Command Column */}
      <div className="main-wrapper">
        <TopNav 
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
          title={meta.title}
          subtitle={meta.subtitle}
        />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employees/new" element={<AddEmployee />} />
          <Route path="/employees/:id" element={<EmployeeDetailsPage />} />
          <Route path="/employees/:id/edit" element={<EditEmployee />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
