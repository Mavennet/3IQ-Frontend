import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function ImageBesideText() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

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
                    transform: 'scale(1.9)'
                }}
                alt="The house from the offer."
                src={'/assets/stablecorp-logo.svg'}
                
              />
        </Grid>
        <Grid item xs={12} sm={8} md={7}  elevation={6} square>
          <Box
            sx={{
              my: 15,
              ml: 10,
              mr: 15,
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
                <Typography variant="p"  paragraph>
                3iQ Digital Asset Management is proud to be a founding partner in Stablecorp.  This recent raise in funding, driven by leaders in the cryptocurrency industry such as Circle Ventures, Genesis and the Stellar Development Foundation is a great tip of the hat to the advancements Stablecorp is making in bridging traditional financial systems with innovations in ‘on-chain’ frameworks of the future.  At 3iQ, we are committed to innovating in digital asset investments and partnering strategically with firms like Stablecorp who share a similar vision.  We look forward to more announcements to come as we expand our partnership.
                </Typography>
              
           
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}