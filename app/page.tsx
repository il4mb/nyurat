"use client";

import { Box, Button, Container, Typography } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <Container maxWidth="md">
      <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
        <Typography variant="h2" fontWeight="bold">
          Nyurat
        </Typography>
        <Typography variant="h6" color="textSecondary" sx={{ mt: 1 }}>
          Secure, private, and encrypted messaging.
        </Typography>
        <Box sx={{ mt: 4, display: "flex", justifyContent: "center", gap: 2 }}>
          <Button variant="contained" color="primary" size="large" LinkComponent={Link} href="/signin">
            Get Started
          </Button>
          <Button variant="outlined" color="secondary" size="large">
            Learn More
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
