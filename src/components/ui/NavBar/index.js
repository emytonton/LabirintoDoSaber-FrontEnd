import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import "./style.css";
import logo from "../../../assets/images/logo.png";
import iconNotification from "../../../assets/images/icon_notification.png";
import iconProfile from "../../../assets/images/icon_profile.png";

const API_BASE_URL = "https://labirinto-do-saber.vercel.app";

function Navbar() {
  const [userName, setUserName] = useState("");
  const [userPhotoUrl, setUserPhotoUrl] = useState(iconProfile);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEducator = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const userResponse = await axios.get(
        `${API_BASE_URL}/educator/me`,
        config
        );

        const data = userResponse.data || {};
        const avatar =
        data.photoUrl || data._photoUrl || iconProfile;

        setUserName(data.name || "");
        setUserPhotoUrl(avatar);

      } catch (error) {
        console.error("Erro ao carregar dados do educador na navbar:", error);
      }
    };

    fetchEducator();
  }, []);

  const isActive = (path) => {
    if (path === "/home") return location.pathname === "/home";
    return location.pathname.startsWith(path);
  };

  return (
    <header className="header">
      <img src={logo} alt="Labirinto do Saber" className="logo" />

      <nav className="navbar">
        <Link
          to="/home"
          className={`nav-link ${isActive("/home") ? "active" : ""}`}
        >
          Dashboard
        </Link>
        <Link
          to="/activitiesMain"
          className={`nav-link ${
            isActive("/activitiesMain") ? "active" : ""
          }`}
        >
          Atividades
        </Link>
        <Link
          to="/alunos"
          className={`nav-link ${isActive("/alunos") ? "active" : ""}`}
        >
          Alunos
        </Link>
        <Link
          to="/MainReport"
          className={`nav-link ${isActive("/MainReport") ? "active" : ""}`}
        >
          Relatórios
        </Link>
      </nav>

      <div className="home-user-controls user-controls">
        <img
          src={iconNotification}
          alt="Notificações"
          className="icon"
        />
        <img
          src={userPhotoUrl}
          alt={userName || "Perfil"}
          className="profile-icon"
          onClick={() => navigate("/Profile")}
          style={{
            cursor: "pointer",
            objectFit: "cover",
          }}
        />
      </div>
    </header>
  );
}

export default Navbar;
