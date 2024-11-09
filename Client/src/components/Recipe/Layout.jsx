import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import "../../index.css";

function Layout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const isConfirmed = window.confirm("Do you want to log out?");
    if (!isConfirmed) return;

    try {
      await axios.post(
        "http://localhost:8080/api/v1/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.error("Error during logout", error);
    }
  };

  return (
    <div>
      <header className="navbar">
        <div className="navbar-logo">
          <h1>cook</h1>
        </div>
        <nav className="navbar-center">
          <Link to="/homepage" className="nav-link">
            Home
          </Link>
          <Link to="/favourite" className="nav-link">
            Favourite
          </Link>
        </nav>
        <div className="navbar-right">
          <button className="logout-icon" onClick={handleLogout}>
            <LogoutIcon />
          </button>
        </div>
      </header>
      <Outlet />
    </div>
  );
}

export default Layout;
