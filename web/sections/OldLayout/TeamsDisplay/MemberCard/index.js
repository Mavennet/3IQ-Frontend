import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography, Link } from '@mui/material'
import styles from'./styles.module.scss'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../../client'
import { FaLinkedinIn } from 'react-icons/fa'
import Image from 'next/image'

function MemberCard(props) {
  const { name, image, role, linkedin, showProfileBox, email, contactText, readProfileText } = props

  function urlFor(source) {
    return imageUrlBuilder(client).image(source)
  }

  return (
    <div className={styles.memberCard}>
      {
        !showProfileBox && email && (
          <Link
            href={`mailto:${email}`}
            color="inherit"
            target='_blank'
            rel="noopener"
            underline={'none'}
            className={styles.link}
          />
        )
      }
      <div className={styles.imgGrid}>
        {
          image && (
            <Image
              src={urlFor(image).url()}
              alt={name}
              layout='fill'
              objectFit='cover'
            />
          )
        }
      </div>
      <Box
        sx={{
          width: '100%'
        }}
      >
        <Typography
          variant="h2"
          p={2}
          sx={{
            fontFamily: 'Europa',
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
          p={1}
          pb={8}
          sx={{
            textAlign: 'center',
            fontFamily: 'Europa',
            color: '#0082E5',
            fontSize: '18px',
            fontWeight: '700',
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
              p={1}
              sx={{
                fontFamily: 'Europa',
                textAlign: 'center',
                color: '#fff',
                backgroundColor: '#0082E5',
                fontSize: '20px',
                position: 'absolute',
                bottom: '10px',
                width: '100%',
                fontWeight: '500',
              }}
            >
              {readProfileText !== null ? readProfileText : 'Missing - Read Profile Text'}
            </Typography>
          )
        }
        {
          !showProfileBox && email && (
            <Typography
              variant="h2"
              p={1}
              sx={{
                fontFamily: 'Europa',
                textAlign: 'center',
                color: '#fff',
                backgroundColor: '#0082E5',
                fontSize: '20px',
                position: 'absolute',
                bottom: '10px',
                width: '100%',
                fontWeight: '500',
              }}
            >
              {contactText !== null ? contactText : 'Missing - Contact Text'}
            </Typography>
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
