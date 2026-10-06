import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis 
} from 'recharts';
import { PieChart as PieIcon, BarChart2, Briefcase } from 'lucide-react';

const DEPARTMENT_COLORS = {
  Engineering: '#06b6d4',
  'Human Resources': '#8b5cf6',
  Finance: '#10b981',
  Marketing: '#f59e0b',
  Sales: '#3b82f6',
  Operations: '#f43f5e',
  IT: '#a855f7',
  Other: '#94a3b8',
};

const DEFAULT_NEON = '#8b5cf6';

// Custom Cyber Tooltip for Recharts
const CustomCyberTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="cyber-chart-tooltip">
        <div className="tooltip-dept-name">{data.name || data.payload.name}</div>
        <div className="tooltip-dept-count">
          {data.value} {data.value === 1 ? 'staff member' : 'staff members'}
        </div>
      </div>
    );
  }
  return null;
};

export default function AnalyticsSection({ employees = [] }) {
  if (!employees || employees.length === 0) return null;

  // 1. Department Share Calculation
  const deptCounts = {};
  employees.forEach((emp) => {
    const dept = emp.department || 'Other';
    deptCounts[dept] = (deptCounts[dept] || 0) + 1;
  });

  const departmentData = Object.keys(deptCounts).map((dept) => ({
    name: dept,
    value: deptCounts[dept],
    color: DEPARTMENT_COLORS[dept] || DEFAULT_NEON,
  })).sort((a, b) => b.value - a.value);

  // 2. Designation Breakdown Calculation
  const roleCounts = {};
  employees.forEach((emp) => {
    const role = emp.designation ? emp.designation.trim() : 'Unassigned';
    roleCounts[role] = (roleCounts[role] || 0) + 1;
  });

  const topRoles = Object.keys(roleCounts)
    .map((role) => ({ role, count: roleCounts[role] }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 4);

  return (
    <section id="analytics-section" className="analytics-grid">
      {/* 1. Neon Donut Chart */}
      <div className="cyber-panel">
        <div className="panel-header-row">
          <div className="panel-title-tech">
            <PieIcon size={17} color="var(--text-cyan)" />
            <span>Department Share</span>
          </div>
          <span className="panel-subtitle-mono">PERCENTAGE SPLIT</span>
        </div>

        <div className="chart-stage">
          <ResponsiveContainer width="100%" height={210}>
            <PieChart>
              <Tooltip content={<CustomCyberTooltip />} />
              <Pie
                data={departmentData}
                cx="50%"
                cy="50%"
                innerRadius={58}
                outerRadius={82}
                paddingAngle={4}
                dataKey="value"
                stroke="none"
              >
                {departmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            pointerEvents: 'none',
          }}>
            <span style={{ fontFamily: 'Space Grotesk', fontSize: '1.4rem', fontWeight: 800, color: '#fff', display: 'block', lineHeight: 1 }}>
              {employees.length}
            </span>
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              STAFF
            </span>
          </div>
        </div>
      </div>

      {/* 2. Neon Bar Chart */}
      <div className="cyber-panel">
        <div className="panel-header-row">
          <div className="panel-title-tech">
            <BarChart2 size={17} color="var(--accent-violet)" />
            <span>Headcount Distribution</span>
          </div>
          <span className="panel-subtitle-mono">TEAM TOTALS</span>
        </div>

        <div className="chart-stage">
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={departmentData} margin={{ top: 10, right: 10, left: -25, bottom: 20 }}>
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#8b93a7', fontSize: 10, fontFamily: 'Space Grotesk' }} 
                interval={0}
                angle={-25}
                textAnchor="end"
                axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
                tickLine={false}
              />
              <YAxis 
                allowDecimals={false} 
                tick={{ fill: '#8b93a7', fontSize: 10, fontFamily: 'JetBrains Mono' }} 
                axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
                tickLine={false}
              />
              <Tooltip content={<CustomCyberTooltip />} />
              <Bar 
                dataKey="value" 
                radius={[4, 4, 0, 0]}
              >
                {departmentData.map((entry, index) => (
                  <Cell key={`bar-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. Top Roles Breakdown */}
      <div className="cyber-panel designations">
        <div className="panel-header-row">
          <div className="panel-title-tech">
            <Briefcase size={17} color="#34d399" />
            <span>Designation Roster</span>
          </div>
          <span className="panel-subtitle-mono">JOB TITLES</span>
        </div>

        <div className="chart-stage" style={{ alignItems: 'flex-start' }}>
          <div className="role-telemetry-list">
            {topRoles.map((item, idx) => (
              <div key={idx} className="role-telemetry-item">
                <span className="role-name">{item.role}</span>
                <span className="role-count-chip">
                  {item.count} {item.count === 1 ? 'ROLE' : 'ROLES'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
