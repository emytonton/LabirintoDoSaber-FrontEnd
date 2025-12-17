import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import iconDoubleCard from "../../assets/images/iconDoublecard.png";
import iconActivitie from "../../assets/images/iconActivitie.png";
import iconSeta from "../../assets/images/seta_icon.png";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../components/ui/NavBar/index.js";

// --- 1. MODAL DE CONFIRMAÇÃO (Delete) ---
const DeleteModal = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;
  
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h3>Confirmação</h3>
          <p>{message || "Tem certeza que deseja realizar esta ação?"}</p>
          <div className="modal-actions">
            <button className="modal-btn cancel" onClick={onClose}>Cancelar</button>
            <button className="modal-btn confirm" onClick={onConfirm}>Confirmar</button>
          </div>
        </div>
      </div>
    );
};

// --- 2. MODAL DE AVISO (Sucesso/Erro) ---
const WarningModal = ({ isOpen, onClose, title, message }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>{title}</h3>
                <p>{message}</p>
                <div className="modal-actions" style={{ justifyContent: 'center' }}>
                    <button className="modal-btn confirm" onClick={onClose}>OK</button>
                </div>
            </div>
        </div>
    );
};

// --- ÍCONE LIXEIRA ---
const TrashIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 6H19L18.1245 19.133C18.0544 20.1836 17.1818 21 16.1289 21H7.87111C6.81818 21 5.94558 20.1836 5.87554 19.133L5 6Z" stroke="black" strokeWidth="2"/>
        <path d="M9 6V3H15V6" stroke="black" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M3 6H21" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        <path d="M10 10V17" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        <path d="M14 10V17" stroke="black" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

// --- ESTILOS INLINE PARA OS MODAIS (Caso não tenha no CSS global) ---
const modalStyles = `
    .modal-overlay {
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex; justify-content: center; align-items: center; z-index: 1000;
    }
    .modal-content {
        background: white; padding: 2rem; border-radius: 8px;
        width: 90%; max-width: 400px; text-align: center;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .modal-header {
        display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;
    }
    .modal-actions {
        display: flex; justify-content: center; gap: 1rem; margin-top: 1.5rem;
    }
    .modal-btn {
        padding: 0.5rem 1.5rem; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;
    }
    .modal-btn.cancel { background-color: #e0e0e0; color: #333; }
    .modal-btn.confirm { background-color: #008D85; color: white; }
    .modal-close-btn { background: none; border: none; font-size: 1.5rem; cursor: pointer; }
`;

