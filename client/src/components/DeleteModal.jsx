import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export default function DeleteModal({ isOpen, employeeName, isDeleting, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="cyber-modal-overlay" onClick={() => !isDeleting && onCancel()}>
      <div className="cyber-modal-frame" onClick={(e) => e.stopPropagation()}>
        <div className="modal-danger-icon-box">
          <AlertTriangle size={22} />
        </div>

        <h3 className="modal-header-text">Purge Employee Record?</h3>
        <p className="modal-desc-text">
          Are you sure you want to permanently delete <strong style={{ color: '#ffffff' }}>{employeeName}</strong>? This action initiates a permanent deletion in MongoDB Atlas and cannot be reverted.
        </p>

        <div className="modal-actions-row">
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={onCancel}
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button 
            type="button" 
            className="btn btn-danger" 
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? (
              'Purging from Atlas...'
            ) : (
              <>
                <Trash2 size={15} /> Confirm Deletion
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
