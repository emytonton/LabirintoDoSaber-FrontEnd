import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import logo from "../../assets/images/logo.png";
import boyHome from "../../assets/images/boy_home.png";
import girlHome from "../../assets/images/girl_home.png";
import setaIcon from "../../assets/images/seta_icon.png";
import iconNotification from "../../assets/images/icon_notification.png";
import iconProfile from "../../assets/images/icon_profile.png";
import iconRandom from "../../assets/images/icon_random.png";
import { useLocation } from 'react-router-dom';

const API_BASE_URL = "https://labirinto-do-saber.vercel.app";

function Home() {
  const [userName, setUserName] = useState("");
  const [userPhotoUrl, setUserPhotoUrl] = useState(iconProfile);
  const [students, setStudents] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleStartSession = () => {
    navigate("/session");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };
  const location = useLocation();
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const token = localStorage.getItem("authToken");
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const userResponse = await axios.get(
          `${API_BASE_URL}/educator/me`,
          config
        );
        console.log("EDUCATOR DATA:", userResponse.data);
        console.log("URL DA FOTO:", userResponse.data.photoUrl);
        setUserName(userResponse.data.name);
        setUserPhotoUrl(userResponse.data.photoUrl || iconProfile);

        const studentsResponse = await axios.get(
          `${API_BASE_URL}/student/`,
          config
        );
        let allStudents = studentsResponse.data;

        const studentsToFetch = allStudents
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);

        const studentsWithSessionPromises = studentsToFetch.map(
          async (student) => {
            try {
              const sessionsRes = await axios.get(
                `${API_BASE_URL}/task-notebook-session/student/${student.id}`,
                config
              );
              const sessions = sessionsRes.data || [];

              const sortedSessions = sessions.sort(
                (a, b) => new Date(b.startedAt) - new Date(a.startedAt)
              );
              const lastSession =
                sortedSessions.length > 0 ? sortedSessions[0] : null;

              return {
                ...student,
                lastSession: lastSession,
              };
            } catch (err) {
              console.warn(`Erro ao buscar sessão para ${student.name}`, err);
              return { ...student, lastSession: null };
            }
          }
        );

        const detailedStudents = await Promise.all(studentsWithSessionPromises);

        setStudents(detailedStudents.slice(0, 3));
        const activeStudents = detailedStudents.filter(
          (s) => s.lastSession !== null
        );
        setRecentActivities(activeStudents.slice(0, 2));
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        if (error.response && error.response.status === 401) {
          alert("Sua sessão expirou. Por favor, faça login novamente.");
          navigate("/");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [navigate, location.state]);

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
          <Link to="/home" className="nav-link active">
            Dashboard
          </Link>
          <Link to="/activitiesMain" className="nav-link">
            Atividades
          </Link>
          <Link to="/alunos" className="nav-link">
            Alunos
          </Link>
          <Link to="/MainReport" className="nav-link">
            Relatórios
          </Link>
        </nav>

        <div className="home-user-controls">
          <img
            src={iconNotification}
            alt="Notificações"
            className="icon"
          />
          <img
            src={userPhotoUrl}
            alt={userName || "Perfil"}
            className="profile-icon"
            onClick={() => navigate("/Profile")}
            style={{
              cursor: "pointer",
              objectFit: "cover",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
            }}
          />
        </div>
      </header>

      <main className="home-main-content">
        <div className="home-content-left">
          <h1>Dashboard</h1>

          <p className="home-welcome-message">
            Bem vindo(a) de volta, {userName || "Educador"}!
          </p>

          <h2>Atividades recentes</h2>

          {recentActivities.length > 0 ? (
            recentActivities.map((student, index) => (
              <div
                className="home-activity-card"
                key={student.id}
                onClick={() =>
                  navigate("/ReportSession", {
                    state: {
                      sessionId:
                        student.lastSession.sessionId || student.lastSession.id,
                    },
                  })
                }
                style={{ cursor: "pointer" }}
              >
                <img
                  src={index % 2 === 0 ? boyHome : girlHome}
                  alt="Aluno lendo"
                  className="home-activity-image"
                />

                <div className="home-activity-info">
                  <h3>Sessão com {student.name.split(" ")[0]}</h3>
                  <p>
                    {student.lastSession.sessionName
                      ? student.lastSession.sessionName
                      : "Sessão realizada"}
                  </p>
                  <small style={{ color: "#666" }}>
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
                    <img
                      src={iconRandom}
                      alt={student.name}
                      className="home-student-avatar"
                    />
                    <span title={student.name}>
                      {student.name.split(" ")[0]}
                    </span>
                  </div>

                  <span
                    className="home-student-activity-tag"
                    style={{
                      backgroundColor: student.lastSession
                        ? "#E3F2FD"
                        : "#f5f5f5",
                      color: student.lastSession ? "#1565C0" : "#999",
                    }}
                  >
                    {student.lastSession
                      ? student.lastSession.sessionName || "Sessão Geral"
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
