// pages/LoginPage.jsx
import { useNavigate } from 'react-router-dom';
import Login from '../components/auth/Login';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/form');
  };

  return <Login onLogin={handleLogin} />;
};

export default LoginPage;
