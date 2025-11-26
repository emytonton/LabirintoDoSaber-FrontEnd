import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom'; 
import './style.css'; 

import logo from '../../assets/images/logo.png';
import iconNotification from '../../assets/images/icon_notification.png';
import iconProfile from '../../assets/images/icon_profile.png';
import iconBack from '../../assets/images/seta_icon_esquerda.png'; 

const ActivityChip = ({ label, isSelected, onClick }) => (
  <button 
    className={`activity-chip ${isSelected ? 'selected' : ''}`} 
    onClick={onClick}
    type="button"
  >
    {label}
  </button>
);

function AdicionarAtividade() {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    const [step, setStep] = useState(1); 

    const [selectedCategory, setSelectedCategory] = useState('Leitura');
    const [activityType, setActivityType] = useState('');
    const [activitySchema, setActivitySchema] = useState('Atividade 1: Imagem, Áudio, Enunciado e Alternativas');

    const [prompt, setPrompt] = useState('');
    const [imageFileName, setImageFileName] = useState('');
    const [audioFileName, setAudioFileName] = useState('');
    const [alternatives, setAlternatives] = useState([
        { text: '', isCorrect: false },
        { text: '', isCorrect: false }
    ]);

    const categories = ['Leitura', 'Escrita', 'Vocabulário', 'Compreensão'];
    const schemas = [
        'Imagem, Áudio, Enunciado e Alternativas',
        'Imagem, Enunciado e alternativas',
        'Áudio, Enunciado e alternativas',
        'Enunciado e alternativas'
    ];

    const categoryMap = {
        'Leitura': 'reading',
        'Escrita': 'writing',
        'Vocabulário': 'vocabulary',
        'Compreensão': 'comprehension'
    };

    const handleNext = () => {
        if (!selectedCategory || !activityType) {
            alert("Por favor, preencha a categoria e o título da atividade.");
            return;
        }
        setStep(2);
    };

    const handleBack = () => {
        setStep(1);
    };

    const addAlternative = () => {
        setAlternatives([...alternatives, { text: '', isCorrect: false }]);
    };

    const removeAlternative = (index) => {
        const newAlternatives = alternatives.filter((_, i) => i !== index);
        setAlternatives(newAlternatives);
    };

    const handleAlternativeChange = (index, value) => {
        const newAlternatives = [...alternatives];
        newAlternatives[index].text = value;
        setAlternatives(newAlternatives);
    };

    const handleCorrectChange = (index) => {
        const newAlternatives = alternatives.map((alt, i) => ({
            ...alt,
            isCorrect: i === index 
        }));
        setAlternatives(newAlternatives);
    };

    const determineTypeFromSchema = (schema) => {
        if (schema && (schema.includes('Imagem') || schema.includes('Áudio'))) {
            return "multipleChoiceWithMedia"; 
        }
        return "multipleChoice"; 
    };

    const handleCreate = async () => {
        const token = localStorage.getItem('authToken');
        
        if (!prompt || alternatives.some(a => !a.text)) {
            alert("Preencha o enunciado e todas as alternativas.");
            return;
        }

        const payload = {
            category: categoryMap[selectedCategory] || 'reading',
            type: determineTypeFromSchema(activitySchema),
            prompt: prompt,
            alternatives: alternatives,
        };

        if (imageFileName) payload.imageFile = imageFileName;
        if (audioFileName) payload.audioFile = audioFileName;

        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            await axios.post('https://labirinto-do-saber.vercel.app/task/create', payload, config);
            
            alert('Atividade criada com sucesso!');
            navigate('/activitiesMain'); 

        } catch (error) {
            const msg = error.response?.data?.message || "Erro desconhecido";
            alert(`Erro ao criar atividade: ${msg}`);
        }
    };

    return (
        <div className="dashboard-container"> 
            
            <header className="header">
                <img src={logo} alt="Labirinto do Saber" className="logo" />
                <nav className="navbar">
                    <a href="/home" className={`nav-link ${currentPath === '/home' ? 'active' : ''}`}>Dashboard</a> 
                    <a href="/activitiesMain" className={`nav-link active`}>Atividades</a>
                    <a href="/alunos" className={`nav-link ${currentPath === '/alunos' ? 'active' : ''}`}>Alunos</a> 
                    <a href="/relatorios" className={`nav-link ${currentPath === '/relatorios' ? 'active' : ''}`}>Relatórios</a>
                </nav>
                <div className="user-controls">
                    <img src={iconNotification} alt="Notificações" className="icon" />
                    <img src={iconProfile} alt="Perfil" className="icon profile-icon" />
                </div>
            </header>

            <main className="main-content">
                
                {step === 2 && (
                    <button className="back-button" onClick={handleBack} style={{border: 'none', background: 'transparent', cursor: 'pointer', marginBottom: '10px'}}>
                        <img src={iconBack} alt="Voltar" className="seta" />
                    </button>
                )}

                <div className="adicionar-atividade-container">
                    
                    {step === 1 && (
                        <>
                            <h1 className="form-title">Adicionar nova atividade</h1>
                            <hr className="title-separator" />

                            <div className="form-group">
                                <label className="form-label required">Categoria da atividade</label>
                                <div className="chips-container">
                                    {categories.map((cat) => (
                                        <ActivityChip 
                                            key={cat}
                                            label={cat}
                                            isSelected={selectedCategory === cat}
                                            onClick={() => setSelectedCategory(cat)}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label required">Tipo da atividade (Título)</label>
                                <input 
                                    type="text" 
                                    value={activityType}
                                    onChange={(e) => setActivityType(e.target.value)}
                                    placeholder="Exemplo: Atividades de associação e leitura com animais"
                                    className="text-input" 
                                />
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label required">Esquema da atividade</label>
                                <div className="select-wrapper">
                                    <select 
                                        value={activitySchema}
                                        onChange={(e) => setActivitySchema(e.target.value)}
                                        className="dropdown-select"
                                    >
                                        {schemas.map((schema) => (
                                            <option key={schema} value={schema}>{schema}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="next-button-container">
                                <button className="button-next" type="button" onClick={handleNext}>
                                    Próximo
                                </button>
                            </div>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <h1 className="form-title">Personalizar Atividade</h1>
                            <p className="subtitle" style={{color: '#666', marginBottom: '20px'}}>
                                {selectedCategory} | {activitySchema}
                            </p>
                            <hr className="title-separator" />

                            <div className="form-group">
                                <label className="form-label required">Enunciado (Prompt)</label>
                                <textarea 
                                    className="text-input"
                                    rows="3"
                                    placeholder="Ex: Qual é a ideia principal do texto?"
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    style={{resize: 'vertical'}}
                                />
                            </div>

                            {(activitySchema.includes('Imagem') || activitySchema.includes('Áudio')) && (
                                <div className="form-row" style={{display: 'flex', gap: '20px'}}>
                                    {activitySchema.includes('Imagem') && (
                                        <div className="form-group" style={{flex: 1}}>
                                            <label className="form-label">Nome do Arquivo de Imagem</label>
                                            <input 
                                                type="text" 
                                                className="text-input" 
                                                placeholder="ex: figura1.png"
                                                value={imageFileName}
                                                onChange={(e) => setImageFileName(e.target.value)}
                                            />
                                        </div>
                                    )}
                                    {activitySchema.includes('Áudio') && (
                                        <div className="form-group" style={{flex: 1}}>
                                            <label className="form-label">Nome do Arquivo de Áudio</label>
                                            <input 
                                                type="text" 
                                                className="text-input" 
                                                placeholder="ex: audio1.mp3"
                                                value={audioFileName}
                                                onChange={(e) => setAudioFileName(e.target.value)}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="form-group">
                                <label className="form-label required">Alternativas (Marque a correta)</label>
                                {alternatives.map((alt, index) => (
                                    <div key={index} className="alternative-row" style={{display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center'}}>
                                        <input 
                                            type="checkbox" 
                                            checked={alt.isCorrect}
                                            onChange={() => handleCorrectChange(index)}
                                            style={{width: '20px', height: '20px', cursor: 'pointer'}}
                                        />
                                        <input 
                                            type="text" 
                                            className="text-input" 
                                            placeholder={`Alternativa ${index + 1}`}
                                            value={alt.text}
                                            onChange={(e) => handleAlternativeChange(index, e.target.value)}
                                            style={{flex: 1}}
                                        />
                                        {alternatives.length > 2 && (
                                            <button type="button" onClick={() => removeAlternative(index)} style={{color: 'red', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold'}}>
                                                X
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button type="button" onClick={addAlternative} className="add-btn" style={{marginTop: '5px', color: '#fdbf12', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold'}}>
                                    + Adicionar alternativa
                                </button>
                            </div>

                            <div className="next-button-container">
                                <button className="button-next" type="button" onClick={handleCreate}>
                                    Salvar Atividade
                                </button>
                            </div>
                        </>
                    )}

                </div>
            </main>
        </div>
    );
}

export default AdicionarAtividade;