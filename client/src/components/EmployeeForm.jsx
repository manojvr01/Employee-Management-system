import React, { useState, useEffect } from 'react';
import { User, Mail, Building, Briefcase, AlertCircle, Check, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DEPARTMENTS = [
  'Engineering',
  'Human Resources',
  'Finance',
  'Marketing',
  'Sales',
  'Operations',
  'IT',
  'Other',
];

const initialFormState = {
  name: '',
  email: '',
  department: '',
  designation: '',
};

export default function EmployeeForm({ 
  initialData, 
  onSubmit, 
  isSubmitting, 
  submitLabel = 'Deploy Employee Record' 
}) {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        email: initialData.email || '',
        department: initialData.department || '',
        designation: initialData.designation || '',
      });
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Full Name is required.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Full Name must be at least 2 characters.';
    } else if (formData.name.trim().length > 100) {
      newErrors.name = 'Full Name cannot exceed 100 characters.';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid corporate email format.';
    }

    // Department validation
    if (!formData.department) {
      newErrors.department = 'Please designate an active department node.';
    }

    // Designation validation
    if (!formData.designation.trim()) {
      newErrors.designation = 'Official Designation / Role is required.';
    } else if (formData.designation.trim().length < 2) {
      newErrors.designation = 'Designation must be at least 2 characters.';
    } else if (formData.designation.trim().length > 100) {
      newErrors.designation = 'Designation cannot exceed 100 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        department: formData.department,
        designation: formData.designation.trim(),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Name Field */}
      <div className="neo-field">
        <label htmlFor="name" className="neo-label">
          <span>Full Name</span>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.625rem', color: 'var(--text-muted)' }}>MANDATORY</span>
        </label>
        <div className="input-icon-box">
          <User className="input-ico" size={17} />
          <input
            id="name"
            name="name"
            type="text"
            className={`neo-input ${errors.name ? 'is-invalid' : ''}`}
            placeholder="e.g. Rahul Sharma"
            value={formData.name}
            onChange={handleChange}
            autoComplete="name"
          />
        </div>
        {errors.name && (
          <div className="neo-error-line">
            <AlertCircle size={13} /> {errors.name}
          </div>
        )}
      </div>

      {/* Email Field */}
      <div className="neo-field">
        <label htmlFor="email" className="neo-label">
          <span>Corporate Email</span>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.625rem', color: 'var(--text-muted)' }}>UNIQUE_KEY</span>
        </label>
        <div className="input-icon-box">
          <Mail className="input-ico" size={17} />
          <input
            id="email"
            name="email"
            type="email"
            className={`neo-input ${errors.email ? 'is-invalid' : ''}`}
            placeholder="e.g. rahul@example.com"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
          />
        </div>
        {errors.email && (
          <div className="neo-error-line">
            <AlertCircle size={13} /> {errors.email}
          </div>
        )}
      </div>

      {/* Department Field */}
      <div className="neo-field">
        <label htmlFor="department" className="neo-label">
          <span>Department Assignment</span>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.625rem', color: 'var(--text-muted)' }}>NODE_SELECTION</span>
        </label>
        <div className="input-icon-box">
          <Building className="input-ico" size={17} />
          <select
            id="department"
            name="department"
            className={`neo-input neo-select ${errors.department ? 'is-invalid' : ''}`}
            value={formData.department}
            onChange={handleChange}
          >
            <option value="">Select target department node...</option>
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
        {errors.department && (
          <div className="neo-error-line">
            <AlertCircle size={13} /> {errors.department}
          </div>
        )}
      </div>

      {/* Designation Field */}
      <div className="neo-field">
        <label htmlFor="designation" className="neo-label">
          <span>Designation / Role Title</span>
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.625rem', color: 'var(--text-muted)' }}>MANDATORY</span>
        </label>
        <div className="input-icon-box">
          <Briefcase className="input-ico" size={17} />
          <input
            id="designation"
            name="designation"
            type="text"
            className={`neo-input ${errors.designation ? 'is-invalid' : ''}`}
            placeholder="e.g. Senior Software Engineer"
            value={formData.designation}
            onChange={handleChange}
          />
        </div>
        {errors.designation && (
          <div className="neo-error-line">
            <AlertCircle size={13} /> {errors.designation}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="form-action-bar">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate('/')}
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button 
          type="submit" 
          className="btn btn-primary" 
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            'Transmitting to Atlas...'
          ) : (
            <>
              <Check size={16} /> {submitLabel}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
