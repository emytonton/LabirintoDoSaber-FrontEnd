import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login/index'; 
import RegisterPage from './pages/Register/index';
import ForgotPasswordPage from './pages/forgotPassword/index';
import ResetPasswordPage from './pages/resetPassword/index.js';
import HomePage from './pages/Home/index';
import AlunosPage from './pages/patients';
import AlunosDetails from './pages/patientsDetails';
import ActivitiesPage from './pages/activities';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
        <Route path="/resetPassword" element={<ResetPasswordPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/alunos" element={<AlunosPage />} />
        <Route path="/alunosDetails" element={<AlunosDetails />} />
        <Route path="/activities" element={<ActivitiesPage />} />
      </Routes>
    </div>
  );
}

export default App;
