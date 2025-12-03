import React, { useState, useEffect } from "react";
import "./style.css";
import logo from "../../assets/images/logo.png";
import iconNotification from "../../assets/images/icon_notification.png";
import iconProfile from "../../assets/images/icon_profile.png";
import iconArrowLeft from "../../assets/images/seta_icon_esquerda.png";
import iconSeta from "../../assets/images/seta_icon.png";
import iconCaderno from "../../assets/images/iconDoublecard.png"; 
import iconCard from "../../assets/images/caderneta.png"; 
import iconActivity from "../../assets/images/iconActivitie.png"; 
import { useNavigate, useLocation } from "react-router-dom"; // Importe useLocation

// Componente reútil para os botões de opção dentro do card
const OptionButton = ({ label, iconSrc, onClick }) => (
    <button 
        className="session-option-button" 
        onClick={onClick}
    >
        <div className="option-icon-text">
            <img src={iconSrc} alt="Ícone Opção" className="option-icon" />
            <span>{label}</span>
        </div>
        <img src={iconSeta} alt="Avançar" className="seta-next"/>
    </button>
);

function SessionTypePage() {
    const navigate = useNavigate();
    const location = useLocation();
    
    // RECUPERANDO OS DADOS DO FLUXO (Vindos de SessionTitlePage)
    const { studentId, sessionName } = location.state || {};

    useEffect(() => {
        console.log("SessionType - Dados recebidos:", { studentId, sessionName });
        
        // Segurança: Se perdeu os dados, avisa (ou redireciona)
        if (!studentId || !sessionName) {
            console.warn("Atenção: studentId ou sessionName estão faltando!");
        }
    }, [studentId, sessionName]);

    // Funções de navegação AGORA REPASSAM OS DADOS
    const handleSelectNotebooks = () => {
        console.log("Indo para Cadernos com:", { studentId, sessionName });
        navigate('/sessionNotebook', { 
            state: { studentId, sessionName } 
        }); 
    };

    const handleSelectGroups = () => {
        console.log("Indo para Grupos com:", { studentId, sessionName });
        navigate('/sessionGroup', { 
            state: { studentId, sessionName } 
        }); 
    };

    const handleSelectActivities = () => {
        console.log("Indo para Atividades Individuais com:", { studentId, sessionName });
        navigate('/sessionActivities', { 
            state: { studentId, sessionName } 
        }); 
    };
    
    const handleBack = () => {
        // Ao voltar, devolvemos os dados para não perder o preenchimento se possível, 
        // ou apenas voltamos normal.
        navigate('/sessionTitle', { state: { patientId: studentId } }); 
    };

    return (
        <div className="dashboard-container">
            <header className="header">
                <img src={logo} alt="Labirinto do Saber" className="logo" />
                <nav className="navbar">
                    <a href="/home" className="nav-link">Dashboard</a>
                    <a href="/activitiesMain" className="nav-link active">Atividades</a>
                    <a href="/alunos" className="nav-link">Alunos</a>
                    <a href="/MainReport" className="nav-link">Relatórios</a>
                </nav>
                <div className="user-controls">
                    <img src={iconNotification} alt="Notificações" className="icon" />
                    <img src={iconProfile} alt="Perfil" className="icon profile-icon" />
                </div>
            </header>

            <main className="session-options-main-content">
                <div className="session-options-container">
                        <button onClick={handleBack} className="back-arrow-button">
                            <img src={iconArrowLeft} alt="Voltar" className="back-arrow-icon"/>
                        </button>
                    <div className="session-options-header-top">
                        <h1>Sessão de atendimento</h1>
                    </div>
                    
                    <div className="selection-card">
                        <h2 className="card-title-instruction">Como gostaria de começar?</h2>
                        
                        <div className="options-list">
                            <OptionButton 
                                label="Selecionar Cadernos"
                                iconSrc={iconCard}
                                onClick={handleSelectNotebooks}
                            />
                            <OptionButton 
                                label="Selecionar Grupo de Atividades"
                                iconSrc={iconCaderno}
                                onClick={handleSelectGroups}
                            />
                            <OptionButton 
                                label="Selecionar Atividades"
                                iconSrc={iconActivity}
                                onClick={handleSelectActivities}
                            />
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}

export default SessionTypePage;