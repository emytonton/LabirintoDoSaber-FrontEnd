import React, { useState } from "react";
import "./styles.css"; 
import { useNavigate } from "react-router-dom";


import logo from "../../assets/images/logo.png";
import iconNotification from "../../assets/images/icon_notification.png";
import iconProfile from "../../assets/images/icon_profile.png";
import iconArrowLeft from "../../assets/images/seta_icon_esquerda.png";
import patientAvatar from "../../assets/images/icon_random.png"; 
import iconSeta from "../../assets/images/seta_icon.png";
import iconSession from "../../assets/images/icon_profile.png"; 
import SearchBar from "../../components/ui/SearchBar/Search";
import Pleople from "../../assets/images/people.png"

function ReportPacient() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    
  
    const studentInfo = {
        name: "Lucas Silva",
        age: 7,
        level: "Alfabetização inicial"
    };

    const sessions = [
        { id: 1, title: "Sessão:", subtitle: "Aprendendo as sílabas" },
        { id: 2, title: "Sessão:", subtitle: "Aprendendo as sílabas" },
        { id: 3, title: "Sessão:", subtitle: "Aprendendo as sílabas" },
    ];


    const handleSessionClick = (sessionId) => {
   
        navigate("/ReportSession", { state: { sessionId } });
    };

    return (
        <div className="dashboard-container">
       
            <header className="header">
                <img src={logo} alt="Labirinto do Saber" className="logo" />
                <nav className="navbar">
                    <a href="/home" className="nav-link">Dashboard</a>
                    <a href="/activitiesMain" className="nav-link">Atividades</a>
                    <a href="/alunos" className="nav-link">Alunos</a>
                    <a href="/MainReport" className="nav-link active">Relatórios</a>
                </nav>
                <div className="user-controls">
                    <img src={iconNotification} alt="Notificações" className="icon" />
                    <img src={iconProfile} alt="Perfil" className="icon profile-icon" />
                </div>
            </header>

            <main className="session-main-content">
                <div className="session-container">
                    
                  
                    <div className="top-nav-row">
                        <a href="#" onClick={(e) => { e.preventDefault(); navigate(-1); }} className="back-arrow-link">
                            <img src={iconArrowLeft} alt="Voltar" className="back-arrow-icon" />
                        </a>
                    </div>

                   
                    <div className="student-report-card">
                        
                   
                        <div className="student-header-info">
                            <div className="student-profile-left">
                                <img src={patientAvatar} alt={studentInfo.name} className="big-avatar" />
                                <div className="student-text">
                                    <h2>{studentInfo.name}</h2>
                                    <p>{studentInfo.age} anos</p>
                                    <p className="student-level">{studentInfo.level}</p>
                                </div>
                            </div>
                            <div className="student-search-area">
                                <SearchBar
                                    searchTerm={searchTerm}
                                    setSearchTerm={setSearchTerm}
                                    placeholder="Pesquisar sessão..."
                                />
                            </div>
                        </div>

                     
                        <div className="sessions-white-box">
                            <h3 className="section-title">Sessões de atendimentos</h3>
                            
                            <div className="sessions-list">
                                {sessions.map((session) => (
                                    <div 
                                        key={session.id} 
                                        className="session-item"
                                        onClick={() => handleSessionClick(session.id)} 
                                        style={{ cursor: "pointer" }}
                                    >
                                        <div className="session-icon-box">
                                            <img src={iconSession} alt="Icone Sessão" className="session-icon-img"/> 
                                        </div>
                                        <div className="session-info">
                                            <h4>{session.title}</h4>
                                            <p>{session.subtitle}</p>
                                        </div>
                                        <img src={iconSeta} alt="Ver detalhes" className="arrow-right" />
                                    </div>
                                ))}
                            </div>

                    
                            <div className="pagination-controls simple-pagination">
                                <button className="page-arrow">&lt;</button>
                                <button className="page-number active">1</button>
                                <button className="page-number">2</button>
                                <button className="page-number">3</button>
                                <button className="page-number">4</button>
                                <button className="page-arrow">&gt;</button>
                            </div>
                        </div>

                     
                        <div className="dashboard-metrics-section">
                            <h3 className="section-title">Dashboard</h3>
                            
                            <div className="metrics-grid">
                                <div className="metric-item">
                                    <span className="metric-label">Sessões de atendimento</span>
                                    <div className="metric-pill">50 min</div>
                                    <span className="metric-sub">(Tempo médio)</span>
                                </div>
                                <div className="vertical-divider"></div>

                                <div className="metric-item">
                                    <span className="metric-label">Porcentagem de acertos</span>
                                    <div className="metric-pill">80%</div>
                                    <span className="metric-sub">(Porcentagem)</span>
                                </div>
                                <div className="vertical-divider"></div>

                                <div className="metric-item">
                                    <span className="metric-label">Tempo médio para acerto</span>
                                    <div className="metric-pill">5 min</div>
                                    <span className="metric-sub">(Porcentagem)</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}

export default ReportPacient;