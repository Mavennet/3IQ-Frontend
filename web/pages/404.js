import { Container, Grid, Box, Typography } from '@mui/material'
import Logo from '../components/NewLayout/Logo'
import Link from 'next/link'
import image from '../assets/img/404.png'

export default function Custom404(props) {

  const { config, currentLanguage } = props

  return (
    <Box sx={{
      background: 'transparent radial-gradient(closest-side at 50% 50%, #0A2955 0%, #082146 100%) 0% 0% no-repeat padding-box',
      minHeight: '100vh',
    }}>
      <Container sx={{ maxWidth: { sm: 'md', lg: 'lg' } }}>
        <Grid container>
          <Grid item xs={12}>
            <Logo
              logo={
                config.currentCountry.footerLogo[currentLanguage.languageTag] && config.currentCountry.footerLogo[currentLanguage.languageTag]
              }
            />
          </Grid>
        </Grid>
        <Grid container py={6} spacing={{ xs: 0, md: 3 }} sx={{ display: 'flex', alignItems: 'center' }}>
          <Grid item xs={12} md={7}>
            <Typography
              variant="h1"
              sx={{
                fontWeight: '300',
                textAlign: { xs: 'center', md: 'left' },
                color: 'var(--white)',
                fontSize: { xs: '129px', md: '229px', lg: '329px' },
                fontFamily: 'var(--font-family-primary)',
              }}
            >
              404
            </Typography>
          </Grid>
          <Grid item xs={12} md={5}>
            <Grid container>
              <Grid item xs={12} sx={{display: 'flex', justifyContent: {xs: 'center', md: 'flex-start'}}}>
                <Typography
                  variant="p"
                  sx={{
                    width: '100%',
                    textAlign: { xs: 'center', md: 'left' },
                    fontWeight: '300',
                    color: 'var(--white)',
                    fontSize: { xs: '30px', md: '42px' },
                    fontFamily: 'var(--font-family-secondary)',
                  }}
                >
                  Oops, page not Found!
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{display: 'flex', justifyContent: {xs: 'center', md: 'flex-start'}}}>
              <Box sx={{
                width: '200px',
                textAlign: 'center',
                padding: '10px 25px',
                color: 'var(--white)',
                mt: 2,
                fontFamily: 'var(--font-family-secondary)',
                border: '2px solid var(--white)',
                '& a': {
                  color: 'var(--white)',
                },
              }}>
                <Link
                  href={{
                    pathname: '/LandingPage',
                    query: { slug: '/' },
                  }}
                  as={`/`}
                >
                  <a>
                    Back to home
                  </a>
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Box
          component="img"
          alt={'background 404'}
          src={image.src}
          sx={{
            maxWidth: '100%'
          }}
        />
      </Box>
    </Box>
  )
}
