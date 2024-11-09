import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "antd";
import "../../index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Hompage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Pork");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      fetchCategories();
    }
  }, [selectedCategory]);

  const fetchCategories = async (strCategory = selectedCategory) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/receipe/categories/${strCategory}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const categoryData = response.data.category;
      setCategories(categoryData ? [categoryData] : []);
      console.log("Categories:", [categoryData]);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (strCategory) => {
    setSelectedCategory(strCategory);
  };

  const handleCardClick = (id) => {
    navigate(`/category/${id}`);
  };

  const handleFavoriteClick = async (category) => {
    const isConfirmed = window.confirm(
      `Do you want to add ${category.strCategory} to your favorites?`
    );

    if (isConfirmed) {
      try {
        await axios.put(
          `http://localhost:8080/api/v1/receipe/category/favorite/${category.idCategory}`,
          {
            categories: [
              {
                idCategory: category.idCategory,
                status: "favourite",
              },
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Category added to favorites");

        setCategories((prevCategories) =>
          prevCategories.map((cat) =>
            cat.idCategory === category.idCategory
              ? { ...cat, status: "favourite" }
              : cat
          )
        );
      } catch (error) {
        console.error("Error adding category to favorites:", error);
      }
    }
  };

  return (
    <div>
      <div className="category-buttons">
        {["Pork", "Beef", "Chicken", "Lamb", "Pasta"].map((category) => (
          <button
            key={category}
            className={`category-button ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <Row gutter={[16, 16]}>
        {categories.length > 0 ? (
          categories.map((category) => (
            <Col
              xs={24}
              sm={12}
              md={8}
              lg={6}
              key={category.idCategory || category.id}
            >
              <Card
                style={{ marginLeft: "50px" }}
                hoverable
                cover={
                  <img
                    alt={category.strCategory}
                    src={category.strCategoryThumb || "default-image-path.jpg"}
                    style={{ width: "100%", height: "auto" }}
                    onClick={() =>
                      handleCardClick(category.idCategory || category.id)
                    }
                  />
                }
                actions={[
                  <div className="card-action">
                    <span>{category.strCategory}</span>
                    <span
                      className="favorite-icon"
                      onClick={() => handleFavoriteClick(category)}
                      style={{
                        fontSize: "1.5rem",
                        color: "#ec4899",
                        cursor: "pointer",
                      }}
                    >
                      {category.status === "favourite" ? "♥" : "♡"}
                    </span>
                    <br />
                    <h1 style={{ color: "black" }}>
                      {category.strCategory} Noodle Soup
                    </h1>
                  </div>,
                ]}
              />
            </Col>
          ))
        ) : (
          <p style={{ marginLeft: "50px" }}>No categories found.</p>
        )}
      </Row>
    </div>
  );
}

export default Hompage;
