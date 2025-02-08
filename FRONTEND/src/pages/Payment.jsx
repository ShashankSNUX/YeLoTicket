import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Typography, Button, Card, CardContent } from "@mui/material";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const showId = searchParams.get("showId");
  const seats = searchParams.get("seats")?.split(",") || [];

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

  const totalPrice = seats.reduce((sum, seat) => sum + calculatePrice(seat), 0);

  const handlePayment = () => {
    // Simulate payment process
    alert("Payment successful!");

    // Redirect to the ticket confirmation page
    navigate("/ticket", { state: { showId, seats } });
  };

  return (
    <Container maxWidth="sm">
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>Payment Page</Typography>
          {showId && seats.length > 0 ? (
            <>
              <Typography variant="h6">Show ID: {showId}</Typography>
              <Typography variant="h6">Seats: {seats.join(", ")}</Typography>
              <Typography variant="h6">Total Price: ₹{totalPrice}</Typography>
              <Button variant="contained" color="success" fullWidth onClick={handlePayment} style={{ marginTop: 20 }}>
                Pay Now
              </Button>
            </>
          ) : (
            <Typography>No booking details found.</Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default Payment;
