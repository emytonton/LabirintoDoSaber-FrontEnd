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

// --- Ícones
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

// --- Componentes Visuais
const OptionButtons = ({ options, onSelect, selectedId, isAnswered, feedback }) => {
    return (
        <div className="session-option-buttons-container">
            {options.map((opt, index) => {
                // Tenta usar id ou _id, se não tiver, usa o index como fallback seguro
                const safeId = opt.id || opt._id || String(index);
                const isSelected = String(selectedId) === String(safeId);
                
                let buttonStyle = {};
                if (isAnswered) {
                    if (isSelected) {
                        // Se feedback for null/undefined, assumimos verde para não confundir
                        buttonStyle = (feedback === true || feedback === null)
                            ? { backgroundColor: '#4CAF50', color: 'white', borderColor: '#4CAF50' }
                            : { backgroundColor: '#F44336', color: 'white', borderColor: '#F44336' };
                    } else {
                        buttonStyle = { opacity: 0.6, cursor: 'not-allowed' };
                    }
                }

                return (
                    <button 
                        key={safeId} 
                        className="session-option-btn"
                        style={buttonStyle} 
                        onClick={() => !isAnswered && onSelect(safeId)}
                        disabled={isAnswered}
                    >
                        {opt.text || opt.label || "Opção"}
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
    
    // Prioridade: se veio 'tasks' (grupo/caderno), usa. Se veio 'task' única, coloca num array.
    const [sessionActivities] = useState(tasks ? tasks : (task ? [task] : []));
    
    const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
    const [sessionTimeElapsed, setSessionTimeElapsed] = useState(0);
    const [questionStartTime, setQuestionStartTime] = useState(Date.now());
    
    // Estado visual e lógico
    const [selectedAlternativeId, setSelectedAlternativeId] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [answerFeedback, setAnswerFeedback] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Timer Global
    useEffect(() => {
        const timerId = setInterval(() => setSessionTimeElapsed(prev => prev + 1), 1000);
        return () => clearInterval(timerId);
    }, []);

    // Reseta o estado quando muda de atividade
    useEffect(() => {
        setSelectedAlternativeId(null);
        setIsAnswered(false);
        setAnswerFeedback(null);
        setQuestionStartTime(Date.now());
        setIsLoading(false); // Garante que não trava carregando
    }, [currentActivityIndex]);

    const currentActivity = sessionActivities[currentActivityIndex];
    const isLastActivity = currentActivityIndex === sessionActivities.length - 1;

    // --- LOGICA DE ENVIO ---
    const handleOptionSelect = async (alternativeId) => {
        if (isAnswered || isLoading) return;

        // Atualiza visualmente imediatamente
        setSelectedAlternativeId(alternativeId);
        setIsLoading(true);

        // Validação básica
        if (!sessionId) {
            console.error("ERRO: Session ID ausente. Usando modo offline para não travar.");
        }

        const timeToAnswer = Math.max(0, Math.floor((Date.now() - questionStartTime) / 1000));
        
        // Garante ID da tarefa (suporta _id ou id)
        const taskId = currentActivity.id || currentActivity._id;

        const payload = {
            sessionId: sessionId,
            taskId: taskId,
            selectedAlternativeId: alternativeId,
            timeToAnswer: timeToAnswer
        };

        console.log("📤 Enviando resposta:", payload);

        try {
            const token = localStorage.getItem('authToken');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            
            const response = await axios.post(`${API_BASE_URL}/task-notebook-session/answer`, payload, config);
            
            console.log("✅ Resposta salva:", response.data);
            
            const lastAnswer = response.data.answers ? response.data.answers[response.data.answers.length - 1] : null;
            const isCorrect = lastAnswer ? lastAnswer.isCorrect : true;

            setAnswerFeedback(isCorrect);
            setIsAnswered(true); // Habilita o botão PRÓXIMA

        } catch (error) {
            console.error("⚠️ Erro no envio (Modo Failsafe Ativado):", error);
            
            // --- MODO FAILSAFE (SEGURANÇA) ---
            // Se a API falhar, permitimos o usuário continuar mesmo assim.
            // Fingimos que deu certo para não travar a sessão.
            setAnswerFeedback(true); // Marca como verde
            setIsAnswered(true);     // Destrava o botão "Próxima"
            
            // Opcional: Mostrar alerta sutil
            // alert("Aviso: Houve um erro de conexão, mas você pode prosseguir.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleNextOrFinish = async () => {
        if (isLastActivity) {
            await finishSession();
        } else {
            setCurrentActivityIndex(prev => prev + 1);
        }
    };

    // ... dentro de SessionInitPage ...

    const finishSession = async () => {
        if (!sessionId) {
            alert("Sessão finalizada (Modo local).");
            navigate('/home');
            return;
        }

        try {
            const token = localStorage.getItem('authToken');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            
            console.log("🔄 Finalizando sessão no servidor...");

            // Capturamos a resposta do servidor aqui
            const response = await axios.post(`${API_BASE_URL}/task-notebook-session/finish`, { sessionId }, config);
            
            // --- AQUI ESTÁ O RELATÓRIO NO CONSOLE ---
            console.group("📊 RELATÓRIO DA SESSÃO GERADO");
            console.log("🆔 ID da Sessão:", response.data.id || response.data.sessionId);
            console.log("📅 Iniciado em:", response.data.startedAt);
            console.log("🏁 Finalizado em:", response.data.finishedAt);
            
            // Mostra as respostas detalhadas (se o back retornar)
            if (response.data.answers) {
                console.log("📝 Respostas do Aluno:", response.data.answers);
                
                // Cálculo rápido no front apenas para você visualizar na hora
                const total = response.data.answers.length;
                const acertos = response.data.answers.filter(a => a.isCorrect).length;
                console.log(`📈 Desempenho: ${acertos}/${total} acertos (${((acertos/total)*100).toFixed(0)}%)`);
            } else {
                console.log("⚠️ O servidor não retornou a lista de respostas no endpoint /finish.");
                console.log("Dados completos recebidos:", response.data);
            }
            console.groupEnd();
            // -----------------------------------------

            alert("Sessão Finalizada! Confira o relatório detalhado no Console (F12).");
            navigate('/home');

        } catch (error) {
            console.error("Erro ao finalizar:", error);
            if (error.response) {
                console.log("Dados do erro:", error.response.data);
            }
            alert("Sessão encerrada (com aviso de rede).");
            navigate('/home');
        }
    };
    const renderActivity = () => {
        if (!currentActivity) return <div>Carregando Atividade...</div>;

        const activityProps = {
            // Garante que o componente recrie quando mudar o ID (IMPORTANTE)
            key: currentActivity.id || currentActivityIndex, 
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
                                className="session-debug-btn"
                                disabled={!isAnswered}
                                style={{
                                    backgroundColor: isLastActivity ? '#FF5722' : '#4A90E2',
                                    opacity: !isAnswered ? 0.5 : 1,
                                    cursor: !isAnswered ? 'not-allowed' : 'pointer',
                                    padding: '10px 30px',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    fontWeight: 'bold'
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