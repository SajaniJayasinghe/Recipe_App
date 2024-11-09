import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "antd";
import axios from "axios";
import "../../index.css";
import { useNavigate } from "react-router-dom";

function FavouritePage() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    axios
      .get("http://localhost:8080/api/v1/receipe/favorites", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFavorites(response.data);
      })
      .catch((error) => {
        console.error("Error fetching favorite recipes", error);
        setFavorites([]);
      });
  }, [navigate]);

  const handleUnfavoriteClick = async (category) => {
    const isConfirmed = window.confirm(
      `Do you want to remove ${category.strCategory} from your favorites?`
    );

    if (isConfirmed) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Please log in first.");
          return;
        }
        await axios.put(
          `http://localhost:8080/api/v1/receipe/category/favorite/${category.idCategory}`,
          {
            categories: [
              {
                idCategory: category.idCategory,
                status: "unfavourite",
              },
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Category removed from favorites");
        setFavorites((prevFavorites) =>
          prevFavorites.filter(
            (recipe) =>
              !recipe.categories.some(
                (cat) => cat.idCategory === category.idCategory
              )
          )
        );
        window.location.reload();
      } catch (error) {
        console.error("Error removing category from favorites:", error);
      }
    }
  };

  return (
    <div>
      <div className="menu-grid2">
        <Row gutter={[16, 16]}>
          {favorites.length > 0 ? (
            favorites.map((recipe) =>
              recipe.categories.map(
                (category) =>
                  category.status === "favourite" && (
                    <Col
                      xs={24}
                      sm={12}
                      md={8}
                      lg={6}
                      key={category.idCategory}
                    >
                      <Card
                        hoverable
                        cover={
                          <img
                            alt={category.strCategory}
                            src={
                              category.strCategoryThumb ||
                              "default-image-path.jpg"
                            }
                            style={{ width: "100%", height: "auto" }}
                          />
                        }
                        actions={[
                          <div className="card-action2">
                            <span>{category.strCategory}</span>
                            <span
                              className="favorite-icon"
                              onClick={() => handleUnfavoriteClick(category)}
                              style={{
                                fontSize: "1.5rem",
                                color: "#ec4899",
                                cursor: "pointer",
                              }}
                            >
                              ♥
                            </span>
                            <br />
                          </div>,
                        ]}
                      ></Card>
                    </Col>
                  )
              )
            )
          ) : (
            <p>No favorite categories found</p>
          )}
        </Row>
      </div>
    </div>
  );
}

export default FavouritePage;
