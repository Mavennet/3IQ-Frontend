import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BigButton from "../BigButton/BigButton";

const theme = createTheme();

export default function HomeMainContent() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Box
          sx={{
            background: `url('/assets/3iq-bg.png') no-repeat center center`,
            backgroundSize: "cover",
            bgcolor: "#091b3f",
            pt: 2,
            pb: 2
          }}
        >
          <Container maxWidth="md">
            <Box sx={{ p: 5 }}>
              <Box
                component="img"
                sx={{
                  maxWidth: { md: 400, xs: 300 }
                }}
                alt="The house from the offer."
                src={'/assets/3iq-tagline-hero.png'}
              />
              <Box sx={{ pt: 5, pr: { md: 30, sm: 10 },  color: "#fff", align: 'left' }}>
                <Typography
                  component="h1"
                  variant="h5"
                  style={{ fontWeight: "bold" }}
                  gutterBottom
                >
                  That's the 3iQ difference.
                </Typography>
                <Typography variant="p" paragraph>
                  We help investors navigate and understand the evolving digital asset space with
                  investment solutions that provide exposure to cryptocurrencies.
                </Typography>
              </Box>

              <BigButton sx={{ mt: 4, width: { xs: "100%", md: "auto" }, padding: '15px 60px' }}></BigButton>
            </Box>
          </Container>
        </Box>
    </ThemeProvider>
  );
}
