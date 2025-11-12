import React, { useState } from 'react';
import './style.css'; 
import logo from '../../assets/images/logo.png';
import iconNotification from '../../assets/images/icon_notification.png';
import iconProfile from '../../assets/images/icon_profile.png';
import iconCaderno from '../../assets/images/caderneta.png';
import iconSeta from '../../assets/images/seta_icon.png'
import { useNavigate } from 'react-router-dom'; 

function AlunosPage() {
  const navigate = useNavigate(); 
  const handleAlunoClick = () => {
    navigate('/alunosDetails');
  };
  
  // Estados para controlar a visibilidade dos menus dropdown
  const [isCriarOpen, setIsCriarOpen] = useState(false);
  const [isGerenciarOpen, setIsGerenciarOpen] = useState(false);

  // Função para fechar qualquer menu aberto ao navegar
  const handleNavigate = (path) => {
      setIsCriarOpen(false);
      setIsGerenciarOpen(false);
      navigate(path);
  };
  

  // Função para alternar o estado de 'Criar' (e fechar o 'Gerenciar')
  const toggleCriar = () => {
      setIsCriarOpen(!isCriarOpen);
      setIsGerenciarOpen(false); // Garante que apenas um esteja aberto
  };

  // Função para alternar o estado de 'Gerenciar' (e fechar o 'Criar')
  const toggleGerenciar = () => {
      setIsGerenciarOpen(!isGerenciarOpen);
      setIsCriarOpen(false); // Garante que apenas um esteja aberto
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

      <main className="alunos-main-content">
        <div className="alunos-container">
          

          <div className="top-container">
          <h1>Atividades</h1>
          <div className="bnts-top">
                {/* Wrapper para o botão CRIAR e seu subtítulo */}
                <div className="button-and-subtitle-wrapper">
                    <div className={`dropdown-button-container ${isCriarOpen ? 'active' : ''}`}>
                        <div 
                            className="create-caderno dropdown-toggle" 
                            onClick={toggleCriar}
                        > 
                            <span>Criar</span> 
                            <svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="dropdown-arrow">
                                <path d="M0.5 0.5L6.5 6.5L12.5 0.5" stroke="black" stroke-linecap="round"/>
                            </svg>
                        </div>
                        
                        {isCriarOpen && (
                            <div className="dropdown-menu">
                                <a onClick={() => handleNavigate('/addNotebook')}>Criar caderno</a>
                                <a onClick={() => handleNavigate('/GroupActivities')}>Criar grupo de atividades</a>
                                <a onClick={() => handleNavigate('/CreateNewActivitie')}>Criar atividade</a>
                            </div>
                        )}
                    </div>
                    <p className="dropdown-subtitle">
                        *criar cadernos, grupo de atividades e atividades
                    </p>
                </div>


                {/* Wrapper para o botão GERENCIAR e seu subtítulo */}
                <div className="button-and-subtitle-wrapper">
                    <div className={`dropdown-button-container ${isGerenciarOpen ? 'active' : ''}`}>
                        <div 
                            className="create-caderno dropdown-toggle" 
                            onClick={toggleGerenciar}
                        > 
                            <span>Gerenciar</span> 
                            <svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="dropdown-arrow">
                                <path d="M0.5 0.5L6.5 6.5L12.5 0.5" stroke="black" stroke-linecap="round"/>
                            </svg>
                        </div>
                        
                        {isGerenciarOpen && (
                            <div className="dropdown-menu">
                                <a onClick={() => handleNavigate('/manageNotebooks')}>Gerenciar cadernos</a>
                                <a onClick={() => handleNavigate('/manageGroups')}>Gerenciar grupo de atividades</a>
                                <a onClick={() => handleNavigate('/manageActivities')}>Gerenciar atividades</a>
                            </div>
                        )}
                    </div>
                    <p className="dropdown-subtitle">
                        *gerenciar cadernos, grupo de atividades e atividades
                    </p>
                </div>

            </div>
        </div>
         

          <div className="student-card-list">
            
      
            <div className="student-list-item-card" onClick={handleAlunoClick} style={{cursor: 'pointer'}}>
              <img src={iconCaderno} alt="Avatar" className="caderno-avatar" />
              <div className="student-card-info">
                <h3>Caderno: Apredizagem das sílabas </h3>
                <p>Foco na montagem e reconhecimento das sílabas tônicas.</p>
                <button className="bnt-details"> Vocabulárion e Leitura </button>
              </div>
           
              <a href="/alunos" className="back-arrow"><img src={iconSeta} alt="seta" className="seta"/></a>
            </div>

           
            <div className="student-list-item-card" onClick={handleAlunoClick} style={{cursor: 'pointer'}}>
              <img src={iconCaderno} alt="Avatar" className="caderno-avatar" />
              <div className="student-card-info">
                <h3>Caderno: Apredizagem das sílabas  </h3>
                <p>Foco na montagem e reconhecimento das sílabas tônicas.</p>
                <button className="bnt-details"> Escrita </button>
              </div>
              
              <a href="/alunos" className="back-arrow"><img src={iconSeta} alt="seta" className="seta"/></a>
            </div>

           
            <div className="student-list-item-card" onClick={handleAlunoClick} style={{cursor: 'pointer'}}>
              <img src={iconCaderno} alt="Avatar" className="caderno-avatar" />
              <div className="student-card-info">
                <h3>Caderno: Apredizagem das sílabas  </h3>
                <p>Foco na montagem e reconhecimento das sílabas tônicas.</p>
                <button className="bnt-details"> Leitura </button>
              </div>
           
             <a href="/alunos" className="back-arrow"><img src={iconSeta} alt="seta" className="seta"/></a>
            </div>

          </div>

          <div className="pagination-controls">
            <a href="#" className="page-arrow">&lt;</a>
            <a href="#" className="page-number">1</a>
            <a href="#" className="page-number active">2</a>
            <a href="#" className="page-number">3</a>
            <a href="#" className="page-number">4</a>
            <a href="#" className="page-arrow">&gt;</a>
          </div>

        </div>
      </main>
    </div>
  );
}

export default AlunosPage;