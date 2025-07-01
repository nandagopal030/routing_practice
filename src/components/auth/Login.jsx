import { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('authUsers')) || [];

    // Check if entered credentials match any user
    const matchedUser = users.find(
      (user) =>
        user.email === credentials.email &&
        user.password === credentials.password
    );

    if (matchedUser) {
      localStorage.setItem('auth', 'true');
      localStorage.setItem('authUser', JSON.stringify(matchedUser));
      onLogin(); // navigate('/form')
    } else {
      alert('Invalid credentials!');
    }
  };

  return (
    <div className="form-container">
      <form className="main-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <Link to="/signup">New here? <span>Sign up</span></Link>
    </div>
  );
};

export default Login;
