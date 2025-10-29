import React from 'react';
import './style.css'; 


import logo from '../../assets/images/logo.png';
import iconNotification from '../../assets/images/icon_notification.png';
import iconProfile from '../../assets/images/icon_profile.png';
import iconRandom from '../../assets/images/icon_random.png'
import edit from '../../assets/images/edit.png'
import seta from '../../assets/images/seta_icon_esquerda.png'


import avatarLucas from '../../assets/images/boy_home.png'; 
import avatarAlina from '../../assets/images/girl_home.png'; 

function AlunoDetalhe() {
  return (
    <div className="aluno-detalhe-container">

      <header className="header">
        <img src={logo} alt="Labirinto do Saber" className="logo" />
        <nav className="navbar">
          <a href="/home" className="nav-link">Dashboard</a>
          <a href="#" className="nav-link">Atividades</a>
          <a href="/alunos" className="nav-link active">Alunos</a> 
          <a href="#" className="nav-link">Relatórios</a>
        </nav>
        <div className="user-controls">
          <img src={iconNotification} alt="Notificações" className="icon" />
          <img src={iconProfile} alt="Perfil" className="icon profile-icon" />
        </div>
      </header>

    
      <main className="main-content-detalhe">
        <div className="back-arrow-container">
          <a href="/alunos" className="back-arrow"><img src={seta} alt="seta" className="seta"/></a>
        </div>


        <div className="info-card"> 
          <div className="info-section">
            <img src={iconRandom} alt="Lucas Silva" className="avatar-grande1" />
            <div className="info-text1">
              <h3>Lucas Silva</h3>
              <p>7 anos</p>
              <p>Alfabetização inicial</p>
            </div>
          </div>
          <div className="vertical-divider"></div>
          <div className="info-section">
            <img src={iconRandom} alt="Dra. Alina Barbosa" className="avatar-grande2" />
            <div className="info-text2">
              <h3>Dra. Alina Barbosa</h3>
              <p>Profissional responsável</p>
            </div>
          </div>
          <button className="btn-tag btn-editar"><img src={edit} alt="edit" className="iconEdit" />Editar perfil</button>
        </div>

   
        <div className="progress-card"> 
          <h2>Progresso Detalhado</h2>
          <p className="subtitle">Atividades concluídas</p>
          
          <div className="progress-main-container">
            <div className="progress-bar-main">
              <div className="progress-bar-inner" style={{ width: '80%' }}></div>
            </div>
            <span className="progress-percent-main">80%</span>
          </div>

          <div className="sub-progress-container">
            <div className="sub-progress-item">
              <p>Leitura</p>
              <span>80%</span>
            </div>
            <div className="sub-progress-item">
              <p>Escrita</p>
              <span>50%</span>
            </div>
            <div className="sub-progress-item">
              <p>Vocabulário</p>
              <span>90%</span>
            </div>
            <div className="sub-progress-item">
              <p>Compreensão</p>
              <span>40%</span>
            </div>
          </div>
        </div>

    
        <div className="history-card"> 
          <h2>Histórico de atividades</h2>
          
          <table className="history-table">
            <thead>
              <tr>
                <th>Atividade</th>
                <th>Data</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span className="btn-tag tag-atividade">Formando palavras</span></td>
                <td>12/08/2025</td>
                <td><span className="btn-tag tag-pendente">Pendente</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default AlunoDetalhe;