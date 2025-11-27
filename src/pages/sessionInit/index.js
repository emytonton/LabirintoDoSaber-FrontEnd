import React, { useState, useEffect } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
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
        <path fillRule="evenodd" clipRule="evenodd" d="M15 4L15 20H19V4H15Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const MixedActivity = ({ question, options, imageSrc }) => {
    const [isPlaying, setIsPlaying] = useState(false); // ADICIONADO: Estado local para o player interno
    const togglePlayPause = () => setIsPlaying(prev => !prev); // ADICIONADO: Função para alternar

    return (
        <>
            <img src={imageSrc} alt="Animal da Atividade" className="activity-main-image" />
            <div className="session-audio-player-controls">
                <button className="session-audio-control-btn" onClick={togglePlayPause}> {/* ADICIONADO ONCLICK */}
                    {isPlaying ? <PauseIcon /> : <PlayIcon />} {/* RENDERIZAÇÃO CONDICIONAL */}
                </button>
                <div className="session-audio-bar-placeholder"></div>
                <span className="session-audio-time">00:00</span>
            </div>
            <h2 className="session-activity-question">{question}</h2>
            <div className="session-option-buttons-container">
                {options.map((opt, index) => (
                    <button key={index} className="session-option-btn">{opt}</button>
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
                <button key={index} className="session-option-btn">{opt}</button>
            ))}
        </div>
    </>
);

const AudioActivity = ({ question, options }) => {
    const [isPlaying, setIsPlaying] = useState(false); // ADICIONADO: Estado local para o player interno
    const togglePlayPause = () => setIsPlaying(prev => !prev); // ADICIONADO: Função para alternar
    
    return (
        <>
            <h2 className="session-activity-question">{question}</h2>
            <div className="session-audio-player-controls session-centered-controls">
                <button className="session-audio-control-btn session-large-control" onClick={togglePlayPause}> {/* ADICIONADO ONCLICK */}
                    {isPlaying ? <PauseIcon /> : <PlayIcon />} {/* RENDERIZAÇÃO CONDICIONAL */}
                </button>
                <div className="session-audio-bar-placeholder session-wide-bar"></div>
                <span className="session-audio-time">00:00</span>
            </div>
            <div className="session-option-buttons-container">
                {options.map((opt, index) => (
                    <button key={index} className="session-option-btn">{opt}</button>
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
                <button key={index} className="session-option-btn session-half-width">{opt}</button>
            ))}
        </div>
    </>
);

function SessionInitPage() {
    const navigate = useNavigate();

    const [timeElapsed, setTimeElapsed] = useState(0); 
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
    const [sessionActivities] = useState([
        { type: 'mixed', question: 'Qual animal a figura e o som representam?', options: ['GATO', 'LEÃO', 'CÃO', 'TIGRE'], image: lionImage },
        { type: 'visual', question: 'Qual animal a figura representa?', options: ['GATO', 'LEÃO', 'CÃO', 'TIGRE'], image: lionImage },
        { type: 'audio', question: 'Qual animal o som representa?', options: ['GATO', 'LEÃO', 'CÃO', 'TIGRE'] },
        { type: 'construction', question: 'Qual sílaba formamos com a junção das letras C + A?', options: ['CU', 'CA', 'CO', 'CE'] },
    ]);

    useEffect(() => {
        let timerId;
        if (isAudioPlaying) {
            timerId = setInterval(() => {
                setTimeElapsed(prevTime => prevTime + 1);
            }, 1000);
        }
        
        return () => clearInterval(timerId);
    }, [isAudioPlaying]);

    const toggleAudioPlay = () => {
        setIsAudioPlaying(prev => !prev);
    };

    const currentActivity = sessionActivities[currentActivityIndex];

    const renderActivity = () => {
        if (!currentActivity) return <div>Sessão Finalizada!</div>;
        
        const activityProps = {
            ...currentActivity,
        };

        switch (currentActivity.type) {
            case 'mixed':
                return <MixedActivity {...activityProps} imageSrc={currentActivity.image} />;
            case 'visual':
                return <VisualActivity {...activityProps} imageSrc={currentActivity.image} />;
            case 'audio':
                return <AudioActivity {...activityProps} />;
            case 'construction':
                return <ConstructionActivity {...activityProps} />;
            default:
                return <div>Tipo de atividade desconhecido.</div>;
        }
    };

    const handleNextActivity = () => {
        if (currentActivityIndex < sessionActivities.length - 1) {
            setCurrentActivityIndex(currentActivityIndex + 1);
        } else {
            console.log("Sessão Completa!");
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
                        {renderActivity()}
                        <button onClick={handleNextActivity} className="session-debug-btn">PRÓXIMA ATIVIDADE</button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default SessionInitPage;