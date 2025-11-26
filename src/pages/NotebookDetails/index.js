import React, { useState } from "react";
import "./style.css";
import logo from "../../assets/images/logo.png";
import iconNotification from "../../assets/images/icon_notification.png";
import iconProfile from "../../assets/images/icon_profile.png";
import iconSeta from "../../assets/images/seta_icon.png";
import iconDoubleCard from "../../assets/images/iconDoublecard.png"; 
import { useNavigate } from "react-router-dom";

const TrashIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 6H19L18.1245 19.133C18.0544 20.1836 17.1818 21 16.1289 21H7.87111C6.81818 21 5.94558 20.1836 5.87554 19.133L5 6Z" stroke="black" strokeWidth="2"/>
        <path d="M9 6V3H15V6" stroke="black" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M3 6H21" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        <path d="M10 10V17" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        <path d="M14 10V17" stroke="black" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

function NotebookDetailsPage() {
    const navigate = useNavigate();
    
    // Simula a lista de atividades dentro deste caderno
    const handleActivityClick = (e) => { 
        console.log("Navegar para detalhes da atividade.");
        // Ex: navigate("/activityDetails/1");
    };
    
    // Função para remover a atividade do caderno
    const handleRemoveActivity = (e) => {
        e.stopPropagation();
        console.log("Remover atividade do caderno acionado.");
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
                    <a href="#" className="nav-link">
                        Relatórios
                    </a>
                </nav>
                <div className="user-controls">
                    <img src={iconNotification} alt="Notificações" className="icon" />
                    <img src={iconProfile} alt="Perfil" className="icon profile-icon" />
                </div>
            </header>

            <main className="notebook-details-main-content">
                
                <div className="notebook-details-container">
                    <div className="top-container">
                        <h1>Caderno: Aprendizagem das sílabas</h1>
                        <button 
                        className="add-group-btn" 
                        onClick={ () => navigate('/GroupSelect') }
                        >
                        Adicionar novo grupo
                        </button>
                    </div>
                    <div className="details-activity-list">
                        
                        {/* ATIVIDADE 1 */}
                        <div className="activity-details-row-wrapper">
                            <div className="activity-details-list-item-card" onClick={handleActivityClick} style={{ cursor: "pointer" }}>
                                <img src={iconDoubleCard} alt="icone" className="activity-details-card-icon" />
                                <div className="activity-details-card-info">
                                    <h3>Atividade de associação e leitura com animais </h3>
                                    <button className="activity-details-bnt-details">Vocabulárion e Leitura</button>
                                </div>
                                <a href="/alunos" className="back-arrow"><img src={iconSeta} alt="seta" className="seta" /></a>
                            </div>
                            <button className="remove-activity-btn" onClick={handleRemoveActivity} title="Remover Atividade">
                                <TrashIcon />
                            </button>
                        </div>
                        
                        {/* ATIVIDADE 2 */}
                        <div className="activity-details-row-wrapper">
                            <div className="activity-details-list-item-card" onClick={handleActivityClick} style={{ cursor: "pointer" }}>
                                <img src={iconDoubleCard} alt="icone" className="activity-details-card-icon" />
                                <div className="activity-details-card-info">
                                    <h3>Atividade de associação e leitura com animais </h3>
                                    <button className="activity-details-bnt-details">Escrita</button>
                                </div>
                                <a href="/alunos" className="back-arrow"><img src={iconSeta} alt="seta" className="seta" /></a>
                            </div>
                            <button className="remove-activity-btn" onClick={handleRemoveActivity} title="Remover Atividade">
                                <TrashIcon />
                            </button>
                        </div>
                        
                        {/* ATIVIDADE 3 */}
                        <div className="activity-details-row-wrapper">
                            <div className="activity-details-list-item-card" onClick={handleActivityClick} style={{ cursor: "pointer" }}>
                                <img src={iconDoubleCard} alt="icone" className="activity-details-card-icon" />
                                <div className="activity-details-card-info">
                                    <h3>Atividade de associação e leitura com animais </h3>
                                    <button className="activity-details-bnt-details">Leitura</button>
                                </div>
                                <a href="/alunos" className="back-arrow"><img src={iconSeta} alt="seta" className="seta" /></a>
                            </div>
                            <button className="remove-activity-btn" onClick={handleRemoveActivity} title="Remover Atividade">
                                <TrashIcon />
                            </button>
                        </div>

                    </div>
                    <div className="pagination-controls">
                        <a href="#" className="page-arrow">&lt;</a>
                        <a href="#" className="page-number active">1</a>
                        <a href="#" className="page-number">2</a>
                        <a href="#" className="page-number">3</a>
                        <a href="#" className="page-number">4</a>
                        <a href="#" className="page-arrow">&gt;</a>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default NotebookDetailsPage;