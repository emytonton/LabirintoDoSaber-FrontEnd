import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import iconArrowLeft from "../../assets/images/seta_icon_esquerda.png";
import iconSeta from "../../assets/images/seta_icon.png";
import iconDoubleCard from "../../assets/images/iconDoublecard.png";
import iconActivitie from "../../assets/images/iconActivitie.png"; // Certifique-se de importar este ícone
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../components/ui/NavBar/index.js";
const TrashIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 6H19L18.1245 19.133C18.0544 20.1836 17.1818 21 16.1289 21H7.87111C6.81818 21 5.94558 20.1836 5.87554 19.133L5 6Z" stroke="black" strokeWidth="2"/>
        <path d="M9 6V3H15V6" stroke="black" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M3 6H21" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        <path d="M10 10V17" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        <path d="M14 10V17" stroke="black" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

function NotebookDetailsPage() {
    const navigate = useNavigate();
    const location = useLocation();

    // ID do caderno vindo da navegação
    const { notebookId } = location.state || {};

    // --- ESTADOS ---
    const [notebookName, setNotebookName] = useState("Carregando...");
    const [taskGroups, setTaskGroups] = useState([]); // Grupos dentro do caderno
    const [allTasks, setAllTasks] = useState([]); // Todas as tarefas (para pegar detalhes)
    const [loading, setLoading] = useState(true);

    // Estados do Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);

    const categoryMap = {
        'reading': 'Leitura',
        'writing': 'Escrita',
        'vocabulary': 'Vocabulário',
        'comprehension': 'Compreensão'
    };

    // --- BUSCAR DADOS ---
    useEffect(() => {
        const fetchData = async () => {
            if (!notebookId) {
                alert("Erro: ID do caderno não informado.");
                navigate('/manageNotebooks');
                return;
            }

            try {
                const token = localStorage.getItem('authToken');
                const config = { headers: { Authorization: `Bearer ${token}` } };

                // Fazemos 2 requisições ao mesmo tempo: Cadernos e Tarefas
                const [notebooksResponse, tasksResponse] = await Promise.all([
                    axios.get('https://labirinto-do-saber.vercel.app/task-notebook/', config),
                    axios.get('https://labirinto-do-saber.vercel.app/task/', config)
                ]);
                
                // 1. Salvar todas as tarefas para consulta futura
                if (Array.isArray(tasksResponse.data)) {
                    setAllTasks(tasksResponse.data);
                }

                // 2. Filtrar o caderno específico
                const allNotebooks = notebooksResponse.data;
                const foundItem = allNotebooks.find(item => item.notebook.id === notebookId);

                if (foundItem) {
                    setNotebookName(foundItem.notebook.description || "Sem descrição");
                    setTaskGroups(foundItem.taskGroups || []);
                } else {
                    setNotebookName("Caderno não encontrado");
                }

                setLoading(false);

            } catch (error) {
                console.error("Erro ao buscar dados:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [notebookId, navigate]);


    // --- LÓGICA DO MODAL ---
    
    // Ao clicar num grupo (card)
    const handleGroupClick = (group) => {
        setSelectedGroup(group);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedGroup(null);
    };

    // Função mágica que pega os IDs do grupo e transforma em objetos de tarefa completos
    const getResolvedTasksForGroup = (group) => {
        if (!group || !group.tasksIds) return [];
        
        // Mapeia os IDs e encontra a tarefa correspondente na lista 'allTasks'
        return group.tasksIds
            .map(id => allTasks.find(task => task.id === id))
            .filter(Boolean); // Remove undefined se não achar alguma
    };

    // Ações dentro do modal (opcionais por enquanto)
    const handleEditActivityInModal = () => {
        console.log("Editar atividade clicada.");
    };

    const handleRemoveActivityFromGroup = (e) => {
        e.stopPropagation();
        alert("Remover atividade do grupo em breve.");
    };

    const handleRemoveGroup = (e, id) => {
        e.stopPropagation();
        alert("Funcionalidade de remover grupo do caderno em breve.");
    };
    
    return (
        <div className="dashboard-container">
           <Navbar activePage="activities" />
            <main className="notebook-details-main-content">
                <a href="/ManageNotebook" className="back-arrow-link">
                    <img src={iconArrowLeft} alt="Voltar" className="back-arrow-icon" />
                </a>
                <div className="notebook-details-container">
                    <div className="top-container">
                        <h1>Caderno: {notebookName}</h1>
                        <button 
                            className="add-group-btn" 
                            onClick={ () => navigate('/GroupSelect') }
                        >
                            Adicionar novo grupo
                        </button>
                    </div>

                    <div className="details-activity-list">
                        
                        {loading ? (
                            <p>Carregando...</p>
                        ) : taskGroups.length === 0 ? (
                            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                <p>Nenhum grupo encontrado neste caderno.</p>
                            </div>
                        ) : (
                            // LISTA DE GRUPOS
                            taskGroups.map((group) => (
                                <div className="activity-details-row-wrapper" key={group.id}>
                                    <div 
                                        className="activity-details-list-item-card" 
                                        // AQUI MUDOU: Agora abre o modal ao clicar
                                        onClick={() => handleGroupClick(group)} 
                                        style={{ cursor: "pointer" }}
                                    >
                                        <img src={iconDoubleCard} alt="icone" className="activity-details-card-icon" />
                                        <div className="activity-details-card-info">
                                            <h3>{group.name || "Grupo sem nome"}</h3>
                                            <button className="activity-details-bnt-details">
                                                {categoryMap[group.category] || group.category}
                                            </button>
                                        </div>
                                        
                                        <span className="back-arrow">
                                            <img src={iconSeta} alt="seta" className="seta" />
                                        </span>
                                    </div>
                                    <button 
                                        className="remove-activity-btn" 
                                        onClick={(e) => handleRemoveGroup(e, group.id)} 
                                        title="Remover Grupo do Caderno"
                                    >
                                        <TrashIcon />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </main>

            {/* --- MODAL (IGUALZINHO AO DA TELA DE GRUPOS) --- */}
            {isModalOpen && selectedGroup && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2 className="modal-title">{selectedGroup.name}</h2>
                            <button className="modal-close-btn" onClick={closeModal}>&times;</button>
                        </div>

                        <div className="modal-body">
                            <p style={{ color: "#666", marginBottom: "15px" }}>
                                Categoria: {categoryMap[selectedGroup.category] || selectedGroup.category}
                            </p>

                            <div className="activity-card-list">
                                {getResolvedTasksForGroup(selectedGroup).length > 0 ? (
                                    getResolvedTasksForGroup(selectedGroup).map((task) => (
                                        <div key={task.id} className="group-row-wrapper modal-activity-row">
                                            <div
                                                className="group-list-item-card modal-group-task-card"
                                                onClick={handleEditActivityInModal}
                                                style={{ cursor: "pointer" }}
                                            >
                                                <img src={iconActivitie} alt="icone atividade" className="activity-card-icon" />
                                                <div className="group-card-info">
                                                    {/* Exibindo prompt ou descrição da tarefa */}
                                                    <h3>{task.prompt ? (task.prompt.slice(0, 40) + "...") : "Tarefa sem título"}</h3>
                                                    <button className="group-bnt-details">
                                                        {categoryMap[task.category] || task.category}
                                                    </button>
                                                </div>
                                            </div>

                                            <button className="remove-group-btn" onClick={handleRemoveActivityFromGroup}>
                                                <TrashIcon />
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <p>Este grupo não possui atividades ou as atividades não foram carregadas.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default NotebookDetailsPage;