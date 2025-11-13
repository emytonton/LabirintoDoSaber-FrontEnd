import React, { useState } from 'react';
import './style.css';
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios'; // 1. Importe o axios

import Button from '../../components/ui/ButtonYellow/Button';
import Input from '../../components/ui/InputWhite/Input';
import logo from '../../assets/images/logo.png'; 
import onda from '../../assets/images/ondaLogin.png'; 
import googleIcon from '../../assets/images/Google.png';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // 2. Transforme a função em assíncrona e receba o evento (e)
  const handleLogin = async (e) => {
    e.preventDefault(); // Impede o recarregamento da página

    if (!email || !password) {
      alert('Por favor, preencha o e-mail e a senha.');
      return; 
    }

    const payload = {
      email: email,
      password: password
    };

    const API_URL = 'http://localhost:3000/educators/sign-in';

    try {
      // 3. Faça a chamada POST para a API de login
      const response = await axios.post(API_URL, payload);

      // 4. Pegue o token da resposta (baseado na sua imagem)
      const { token } = response.data;

      if (token) {
        // 5. Salve o token no localStorage
        // (Isso persiste o login mesmo se fechar o app/navegador)
        localStorage.setItem('authToken', token);

        // [Opcional, mas recomendado] Configure o axios imediatamente
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        alert('Login realizado com sucesso!');
        navigate('/home'); // Navega para a home
      } else {
        alert('Erro: Token não recebido do servidor.');
      }

    } catch (error) {
      // 6. Lide com erros (ex: 401 - Não autorizado)
      console.error('Erro no login:', error);
      alert('Erro no login: E-mail ou senha incorretos.');
    }
  };

  return (
    
    <div className="login-page-container">

      <div className="form-side">
        <div className="login-form-container">
          
          {/* 7. Use um <form> e o evento onSubmit */}
          <form onSubmit={handleLogin}>
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
              <Link to="/forgotPassword" className="forgot-password">Esqueceu a senha?</Link>
            </div>
      
            {/* 8. Mude o botão para type="submit" */}
            <Button type="submit">
              Entrar
            </Button>
          </form> 
          {/* Fim do <form> */}

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