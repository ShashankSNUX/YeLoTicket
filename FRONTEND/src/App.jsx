"use client"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider, CssBaseline, Container, Box } from "@mui/material"
import { AuthProvider } from "./context/AuthContext"
import Navbar from "./components/Navbar"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import MovieDetail from "./pages/MovieDetail"
import ProtectedRoute from "./components/ProtectedRoute"
import About from "./pages/About"
import Booking from "./pages/Booking"
import Payment from "./pages/Payment"
import Ticket from "./pages/Ticket"
import AdminPanel from "./pages/AdminPanel" // Import Admin Panel
import theme from "./components/Theme" // Import the dark theme we created earlier

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Box
            sx={{
              width: "100vw",
              minHeight: "100vh", // Allows content to expand dynamically
              background: "linear-gradient(45deg, #121212 30%, #2C2C2C 90%)",
              overflow: "auto", // Prevents content from going out of the screen
            }}
          >
            <Navbar />
            <Container
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "calc(100vh - 64px)", // Adjust based on Navbar height
                width: "100%",
                py: 4,
                overflow: "hidden", // Prevents unexpected overflow
              }}
            >
              <Box width="100%">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/about" element={<About />} />
                  <Route
                    path="/movie/:id"
                    element={
                      <ProtectedRoute>
                        <MovieDetail />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/booking/:id"
                    element={
                      <ProtectedRoute>
                        <Booking />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/payment"
                    element={
                      <ProtectedRoute>
                        <Payment />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/ticket"
                    element={
                      <ProtectedRoute>
                        <Ticket />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin-panel"
                    element={
                      <ProtectedRoute>
                        <AdminPanel />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
              </Box>
            </Container>
          </Box>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};


export default App
