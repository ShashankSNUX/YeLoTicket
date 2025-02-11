"use client";

import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, Paper, Tabs, Tab } from "@mui/material";
import axios from "axios";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    duration: "",
    rating: "",
    releaseDate: "",
    genre: "",
    language: "",
    cloudLink: "",
    name: "",
    location: "",
    showStartTime: "",
    showDate: "",
    theaterId: "",
    movieId: "",
    noOfSeatInRow: "",
    noOfPremiumSeat: "",
    noOfClassicSeat: "",
    showId: "",
    priceOfPremiumSeat: "",
    priceOfClassicSeat: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // const handleSubmit = async (endpoint, data) => {
  //   try {
  //     const response = await axios.post(`http://localhost:8080/admin/${endpoint}`, data);
  //     alert(response.data);
  //   } catch (error) {
  //     alert(error.response?.data || "Something went wrong.");
  //   }
  // };
  const handleSubmit = async (endpoint, data, method = "POST") => {
    try {
      let response;
      if (method === "DELETE") {
        response = await axios.delete(`http://localhost:8080/admin/${endpoint}/${data}`);
      } else {
        response = await axios.post(`http://localhost:8080/admin/${endpoint}`, data);
      }
      alert(response.data);
    } catch (error) {
      alert(error.response?.data || "Something went wrong.");
    }
  };

  return (
    <Container component={Paper} sx={{ mt: 4, p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}>
        Admin Panel
      </Typography>

      <Tabs value={activeTab} onChange={handleTabChange} centered>
        <Tab label="Add Movie" />
        <Tab label="Add Theatre" />
        <Tab label="Add Show" />
        <Tab label="Add Theatre Seats" />
        <Tab label="Associate Show Seats" />
        <Tab label="Delete Show" />
      </Tabs>

      <Box sx={{ mt: 3 }}>
        {/* Add Movie Form */}
        {activeTab === 0 && (
          <Box>
            <TextField fullWidth label="Title" name="title" onChange={handleChange} sx={{ mb: 2 }} />
            <TextField fullWidth label="Duration (in mins)" name="duration" onChange={handleChange} sx={{ mb: 2 }} />
            <TextField fullWidth label="Rating" name="rating" onChange={handleChange} sx={{ mb: 2 }} />
            <TextField fullWidth label="Release Date (YYYY-MM-DD)" name="releaseDate" onChange={handleChange} sx={{ mb: 2 }} />
            <TextField fullWidth label="Genre" name="genre" onChange={handleChange} sx={{ mb: 2 }} />
            <TextField fullWidth label="Language" name="language" onChange={handleChange} sx={{ mb: 2 }} />
            <TextField fullWidth label="Cloud Link" name="cloudLink" onChange={handleChange} sx={{ mb: 2 }} />
            <Button variant="contained" color="primary" onClick={() => handleSubmit("addMovie", formData)}>
              Add Movie
            </Button>
          </Box>
        )}

        {/* Add Theatre Form */}
        {activeTab === 1 && (
          <Box>
            <TextField fullWidth label="Theatre Name" name="name" onChange={handleChange} sx={{ mb: 2 }} />
            <TextField fullWidth label="Location" name="location" onChange={handleChange} sx={{ mb: 2 }} />
            <Button variant="contained" color="primary" onClick={() => handleSubmit("addTheatre", formData)}>
              Add Theatre
            </Button>
          </Box>
        )}

        {/* Add Show Form */}
        {activeTab === 2 && (
          <Box>
            <TextField fullWidth label="Show Start Time (HH:MM:SS)" name="showStartTime" onChange={handleChange} sx={{ mb: 2 }} />
            <TextField fullWidth label="Show Date (YYYY-MM-DD)" name="showDate" onChange={handleChange} sx={{ mb: 2 }} />
            <TextField fullWidth label="Theatre ID" name="theaterId" onChange={handleChange} sx={{ mb: 2 }} />
            <TextField fullWidth label="Movie ID" name="movieId" onChange={handleChange} sx={{ mb: 2 }} />
            <Button variant="contained" color="primary" onClick={() => handleSubmit("addShow", formData)}>
              Add Show
            </Button>
          </Box>
        )}

        {/* Add Theatre Seats Form */}
        {activeTab === 3 && (
          <Box>
            <TextField fullWidth label="Theatre Name" name="name" onChange={handleChange} sx={{ mb: 2 }} />
            <TextField fullWidth label="Seats per Row" name="noOfSeatInRow" onChange={handleChange} sx={{ mb: 2 }} />
            <TextField fullWidth label="Premium Seats" name="noOfPremiumSeat" onChange={handleChange} sx={{ mb: 2 }} />
            <TextField fullWidth label="Classic Seats" name="noOfClassicSeat" onChange={handleChange} sx={{ mb: 2 }} />
            <Button variant="contained" color="primary" onClick={() => handleSubmit("addTheaterSeat", formData)}>
              Add Theatre Seats
            </Button>
          </Box>
        )}

        {/* Associate Show Seats Form */}
        {activeTab === 4 && (
          <Box>
            <TextField fullWidth label="Show ID" name="showId" onChange={handleChange} sx={{ mb: 2 }} />
            <TextField fullWidth label="Premium Seat Price" name="priceOfPremiumSeat" onChange={handleChange} sx={{ mb: 2 }} />
            <TextField fullWidth label="Classic Seat Price" name="priceOfClassicSeat" onChange={handleChange} sx={{ mb: 2 }} />
            <Button variant="contained" color="primary" onClick={() => handleSubmit("associateSeats", formData)}>
              Associate Show Seats
            </Button>
          </Box>
        )}
        {activeTab === 5 && (
          <Box>
            <TextField
              fullWidth
              label="Show ID to Delete"
              name="deleteShowId"
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="error"
              onClick={() => handleSubmit("deleteShow", formData.deleteShowId, "DELETE")}
            >
              Delete Show
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default AdminPanel;
