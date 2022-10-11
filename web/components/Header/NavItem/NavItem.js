import React from "react"
import { Typography, Link } from "@mui/material"
import { getPathFromSlug } from '../../../utils/urls'
import styles from './NavItem.module.css'
import PropTypes from 'prop-types'

function NavItem(props) {
  const { route, title, _id, isLinkEnabled } = props
  return (
    <Link
      key={_id}
      href={isLinkEnabled && getPathFromSlug(route?.slug?.current)}
      sx={{textDecoration: 'none'}}
    >
      <Typography
        className={styles.menuItem}
        sx={{
          width: {xs: '100%', lg: 'auto'},
          marginLeft: {xs: '0', lg: '30px'},
          padding: {xs: '12px 16px', lg: '0px'},
          backgroundColor: {xs: '#fbfbfb', lg: 'transparent'},
          color: '#000',
          textTransform: 'capitalize',
          fontSize: '18px',
          position: 'relative'
        }}
      >{title || 'Missing'}</Typography>
    </Link>
  )
}

NavItem.propTypes = {
  title: PropTypes.string,
  _id: PropTypes.string,
  isLinkEnabled: PropTypes.bool,
  route: PropTypes.shape({
    slug: PropTypes.shape({
      current: PropTypes.string,
      _type: PropTypes.string
    }),
  })
}

export default NavItem
