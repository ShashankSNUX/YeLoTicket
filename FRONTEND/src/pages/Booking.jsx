import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import PropTypes from "prop-types";
import { Container, Typography, Button, MenuItem, Select, FormControl, InputLabel, Grid, Box } from "@mui/material";

const Booking = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [theatres, setTheatres] = useState([]);
  const [locations, setLocations] = useState([]);
  const [cinemas, setCinemas] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (!token) return;
    axios.get("http://localhost:8080/details", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        setTheatres(response.data);
        const uniqueLocations = [...new Set(response.data.map(theatre => theatre.location))];
        setLocations(uniqueLocations);
        setSelectedLocation(uniqueLocations[0] || "");
      })
      .catch(error => console.error("Error fetching theatre details:", error));
  }, [token]);

  // Fix 1: Properly reset selectedCinema when location changes
  useEffect(() => {
    const filteredCinemas = theatres.filter(theatre => theatre.location === selectedLocation);
    setCinemas(filteredCinemas);
    setSelectedCinema(filteredCinemas.length > 0 ? filteredCinemas[0] : null);
  }, [selectedLocation, theatres]);

  useEffect(() => {
    if (selectedCinema) {
      axios.get(`http://localhost:8080/shows/${selectedCinema.id}`)
        .then(response => {
          setShows(response.data);
          setSelectedShow(response.data.length > 0 ? response.data[0] : null);
        })
        .catch(error => console.error("Error fetching shows:", error));
    }
  }, [selectedCinema]);

  // Fix 2: Reset selected seats when show changes
  useEffect(() => {
    if (selectedShow) {
      axios.get(`http://localhost:8080/show-seats/${selectedShow.id}`)
        .then(response => {
          setSeats(response.data);
          setSelectedSeats([]);
        })
        .catch(error => console.error("Error fetching seats:", error));
    }
  }, [selectedShow]);

  const toggleSeatSelection = (seat) => {
    if (!seat.isAvailable) return;
    setSelectedSeats(prev =>
      prev.includes(seat.seatNo)
        ? prev.filter(s => s !== seat.seatNo)
        : [...prev, seat.seatNo]
    );
  };

  const Seat = ({ seat }) => {
    const isSelected = selectedSeats.includes(seat.seatNo);
    return (
      <Box
        onClick={() => toggleSeatSelection(seat)}
        sx={{
          width: 50,
          height: 50,
          backgroundColor: seat.isAvailable ? (isSelected ? "blue" : "green") : "red",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: 1,
          color: "white",
          cursor: seat.isAvailable ? "pointer" : "not-allowed",
        }}
      >
        {seat.seatNo}
      </Box>
    );
  };

  Seat.propTypes = {
    seat: PropTypes.shape({
      id: PropTypes.number.isRequired,
      seatNo: PropTypes.string.isRequired,
      isAvailable: PropTypes.bool.isRequired,
    }).isRequired,
  };

  const handleBooking = () => {
    if (!selectedShow || selectedSeats.length === 0) {
      alert("Please select a show and seats before booking.");
      return;
    }

    axios.post("http://localhost:8080/book", {
      showId: selectedShow.id,
      requestSeats: selectedSeats,
    }, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        navigate(`/payment?showId=${selectedShow.id}&seats=${selectedSeats.join(",")}`);
      })
      .catch(error => {
        console.error("Error during booking:", error);
        alert("Booking Failed. Try Again.");
      });
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h3" gutterBottom>Book Tickets</Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel>Location</InputLabel>
        <Select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
          {locations.map(location => <MenuItem key={location} value={location}>{location}</MenuItem>)}
        </Select>
      </FormControl>

      {selectedLocation && (
        <FormControl fullWidth margin="normal">
          <InputLabel>Cinema</InputLabel>
          <Select
            value={selectedCinema?.id || ""}
            onChange={(e) => {
              const cinema = cinemas.find(cinema => cinema.id === e.target.value);
              setSelectedCinema(cinema || null);
            }}
          >
            {cinemas.map(cinema => (
              <MenuItem key={cinema.id} value={cinema.id}>{cinema.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {selectedCinema && (
        <FormControl fullWidth margin="normal">
          <InputLabel>Available Shows</InputLabel>
          <Select
            value={selectedShow?.id || ""}
            onChange={(e) => {
              const show = shows.find(show => show.id === e.target.value);
              setSelectedShow(show || null);
            }}
          >
            {shows.map(show => (
              // Fix 3: Verify movie title structure matches API response
              <MenuItem key={show.id} value={show.id}>
                {show.movie?.title} ({show.time})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

{selectedShow && (
  <>
    <Box sx={{ textAlign: "center", mb: 3 }}>
      <Typography variant="h4">Select Your Seats</Typography>
      <Typography variant="h6">🎟 Classic seats: 1A to 5J</Typography>
      <Typography variant="h6">⭐ Premium seats: 6A to 10J</Typography>
    </Box>

    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Grid 
        container 
        spacing={1} 
        sx={{ 
          maxWidth: "80vw", 
          justifyContent: "center" 
        }}
      >
        {seats.map(seat => (
          <Grid item key={seat.seatNo} xs={1}>
            <Seat seat={seat} />
          </Grid>
        ))}
      </Grid>
    </Box>

    <Button 
      variant="contained" 
      color="success" 
      fullWidth 
      onClick={handleBooking} 
      sx={{ marginTop: 3 }}
    >
      Book Now
    </Button>
  </>
)}
    </Container>
  );
};

export default Booking;