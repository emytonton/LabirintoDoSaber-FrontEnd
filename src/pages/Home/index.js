import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
import './style.css';
import logo from '../../assets/images/logo.png';
import boyHome from '../../assets/images/boy_home.png';
import girlHome from '../../assets/images/girl_home.png';
import setaIcon from '../../assets/images/seta_icon.png'
import iconNotification from '../../assets/images/icon_notification.png';
import iconProfile from '../../assets/images/icon_profile.png';
import iconRandom from '../../assets/images/icon_random.png';

function Home() {
 
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  
  useEffect(() => {
    
    const fetchUserData = async () => {
      try {
        
        const response = await axios.get('https://labirinto-do-saber.vercel.app/educator/me');

        
        setUserName(response.data.name);

      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        
        alert("Sua sessão expirou. Por favor, faça login novamente.");
        navigate('/'); 
      } finally {
        
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]); 

  if (isLoading) {
    return (
      <div className="dashboard-container">
        <h1>Carregando...</h1>
      </div>
    );
  }


  return (
    <div className="dashboard-container">
      <header className="header">
        <img src={logo} alt="Labirinto do Saber" className="logo" />
        <nav className="navbar">
          <Link to="/home" className="nav-link active">Dashboard</Link> 
          <Link to="/activitiesMain" className="nav-link">Atividades</Link>
          <Link to="/alunos" className="nav-link">Alunos</Link> 
          <Link to="#" className="nav-link">Relatórios</Link>
        </nav>
        <div className="user-controls">
          <img src={iconNotification} alt="Notificações" className="icon" />
          <img src={iconProfile} alt="Perfil" className="icon profile-icon" />
        </div>
      </header>

      <main className="main-content">
        <div className="content-left">
          <h1>Dashboard</h1>
          
  
          <p className="welcome-message">
            Bem vindo(a) de volta, {userName || 'Usuário'}!
          </p>

          <h2>Atividades recentes</h2>
          <div className="activity-card">
            <img src={boyHome} alt="Menino lendo" className="activity-image" />
            <div className="activity-info">
              <h3>Sessão de sílabas com Lucas</h3>
              <p>Foco na montagem e reconhecimento das sílabas tônicas.</p>
            </div>
              <img src={setaIcon} alt="Seta" className="arrow" />
          </div>

          <div className="activity-card">
            <img src={girlHome} alt="Menina lendo" className="activity-image" />
            <div className="activity-info">
              <h3>Sessão de sílabas com Ana</h3>
              <p>Foco na montagem e reconhecimento das sílabas tônicas.</p>
            </div>
            <img src={setaIcon} alt="Seta" className="arrow" />
          </div>
        </div>

        <div className="content-right">
          <div className="action-buttons">
            <button className="btn btn-secondary">Iniciar Sessão</button>
          </div>

          <h2>Meus alunos</h2>
          <div className="student-list-card">
            <div className="student-list-header">
              <span>Nome</span>
              <span>Última atividade</span>
            </div>

            <div className="student-row">
              <div className="student-name-group">
                <img src={iconRandom} alt="Lucas" className="student-avatar" />
                <span>Lucas</span>
              </div>
              <span className="student-activity-tag">Atividade X</span>
            </div>

            <div className="student-row">
              <div className="student-name-group">
                <img src={iconRandom} alt="Maria" className="student-avatar" />
                <span>Maria</span>
              </div>
              <span className="student-activity-tag">Atividade X</span>
            </div>
        
            <div className="student-row">
              <div className="student-name-group">
                <img src={iconRandom} alt="João" className="student-avatar" />
                <span>João</span>
              </div>
              <span className="student-activity-tag">Atividade X</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;