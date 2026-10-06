import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { ArrowLeft, ShieldAlert } from 'lucide-react';
import { getEmployee, deleteEmployee } from '../services/employeeApi';
import EmployeeDetails from '../components/EmployeeDetails';
import DeleteModal from '../components/DeleteModal';
import Toast from '../components/Toast';
import { DetailsSkeleton } from '../components/SkeletonLoader';

export default function EmployeeDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState(location.state?.toast || null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null, name: '' });
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (location.state?.toast) {
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getEmployee(id);
        setEmployee(data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Employee entity not found in cluster.');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleDeleteOpen = (empId, empName) => {
    setDeleteModal({ isOpen: true, id: empId, name: empName });
  };

  const handleDeleteClose = () => {
    if (!isDeleting) {
      setDeleteModal({ isOpen: false, id: null, name: '' });
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.id) return;
    try {
      setIsDeleting(true);
      await deleteEmployee(deleteModal.id);
      navigate('/', { 
        state: { 
          toast: { 
            message: `Employee "${deleteModal.name}" was permanently purged.`, 
            type: 'success' 
          } 
        } 
      });
    } catch (err) {
      setToast({ 
        message: err.response?.data?.message || 'Failed to purge employee.', 
        type: 'error' 
      });
    } finally {
      setIsDeleting(false);
      setDeleteModal({ isOpen: false, id: null, name: '' });
    }
  };

  if (loading) {
    return <DetailsSkeleton />;
  }

  if (error || !employee) {
    return (
      <div className="profile-dossier-wrap">
        <div className="cyber-error-bar">
          <div className="error-bar-content">
            <ShieldAlert size={18} />
            <span>{error || 'Employee record could not be found.'}</span>
          </div>
        </div>
        <Link to="/" className="btn btn-secondary">
          <ArrowLeft size={15} /> Return to Command Center
        </Link>
      </div>
    );
  }

  return (
    <>
      <Toast toast={toast} onClose={() => setToast(null)} />

      <DeleteModal
        isOpen={deleteModal.isOpen}
        employeeName={deleteModal.name}
        isDeleting={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteClose}
      />

      <EmployeeDetails 
        employee={employee} 
        onDelete={handleDeleteOpen} 
      />
    </>
  );
}
