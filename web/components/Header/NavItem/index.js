import React from "react"
import { Typography, Link } from "@mui/material"
import { getPathFromSlug } from '../../../utils/urls'
import styles from './NavItem.module.css'
import PropTypes from 'prop-types'

function NavItem(props) {
  const { route, name, _id } = props
  return (
    <Link
      key={_id}
      href={getPathFromSlug(route?.slug?.current)}
    >
      <Typography className={styles.menuItem}>{name || 'Missing'}</Typography>
    </Link>
  )
}

NavItem.propTypes = {
  name: PropTypes.string,
  _id: PropTypes.string,
  route: PropTypes.shape({
    slug: PropTypes.shape({
      current: PropTypes.string,
      _type: PropTypes.string
    }),
  })
}

export default NavItem
