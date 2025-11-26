import React, { useState } from "react";
import "./style.css";
import logo from "../../assets/images/logo.png";
import iconNotification from "../../assets/images/icon_notification.png";
import iconProfile from "../../assets/images/icon_profile.png";
import iconDoubleCard from "../../assets/images/iconDoublecard.png";
import iconSeta from "../../assets/images/seta_icon.png";
import iconActivitie from "../../assets/images/iconActivitie.png";
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

function ManageNotebookPage() {
    const navigate = useNavigate();
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleNotebookClick = (e) => {
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleRemoveNotebook = (e) => {
        e.stopPropagation();
        console.log("Remover CADERNO principal acionado.");
    };
    
    const handleRemoveActivityFromNotebook = (e) => {
        e.stopPropagation(); 
        console.log("Remover ATIVIDADE do CADERNO acionado.");
    };
    
    const handleEditActivityInModal = () => {
        console.log("Editar atividade do modal acionado.");
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

            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        
                        <div className="modal-header">
                            <h2 className="modal-title">Atividades</h2>
                            <button className="modal-close-btn" onClick={closeModal}>
                                &times;
                            </button>
                        </div>
                        
                        <div className="modal-body">
                            
                            <div className="activity-card-list">
                                
                                <div className="notebook-row-wrapper modal-activity-row">
                                    <div className="notebook-list-item-card modal-activity-item" onClick={handleEditActivityInModal} style={{ cursor: "pointer" }}>
                                        <img src={iconActivitie} alt="Icone Atividade" className="activity-card-icon" />
                                        <div className="notebook-card-info">
                                            <h3>Atividade de associação e leitura com animais</h3>
                                            <button className="notebook-bnt-details">Vocabulário & Leitura</button>
                                        </div>
                                    </div>
                                    <button 
                                        className="remove-notebook-activity-btn"
                                        onClick={handleRemoveActivityFromNotebook} 
                                        title="Remover Atividade"
                                    >
                                        <TrashIcon />
                                    </button>
                                </div>

                                <div className="notebook-row-wrapper modal-activity-row">
                                    <div className="notebook-list-item-card modal-activity-item" onClick={handleEditActivityInModal} style={{ cursor: "pointer" }}>
                                        <img src={iconActivitie} alt="Icone Atividade" className="activity-card-icon" />
                                        <div className="notebook-card-info">
                                            <h3>Atividade de associação e leitura com animais</h3>
                                            <button className="notebook-bnt-details">Escrita</button>
                                        </div>
                                    </div>
                                    <button 
                                        className="remove-notebook-activity-btn"
                                        onClick={handleRemoveActivityFromNotebook} 
                                        title="Remover Atividade"
                                    >
                                        <TrashIcon />
                                    </button>
                                </div>
                                
                                <div className="notebook-row-wrapper modal-activity-row">
                                    <div className="notebook-list-item-card modal-activity-item" onClick={handleEditActivityInModal} style={{ cursor: "pointer" }}>
                                        <img src={iconActivitie} alt="Icone Atividade" className="activity-card-icon" />
                                        <div className="notebook-card-info">
                                            <h3>Atividade de associação e leitura com animais</h3>
                                            <button className="notebook-bnt-details">Leitura</button>
                                        </div>
                                    </div>
                                    <button 
                                        className="remove-notebook-activity-btn"
                                        onClick={handleRemoveActivityFromNotebook} 
                                        title="Remover Atividade"
                                    >
                                        <TrashIcon />
                                    </button>
                                </div>
                                
                                <div className="notebook-row-wrapper modal-activity-row">
                                    <div className="notebook-list-item-card modal-activity-item" onClick={handleEditActivityInModal} style={{ cursor: "pointer" }}>
                                        <img src={iconActivitie} alt="Icone Atividade" className="activity-card-icon" />
                                        <div className="notebook-card-info">
                                            <h3>Atividade de associação e leitura com animais</h3>
                                            <button className="notebook-bnt-details">Leitura</button>
                                        </div>
                                    </div>
                                    <button 
                                        className="remove-notebook-activity-btn"
                                        onClick={handleRemoveActivityFromNotebook} 
                                        title="Remover Atividade"
                                    >
                                        <TrashIcon />
                                    </button>
                                </div>

                                <div className="notebook-row-wrapper modal-activity-row">
                                    <div className="notebook-list-item-card modal-activity-item" onClick={handleEditActivityInModal} style={{ cursor: "pointer" }}>
                                        <img src={iconActivitie} alt="Icone Atividade" className="activity-card-icon" />
                                        <div className="notebook-card-info">
                                            <h3>Atividade de associação e leitura com animais</h3>
                                            <button className="notebook-bnt-details">Leitura</button>
                                        </div>
                                    </div>
                                    <button 
                                        className="remove-notebook-activity-btn"
                                        onClick={handleRemoveActivityFromNotebook} 
                                        title="Remover Atividade"
                                    >
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
                        
                    </div>
                </div>
            )}
            
            <main className="manage-notebook-main-content">
                
                <div className="manage-notebook-container">
                    <div className="top-container">
                        <h1>Gerenciar cadernos</h1>
                        <h2>Gerencie os cadernos</h2>
                    </div>
                    <div className="notebook-card-list">
                        
                        <div className="notebook-row-wrapper">
                            <div className="notebook-list-item-card" onClick={handleNotebookClick} style={{ cursor: "pointer" }}>
                                <img src={iconDoubleCard} alt="Avatar" className="notebook-card-icon" />
                                <div className="notebook-card-info">
                                    <h3>Caderno de associação e leitura com animais </h3>
                                    <button className="notebook-bnt-details">Vocabulárion e Leitura</button>
                                </div>
                                <a href="/alunos" className="back-arrow"><img src={iconSeta} alt="seta" className="seta" /></a>
                            </div>
                            <button className="remove-notebook-btn" onClick={handleRemoveNotebook} title="Remover CADERNO">
                                <TrashIcon />
                            </button>
                        </div>
                        
                        <div className="notebook-row-wrapper">
                            <div className="notebook-list-item-card" onClick={handleNotebookClick} style={{ cursor: "pointer" }}>
                                <img src={iconDoubleCard} alt="Avatar" className="notebook-card-icon" />
                                <div className="notebook-card-info">
                                    <h3>Caderno de associação e leitura com animais </h3>
                                    <button className="notebook-bnt-details">Vocabulárion e Leitura</button>
                                </div>
                                <a href="/alunos" className="back-arrow"><img src={iconSeta} alt="seta" className="seta" /></a>
                            </div>
                            <button className="remove-notebook-btn" onClick={handleRemoveNotebook} title="Remover CADERNO">
                                <TrashIcon />
                            </button>
                        </div>
                        
                        <div className="notebook-row-wrapper">
                            <div className="notebook-list-item-card" onClick={handleNotebookClick} style={{ cursor: "pointer" }}>
                                <img src={iconDoubleCard} alt="Avatar" className="notebook-card-icon" />
                                <div className="notebook-card-info">
                                    <h3>Caderno de associação e leitura com animais </h3>
                                    <button className="notebook-bnt-details">Vocabulárion e Leitura</button>
                                </div>
                                <a href="/alunos" className="back-arrow"><img src={iconSeta} alt="seta" className="seta" /></a>
                            </div>
                            <button className="remove-notebook-btn" onClick={handleRemoveNotebook} title="Remover CADERNO">
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

export default ManageNotebookPage;