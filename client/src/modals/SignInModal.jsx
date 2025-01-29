import React, { useState } from "react";
import { loginUser } from "../api";

const SignInModal = ({ closeModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const data = await loginUser(email, password);
      if (data.token) {
        localStorage.setItem("token", data.token);
        alert("Login successful");
        closeModal();
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Something went wrong");
      } else {
        setError("Network error, please try again");
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="modal-actions">
            <button type="button" onClick={closeModal}>
              Cancel
            </button>
            <button type="submit">Sign In</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInModal;
