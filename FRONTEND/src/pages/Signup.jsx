"use client"

import { useState } from "react"
import { Card, CardContent, TextField, Button, Typography, Link, Alert, Box } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { motion } from "framer-motion"

const Signup = () => {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ username: "", email: "", password: "" })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await signup(formData.username, formData.email, formData.password)
      setSuccess("Signup successful! Redirecting to login...")
      setError("")
      setTimeout(() => navigate("/login"), 1500)
    } catch (err) {
      setError("Signup failed. Try again.")
      setSuccess("")
    }
  }

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(45deg, #121212 30%, #2C2C2C 90%)",
      }}
    >
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card sx={{ width: 400, padding: 3, bgcolor: "background.paper" }}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 2, textAlign: "center", color: "primary.main" }}>
              Signup
            </Typography>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {success}
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                variant="outlined"
                margin="normal"
                onChange={handleChange}
                required
                InputProps={{ style: { color: "text.primary" } }}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                margin="normal"
                onChange={handleChange}
                required
                InputProps={{ style: { color: "text.primary" } }}
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                margin="normal"
                onChange={handleChange}
                required
                InputProps={{ style: { color: "text.primary" } }}
              />
              <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }} type="submit">
                Signup
              </Button>
            </form>
            <Typography sx={{ mt: 2, textAlign: "center", color: "text.secondary" }}>
              Already have an account?{" "}
              <Link href="/login" color="primary">
                Login
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  )
}

export default Signup

