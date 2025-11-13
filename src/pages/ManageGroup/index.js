import React, { useState } from "react";
import "./style.css";
import logo from "../../assets/images/logo.png";
import iconNotification from "../../assets/images/icon_notification.png";
import iconProfile from "../../assets/images/icon_profile.png";
import iconDoubleCard from "../../assets/images/iconDoublecard.png";
import iconSeta from "../../assets/images/seta_icon.png";
import iconActivitie from "../../assets/images/iconActivitie.png"; // Adicionado para o ícone no modal
import { useNavigate } from "react-router-dom";

// Componente para o ícone de Lixeira
const TrashIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 6H19L18.1245 19.133C18.0544 20.1836 17.1818 21 16.1289 21H7.87111C6.81818 21 5.94558 20.1836 5.87554 19.133L5 6Z" stroke="black" strokeWidth="2"/>
        <path d="M9 6V3H15V6" stroke="black" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M3 6H21" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        <path d="M10 10V17" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        <path d="M14 10V17" stroke="black" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

function ManageGroupPage() {
    const navigate = useNavigate();
    
    // ESTADO DO MODAL
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Lógica para abrir o modal
    const handleGroupClick = (e) => {
        // Se a navegação não for desejada ao clicar no card, use e.stopPropagation()
        // mas aqui focamos em abrir o modal
        setIsModalOpen(true);
    };
    
    // Lógica para fechar o modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Função separada para remover o grupo (evita abertura do modal)
    const handleRemoveGroup = (e) => {
        e.stopPropagation(); // Impede o clique de propagar para o card e abrir o modal
        console.log("Remover GRUPO principal acionado.");
        // Coloque aqui a lógica real de remoção do grupo
    };
    
    // Função para remover uma atividade DENTRO do modal (exemplo)
    const handleRemoveActivityFromGroup = (e) => {
        e.stopPropagation(); 
        console.log("Remover ATIVIDADE do grupo acionado.");
        // Coloque aqui a lógica real de remoção da atividade do grupo
    };
    
    // Função para editar a atividade DENTRO do modal (que seria o clique no card interno)
    const handleEditActivityInModal = () => {
        console.log("Editar atividade do modal acionado.");
        // Navegue para a tela de edição da atividade ou abra outro modal
        // navigate('/editActivityDetails'); 
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

            {/* ======================================================= */}
            {/* INÍCIO DO MODAL */}
            {/* ======================================================= */}
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
                            
                            <div className="activity-card-list"> {/* Reutilizamos o nome da classe para estilização */}
                                {/* Este conteúdo é uma REPETIÇÃO do layout de cards de gerenciamento */}
                                
                                {/* ATIVIDADE 1 */}
                                <div className="group-row-wrapper modal-activity-row">
                                    <div className="group-list-item-card modal-activity-item" onClick={handleEditActivityInModal} style={{ cursor: "pointer" }}>
                                        <img src={iconActivitie} alt="Icone Atividade" className="activity-card-icon" />
                                        <div className="group-card-info">
                                            <h3>Atividade de associação e leitura com animais</h3>
                                            <button className="group-bnt-details">Vocabulário & Leitura</button>
                                        </div>
                                    </div>
                                    <button 
                                        className="remove-group-btn" 
                                        onClick={handleRemoveActivityFromGroup} 
                                        title="Remover Atividade"
                                    >
                                        <TrashIcon />
                                    </button>
                                </div>

                                {/* ATIVIDADE 2 */}
                                <div className="group-row-wrapper modal-activity-row">
                                    <div className="group-list-item-card modal-activity-item" onClick={handleEditActivityInModal} style={{ cursor: "pointer" }}>
                                        <img src={iconActivitie} alt="Icone Atividade" className="activity-card-icon" />
                                        <div className="group-card-info">
                                            <h3>Atividade de associação e leitura com animais</h3>
                                            <button className="group-bnt-details">Escrita</button>
                                        </div>
                                    </div>
                                    <button 
                                        className="remove-group-btn" 
                                        onClick={handleRemoveActivityFromGroup} 
                                        title="Remover Atividade"
                                    >
                                        <TrashIcon />
                                    </button>
                                </div>
                                
                                {/* ATIVIDADE 3 */}
                                <div className="group-row-wrapper modal-activity-row">
                                    <div className="group-list-item-card modal-activity-item" onClick={handleEditActivityInModal} style={{ cursor: "pointer" }}>
                                        <img src={iconActivitie} alt="Icone Atividade" className="activity-card-icon" />
                                        <div className="group-card-info">
                                            <h3>Atividade de associação e leitura com animais</h3>
                                            <button className="group-bnt-details">Leitura</button>
                                        </div>
                                    </div>
                                    <button 
                                        className="remove-group-btn" 
                                        onClick={handleRemoveActivityFromGroup} 
                                        title="Remover Atividade"
                                    >
                                        <TrashIcon />
                                    </button>
                                </div>
                                {/* ATIVIDADE 4 */}
                                <div className="group-row-wrapper modal-activity-row">
                                    <div className="group-list-item-card modal-activity-item" onClick={handleEditActivityInModal} style={{ cursor: "pointer" }}>
                                        <img src={iconActivitie} alt="Icone Atividade" className="activity-card-icon" />
                                        <div className="group-card-info">
                                            <h3>Atividade de associação e leitura com animais</h3>
                                            <button className="group-bnt-details">Leitura</button>
                                        </div>
                                    </div>
                                    <button 
                                        className="remove-group-btn" 
                                        onClick={handleRemoveActivityFromGroup} 
                                        title="Remover Atividade"
                                    >
                                        <TrashIcon />
                                    </button>
                                </div>

                                {/* ATIVIDADE 5 */}
                                <div className="group-row-wrapper modal-activity-row">
                                    <div className="group-list-item-card modal-activity-item" onClick={handleEditActivityInModal} style={{ cursor: "pointer" }}>
                                        <img src={iconActivitie} alt="Icone Atividade" className="activity-card-icon" />
                                        <div className="group-card-info">
                                            <h3>Atividade de associação e leitura com animais</h3>
                                            <button className="group-bnt-details">Leitura</button>
                                        </div>
                                    </div>
                                    <button 
                                        className="remove-group-btn" 
                                        onClick={handleRemoveActivityFromGroup} 
                                        title="Remover Atividade"
                                    >
                                        <TrashIcon />
                                    </button>
                                </div>

                            </div>
                            
                            {/* Rodapé do Modal (Paginação) */}
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
            {/* ======================================================= */}
            {/* FIM DO MODAL */}
            {/* ======================================================= */}


            {/* CONTEÚDO DA PÁGINA PRINCIPAL (ManageGroupPage) */}
            <main className="manage-groups-main-content">
                
                <div className="manage-groups-container">
                    <div className="top-container">
                        <h1>Grupo de atividades</h1>
                        <h2>Gerencie os grupos atividades</h2>
                    </div>
                    <div className="group-card-list">
                        
                        {/* CARD 1 (Grupo principal) */}
                        <div className="group-row-wrapper">
                            <div className="group-list-item-card" onClick={handleGroupClick} style={{ cursor: "pointer" }}>
                                <img src={iconDoubleCard} alt="Avatar" className="group-card-icon" />
                                <div className="group-card-info">
                                    <h3>Atividade de associação e leitura com animais </h3>
                                    <button className="group-bnt-details">Vocabulárion e Leitura</button>
                                </div>
                                <a href="/alunos" className="back-arrow"><img src={iconSeta} alt="seta" className="seta" /></a>
                            </div>
                            <button className="remove-group-btn" onClick={handleRemoveGroup} title="Remover GRUPO">
                                <TrashIcon />
                            </button>
                        </div>
                        
                        {/* CARD 2 (Grupo principal) */}
                        <div className="group-row-wrapper">
                            <div className="group-list-item-card" onClick={handleGroupClick} style={{ cursor: "pointer" }}>
                                <img src={iconDoubleCard} alt="Avatar" className="group-card-icon" />
                                <div className="group-card-info">
                                    <h3>Atividade de associação e leitura com animais </h3>
                                    <button className="group-bnt-details">Vocabulárion e Leitura</button>
                                </div>
                                <a href="/alunos" className="back-arrow"><img src={iconSeta} alt="seta" className="seta" /></a>
                            </div>
                            <button className="remove-group-btn" onClick={handleRemoveGroup} title="Remover GRUPO">
                                <TrashIcon />
                            </button>
                        </div>
                        
                        {/* ... (Outros cards) ... */}
                        <div className="group-row-wrapper">
                            <div className="group-list-item-card" onClick={handleGroupClick} style={{ cursor: "pointer" }}>
                                <img src={iconDoubleCard} alt="Avatar" className="group-card-icon" />
                                <div className="group-card-info">
                                    <h3>Atividade de associação e leitura com animais </h3>
                                    <button className="group-bnt-details">Vocabulárion e Leitura</button>
                                </div>
                                <a href="/alunos" className="back-arrow"><img src={iconSeta} alt="seta" className="seta" /></a>
                            </div>
                            <button className="remove-group-btn" onClick={handleRemoveGroup} title="Remover GRUPO">
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

export default ManageGroupPage;