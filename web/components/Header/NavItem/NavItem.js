import React from "react"
import { Typography, Link } from "@mui/material"
import { getPathFromSlug } from '../../../utils/urls'
import styles from './NavItem.module.css'
import PropTypes from 'prop-types'

function NavItem(props) {
  const { route, title, _id } = props
  return (
    <Link
      key={_id}
      href={getPathFromSlug(route?.slug?.current)}
      sx={{textDecoration: 'none'}}
    >
      <Typography className={styles.menuItem}>{title || 'Missing'}</Typography>
    </Link>
  )
}

NavItem.propTypes = {
  title: PropTypes.string,
  _id: PropTypes.string,
  route: PropTypes.shape({
    slug: PropTypes.shape({
      current: PropTypes.string,
      _type: PropTypes.string
    }),
  })
}

export default NavItem
