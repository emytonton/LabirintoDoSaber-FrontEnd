import React, { useState } from 'react';
import './style.css';
import { Link, useNavigate } from 'react-router-dom'; // Importa o useNavigate
import axios from 'axios'; // Importa o axios

import Button from '../../components/ui/ButtonYellow/Button';
import Input from '../../components/ui/InputWhite/Input';
import logo from '../../assets/images/logo.png'; 
import onda from '../../assets/images/ondaLogin.png'; 
import googleIcon from '../../assets/images/Google.png';

function RegisterPage() {
    const [nomeCompleto, setNomeCompleto] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    // Hook para navegar para outra página (ex: login) após o sucesso
    const navigate = useNavigate();

    // Transforma a função em assíncrona para usar 'await'
    const handleRegister = async (e) => {
        e.preventDefault();

        // 1. Validação do Frontend (você já tinha)
        if (!nomeCompleto || !email || !password || !confirmPassword) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        if (password !== confirmPassword) {
            alert('As senhas não coincidem. Por favor, verifique.');
            return;
        }

        // 2. Monta o payload para a API
        // Note a mudança: de 'nomeCompleto' para 'name', como a API parece esperar
        // (baseado no schema "Educator" que tem "name")
        const payload = {
            name: nomeCompleto,
            email: email,
            password: password
        };

        // 3. Bloco try/catch para a chamada da API
        try {
            // URL completa da sua API (baseado no seu OpenAPI)
            const API_URL = 'http://localhost:3000/educators/register';

            // Chama a API com o método POST
            const response = await axios.post(API_URL, payload);

            // 4. Lida com o Sucesso (HTTP 201)
            console.log('Resposta da API:', response.data);
            alert('Cadastro realizado com sucesso!');
            
            // Limpa os campos
            setNomeCompleto('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');

            // Opcional: Redireciona para a página de login
            navigate('/'); 

        } catch (error) {
            // 5. Lida com o Erro (HTTP 400 ou outros)
            console.error('Erro ao cadastrar:', error);

            if (error.response) {
                // O servidor respondeu com um erro (ex: email já existe)
                // A mensagem de erro específica do seu backend pode estar em error.response.data.message
                const errorMessage = error.response.data?.message || 'Email já em uso ou dados inválidos.';
                alert(`Erro no cadastro: ${errorMessage}`);
            } else if (error.request) {
                // A requisição foi feita, mas não houve resposta (servidor offline?)
                alert('Erro de conexão. O servidor parece estar offline.');
            } else {
                // Erro ao montar a requisição
                alert(`Erro: ${error.message}`);
            }
        }
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