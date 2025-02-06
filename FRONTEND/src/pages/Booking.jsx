import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // Import useAuth to get the token
import { Container, Typography, Button, Box, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const Booking = () => {
  const { id } = useParams();
  const { token } = useAuth(); // Get the token from AuthContext
  const [locations, setLocations] = useState([]);
  const [cinemas, setCinemas] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCinema, setSelectedCinema] = useState("");

  useEffect(() => {
    if (!token) {
      console.error("No token found! Please login.");
      return;
    }

    axios.get("http://localhost:8080/details", {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    })
      .then((response) => {
        setLocations(response.data.locations);
        setCinemas(response.data.cinemas);
      })
      .catch((error) => {
        console.error("Error fetching theatre details:", error.response?.data?.message || error.message);
      });

  }, [token]); 

  return (
    <Container maxWidth="md">
      <Typography variant="h3" gutterBottom>Book Tickets</Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel>Location</InputLabel>
        <Select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
          {locations.map((location) => (
            <MenuItem key={location} value={location}>{location}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedLocation && (
        <FormControl fullWidth margin="normal">
          <InputLabel>Cinema</InputLabel>
          <Select value={selectedCinema} onChange={(e) => setSelectedCinema(e.target.value)}>
            {cinemas.map((cinema) => (
              <MenuItem key={cinema} value={cinema}>{cinema}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {selectedCinema && (
        <Button variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={() => alert("Booking Confirmed!")}>Confirm Booking</Button>
      )}
    </Container>
  );
};

export default Booking;
