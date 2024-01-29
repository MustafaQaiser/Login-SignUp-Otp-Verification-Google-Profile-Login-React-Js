import { useState } from "react";
import logo from '../assets/about.png'
import { TextField, Button, Typography, Box, Card } from "@mui/material";
import { Container } from '@mui/material';

export default function About() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      //
    };
  return (
   <div style={{width:'100%'}}>
    <img src={logo} alt='yes' style={{width:'100%'}}/>
    <Container maxWidth="x-lg">
    <h2>Get To Know foodpanda</h2>
    <h2>Order food and grocery online with the foodpanda app</h2>
    <p >Even when on the move, the free foodpanda mobile application for iOS, Android and Windows Phone, allows you to order food and groceries online anytime from anywhere. Whichever food you currently desire, we have the largest selection of restaurants for you to choose from, right here on foodpanda!</p>
    <Card style={{width:'50%'}}>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      
      }}
    >
      <Box sx={{ maxWidth: 600, mx: "auto", p: 2 }}>
        <Typography variant="h4"  mb={2}>
          Contact Us
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            type="email"
          />
          <TextField
            fullWidth
            label="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            margin="normal"
            required
            multiline
            rows={4}
          />
          <Button variant="contained" type="submit" sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      </Box>
    </Box>
    </Card>
</Container>
   </div>
  );
}

