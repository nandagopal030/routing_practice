// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import FormPage from '../pages/FormPage';
import CrudPage from '../pages/CrudPage';
import SignUp from '../components/auth/SignUp';
import PrivateRoute from './PrivateRoute';

const AppRoutes = () => {
  const isAuth = localStorage.getItem('auth') === 'true';
//   const adminAuth = localStorage.getItem('isAuth') === 'true';
  return (
    <Routes>
      <Route
        path="/"
        element={isAuth ? <Navigate to="/form" /> : <LoginPage />}
      />
      {/* <Route 
        path='/admin'
        element={adminAuth ? <Navigate to='/crud' /> : <LoginPage /> }      
      /> */}
      <Route
        path="/form"
        element={
          <PrivateRoute>
            <FormPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/formdata"
        element={
          <PrivateRoute>
            <CrudPage />
          </PrivateRoute>
        }
      />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default AppRoutes;
