import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../index.css";

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const resetForm = () => {
    setFirstname("");
    setLastname("");
    setEmail("");
    setPhonenumber("");
    setPassword("");
    setConfirmPassword("");
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};

    if (!firstname) newErrors.firstname = "First Name is required!";
    if (!lastname) newErrors.lastname = "Last Name is required!";
    if (!email) newErrors.email = "Email is required!";
    if (!phonenumber) newErrors.phonenumber = "Phone Number is required!";
    if (!password) newErrors.password = "Password is required!";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match!";

    // Email validation regex
    if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      newErrors.email = "Invalid email format!";
    }

    // Phone number validation
    if (phonenumber && !/^\d{10}$/.test(phonenumber)) {
      newErrors.phonenumber = "Phone number must be exactly 10 digits!";
    }

    return newErrors;
  };

  const sendData = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const user = {
      firstname,
      lastname,
      email,
      phonenumber,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/user/register",
        user
      );

      if (response && response.data) {
        alert("Registration Success");
        window.location.href = "/";
      } else {
        setErrors({ general: "Registration failed. Please try again." });
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setErrors({ general: err.response.data.message });
      } else {
        setErrors({ general: "Registration failed. Please try again." });
      }
    }

    resetForm();
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="w-full p-6 sm:p-12">
          <div className="flex flex-col items-center">
            <Title level={3} className="register-title">
              Register
            </Title>

            <div className="w-full flex-1 mt-4">
              <div className="mx-auto max-w-lg flex flex-col gap-4">
                {/* First Name and Last Name */}
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label
                      htmlFor="firstName"
                      className="text-gray-700 text-sm"
                    >
                      First Name
                    </label>
                    <input
                      className="register-input"
                      type="text"
                      placeholder="Enter your first name"
                      id="firstName"
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                    />
                    {errors.firstname && (
                      <div className="text-red-500 text-xs">
                        {errors.firstname}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <label htmlFor="lastName" className="text-gray-700 text-sm">
                      Last Name
                    </label>
                    <input
                      className="register-input"
                      type="text"
                      placeholder="Enter your last name"
                      id="lastName"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                    />
                    {errors.lastname && (
                      <div className="text-red-500 text-xs">
                        {errors.lastname}
                      </div>
                    )}
                  </div>
                </div>

                {/* Email and Phone Number */}
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label htmlFor="email" className="text-gray-700 text-sm">
                      Email
                    </label>
                    <input
                      className="register-input"
                      type="email"
                      placeholder="Enter your email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && (
                      <div className="text-red-500 text-xs">{errors.email}</div>
                    )}
                  </div>
                  <div className="flex-1">
                    <label htmlFor="phone" className="text-gray-700 text-sm">
                      Phone Number
                    </label>
                    <input
                      className="register-input"
                      type="tel"
                      placeholder="Enter your phone number"
                      id="phone"
                      value={phonenumber}
                      onChange={(e) => setPhonenumber(e.target.value)}
                    />
                    {errors.phonenumber && (
                      <div className="text-red-500 text-xs">
                        {errors.phonenumber}
                      </div>
                    )}
                  </div>
                </div>

                {/* Password and Confirm Password */}
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label htmlFor="password" className="text-gray-700 text-sm">
                      Password
                    </label>
                    <input
                      className="register-input"
                      type="password"
                      placeholder="Password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && (
                      <div className="text-red-500 text-xs">
                        {errors.password}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="confirmPassword"
                      className="text-gray-700 text-sm"
                    >
                      Confirm Password
                    </label>
                    <input
                      className="register-input"
                      type="password"
                      placeholder="Confirm password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {errors.confirmPassword && (
                      <div className="text-red-500 text-xs">
                        {errors.confirmPassword}
                      </div>
                    )}
                  </div>
                </div>

                <button className="register-button" onClick={sendData}>
                  <span>Sign Up</span>
                </button>

                <p className="register-signin-text">
                  Already have an account?&nbsp;
                  <Link to="/" className="register-signin-link">
                    Sign in
                  </Link>
                </p>

                {errors.general && (
                  <div className="text-red-500 text-xs mt-4">
                    {errors.general}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
