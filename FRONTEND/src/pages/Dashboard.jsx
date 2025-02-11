"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { Link } from "react-router-dom"
import { Container, Typography, Grid, Card, CardMedia, TextField } from "@mui/material"

const Dashboard = () => {
  const { movies, fetchAllMovies, error } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredMovies, setFilteredMovies] = useState([])

  useEffect(() => {
    fetchAllMovies()
  }, [fetchAllMovies]) // Added fetchAllMovies to dependencies

  useEffect(() => {
    setFilteredMovies(movies.filter((movie) => movie.title.toLowerCase().includes(searchTerm.toLowerCase())))
  }, [searchTerm, movies])

  if (error)
    return (
      <Typography variant="h4" color="error">
        {error}
      </Typography>
    )

  return (
    <Container maxWidth="lg">
      {/* Search Bar */}
      <TextField
        fullWidth
        variant="outlined"
        label="Search Movies"
        sx={{ mt: 2, mb: 2 }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Movies fetched from database*/}
      <Typography variant="h5" sx={{ marginTop: 4, marginBottom: 2 }}>
        LATEST MOVIES
      </Typography>
      <Grid container spacing={2}>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <Grid item xs={6} sm={4} md={2.4} key={movie.id}>
              <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none" }}>
                <Card
                  sx={{
                    borderRadius: "10px",
                    overflow: "hidden",
                    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
                    },
                  }}
                >
                  <CardMedia component="img" height="250" image={movie.cloudLink} alt={movie.title} />
                </Card>
              </Link>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
            No movies found.
          </Typography>
        )}
      </Grid>
    </Container>
  )
}

export default Dashboard

