import React from 'react';
import { Users, Building, Award, Cpu } from 'lucide-react';

export default function KPICards({ employees = [] }) {
  const total = employees.length;

  // Real calculations
  const deptCounts = {};
  employees.forEach((emp) => {
    const d = emp.department || 'Other';
    deptCounts[d] = (deptCounts[d] || 0) + 1;
  });

  const uniqueDepartments = Object.keys(deptCounts).length;

  // Find Top Department dynamically
  let topDept = 'None';
  let topDeptCount = 0;
  Object.keys(deptCounts).forEach((dept) => {
    if (deptCounts[dept] > topDeptCount) {
      topDept = dept;
      topDeptCount = deptCounts[dept];
    }
  });

  const topDeptPercent = total > 0 ? Math.round((topDeptCount / total) * 100) : 0;

  return (
    <div className="kpi-grid">
      {/* 1. TOTAL EMPLOYEES */}
      <div className="kpi-card-3d violet">
        <div className="kpi-top-row">
          <div className="kpi-icon-square violet">
            <Users size={20} />
          </div>
          <span className="kpi-code-tag">TELEMETRY_01</span>
        </div>
        <div>
          <div className="kpi-label-tech">Total Employees</div>
          <div className="kpi-metric-number">{total}</div>
          <div className="kpi-secondary-info">
            <span style={{ color: 'var(--text-violet)', fontWeight: 600 }}>100% Verified</span> in MongoDB Atlas
          </div>
        </div>
      </div>

      {/* 2. DEPARTMENTS */}
      <div className="kpi-card-3d cyan">
        <div className="kpi-top-row">
          <div className="kpi-icon-square cyan">
            <Building size={20} />
          </div>
          <span className="kpi-code-tag">TELEMETRY_02</span>
        </div>
        <div>
          <div className="kpi-label-tech">Active Departments</div>
          <div className="kpi-metric-number">{uniqueDepartments}</div>
          <div className="kpi-secondary-info">
            <span style={{ color: 'var(--text-cyan)', fontWeight: 600 }}>Active Teams</span> deployed
          </div>
        </div>
      </div>

      {/* 3. TOP DEPARTMENT */}
      <div className="kpi-card-3d emerald">
        <div className="kpi-top-row">
          <div className="kpi-icon-square emerald">
            <Award size={20} />
          </div>
          <span className="kpi-code-tag">TELEMETRY_03</span>
        </div>
        <div>
          <div className="kpi-label-tech">Top Department</div>
          <div className="kpi-metric-number" style={{ fontSize: '1.6rem', lineHeight: 1.2, marginTop: 4, marginBottom: 8 }}>
            {topDept}
          </div>
          <div className="kpi-secondary-info">
            <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>{topDeptCount} staff</span> ({topDeptPercent}% share)
          </div>
        </div>
      </div>

      {/* 4. ACTIVE WORKFORCE */}
      <div className="kpi-card-3d amber">
        <div className="kpi-top-row">
          <div className="kpi-icon-square amber">
            <Cpu size={20} />
          </div>
          <span className="kpi-code-tag">TELEMETRY_04</span>
        </div>
        <div>
          <div className="kpi-label-tech">Active Workforce</div>
          <div className="kpi-metric-number">{total}</div>
          <div className="kpi-secondary-info">
            <span style={{ color: '#fbbf24', fontWeight: 600 }}>Live Sync</span> zero latency
          </div>
        </div>
      </div>
    </div>
  );
}
