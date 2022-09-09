import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography, Link } from '@mui/material'
import styles from './MemberCard.module.css'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../../client'
import { FaLinkedinIn } from 'react-icons/fa'

function MemberCard(props) {
  const { name, image, role, linkedin, showProfileBox, email, contactText, readProfileText } = props

  function urlFor(source) {
    return imageUrlBuilder(client).image(source)
  }

  return (
    <div className={styles.memberCard}>
      <Box
        component="img"
        width={300}
        height={300}
        sx={{
          width: '100%',
          maxHeight: '100%',
          objectFit: 'cover',
          objectPosition: 'center'
        }}
        alt={name}
        src={urlFor(image).url()}
      />
      <Box
        sx={{
          width: '100%'
        }}
      >
        <Typography
          variant="h2"
          p={2}
          sx={{
            textAlign: 'center',
            color: '#fff',
            fontSize: '22px'
          }}
        >
          <strong>{name}</strong>
        </Typography>
        <Typography
          variant="h2"
          mb={2}
          p={2}
          sx={{
            textAlign: 'center',
            color: '#0082E5',
            fontSize: '16px',
            minHeight: '80px'
          }}
        >
          {role}
        </Typography>
        {
          linkedin && (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <div className={styles.linkedin}>
                <Link href={linkedin} color="inherit" target='_blank' rel="noopener"><FaLinkedinIn size={20} /></Link>
              </div>
            </Box>
          )
        }
        {
          showProfileBox && (
            <Typography
              variant="h2"
              mb={2}
              p={1}
              sx={{
                textAlign: 'center',
                color: '#fff',
                backgroundColor: '#0082E5',
                fontSize: '16px'
              }}
            >
              {readProfileText !== null ? readProfileText : 'Missing - Read Profile Text'}
            </Typography>
          )
        }
        {
          !showProfileBox && email && (
            <Link href={`mailto:${email}`} color="inherit" target='_blank' rel="noopener" underline={'none'}>
              <Typography
                variant="h2"
                mb={2}
                p={1}
                sx={{
                  textAlign: 'center',
                  color: '#fff',
                  backgroundColor: '#0082E5',
                  fontSize: '16px'
                }}
              >
                {contactText !== null ? contactText : 'Missing - Contact Text'}
              </Typography>
            </Link>
          )
        }
      </Box>
    </div>
  )
}

MemberCard.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  role: PropTypes.string,
  linkedin: PropTypes.string,
  showProfileBox: PropTypes.bool,
  email: PropTypes.string,
  contactText: PropTypes.string,
  readProfileText: PropTypes.string
}

export default MemberCard
