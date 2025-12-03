import React, { useState, useEffect } from "react";
import "./style.css"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Imports de imagens
import logo from "../../assets/images/logo.png";
import iconNotification from "../../assets/images/icon_notification.png";
import iconProfile from "../../assets/images/icon_profile.png"; 
import iconArrowLeft from "../../assets/images/seta_icon_esquerda.png";

function ProfileEdit() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    // Estados do formulário
    const [formData, setFormData] = useState({
        name: "",
        profession: "", // A API não retorna isso ainda, iniciará vazio
        email: "",
        contact: ""     // A API não retorna isso ainda, iniciará vazio
    });

    const [fileName, setFileName] = useState("Nenhum arquivo foi selecionado");

    // --- INTEGRANDO A API (GET DADOS DO USUÁRIO) ---
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('authToken');

                if (!token) {
                    navigate('/'); // Redireciona se não tiver login
                    return;
                }

                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };

                // Usando a rota de produção para consistência, altere para localhost se precisar
                const response = await axios.get("https://labirinto-do-saber.vercel.app/educator/me", config);
                
                const userData = response.data;

                setFormData({
                    name: userData.name || "",
                    email: userData.email || "",
                    profession: "", // Mantém vazio ou valor padrão pois API não fornece
                    contact: ""     // Mantém vazio ou valor padrão pois API não fornece
                });

                setLoading(false);

            } catch (error) {
                console.error("Erro ao buscar perfil:", error);
                if (error.response && error.response.status === 401) {
                    alert("Sessão expirada.");
                    navigate('/');
                }
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    // --- MANIPULADORES DE FORMULÁRIO ---

    const handleFileClick = (e) => {
        e.preventDefault();
        document.getElementById("fileInputHidden").click();
    };

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Função para salvar (PUT/PATCH) - Estrutura pronta para quando tiver o endpoint
    const handleSave = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            
            console.log("Salvando dados:", formData);
            
            // Exemplo de chamada para atualizar (Descomente e ajuste a URL quando tiver a rota)
            /*
            await axios.patch("https://labirinto-do-saber.vercel.app/educator/me", {
                name: formData.name,
                // outros campos se a API suportar
            }, config);
            */

            alert("Perfil atualizado com sucesso! (Simulação)");
            // navigate('/home'); // Opcional: voltar para home

        } catch (error) {
            console.error("Erro ao salvar:", error);
            alert("Erro ao atualizar perfil.");
        }
    };

    if (loading) {
        return (
            <div className="dashboard-container">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <h2>Carregando perfil...</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            {/* --- HEADER PADRÃO --- */}
            <header className="header">
                <img src={logo} alt="Labirinto do Saber" className="logo" />
                <nav className="navbar">
                    <a href="/home" className="nav-link">Dashboard</a>
                    <a href="/activitiesMain" className="nav-link">Atividades</a>
                    <a href="/alunos" className="nav-link">Alunos</a>
                    <a href="/MainReport" className="nav-link">Relatórios</a>
                </nav>
                <div className="user-controls">
                    <img src={iconNotification} alt="Notificações" className="icon" />
                    <img src={iconProfile} alt="Perfil" className="icon profile-icon" />
                </div>
            </header>

            {/* --- CONTEÚDO --- */}
            <main className="profile-main-content">
                <div className="profile-container">
                    
                    {/* Botão Voltar */}
                    <div className="top-nav-row">
                        <a href="#" onClick={(e) => { e.preventDefault(); navigate(-1); }} className="back-arrow-link">
                            <img src={iconArrowLeft} alt="Voltar" className="back-arrow-icon" />
                        </a>
                    </div>

                    {/* Card Branco de Edição */}
                    <div className="profile-edit-card">
                        
                        {/* Seção da Foto */}
                        <div className="avatar-upload-section">
                            <div className="avatar-placeholder-large">
                                <div className="default-user-icon">
                                    <div className="user-head"></div>
                                    <div className="user-body"></div>
                                </div>
                            </div>

                            <div className="upload-controls">
                                <label className="field-label">Foto de perfil</label>
                                
                                <div className="custom-file-wrapper">
                                    <button className="btn-select-file" onClick={handleFileClick}>
                                        ☁️ Selecionar arquivo
                                    </button>
                                    <span className="file-status-text">{fileName}</span>
                                    <input 
                                        type="file" 
                                        id="fileInputHidden" 
                                        style={{ display: "none" }} 
                                        onChange={handleFileChange}
                                        accept="image/png, image/jpeg"
                                    />
                                </div>
                                <p className="upload-hint">Formatos aceitos: JPG, PNG. Tamanho máximo: 2MB.</p>
                            </div>
                        </div>

                        {/* Formulário */}
                        <form className="profile-form">
                            <div className="form-group">
                                <label className="field-label">Nome do profissional</label>
                                <input 
                                    type="text" 
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="Nome completo"
                                />
                            </div>

                            <div className="form-group">
                                <label className="field-label">Profissão</label>
                                <input 
                                    type="text" 
                                    name="profession"
                                    value={formData.profession}
                                    onChange={handleChange}
                                    placeholder="✎ Preencha aqui..."
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <label className="field-label">Email</label>
                                <input 
                                    type="email" 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="form-input"
                                    disabled // Geralmente email não se altera facilmente, ou remova o disabled se puder
                                    style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
                                />
                            </div>

                            <div className="form-group">
                                <label className="field-label">Contato do profissional</label>
                                <input 
                                    type="text" 
                                    name="contact"
                                    value={formData.contact}
                                    onChange={handleChange}
                                    placeholder="✎ Preencha aqui..."
                                    className="form-input"
                                />
                            </div>

                            <div className="form-actions">
                                <button type="button" className="btn-save-profile" onClick={handleSave}>
                                    Salvar perfil
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </main>
        </div>
    );
}

export default ProfileEdit;