import React, { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
import logo from "../../assets/images/logo.png";
import iconNotification from "../../assets/images/icon_notification.png";
import iconProfile from "../../assets/images/icon_profile.png";
import iconArrowLeft from "../../assets/images/seta_icon_esquerda.png";
import iconActivity from "../../assets/images/iconActivitie.png"; 
import SearchBar from "../../components/ui/SearchBar/Search";
import { useNavigate, useLocation } from "react-router-dom"; 

// --- ÍCONES (Mantidos iguais) ---

const PlusIcon = () => (
    <svg width="25" height="25" viewBox="0 0 65 69" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_398_2393)">
            <path d="M46.0418 32.5003H18.9585" stroke="black" strokeLinecap="round"/>
            <path d="M32.4998 46.0413V18.958" stroke="black" strokeLinecap="round"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M32.4998 59.5837C47.4575 59.5837 59.5832 47.458 59.5832 32.5003C59.5832 17.5426 47.4575 5.41699 32.4998 5.41699C17.5421 5.41699 5.4165 17.5426 5.4165 32.5003C5.4165 47.458 17.5421 59.5837 32.4998 59.5837Z" stroke="black"/>
        </g>
        <defs>
            <filter id="filter0_d_398_2393" x="-4" y="0" width="73" height="73" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_398_2393"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_398_2393" result="shape"/>
            </filter>
        </defs>
    </svg>
);

