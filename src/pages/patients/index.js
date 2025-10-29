import React from 'react';
import './style.css'; 
import logo from '../../assets/images/logo.png';
import iconNotification from '../../assets/images/icon_notification.png';
import iconProfile from '../../assets/images/icon_profile.png';
import iconRandom from '../../assets/images/icon_random.png';
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
          <a href="#" className="nav-link">Atividades</a>
          <a href="/alunos" className="nav-link active">Alunos</a> 
          <a href="#" className="nav-link">Relatórios</a>
        </nav>
        <div className="user-controls">
          <img src={iconNotification} alt="Notificações" className="icon" />
          <img src={iconProfile} alt="Perfil" className="icon profile-icon" />
        </div>
      </header>

      <main className="alunos-main-content">
        <div className="alunos-container">
          
          <h1>Alunos</h1>
          <p className="subtitle">Visualize e gerencie informações e progresso de cada aluno.</p>

          <div className="student-card-list">
            
      
            <div className="student-list-item-card" onClick={handleAlunoClick} style={{cursor: 'pointer'}}>
              <img src={iconRandom} alt="Avatar" className="student-card-avatar" />
              <div className="student-card-info">
                <h3>Lucas Silva</h3>
                <p>7 anos</p>
                <p>Alfabetização inicial</p>
              </div>
           
              <button className="edit-profile-btn" onClick={handleEditClick}>Editar perfil</button>
            </div>

           
            <div className="student-list-item-card" onClick={handleAlunoClick} style={{cursor: 'pointer'}}>
              <img src={iconRandom} alt="Avatar" className="student-card-avatar" />
              <div className="student-card-info">
                <h3>Maria Santos</h3>
                <p>14 anos</p>
                <p>Desenvolvimento da fala</p>
              </div>
              
              <button className="edit-profile-btn" onClick={handleEditClick}>Editar perfil</button>
            </div>

           
            <div className="student-list-item-card" onClick={handleAlunoClick} style={{cursor: 'pointer'}}>
              <img src={iconRandom} alt="Avatar" className="student-card-avatar" />
              <div className="student-card-info">
                <h3>João Pedro</h3>
                <p>8 anos</p>
                <p>Alfabetização inicial</p>
              </div>
           
              <button className="edit-profile-btn" onClick={handleEditClick}>Editar perfil</button>
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