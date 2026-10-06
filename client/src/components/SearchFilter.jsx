import React from 'react';
import { Search, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

const DEPARTMENTS = [
  'All Departments',
  'Engineering',
  'Human Resources',
  'Finance',
  'Marketing',
  'Sales',
  'Operations',
  'IT',
  'Other',
];

export default function SearchFilter({ 
  search, 
  department, 
  sortBy,
  onSearchChange, 
  onDepartmentChange,
  onSortChange,
  onClearFilters 
}) {
  const isFiltered = Boolean(search.trim() || department || sortBy !== 'newest');

  return (
    <div className="cyber-toolbar">
      {/* Search Input Box */}
      <div className="cyber-search-box">
        <Search className="search-icon-neo" size={16} />
        <input
          id="search-employees"
          type="text"
          className="cyber-search-input"
          placeholder="Search employees by name or email query..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {search && (
          <button 
            type="button" 
            className="cyber-clear-search" 
            onClick={() => onSearchChange('')}
            title="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Filters Group */}
      <div className="cyber-filters-group">
        {/* Department Filter */}
        <select
          id="filter-department"
          className="cyber-select"
          value={department}
          onChange={(e) => onDepartmentChange(e.target.value)}
          aria-label="Filter by department"
        >
          {DEPARTMENTS.map((dept) => (
            <option key={dept} value={dept === 'All Departments' ? '' : dept}>
              {dept}
            </option>
          ))}
        </select>

        {/* Sort Select */}
        <select
          id="sort-employees"
          className="cyber-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          aria-label="Sort roster"
        >
          <option value="newest">Sort: Newest First</option>
          <option value="oldest">Sort: Oldest First</option>
          <option value="name-asc">Sort: Name (A - Z)</option>
          <option value="name-desc">Sort: Name (Z - A)</option>
        </select>

        {/* Reset Filter Button */}
        {isFiltered && (
          <button 
            type="button" 
            className="btn-reset-filters"
            onClick={onClearFilters}
          >
            RESET ALL FILTERS
          </button>
        )}
      </div>
    </div>
  );
}
