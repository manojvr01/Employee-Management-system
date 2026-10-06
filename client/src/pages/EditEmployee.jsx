import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Edit3, ArrowLeft, ShieldAlert } from 'lucide-react';
import { getEmployee, updateEmployee } from '../services/employeeApi';
import EmployeeForm from '../components/EmployeeForm';
import { DetailsSkeleton } from '../components/SkeletonLoader';

export default function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getEmployee(id);
        setEmployee(data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to locate employee record.');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      setError('');
      await updateEmployee(id, formData);
      navigate(`/employees/${id}`, { 
        state: { 
          toast: { 
            message: `Employee "${formData.name}" synchronized successfully!`, 
            type: 'success' 
          } 
        } 
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Database update rejected.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="form-shell">
        <DetailsSkeleton />
      </div>
    );
  }

  if (error && !employee) {
    return (
      <div className="form-shell">
        <div className="cyber-error-bar" style={{ marginBottom: 18 }}>
          <div className="error-bar-content">
            <ShieldAlert size={17} />
            <span>{error}</span>
          </div>
        </div>
        <Link to="/" className="btn btn-secondary">
          <ArrowLeft size={15} /> Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="form-shell">
      <div style={{ marginBottom: 18 }}>
        <Link to={`/employees/${id}`} className="btn btn-secondary btn-sm" style={{ display: 'inline-flex' }}>
          <ArrowLeft size={15} /> Back to Dossier
        </Link>
      </div>

      <div className="cyber-form-card">
        <div className="form-header-neo">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: 4,
              background: 'var(--accent-amber-bg)',
              color: '#fbbf24',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(245, 158, 11, 0.3)'
            }}>
              <Edit3 size={18} />
            </div>
            <h1 className="form-title-neo" style={{ margin: 0 }}>Modify Staff Record</h1>
          </div>
          <p className="form-desc-neo">
            Update departmental designation and personal parameters for <strong>{employee?.name}</strong>.
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
          initialData={employee} 
          onSubmit={handleSubmit} 
          isSubmitting={isSubmitting} 
          submitLabel="Commit Updates" 
        />
      </div>
    </div>
  );
}
