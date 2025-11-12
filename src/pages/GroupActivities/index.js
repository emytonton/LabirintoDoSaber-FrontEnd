import React, { useState } from 'react';
import './style.css'; 
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

// SVGs como componentes (para organização visual no JSX)
const TrashIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 6H19L18.1245 19.133C18.0544 20.1836 17.1818 21 16.1289 21H7.87111C6.81818 21 5.94558 20.1836 5.87554 19.133L5 6Z" stroke="black" strokeWidth="2"/>
        <path d="M9 6V3H15V6" stroke="black" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M3 6H21" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        <path d="M10 10V17" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        <path d="M14 10V17" stroke="black" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

const AddIcon = () => (
    <svg width="29" height="31" viewBox="0 0 29 31" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_150_1802)">
            <path d="M19.5 12H9.5" stroke="black" strokeLinecap="round"/>
            <path d="M14.5 17V7" stroke="black" strokeLinecap="round"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M14.5 22C20.0228 22 24.5 17.5228 24.5 12C24.5 6.47715 20.0228 2 14.5 2C8.97715 2 4.5 6.47715 4.5 12C4.5 17.5228 8.97715 22 14.5 22Z" stroke="black"/>
        </g>
        <defs>
        <filter id="filter0_d_150_1802" x="-1.5" y="0" width="32" height="32" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="4"/>
            <feGaussianBlur stdDeviation="2"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_150_1802"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_150_1802" result="shape"/>
        </filter>
        </defs>
    </svg>
);
// Fim dos SVGs como componentes

function GroupActivitiesPage() { // Renomeado para GroupActivitiesPage
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('Leitura');
  const [groupName, setGroupName] = useState(''); // Renomeado de activityType
  const [activitySchema, setActivitySchema] = useState('Atividade 1: Imagem, Áudio, Enunciado e Alternativas');

  // NOVO ESTADO: Lista de Atividades que compõem o grupo
  const [groupActivities, setGroupActivities] = useState([{ id: Date.now(), name: '' }]); 
  
  // Funções para gerenciar a lista de atividades do grupo
  const addGroupActivity = () => {
    setGroupActivities([...groupActivities, { id: Date.now(), name: '' }]);
  };

  const removeGroupActivity = (id) => {
    // Apenas remova se houver mais de uma atividade na lista
    setGroupActivities(groupActivities.filter(ativ => ativ.id !== id));
  };

  const updateGroupActivity = (id, newName) => {
    setGroupActivities(groupActivities.map(ativ => 
      ativ.id === id ? { ...ativ, name: newName } : ativ
    ));
  };


  const categories = ['Leitura', 'Escrita', 'Vocabulário', 'Compreensão'];
  
  const handleSave = () => { // Renomeado de handleNext para handleSave
    const completedActivities = groupActivities.filter(a => a.name.trim() !== '');
    
    // Validação básica
    if (groupName.trim() === '' || completedActivities.length === 0) {
      alert("Por favor, preencha o Nome do Grupo e adicione pelo menos uma atividade válida.");
      return;
    }

    console.log("Grupo a ser Salvo:", {
      categoria: selectedCategory,
      nomeGrupo: groupName, 
      atividades: completedActivities
    });
    // Aqui você enviaria os dados para a sua API
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
          <h1 className="form-title">Adicionar novo grupo de atividades</h1>
          <hr className="title-separator" />

        
          <div className="form-group">
            <label className="form-label required">Categoria do Grupo</label>
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
            <label className="form-label required">Nome do novo grupo</label>
            <input 
              type="text" 
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Exemplo: Caderno de associação e leitura com animais "
              className="text-input" 
            />
          </div>

          {/* INÍCIO: SEÇÃO ADICIONAR ATIVIDADES DESEJADAS */}
          <div className="form-group">
            <div className="form-label required">Adicione as atividades desejadas</div>

            <div className="activities-list-container">
              {groupActivities.map((activity, idx) => (
                <div key={activity.id} className="activity-row">
                  <div className="activity-item">
                    <input
                      className="activity-input"
                      placeholder={`Atividade ${idx + 1}`}
                      value={activity.name}
                      onChange={(e) => updateGroupActivity(activity.id, e.target.value)}
                    />
                  </div>

                    <button
                        type="button"
                        className="activity-remove-button"
                        onClick={() => removeGroupActivity(activity.id)}
                        aria-label="Remover atividade"
                        title="Remover"
                    >
                        <TrashIcon />
                    </button>
                </div>
              ))}
            </div>

            <button type="button" className="activity-add-button" onClick={addGroupActivity}>
                <AddIcon />
                Adicionar mais atividades
            </button>
          </div>
          {/* FIM: SEÇÃO ADICIONAR ATIVIDADES DESEJADAS */}

        
          <div className="next-button-container">
            <button className="button-next" type="submit" onClick={handleSave}>
              Salvar
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default GroupActivitiesPage;
