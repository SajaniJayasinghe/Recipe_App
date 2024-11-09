import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function SpecificRecipe() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/receipe/category/${id}`
        );
        setCategory(response.data.category);
      } catch (error) {
        console.error("Failed to fetch category:", error);
      }
    };

    fetchCategory();
  }, [id]);

  if (!category) {
    return <p>Loading...</p>;
  }

  return (
    <div className="specific-recipe-container flex p-6 bg-gray-50">
      <div className="flex-shrink-0 w-1/3">
        <img
          src={category.strCategoryThumb || "default-image-path.jpg"}
          alt={category.strCategory}
          className="w-full h-auto rounded-md shadow-lg"
          style={{ marginTop: "20px", marginLeft: "20px" }}
        />
      </div>

      <div
        className="flex-grow ml-8"
        style={{
          marginTop: "20px",
          marginRight: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1 className="text-3xl font-bold text-pink-600 mb-4">
          {category.strCategory}
        </h1>
        <div className="flex justify-between items-center">
          <p
            className="text-justify text-gray-700 mb-4"
            style={{ fontSize: "15px", flex: 1 }}
          >
            {category.strCategoryDescription}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SpecificRecipe;
