import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login/index'; 
import RegisterPage from './pages/Register/index';
import HomePage from './pages/Home/index';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
