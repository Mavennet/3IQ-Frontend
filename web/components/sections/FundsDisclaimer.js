import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import { Box, Container } from '@mui/material'
import SimpleBlockContent from '../SimpleBlockContent'

function FundsDisclaimer({ heading, portableText }) {
  return (
    <Box sx={{ backgroundColor: '#091B3F' }}>
      <Container sx={{ py: 6, px: 3 }}>
        <Typography
          sx={{
            fontFamily: 'Europa',
            position: 'relative',
            fontWeight: 900,
            fontSize: { xs: 26, md: 34 },
            lineHeight: 'var(--font-title2-line-height)',
            textShadow: '0 1px 1px rgba(0, 0, 0, 0.1)',
            margin: 0,
            padding: 0,
            pt: '1.5rem',
            mb: '1.5rem',
            py: { xs: 5, md: 2 },
            color: '#fff',
          }}
          align={'left'}
          gutterBottom
        >
          {heading}
        </Typography>
        <Box sx={{
          color: '#FFF',
          columns: { md: 2 },
          columnGap: { md: '10%' },
          fontWeight: 400,
          fontSize: 14,
          lineHeight: '24px',
          '& > p': { marginBlockStart: 0 }
        }}>
          <SimpleBlockContent blocks={portableText}></SimpleBlockContent>
        </Box>
      </Container>
    </Box>
  )
}

FundsDisclaimer.propTypes = {
  heading: PropTypes.object,
  portableText: PropTypes.object,
}

export default FundsDisclaimer
