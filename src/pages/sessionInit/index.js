import React, { useState, useEffect } from 'react';
import './style.css';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'; 
import iconArrowLeft from '../../assets/images/seta_icon_esquerda.png';
import labirintoLogo from '../../assets/images/logo.png';

const API_BASE_URL = "https://labirinto-do-saber.vercel.app";

const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
};

// --- Ícones (Mesmos de antes) ---
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

// --- Componentes Visuais ---
const OptionButtons = ({ options, onSelect, selectedId, isAnswered, feedback }) => {
    return (
        <div className="session-option-buttons-container">
            {options.map((opt, index) => {
                const isSelected = selectedId === opt.id;
                let buttonStyle = {};
                if (isAnswered) {
                    if (isSelected) {
                        buttonStyle = feedback === true 
                            ? { backgroundColor: '#4CAF50', color: 'white', borderColor: '#4CAF50' }
                            : { backgroundColor: '#F44336', color: 'white', borderColor: '#F44336' };
                    } else {
                        buttonStyle = { opacity: 0.6, cursor: 'not-allowed' };
                    }
                }
                return (
                    <button key={opt.id || index} className="session-option-btn" style={buttonStyle} onClick={() => !isAnswered && onSelect(opt.id)} disabled={isAnswered}>
                        {opt.text}
                    </button>
                );
            })}
        </div>
    );
};

const MixedActivity = (props) => {
    const [isPlaying, setIsPlaying] = useState(false);
    return (
        <>
            <img src={props.imageSrc} alt="Atividade" className="activity-main-image" />
            {props.audioSrc && <audio src={props.audioSrc} autoPlay={isPlaying} />} 
            <div className="session-audio-player-controls">
                <button className="session-audio-control-btn" onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </button>
                <div className="session-audio-bar-placeholder"></div>
            </div>
            <h2 className="session-activity-question">{props.question}</h2>
            <OptionButtons {...props} />
        </>
    );
};

const VisualActivity = (props) => (
    <>
        <img src={props.imageSrc} alt="Atividade" className="activity-main-image" />
        <h2 className="session-activity-question">{props.question}</h2>
        <OptionButtons {...props} />
    </>
);

const AudioActivity = (props) => {
    const [isPlaying, setIsPlaying] = useState(false);
    return (
        <>
            <h2 className="session-activity-question">{props.question}</h2>
            {props.audioSrc && <audio src={props.audioSrc} autoPlay={isPlaying} />} 
            <div className="session-audio-player-controls session-centered-controls">
                <button className="session-audio-control-btn session-large-control" onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </button>
                <div className="session-audio-bar-placeholder session-wide-bar"></div>
            </div>
            <OptionButtons {...props} />
        </>
    );
};

const ConstructionActivity = (props) => (
    <>
        <h2 className="session-activity-question">{props.question}</h2>
        <OptionButtons {...props} />
    </>
);

// --- PÁGINA PRINCIPAL ---

