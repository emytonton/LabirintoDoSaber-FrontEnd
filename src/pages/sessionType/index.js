import React, { useState } from "react";
import "./style.css";
import logo from "../../assets/images/logo.png";
import iconNotification from "../../assets/images/icon_notification.png";
import iconProfile from "../../assets/images/icon_profile.png";
import iconArrowLeft from "../../assets/images/seta_icon_esquerda.png";
import iconSeta from "../../assets/images/seta_icon.png";
import iconCaderno from "../../assets/images/iconDoublecard.png"; // Ícone de Caderno
import iconCard from "../../assets/images/caderneta.png"; 
import iconActivity from "../../assets/images/iconActivitie.png"; // Ícone de Atividade
import { useNavigate } from "react-router-dom";

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
    
    // Funções de navegação para cada opção
    const handleSelectNotebooks = () => {
        console.log("Navegar para Seleção de Cadernos.");
        navigate('/sessionNotebook'); 
    };

    const handleSelectGroups = () => {
        console.log("Navegar para Seleção de Grupos de Atividades.");
        navigate('/sessionGroup'); 
    };

    const handleSelectActivities = () => {
        console.log("Navegar para Seleção de Atividades Individuais.");
        navigate('/sessionActivities'); 
    };
    
    const handleBack = () => {
       navigate('/sessionTitle');
    };

    return (
        <div className="dashboard-container">
            <header className="header">
                <img src={logo} alt="Labirinto do Saber" className="logo" />
                <nav className="navbar">
                    <a href="/home" className="nav-link">
                        Dashboard
                    </a>
                    <a href="/activitiesMain" className="nav-link active">
                        Atividades
                    </a>
                    <a href="/alunos" className="nav-link">
                        Alunos
                    </a>
                    <a href="/MainReport" className="nav-link">
                        Relatórios
                    </a>
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