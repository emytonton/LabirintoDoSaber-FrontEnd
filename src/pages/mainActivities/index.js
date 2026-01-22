import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css'; 
import Navbar from "../../components/ui/NavBar/index.js";
import iconCaderno from '../../assets/images/caderneta.png';
import iconSeta from '../../assets/images/seta_icon.png';
import { useNavigate } from 'react-router-dom'; 
import PageTurner from '../../components/ui/PageTurner/index.js';

function AlunosPage() {
  const navigate = useNavigate(); 
  const [notebooks, setNotebooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [isCriarOpen, setIsCriarOpen] = useState(false);
  const [isGerenciarOpen, setIsGerenciarOpen] = useState(false);

 
  useEffect(() => {
    const fetchNotebooks = async () => {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        navigate('/');
        return;
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      try {
        const response = await axios.get('https://labirinto-do-saber.vercel.app/task-notebook/', config);
        setNotebooks(response.data);
      } catch (error) {
        console.error("Erro ao buscar cadernos:", error);
        if (error.response && error.response.status === 401) {
            navigate('/');
        }
      }
    };

    fetchNotebooks();
  }, [navigate]);


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNotebooks = notebooks.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(notebooks.length / itemsPerPage);

  const paginate = (page) => setCurrentPage(page);


const handleAlunoClick = (notebookId) => {
    navigate('/NotebookDetails', { state: { notebookId: notebookId } });
  };
  
  const handleNavigate = (path) => {
      setIsCriarOpen(false);
      setIsGerenciarOpen(false);
      navigate(path);
  };
  
  const toggleCriar = () => {
      setIsCriarOpen(!isCriarOpen);
      setIsGerenciarOpen(false); 
  };

  const toggleGerenciar = () => {
      setIsGerenciarOpen(!isGerenciarOpen);
      setIsCriarOpen(false); 
  };

  return (
    <div className="dashboard-container">
      <Navbar />

      <main className="alunos-main-content">
        <div className="alunos-container">
           
          <div className="top-container-head">
          <h1>Atividades</h1>
          <div className="bnts-top">
                <div className="button-and-subtitle-wrapper">
                    <div className={`dropdown-button-container ${isCriarOpen ? 'active' : ''}`}>
                        <div 
                            className="create-caderno dropdown-toggle" 
                            onClick={toggleCriar}
                        > 
                            <span>Criar</span> 
                            <svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="dropdown-arrow">
                                <path d="M0.5 0.5L6.5 6.5L12.5 0.5" stroke="black" strokeLinecap="round"/>
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
                </div>

                <div className="button-and-subtitle-wrapper">
                    <div className={`dropdown-button-container ${isGerenciarOpen ? 'active' : ''}`}>
                        <div 
                            className="create-caderno dropdown-toggle" 
                            onClick={toggleGerenciar}
                        > 
                            <span>Gerenciar</span> 
                            <svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="dropdown-arrow">
                                <path d="M0.5 0.5L6.5 6.5L12.5 0.5" stroke="black" strokeLinecap="round"/>
                            </svg>
                        </div>
                        
                        {isGerenciarOpen && (
                            <div className="dropdown-menu">
                                <a onClick={() => handleNavigate('/ManageNotebook')}>Gerenciar cadernos</a>
                                <a onClick={() => handleNavigate('/ManageGroup')}>Gerenciar grupo de atividades</a>
                                <a onClick={() => handleNavigate('/ManageActivities')}>Gerenciar atividades</a>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
          

          <div className="student-card-list">
            {currentNotebooks.length > 0 ? (
                currentNotebooks.map((item) => (
                    <div 
                        key={item.notebook.id} 
                        className="student-list-item-card" 
                        onClick={() => handleAlunoClick(item.notebook.id)} 
                        style={{cursor: 'pointer'}}
                    >
                        <img src={iconCaderno} alt="Avatar" className="caderno-avatar" />
                        <div className="student-card-info">
                        
                            <h3>{item.notebook.description || "Caderno sem título"}</h3>
                            
                        
                            <p>
                                {item.taskGroups.length > 0 
                                ? `${item.taskGroups.length} grupo(s) de atividades.` 
                                : "Nenhum grupo de atividades vinculado."}
                            </p>
                            
                    
                            <button className="bnt-details"> 
                                {item.notebook.category ? item.notebook.category : "Geral"} 
                            </button>
                        </div>
                    
                        <div className="back-arrow">
                            <img src={iconSeta} alt="seta" className="seta-main"/>
                        </div>
                    </div>
                ))
            ) : (
                <p style={{textAlign: 'center', width: '100%', marginTop: '20px'}}>
                    Carregando...
                </p>
            )}
          </div>
          <PageTurner
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={paginate}
          />
        </div>
      </main>
    </div>
  );
}

export default AlunosPage;