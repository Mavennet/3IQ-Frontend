import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import {Container, Grid, Box, Tabs, Tab, Typography} from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'

const theme = createTheme({
  typography: {
    fontFamily: 'Europa',
    p: {
      fontSize: 14,
    },
    h2: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    h5: {
      fontSize: 20,
      fontWeight: 'bold',
    },
  },
})

function handleTab(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const tabGridSx = {
  background: '#e8e8ea',
  height: '200px',
}

const gridMainHeaderSx = {
  display: {
    md: 'block',
    xs: 'none',
  },
  textAlign: 'center',
  mt: 4,
  mb: 4,
}

const gridGeneratedHeaderSx = {
  textAlign: 'center',
  mt: 4,
  mb: 4,
  display: {
    md: 'none',
    xs: 'block',
  },
}

function FundsContent(props) {
  const {currentCountry, currentLanguage, fundItems} = props // ajustar props para pegar as consts necessárias

  console.log(props)
  const [value, setValue] = useState(0)
  const mediumViewport = useMediaQuery('(min-width:1024px)')
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const theme = createTheme({
    typography: {
      fontFamily: 'Europa',
    },
    components: {
      MuiTab: {
        styleOverrides: {
          root: {
            padding: '15px 40px',
            fontFamily: 'Europa',
            fontSize: '20px',
            background: '#DC6E19',
            color: '#fff',
            textTransform: 'capitalize',
            '&.Mui-selected': {
              border: 'none',
              color: '#fff!important',
              textDecoration: 'underline!important',
              textUnderlineOffset: '10px!important',
              fontWeight: '900',
            },
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: `
      .MuiButtonBase-root.MuiPaginationItem-root {
          color: #dc6e19;
      }
      .MuiButtonBase-root.MuiPaginationItem-root:hover {
          color: #fff;
      }
      .MuiButtonBase-root.Mui-selected.MuiPaginationItem-root {
          color: #fff;
      }
      .MuiButtonBase-root.Mui-disabled.MuiPaginationItem-root {
          display: none;
      }
      
      `,
      },
    },
  })

  let fundTypes = []

  fundItems.map((fundItem) => {
    const localeName = fundItem.localeName[currentLanguage.languageTag]
    if (localeName) {
      !(fundTypes.indexOf(localeName) >= 0) && fundTypes.push(localeName)
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth={'lg'}>
        <Grid item xs={12}>
          <Box sx={{mt: -2, mb: 4, display: 'flex', justifyContent: 'center'}}>
            <Tabs
              orientation={mediumViewport ? 'horizontal' : 'vertical'}
              value={value}
              onChange={handleChange}
              // aria-label={`${heading} - Tab`}
              TabIndicatorProps={{style: {display: 'none'}}}
            >
              {fundTypes &&
                fundTypes.map((item, i) => {
                  return (
                         <Tab
                      key={`fundType_${i}`}
                      wrapped
                      href={`#section_${i}`}
                      label={item || 'Missing Tab Label'}
                      {...handleTab(i)}
                    >
                    </Tab>
                  )
                })}
            </Tabs>
          </Box>
        </Grid>

        {fundItems &&
          fundItems.map((fundItem, index) => (
            <Grid container mt={10} id={`section_${index}`}>
              <Grid item sx={{borderBottom: '5px solid #0082e5', color: '#0082e5'}} xs={12}>
                <Typography component="h2" variant="h4" sx={{fontWeight: 'bold'}}>
                  {fundItem.localeName[currentLanguage.languageTag]}
                </Typography>
              </Grid>
              <Grid item container alignItems="stretch" spacing={2} xs={12}>
                <Grid item sx={gridMainHeaderSx} sm={false} md={3}>
                  <Typography component="h3" variant="h6" sx={{fontWeight: 'bold'}}>
                    Product
                  </Typography>
                </Grid>
                <Grid item sx={gridMainHeaderSx} sm={false} md={2}>
                  <Typography component="h3" variant="h6" sx={{fontWeight: 'bold'}}>
                    Ticker
                  </Typography>
                </Grid>
                <Grid item sx={gridMainHeaderSx} sm={false} md={5}>
                  <Typography component="h3" variant="h6" sx={{fontWeight: 'bold'}}>
                    Highlights
                  </Typography>
                </Grid>
                <Grid item sx={gridMainHeaderSx} sm={false} md={2}></Grid>
              </Grid>
              {fundItem.products &&
                fundItem.products.map((product, index) => (
                  <Grid container item alignItems="stretch" spacing={2} >
                    <Grid item container sm={12} md={3}>
                      <Grid item sx={gridGeneratedHeaderSx} xs={12}>
                        <Typography component="h3" variant="h6" sx={{fontWeight: 'bold'}}>
                          Product
                        </Typography>
                      </Grid>
                      <Grid sx={tabGridSx} container></Grid>
                    </Grid>
                    <Grid item container sm={12} md={2}>
                      <Grid item sx={gridGeneratedHeaderSx} xs={12}>
                        <Typography component="h3" variant="h6" sx={{fontWeight: 'bold'}}>
                          Ticker
                        </Typography>
                      </Grid>
                      <Grid sx={tabGridSx} container></Grid>
                    </Grid>
                    <Grid item container sm={12} md={5}>
                      <Grid item sx={gridGeneratedHeaderSx} xs={12}>
                        <Typography component="h3" variant="h6" sx={{fontWeight: 'bold'}}>
                          Highlights
                        </Typography>
                      </Grid>
                      <Grid sx={tabGridSx} container></Grid>
                    </Grid>
                    <Grid item container sm={12} md={2}>
                      <Grid sx={tabGridSx} container></Grid>
                    </Grid>
                  </Grid>
                ))}
            </Grid>
          ))}
      </Container>
    </ThemeProvider>
  )
}

FundsContent.propTypes = {
  currentCountry: PropTypes.object,
  currentLanguage: PropTypes.object,
  fundItems: PropTypes.fundItems,
}

export default FundsContent
