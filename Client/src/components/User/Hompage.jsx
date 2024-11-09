import React from "react";
import "../../index.css";
import LogoutIcon from "@mui/icons-material/Logout";
import { Card, Row, Col, Button } from "antd";

function Hompage() {
  return (
    <div>
      <header className="navbar">
        <div className="navbar-logo">
          <h1>cook</h1>
        </div>
        <nav className="navbar-center">
          <a href="/homepage" className="nav-link">
            Home
          </a>
          <a href="/favourite" className="nav-link">
            Favourite
          </a>
        </nav>
        <div className="navbar-right">
          <button className="logout-icon">
            <LogoutIcon />
          </button>
        </div>
      </header>
      <div className="category-buttons">
        <button className="category-button active">Pork</button>
        <button className="category-button">Beef</button>
        <button className="category-button">Chicken</button>
        <button className="category-button">Lamb</button>
        <button className="category-button">Pasta</button>
      </div>
      <div className="menu-grid">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={<div className="menu-card-image"></div>}
              actions={[
                <div className="card-action">
                  <span style={{ marginLeft: "-200px" }}>Soup</span>
                  <span className="favorite-icon">♡</span>
                  <br />
                  <span style={{ marginLeft: "-135px", color: "black" }}>
                    Chicken Noodle Soup
                  </span>
                </div>,
              ]}
            ></Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Hompage;
