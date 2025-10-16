import React, { useState } from 'react';
import './style.css';

import Button from '../../components/ui/ButtonYellow/Button';
import Input from '../../components/ui/InputWhite/Input';
import logo from '../../assets/images/logo.png'; 
import onda from '../../assets/images/ondaLogin.png'; 
import googleIcon from '../../assets/images/Google.png';
import { Link } from 'react-router-dom';

function RegisterPage() {
    const [nomeCompleto, setNomeCompleto] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();

        if (!nomeCompleto || !email || !password || !confirmPassword) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        if (password !== confirmPassword) {
            alert('As senhas não coincidem. Por favor, verifique.');
            return;
        }

        console.log('Dados prontos para envio (API):');
        console.log('Nome Completo:', nomeCompleto);
        console.log('Email:', email);
        
        alert('Cadastro realizado com sucesso!');
        
        setNomeCompleto('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <div className="register-page-container">
            <div className="form-side">
                <div className="register-form-container">
                    
                    <form onSubmit={handleRegister}> 
                        <h1 className="register-title">Criar Conta</h1>
                        
                        
                            <p className="sign-link">
                                Já possui uma conta?{' '}
                                <Link to="/">Login</Link>
                            </p>

                        <Input
                            label="Nome Completo:"
                            type="text"
                            value={nomeCompleto}
                            onChange={(e) => setNomeCompleto(e.target.value)}
                        />

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
                        
                        <Input
                            label="Confirmar Senha:"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        <Button type="submit"> 
                            Cadastrar-se
                        </Button>
                    </form>
                    
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;