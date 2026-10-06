import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Edit3, 
  Trash2, 
  Mail, 
  Building, 
  Briefcase, 
  Calendar, 
  Clock, 
  ShieldCheck,
  Cpu 
} from 'lucide-react';
import { getInitials, getAvatarGradient } from '../utils/avatarUtils';

export default function EmployeeDetails({ employee, onDelete }) {
  const initials = getInitials(employee.name);
  const avatarBg = getAvatarGradient(employee.name);

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="profile-dossier-wrap">
      {/* Return button */}
      <div>
        <Link to="/" className="btn btn-secondary btn-sm" style={{ display: 'inline-flex' }}>
          <ArrowLeft size={15} /> Return to Command Center
        </Link>
      </div>

      {/* Dossier Hero Header */}
      <div className="dossier-hero">
        <div className="dossier-banner-3d" />
        <div className="dossier-body">
          <div className="dossier-id-block">
            <div className="dossier-avatar-large" style={{ background: avatarBg }}>
              {initials}
            </div>
            <div className="dossier-titles">
              <h1 className="dossier-name">{employee.name}</h1>
              <p className="dossier-role">{employee.designation}</p>
              <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className={`cyber-badge ${employee.department || 'Other'}`}>
                  <span className="badge-dot" />
                  {employee.department}
                </span>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.6875rem', color: '#34d399', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <ShieldCheck size={14} /> LIVE IN MONGODB
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Link to={`/employees/${employee._id}/edit`} className="btn btn-primary">
              <Edit3 size={15} /> Edit Record
            </Link>
            <button 
              type="button" 
              className="btn btn-danger" 
              onClick={() => onDelete(employee._id, employee.name)}
            >
              <Trash2 size={15} /> Purge Record
            </button>
          </div>
        </div>
      </div>

      {/* Dossier Info Cards */}
      <div className="dossier-grid">
        {/* Card 1: Work & Organizational Metadata */}
        <div className="dossier-card">
          <h3 className="dossier-card-title">
            <Briefcase size={16} color="var(--text-violet)" />
            <span>Organizational Assignment</span>
          </h3>
          <div className="dossier-field-row">
            <span className="dossier-field-label">Assigned Department</span>
            <span className="dossier-field-val">{employee.department}</span>
          </div>
          <div className="dossier-field-row">
            <span className="dossier-field-label">Official Role / Designation</span>
            <span className="dossier-field-val">{employee.designation}</span>
          </div>
          <div className="dossier-field-row">
            <span className="dossier-field-label">Security State</span>
            <span className="dossier-field-val" style={{ color: '#34d399', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Cpu size={14} /> Active Node Synchronized
            </span>
          </div>
        </div>

        {/* Card 2: Contact & System Timestamps */}
        <div className="dossier-card">
          <h3 className="dossier-card-title">
            <Mail size={16} color="var(--text-cyan)" />
            <span>Contact & Timestamps</span>
          </h3>
          <div className="dossier-field-row">
            <span className="dossier-field-label">Primary Email Address</span>
            <span className="dossier-field-val">{employee.email}</span>
          </div>
          <div className="dossier-field-row">
            <span className="dossier-field-label">Record Creation Date</span>
            <span className="dossier-field-val" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Calendar size={13} color="var(--text-muted)" />
              {formatDate(employee.createdAt)}
            </span>
          </div>
          <div className="dossier-field-row">
            <span className="dossier-field-label">Last Synchronization Timestamp</span>
            <span className="dossier-field-val" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Clock size={13} color="var(--text-muted)" />
              {formatDate(employee.updatedAt)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
