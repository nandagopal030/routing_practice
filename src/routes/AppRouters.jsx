import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Home from '../pages/Home'; 
import About from '../pages/About';
import DataPage from '../pages/DataPage'
import FormPage from '../pages/FormPage'
import Register from '../pages/Register'


const AppRouters = () => {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/data" element={<DataPage />} />
        <Route path="/login" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouters;
