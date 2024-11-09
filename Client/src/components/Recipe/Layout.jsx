import React from "react";
import { Outlet, Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import "../../index.css";

function Layout() {
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
          <button className="logout-icon">
            <LogoutIcon />
          </button>
        </div>
      </header>
      <Outlet />
    </div>
  );
}

export default Layout;
