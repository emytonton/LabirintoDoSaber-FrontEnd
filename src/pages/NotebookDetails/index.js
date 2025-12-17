import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import logo from "../../assets/images/logo.png";
import iconNotification from "../../assets/images/icon_notification.png";
import iconProfile from "../../assets/images/icon_profile.png";
import iconSeta from "../../assets/images/seta_icon.png";
import iconDoubleCard from "../../assets/images/iconDoublecard.png";
import iconActivitie from "../../assets/images/iconActivitie.png";
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

                const [notebooksResponse, tasksResponse] = await Promise.all([
                    axios.get('https://labirinto-do-saber.vercel.app/task-notebook/', config),
                    axios.get('https://labirinto-do-saber.vercel.app/task/', config)
                ]);
                
                if (Array.isArray(tasksResponse.data)) {
                    setAllTasks(tasksResponse.data);
                }

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
    
    const handleGroupClick = (group) => {
        setSelectedGroup(group);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedGroup(null);
    };

    const getResolvedTasksForGroup = (group) => {
        if (!group || !group.tasksIds) return [];
        return group.tasksIds
            .map(id => allTasks.find(task => task.id === id))
            .filter(Boolean);
    };

    const handleEditActivityInModal = () => {
        console.log("Editar atividade clicada.");
    };

    // --- LÓGICA DE REMOÇÃO DO GRUPO (NOVA) ---
    const handleRemoveGroup = async (e, groupIdToRemove) => {
        e.stopPropagation(); // Evita abrir o modal ao clicar na lixeira
        
        const token = localStorage.getItem('authToken');
        const config = { headers: { Authorization: `Bearer ${token}` } };

        // 1. Calcula como ficaria a lista sem este grupo
        const remainingGroups = taskGroups.filter(group => group.id !== groupIdToRemove);
        const remainingGroupIds = remainingGroups.map(group => group.id);

        try {
            // CENÁRIO 1: É o último grupo (lista ficará vazia) -> Deletar Caderno
            if (remainingGroups.length === 0) {
                const confirmDeleteNotebook = window.confirm(
                    "Ao remover este último grupo, o caderno inteiro será excluído. Deseja continuar?"
                );

                if (!confirmDeleteNotebook) return;

                // Chama endpoint de DELETE do caderno
                await axios.delete(
                    `https://labirinto-do-saber.vercel.app/task-notebook/delete/${notebookId}`,
                    config
                );

                alert("Caderno excluído com sucesso!");
                navigate('/manageNotebooks'); // Redireciona para listagem de cadernos
            } 
            // CENÁRIO 2: Ainda restam grupos -> Atualizar Caderno
            else {
                const confirmRemoveGroup = window.confirm("Deseja remover este grupo do caderno?");
                
                if (!confirmRemoveGroup) return;

                // Prepara o payload conforme o Schema fornecido
                const payload = {
                    taskNotebookId: notebookId,
                    // category e description são opcionais, se quiser manter os atuais teria que tê-los no state.
                    // Aqui mandamos apenas os IDs dos grupos atualizados.
                    taskGroupsIds: remainingGroupIds 
                };

                // Chama endpoint de UPDATE (PUT)
                await axios.put(
                    'https://labirinto-do-saber.vercel.app/task-notebook/update',
                    payload,
                    config
                );

                // Atualiza o estado local para refletir a mudança na tela sem recarregar
                setTaskGroups(remainingGroups);
                alert("Grupo removido com sucesso!");
            }
        } catch (error) {
            console.error("Erro ao remover grupo:", error);
            alert("Ocorreu um erro ao tentar remover o grupo.");
        }
    };
    
    return (
        <div className="dashboard-container">
           <Navbar activePage="activities" />
            <main className="notebook-details-main-content">
                
                <div className="notebook-details-container">
                    <div className="top-container">
                        <h1>Caderno: {notebookName}</h1>
                        <button 
    className="add-group-btn" 
    onClick={ () => navigate('/GroupSelect', { 
        state: { 
            notebookId: notebookId, // ID do caderno atual
            currentGroupIds: taskGroups.map(g => g.id) // Lista atual de IDs para não duplicar
        } 
    })}
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
                                        // Chama a nova função de remover
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

            {/* --- MODAL --- */}
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
                                                style={{ cursor: "pointer", width: "100%" }} // Ajustei width já que removi o botão de lixeira
                                            >
                                                <img src={iconActivitie} alt="icone atividade" className="activity-card-icon" />
                                                <div className="group-card-info">
                                                    <h3>{task.prompt ? (task.prompt.slice(0, 40) + "...") : "Tarefa sem título"}</h3>
                                                    <button className="group-bnt-details">
                                                        {categoryMap[task.category] || task.category}
                                                    </button>
                                                </div>
                                            </div>
                                            {/* REMOVIDO O BOTÃO DE LIXEIRA DAQUI COMO SOLICITADO */}
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