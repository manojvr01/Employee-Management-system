import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div className="error-container">
      <HiOutlineExclamationCircle className="error-icon" />
      <span className="error-text">{message}</span>
    </div>
  );
}
