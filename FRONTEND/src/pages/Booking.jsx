import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Container, Typography, Button, MenuItem, Select, FormControl, InputLabel, Grid } from "@mui/material";

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

  useEffect(() => {
    if (!token) return;
    axios.get("http://localhost:8080/details", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        setTheatres(response.data);
        const uniqueLocations = [...new Set(response.data.map(theatre => theatre.location))];
        setLocations(uniqueLocations);
        if (uniqueLocations.length > 0) {
          setSelectedLocation(uniqueLocations[0]);
        }
      })
      .catch(error => console.error("Error fetching theatre details:", error));
  }, [token]);

  useEffect(() => {
    const filteredCinemas = theatres.filter(theatre => theatre.location === selectedLocation);
    setCinemas(filteredCinemas);
    if (filteredCinemas.length > 0) {
      setSelectedCinema(filteredCinemas[0]);
    }
  }, [selectedLocation, theatres]);

  useEffect(() => {
    if (selectedCinema) {
      axios.get(`http://localhost:8080/shows/${selectedCinema.id}`)
        .then(response => {
          setShows(response.data);
          if (response.data.length > 0) {
            setSelectedShow(response.data[0]);
          }
        })
        .catch(error => console.error("Error fetching shows:", error));
    }
  }, [selectedCinema]);

  useEffect(() => {
    if (selectedShow) {
      axios.get(`http://localhost:8080/show-seats/${selectedShow.id}`)
        .then(response => {
          setSeats(formatSeats(response.data));
        })
        .catch(error => console.error("Error fetching seats:", error));
    }
  }, [selectedShow]);

  const formatSeats = (seatsData) => {
    const rows = "ABCDEFGHIJ";
    return seatsData.map((seat, index) => {
      const rowLabel = rows[Math.floor(index / 10)];
      const seatNumber = (index % 10) + 1;
      return { ...seat, displayId: `${seatNumber}${rowLabel}` };
    });
  };

  const toggleSeatSelection = (seat) => {
    if (seat.booked) return;
    setSelectedSeats(prev =>
      prev.includes(seat.displayId)
        ? prev.filter(s => s !== seat.displayId)
        : [...prev, seat.displayId]
    );
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
          <Select value={selectedCinema?.id || ""} onChange={(e) => {
            const cinema = cinemas.find(cinema => cinema.id === e.target.value);
            setSelectedCinema(cinema || null);
          }}>
            {cinemas.map(cinema => <MenuItem key={cinema.id} value={cinema.id}>{cinema.name}</MenuItem>)}
          </Select>
        </FormControl>
      )}

      {selectedCinema && (
        <FormControl fullWidth margin="normal">
          <InputLabel>Available Shows</InputLabel>
          <Select value={selectedShow?.id || ""} onChange={(e) => {
            const show = shows.find(show => show.id === e.target.value);
            setSelectedShow(show || null);
          }}>
            {shows.map(show => <MenuItem key={show.id} value={show.id}>{show.movie.title} ({show.time})</MenuItem>)}
          </Select>
        </FormControl>
      )}

      {selectedShow && (
        <>
          <Typography variant="h5" gutterBottom>Select Your Seats</Typography>
          <Grid container spacing={1} justifyContent="center">
            {seats.map((seat) => (
              <Grid item key={seat.id}>
                <Button
                  variant={selectedSeats.includes(seat.displayId) ? "contained" : "outlined"}
                  color={seat.booked ? "error" : seat.type === "premium" ? "warning" : "primary"}
                  onClick={() => toggleSeatSelection(seat)}
                  disabled={seat.booked}
                  style={{ width: 40, height: 40, margin: 5 }}
                >
                  {seat.displayId}
                </Button>
              </Grid>
            ))}
          </Grid>

          <Button variant="contained" color="success" fullWidth onClick={handleBooking} style={{ marginTop: 20 }}>
            Book Now
          </Button>
        </>
      )}
    </Container>
  );
};

export default Booking;
