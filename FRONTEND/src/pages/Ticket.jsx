import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Typography, Card, CardContent, Button } from "@mui/material";
import { jsPDF } from "jspdf";

const Ticket = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showId, seats } = location.state || {};

  const [username, setUsername] = useState("Guest");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const calculatePrice = (seat) => {
    const row = parseInt(seat.match(/\d+/)?.[0], 10);
    if (row >= 1 && row <= 5) return 350;
    if (row >= 6 && row <= 10) return 500;
    return 200;
  };

  const totalPrice = seats?.reduce((sum, seat) => sum + calculatePrice(seat), 0) || 0;

  const handleDownloadTicket = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text(" YeLo Ticket ", 70, 20);
    
    doc.setFontSize(14);
    doc.text(`User: ${username}`, 20, 40);
    doc.text(`Show ID: ${showId}`, 20, 50);
    doc.text(`Seats: ${seats.join(", ")}`, 20, 60);
    doc.text(`Total Price: ₹${totalPrice}`, 20, 70);
    
    doc.setFont("helvetica", "italic");
    doc.setFontSize(12);
    doc.text("Your booking is confirmed! Show this ticket at the theatre entrance.", 20, 90);
    
    doc.setFontSize(16);
    doc.text("--------------------------", 20, 110);
    doc.text("YeLo Ticket Signature", 50, 120);
    doc.text("--------------------------", 20, 130);
    
    doc.save("YeLo_Ticket.pdf");
  };

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
                color="secondary"
                fullWidth
                sx={{ mt: 3 }}
                onClick={handleDownloadTicket}
              >
                Download Ticket
              </Button>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
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