function NotebookDetailsPage() {
    const navigate = useNavigate();
    const location = useLocation();

    // ID do caderno vindo da navegação
    const { notebookId } = location.state || {};

    // --- ESTADOS DE DADOS ---
    const [notebookName, setNotebookName] = useState("Carregando...");
    const [taskGroups, setTaskGroups] = useState([]); 
    const [allTasks, setAllTasks] = useState([]); 
    const [loading, setLoading] = useState(true);

    // --- ESTADOS DE UI (MODAIS) ---
    // 1. Modal de Detalhes do Grupo
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);

    // 2. Modal de Confirmação (Delete)
    const [deleteModalState, setDeleteModalState] = useState({
        isOpen: false,
        groupId: null,
        message: ""
    });

    // 3. Modal de Aviso (Sucesso/Erro)
    const [warningModal, setWarningModal] = useState({ 
        isOpen: false, 
        title: "", 
        message: "", 
        onCloseAction: null // Função opcional para rodar ao fechar (ex: navegar)
    });

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
                // Usando o Warning Modal aqui seria complexo pois o componente nem montou direito, mantive alert/redirect rápido
                alert("Erro: ID do caderno não informado.");
                navigate('/ManageNotebook');
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


    // --- LÓGICA DO MODAL DE DETALHES ---
    const handleGroupClick = (group) => {
        setSelectedGroup(group);
        setIsDetailsModalOpen(true);
    };

    const closeDetailsModal = () => {
        setIsDetailsModalOpen(false);
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

    // --- LÓGICA DE EXCLUSÃO (Passo 1: Abrir Modal de Confirmação) ---
    const requestRemoveGroup = (e, groupIdToRemove) => {
        e.stopPropagation();
        
        // Verifica se é o último grupo para definir a mensagem
        const remainingGroups = taskGroups.filter(group => group.id !== groupIdToRemove);
        let msg = "Tem certeza que deseja remover este grupo do caderno?";
        
        if (remainingGroups.length === 0) {
            msg = "ATENÇÃO: Este é o único grupo do caderno. Ao removê-lo, o CADERNO INTEIRO será excluído. Deseja continuar?";
        }

        setDeleteModalState({
            isOpen: true,
            groupId: groupIdToRemove,
            message: msg
        });
    };

    // --- LÓGICA DE EXCLUSÃO (Passo 2: Executar Ação) ---
    const confirmRemoveGroup = async () => {
        const groupIdToRemove = deleteModalState.groupId;
        if (!groupIdToRemove) return;

        const token = localStorage.getItem('authToken');
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const remainingGroups = taskGroups.filter(group => group.id !== groupIdToRemove);
        const remainingGroupIds = remainingGroups.map(group => group.id);

        try {
            // CENÁRIO 1: Caderno Vazio -> Deletar Caderno
            if (remainingGroups.length === 0) {
                await axios.delete(
                    `https://labirinto-do-saber.vercel.app/task-notebook/delete/${notebookId}`,
                    config
                );

                // Fecha modal de delete e abre Warning de sucesso com redirecionamento
                setDeleteModalState({ isOpen: false, groupId: null, message: "" });
                setWarningModal({
                    isOpen: true,
                    title: "Caderno Excluído",
                    message: "O caderno foi excluído pois ficou sem grupos.",
                    onCloseAction: () => navigate('/ManageNotebook') // REDIRECIONAMENTO AQUI
                });
            } 
            // CENÁRIO 2: Atualizar Caderno
            else {
                const payload = {
                    taskNotebookId: notebookId,
                    taskGroupsIds: remainingGroupIds 
                };

                await axios.put(
                    'https://labirinto-do-saber.vercel.app/task-notebook/update',
                    payload,
                    config
                );

                setTaskGroups(remainingGroups);
                
                // Fecha modal de delete e abre Warning de sucesso simples
                setDeleteModalState({ isOpen: false, groupId: null, message: "" });
               
            }
        } catch (error) {
            console.error("Erro ao remover grupo:", error);
            setDeleteModalState({ isOpen: false, groupId: null, message: "" });
            setWarningModal({
                isOpen: true,
                title: "Erro",
                message: "Ocorreu um erro ao tentar realizar a operação.",
                onCloseAction: null
            });
        }
    };

    // Função para fechar o Warning Modal e executar ação extra se houver (ex: navegar)
    const handleCloseWarning = () => {
        const action = warningModal.onCloseAction;
        setWarningModal({ ...warningModal, isOpen: false });
        if (action) action();
    };

    return (
        <div className="dashboard-container">
            <style>{modalStyles}</style>

            <Navbar activePage="activities" />

            {/* --- MODAL DE CONFIRMAÇÃO (DELETE) --- */}
            <DeleteModal 
                isOpen={deleteModalState.isOpen}
                onClose={() => setDeleteModalState({ ...deleteModalState, isOpen: false })}
                onConfirm={confirmRemoveGroup}
                message={deleteModalState.message}
            />

            {/* --- MODAL DE AVISO (SUCESSO/ERRO) --- */}
            <WarningModal 
                isOpen={warningModal.isOpen}
                onClose={handleCloseWarning}
                title={warningModal.title}
                message={warningModal.message}
            />

            <main className="notebook-details-main-content">
                <div className="notebook-details-container">
                    <div className="top-container">
                        <h1>Caderno: {notebookName}</h1>
                        <button 
                            className="add-group-btn" 
                            onClick={() => navigate('/GroupSelect', { 
                                state: { 
                                    notebookId: notebookId, 
                                    currentGroupIds: taskGroups.map(g => g.id) 
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
                                        onClick={(e) => requestRemoveGroup(e, group.id)} 
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

            {/* --- MODAL DE DETALHES DO GRUPO --- */}
            {isDetailsModalOpen && selectedGroup && (
                <div className="modal-overlay" onClick={closeDetailsModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2 className="modal-title">{selectedGroup.name}</h2>
                            <button className="modal-close-btn" onClick={closeDetailsModal}>&times;</button>
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
                                                style={{ cursor: "pointer", width: "100%" }}
                                            >
                                                <img src={iconActivitie} alt="icone atividade" className="activity-card-icon" />
                                                <div className="group-card-info">
                                                    <h3>{task.prompt ? (task.prompt.slice(0, 40) + "...") : "Tarefa sem título"}</h3>
                                                    <button className="group-bnt-details">
                                                        {categoryMap[task.category] || task.category}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>Este grupo não possui atividades.</p>
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