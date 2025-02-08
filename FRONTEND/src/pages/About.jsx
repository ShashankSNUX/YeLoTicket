import { Container, Typography, Box, Paper } from "@mui/material"
import { motion } from "framer-motion"

const About = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Paper elevation={3} sx={{ p: 4, bgcolor: "background.paper", borderRadius: 2 }}>
          <Typography variant="h4" color="primary" gutterBottom>
            About YeloTicket
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" color="text.secondary">
              YeloTicket is a cutting-edge theatre ticket booking platform designed to make your entertainment
              experience seamless and enjoyable. Our user-friendly interface allows you to browse, select, and purchase
              tickets for a wide variety of theatrical performances, from Broadway shows to local productions.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
              With YeloTicket, you can:
            </Typography>
            <ul>
              <Typography component="li" color="text.secondary">
                Browse upcoming shows and events
              </Typography>
              <Typography component="li" color="text.secondary">
                Select your preferred seats with our interactive seating charts
              </Typography>
              <Typography component="li" color="text.secondary">
                Secure your tickets with our safe and efficient payment system
              </Typography>
              <Typography component="li" color="text.secondary">
                Receive instant e-tickets for a paperless experience
              </Typography>
            </ul>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
              Join us in revolutionizing the way you experience theatre. YeloTicket - Your gateway to unforgettable
              performances!
            </Typography>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  )
}

export default About

