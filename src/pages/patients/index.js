import React, { useState, useEffect } from 'react';
import './style.css'; 
import axios from 'axios'; 
import logo from '../../assets/images/logo.png';
import iconNotification from '../../assets/images/icon_notification.png';
import iconProfile from '../../assets/images/icon_profile.png';
import iconRandom from '../../assets/images/icon_random.png';
import { useNavigate } from 'react-router-dom'; 

function AlunosPage() {
  const navigate = useNavigate(); 
  const [alunos, setAlunos] = useState([]); 
  const [loading, setLoading] = useState(true); 
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; 


  const handleAlunoClick = (studentId) => {
    navigate(`/alunosDetails`, { 
        state: { 
            studentId: studentId 
        } 
    });
  };


  const handleEditClick = (e, studentId) => {
    e.stopPropagation(); 
    navigate(`/alunosDetails`, { 
        state: { 
            studentId: studentId 
        } 
    });
  };

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const educatorId = localStorage.getItem('userId');
        const token = localStorage.getItem('authToken');

        if (!educatorId || !token) {
          alert('Sessão inválida. Por favor, faça login novamente.');
          navigate('/');
          return;
        }

        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };

        const response = await axios.get('https://labirinto-do-saber.vercel.app/student/', config);
        
        let listaCompleta = [];
        if (Array.isArray(response.data)) {
            listaCompleta = response.data;
        } else if (response.data && Array.isArray(response.data.students)) {
            listaCompleta = response.data.students; 
        }

        const meusAlunos = listaCompleta.filter(aluno => String(aluno.educatorId) === String(educatorId));

        setAlunos(meusAlunos);
        setLoading(false);

      } catch (error) {
        console.error("Erro ao buscar alunos:", error);
        setLoading(false);
      }
    };

    fetchAlunos();
  }, [navigate]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAlunos = alunos.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(alunos.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="dashboard-container">
      <header className="header">
        <img src={logo} alt="Labirinto do Saber" className="logo" />
        <nav className="navbar">
          <a href="/home" className="nav-link">Dashboard</a> 
          <a href="/activitiesMain" className="nav-link">Atividades</a>
          <a href="/alunos" className="nav-link active">Alunos</a> 
          <a href="/MainReport" className="nav-link">Relatórios</a>
        </nav>
        <div className="user-controls">
          <img src={iconNotification} alt="Notificações" className="icon" />
          <img src={iconProfile} alt="Perfil" className="icon profile-icon" />
        </div>
      </header>

      <main className="alunos-main-content">
        <div className="alunos-container">
        
          <div className="top-container">
            <div>
              <h1>Alunos</h1>
              <p className="subtitle">Visualize e gerencie informações e progresso de cada aluno.</p>
            </div>

            <button 
              className="create-patient-bnt" 
              onClick={ () => navigate('/CreatePacient') } 
            >
              Cadastrar novo aluno
            </button>
          </div>

          <div className="student-card-list">
            
            {loading ? (
                <p>Carregando alunos...</p>
            ) : alunos.length === 0 ? (
                <div style={{textAlign: 'center', width: '100%', padding: '20px'}}>
                    <p>Nenhum aluno encontrado.</p>
                </div>
            ) : (
                currentAlunos.map((aluno) => (
                    <div 
                        key={aluno.id} 
                        className="student-list-item-card" 
                        onClick={() => handleAlunoClick(aluno.id)} 
                        style={{cursor: 'pointer'}}
                    >
                        <img src={iconRandom} alt="Avatar" className="student-card-avatar" />
                        <div className="student-card-info">
                            <h3>{aluno.name}</h3>
                            <p>{aluno.age} anos</p>
                            <p className="student-topic">
                                {aluno.learningTopics && aluno.learningTopics.length > 0 
                                    ? aluno.learningTopics[0] 
                                    : "Sem objetivo definido"}
                            </p>
                        </div>
                    
                        <button 
                            className="edit-profile-btn" 
                            onClick={(e) => handleEditClick(e, aluno.id)}
                        >
                            Editar perfil
                        </button>
                    </div>
                ))
            )}

          </div>

          {totalPages > 1 && (
            <div className="pagination-controls">
                <button 
                    className="page-arrow" 
                    onClick={prevPage} 
                    disabled={currentPage === 1}
                    style={{ background: 'none', border: 'none', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                >
                    &lt;
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        className={`page-number ${currentPage === i + 1 ? 'active' : ''}`}
                        onClick={() => paginate(i + 1)}
                        style={{ 
                            background: 'none', 
                            border: 'none', 
                            cursor: 'pointer',
                            fontWeight: currentPage === i + 1 ? 'bold' : 'normal'
                        }}
                    >
                        {i + 1}
                    </button>
                ))}

                <button 
                    className="page-arrow" 
                    onClick={nextPage} 
                    disabled={currentPage === totalPages}
                    style={{ background: 'none', border: 'none', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
                >
                    &gt;
                </button>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

export default AlunosPage;