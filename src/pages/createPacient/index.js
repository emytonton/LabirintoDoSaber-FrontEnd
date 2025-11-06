import React from 'react';
import './style.css'; 

import logo from '../../assets/images/logo.png';
import iconNotification from '../../assets/images/icon_notification.png';
import iconProfile from '../../assets/images/icon_profile.png';
import iconBack from '../../assets/images/seta_icon_esquerda.png'
import avatarPlaceholder from '../../assets/images/icon_random.png'; 
import iconUpload from '../../assets/images/iconUpload.png';
import iconPencil from '../../assets/images/edit.png';


function AlunosPage() {

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Perfil salvo!");
  };

  return (
    <div className="dashboard-container">
      
      <header className="header">
        <img src={logo} alt="Labirinto do Saber" className="logo" />
        <nav className="navbar">
          <a href="/home" className="nav-link">Dashboard</a> 
          <a href="/activitiesMain" className="nav-link">Atividades</a>
          <a href="/alunos" className="nav-link active">Alunos</a> 
          <a href="#" className="nav-link">Relatórios</a>
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
                    <input type="text" id="nome" placeholder="Preencha aqui..." />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="idade">Idade do paciente</label>
                  <select id="idade" defaultValue="12">
                    <option value="12">12</option>
                    <option value="11">11</option>
                    <option value="10">10</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="objetivo">Objetivo do paciente</label>
                  <div className="input-with-icon">
                    <img src={iconPencil} alt="" className="input-icon" />
                    <input type="text" id="objetivo" placeholder="Preencha aqui..." />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="profissional">Selecione o profissional responsável</label>
                  <select id="profissional" defaultValue="dra-paulyne">
                    <option value="dra-paulyne">Dra. Paulyne Matthews Jucá</option>
                  </select>
                </div>
              </div>

        
              <div className="form-column">
                <div className="form-group">
                  <label htmlFor="genero">Gênero</label>
                  <select id="genero" defaultValue="masculino">
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="cep">CEP</label>
                  <div className="input-with-icon">
                    <img src={iconPencil} alt="" className="input-icon" />
                    <input type="text" id="cep" placeholder="Preencha aqui..." />
                  </div>
                </div>

            
                <div className="form-row">
                  <div className="form-group" style={{ flex: 3 }}>
                    <label htmlFor="rua">Rua</label>
                    <div className="input-with-icon">
                      <img src={iconPencil} alt="" className="input-icon" />
                      <input type="text" id="rua" placeholder="Preencha aqui..." />
                    </div>
                  </div>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label htmlFor="numero">Número</label>
                    <input type="text" id="numero" />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contato">Contato do responsável</label>
                  <input type="text" id="contato" placeholder="(99) 9 9999 9999" />
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