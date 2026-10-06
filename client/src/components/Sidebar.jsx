import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  Users, 
  LayoutDashboard, 
  UserPlus, 
  Building2, 
  BarChart3, 
  Settings, 
  Network,
  X 
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose, totalEmployees = 0 }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleAnchorClick = (e, sectionId) => {
    e.preventDefault();
    onClose();

    if (location.pathname === '/') {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${sectionId}`);
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(10px)',
            zIndex: 95,
          }}
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        {/* Brand Header */}
        <div className="sidebar-brand">
          <div className="brand-icon-3d">
            <Users size={19} strokeWidth={2.5} />
          </div>
          <div className="brand-info">
            <span className="brand-title">EMPLOYEE OS</span>
            <span className="brand-version">PRO EDITION // v2.0</span>
          </div>
          {isOpen && (
            <button 
              type="button"
              className="cyber-icon-btn" 
              onClick={onClose} 
              style={{ marginLeft: 'auto' }}
              aria-label="Close sidebar"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <div className="nav-section-label">Core Platform</div>

          <NavLink 
            to="/" 
            end
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            onClick={onClose}
          >
            <div className="nav-item-content">
              <LayoutDashboard size={16} className="nav-icon" />
              <span>Dashboard</span>
            </div>
            <span className="nav-counter">{totalEmployees}</span>
          </NavLink>

          <NavLink 
            to="/employees/new" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            onClick={onClose}
          >
            <div className="nav-item-content">
              <UserPlus size={16} className="nav-icon" />
              <span>+ Add Employee</span>
            </div>
          </NavLink>

          <div className="nav-section-label" style={{ marginTop: '14px' }}>Workforce Telemetry</div>

          <a 
            href="#employees-table-section" 
            className="nav-item"
            onClick={(e) => handleAnchorClick(e, 'employees-table-section')}
          >
            <div className="nav-item-content">
              <Users size={16} className="nav-icon" />
              <span>Staff Directory</span>
            </div>
          </a>

          <a 
            href="#constellation-section" 
            className="nav-item"
            onClick={(e) => handleAnchorClick(e, 'constellation-section')}
          >
            <div className="nav-item-content">
              <Network size={16} className="nav-icon" />
              <span>Neural Constellation</span>
            </div>
          </a>

          <a 
            href="#analytics-section" 
            className="nav-item"
            onClick={(e) => handleAnchorClick(e, 'analytics-section')}
          >
            <div className="nav-item-content">
              <BarChart3 size={16} className="nav-icon" />
              <span>Analytics & Metrics</span>
            </div>
          </a>

          <div className="nav-section-label" style={{ marginTop: '14px' }}>System</div>
          <div className="nav-item" style={{ opacity: 0.45, cursor: 'default' }}>
            <div className="nav-item-content">
              <Settings size={16} className="nav-icon" />
              <span>System Settings</span>
            </div>
            <span className="nav-counter" style={{ fontSize: '0.6rem' }}>ONLINE</span>
          </div>
        </nav>

        {/* Sidebar Footer - Admin Telemetry */}
        <div className="sidebar-footer">
          <div className="user-telemetry-box">
            <div className="cyber-avatar-wrap">
              <span>AD</span>
              <div className="cyber-dot-online" />
            </div>
            <div className="user-telemetry-info">
              <span className="telemetry-user">Admin Workspace</span>
              <span className="telemetry-status">ATLAS // CONNECTED</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
