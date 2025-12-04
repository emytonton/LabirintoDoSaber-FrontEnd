import React, { useEffect, useState } from "react";
import "./styles.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import logo from "../../assets/images/logo.png";
import iconNotification from "../../assets/images/icon_notification.png";
import iconProfile from "../../assets/images/icon_profile.png";
import iconArrowLeft from "../../assets/images/seta_icon_esquerda.png";

const API_BASE_URL = "https://labirinto-do-saber.vercel.app";

function ReportSession() {
    const navigate = useNavigate();
    const location = useLocation();

    // Recebe sessionId da tela anterior
    const { sessionId } = location.state || {};

    const [loading, setLoading] = useState(true);

    const [sessionData, setSessionData] = useState({
        title: "Carregando...",
        timeMetrics: [],
        categoryRates: [],
        activityRates: []
    });

    useEffect(() => {
        if (!sessionId) {
            alert("Erro: sessão não identificada.");
            navigate(-1);
            return;
        }

        const fetchSessionData = async () => {
            try {
                const token = localStorage.getItem("authToken");
                
                const res = await axios.get(
                    `${API_BASE_URL}/task-notebook-session/report/${sessionId}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                const api = res.data;

                if (!api) {
                    throw new Error("Dados vazios retornados pela API.");
                }

                // --- ATUALIZAÇÃO AQUI ---
                // Usa o sessionName vindo do back. Se não tiver, usa "Sessão" + parte do ID.
                const displayTitle = api.sessionName ? api.sessionName : `Sessão ${sessionId.substring(0, 8)}`;

                setSessionData({
                    title: displayTitle, 
                    
                    timeMetrics: [
                        { label: "Tempo total da sessão", value: `${Math.round((api.totalTimeSession || 0) / 60)} minutos` },
                        { label: "Tempo médio de resposta", value: `${Math.round((api.averageTimePerQuestion || 0) / 60)} minutos` },
                        { label: "Tempo médio para acerto", value: `${Math.round((api.averageCorrectTime || 0) / 60)} minutos` },
                        { label: "Tempo médio para erro", value: `${Math.round((api.averageIncorrectTime || 0) / 60)} minutos` },
                    ],

                    categoryRates: api.percentageByCategory ? Object.keys(api.percentageByCategory).map(key => ({
                        label: key,
                        value: `${api.percentageByCategory[key]}%`
                    })) : [],

                    activityRates: api.percentageByType ? Object.keys(api.percentageByType).map(key => ({
                        label: key,
                        value: `${api.percentageByType[key]}%`
                    })) : []
                });

                setLoading(false);

            } catch (err) {
                console.error("Erro ao carregar relatório:", err);
                setLoading(false);
            }
        };

        fetchSessionData();
    }, [sessionId, navigate]);

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
                        <button onClick={() => navigate(-1)} className="back-arrow-link">
                            <img src={iconArrowLeft} alt="Voltar" className="back-arrow-icon" />
                        </button>
                    </div>

                    <div className="session-report-card">
                        {/* Título agora exibe o Nome da Sessão */}
                        <h1 className="session-page-title">
                            {sessionData.title}
                        </h1>

                        {loading ? (
                            <div style={{ textAlign: "center", marginTop: "40px" }}>
                                <p>Gerando relatório...</p>
                            </div>
                        ) : (
                            <div className="metrics-white-box-large">
                                <h2 className="box-subtitle">Relação de tempos e taxas</h2>

                                <div className="metrics-split-layout">

                                    {/* COLUNA ESQUERDA */}
                                    <div className="metrics-column left-column">
                                        {sessionData.timeMetrics.map((item, i) => (
                                            <div key={i} className="metric-row">
                                                <span className="metric-label-text">{item.label}</span>
                                                <div className="metric-pill-large">{item.value}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="vertical-separator"></div>

                                    {/* COLUNA DIREITA */}
                                    <div className="metrics-column right-column">

                                        {/* CATEGORIAS */}
                                        <div className="rates-group">
                                            <h3 className="group-title">Taxa de acerto por categoria</h3>
                                            <div className="rates-grid">
                                                {sessionData.categoryRates.length > 0 ? (
                                                    sessionData.categoryRates.map((item, i) => (
                                                        <div key={i} className="rate-item">
                                                            <span className="rate-label">{item.label}</span>
                                                            <div className="metric-pill-medium">{item.value}</div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p style={{fontSize:'14px', color:'#999'}}>Sem dados de categoria</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* TIPOS */}
                                        <div className="rates-group">
                                            <h3 className="group-title">Taxa de acerto por tipo de atividade</h3>
                                            <div className="rates-grid">
                                                {sessionData.activityRates.length > 0 ? (
                                                    sessionData.activityRates.map((item, i) => (
                                                        <div key={i} className="rate-item">
                                                            <span className="rate-label">{item.label}</span>
                                                            <div className="metric-pill-medium">{item.value}</div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p style={{fontSize:'14px', color:'#999'}}>Sem dados de tipo</p>
                                                )}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ReportSession;