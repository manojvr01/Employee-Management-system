import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, ArrowLeft, ShieldAlert } from 'lucide-react';
import { createEmployee } from '../services/employeeApi';
import EmployeeForm from '../components/EmployeeForm';

export default function AddEmployee() {
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      setError('');
      await createEmployee(formData);
      navigate('/', { 
        state: { 
          toast: { 
            message: `Employee "${formData.name}" deployed to MongoDB Atlas!`, 
            type: 'success' 
          } 
        } 
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Database write error. Check validation parameters.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-shell">
      <div style={{ marginBottom: 18 }}>
        <Link to="/" className="btn btn-secondary btn-sm" style={{ display: 'inline-flex' }}>
          <ArrowLeft size={15} /> Return to Dashboard
        </Link>
      </div>

      <div className="cyber-form-card">
        <div className="form-header-neo">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: 4,
              background: 'var(--accent-violet-bg)',
              color: 'var(--text-violet)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(139, 92, 246, 0.3)'
            }}>
              <UserPlus size={18} />
            </div>
            <h1 className="form-title-neo" style={{ margin: 0 }}>Register New Staff Node</h1>
          </div>
          <p className="form-desc-neo">
            Deploy an employee entity to the workforce database with instant cluster sync.
          </p>
        </div>

        {error && (
          <div className="cyber-error-bar" style={{ marginBottom: 20 }}>
            <div className="error-bar-content">
              <ShieldAlert size={17} />
              <span>{error}</span>
            </div>
          </div>
        )}

        <EmployeeForm 
          onSubmit={handleSubmit} 
          isSubmitting={isSubmitting} 
          submitLabel="Deploy to MongoDB" 
        />
      </div>
    </div>
  );
}
