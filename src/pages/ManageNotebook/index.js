import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import iconArrowLeft from "../../assets/images/seta_icon_esquerda.png";
import iconCard from "../../assets/images/caderneta.png";
import iconSeta from "../../assets/images/seta_icon.png";
import { useNavigate } from "react-router-dom";
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

function ManageNotebookPage() {
    const navigate = useNavigate();
    
    // --- ESTADOS ---
    const [notebooks, setNotebooks] = useState([]);
    const [loading, setLoading] = useState(true);

    // Paginação
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; // Apenas 3 por página conforme solicitado

    // Mapa de Categorias
    const categoryMap = {
        'reading': 'Leitura',
        'writing': 'Escrita',
        'vocabulary': 'Vocabulário',
        'comprehension': 'Compreensão'
    };

    // --- BUSCAR CADERNOS ---
    useEffect(() => {
        const fetchNotebooks = async () => {
            try {
                const token = localStorage.getItem('authToken');
                if (!token) {
                    navigate('/');
                    return;
                }

                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };

                const response = await axios.get('https://labirinto-do-saber.vercel.app/task-notebook/', config);
                
                console.log("Cadernos retornados:", response.data);

                if (Array.isArray(response.data)) {
                    setNotebooks(response.data);
                } else {
                    console.error("Formato inesperado:", response.data);
                }
                setLoading(false);

            } catch (error) {
                console.error("Erro ao buscar cadernos:", error);
                setLoading(false);
            }
        };

        fetchNotebooks();
    }, [navigate]);
    
    const handleNotebookClick = (id) => { 
        // Passa o ID via state para a página de detalhes saber qual carregar
        navigate("/NotebookDetails", { state: { notebookId: id } });
    };
    
    const handleRemoveNotebook = (e, id) => {
        e.stopPropagation();
        console.log("Remover CADERNO ID:", id);
        alert("Funcionalidade de remover caderno em breve.");
    };

    // --- LÓGICA DE PAGINAÇÃO ---
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentNotebooks = notebooks.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(notebooks.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
    const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
    
    return (
        <div className="dashboard-container">
           <Navbar activePage="activities" />
            
            <main className="manage-notebook-main-content">
                    <a href="/activitiesMain" className="back-arrow-link">
                        <img src={iconArrowLeft} alt="Voltar" className="back-arrow-icon" />
                    </a>
                <div className="manage-notebook-container">
                    <div className="top-container">
                        <div>
                            <h1>Gerenciar cadernos</h1>
                            <h2>Gerencie os cadernos</h2>
                        </div>
                        {/* Botão opcional para criar novo caderno, se desejar */}
                        <button 
                            className="create-patient-bnt" 
                            onClick={() => navigate('/addNotebook')} // Ajuste a rota se necessário
                            style={{marginLeft: 'auto'}}
                        >
                            Novo Caderno
                        </button>
                    </div>

                    <div className="notebook-card-list">
                        
                        {loading ? (
                            <p>Carregando cadernos...</p>
                        ) : notebooks.length === 0 ? (
                            <p>Nenhum caderno encontrado.</p>
                        ) : (
                            currentNotebooks.map((item) => {
                                // O objeto retornado tem a estrutura { notebook: {...}, taskGroups: [...] }
                                // Precisamos acessar item.notebook
                                const notebook = item.notebook;
                                
                                return (
                                    <div className="notebook-row-wrapper" key={notebook.id}>
                                        <div 
                                            className="notebook-list-item-card" 
                                            onClick={() => handleNotebookClick(notebook.id)} 
                                            style={{ cursor: "pointer" }}
                                        >
                                            <img src={iconCard} alt="Avatar" className="notebook-card-icon" />
                                            <div className="notebook-card-info">
                                                {/* Usando description como título, já que o JSON não tem 'name' */}
                                                <h3>{notebook.description || "Caderno sem descrição"}</h3>
                                                <button className="notebook-bnt-details">
                                                    {categoryMap[notebook.category] || notebook.category}
                                                </button>
                                            </div>
                                            <span className="back-arrow">
                                                <img src={iconSeta} alt="seta" className="seta" />
                                            </span>
                                        </div>
                                        <button 
                                            className="remove-notebook-btn" 
                                            onClick={(e) => handleRemoveNotebook(e, notebook.id)} 
                                            title="Remover CADERNO"
                                        >
                                            <TrashIcon />
                                        </button>
                                    </div>
                                );
                            })
                        )}

                    </div>

                    {/* Paginação */}
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

export default ManageNotebookPage;