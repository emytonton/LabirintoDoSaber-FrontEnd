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
  const [students, setStudents] = useState([]); // Estado para os alunos
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleStartSession = () => {
    navigate('/session');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        
        // Configuração do Header com Token (necessário para ambas as rotas geralmente)
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        // 1. Busca dados do Educador
        const userResponse = await axios.get('https://labirinto-do-saber.vercel.app/educator/me', config);
        setUserName(userResponse.data.name);

        // 2. Busca lista de Alunos
        const studentsResponse = await axios.get('https://labirinto-do-saber.vercel.app/student/', config);
        
        // Ordena por data de criação (mais recente primeiro) e pega os 3 primeiros
        const sortedStudents = studentsResponse.data.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        }).slice(0, 3);

        setStudents(sortedStudents);

      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        // Se der erro de autenticação, redireciona
        if (error.response && error.response.status === 401) {
            alert("Sua sessão expirou. Por favor, faça login novamente.");
            navigate('/'); 
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
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

            {/* Mapeamento dos alunos vindos da API */}
            {students.length > 0 ? (
                students.map((student) => (
                    <div className="home-student-row" key={student.id}>
                        <div className="home-student-name-group">
                            <img src={iconRandom} alt={student.name} className="home-student-avatar" />
                            {/* Mostrando apenas o primeiro nome para caber melhor no layout, ou o nome completo se preferir */}
                            <span title={student.name}>
                                {student.name.split(' ')[0]} 
                            </span>
                        </div>
                        <span className="home-student-activity-tag">Atividade X</span>
                    </div>
                ))
            ) : (
                <div className="home-student-row">
                    <span>Nenhum aluno recente.</span>
                </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}

export default Home;