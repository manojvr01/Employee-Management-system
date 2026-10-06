import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserPlus, AlertTriangle, RefreshCw, Users, ShieldAlert, Cpu } from 'lucide-react';
import { getEmployees, deleteEmployee } from '../services/employeeApi';
import Hero3D from '../components/Hero3D';
import KPICards from '../components/KPICards';
import OrganizationConstellation from '../components/OrganizationConstellation';
import AnalyticsSection from '../components/AnalyticsSection';
import SearchFilter from '../components/SearchFilter';
import EmployeeTable from '../components/EmployeeTable';
import EmployeeCard from '../components/EmployeeCard';
import DeleteModal from '../components/DeleteModal';
import Toast from '../components/Toast';
import { KPISkeleton, TableSkeleton } from '../components/SkeletonLoader';

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [allEmployees, setAllEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [toast, setToast] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null, name: '' });
  const [isDeleting, setIsDeleting] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location.state?.toast) {
      setToast(location.state.toast);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Fetch filtered employees for the table
  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getEmployees(search, department);
      setEmployees(data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Atlas Node Unreachable. Please verify backend connection and environment credentials.');
    } finally {
      setLoading(false);
    }
  }, [search, department]);

  // Fetch full dataset for accurate global 3D neural graph & KPI calculations
  const fetchAllEmployees = useCallback(async () => {
    try {
      const data = await getEmployees('', '');
      setAllEmployees(data.data || []);
    } catch {
      // Non-critical fallback
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  useEffect(() => {
    fetchAllEmployees();
  }, [fetchAllEmployees]);

  // Delete modal triggers
  const handleDeleteOpen = (id, name) => {
    setDeleteModal({ isOpen: true, id, name });
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
      setToast({ message: `Employee node "${deleteModal.name}" was permanently purged.`, type: 'success' });
      setDeleteModal({ isOpen: false, id: null, name: '' });
      fetchEmployees();
      fetchAllEmployees();
    } catch (err) {
      setToast({ 
        message: err.response?.data?.message || 'Purge operation failed.', 
        type: 'error' 
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // Sort employees dynamically on current search/filter view
  const sortedEmployees = useMemo(() => {
    const list = [...employees];
    if (sortBy === 'newest') {
      return list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }
    if (sortBy === 'oldest') {
      return list.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
    }
    if (sortBy === 'name-asc') {
      return list.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    }
    if (sortBy === 'name-desc') {
      return list.sort((a, b) => (b.name || '').localeCompare(a.name || ''));
    }
    return list;
  }, [employees, sortBy]);

  const handleClearFilters = () => {
    setSearch('');
    setDepartment('');
    setSortBy('newest');
  };

  const activeGlobalData = allEmployees.length > 0 ? allEmployees : employees;

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

      {/* 3D Interactive Hero Panel */}
      <Hero3D employees={activeGlobalData} />

      {/* Error state */}
      {error && (
        <div className="cyber-error-bar">
          <div className="error-bar-content">
            <ShieldAlert size={18} />
            <span>{error}</span>
          </div>
          <button 
            type="button" 
            className="btn btn-secondary btn-sm" 
            onClick={() => { fetchEmployees(); fetchAllEmployees(); }}
          >
            <RefreshCw size={13} /> Retry System Sync
          </button>
        </div>
      )}

      {/* 3D KPI Cards */}
      {loading && employees.length === 0 ? (
        <KPISkeleton />
      ) : (
        <KPICards employees={activeGlobalData} />
      )}

      {/* Special 3D Constellation / Neural Workforce Graph */}
      {!loading && activeGlobalData.length > 0 && (
        <OrganizationConstellation employees={activeGlobalData} />
      )}

      {/* Analytics Charts Section */}
      {!loading && activeGlobalData.length > 0 && (
        <AnalyticsSection employees={activeGlobalData} />
      )}

      {/* Staff Directory Section Header */}
      <div id="employees-table-section" className="section-headline-group">
        <div>
          <h2 className="section-main-heading">
            <Cpu size={18} color="var(--text-cyan)" />
            <span>Staff Roster // MongoDB Node Directory</span>
          </h2>
          <p className="section-subtext">
            Search, filter, and inspect verified workforce entities with live database synchronization.
          </p>
        </div>
      </div>

      {/* Cyber Search & Filter Toolbar */}
      <SearchFilter
        search={search}
        department={department}
        sortBy={sortBy}
        onSearchChange={setSearch}
        onDepartmentChange={setDepartment}
        onSortChange={setSortBy}
        onClearFilters={handleClearFilters}
      />

      {/* Table / Cards / Empty / Loading State */}
      {loading ? (
        <TableSkeleton />
      ) : sortedEmployees.length === 0 ? (
        <div className="cyber-empty-panel">
          <div className="empty-geometric-hex">
            <Users size={28} />
          </div>
          {search || department ? (
            <>
              <h3 className="empty-head-text">No Matching Entities Found</h3>
              <p className="empty-sub-text">
                No active employee records match your specified search term or department node.
              </p>
              <button 
                type="button" 
                className="btn btn-secondary btn-sm"
                onClick={handleClearFilters}
              >
                Reset Search Filters
              </button>
            </>
          ) : (
            <>
              <h3 className="empty-head-text">Zero Staff Registered In Atlas</h3>
              <p className="empty-sub-text">
                Initialize your organization by deploying your first employee profile into the system.
              </p>
              <Link to="/employees/new" className="btn btn-primary btn-sm">
                <UserPlus size={15} /> + Add First Employee
              </Link>
            </>
          )}
        </div>
      ) : (
        <>
          {/* Desktop Cyber Table */}
          <EmployeeTable 
            employees={sortedEmployees} 
            onDelete={handleDeleteOpen} 
          />

          {/* Mobile Feed Cards */}
          <div className="mobile-cards-feed">
            {sortedEmployees.map((emp) => (
              <EmployeeCard 
                key={emp._id} 
                employee={emp} 
                onDelete={handleDeleteOpen} 
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}
