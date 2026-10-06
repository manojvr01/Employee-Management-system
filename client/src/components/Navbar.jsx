import { Link } from 'react-router-dom';
import { HiOutlinePlus } from 'react-icons/hi';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <div className="navbar-logo">EM</div>
          <span>Employee Manager</span>
        </Link>
        <div className="navbar-actions">
          <Link to="/employees/new" className="btn btn-primary btn-sm">
            <HiOutlinePlus size={16} />
            Add Employee
          </Link>
        </div>
      </div>
    </nav>
  );
}
