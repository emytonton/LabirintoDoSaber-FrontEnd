import React, { useState } from "react";
import "./style.css";
import logo from "../../assets/images/logo.png";
import iconNotification from "../../assets/images/icon_notification.png";
import iconProfile from "../../assets/images/icon_profile.png";
import iconArrowLeft from "../../assets/images/seta_icon_esquerda.png";
import iconActivity from "../../assets/images/iconActivitie.png"; // Ícone de Atividade Individual (assumindo que iconActivitie é o ícone de documento único)
import SearchBar from "../../components/ui/SearchBar/Search";
import { useNavigate } from "react-router-dom";


// SVG do Ícone de Adicionar (+)
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


function SessionActivitiesPage() {
    const navigate = useNavigate();

    // Dados de exemplo para simular as atividades
    const [activities, setActivities] = useState([
        { id: 1, name: "Atividade de associação e leitura com animais", category: "reading" },
        { id: 2, name: "Atividade de associação e leitura com animais", category: "reading" },
        { id: 3, name: "Atividade de associação e leitura com animais", category: "reading" },
        { id: 4, name: "Atividade de associação e leitura com animais", category: "reading" },
        { id: 5, name: "Atividade de associação e leitura com animais", category: "reading" },
        { id: 6, name: "Atividade de associação e leitura com animais", category: "reading" }
    ]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false); 

    const categoryMap = {
        reading: "Vocabulário & Leitura",
        writing: "Escrita",
        vocabulary: "Vocabulário",
        comprehension: "Compreensão, Leitura & Vocabulário"
    };

    const handleActivitySelection = (activity) => {
        console.log("Atividade Selecionada para sessão:", activity.id);
    };

    const handleFilterAction = () => {
        console.log("Abrir Filtro de Atividades");
    };

    const currentPage = 1;
    const totalPages = 4;

    return (
        <div className="dashboard-container">
            <header className="header">
                <img src={logo} alt="Labirinto do Saber" className="logo" />

                <nav className="navbar">
                    <a href="/home" className="nav-link">Dashboard</a>
                    <a href="/activitiesMain" className="nav-link active">Atividades</a>
                    <a href="/alunos" className="nav-link">Alunos</a>
                    <a href="#" className="nav-link">Relatórios</a>
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
                        
                        <div className="search-filter-group">
                            <SearchBar 
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                placeholder="Buscar atividade..." 
                                onFilterClick={handleFilterAction}
                            />
                        </div>
                    </div>

                    
                    <div className="session-activity-select-card-list">
                        {loading ? (
                            <p>Carregando atividades...</p>
                        ) : (
                            activities.map((activity) => (
                                <div className="activity-select-row-wrapper" key={activity.id}>
                                    <div
                                        className="activity-select-list-item-card"
                                        style={{ cursor: "pointer" }}
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
                                            onClick={() => handleActivitySelection(activity)}
                                            title="Adicionar à Sessão"
                                        >
                                            <PlusIcon />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {totalPages > 1 && (
                        <div className="pagination-controls">
                            <a href="#" className="page-arrow">&lt;</a>
                            <a href="#" className="page-number active">1</a>
                            <a href="#" className="page-number">2</a>
                            <a href="#" className="page-number">3</a>
                            <a href="#" className="page-number">4</a>
                            <a href="#" className="page-arrow">&gt;</a>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default SessionActivitiesPage;