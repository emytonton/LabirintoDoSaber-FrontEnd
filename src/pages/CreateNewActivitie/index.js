import React, { useState } from 'react';
import './style.css'; 
import logo from '../../assets/images/logo.png';
import iconNotification from '../../assets/images/icon_notification.png';
import iconProfile from '../../assets/images/icon_profile.png';
import { useNavigate, useLocation } from 'react-router-dom'; 


// Componente reútil para os Chips de Categoria
const ActivityChip = ({ label, isSelected, onClick }) => (
  <button 
    className={`activity-chip ${isSelected ? 'selected' : ''}`} 
    onClick={onClick}
  >
    {label}
  </button>
);

function AdicionarAtividade() {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;
    const [selectedCategory, setSelectedCategory] = useState('Leitura');
    const [activityType, setActivityType] = useState('');
    const [activitySchema, setActivitySchema] = useState('Atividade 1: Imagem, Áudio, Enunciado e Alternativas');

    const categories = ['Leitura', 'Escrita', 'Vocabulário', 'Compreensão'];
    const schemas = [
        'Atividade 1: Imagem, Áudio, Enunciado e Alternativas',
        'Atividade 2: Somente Enunciado e Resposta Curta',
        'Atividade 3: Associação de Colunas'
    ];

    const handleNext = () => {
        console.log("Próximo passo acionado!");
        navigate('/NewActivitiePersonalize');
    };
    
    // O Navbar está incluído aqui, seguindo o seu padrão da AlunosPage.
    return (
        <div className="dashboard-container"> 
            
        <header className="header">
            <img src={logo} alt="Labirinto do Saber" className="logo" />
                <nav className="navbar">
                    <a 
                        href="/home" 
                        className={`nav-link ${currentPath === '/home' ? 'active' : ''}`}
                    >
                        Dashboard
                    </a> 
                    <a 
                        href="/activities" 
                        className={`nav-link ${currentPath === '/activitiesMain' ? 'active' : ''}`}
                    >
                        Atividades
                    </a>
                    <a 
                        href="/alunos" 
                        className={`nav-link ${currentPath === '/alunos' ? 'active' : ''}`}
                    >
                        Alunos
                    </a> 
                    <a 
                        href="/relatorios" 
                        className={`nav-link ${currentPath === '/relatorios' ? 'active' : ''}`}
                    >
                        Relatórios
                    </a>
                </nav>
            <div className="user-controls">
            <img src={iconNotification} alt="Notificações" className="icon" />
            <img src={iconProfile} alt="Perfil" className="icon profile-icon" />
            </div>
        </header>

            {/* CONTEÚDO PRINCIPAL: O FORMULÁRIO */}
            <main className="main-content">
                <div className="adicionar-atividade-container">
                    
                    <h1 className="form-title">Adicionar nova atividade</h1>
                    <hr className="title-separator" />

                    {/* 1. Categoria da Atividade */}
                    <div className="form-group">
                        <label className="form-label required">Categoria da atividade</label>
                        <div className="chips-container">
                            {categories.map((cat) => (
                                <ActivityChip 
                                    key={cat}
                                    label={cat}
                                    isSelected={selectedCategory === cat}
                                    onClick={() => setSelectedCategory(cat)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* 2. Tipo da Atividade (Input de Texto) */}
                    <div className="form-group">
                        <label className="form-label required">Tipo da atividade</label>
                        <input 
                            type="text" 
                            value={activityType}
                            onChange={(e) => setActivityType(e.target.value)}
                            placeholder="Exemplo: Atividades de associação e leitura com animais"
                            className="text-input" 
                        />
                    </div>
                    
                    {/* 3. Esquema da Atividade (Dropdown) */}
                    <div className="form-group">
                        <label className="form-label required">Esquema da atividade</label>
                        <div className="select-wrapper">
                            <select 
                                value={activitySchema}
                                onChange={(e) => setActivitySchema(e.target.value)}
                                className="dropdown-select"
                            >
                                {schemas.map((schema) => (
                                    <option key={schema} value={schema}>{schema}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* 4. Botão Próximo */}
                    <div className="next-button-container">
                        <button className = "button-next" type = "button" onClick={handleNext}>
                            Próximo
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AdicionarAtividade;