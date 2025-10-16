import React, { useState } from 'react';
import './style.css';
import { Link } from 'react-router-dom';

import Button from '../../components/ui/ButtonYellow/Button';
import Input from '../../components/ui/InputWhite/Input';
import logo from '../../assets/images/logo.png'; 
import onda from '../../assets/images/ondaLogin.png'; 
import googleIcon from '../../assets/images/Google.png';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      alert('Por favor, preencha o e-mail e a senha.');
      return; 
    }


    console.log('Email:', email, 'Senha:', password);
    alert('Tentativa de login!');
  };

  return (
    
    <div className="login-page-container">

      <div className="form-side">
        <div className="login-form-container">
          <h1 className="login-title">Login</h1>
          <p className="signup-link">
            Não tem uma conta?{' '}
            <Link to="/register">Criar conta</Link>
          </p>
          <Input
            label="Email:"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Senha:"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <div className="options-row">
            <div className="checkbox-group">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Se lembre de mim</label>
            </div>
            <a href="#" className="forgot-password">Esqueceu a senha?</a>
          </div>

          <Button onClick={handleLogin}>
            Entrar
          </Button>

          <div className="divider">
            <span>Ou continue com</span>
          </div>

          <button className="google-button">
            <img src={googleIcon} alt="Google logo" className="google-logo" />
          </button>

        </div>
      </div>

    
      <div className="branding-side" style={{ backgroundImage: `url(${onda})` }}>
        <img src={logo} alt="Labirinto do Saber Logo" className="logo-image" />
      </div>

    </div>
  );
}

export default LoginPage;