function SessionInitPage() {
    const navigate = useNavigate();
    const location = useLocation();

    // DADOS RECEBIDOS DA TELA ANTERIOR
    const { task, tasks, sessionId, studentId } = location.state || {}; 

    const [sessionActivities] = useState(tasks ? tasks : (task ? [task] : []));
    const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
    
    const [sessionTimeElapsed, setSessionTimeElapsed] = useState(0); 
    const [questionStartTime, setQuestionStartTime] = useState(Date.now());
    const [isGlobalAudioPlaying, setIsGlobalAudioPlaying] = useState(false);

    const [selectedAlternativeId, setSelectedAlternativeId] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false); 
    const [answerFeedback, setAnswerFeedback] = useState(null); 
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let timerId;
        if (isGlobalAudioPlaying) {
            timerId = setInterval(() => setSessionTimeElapsed(prev => prev + 1), 1000);
        }
        return () => clearInterval(timerId);
    }, [isGlobalAudioPlaying]);

    useEffect(() => {
        setSelectedAlternativeId(null);
        setIsAnswered(false);
        setAnswerFeedback(null);
        setQuestionStartTime(Date.now());
    }, [currentActivityIndex]);

    const currentActivity = sessionActivities[currentActivityIndex];
    const isLastActivity = currentActivityIndex === sessionActivities.length - 1;

    // --- LOGICA DE ENVIO COM DEBUG ---
    const handleOptionSelect = async (alternativeId) => {
        if (isAnswered || isLoading) return;

        // VERIFICAÇÃO DE DADOS ANTES DE ENVIAR
        if (!sessionId) {
            alert("ERRO: Session ID está vazio! Verifique se a sessão foi criada corretamente na tela anterior.");
            console.error("Faltando SessionID. Recebido:", location.state);
            return;
        }
        if (!currentActivity || !currentActivity.id) {
            alert("ERRO: Atividade atual não tem ID. Verifique o cadastro da tarefa.");
            console.error("Task inválida:", currentActivity);
            return;
        }

        setIsLoading(true);
        setSelectedAlternativeId(alternativeId);
        
        const timeToAnswer = Math.max(0, Math.floor((Date.now() - questionStartTime) / 1000));

        const payload = {
            sessionId: sessionId,
            taskId: currentActivity.id,
            selectedAlternativeId: alternativeId,
            timeToAnswer: timeToAnswer
        };

        console.log("🚀 PAYLOAD SENDO ENVIADO:", JSON.stringify(payload, null, 2));

        try {
            const response = await axios.post(`${API_BASE_URL}/task-notebook-session/answer`, payload);

            console.log("✅ Sucesso:", response.data);
            const lastAnswer = response.data.answers ? response.data.answers[response.data.answers.length - 1] : null;
            const isCorrect = lastAnswer ? lastAnswer.isCorrect : true; 

            setAnswerFeedback(isCorrect);
            setIsAnswered(true); 
            
        } catch (error) {
            console.error("❌ ERRO NO ENVIO:", error);
            
            // Tratamento de erro 400 melhorado
            if (error.response && error.response.status === 400) {
                const serverMsg = JSON.stringify(error.response.data);
                alert(`Erro 400 (Bad Request).\nO servidor recusou os dados.\nMsg do Servidor: ${serverMsg}`);
            } else if (error.response && error.response.status === 401) {
                alert("Sessão expirada (401). Faça login.");
            } else {
                alert("Erro de conexão. Verifique o console.");
            }

            // MANTENDO MOCK APENAS SE QUISER (Comentei para forçar o debug)
            // setTimeout(() => { setAnswerFeedback(true); setIsAnswered(true); setIsLoading(false); }, 500);
            setIsLoading(false); // Destrava para tentar de novo se quiser
        }
    };

    const handleNextOrFinish = async () => {
        if (isLastActivity) {
            await finishSession();
        } else {
            setCurrentActivityIndex(prev => prev + 1);
        }
    };

    const finishSession = async () => {
        if (!sessionId) {
            alert("Impossível finalizar: SessionID inexistente.");
            return;
        }

        try {
            console.log("Finalizando sessão:", sessionId);
            await axios.post(`${API_BASE_URL}/task-notebook-session/finish`, { sessionId: sessionId });

            alert("Sessão Finalizada com Sucesso!");
            navigate('/home'); 

        } catch (error) {
            console.error("Erro ao finalizar sessão:", error);
            
            if (error.response) {
                alert(`Erro ao finalizar: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
            } else {
                alert("Erro de rede ao finalizar.");
            }
            
            // REMOVI O NAVIGATE AQUI PARA VOCÊ VER O ERRO
            // navigate('/home'); 
        }
    };

    const renderActivity = () => {
        if (!currentActivity) return <div>Carregando Atividade...</div>; 

        const activityProps = {
            question: currentActivity.prompt || currentActivity.question || 'Selecione:',
            options: currentActivity.alternatives || currentActivity.options || [], 
            imageSrc: currentActivity.imageFile, 
            audioSrc: currentActivity.audioFile,
            onSelect: handleOptionSelect,
            selectedId: selectedAlternativeId,
            isAnswered: isAnswered,
            feedback: answerFeedback
        };
        
        let componentKey = 'construction';
        if (activityProps.imageSrc && activityProps.audioSrc) componentKey = 'mixed';
        else if (activityProps.imageSrc) componentKey = 'visual';
        else if (activityProps.audioSrc) componentKey = 'audio';

        switch (componentKey) {
            case 'mixed': return <MixedActivity {...activityProps} />;
            case 'visual': return <VisualActivity {...activityProps} />;
            case 'audio': return <AudioActivity {...activityProps} />;
            default: return <ConstructionActivity {...activityProps} />;
        }
    };

    return (
        <div className="dashboard-container">
            <header className="session-activity-header">
                <button onClick={() => navigate(-1)} className="session-back-arrow-button">
                    <img src={iconArrowLeft} alt="Voltar" className="session-back-arrow-icon"/>
                </button>
                <img src={labirintoLogo} alt="Logo" className="session-header-logo"/>
                <div className="session-timer-controls">
                    <div className="session-activity-timer">{formatTime(sessionTimeElapsed)}</div>
                </div>
            </header>

            <main className="session-init-main-content">
                <div className="session-activity-card-wrapper">
                    <div className="session-activity-card">
                        {sessionActivities.length === 0 ? (
                            <div style={{ padding: '20px', textAlign: 'center' }}>
                                <h2>Carregando...</h2>
                            </div>
                        ) : (
                            renderActivity()
                        )}
                        
                        <div style={{ marginTop: '20px', textAlign: 'center' }}>
                            <button 
                                onClick={handleNextOrFinish} 
                                className={`session-debug-btn`}
                                disabled={!isAnswered}
                                style={{
                                    backgroundColor: isLastActivity ? '#FF5722' : '#4A90E2', 
                                    opacity: !isAnswered ? 0.5 : 1,
                                    cursor: !isAnswered ? 'not-allowed' : 'pointer'
                                }}
                            >
                                {isLastActivity ? 'ENCERRAR SESSÃO' : 'PRÓXIMA ATIVIDADE'}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default SessionInitPage;