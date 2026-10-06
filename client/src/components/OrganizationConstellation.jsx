import React, { useState } from 'react';
import { Network, Sparkles, Users, Info } from 'lucide-react';

const DEPT_COLORS = {
  Engineering: '#06b6d4',
  'Human Resources': '#8b5cf6',
  Finance: '#10b981',
  Marketing: '#f59e0b',
  Sales: '#3b82f6',
  Operations: '#f43f5e',
  IT: '#a855f7',
  Other: '#94a3b8',
};

export default function OrganizationConstellation({ employees = [] }) {
  const [activeNode, setActiveNode] = useState(null);

  if (!employees || employees.length === 0) return null;

  // Aggregate real department statistics
  const deptCounts = {};
  employees.forEach((emp) => {
    const d = emp.department || 'Other';
    deptCounts[d] = (deptCounts[d] || 0) + 1;
  });

  const departments = Object.keys(deptCounts);
  const total = employees.length;

  // Generate geometric circular node coordinates
  const centerX = 300;
  const centerY = 130;
  const radius = 95;

  const nodes = departments.map((dept, index) => {
    const angle = (index / departments.length) * (Math.PI * 2) - Math.PI / 2;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    const count = deptCounts[dept];
    const percentage = Math.round((count / total) * 100);
    const color = DEPT_COLORS[dept] || '#8b5cf6';

    return {
      dept,
      count,
      percentage,
      x,
      y,
      color,
      nodeSize: Math.max(14, Math.min(26, 12 + count * 3)),
    };
  });

  return (
    <div id="constellation-section" className="constellation-wrapper">
      <div className="panel-header-row" style={{ marginBottom: 12 }}>
        <div className="panel-title-tech">
          <Network size={18} color="var(--text-cyan)" />
          <span>Organization Constellation // Neural Workforce Map</span>
        </div>
        <div className="panel-subtitle-mono" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Sparkles size={13} color="var(--accent-violet)" />
          <span>Real-time node topology ({total} active staff)</span>
        </div>
      </div>

      <div style={{ position: 'relative', width: '100%', minHeight: 240 }}>
        <svg viewBox="0 0 600 260" className="constellation-svg" style={{ overflow: 'visible' }}>
          <defs>
            {/* Center glow filter */}
            <filter id="glow-core" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Connection Beams from Center to Nodes */}
          {nodes.map((node, i) => (
            <g key={`link-${i}`}>
              <line
                x1={centerX}
                y1={centerY}
                x2={node.x}
                y2={node.y}
                stroke={node.color}
                strokeWidth={activeNode?.dept === node.dept ? 2.5 : 1.2}
                strokeOpacity={activeNode && activeNode.dept !== node.dept ? 0.2 : 0.6}
                strokeDasharray={activeNode?.dept === node.dept ? 'none' : '4, 4'}
              />
              {/* Data packet pulse circle on line */}
              <circle
                cx={(centerX + node.x) / 2}
                cy={(centerY + node.y) / 2}
                r={2}
                fill={node.color}
                opacity={0.8}
              />
            </g>
          ))}

          {/* Central Enterprise Core Node */}
          <circle
            cx={centerX}
            cy={centerY}
            r={24}
            fill="#0b0e16"
            stroke="var(--accent-violet)"
            strokeWidth={2}
            filter="url(#glow-core)"
          />
          <circle
            cx={centerX}
            cy={centerY}
            r={16}
            fill="rgba(139, 92, 246, 0.25)"
          />
          <text
            x={centerX}
            y={centerY + 4}
            textAnchor="middle"
            fill="#ffffff"
            fontSize="10"
            fontFamily="Space Grotesk"
            fontWeight="800"
          >
            CORE
          </text>

          {/* Department Satellite Nodes */}
          {nodes.map((node, i) => {
            const isHovered = activeNode?.dept === node.dept;

            return (
              <g
                key={`node-${i}`}
                style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
                onMouseEnter={() => setActiveNode(node)}
                onMouseLeave={() => setActiveNode(null)}
              >
                {/* Outer halo on hover */}
                {isHovered && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.nodeSize + 8}
                    fill={node.color}
                    opacity={0.2}
                  />
                )}

                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.nodeSize}
                  fill="#080a10"
                  stroke={node.color}
                  strokeWidth={isHovered ? 3 : 1.8}
                  style={{ filter: isHovered ? `drop-shadow(0 0 8px ${node.color})` : 'none' }}
                />

                <circle
                  cx={node.x}
                  cy={node.y}
                  r={Math.max(4, node.nodeSize - 4)}
                  fill={node.color}
                  opacity={0.35}
                />

                {/* Node Count Text */}
                <text
                  x={node.x}
                  y={node.y + 4}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="10"
                  fontFamily="JetBrains Mono"
                  fontWeight="700"
                >
                  {node.count}
                </text>

                {/* Node Label Text */}
                <text
                  x={node.x}
                  y={node.y > centerY ? node.y + node.nodeSize + 14 : node.y - node.nodeSize - 6}
                  textAnchor="middle"
                  fill={isHovered ? '#ffffff' : '#8b93a7'}
                  fontSize="9"
                  fontFamily="Space Grotesk"
                  fontWeight={isHovered ? '700' : '600'}
                  letterSpacing="0.02em"
                >
                  {node.dept.toUpperCase()}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Inspector Pill */}
        {activeNode && (
          <div style={{
            position: 'absolute',
            bottom: 6,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(8, 10, 16, 0.95)',
            border: `1px solid ${activeNode.color}`,
            padding: '6px 14px',
            borderRadius: '6px',
            boxShadow: `0 0 16px ${activeNode.color}40`,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontFamily: 'JetBrains Mono',
            fontSize: '0.75rem',
            color: '#fff',
            zIndex: 10,
          }}>
            <span style={{ color: activeNode.color, fontWeight: 700 }}>
              {activeNode.dept}
            </span>
            <span>// Headcount: <strong>{activeNode.count}</strong></span>
            <span>// Share: <strong>{activeNode.percentage}%</strong></span>
          </div>
        )}
      </div>
    </div>
  );
}
