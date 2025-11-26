import React, { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
import logo from "../../assets/images/logo.png";
import iconNotification from "../../assets/images/icon_notification.png";
import iconProfile from "../../assets/images/icon_profile.png";
import iconDoubleCard from "../../assets/images/iconDoublecard.png";
import iconSeta from "../../assets/images/seta_icon.png";
import iconActivitie from "../../assets/images/iconActivitie.png"; 
import { useNavigate } from "react-router-dom";

// Ícone de Lixeira
const TrashIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 6H19L18.1245 19.133C18.0544 20.1836 17.1818 21 16.1289 21H7.87111C6.81818 21 5.94558 20.1836 5.87554 19.133L5 6Z" stroke="black" strokeWidth="2"/>
        <path d="M9 6V3H15V6" stroke="black" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M3 6H21" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        <path d="M10 10V17" stroke="black" strokeWidth="2" strokeLinecap="round"/>
        <path d="M14 10V17" stroke="black" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

function ManageGroupPage() {
    const navigate = useNavigate();

    // Função adicionada para navegação do dropdown
    const handleNavigate = (path) => {
        navigate(path);
    };

    // --- ESTADOS ---
    const [groups, setGroups] = useState([]);
    const [allTasks, setAllTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);

    const categoryMap = {
        reading: "Leitura",
        writing: "Escrita",
        vocabulary: "Vocabulário",
        comprehension: "Compreensão"
    };

    // Buscar dados
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("authToken");
                if (!token) {
                    navigate("/");
                    return;
                }

                const config = { headers: { Authorization: `Bearer ${token}` } };

                const [groupsResponse, tasksResponse] = await Promise.all([
                    axios.get("https://labirinto-do-saber.vercel.app/task-group/list-by-educator", config),
                    axios.get("https://labirinto-do-saber.vercel.app/task/", config)
                ]);

                if (Array.isArray(groupsResponse.data)) setGroups(groupsResponse.data);
                if (Array.isArray(tasksResponse.data)) setAllTasks(tasksResponse.data);

                setLoading(false);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    const handleGroupClick = (group) => {
        setSelectedGroup(group);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedGroup(null);
    };

    const handleRemoveGroup = (e, id) => {
        e.stopPropagation();
        alert("Funcionalidade de excluir grupo será implementada em breve.");
    };

    const handleRemoveActivityFromGroup = (e) => {
        e.stopPropagation();
        alert("Remover atividade será implementado.");
    };

    const handleEditActivityInModal = () => {
        console.log("Editar atividade.");
    };

    const getResolvedTasksForGroup = (group) => {
        if (!group || !group.tasksIds) return [];
        return group.tasksIds
            .map(id => allTasks.find(task => task.id === id))
            .filter(Boolean);
    };

    // Paginação
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentGroups = groups.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(groups.length / itemsPerPage);

    return (
        <div className="dashboard-container">
            <header className="header">
                <img src={logo} alt="Labirinto do Saber" className="logo" />

                <nav className="navbar">
                    <a href="/home" className="nav-link">Dashboard</a>
                    <a href="/activitiesMain" className="nav-link active">Atividades</a>
                    <a href="/alunos" className="nav-link">Alunos</a>
                    <a href="#" className="nav-link">Relatórios</a>
                </nav>

                <div className="user-controls">
                    <img src={iconNotification} alt="Notificações" className="icon" />
                    <img src={iconProfile} alt="Perfil" className="icon profile-icon" />
                </div>
            </header>

            <main className="manage-groups-main-content">
                <div className="manage-groups-container">
                    <div className="top-container">
                        <h1>Grupo de atividades</h1>
                        <h2>Gerencie os grupos de atividades</h2>
                    </div>

                    {/* === DROPDOWN ADICIONADO AQUI === */}
                    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px", position: "relative" }}>
                        <div className="dropdown-menu">
                            <a onClick={() => handleNavigate('/addNotebook')}>Criar caderno</a>
                            <a onClick={() => handleNavigate('/GroupActivities')}>Criar grupo de atividades</a>
                            <a onClick={() => handleNavigate('/CreateNewActivitie')}>Criar atividade</a>
                        </div>

                        <button 
                            className="create-patient-bnt"
                            onClick={() => navigate('/createTaskGroup')}
                        >
                            Novo Grupo
                        </button>
                    </div>

                    <div className="group-card-list">
                        {loading ? (
                            <p>Carregando grupos...</p>
                        ) : groups.length === 0 ? (
                            <p>Nenhum grupo encontrado.</p>
                        ) : (
                            currentGroups.map((group) => (
                                <div className="group-row-wrapper" key={group.id}>
                                    <div
                                        className="group-list-item-card"
                                        onClick={() => handleGroupClick(group)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <img src={iconDoubleCard} alt="Icone Grupo" className="group-card-icon" />
                                        <div className="group-card-info">
                                            <h3>{group.name}</h3>
                                            <button className="group-bnt-details">
                                                {categoryMap[group.category] || group.category}
                                            </button>
                                        </div>
                                        <span className="back-arrow">
                                            <img src={iconSeta} alt="seta" className="seta" />
                                        </span>
                                    </div>

                                    <button
                                        className="remove-group-btn"
                                        onClick={(e) => handleRemoveGroup(e, group.id)}
                                        title="Remover Grupo"
                                    >
                                        <TrashIcon />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    {totalPages > 1 && (
                        <div className="pagination-controls">
                            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))}>&lt;</button>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button key={i} onClick={() => setCurrentPage(i + 1)}>
                                    {i + 1}
                                </button>
                            ))}
                            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}>&gt;</button>
                        </div>
                    )}
                </div>
            </main>

            {/* === MODAL === */}
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
                                                className="group-list-item-card modal-activity-item"
                                                onClick={handleEditActivityInModal}
                                                style={{ cursor: "pointer" }}
                                            >
                                                <img src={iconActivitie} className="activity-card-icon" />
                                                <div className="group-card-info">
                                                    <h3>{task.prompt?.slice(0, 40) + "..."}</h3>
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

export default ManageGroupPage;
