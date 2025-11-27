import React from "react";
import "./styles.css"; 
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import iconNotification from "../../assets/images/icon_notification.png";
import iconProfile from "../../assets/images/icon_profile.png";
import iconArrowLeft from "../../assets/images/seta_icon_esquerda.png";

function ReportSession() {
    const navigate = useNavigate();

   
    const sessionData = {
        title: "Aprendendo as sílabas",
        timeMetrics: [
            { label: "Tempo total da sessão", value: "50 minutos" },
            { label: "Tempo médio de resposta", value: "7 minutos" },
            { label: "Tempo médio para acerto", value: "4 minutos" },
            { label: "Tempo médio para erro", value: "10 minutos" },
        ],
        categoryRates: [
            { label: "Leitura", value: "34%" },
            { label: "Escrita", value: "34%" },
            { label: "Vocabulário", value: "34%" },
            { label: "Compreensão", value: "34%" },
        ],
        activityRates: [
            { label: "Imagem + Áudio", value: "34%" },
            { label: "Imagem", value: "34%" },
            { label: "Áudio", value: "34%" },
            { label: "Texto", value: "34%" },
        ]
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

                  
                    <div className="session-report-card">
                        <h1 className="session-page-title">Sessão: {sessionData.title}</h1>

                       
                        <div className="metrics-white-box-large">
                            <h2 className="box-subtitle">Relação de tempos e taxas</h2>

                            <div className="metrics-split-layout">
                                
                                
                                <div className="metrics-column left-column">
                                    {sessionData.timeMetrics.map((item, index) => (
                                        <div key={index} className="metric-row">
                                            <span className="metric-label-text">{item.label}</span>
                                            <div className="metric-pill-large">{item.value}</div>
                                        </div>
                                    ))}
                                </div>

                           
                                <div className="vertical-separator"></div>

                               
                                <div className="metrics-column right-column">
                                    
                                   
                                    <div className="rates-group">
                                        <h3 className="group-title">Taxa de acerto por categoria</h3>
                                        <div className="rates-grid">
                                            {sessionData.categoryRates.map((item, index) => (
                                                <div key={index} className="rate-item">
                                                    <span className="rate-label">{item.label}</span>
                                                    <div className="metric-pill-medium">{item.value}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    
                                    <div className="rates-group">
                                        <h3 className="group-title">Taxa de acerto por tipo de atividade</h3>
                                        <div className="rates-grid">
                                            {sessionData.activityRates.map((item, index) => (
                                                <div key={index} className="rate-item">
                                                    <span className="rate-label">{item.label}</span>
                                                    <div className="metric-pill-medium">{item.value}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ReportSession;