import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Edit3, Trash2, Calendar, Briefcase } from 'lucide-react';
import { getInitials, getAvatarGradient } from '../utils/avatarUtils';

export default function EmployeeCard({ employee, onDelete }) {
  const initials = getInitials(employee.name);
  const avatarBg = getAvatarGradient(employee.name);

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="cyber-mobile-card">
      <div className="mobile-card-header">
        <div className="emp-identity-cell">
          <div className="emp-avatar-3d" style={{ background: avatarBg }}>
            {initials}
          </div>
          <div className="emp-text-meta">
            <Link to={`/employees/${employee._id}`} className="emp-full-name">
              {employee.name}
            </Link>
            <span className="emp-email-sub">{employee.email}</span>
          </div>
        </div>
        <span className={`cyber-badge ${employee.department || 'Other'}`}>
          <span className="badge-dot" />
          {employee.department}
        </span>
      </div>

      <div className="mobile-card-meta">
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
          <Briefcase size={14} color="var(--text-muted)" />
          <span>{employee.designation}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', fontFamily: 'JetBrains Mono', color: 'var(--text-muted)' }}>
          <Calendar size={13} />
          <span>{formatDate(employee.createdAt)}</span>
        </div>
      </div>

      <div className="mobile-card-btn-row">
        <Link to={`/employees/${employee._id}`} className="btn btn-secondary btn-sm">
          <Eye size={13} /> View
        </Link>
        <Link to={`/employees/${employee._id}/edit`} className="btn btn-secondary btn-sm">
          <Edit3 size={13} /> Edit
        </Link>
        <button 
          type="button" 
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(employee._id, employee.name)}
        >
          <Trash2 size={13} /> Purge
        </button>
      </div>
    </div>
  );
}
