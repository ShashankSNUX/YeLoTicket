"use client"

import { useContext } from "react"
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { motion } from "framer-motion"

const Navbar = () => {
  const { token, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  return (
    <AppBar position="static" sx={{ bgcolor: "background.paper", boxShadow: 3 }}>
      <Toolbar sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Typography variant="h6">
            <Link to="/" style={{ textDecoration: "none", color: "primary.main", fontWeight: "bold" }}>
              YeloTicket
            </Link>
          </Typography>
        </motion.div>

        <Box>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          {!token ? (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/dashboard">
                Dashboard
              </Button>
              <Button
                color="inherit"
                onClick={() => {
                  logout()
                  navigate("/login")
                }}
              >
                Logout
              </Button>
            </>
          )}
          <Button color="inherit" component={Link} to="/about">
            About
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar

