import React from 'react';
import { Menu, Bell, ShieldCheck, Terminal } from 'lucide-react';

export default function TopNav({ onToggleMobileMenu, title = "Dashboard", subtitle = "Workforce AI Control Center" }) {
  return (
    <header className="top-nav">
      <div className="top-nav-left">
        <button 
          className="mobile-nav-toggle" 
          onClick={onToggleMobileMenu}
          aria-label="Open sidebar drawer"
        >
          <Menu size={18} />
        </button>

        <div className="nav-breadcrumbs">
          <h2 className="nav-page-title">{title}</h2>
          <span className="nav-page-subtitle">{subtitle}</span>
        </div>
      </div>

      <div className="top-nav-right">
        <div className="system-status-pill">
          <div className="status-pulse-dot" />
          <span>NODE: ATLAS ONLINE</span>
        </div>

        <div className="cyber-icon-btn" title="System Telemetry Active">
          <Bell size={16} />
          <span className="pulse-notify" />
        </div>
      </div>
    </header>
  );
}
