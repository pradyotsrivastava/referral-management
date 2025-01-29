import React, { useEffect, useState } from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import ReferralForm from "./components/ReferralForm";
import SignInModal from "./modals/SignInModal";
import SignUpModal from "./modals/SignUpModal";

function App() {
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const token = localStorage.getItem("token");

  const isLoggedIn = token ? true : false;
  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
  }, [isLoggedIn]);

  const closeModal = () => {
    setShowSignInModal(false);
    setShowSignUpModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <div className="header-container">
            <h1 className="app-title">Candidate Referral Management</h1>
            {/* Authentication  */}
            <div className="button-group">
              {!isLoggedIn ? (
                <>
                  <button
                    className="nav-btn"
                    onClick={() => setShowSignInModal(true)}
                  >
                    Sign In
                  </button>
                  <button
                    className="nav-btn"
                    onClick={() => setShowSignUpModal(true)}
                  >
                    <span>Sign Up</span>
                  </button>
                </>
              ) : (
                <button className="nav-btn" onClick={handleLogout}>
                  Logout
                </button>
              )}
            </div>
          </div>

          {/* Pages Link  */}
          <div className="button-group">
            <Link to="/dashboard" className="nav-btn">
              Dashboard
            </Link>
            <Link to="/referral" className="nav-btn">
              Referral
            </Link>
          </div>
        </header>

        {/* Routes  */}
        <div className="content-container">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/referral" element={<ReferralForm />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </div>

        {/* Modals  */}
        {showSignInModal && <SignInModal closeModal={closeModal} />}
        {showSignUpModal && <SignUpModal closeModal={closeModal} />}
      </div>
    </Router>
  );
}

export default App;
