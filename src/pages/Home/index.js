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

  const handleStartSession = () => {
    navigate('/session');
  };

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
      <div className="home-dashboard-container">
        <h1>Carregando...</h1>
      </div>
    );
  }

  return (
    <div className="home-dashboard-container">
      <header className="header">
        <img src={logo} alt="Labirinto do Saber" className="logo" />
        <nav className="navbar">
          <Link to="/home" className="nav-link active">Dashboard</Link> 
          <Link to="/activitiesMain" className="nav-link">Atividades</Link>
          <Link to="/alunos" className="nav-link">Alunos</Link> 
          <Link to="/MainReport" className="nav-link">Relatórios</Link>
        </nav>

        <div className="home-user-controls">
          <img src={iconNotification} alt="Notificações" className="icon" />
          <img 
            src={iconProfile} 
            alt="Perfil" 
            className="profile-icon" 
            onClick={() => navigate('/Profile')}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </header>

      <main className="home-main-content">
        <div className="home-content-left">
          <h1>Dashboard</h1>
  
          <p className="home-welcome-message">
            Bem vindo(a) de volta, {userName || 'Usuário'}!
          </p>

          <h2>Atividades recentes</h2>

          <div className="home-activity-card">
            <img src={boyHome} alt="Menino lendo" className="home-activity-image" />
            <div className="home-activity-info">
              <h3>Sessão de sílabas com Lucas</h3>
              <p>Foco na montagem e reconhecimento das sílabas tônicas.</p>
            </div>
            <img src={setaIcon} alt="Seta" className="home-arrow" />
          </div>

          <div className="home-activity-card">
            <img src={girlHome} alt="Menina lendo" className="home-activity-image" />
            <div className="home-activity-info">
              <h3>Sessão de sílabas com Ana</h3>
              <p>Foco na montagem e reconhecimento das sílabas tônicas.</p>
            </div>
            <img src={setaIcon} alt="Seta" className="home-arrow" />
          </div>
        </div>

        <div className="home-content-right">
          <div className="home-action-buttons">
            <button 
              className="home-btn-primary-session"
              onClick={handleStartSession}
            >
              Iniciar Sessão
            </button>
          </div>

          <h2>Meus alunos</h2>

          <div className="home-student-list-card">
            <div className="home-student-list-header">
              <span>Nome</span>
              <span>Última atividade</span>
            </div>

            <div className="home-student-row">
              <div className="home-student-name-group">
                <img src={iconRandom} alt="Lucas" className="home-student-avatar" />
                <span>Lucas</span>
              </div>
              <span className="home-student-activity-tag">Atividade X</span>
            </div>

            <div className="home-student-row">
              <div className="home-student-name-group">
                <img src={iconRandom} alt="Maria" className="home-student-avatar" />
                <span>Maria</span>
              </div>
              <span className="home-student-activity-tag">Atividade X</span>
            </div>
        
            <div className="home-student-row">
              <div className="home-student-name-group">
                <img src={iconRandom} alt="João" className="home-student-avatar" />
                <span>João</span>
              </div>
              <span className="home-student-activity-tag">Atividade X</span>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default Home;
