import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.confirmPassword) {
      alert("Both passwords didn't match");
      return;
    }
    const { email, password } = credentials;

    // Get current users from localStorage or empty array
    const existingUsers = JSON.parse(localStorage.getItem("authUsers")) || [];

    // Check if user already exists
    const isUserExist = existingUsers.find(user => user.email === email);
    if (isUserExist) {
      alert("User already registered!");
      return;
    }

    // Add new user to the array
    const updatedUsers = [...existingUsers, { email, password }];
    localStorage.setItem("authUsers", JSON.stringify(updatedUsers));

    // Login the user
    localStorage.setItem("auth", "true");
    localStorage.setItem("authUser", JSON.stringify({ email, password }));
    navigate("/form");
  };

  return (
    <div className="form-container">
      <form className="main-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
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
          placeholder="Enter your password"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Re-enter your password"
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
      <button 
       className="back-btn"
       onClick={()=>navigate('/')}
      > 
      Back to Login
      </button>
    </div>
  );
};

export default SignUp;
