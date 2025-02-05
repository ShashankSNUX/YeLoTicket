import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <AppBar sx={{ backgroundColor: "red" }}>
      <Toolbar sx={{ width: "100%", display: "flexbox", justifyContent: "space-between" }}>
        <Typography variant="h6">
          <Link to="/" style={{ textDecoration: "none", color: "white", fontWeight: "bold" }}>YeloTicket</Link>
        </Typography>
        
        <Box>
          <Button color="inherit" component={Link} to="/">Home</Button>
          {!token ? (
            <>
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button color="inherit" component={Link} to="/signup">Signup</Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
              <Button color="inherit" onClick={() => { logout(); navigate("/login"); }}>Logout</Button>
            </>
          )}
          <Button color="inherit" component={Link} to="/about">About</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
