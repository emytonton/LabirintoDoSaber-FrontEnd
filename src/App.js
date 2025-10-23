import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login/index'; 
import RegisterPage from './pages/Register/index';
import ForgotPasswordPage from './pages/forgotPassword/index';
import ResetPasswordPage from './pages/resetPassword/index.js';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
        <Route path="/resetPassword" element={<ResetPasswordPage />} />
      </Routes>
    </div>
  );
}

export default App;
