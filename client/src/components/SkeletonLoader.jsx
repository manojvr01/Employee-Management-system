import React from 'react';

export function KPISkeleton() {
  return (
    <div className="kpi-grid">
      {[1, 2, 3, 4].map((n) => (
        <div key={n} className="kpi-card-3d">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
            <div className="cyber-skeleton" style={{ width: 40, height: 40, borderRadius: 4 }} />
            <div className="cyber-skeleton" style={{ width: 64, height: 18, borderRadius: 4 }} />
          </div>
          <div className="cyber-skeleton" style={{ width: '40%', height: 12, marginBottom: 8 }} />
          <div className="cyber-skeleton" style={{ width: '65%', height: 32, marginBottom: 8 }} />
          <div className="cyber-skeleton" style={{ width: '50%', height: 12 }} />
        </div>
      ))}
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="table-glass-container" style={{ padding: 20 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {[1, 2, 3, 4, 5].map((n) => (
          <div key={n} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 2 }}>
              <div className="cyber-skeleton" style={{ width: 36, height: 36, borderRadius: 4 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '60%' }}>
                <div className="cyber-skeleton" style={{ width: '65%', height: 13 }} />
                <div className="cyber-skeleton" style={{ width: '85%', height: 10 }} />
              </div>
            </div>
            <div className="cyber-skeleton" style={{ flex: 1, height: 22, borderRadius: 4 }} />
            <div className="cyber-skeleton" style={{ flex: 1, height: 14 }} />
            <div className="cyber-skeleton" style={{ flex: 1, height: 14 }} />
            <div className="cyber-skeleton" style={{ width: 80, height: 28, borderRadius: 4 }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function DetailsSkeleton() {
  return (
    <div className="profile-dossier-wrap">
      <div className="dossier-hero">
        <div className="dossier-banner-3d cyber-skeleton" />
        <div className="dossier-body">
          <div className="dossier-id-block">
            <div className="cyber-skeleton" style={{ width: 84, height: 84, borderRadius: 16 }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div className="cyber-skeleton" style={{ width: 180, height: 26 }} />
              <div className="cyber-skeleton" style={{ width: 120, height: 16 }} />
            </div>
          </div>
        </div>
      </div>
      <div className="dossier-grid">
        <div className="dossier-card">
          <div className="cyber-skeleton" style={{ width: 140, height: 18, marginBottom: 18 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="cyber-skeleton" style={{ width: '100%', height: 32 }} />
            <div className="cyber-skeleton" style={{ width: '100%', height: 32 }} />
          </div>
        </div>
        <div className="dossier-card">
          <div className="cyber-skeleton" style={{ width: 140, height: 18, marginBottom: 18 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="cyber-skeleton" style={{ width: '100%', height: 32 }} />
            <div className="cyber-skeleton" style={{ width: '100%', height: 32 }} />
          </div>
        </div>
      </div>
    </div>
  );
}
