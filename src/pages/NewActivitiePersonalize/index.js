import React, { useState, useRef } from 'react';
import './style.css';
import logo from '../../assets/images/logo.png';
import iconNotification from '../../assets/images/icon_notification.png';
import iconProfile from '../../assets/images/icon_profile.png';
import { NavLink, useLocation } from 'react-router-dom';

/** Campo de arquivo com UI customizada */
const FileField = ({ id, label, accept, helper, suffixIcon }) => {
  const [fileName, setFileName] = useState('Nenhum arquivo foi selecionado');
  const inputRef = useRef(null);

  const onChange = (e) => {
    const f = e.target.files && e.target.files[0];
    setFileName(f ? f.name : 'Nenhum arquivo foi selecionado');
  };

  return (
    <div className="form-group file-group">
      <label className="form-label required" htmlFor={id}>{label}</label>

      <input
        id={id}
        ref={inputRef}
        type="file"
        accept={accept}
        className="file-input-hidden"
        onChange={onChange}
      />

      {/* Barra + bolinha fora do label */}
      <div className="file-row">
        <label htmlFor={id} className="file-ui">
          <span className="file-trigger">
            {/* ícone do botão Selecionar arquivo */}
            <svg className="file-trigger-icon" viewBox="0 0 21 13" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.4199 5.52539L16.9265 5.60601L16.9871 5.9772L17.3606 6.02185L17.4199 5.52539ZM6.21094 3.66602L6.07665 4.14765L6.46214 4.25512L6.65145 3.90255L6.21094 3.66602ZM11.5 0.5V1C14.2327 1 16.4996 2.99367 16.9265 5.60601L17.4199 5.52539L17.9134 5.44477C17.4089 2.35693 14.7309 0 11.5 0V0.5ZM17.4199 5.52539L17.3606 6.02185C18.8473 6.19964 20 7.46543 20 9H20.5H21C21 6.95284 19.4626 5.2661 17.4793 5.02893L17.4199 5.52539ZM20.5 9H20C20 10.6569 18.6569 12 17 12V12.5V13C19.2091 13 21 11.2091 21 9H20.5ZM17 12.5V12H5V12.5V13H17V12.5ZM5 12.5V12C2.79086 12 1 10.2091 1 8H0.5H0C0 10.7614 2.23858 13 5 13V12.5ZM0.5 8H1C1 5.79086 2.79086 4 5 4V3.5V3C2.23858 3 0 5.23858 0 8H0.5ZM5 3.5V4C5.37288 4 5.73365 4.05201 6.07665 4.14765L6.21094 3.66602L6.34522 3.18439C5.91747 3.06512 5.46641 3 5 3V3.5ZM6.21094 3.66602L6.65145 3.90255C7.57968 2.17383 9.40294 1 11.5 1V0.5V0C9.01992 0 6.86581 1.38945 5.77042 3.42948L6.21094 3.66602Z" fill="currentColor"/>
            </svg>
            Selecionar arquivo
          </span>
          <span className="file-placeholder">{fileName}</span>
        </label>

        {/* bolinha com ícone (diferente por campo) */}
        <button type="button" className="file-suffix" aria-label="Mais opções">
          {suffixIcon}
        </button>
      </div>

      {helper && <small className="helper-text">{helper}</small>}
    </div>
  );
};

