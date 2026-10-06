import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Edit3, Trash2 } from 'lucide-react';
import { getInitials, getAvatarGradient } from '../utils/avatarUtils';

export default function EmployeeTable({ employees = [], onDelete }) {
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
    <div className="table-glass-container">
      <table className="cyber-table">
        <thead>
          <tr>
            <th>Employee Identity</th>
            <th>Department Node</th>
            <th>Role / Designation</th>
            <th>Enrolled Date</th>
            <th style={{ textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => {
            const initials = getInitials(emp.name);
            const avatarBg = getAvatarGradient(emp.name);

            return (
              <tr key={emp._id}>
                {/* Employee Identity Cell */}
                <td>
                  <div className="emp-identity-cell">
                    <div 
                      className="emp-avatar-3d" 
                      style={{ background: avatarBg }}
                      title={emp.name}
                    >
                      {initials}
                    </div>
                    <div className="emp-text-meta">
                      <Link to={`/employees/${emp._id}`} className="emp-full-name">
                        {emp.name}
                      </Link>
                      <span className="emp-email-sub">{emp.email}</span>
                    </div>
                  </div>
                </td>

                {/* Department High-Contrast Badge */}
                <td>
                  <span className={`cyber-badge ${emp.department || 'Other'}`}>
                    <span className="badge-dot" />
                    {emp.department}
                  </span>
                </td>

                {/* Designation */}
                <td>
                  <span className="role-cell">{emp.designation}</span>
                </td>

                {/* Enrolled Date */}
                <td>
                  <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {formatDate(emp.createdAt)}
                  </span>
                </td>

                {/* Actions */}
                <td>
                  <div className="table-action-btns" style={{ justifyContent: 'flex-end' }}>
                    <Link 
                      to={`/employees/${emp._id}`} 
                      className="cyber-action-icon view" 
                      title="Inspect dossier profile"
                      aria-label={`View ${emp.name}`}
                    >
                      <Eye size={15} />
                    </Link>
                    <Link 
                      to={`/employees/${emp._id}/edit`} 
                      className="cyber-action-icon edit" 
                      title="Modify employee record"
                      aria-label={`Edit ${emp.name}`}
                    >
                      <Edit3 size={15} />
                    </Link>
                    <button 
                      type="button"
                      className="cyber-action-icon delete" 
                      onClick={() => onDelete(emp._id, emp.name)}
                      title="Purge employee record"
                      aria-label={`Delete ${emp.name}`}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
