import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import UserManagementPage from './pages/UserManagementPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Navbar from './components/Navbar'; // Ensure this path is correct
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute if you have created it

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mt-5">
        <Routes>
          <Route
            path="/"
            element={
              <div className="text-center">
                <h1 className="display-4">Welcome to Task4 Webpage</h1>
                <p className="lead">
                  Manage users, track login times, and control access.               </p>
                
              </div>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/users" element={<UserManagementPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

