import React from "react";
import { Link } from "react-router-dom";
import "../../index.css"; // Import the new CSS file

const Register = () => {
  return (
    <div className="register-container">
      <div className="register-box">
        <div className="w-full p-6 sm:p-12">
          <div className="flex flex-col items-center">
            <h1 className="register-title">Register</h1>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-sm flex flex-col gap-4">
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
                    />
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
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="text-gray-700 text-sm">
                    Email
                  </label>
                  <input
                    className="register-input"
                    type="email"
                    placeholder="Enter your email"
                    id="email"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="text-gray-700 text-sm">
                    Phone Number
                  </label>
                  <input
                    className="register-input"
                    type="tel"
                    placeholder="Enter your phone number"
                    id="phone"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="password" className="text-gray-700 text-sm">
                      Password
                    </label>
                    <input
                      className="register-input"
                      type="password"
                      placeholder="Password"
                      id="password"
                    />
                  </div>
                  <div>
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
                    />
                  </div>
                </div>
                <button className="register-button">
                  <span>Sign Up</span>
                </button>
                <p className="register-signin-text">
                  Already have an account?&nbsp;
                  <Link to="/" className="register-signin-link">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
