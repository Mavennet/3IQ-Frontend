import React from 'react'
import {
  Link,
  Typography,
  Menu,
  MenuItem,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material'
import { getPathFromSlug } from '../../../utils/urls'
import styles from './NavItemDropdown.module.css'
import { FaCaretDown } from 'react-icons/fa'
import PropTypes from 'prop-types'

function NavItemDropdown(props) {
  const { title, _id, submenuRoutes, link, language } = props
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      {/* Mobile */}
      <Box sx={{ display: { xs: 'flex', sm: 'flex', md: 'none' } }}>
        <li>
          <Accordion style={{ boxShadow: "none" }}>

            <AccordionSummary
              expandIcon={<FaCaretDown />}
              aria-controls="panel1a-content"
              className={styles.accordion}
              classes={{ content: styles.content, expanded: styles.expansionPanel }}
            >
              <Link href={link}>
                <Typography className={styles.menuItem}>{title || 'Missing'}</Typography>
              </Link>
            </AccordionSummary>
            <AccordionDetails>
              <ul>
                {
                  submenuRoutes.map((item) => {
                    return (
                      <MenuItem key={item._id}>
                        <Link href={getPathFromSlug(item?.slug?.current)} key={item._id}>
                          <Typography className={styles.menuItem}>
                            {item.localeTitle[language] || 'Missing'}
                          </Typography>
                        </Link>
                      </MenuItem>
                    )
                  })
                }
              </ul>
            </AccordionDetails>
          </Accordion>
        </li>
      </Box>
      {/* Desktop */}
      <Box sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}>
        <Link href={link}>
          <Typography
            id={_id + '-button'}
            className={styles.menuItem}
            aria-controls={open ? _id + '-menu' : undefined}
            aria-haspopup="false"
            aria-expanded={open ? 'true' : undefined}
            sx={{ color: '#0a1b3f', display: 'block' }}
          >
            {title || 'Missing'}
            <span className={styles.subArrow} onMouseOver={handleOpen}>
              <FaCaretDown />
            </span>
          </Typography>
        </Link>
        <Menu
          id={_id + '-menu'}
          className={styles.subMenu}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
          MenuListProps={{
            'aria-labelledby': _id + '-button',
            onMouseLeave: handleClose
          }}
        >
          {
            submenuRoutes.map((item) => {
              return (
                <MenuItem onClick={handleClose} key={item._id}>
                  <Link href={getPathFromSlug(item?.slug?.current)} key={item._id}>
                    <Typography>{item.localeTitle[language] || 'Missing'}</Typography>
                  </Link>
                </MenuItem>
              )
            })
          }
        </Menu>
      </Box>
    </>
  )
}

NavItemDropdown.propTypes = {
  title: PropTypes.string,
  _id: PropTypes.string,
  language: PropTypes.string,
  link: PropTypes.string,
  submenuRoutes: PropTypes.arrayOf(
    PropTypes.shape({
      localeTitle: PropTypes.shape({
      })
    })
  ),
}

export default NavItemDropdown
