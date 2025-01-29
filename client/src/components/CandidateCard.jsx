import React, { useState, useEffect } from "react";
import { updateCandidateStatus } from "../api";
import "../App.css";

const CandidateCard = ({ candidate }) => {
  const [status, setStatus] = useState(candidate.status);

  useEffect(() => {
    setStatus(candidate.status);  // Update status if candidate prop changes
  }, [candidate.status]);

  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus);  // Update local state

    try {
      await updateCandidateStatus(candidate._id, newStatus);  // Call API to update the status
    } catch (error) {
      console.error("Error updating status:", error.message);
    }
  };

  return (
    <div className="candidate-card">
      <h3>{candidate.name}</h3>
      <h4>Job Title: </h4>
      <p>{candidate.jobTitle}</p>
      <h4>Status: </h4>
      <p>{status}</p>
      <select
        value={status}  // Bind to local state value
        onChange={handleStatusChange}
        className="status-select"
      >
        <option value="Pending">Pending</option>
        <option value="Reviewed">Reviewed</option>
        <option value="Hired">Hired</option>
      </select>
    </div>
  );
};

export default CandidateCard;
