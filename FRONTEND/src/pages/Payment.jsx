import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Typography, Button, Card, CardContent } from "@mui/material";
import axios from "axios";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const showId = searchParams.get("showId");
  const seats = searchParams.get("seats")?.split(",") || [];

  const [loading, setLoading] = useState(false);

  // Function to calculate total price based on seat category
  const calculatePrice = (seat) => {
    const row = parseInt(seat.match(/\d+/)?.[0], 10);
    if (row >= 1 && row <= 5) {
      return 350;
    } else if (row >= 6 && row <= 10) {
      return 500;
    }
    return 200;
  };

  const totalPrice = seats.reduce((sum, seat) => sum + calculatePrice(seat), 0);

  const handlePayment = async () => {
    setLoading(true);
    try {
      // Call backend to create Razorpay order dynamically with totalPrice
      const response = await axios.post(
        `http://localhost:8080/payments/create-order?amount=${totalPrice}&currency=INR`
      );
  
      const { id: orderId, amount, currency } = response.data;
  
      // Load Razorpay script dynamically
      const razorpayScript = document.createElement("script");
      razorpayScript.src = "https://checkout.razorpay.com/v1/checkout.js";
      document.body.appendChild(razorpayScript);
  
      razorpayScript.onload = () => {
        const options = {
          key: "rzp_test_VdMFBBWq7ubdQj", // Replace with actual key
          amount,
          currency,
          name: "YeLo Ticket",
          description: `Payment for Show ID: ${showId}`,
          order_id: orderId,
          handler: function (response) {
            alert("Payment successful!");
            navigate("/ticket", { state: { showId, seats } });
          },
          prefill: {
            name: "RAHUL SHARMA", // Replace with actual user data
            email: "success@razorpay",
            contact: "9068231976",
          },
          theme: {
            color: "#3399cc",
          },
        };
  
        const razorpayInstance = new window.Razorpay(options);
        razorpayInstance.open();
      };
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed! Please try again.");
    }
    setLoading(false);
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
              <Button
                variant="contained"
                color="success"
                fullWidth
                onClick={handlePayment}
                style={{ marginTop: 20 }}
                disabled={loading}
              >
                {loading ? "Processing..." : "Pay Now"}
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
