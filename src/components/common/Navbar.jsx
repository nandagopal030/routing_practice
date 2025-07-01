// components/Navbar.jsx
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem('auth') === 'true';
  const currentUser = JSON.parse(localStorage.getItem('authUser'));

  const handleLogout = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('authUser');
    navigate('/');
  };

  return (
    <div className="navbar">
      <h3>Nanda's App</h3>
      {isAuth && (
        <div className="navbar-right">
          <span>Welcome, {currentUser?.email}</span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
