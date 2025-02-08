import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Typography, Card, CardContent, Button } from "@mui/material";

const Ticket = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showId, seats } = location.state || {};

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
          {showId && seats?.length > 0 ? (
            <>
              <Typography variant="h6">Show ID: {showId}</Typography>
              <Typography variant="h6">Seats: {seats.join(", ")}</Typography>
              <Typography variant="h6">Total Price: ₹{seats.length * 350}</Typography>
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