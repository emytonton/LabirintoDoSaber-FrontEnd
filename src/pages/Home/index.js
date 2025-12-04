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

const API_BASE_URL = "https://labirinto-do-saber.vercel.app";

function Home() {
  const [userName, setUserName] = useState('');
  const [students, setStudents] = useState([]); 
  const [recentActivities, setRecentActivities] = useState([]); // Novo estado para os cards da esquerda
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleStartSession = () => {
    navigate('/session');
  };

  // Função auxiliar para formatar data
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const config = { headers: { Authorization: `Bearer ${token}` } };

        // 1. Busca dados do Educador
        const userResponse = await axios.get(`${API_BASE_URL}/educator/me`, config);
        setUserName(userResponse.data.name);

        // 2. Busca lista de Alunos
        const studentsResponse = await axios.get(`${API_BASE_URL}/student/`, config);
        let allStudents = studentsResponse.data;

        // 3. Buscar a última sessão de cada aluno (limitado aos 5 mais recentes para não pesar)
        // Ordenamos primeiro por criação para pegar os alunos mais novos, ou pegamos todos se forem poucos
        const studentsToFetch = allStudents.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

        const studentsWithSessionPromises = studentsToFetch.map(async (student) => {
            try {
                const sessionsRes = await axios.get(`${API_BASE_URL}/task-notebook-session/student/${student.id}`, config);
                const sessions = sessionsRes.data || [];
                
                // Ordena sessões para pegar a mais recente
                const sortedSessions = sessions.sort((a, b) => new Date(b.startedAt) - new Date(a.startedAt));
                const lastSession = sortedSessions.length > 0 ? sortedSessions[0] : null;

                return {
                    ...student,
                    lastSession: lastSession // Anexa a última sessão ao objeto do aluno
                };
            } catch (err) {
                console.warn(`Erro ao buscar sessão para ${student.name}`, err);
                return { ...student, lastSession: null };
            }
        });

        // Aguarda todas as requisições paralelas terminarem
        const detailedStudents = await Promise.all(studentsWithSessionPromises);

        // Define a lista de alunos (Lado Direito)
        setStudents(detailedStudents.slice(0, 3)); // Pega os 3 primeiros para a lista

        // Define as Atividades Recentes (Lado Esquerdo) - Apenas alunos que TÊM sessão
        const activeStudents = detailedStudents.filter(s => s.lastSession !== null);
        setRecentActivities(activeStudents.slice(0, 2)); // Pega os 2 mais ativos para os cards grandes

      } catch (error) {
        console.error("Erro ao buscar dados:", error);
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
        <h1>Carregando dashboard...</h1>
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
        {/* --- LADO ESQUERDO: CARDS GRANDES --- */}
        <div className="home-content-left">
          <h1>Dashboard</h1>
  
          <p className="home-welcome-message">
            Bem vindo(a) de volta, {userName || 'Educador'}!
          </p>

          <h2>Atividades recentes</h2>

          {recentActivities.length > 0 ? (
            recentActivities.map((student, index) => (
              <div className="home-activity-card" key={student.id} onClick={() => navigate('/ReportSession', { state: { sessionId: student.lastSession.sessionId || student.lastSession.id } })} style={{cursor: 'pointer'}}>
                {/* Alterna imagem entre menino e menina baseado no index (apenas visual) */}
                <img src={index % 2 === 0 ? boyHome : girlHome} alt="Aluno lendo" className="home-activity-image" />
                
                <div className="home-activity-info">
                  <h3>Sessão com {student.name.split(' ')[0]}</h3>
                  <p>
                    {student.lastSession.sessionName 
                        ? student.lastSession.sessionName 
                        : "Sessão realizada"}
                  </p>
                  <small style={{color: '#666'}}>
                     Data: {formatDate(student.lastSession.startedAt)}
                  </small>
                </div>
                <img src={setaIcon} alt="Seta" className="home-arrow" />
              </div>
            ))
          ) : (
            <p>Nenhuma atividade recente encontrada.</p>
          )}
        </div>

        {/* --- LADO DIREITO: LISTA DE ALUNOS --- */}
        <div className="home-content-right">
          <div className="home-action-buttons">
            <button 
              className="home-btn-primary-session"
              onClick={handleStartSession}
            >
              Iniciar Nova Sessão
            </button>
          </div>

          <h2>Meus alunos</h2>

          <div className="home-student-list-card">
            <div className="home-student-list-header">
              <span>Nome</span>
              <span>Última atividade</span>
            </div>

            {students.length > 0 ? (
                students.map((student) => (
                    <div className="home-student-row" key={student.id}>
                        <div className="home-student-name-group">
                            <img src={iconRandom} alt={student.name} className="home-student-avatar" />
                            <span title={student.name}>
                                {student.name.split(' ')[0]} 
                            </span>
                        </div>
                        
                        <span className="home-student-activity-tag" style={{
                            backgroundColor: student.lastSession ? '#E3F2FD' : '#f5f5f5',
                            color: student.lastSession ? '#1565C0' : '#999'
                        }}>
                            {student.lastSession 
                                ? (student.lastSession.sessionName || "Sessão Geral")
                                : "Nenhuma"}
                        </span>
                    </div>
                ))
            ) : (
                <div className="home-student-row">
                    <span>Nenhum aluno encontrado.</span>
                </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}

export default Home;