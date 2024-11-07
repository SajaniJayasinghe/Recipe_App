const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      maxlength: [100, "First Name should not exceed 100 characters!"],
      required: [true, "First Name is required!"],
    },

    lastname: {
      type: String,
      maxlength: [100, "Last Name should not exceed 100 characters!"],
      required: [true, "Last Name is required!"],
    },

    email: {
      type: String,
      unique: true,
      maxlength: [50, "Email should not exceed 50 characters!"],
      required: [true, "Email is required!"],
      validate: {
        validator: (value) => {
          return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value
          );
        },
        message: "Invalid email address!",
      },
    },

    phonenumber: {
      type: String,
      unique: true,
      required: [true, "Phone number is required!"],
      validate: {
        validator: (value) => {
          return /^\d{10}$/.test(value);
        },
        message: "Phone number must be exactly 10 digits!",
      },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
