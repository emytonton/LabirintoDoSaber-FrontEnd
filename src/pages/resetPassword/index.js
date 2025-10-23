import React, { useState } from 'react';
import './style.css';

import Button from '../../components/ui/ButtonYellow/Button';

function ResetPasswordPage() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleResetPassword = (e) => {
        e.preventDefault();
        setError('');

        if (!password || !confirmPassword) {
            setError('Todos os campos são obrigatórios.');
            return;
        }

        if (password !== confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }

        if (password.length < 6) {
            setError('A senha deve ter pelo menos 6 caracteres.');
            return;
        }

        console.log('Redefinindo senha com a nova senha...');
        alert('Senha redefinida com sucesso! Redirecionando para o login.');

        setPassword('');
        setConfirmPassword('');
    };

    const renderLockIcon = () => (
        <div className="lock-icon-wrapper">
            <div className="lock-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="5" y="11" width="14" height="10" rx="1" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 8C7 5.23858 9.23858 3 12 3V3C14.7614 3 17 5.23858 17 8V11H7V8Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div> 
        </div>
    );

    return (
        <div className="reset-page-container">
            <div className="form-side">
                <div className="reset-form-container">
                    
                    <form onSubmit={handleResetPassword}>
                        
                        {renderLockIcon()}
                        
                        <h1 className="reset-title">Redefina a sua senha</h1>
                        
                        {error && <p className="error-message">{error}</p>}
                        
                        <div className="input-group">
                            <label className="input-label">Insira sua nova senha:</label>
                            <input
                                className="custom-input"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-label">Confirme a sua nova senha:</label>
                            <input
                                className="custom-input"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <Button type="submit">
                            Redefinir senha
                        </Button>
                        
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ResetPasswordPage;