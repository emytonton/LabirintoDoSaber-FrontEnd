import React, { useState } from 'react';
import axios from 'axios';
import './style.css'; 
import logo from '../../assets/images/logo.png';
import iconNotification from '../../assets/images/icon_notification.png';
import iconProfile from '../../assets/images/icon_profile.png';
import iconBack from '../../assets/images/seta_icon_esquerda.png'
import avatarPlaceholder from '../../assets/images/icon_random.png'; 
import iconUpload from '../../assets/images/iconUpload.png';
import iconPencil from '../../assets/images/edit.png';

function AlunosPage() {
    
    const [formData, setFormData] = useState({
        nome: '',
        idade: '',
        genero: 'male', 
        cep: '',
        rua: '',
        numero: '',
        contato: '',
        objetivo: '', 
    });
   
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const idadeNumerica = parseInt(formData.idade, 10);
        
        if (isNaN(idadeNumerica) || idadeNumerica < 1) {
            alert("Por favor, insira uma idade válida (número maior que zero).");
            return;
        }

        const payload = {
            name: formData.nome,
            age: idadeNumerica, 
            gender: formData.genero, 
            zipcode: formData.cep,
            road: formData.rua,
            housenumber: formData.numero,
            phonenumber: formData.contato,
            learningTopics: [formData.objetivo], 
        };
        
        console.log("Payload enviado:", payload);

        try {
            const response = await axios.post(
                'https://labirinto-do-saber.vercel.app/student/create',
                payload
            );

            console.log("✅ Aluno cadastrado com sucesso!", response.data);
            alert("Aluno cadastrado com sucesso!");
            
            setFormData({
                nome: '',
                idade: '', 
                genero: 'male',
                cep: '',
                rua: '',
                numero: '',
                contato: '',
                objetivo: '',
            });

        } catch (error) {
            console.error("❌ Erro ao salvar o perfil:", error.response ? error.response.data : error.message);
            
            let errorMsg = "Erro desconhecido ao cadastrar o aluno.";
            if (error.response) {
                 if (error.response.status === 401) {
                    errorMsg = "Erro de autenticação (401). Verifique se você está logado e se o token é válido.";
                } else if (error.response.data && error.response.data.message) {
                    errorMsg = `Erro ${error.response.status}. Detalhes: ${JSON.stringify(error.response.data)}`;
                }
            }
            alert(`Falha no cadastro: ${errorMsg}`);
        }
    };

    return (
        <div className="dashboard-container">
            
            <header className="header">
                <img src={logo} alt="Labirinto do Saber" className="logo" />
                <nav className="navbar">
                    <a href="/home" className="nav-link">Dashboard</a> 
                    <a href="/activitiesMain" className="nav-link">Atividades</a>
                    <a href="/alunos" className="nav-link active">Alunos</a> 
                    <a href="/MainReport" className="nav-link">Relatórios</a>
                </nav>
                <div className="user-controls">
                    <img src={iconNotification} alt="Notificações" className="icon" />
                    <img src={iconProfile} alt="Perfil" className="icon profile-icon" />
                </div>
            </header>

            <main className="main-content">
            
                <button className="back-button">
                    <a href="/alunos" className="back-arrow"><img src={iconBack} alt="seta" className="seta"/></a>
                </button>

                <div className="profile-card">
                    <form onSubmit={handleSubmit}>
    
                        <div className="profile-pic-section">
                            <img src={avatarPlaceholder} alt="Foto de perfil" className="avatar" />
                            <div className="file-uploader">
                                <label htmlFor="file-upload" className="file-upload-label">
                                    <img src={iconUpload} alt="" style={{ width: 20, height: 20, opacity: 0.7 }} />
                                    Selecionar arquivo
                                </label>
                                <input id="file-upload" type="file" />
                                <span className="file-name">Nenhum arquivo foi selecionado</span>
                                <p className="file-hint">Formatos aceitos: JPG, PNG. Tamanho máximo: 2MB.</p>
                            </div>
                        </div>
                        
                        <div className="form-grid">
                            
                            <div className="form-column">
                                <div className="form-group">
                                    <label htmlFor="nome">Nome do paciente</label>
                                    <div className="input-with-icon">
                                        <img src={iconPencil} alt="" className="input-icon" />
                                        <input 
                                            type="text" 
                                            id="nome" 
                                            placeholder="Preencha aqui..." 
                                            value={formData.nome}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="idade">Idade do paciente</label>
                                    <input
                                        type="number"
                                        id="idade"
                                        placeholder="Digite a idade aqui..."
                                        min="1"
                                        value={formData.idade}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="objetivo">Objetivo do paciente</label>
                                    <div className="input-with-icon">
                                        <img src={iconPencil} alt="" className="input-icon" />
                                        <input 
                                            type="text" 
                                            id="objetivo" 
                                            placeholder="Preencha aqui..." 
                                            value={formData.objetivo}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        
                            <div className="form-column">
                                <div className="form-group">
                                    <label htmlFor="genero">Gênero</label>
                                    <select 
                                        id="genero" 
                                        value={formData.genero}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="male">Masculino</option>
                                        <option value="female">Feminino</option>
                                        <option value="other">Outro</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="cep">CEP</label>
                                    <div className="input-with-icon">
                                        <img src={iconPencil} alt="" className="input-icon" />
                                        <input 
                                            type="text" 
                                            id="cep" 
                                            placeholder="Preencha aqui..." 
                                            value={formData.cep}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group" style={{ flex: 3 }}>
                                        <label htmlFor="rua">Rua</label>
                                        <div className="input-with-icon">
                                            <img src={iconPencil} alt="" className="input-icon" />
                                            <input 
                                                type="text" 
                                                id="rua" 
                                                placeholder="Preencha aqui..." 
                                                value={formData.rua}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group" style={{ flex: 1 }}>
                                        <label htmlFor="numero">Número</label>
                                        <input 
                                            type="text" 
                                            id="numero" 
                                            value={formData.numero}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="contato">Contato do responsável</label>
                                    <input 
                                        type="text" 
                                        id="contato" 
                                        placeholder="(99) 9 9999 9999" 
                                        value={formData.contato}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-footer">
                            <button type="submit" className="save-button">Salvar perfil</button>
                        </div>

                    </form>
                </div>
            </main>
        </div>
    );
}

export default AlunosPage;