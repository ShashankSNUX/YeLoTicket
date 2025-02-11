import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import AuthContext
import { Container, Typography, Button, Box } from "@mui/material";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { movie, fetchMovieDetails, error } = useAuth();

  useEffect(() => {
    fetchMovieDetails(id);
  }, [id]);

  if (error) return <Typography variant="h4" color="error">{error}</Typography>;
  if (!movie) return <Typography variant="h4">Loading...</Typography>;

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      {/* Display Movie Poster */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <img
          src={movie.cloudLink}
          alt={movie.title}
          style={{
            width: "auto",
            maxWidth: "90vw",
            maxHeight: "80vh",
            borderRadius: "10px",
          }}
        />
      </Box>

      {/* Movie Details */}
      <Typography variant="h3">{movie.title}</Typography>
      <Typography variant="h6">⭐ {movie.rating}/10</Typography>
      <Typography variant="body1">
        {movie.duration} mins • {movie.genre} • Language: {movie.language} • Release Date: {movie.releaseDate}
      </Typography>

      <Button 
        variant="contained" 
        color="primary" 
        sx={{ marginTop: 2 }}
        onClick={() => navigate(`/booking/${id}`)}
      >
        Book Tickets
      </Button>
    </Container>
  );
};

export default MovieDetail;
