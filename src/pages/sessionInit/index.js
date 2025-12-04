import React, { useState, useEffect } from 'react';
import './style.css';
import { useNavigate, useLocation } from 'react-router-dom';
import iconArrowLeft from '../../assets/images/seta_icon_esquerda.png';
import labirintoLogo from '../../assets/images/logo.png';
import lionImage from '../../assets/images/lion.png';

const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
};

const PlayIcon = () => (
    <svg width="30" height="33" viewBox="0 0 30 33" fill="none" xmlns="http://www.w3.org/2000/svg" className="session-audio-icon">
        <path fillRule="evenodd" clipRule="evenodd" d="M23.7354 15.6654C24.3343 16.0606 24.3343 16.9394 23.7354 17.3346L7.80084 27.8514C7.13599 28.2902 6.25 27.8134 6.25 27.0168L6.25 5.98317C6.25 5.18657 7.13599 4.70976 7.80084 5.14856L23.7354 15.6654Z" fill="#191D23"/>
    </svg>
);

const PauseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="session-audio-icon">
        <path fillRule="evenodd" clipRule="evenodd" d="M5 4L5 20H9V4H5Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M15 4L15 20H19V4H15Z" stroke="black" strokeLinejoin="round"/> 
    </svg>
);

const MixedActivity = ({ question, options, imageSrc, audioSrc }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const togglePlayPause = () => {
        setIsPlaying(prev => !prev);
    };

    return (
        <>
            <img src={imageSrc} alt="Animal da Atividade" className="activity-main-image" />
            {audioSrc && <audio src={audioSrc} autoPlay={isPlaying} />} 
            <div className="session-audio-player-controls">
                <button className="session-audio-control-btn" onClick={togglePlayPause}>
                    {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </button>
                <div className="session-audio-bar-placeholder"></div>
                <span className="session-audio-time">00:00</span>
            </div>
            <h2 className="session-activity-question">{question}</h2>
            <div className="session-option-buttons-container">
                {options.map((opt, index) => (
                    <button key={index} className="session-option-btn">{opt.text}</button>
                ))}
            </div>
        </>
    );
};

const VisualActivity = ({ question, options, imageSrc }) => (
    <>
        <img src={imageSrc} alt="Animal da Atividade" className="activity-main-image" />
        <h2 className="session-activity-question">{question}</h2>
        <div className="session-option-buttons-container">
            {options.map((opt, index) => (
                <button key={index} className="session-option-btn">{opt.text}</button>
            ))}
        </div>
    </>
);

const AudioActivity = ({ question, options, audioSrc }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const togglePlayPause = () => setIsPlaying(prev => !prev);
    
    return (
        <>
            <h2 className="session-activity-question">{question}</h2>
            {audioSrc && <audio src={audioSrc} autoPlay={isPlaying} />} 
            <div className="session-audio-player-controls session-centered-controls">
                <button className="session-audio-control-btn session-large-control" onClick={togglePlayPause}>
                    {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </button>
                <div className="session-audio-bar-placeholder session-wide-bar"></div>
                <span className="session-audio-time">00:00</span>
            </div>
            <div className="session-option-buttons-container">
                {options.map((opt, index) => (
                    <button key={index} className="session-option-btn">{opt.text}</button>
                ))}
            </div>
        </>
    );
};

const ConstructionActivity = ({ question, options }) => (
    <>
        <h2 className="session-activity-question">{question}</h2>
        <div className="session-option-buttons-container">
            {options.map((opt, index) => (
                <button key={index} className="session-option-btn session-half-width">{opt.text}</button>
            ))}
        </div>
    </>
);

function SessionInitPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const { task, sessionId, studentId } = location.state || {}; 

    const [timeElapsed, setTimeElapsed] = useState(0); 
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    
    const [sessionActivities] = useState(task ? [task] : []);
    const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
    

    useEffect(() => {
        if (!task || !sessionId) {
            console.error("Dados da atividade ou da sessão ausentes.");
        }
        
        let timerId;
        if (isAudioPlaying) {
            timerId = setInterval(() => {
                setTimeElapsed(prevTime => prevTime + 1);
            }, 1000);
        }
        
        return () => clearInterval(timerId);
    }, [isAudioPlaying, task, sessionId]);

    const toggleAudioPlay = () => {
        setIsAudioPlaying(prev => !prev);
    };

    const currentActivity = sessionActivities[currentActivityIndex];

// Este código substitui a função renderActivity no SessionInitPage.jsx
const renderActivity = () => {
    if (!currentActivity) return <div>Carregando Atividade...</div>; 

    // Mapeamento das propriedades da API (Schema Task)
    const activityProps = {
        question: currentActivity.prompt || currentActivity.question || currentActivity.enunciado || 'Enunciado não encontrado',
        options: currentActivity.alternatives || currentActivity.options || [], 
        imageSrc: currentActivity.imageFile || currentActivity.image, 
        audioSrc: currentActivity.audioFile || currentActivity.audio,   
    };
    
    // Pega o valor exato do Enum do Back-end
    const activityType = currentActivity.type; 

    // 🎯 Lógica de Mapeamento: Mapear o Enum para a chave do componente React
    let componentKey;

    switch (activityType) {
        case 'MultipleChoiceWithMedia':
            componentKey = 'mixed'; // O componente MixedActivity lida com Imagem + Áudio
            break;
        case 'MultipleChoice':
            // Se for apenas MultipleChoice (sem mídia), mapeia para Construction (ou Visual se for o caso)
            componentKey = 'construction'; 
            break;
        default:
            // Fallback: Tenta deduzir o tipo se o campo 'type' for nulo/desconhecido.
            if (activityProps.imageSrc && activityProps.audioSrc) {
                componentKey = 'mixed';
            } else if (activityProps.imageSrc) {
                componentKey = 'visual';
            } else if (activityProps.audioSrc) {
                componentKey = 'audio';
            } else {
                componentKey = 'construction';
            }
            break;
    }


    switch (componentKey) {
        case 'mixed':
            return <MixedActivity {...activityProps} />;
        case 'visual':
            return <VisualActivity {...activityProps} />;
        case 'audio':
            return <AudioActivity {...activityProps} />;
        case 'construction':
            return <ConstructionActivity {...activityProps} />;
        default:
            // Se cair aqui, a string do tipo não foi mapeada corretamente.
            return <div>Tipo de atividade ({activityType}) desconhecido.</div>;
    }
};

    const handleNextActivity = () => {
        if (currentActivityIndex < sessionActivities.length - 1) {
            setCurrentActivityIndex(currentActivityIndex + 1);
        } else {
            console.log("Sessão Completa! Lógica de envio de relatório aqui.");
        }
    };
    
    const handleBack = () => navigate(-1);

    return (
        <div className="dashboard-container">
            <header className="session-activity-header">
                <button onClick={handleBack} className="session-back-arrow-button">
                    <img src={iconArrowLeft} alt="Voltar" className="session-back-arrow-icon"/>
                </button>
                <img src={labirintoLogo} alt="Logotipo Labirinto do Saber" className="session-header-logo"/>

                <div className="session-timer-controls">
                    <button className="session-play-pause-btn" onClick={toggleAudioPlay}>
                        {isAudioPlaying ? <PauseIcon /> : <PlayIcon />}
                    </button>
                    <div className="session-activity-timer">{formatTime(timeElapsed)}</div>
                </div>
            </header>

            <main className="session-init-main-content">
                <div className="session-activity-card-wrapper">
                    <div className="session-activity-card">
                        {sessionActivities.length === 0 ? (
                            <div style={{ padding: '40px', textAlign: 'center' }}>
                                <h2>Carregando...</h2>
                                <p>Verifique se os dados foram passados corretamente da tela anterior.</p>
                            </div>
                        ) : (
                            renderActivity()
                        )}
                        <button onClick={handleNextActivity} className="session-debug-btn">PRÓXIMA ATIVIDADE</button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default SessionInitPage;