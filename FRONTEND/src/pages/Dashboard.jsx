import React from "react";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Box, Grid, Card, CardMedia } from "@mui/material";
import Carousel from "react-material-ui-carousel";

const promotions = [
  { image: "https://res.cloudinary.com/dcshwlqbi/image/upload/v1678901234/promotion1", title: "Adnan Sami Live Concert" },
  { image: "https://res.cloudinary.com/dcshwlqbi/image/upload/v1678901234/promotion1", title: "Red Loft Event Mumbai" },
];

const recommendedMovies = [
  { id: 1, title: "Deva", image: "https://res.cloudinary.com/dcshwlqbi/image/upload/v1678901234/pushpa2" },
  { id: 2, title: "Sky", image: "https://res.cloudinary.com/dcshwlqbi/image/upload/v1678901234/deva.jpg" },
  { id: 3, title: "Radhe", image: "https://res.cloudinary.com/dcshwlqbi/image/upload/v1678901234/deva.jpg" },
  { id: 4, title: "Loveyapa", image: "https://res.cloudinary.com/dcshwlqbi/image/upload/v1678901234/deva.jpg" },
  { id: 5, title: "Mystery Movie", image: "https://res.cloudinary.com/dcshwlqbi/image/upload/v1678901234/deva.jpg" },
];

const liveEvents = [
  { id: 6, title: "Amusement Park", image: "https://res.cloudinary.com/dcshwlqbi/image/upload/v1678901234/deva.jpg", events: "10+ Events" },
  { id: 7, title: "Workshops & More", image: "https://res.cloudinary.com/dcshwlqbi/image/upload/v1678901234/deva.jpg", events: "100+ Events" },
  { id: 8, title: "Kids", image: "https://res.cloudinary.com/dcshwlqbi/image/upload/v1678901234/deva.jpg", events: "15+ Events" },
  { id: 9, title: "Comedy Shows", image: "https://res.cloudinary.com/dcshwlqbi/image/upload/v1678901234/deva.jpg", events: "195+ Events" },
  { id: 10, title: "Music Shows", image: "https://res.cloudinary.com/dcshwlqbi/image/upload/v1678901234/deva.jpg", events: "75+ Events" },
];

const musicStudio = [
  { id: 11, title: "Ed Sheeran 2025 India Tour", image: "https://res.cloudinary.com/dcshwlqbi/image/upload/v1678901234/deva.jpg", location: "Delhi NCR", date: "Sat, 15 Feb" },
  { id: 12, title: "Mehfil E Sartaaj - Delhi", image: "https://res.cloudinary.com/dcshwlqbi/image/upload/v1678901234/deva.jpg", location: "Indira Gandhi Arena, Delhi", date: "Fri, 14 Feb" },
  { id: 13, title: "Sonu Nigam Live in Concert - Delhi", image: "https://res.cloudinary.com/dcshwlqbi/image/upload/v1678901234/deva.jpg", location: "Venue To Be Announced, Delhi NCR", date: "Sat, 8 Mar" },
  { id: 14, title: "Piyush Mishra - UdanKhatola Tour", image: "https://res.cloudinary.com/dcshwlqbi/image/upload/v1678901234/deva.jpg", location: "Gymkhana Club, Gurugram", date: "Sat, 22 Feb" },
  { id: 15, title: "Sunburn Arena ft. Zedd - Delhi NCR", image: "https://res.cloudinary.com/dcshwlqbi/image/upload/v1678901234/deva.jpg", location: "Huda Gymkhana Club, Gurgaon", date: "Fri, 7 Mar" },
];

const Dashboard = () => {
  const { movies, fetchAllMovies, error } = useAuth();

    useEffect(() => {
      fetchAllMovies();
    }, []);

    if (error) return <Typography variant="h4" color="error">{error}</Typography>;


  return (
    <Container maxWidth="lg">
      {/* Carousel Section */}
      <Carousel animation="slide" indicators={false}>
        {promotions.map((promo, index) => (
          <Box key={index} sx={{ width: "100%", height: 300, overflow: "hidden" }}>
            <img
              src={promo.image}
              alt={promo.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }}
            />
          </Box>
        ))}
      </Carousel>

      {/* Live Events Section */}
      <Typography variant="h5" sx={{ marginTop: 4, marginBottom: 2 }}>
        The Best Of Live Events
      </Typography>
      <Grid container spacing={2}>
        {liveEvents.map((event) => (
          <Grid item xs={6} sm={4} md={2.4} key={event.id}>
            <Link to={`/movie/${event.id}`} style={{ textDecoration: "none" }}>
              <Card sx={{ borderRadius: "10px", overflow: "hidden", textAlign: "center" }}>
                <CardMedia component="img" height="200" image={event.image} alt={event.title} />
                <Typography variant="body1" sx={{ padding: 1, fontWeight: "bold" }}>{event.title}</Typography>
                <Typography variant="body2" sx={{ paddingBottom: 1 }}>{event.events}</Typography>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>

      {/* Music Studio Section */}
      <Typography variant="h5" sx={{ marginTop: 4, marginBottom: 2 }}>
        Your Music Studio
      </Typography>
      <Grid container spacing={2}>
        {musicStudio.map((music) => (
          <Grid item xs={6} sm={4} md={2.4} key={music.id}>
            <Link to={`/movie/${music.id}`} style={{ textDecoration: "none" }}>
              <Card sx={{ borderRadius: "10px", overflow: "hidden" }}>
                <CardMedia component="img" height="250" image={music.image} alt={music.title} />
                <Typography variant="body1" sx={{ padding: 1, fontWeight: "bold" }}>{music.title}</Typography>
                <Typography variant="body2" sx={{ paddingBottom: 1 }}>{music.date} - {music.location}</Typography>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>

      {/* Recommended Movies Section */}
      <Typography variant="h5" sx={{ marginTop: 4, marginBottom: 2 }}>
        Recommended Movies
      </Typography>
      <Grid container spacing={2}>
        {recommendedMovies.map((movie) => (
          <Grid item xs={6} sm={4} md={2.4} key={movie.id}>
            <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none" }}>
              <Card sx={{ borderRadius: "10px", overflow: "hidden" }}>
                <CardMedia component="img" height="250" image={movie.image} alt={movie.title} />
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
      {/* Movies fetched from database*/}
      <Typography variant="h5" sx={{ marginTop: 4, marginBottom: 2 }}>
        Movies from Databse
      </Typography>
      <Grid container spacing={2}>
        {movies.map((movie) => (
          <Grid item xs={6} sm={4} md={2.4} key={movie.id}>
            <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none" }}>
              <Card sx={{ borderRadius: "10px", overflow: "hidden" }}>
                <CardMedia component="img" height="250" image={movie.cloudLink} alt={movie.title} />
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
