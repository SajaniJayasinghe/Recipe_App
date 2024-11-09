import React from "react";
import { Card, Row, Col } from "antd";
import "../../index.css";

function FavouritePage() {
  return (
    <div>
      <div className="menu-grid2">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={<div className="menu-card-image"></div>}
              actions={[
                <div className="card-action">
                  <span>Soup</span>
                  <span className="favorite-icon">♡</span>
                  <br />
                  <span style={{ color: "black" }}>Chicken Noodle Soup</span>
                </div>,
              ]}
            ></Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default FavouritePage;