const CheckIcon = () => (
    <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

function SessionActivitiesPage() {
    const navigate = useNavigate();
    const location = useLocation();

    // 1. RECUPERANDO DADOS DO FLUXO (Student e SessionName)
    const { studentId, sessionName } = location.state || {};

    // Estados
    const [activities, setActivities] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true); 
    const [isStarting, setIsStarting] = useState(false);
    
    // ESTADO DE SELEÇÃO ÚNICA
    const [selectedActivity, setSelectedActivity] = useState(null);

    // Paginação
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const categoryMap = {
        reading: "Vocabulário & Leitura",
        writing: "Escrita",
        vocabulary: "Vocabulário",
        comprehension: "Compreensão, Leitura & Vocabulário",
        general: "Geral"
    };

    // --- VERIFICAÇÃO DE SEGURANÇA DO FLUXO ---
    useEffect(() => {
        // AVISO: Mantive o aviso, mas não redireciono forçado para facilitar seus testes
        if (!studentId || !sessionName) {
            console.warn("Dados da sessão ausentes (Modo Teste).");
        }
    }, [studentId, sessionName]);

    // --- INTEGRANDO A API (LISTAR ATIVIDADES) ---
    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const token = localStorage.getItem('authToken');
                // Se estiver apenas testando visualmente e não tiver token, pode comentar a verificação abaixo
                if (!token) {
                    // navigate('/'); 
                    // return;
                }
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };

                const response = await axios.get("https://labirinto-do-saber.vercel.app/task", config);
                
                const formattedData = response.data.map(task => ({
                    id: task.id,
                    name: task.prompt || "Atividade sem título",
                    category: task.category || "general",
                    originalData: task
                }));

                setActivities(formattedData);
                setLoading(false);

            } catch (error) {
                console.error("Erro ao buscar atividades:", error);
                setLoading(false);
            }
        };

        fetchActivities();
    }, [navigate]);


    // Lógica de Seleção Única
    const handleActivitySelection = (activity) => {
        if (selectedActivity && selectedActivity.id === activity.id) {
            setSelectedActivity(null);
        } else {
            setSelectedActivity(activity);
        }
    };

    // --- MODO OFFLINE/TESTE: NAVEGAÇÃO DIRETA ---
    const handleStartSession = () => {
        if (!selectedActivity) {
            alert("Selecione uma atividade.");
            return;
        }

        setIsStarting(true);

        // Simulando um delay pequeno apenas para feedback visual do botão
        setTimeout(() => {
            console.log("Iniciando sessão (MODO TESTE/SEM API)...");
            
            // Navega para a tela de execução com dados Mockados
            navigate(`/sessionInit`, { 
                state: { 
                    sessionId: "sessao-mock-123", // ID Fictício para teste
                    itemType: 'activity',
                    task: selectedActivity.originalData 
                } 
            });
            
            setIsStarting(false);
        }, 500);
    };

    const handleFilterAction = () => {
        console.log("Abrir Filtro de Atividades");
    };

    // --- FILTRO E PAGINAÇÃO ---
    const filteredActivities = activities.filter((activity) => 
        activity.name && activity.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredActivities.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);

    const paginate = (e, pageNumber) => {
        e.preventDefault();
        setCurrentPage(pageNumber);
    };

    return (
        <div className="dashboard-container">
            <header className="header">
                <img src={logo} alt="Labirinto do Saber" className="logo" />

                <nav className="navbar">
                    <a href="/home" className="nav-link">Dashboard</a>
                    <a href="/activitiesMain" className="nav-link active">Atividades</a>
                    <a href="/alunos" className="nav-link">Alunos</a>
                    <a href="/MainReport" className="nav-link">Relatórios</a>
                </nav>

                <div className="user-controls">
                    <img src={iconNotification} alt="Notificações" className="icon" />
                    <img src={iconProfile} alt="Perfil" className="icon profile-icon" />
                </div>
            </header>

            <main className="session-activity-select-main-content">
                <div className="session-activity-select-container">
                        <a href="/sessionType" className="back-arrow-link">
                            <img src={iconArrowLeft} alt="Voltar" className="back-arrow-icon"/>
                        </a>
                    <div className="top-container">
                        <h1>Selecione a atividade desejada</h1>
                        
                        <div className="search-filter-group" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <SearchBar 
                                searchTerm={searchTerm}
                                setSearchTerm={(value) => {
                                    setSearchTerm(value);
                                    setCurrentPage(1);
                                }}
                                placeholder="Buscar atividade..." 
                                onFilterClick={handleFilterAction}
                            />

                            {/* --- BOTÃO DE INICIAR SESSÃO --- */}
                            <button 
                                onClick={handleStartSession}
                                disabled={!selectedActivity || isStarting}
                                style={{
                                    backgroundColor: selectedActivity ? '#81C784' : '#E0E0E0',
                                    color: selectedActivity ? '#FFF' : '#9E9E9E',
                                    border: 'none',
                                    padding: '0 25px',
                                    height: '52px',
                                    borderRadius: '30px',
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                    cursor: (selectedActivity && !isStarting) ? 'pointer' : 'not-allowed',
                                    boxShadow: selectedActivity ? '0px 4px 6px rgba(0,0,0,0.1)' : 'none',
                                    transition: 'all 0.3s ease',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {isStarting ? "Iniciando..." : "Iniciar Sessão"}
                            </button>
                        </div>
                    </div>
                    
                    <div className="session-activity-select-card-list">
                        {loading ? (
                            <p style={{ textAlign: "center", color: "#666" }}>Carregando atividades...</p>
                        ) : (
                            currentItems.length > 0 ? (
                                currentItems.map((activity) => {
                                    const isSelected = selectedActivity && selectedActivity.id === activity.id;

                                    return (
                                        <div className="activity-select-row-wrapper" key={activity.id}>
                                            <div
                                                className="activity-select-list-item-card"
                                                style={{ 
                                                    cursor: "pointer",
                                                    border: isSelected ? "2px solid #81C784" : "2px solid transparent",
                                                    backgroundColor: isSelected ? "#F1F8E9" : "#FFF",
                                                    transition: "all 0.2s ease"
                                                }}
                                                onClick={() => handleActivitySelection(activity)}
                                            >
                                                <img src={iconActivity} alt="Icone Atividade" className="activity-select-card-icon" />
                                                <div className="activity-select-card-info">
                                                    <h3>{activity.name}</h3>
                                                    <button className="activity-select-bnt-details">
                                                        {categoryMap[activity.category] || activity.category}
                                                    </button>
                                                </div>

                                                <button
                                                    className="select-plus-btn"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleActivitySelection(activity);
                                                    }}
                                                    title={isSelected ? "Desmarcar" : "Selecionar"}
                                                    style={{
                                                        backgroundColor: isSelected ? '#81C784' : 'transparent',
                                                        borderRadius: '50%',
                                                        width: '40px',
                                                        height: '40px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        border: 'none',
                                                        transition: 'background-color 0.3s ease'
                                                    }}
                                                >
                                                    {isSelected ? <CheckIcon /> : <PlusIcon />}
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <p style={{ textAlign: "center", marginTop: "20px" }}>
                                    {searchTerm ? "Nenhuma atividade encontrada." : "Nenhuma atividade disponível."}
                                </p>
                            )
                        )}
                    </div>

                    {!loading && filteredActivities.length > 0 && (
                        <div className="pagination-controls">
                            <a 
                                href="#" 
                                className={`page-arrow ${currentPage === 1 ? 'disabled' : ''}`}
                                onClick={(e) => { e.preventDefault(); if(currentPage > 1) setCurrentPage(currentPage - 1); }}
                            > &lt; </a>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <a 
                                    key={index + 1}
                                    href="#" 
                                    className={`page-number ${currentPage === index + 1 ? 'active' : ''}`}
                                    onClick={(e) => paginate(e, index + 1)}
                                > {index + 1} </a>
                            ))}
                            <a 
                                href="#" 
                                className={`page-arrow ${currentPage === totalPages ? 'disabled' : ''}`}
                                onClick={(e) => { e.preventDefault(); if(currentPage < totalPages) setCurrentPage(currentPage + 1); }}
                            > &gt; </a>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default SessionActivitiesPage;