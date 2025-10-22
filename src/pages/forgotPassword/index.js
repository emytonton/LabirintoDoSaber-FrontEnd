import React, { useState } from 'react';
import './style.css';

import Button from '../../components/ui/ButtonYellow/Button';
import Input from '../../components/ui/InputWhite/Input';
import { Link } from 'react-router-dom';

function ForgotPasswordPage() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');

    const handleSendCode = (e) => {
        e.preventDefault();
        
        if (!email) {
            alert('Por favor, digite seu e-mail.');
            return;
        }

        console.log('Solicitação de código para:', email);
        
        alert(`Solicitação de código enviada para ${email}.`);
        setStep(2); 
    };

    const handlePasswordRecovery = (e) => {
        e.preventDefault();

        if (!code) {
            alert('Por favor, insira o código recebido.');
            return;
        }

        console.log('Tentativa de recuperação com código:', code);
        
        alert('Código verificado! Redirecionando para alteração de senha...');
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

    const renderStep1 = () => (
        <>
            {renderLockIcon()}
            
            <h1 className="forgot-title">Problemas para logar?</h1>
            
            <p className="forgot-info">
                Insira o seu email e enviaremos um link para você voltar a acessar a sua conta.
            </p>
            
            <Input
                label="Email:"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <Button type="submit">
                Receber código
            </Button>
            
            <div className="separator-line"></div>
            <Link to="/Register "className="create-account-link">
                Criar nova conta
            </Link>
        </>
    );

    const renderStep2 = () => (
        <>
            {renderLockIcon()}
            
            <h1 className="forgot-title">Insira o código recebido</h1>
            
            <Input
                label="" 
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="AED340G" 
            />

            <Button type="submit">
                Recuperar senha
            </Button>
        </>
    );

    return (
        <div className="forgot-page-container">
            <div className="form-side">
                <div 
                    className={`forgot-form-container ${step === 2 ? 'smaller-container' : ''}`}
                >
                    
                    <form onSubmit={step === 1 ? handleSendCode : handlePasswordRecovery}>
                        
                        {step === 1 ? renderStep1() : renderStep2()}
                        
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ForgotPasswordPage;