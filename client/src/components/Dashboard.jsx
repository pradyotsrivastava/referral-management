import React, { useEffect, useState } from "react";
import { getCandidates } from "../api";
import "../App.css";
import CandidateCard from "./CandidateCard";

const Dashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const status = ["All", "Pending", "Reviewed", "Hired"];

  const token = localStorage.getItem("token");

  const isLoggedIn = token ? true : false;
  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    const fetchCandidates = async () => {
      try {
        const queryParams = {
          status: selectedStatus === "All" ? "" : selectedStatus,
          name: search,
        };

        const data = await getCandidates(queryParams);
        setCandidates(data);
      } catch (error) {
        console.error("Error fetching candidates:", error.message);
      }
    };

    fetchCandidates();
  }, [selectedStatus, search, isLoggedIn]);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">Candidate Dashboard</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {/* Status Filter Buttons */}
      <div className="dashboard-btn-grp">
        <div className="status-buttons">
          {status.map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={selectedStatus === status ? "active" : ""}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {!isLoggedIn ? (
        <div className="not-logged-in-message">
          <p>Please sign in first to view and refer a candidate.</p>
        </div>
      ) : (
        <div className="candidate-list">
          {candidates.length > 0 ? (
            candidates.map((candidate) => (
              <CandidateCard key={candidate._id} candidate={candidate} />
            ))
          ) : (
            <p>No candidates found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
