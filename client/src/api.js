import axios from "axios";

// Set base URL for API calls
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Get the token from localStorage
const getAuthToken = () => {
  return localStorage.getItem("token"); 
};

// Function to handle user login
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error; 
  }
};

// Function to handle user signup
export const signUpUser = async (email, password, username) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/auth/signup`, {
      username,
      email,
      password,
    });
    return response.data; 
  } catch (error) {
    console.log(error, "ERROR SIGN UP");
    throw error;
  }
};

// Add a new candidate
export const addCandidate = async (candidateData) => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("User is not authenticated");
  }

  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/candidates`,
      candidateData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error adding candidate:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Get all candidates
export const getCandidates = async ({ status = "", name = "" } = {}) => {
  const token = getAuthToken(); 

  if (!token) {
    throw new Error("User is not authenticated");
  }

  try {
    const params = {
      status: status !== "All" ? status : "",
      name,
    };

    const response = await axios.get(`${BACKEND_URL}/api/candidates`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params, 
    });

    return response.data; 
  } catch (error) {
    console.error(
      "Error fetching candidates:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Update candidate status
export const updateCandidateStatus = async (candidateId, status) => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("User is not authenticated");
  }

  try {
    const response = await axios.put(
      `${BACKEND_URL}/api/candidates/${candidateId}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error updating candidate status:",
      error.response?.data || error.message
    );
    throw error;
  }
};
