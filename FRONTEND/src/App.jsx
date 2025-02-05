import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, CssBaseline, Container, Box } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import MovieDetail from "./pages/MovieDetail"; 
import ProtectedRoute from "./components/ProtectedRoute";
import About from "./pages/About";
import Booking from "./pages/Booking"; 

const theme = createTheme({
  palette: {
    primary: {
      main: "#d32f2f", 
    },
  },
});

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Navbar />
          <Container maxWidth="md" sx={{ display: "flex", alignItems: "center", minHeight: "80vh" }}>
            <Box width="100%">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/about" element={<About />} />
                <Route path="/movie/:id" element={<ProtectedRoute><MovieDetail /></ProtectedRoute>} /> 
                <Route path="/booking/:id" element={<ProtectedRoute><Booking /></ProtectedRoute>} />

                <Route path="/" element={<Navigate to="/login" />} />
                

              </Routes>
            </Box>
          </Container>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
