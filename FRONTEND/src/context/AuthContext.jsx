import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("jwt") || "");
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [movie, setMovie] = useState(null);
  const [movies, setMovies] = useState([]); 

  useEffect(() => {
    if (token) {
      localStorage.setItem("jwt", token);
      localStorage.setItem("role", role);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      localStorage.removeItem("jwt");
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const login = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:8080/home/login", { username, password });
      const receivedToken = response.data.token || response.data;
      setToken(receivedToken);
      setRole(response.data.role);
      setSuccess("Login successful!");
      setError("");
    } catch (error) {
      setError(error.response?.data?.message || "Invalid credentials. Please try again.");
      setSuccess("");
    }
  };

  const signup = async (username, email, password) => {
    try {
      await axios.post("http://localhost:8080/home/sign-up", { username, email, password });
      setSuccess("Signup successful! Please login.");
      setError("");
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed. Try again.");
      setSuccess("");
    }
  };

  const logout = () => {
    setToken("");
    localStorage.clear(); // Clears all local storage items
    sessionStorage.clear(); // Clears session storage as well
    delete axios.defaults.headers.common["Authorization"];
    
    // Clear Razorpay cookies if needed
    document.cookie = "rzp_checkout_anon_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "rzp_device_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "rzp_stored_checkout_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    setSuccess("Logged out successfully.");
    
    // Redirect user if needed
    navigate("/login"); 
    
    // Optionally refresh the page
    window.location.reload();
};


  // 🆕 Fetch movie details by ID
  const fetchMovieDetails = async (movieId) => {
    try {
      const response = await axios.get(`http://localhost:8080/movies/${movieId}`);
      setMovie(response.data);
      setSuccess("Movie details fetched successfully!");
      setError("");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch movie details.");
      setSuccess("");
    }
  };

  const fetchAllMovies = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/movies/all`);
      setMovies(response.data);
      setSuccess("Movies fetched successfully!");
      setError("");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch all movies.");
      setSuccess("");
    }
  };

  return (
    <AuthContext.Provider value={{ token, login, signup, logout, error, success, movie,movies, fetchMovieDetails, fetchAllMovies }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
