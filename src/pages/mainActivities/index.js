import React from 'react';
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

  
  const handleEditClick = (e) => {
    e.stopPropagation();
    console.log("Clicou em Editar Perfil");
   
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
          <button className="create-caderno" onClick={ () => navigate('/createNotebook') }> Criar novo caderno </button>
          <button className="create-caderno" onClick={ () => navigate('/activities') }> Criar nova atividade </button>
          <button className="create-caderno" onClick={ () => navigate('') }> Gerenciar </button>
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