import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Typography, Card, CardContent, Button } from "@mui/material";

const Ticket = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showId, seats } = location.state || {};

  // Retrieve the logged-in user's name (assuming it's stored in localStorage)
  const username = localStorage.getItem("username") || "Guest";

  // Function to calculate total price based on seat category
  const calculatePrice = (seat) => {
    const row = parseInt(seat.match(/\d+/)?.[0], 10); // Extract row number
    if (row >= 1 && row <= 5) {
      return 350; // Seats from 1A to 5J cost ₹350
    } else if (row >= 6 && row <= 10) {
      return 500; // Seats from 6A to 10J cost ₹500
    }
    return 200; // Default price (if needed)
  };

  const totalPrice = seats?.reduce((sum, seat) => sum + calculatePrice(seat), 0) || 0;

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ mt: 4, textAlign: "center", p: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            🎟 Ticket Confirmation 🎟
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            User: {username}
          </Typography>
          {showId && seats?.length > 0 ? (
            <>
              <Typography variant="h6">Show ID: {showId}</Typography>
              <Typography variant="h6">Seats: {seats.join(", ")}</Typography>
              <Typography variant="h6">Total Price: ₹{totalPrice}</Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                Your booking is confirmed! Show this ticket at the theatre entrance.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 3 }}
                onClick={handleBackToDashboard}
              >
                Back to Dashboard
              </Button>
            </>
          ) : (
            <Typography variant="body1">No ticket details found.</Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default Ticket;
