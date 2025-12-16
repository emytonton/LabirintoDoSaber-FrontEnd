import React, { useState } from "react";
import "./style.css";
import logo from "../../assets/images/logo.png";
import iconNotification from "../../assets/images/icon_notification.png";
import iconProfile from "../../assets/images/icon_profile.png";
import iconDoubleCard from "../../assets/images/iconDoublecard.png";
import iconSeta from "../../assets/images/seta_icon.png";
import iconActivitie from "../../assets/images/iconActivitie.png";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/ui/NavBar/index.js";
const TrashIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 6H19L18.1245 19.133C18.0544 20.1836 17.1818 21 16.1289 21H7.87111C6.81818 21 5.94558 20.1836 5.87554 19.133L5 6Z" stroke="black" strokeWidth="2"/>
        <path d="M9 6V3H15V6" stroke="black" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M3 6H21" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        <path d="M10 10V17" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        <path d="M14 10V17" stroke="black" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

function GroupSelectPage() {
    const navigate = useNavigate();
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleGroupSelectClick = (e) => {
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleRemoveGroupSelect = (e) => {
        e.stopPropagation();
        console.log("Remover GROUP SELECT principal acionado.");
    };
    
    const handleRemoveActivityFromGroupSelect = (e) => {
        e.stopPropagation(); 
        console.log("Remover ATIVIDADE do GROUP SELECT acionado.");
    };
    
    const handleEditActivityInModal = () => {
        console.log("Editar atividade do modal acionado.");
    };

    return (
        <div className="dashboard-container">
            <Navbar activePage="activities" />

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
                                
                                <div className="group-select-row-wrapper modal-activity-row">
                                    <div className="group-select-list-item-card modal-activity-item" onClick={handleEditActivityInModal} style={{ cursor: "pointer" }}>
                                        <img src={iconActivitie} alt="Icone Atividade" className="activity-card-icon" />
                                        <div className="group-select-card-info">
                                            <h3>Atividade de associação e leitura com animais</h3>
                                            <button className="group-select-bnt-details">Vocabulário & Leitura</button>
                                        </div>
                                    </div>
                                    <button 
                                        className="remove-group-select-btn" 
                                        onClick={handleRemoveActivityFromGroupSelect} 
                                        title="Remover Atividade"
                                    >
                                        <TrashIcon />
                                    </button>
                                </div>

                                <div className="group-select-row-wrapper modal-activity-row">
                                    <div className="group-select-list-item-card modal-activity-item" onClick={handleEditActivityInModal} style={{ cursor: "pointer" }}>
                                        <img src={iconActivitie} alt="Icone Atividade" className="activity-card-icon" />
                                        <div className="group-select-card-info">
                                            <h3>Atividade de associação e leitura com animais</h3>
                                            <button className="group-select-bnt-details">Escrita</button>
                                        </div>
                                    </div>
                                    <button 
                                        className="remove-group-select-btn" 
                                        onClick={handleRemoveActivityFromGroupSelect} 
                                        title="Remover Atividade"
                                    >
                                        <TrashIcon />
                                    </button>
                                </div>
                                
                                <div className="group-select-row-wrapper modal-activity-row">
                                    <div className="group-select-list-item-card modal-activity-item" onClick={handleEditActivityInModal} style={{ cursor: "pointer" }}>
                                        <img src={iconActivitie} alt="Icone Atividade" className="activity-card-icon" />
                                        <div className="group-select-card-info">
                                            <h3>Atividade de associação e leitura com animais</h3>
                                            <button className="group-select-bnt-details">Leitura</button>
                                        </div>
                                    </div>
                                    <button 
                                        className="remove-group-select-btn" 
                                        onClick={handleRemoveActivityFromGroupSelect} 
                                        title="Remover Atividade"
                                    >
                                        <TrashIcon />
                                    </button>
                                </div>

                                <div className="group-select-row-wrapper modal-activity-row">
                                    <div className="group-select-list-item-card modal-activity-item" onClick={handleEditActivityInModal} style={{ cursor: "pointer" }}>
                                        <img src={iconActivitie} alt="Icone Atividade" className="activity-card-icon" />
                                        <div className="group-select-card-info">
                                            <h3>Atividade de associação e leitura com animais</h3>
                                            <button className="group-select-bnt-details">Leitura</button>
                                        </div>
                                    </div>
                                    <button 
                                        className="remove-group-select-btn" 
                                        onClick={handleRemoveActivityFromGroupSelect} 
                                        title="Remover Atividade"
                                    >
                                        <TrashIcon />
                                    </button>
                                </div>

                                <div className="group-select-row-wrapper modal-activity-row">
                                    <div className="group-select-list-item-card modal-activity-item" onClick={handleEditActivityInModal} style={{ cursor: "pointer" }}>
                                        <img src={iconActivitie} alt="Icone Atividade" className="activity-card-icon" />
                                        <div className="group-select-card-info">
                                            <h3>Atividade de associação e leitura com animais</h3>
                                            <button className="group-select-bnt-details">Leitura</button>
                                        </div>
                                    </div>
                                    <button 
                                        className="remove-group-select-btn" 
                                        onClick={handleRemoveActivityFromGroupSelect} 
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


            <main className="manage-group-select-main-content">
                
                <div className="manage-group-select-container">
                    <div className="top-container">
                        <h1>Grupo de atividades</h1>
                        <h2>Selecione o grupo</h2>
                    </div>
                    <div className="group-select-card-list">
                        
                        <div className="group-select-row-wrapper">
                            <div className="group-select-list-item-card" onClick={handleGroupSelectClick} style={{ cursor: "pointer" }}>
                                <img src={iconDoubleCard} alt="Avatar" className="group-select-card-icon" />
                                <div className="group-select-card-info">
                                    <h3>Atividade de associação e leitura com animais </h3>
                                    <button className="group-select-bnt-details">Vocabulárion e Leitura</button>
                                </div>
                                <a href="/alunos" className="back-arrow"><img src={iconSeta} alt="seta" className="seta" /></a>
                            </div>
                            <button className="remove-group-select-btn" onClick={handleRemoveGroupSelect} title="Remover GRUPO">
                                <TrashIcon />
                            </button>
                        </div>
                        
                        <div className="group-select-row-wrapper">
                            <div className="group-select-list-item-card" onClick={handleGroupSelectClick} style={{ cursor: "pointer" }}>
                                <img src={iconDoubleCard} alt="Avatar" className="group-select-card-icon" />
                                <div className="group-select-card-info">
                                    <h3>Atividade de associação e leitura com animais </h3>
                                    <button className="group-select-bnt-details">Vocabulárion e Leitura</button>
                                </div>
                                <a href="/alunos" className="back-arrow"><img src={iconSeta} alt="seta" className="seta" /></a>
                            </div>
                            <button className="remove-group-select-btn" onClick={handleRemoveGroupSelect} title="Remover GRUPO">
                                <TrashIcon />
                            </button>
                        </div>
                        
                        <div className="group-select-row-wrapper">
                            <div className="group-select-list-item-card" onClick={handleGroupSelectClick} style={{ cursor: "pointer" }}>
                                <img src={iconDoubleCard} alt="Avatar" className="group-select-card-icon" />
                                <div className="group-select-card-info">
                                    <h3>Atividade de associação e leitura com animais </h3>
                                    <button className="group-select-bnt-details">Vocabulárion e Leitura</button>
                                </div>
                                <a href="/alunos" className="back-arrow"><img src={iconSeta} alt="seta" className="seta" /></a>
                            </div>
                            <button className="remove-group-select-btn" onClick={handleRemoveGroupSelect} title="Remover GRUPO">
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

export default GroupSelectPage;