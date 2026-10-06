import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        onClose();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success';

  return (
    <div className="toast-cyber-stack">
      <div className={`toast-cyber-item ${isSuccess ? 'success' : 'error'}`}>
        {isSuccess ? (
          <CheckCircle2 size={18} color="var(--accent-emerald)" />
        ) : (
          <AlertCircle size={18} color="var(--accent-rose)" />
        )}
        <span className="toast-msg-body">{toast.message}</span>
        <button 
          type="button" 
          onClick={onClose}
          style={{ marginLeft: 'auto', color: 'var(--text-muted)', display: 'flex' }}
          aria-label="Dismiss toast"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
