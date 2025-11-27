import React, { useState } from "react";
import "./style.css";
import logo from "../../assets/images/logo.png";
import iconNotification from "../../assets/images/icon_notification.png";
import iconProfile from "../../assets/images/icon_profile.png";
import iconArrowLeft from "../../assets/images/seta_icon_esquerda.png"; // Icone de seta para voltar
import patientAvatar from "../../assets/images/icon_random.png"; // Ícone de avatar genérico
import iconSeta from "../../assets/images/seta_icon.png"; // Seta para entrar no detalhe
import SearchBar from "../../components/ui/SearchBar/Search";
import { useNavigate } from "react-router-dom";

function SessionPage() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const handleFilterAction = () => {
        console.log("Abrir modal/menu de filtros.");
        // Implemente aqui a lógica para abrir um modal ou menu de filtros
    };
    
    // Dados de exemplo para simular os pacientes
    const patients = [
        { id: 1, name: "João Pedro", age: 8, status: "Alfabetização inicial" },
        { id: 2, name: "Maria Clara", age: 7, status: "Leitura avançada" },
        { id: 3, name: "Lucas Silva", age: 9, status: "Escrita de frases" },
    ];
    
    // Função para lidar com o clique no paciente (iniciar sessão ou ir para detalhes)
    const handlePatientClick = (patientId) => {
        console.log(`Iniciando sessão para o paciente ID: ${patientId}`);
        const nextScreenPath = `/sessionTitle`;
        navigate(nextScreenPath, { state: { patientId: patientId } });
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

            <main className="session-main-content">
                <div className="session-container">
                    <a href="/Home" className="back-arrow-link">
                            <img src={iconArrowLeft} alt="Voltar" className="back-arrow-icon"/>
                    </a>
                    
                    <div className="session-header-top">
                        <h1>Sessão de atendimento</h1>
                        
                        <div className="search-filter-group">
                            {/* Barra de Pesquisa */}
                            <SearchBar 
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                placeholder="Selecione o paciente..." 
                                onFilterClick={handleFilterAction} // Passa a função de filtro
                            />          
                        </div>
                    </div>
                    

                    <div className="select-patient">
                    <h2 className="session-subtitle">Selecione o paciente que realizará a sessão</h2>
                    
                    <div className="patient-card-list">
                        
                        {patients.map((patient) => (
                            <div 
                                key={patient.id}
                                className="patient-list-item-card"
                                onClick={() => handlePatientClick(patient.id)}
                                style={{ cursor: "pointer" }}
                            >
                                <img src={patientAvatar} alt={`Avatar de ${patient.name}`} className="patient-avatar" />
                                <div className="patient-card-info">
                                    <h3>{patient.name}</h3>
                                    <p>{patient.age} anos</p>
                                    <p className="patient-status">{patient.status}</p>
                                </div>
                                
                                <div className="patient-card-action">
                                    {/* Seta para indicar que é clicável */}
                                    <img src={iconSeta} alt="Avançar" className="seta"/>
                                </div>
                            </div>
                        ))}
                        
                    </div>

                    {/* Controles de Paginação (Mantidos do padrão anterior) */}
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
            </main>
        </div>
    );
}

export default SessionPage;