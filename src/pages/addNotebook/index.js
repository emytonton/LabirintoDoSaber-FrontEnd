import React, { useState } from 'react';
import './styles.css'; 
import logo from '../../assets/images/logo.png';
import iconNotification from '../../assets/images/icon_notification.png';
import iconProfile from '../../assets/images/icon_profile.png';
import iconBack from '../../assets/images/seta_icon_esquerda.png'
import { useNavigate } from 'react-router-dom';


const ActivityChip = ({ label, isSelected, onClick }) => (
  <button 
    className={`activity-chip ${isSelected ? 'selected' : ''}`} 
    onClick={onClick}
  >
    {label}
  </button>
);

function AdicionarAtividade() {
  const [selectedCategory, setSelectedCategory] = useState('Leitura');
  const [activityType, setActivityType] = useState('');
  const [activitySchema, setActivitySchema] = useState('Atividade 1: Imagem, Áudio, Enunciado e Alternativas');

  const categories = ['Leitura', 'Escrita', 'Vocabulário', 'Compreensão'];
  const schemas = [
    '',
    'Atividade 1: Imagem, Áudio, Enunciado e Alternativas',
    'Atividade 2: Somente Enunciado e Resposta Curta',
    'Atividade 3: Associação de Colunas'
  ];

  const handleNext = () => {
    console.log("Próximo passo acionado!");
  };

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

    
      <main className="main-content">
        <a href="/activitiesMain" className="back-arrow"><img src={iconBack} alt="seta" className="seta"/></a>
        <div className="adicionar-atividade-container">
          <h1 className="form-title">Adicionar novo caderno</h1>
          <hr className="title-separator" />

        
          <div className="form-group">
            <label className="form-label required">Categoria do caderno</label>
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

          <div className="form-group">
            <label className="form-label required">Descriçao do caderno</label>
            <input 
              type="text" 
              value={activityType}
              onChange={(e) => setActivityType(e.target.value)}
              placeholder="Exemplo: Caderno de associação e leitura com animais "
              className="text-input" 
            />
          </div>

         
          <div className="form-group">
            <label className="form-label required">Adicione o grupo de atividades</label>
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

        
          <div className="next-button-container">
            <button className="button-next" type="submit" onClick={handleNext}>
              Próximo
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdicionarAtividade;
