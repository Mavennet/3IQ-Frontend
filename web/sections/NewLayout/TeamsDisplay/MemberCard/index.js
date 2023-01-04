import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography, Link } from '@mui/material'
import styles from './styles.module.scss'
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
          variant="h3"
          my={2}
          sx={{
            fontFamily: 'var(--font-family-secondary)',
            color: 'var(--black)',
            fontSize: 'var(--font-size-secondary-lg)',
            fontWeight: 'var(--font-weight-regular)',
          }}
        >
          {name}
        </Typography>
        <Typography
          variant="h4"
          mb={2}
          sx={{
            fontFamily: 'var(--font-family-secondary)',
            color: 'var(--black)',
            fontSize: 'var(--font-size-secondary-sm)',
            fontWeight: 'var(--font-weight-regular)',
          }}
        >
          {role}
        </Typography>
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
