import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Typography, Button, Card, CardContent } from "@mui/material";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const showId = searchParams.get("showId");
  const seats = searchParams.get("seats")?.split(",") || [];

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
              <Typography variant="h6">Total Price: ₹{seats.length * 200}</Typography>
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
