import React, { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
import logo from "../../assets/images/logo.png";
import iconNotification from "../../assets/images/icon_notification.png";
import iconProfile from "../../assets/images/icon_profile.png";
import iconActivitie from "../../assets/images/iconActivitie.png";
import iconSeta from "../../assets/images/seta_icon.png";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/ui/NavBar/index.js";

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Excluir Atividade</h3>
        <p>Tem certeza que deseja excluir esta atividade? Esta ação não pode ser desfeita.</p>
        <div className="modal-actions">
          <button className="modal-btn cancel" onClick={onClose}>Cancelar</button>
          <button className="modal-btn confirm" onClick={onConfirm}>Excluir</button>
        </div>
      </div>
    </div>
  );
};

function ManageActivitiesPage() {
  const navigate = useNavigate();
  

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activityToDelete, setActivityToDelete] = useState(null);


  const categoryMap = {
    'reading': 'Leitura',
    'writing': 'Escrita',
    'vocabulary': 'Vocabulário',
    'comprehension': 'Compreensão'
  };

  const TrashIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 6H19L18.1245 19.133C18.0544 20.1836 17.1818 21 16.1289 21H7.87111C6.81818 21 5.94558 20.1836 5.87554 19.133L5 6Z" stroke="black" strokeWidth="2"/>
        <path d="M9 6V3H15V6" stroke="black" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M3 6H21" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        <path d="M10 10V17" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        <path d="M14 10V17" stroke="black" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );

  
  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/'); 
        return;
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const response = await axios.get('https://labirinto-do-saber.vercel.app/task/', config);
      
      
      if (Array.isArray(response.data)) {
        setActivities(response.data);
      } else {
        console.error("Formato inesperado:", response.data);
      }
      setLoading(false);

    } catch (error) {
      console.error("Erro ao buscar atividades:", error);
      setLoading(false);
    }
  };

  
  const handleDeleteClick = (e, id) => {
    e.stopPropagation();
    setActivityToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!activityToDelete) return;

    try {
      const token = localStorage.getItem('authToken');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      await axios.delete(`https://labirinto-do-saber.vercel.app/task/delete/${activityToDelete}`, config);
      
     
      setActivities(activities.filter(act => act.id !== activityToDelete));
      setIsModalOpen(false);
      setActivityToDelete(null);
      alert("Atividade excluída com sucesso!");

    } catch (error) {
      console.error("Erro ao excluir:", error);
      alert("Erro ao excluir atividade.");
      setIsModalOpen(false);
    }
  };

  const handleActivityClick = (id) => {
    navigate(`/activityDetails`, { state: { activityId: id } });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentActivities = activities.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(activities.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  return (
    <div className="dashboard-container">
      
   
      <DeleteModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={confirmDelete} 
      />

     <Navbar activePage="activities" />

      <main className="manage-activities-main-content">
        
        <div className="manage-activities-container">
          
          <div className="top-container">
            <div>
                <h1>Atividades</h1>
                <h2>Gerencie as atividades</h2>
            </div>
            <button 
                className="create-patient-bnt" 
                onClick={() => navigate('/CreateNewActivitie')}
                style={{marginLeft: 'auto'}}
            >
                Nova Atividade
            </button>
          </div>

          <div className="activity-card-list">
            
            {loading ? (
                <p>Carregando atividades...</p>
            ) : activities.length === 0 ? (
                <p>Nenhuma atividade encontrada.</p>
            ) : (
                currentActivities.map((activity) => (
                    <div className="activity-row-wrapper" key={activity.id}>
                        <div
                            className="activity-list-item-card"
                            onClick={() => handleActivityClick(activity.id)}
                            style={{ cursor: "pointer" }}
                        >
                            <img
                                src={iconActivitie}
                                alt="Icone"
                                className="activity-card-icon"
                            />
            
                            <div className="activity-card-info">
                                <h3>{activity.prompt}</h3>
                                <button className="activity-bnt-details">
                                    {categoryMap[activity.category] || activity.category}
                                </button>
                            </div>
                            
                            <span className="back-arrow"> 
                                <img src={iconSeta} alt="seta" className="seta" />
                            </span>
                        </div>
                        
                        <button 
                            className="remove-activity-btn" 
                            onClick={(e) => handleDeleteClick(e, activity.id)} 
                            title="Remover Atividade"
                        >
                            <TrashIcon />
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

    
      <style>{`
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        .modal-content {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            width: 90%;
            max-width: 400px;
            text-align: center;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .modal-actions {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-top: 1.5rem;
        }
        .modal-btn {
            padding: 0.5rem 1.5rem;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-weight: bold;
        }
        .modal-btn.cancel {
            background-color: #e0e0e0;
            color: #333;
        }
        .modal-btn.confirm {
            background-color: #008D85;
            color: white;
        }
      `}</style>
    </div>
  );
}

export default ManageActivitiesPage;