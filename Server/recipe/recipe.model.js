const mongoose = require("mongoose");
const { Schema } = mongoose;

const recipeSchema = new Schema(
  {
    categories: [
      {
        idCategory: {
          type: String,
          required: true,
          unique: true,
        },
        strCategory: {
          type: String,
          required: true,
        },
        strCategoryThumb: {
          type: String,
          required: true,
        },
        strCategoryDescription: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          enum: ["unfavourite", "favourite"],
          default: "unfavourite",
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", recipeSchema);
