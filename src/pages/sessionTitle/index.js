import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Importe useLocation
import "./style.css";
import logo from "../../assets/images/logo.png";
import iconNotification from "../../assets/images/icon_notification.png";
import iconProfile from "../../assets/images/icon_profile.png";
import iconArrowLeft from "../../assets/images/seta_icon_esquerda.png"; 

// SVG da caneta (PenIcon)
const PenIcon = () => (
    <svg width="34" height="26" viewBox="0 0 34 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.12634 17C5.04271 17.6571 5 18.325 5 19V21M5.12634 17C6.03384 9.86861 11.7594 4 20 4L19 8H16L17 10L15 12H11L13 14L12 16H8L5.12634 17Z" stroke="black"/>
    </svg>
);

function SessionTitlePage() {
    const navigate = useNavigate();
    const location = useLocation(); // Hook para acessar o estado da navegação
    const [sessionName, setSessionName] = useState("");
    const [patientId, setPatientId] = useState(null); // Estado para armazenar o ID do paciente

    useEffect(() => {
        // Pega o patientId que pode ter sido passado via state da navegação
        if (location.state && location.state.patientId) {
            setPatientId(location.state.patientId);
            console.log("ID do Paciente recebido:", location.state.patientId);
        }
    }, [location]);

    const handleNext = () => {
        if (sessionName.trim() === "") {
            alert("Por favor, dê um nome à sessão.");
            return;
        }
        console.log(`Nome da sessão: ${sessionName}, para o paciente ID: ${patientId}`);
        navigate('/sessionType', { state: { sessionName, patientId } });
    };

    const handleBack = () => {
        navigate('/session');
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

            <main className="start-session-main-content">
                <div className="start-session-container">
                        <button onClick={handleBack} className="back-arrow-button">
                            <img src={iconArrowLeft} alt="Voltar" className="back-arrow-icon"/>
                        </button>
                    <div className="start-session-header-top">
                        <h1>Sessão de atendimento</h1>
                    </div>
                    
                    <div className="session-name-card">
                        <p className="card-instruction">Dê um nome à sessão <span className="required-asterisk">*</span></p>
                        
                        <div className="input-with-icon">
                            <PenIcon />
                            <input
                                type="text"
                                placeholder="Preencha aqui..."
                                value={sessionName}
                                onChange={(e) => setSessionName(e.target.value)}
                                className="session-name-input"
                            />
                        </div>
                        
                        <button className="next-button" onClick={handleNext}>
                            Próximo
                        </button>
                    </div>

                </div>
            </main>
        </div>
    );
}

export default SessionTitlePage;