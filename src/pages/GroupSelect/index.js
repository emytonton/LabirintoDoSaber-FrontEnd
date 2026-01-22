import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import iconDoubleCard from "../../assets/images/iconDoublecard.png";
import iconSeta from "../../assets/images/seta_icon.png";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../components/ui/NavBar/index.js";


const PlusIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 5V19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 12H19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


const CheckIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 6L9 17L4 12" stroke="#AEE2E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

function GroupSelectPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { notebookId, currentGroupIds = [] } = location.state || {};

    const [availableGroups, setAvailableGroups] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]); 
    const [loading, setLoading] = useState(true);

    const categoryMap = {
        'reading': 'Leitura',
        'writing': 'Escrita',
        'vocabulary': 'Vocabulário',
        'comprehension': 'Compreensão'
    };

   
    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const config = { headers: { Authorization: `Bearer ${token}` } };
                const response = await axios.get('https://labirinto-do-saber.vercel.app/task-group/list-by-educator', config);
                setAvailableGroups(response.data || []);
                setLoading(false);
            } catch (error) {
                console.error("Erro ao buscar grupos:", error);
                setLoading(false);
            }
        };

        if (!notebookId) {
            alert("ID do caderno não identificado. Retornando...");
            navigate(-1);
            return;
        }

        fetchGroups();
    }, [notebookId, navigate]);


    const toggleSelection = (groupId) => {
        if (currentGroupIds.includes(groupId)) return; 

        setSelectedIds(prev => {
            if (prev.includes(groupId)) {
                return prev.filter(id => id !== groupId); 
            } else {
                return [...prev, groupId]; 
            }
        });
    };

   
    const handleSaveToNotebook = async () => {
        if (selectedIds.length === 0) {
            alert("Nenhum grupo novo selecionado.");
            return;
        }

        try {
            const token = localStorage.getItem('authToken');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const finalGroupIds = [...currentGroupIds, ...selectedIds];

            const payload = {
                taskNotebookId: notebookId,
                taskGroupsIds: finalGroupIds
            };

            await axios.put('https://labirinto-do-saber.vercel.app/task-notebook/update', payload, config);
            alert("Grupos adicionados com sucesso!");
           navigate('/NotebookDetails', { 
                state: { notebookId: notebookId } 
            });

        } catch (error) {
            console.error("Erro ao atualizar caderno:", error);
            alert("Erro ao adicionar grupos ao caderno.");
        }
    };

 
    const isAlreadyInNotebook = (id) => currentGroupIds.includes(id);

    return (
        <div className="dashboard-container">
            <Navbar activePage="activities" />

            <main className="manage-group-select-main-content">
                
                <div className="manage-group-select-container">
                    <div className="top-container">
                        <h1>Adicionar Atividades</h1>
                        <h2>Selecione os grupos para adicionar ao caderno</h2>
                    </div>

                    <div className="group-select-card-list">
                        
                        {loading ? (
                            <p>Carregando grupos...</p>
                        ) : (
                            availableGroups.map((group) => {
                                const isSelected = selectedIds.includes(group.id);
                                const isOwned = isAlreadyInNotebook(group.id);

                                return (
                                    <div 
                                        className="group-select-row-wrapper" 
                                        key={group.id}
                                        onClick={() => !isOwned && toggleSelection(group.id)}
                                        style={{ 
                                            opacity: isOwned ? 0.6 : 1, 
                                            cursor: isOwned ? "default" : "pointer" 
                                        }}
                                    >
                                        <div 
                                            className="group-select-list-item-card" 
                                            style={{ 
                                                border: isSelected ? "2px solid #AEE2E0" : "1px solid #ddd",
                                                backgroundColor: isSelected ? "#F3FBFB" : "#fff"
                                            }}
                                        >
                                            <img src={iconDoubleCard} alt="Icone" className="group-select-card-icon" />
                                            
                                            <div className="group-select-card-info">
                                                <h3>{group.name || "Sem Nome"}</h3>
                                                <button className="group-select-bnt-details">
                                                    {categoryMap[group.category] || group.category}
                                                </button>
                                                {isOwned && <span style={{fontSize: '12px', color: 'gray', marginLeft: '10px'}}>(Já adicionado)</span>}
                                            </div>
                                        </div>

                                        
                                        <button 
                                            className="remove-group-select-btn" 
                                            style={{ 
                                                backgroundColor: isSelected ? "#e8f5e9" : "#f0f0f0",
                                                border: "none"
                                            }}
                                            title={isOwned ? "Já no caderno" : "Adicionar este grupo"}
                                            disabled={isOwned}
                                        >
                                            {isOwned || isSelected ? <CheckIcon /> : <PlusIcon />}
                                        </button>
                                    </div>
                                );
                            })
                        )}

                    </div>

                   
                    {!loading && availableGroups.length > 0 && (
                        <div className="pagination-controls">
                            <a href="#" className="page-arrow">&lt;</a>
                            <a href="#" className="page-number active">1</a>
                            <a href="#" className="page-arrow">&gt;</a>
                        </div>
                    )}

                   
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '40px' }}>
                        <button 
                            onClick={handleSaveToNotebook}
                            style={{
                                padding: '12px 24px',
                                backgroundColor: '#AEE2E0',
                                color: '#000',
                                border: 'none',
                                borderRadius: '30px',
                                fontSize: '16px',
                                cursor: 'pointer',
                                width: '100%',
                                maxWidth: '300px',
                                fontFamily: 'Nunito',
                                fontWeight: 'bold'
                            }}
                        >
                            Adicionar Grupos Selecionados
                        </button>
                    </div>

                </div>
            </main>
        </div>
    );
}

export default GroupSelectPage;