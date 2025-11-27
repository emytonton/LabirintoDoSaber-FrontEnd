import React, { useState } from "react";
import "./style.css"; 
import { useNavigate } from "react-router-dom";

// Imports de imagens (ajuste conforme seu projeto)
import logo from "../../assets/images/logo.png";
import iconNotification from "../../assets/images/icon_notification.png";
import iconProfile from "../../assets/images/icon_profile.png"; // Seu avatar atual
import iconArrowLeft from "../../assets/images/seta_icon_esquerda.png";
import iconUpload from "../../assets/images/icon_profile.png"; // Use um ícone de nuvem se tiver, ou o profile temporariamente

function ProfileEdit() {
    const navigate = useNavigate();

    // Estados do formulário
    const [formData, setFormData] = useState({
        name: "Dra. Aline Pereira",
        profession: "",
        email: "draalina@gmail.com",
        contact: ""
    });

    const [fileName, setFileName] = useState("Nenhum arquivo foi selecionado");

    // Função para simular o clique no input de arquivo
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
                                {/* Ícone de usuário padrão (preto na imagem) */}
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
                                <button type="button" className="btn-save-profile">
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