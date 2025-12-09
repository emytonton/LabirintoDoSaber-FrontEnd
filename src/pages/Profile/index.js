import React, { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/images/logo.png";
import iconNotification from "../../assets/images/icon_notification.png";
import iconProfile from "../../assets/images/icon_profile.png";
import iconArrowLeft from "../../assets/images/seta_icon_esquerda.png";

const API_BASE_URL = "https://labirinto-do-saber.vercel.app";

function ProfileEdit() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
  });

  const [profileFile, setProfileFile] = useState(null);
  const [fileName, setFileName] = useState("Nenhum arquivo foi selecionado");
  const [avatarUrl, setAvatarUrl] = useState(iconProfile);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          navigate("/");
          return;
        }

        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get(
          `${API_BASE_URL}/educator/me`,
          config
        );
        const userData = response.data;

        setFormData({
          name: userData.name || "",
          email: userData.email || "",
          contact: userData.contact || "",
        });

        setAvatarUrl(userData._photoUrl || iconProfile);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
        if (error.response && error.response.status === 401) {
          alert("Sessão expirada.");
          navigate("/");
        }
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleFileClick = (e) => {
    e.preventDefault();
    const input = document.getElementById("fileInputHidden");
    if (input) input.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileName(file.name);
      setProfileFile(file);
    } else {
      setFileName("Nenhum arquivo foi selecionado");
      setProfileFile(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePictureUpload = async () => {
    if (!profileFile) return true;

    try {
      const token = localStorage.getItem("authToken");
      const formDataToSend = new FormData();
      formDataToSend.append("photo", profileFile);

      const config = { headers: { Authorization: `Bearer ${token}` } };

      const response = await axios.put(
        `${API_BASE_URL}/educator/update-profile-picture`,
        formDataToSend,
        config
      );

      if (response.data && response.data._photoUrl) {
        setAvatarUrl(response.data._photoUrl);
      }

      return true;
    } catch (error) {
      console.error("ERRO DETALHADO NO UPLOAD (PUT FOTO):", error);
      alert("❌ Erro ao atualizar foto de perfil. Verifique o console.");
      return false;
    }
  };

  const handleUpdateTextData = async () => {
    const dataToUpdate = {
      newName: formData.name,
      newContact: formData.contact,
    };

    try {
      const token = localStorage.getItem("authToken");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const response = await axios.put(
        `${API_BASE_URL}/educator/update-educator`,
        dataToUpdate,
        config
      );

      if (response.data && response.data.name) {
        setFormData((prev) => ({ ...prev, name: response.data.name }));
      }

      return true;
    } catch (error) {
      console.error("ERRO DETALHADO NO PUT TEXTO:", error);
      alert("❌ Erro ao atualizar nome/contato. Verifique o console.");
      return false;
    }
  };

  const handleSave = async () => {
    setLoading(true);

    const results = await Promise.all([
      handleUpdateTextData(),
      handleProfilePictureUpload(),
    ]);

    const success = results.every((result) => result === true);

    if (success) {
      alert("✅ Perfil atualizado com sucesso!");
      navigate("/home", { state: { profileUpdated: Date.now() } });
    } else {
      alert("⚠️ Houve falhas no salvamento. Verifique o console.");
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <h2>Carregando perfil...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="header">
        <img src={logo} alt="Labirinto do Saber" className="logo" />
        <nav className="navbar">
          <a href="/home" className="nav-link">
            Dashboard
          </a>
          <a href="/activitiesMain" className="nav-link">
            Atividades
          </a>
          <a href="/alunos" className="nav-link">
            Alunos
          </a>
          <a href="/MainReport" className="nav-link">
            Relatórios
          </a>
        </nav>
        <div className="user-controls">
          <img
            src={iconNotification}
            alt="Notificações"
            className="icon"
          />
          <img src={iconProfile} alt="Perfil" className="icon profile-icon" />
        </div>
      </header>

      <main className="profile-main-content">
        <div className="profile-container">
          <div className="top-nav-row">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
              className="back-arrow-link"
            >
              <img
                src={iconArrowLeft}
                alt="Voltar"
                className="back-arrow-icon"
              />
            </a>
          </div>

          <div className="profile-edit-card">
            <div className="avatar-upload-section">
              <div className="avatar-placeholder-large">
                {avatarUrl === iconProfile ? (
                  <div className="default-user-icon">
                    <div className="user-head" />
                    <div className="user-body" />
                  </div>
                ) : (
                  <img
                    src={avatarUrl}
                    alt="Foto de Perfil"
                    className="actual-avatar-image"
                  />
                )}
              </div>

              <div className="upload-controls">
                <label className="field-label">Foto de perfil</label>

                <div className="custom-file-wrapper">
                  <button
                    type="button"
                    className="btn-select-file"
                    onClick={handleFileClick}
                  >
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

                <p className="upload-hint">
                  Formatos aceitos: JPG, PNG. Tamanho máximo: 2MB.
                </p>
              </div>
            </div>

            <form className="profile-form">
              <div className="form-group">
                <label className="field-label">Nome do profissional</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Nome completo"
                />
              </div>

              <div className="form-group">
                <label className="field-label">
                  Profissão (Não será salvo agora)
                </label>
                <input
                  type="text"
                  value="Profissão Indisponível"
                  disabled
                  className="form-input"
                  style={{ backgroundColor: "#f5f5f5" }}
                />
              </div>

              <div className="form-group">
                <label className="field-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  className="form-input"
                  disabled
                  style={{ backgroundColor: "#f5f5f5", cursor: "not-allowed" }}
                />
              </div>

              <div className="form-group">
                <label className="field-label">
                  Contato do profissional
                </label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Preencha aqui..."
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn-save-profile"
                  onClick={handleSave}
                  disabled={loading}
                >
                  {loading ? "Salvando..." : "Salvar perfil"}
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
