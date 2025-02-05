import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import AuthContext
import { Container, Typography, Button, Box, MenuItem, Select, FormControl, InputLabel } from "@mui/material";


const locations = ["New York", "Los Angeles", "Chicago", "Houston"];
const cinemasPerLocation = 5;
const screensPerCinema = 2;
const screeningsPerScreen = 5;

const generateCinemas = (location) => Array.from({ length: cinemasPerLocation }, (_, i) => `${location} Cinema ${i + 1}`);
const generateScreens = (cinema) => Array.from({ length: screensPerCinema }, (_, i) => `${cinema} - Screen ${i + 1}`);
const generateScreenings = (screen) => Array.from({ length: screeningsPerScreen }, (_, i) => `${screen} - Time ${i + 1}`);

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { movie, fetchMovieDetails, error } = useAuth();
  
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCinema, setSelectedCinema] = useState("");
  const [selectedScreen, setSelectedScreen] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  useEffect(() => {
    fetchMovieDetails(id);
  }, [id]);


  if (error) return <Typography variant="h4" color="error">{error}</Typography>;
  if (!movie) return <Typography variant="h4">Loading...</Typography>;

  return (
    <Container maxWidth="md">
      <Typography variant="h3" gutterBottom>Book Tickets for {movie.title}</Typography>
      
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
            {generateCinemas(selectedLocation).map((cinema) => (
              <MenuItem key={cinema} value={cinema}>{cinema}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {selectedCinema && (
        <FormControl fullWidth margin="normal">
          <InputLabel>Screen</InputLabel>
          <Select value={selectedScreen} onChange={(e) => setSelectedScreen(e.target.value)}>
            {generateScreens(selectedCinema).map((screen) => (
              <MenuItem key={screen} value={screen}>{screen}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {selectedScreen && (
        <FormControl fullWidth margin="normal">
          <InputLabel>Screening Time</InputLabel>
          <Select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
            {generateScreenings(selectedScreen).map((time) => (
              <MenuItem key={time} value={time}>{time}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {selectedTime && (
        <Button variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={() => alert("Booking Confirmed!")}>Confirm Booking</Button>
      )}
    </Container>
  );
};

export default Booking;
