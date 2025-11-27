import React, { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
import logo from "../../assets/images/logo.png";
import iconNotification from "../../assets/images/icon_notification.png";
import iconProfile from "../../assets/images/icon_profile.png";
import iconArrowLeft from "../../assets/images/seta_icon_esquerda.png";
import iconCard from "../../assets/images/caderneta.png";
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


function SessionNotebookPage() {
    const navigate = useNavigate();

    const [notebooks, setNotebooks] = useState([
        { id: 1, name: "Caderno de associação e leitura com animais", category: "reading", tasksIds: [1] },
        { id: 2, name: "Caderno de associação e leitura com animais", category: "reading", tasksIds: [2] },
        { id: 3, name: "Caderno de associação e leitura com animais", category: "reading", tasksIds: [3] },
        { id: 4, name: "Caderno de associação e leitura com animais", category: "reading", tasksIds: [4] }
    ]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    const categoryMap = {
        reading: "Vocabulário & Leitura",
        writing: "Escrita",
        vocabulary: "Vocabulário",
        comprehension: "Compreensão, Leitura & Vocabulário"
    };

    const handleNotebookSelection = (notebook) => {
        console.log("Caderno Selecionado para sessão:", notebook.id);
        // Implementar lógica de adicionar este caderno à sessão em andamento
    };

    const handleFilterAction = () => {
        console.log("Abrir Filtro do Caderno");
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
                    <a href="/MainReport" className="nav-link">Relatórios</a>
                </nav>

                <div className="user-controls">
                    <img src={iconNotification} alt="Notificações" className="icon" />
                    <img src={iconProfile} alt="Perfil" className="icon profile-icon" />
                </div>
            </header>

            <main className="session-notebook-select-main-content">
                <div className="session-notebook-select-container">
                        <a href="/sessionType" className="back-arrow-link">
                            <img src={iconArrowLeft} alt="Voltar" className="back-arrow-icon"/>
                        </a>
                    <div className="top-container">
                        <h1>Selecione o caderno desejado</h1>
                        
                        <div className="search-filter-group">
                            <SearchBar 
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                placeholder="Buscar caderno..." 
                                onFilterClick={handleFilterAction}
                            />
                        </div>
                    </div>

                    
                    <div className="session-notebook-select-card-list">
                        {loading ? (
                            <p>Carregando cadernos...</p>
                        ) : (
                            notebooks.slice(0, 4).map((notebook) => (
                                <div className="notebook-select-row-wrapper" key={notebook.id}>
                                    <div
                                        className="notebook-select-list-item-card"
                                        style={{ cursor: "pointer" }}
                                    >
                                        <img src={iconCard} alt="Icone Caderno" className="notebook-select-card-icon" />
                                        <div className="notebook-select-card-info">
                                            <h3>{notebook.name}</h3>
                                            <button className="notebook-select-bnt-details">
                                                {categoryMap[notebook.category] || notebook.category}
                                            </button>
                                        </div>

                                        <button
                                            className="select-plus-btn"
                                            onClick={() => handleNotebookSelection(notebook)}
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

export default SessionNotebookPage;