export default function AdicionarAtividade() {
  const location = useLocation();
  const currentPath = location.pathname;
  // --- LÓGICA ALTERADA: Recebendo o esquema selecionado do state da rota ---
    const defaultSchema = 'Enunciado e alternativas';
    const selectedSchema = location.state?.selectedSchema || defaultSchema;
    
  // Variáveis booleanas para controlar a renderização dos campos de arquivo
    const showImageField = selectedSchema.includes('Imagem');
    const showAudioField = selectedSchema.includes('Áudio');

  const [prompt, setPrompt] = useState('');
  const [alternativas, setAlternativas] = useState([{ id: crypto.randomUUID(), texto: '' }]);

  const addAlt = () =>
    setAlternativas((prev) => [...prev, { id: crypto.randomUUID(), texto: '' }]);

  const removeAlt = (id) =>
    setAlternativas((prev) => prev.length > 1 ? prev.filter(a => a.id !== id) : prev);

  const updateAlt = (id, v) =>
    setAlternativas((prev) => prev.map(a => a.id === id ? { ...a, texto: v } : a));

  const handleNext = (e) => {
    e.preventDefault();
    console.log({ prompt, alternativas });
  };

  return (
    <div className="dashboard-container">
      <header className="header">
        <img src={logo} alt="Labirinto do Saber" className="logo" />

        <nav className="navbar">
          <NavLink to="/home" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>Dashboard</NavLink>
          <NavLink to="/activities" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>Atividades</NavLink>
          <NavLink to="/alunos" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>Alunos</NavLink>
          <NavLink to="/relatorios" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>Relatórios</NavLink>
        </nav>

        <div className="user-controls">
          <img src={iconNotification} alt="Notificações" className="icon" />
          <img src={iconProfile} alt="Perfil" className="icon profile-icon" />
        </div>
      </header>

      <main className="main-content">
      <form className="adicionar-atividade-container" onSubmit={handleNext}>
              <h1 className="form-title">Personalize a sua atividade</h1>
                {/* Mensagem de debug/confirmação do esquema (Opcional, mas útil) */}
                <p style={{marginBottom: '20px', color: '#666', fontSize: '0.9em'}}>
                    Esquema Selecionado: <strong>{selectedSchema}</strong>
                </p>
              <hr className="title-separator" />

              {/* --- RENDERIZAÇÃO CONDICIONAL DE IMAGEM --- */}
              {showImageField && (
                  <FileField
                    id="imgAssoc"
                    label="Imagem para associação"
                    accept="image/png,image/jpeg"
                    helper="Formatos aceitos: JPG, PNG. Tamanho máximo: 2MB."
                    suffixIcon={
                      // Ícone A (duas setas)
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M20 9C20 9 19.6797 9.667 19 10.514M12 14c-1.608 0-2.952-.412-4.051-.999M12 14c1.608 0 2.952-.412 4.051-.999M12 14v3.5M4 9s.354.737 1.106 1.645M7.949 13 5 16m2.949-3c-1.26-.673-2.198-1.577-2.843-2.355M16.051 13 18.5 16m-2.449-3c1.331-.711 2.302-1.68 2.949-2.486M5.106 10.645 2 12m17-1.486L22 12"
                            stroke="currentColor" strokeLinecap="round" />
                      </svg>
                    }
                  />
              )}

              {/* --- RENDERIZAÇÃO CONDICIONAL DE ÁUDIO --- */}
              {showAudioField && (
                  <FileField
                    id="audioAssoc"
                    label="Áudio para associação"
                    accept=".mp3,.wav,audio/*"
                    helper="Formatos aceitos: MP3, WAV. Duração máxima: 30s."
                    suffixIcon={
                      // Ícone B (olho/preview)
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M17.6667 12L8.91675 17.25L8.91675 6.75L17.6667 12Z" stroke="black" strokeLinejoin="round"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="black"/>
                    </svg>

                    }
                  />
              )}

          <div className="form-group">
            <label className="form-label required" htmlFor="enunciado">Enunciado da atividade</label>
            <input
              id="enunciado"
              className="text-input"
              type="text"
              placeholder="Preencha aqui..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          <div className="form-group">
            <div className="form-label required">Alternativas</div>

        <div className="alternativas-list">
        {alternativas.map((alt, idx) => (
            <div key={alt.id} className="alternativa-row">
            {/* radio FORA da caixa */}
            <input type="radio" name="correta" className="radio-outside" />

            {/* caixa da alternativa (agora só com o input de texto) */}
            <div className="alternativa-item">
                <input
                className="alternativa-input"
                placeholder={`Alternativa ${idx + 1}`}
                value={alt.texto}
                onChange={(e) => updateAlt(alt.id, e.target.value)}
                />
            </div>

            {/* lixeira FORA da caixa */}
            <button
                type="button"
                className="alt-remove-outside"
                onClick={() => removeAlt(alt.id)}
                aria-label="Remover alternativa"
                title="Remover"
            >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 6H19L18.1245 19.133C18.0544 20.1836 17.1818 21 16.1289 21H7.87111C6.81818 21 5.94558 20.1836 5.87554 19.133L5 6Z" stroke="black" stroke-width="2"/>
<path d="M9 6V3H15V6" stroke="black" stroke-width="2" stroke-linejoin="round"/>
<path d="M3 6H21" stroke="black" stroke-width="2" stroke-linecap="round"/>
<path d="M10 10V17" stroke="black" stroke-width="2" stroke-linecap="round"/>
<path d="M14 10V17" stroke="black" stroke-width="2" stroke-linecap="round"/>
            </svg>

            </button>
            </div>
        ))}
        </div>
            <button type="button" className="alt-add" onClick={addAlt}>
            <svg width="29" height="31" viewBox="0 0 29 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_150_1802)">
            <path d="M19.5 12H9.5" stroke="black" stroke-linecap="round"/>
            <path d="M14.5 17V7" stroke="black" stroke-linecap="round"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.5 22C20.0228 22 24.5 17.5228 24.5 12C24.5 6.47715 20.0228 2 14.5 2C8.97715 2 4.5 6.47715 4.5 12C4.5 17.5228 8.97715 22 14.5 22Z" stroke="black"/>
            </g>
            <defs>
            <filter id="filter0_d_150_1802" x="-1.5" y="0" width="32" height="32" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="4"/>
            <feGaussianBlur stdDeviation="2"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_150_1802"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_150_1802" result="shape"/>
            </filter>
            </defs>
            </svg>
              Adicionar alternativa
            </button>

            <small className="helper-text">
              Marque a alternativa correta utilizando o botão a esquerda.
            </small>
          </div>

          <div className="next-button-container">
            <button className="button-next" type="submit">Salvar Atividade</button>
          </div>
        </form>
      </main>
    </div>
  );
}
