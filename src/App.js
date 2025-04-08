import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginSignup from './pages/LoginSignup';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/CustomerDashboard';
import VendorDashboard from './pages/VendorDashboard';
import WaitingPage from './pages/WaitingPage';
import NotFound from './pages/NotFound';

function AppWrapper() {
  const location = useLocation();
  const showNavbar = location.pathname === '/';

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/customer-dashboard" element={<UserDashboard />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/vendor" element={<VendorDashboard />} />
        <Route path="/waiting" element={<WaitingPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
