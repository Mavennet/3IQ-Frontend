import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography, Link } from '@mui/material'
import styles from './styles.module.scss'
import imageUrlBuilder from '@sanity/image-url'
import client from '../../../../client'
import Image from 'next/image'
import { RiLinkedinLine } from 'react-icons/ri'
import { BsArrowRightShort } from 'react-icons/bs'

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
        {
          linkedin && (
            <Link href={linkedin} color="inherit" target='_blank' rel="noopener" className={styles.link}>
              <Box
                sx={{
                  padding: '2px 20px',
                  border: '1px solid var(--light-blue)',
                  color: 'var(--light-blue)',
                  borderRadius: '34px',
                  display: 'flex',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  alignItems: 'center',
                  fontFamily: 'var(--font-family-secondary)',
                  fontSize: 'var(--font-size-secondary-sm)',
                  fontWeight: 'var(--font-weight-regular)',
                  gap: 1
                }}
              >
                <RiLinkedinLine />
                <div>{contactText && contactText}</div>
              </Box>
            </Link>
          )
        }
        {
          email && (
            <Link href={email} color="inherit" target='_blank' rel="noopener" className={styles.link}>
              <Box
                sx={{
                  color: 'var(--light-blue)',
                  borderRadius: '34px',
                  display: 'flex',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  alignItems: 'center',
                  fontFamily: 'var(--font-family-secondary)',
                  fontSize: 'var(--font-size-secondary-sm)',
                  fontWeight: '600',
                  gap: 1
                }}
              >
                <div>{contactText && contactText}</div>
                <BsArrowRightShort size={27} />
              </Box>
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
