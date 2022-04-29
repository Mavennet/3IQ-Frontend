import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BigButtonReverse from '../BigButtonReverse/BigButtonReverse';

const theme = createTheme();

export default function ImageBesideText() {

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '90vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={5}

          sx={{
            backgroundImage: 'url(https://source.unspl/ash.com/random)',
            backgroundRepeat: 'no-repeat',
            bgcolor: "#091b3f",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            component="img"
            sx={{
              transform: { sm: 'scale(1)', md: 'scale(1.9)' },
              display: { xs: 'none', sm: 'inherit' }
            }}
            alt="The house from the offer."
            src={'/assets/stablecorp-logo.svg'}

          />
        </Grid>
        <Grid item xs={12} sm={8} md={7} elevation={6} square>
          <Box
            sx={{
              mt: 15,
              ml: { xs: 2, md: 10 },
              mr: { xs: 2, md: 15 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'left',
              color: '#091b3f'
            }}
          >

            <Typography
              component="h1"
              variant="h4"
              style={{ fontWeight: "bold" }}
              gutterBottom
            >
              Stablecorp Closes Pre-Series A Funding Round Including Major Cryptocurrency Industry Leaders
            </Typography>
            <Typography variant="p" paragraph>
              3iQ Digital Asset Management is proud to be a founding partner in Stablecorp.  This recent raise in funding, driven by leaders in the cryptocurrency industry such as Circle Ventures, Genesis and the Stellar Development Foundation is a great tip of the hat to the advancements Stablecorp is making in bridging traditional financial systems with innovations in ‘on-chain’ frameworks of the future.  At 3iQ, we are committed to innovating in digital asset investments and partnering strategically with firms like Stablecorp who share a similar vision.  We look forward to more announcements to come as we expand our partnership.
            </Typography>

            <Box sx={{
              mt: 5
            }}>
              <Typography variant="p" paragraph>
                April 25, 2022
              </Typography>
              <BigButtonReverse sx={{ width: { xs: "100%", md: 180 }, padding: '10px 20px' }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}