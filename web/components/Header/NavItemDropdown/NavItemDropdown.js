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
              className={styles.sumary}
              expandIcon={<FaCaretDown />}
              aria-controls="panel1a-content"
              classes={{ content: styles.content, expanded: styles.expansionPanel }}
            >
              <Link href={link}>
                <Typography className={styles.sumaryText}>{title || 'Missing'}</Typography>
              </Link>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              <ul>
                {
                  submenuRoutes.map((item) => {
                    return (
                      <MenuItem key={item._id} className={styles.menuItem}>
                        <Link href={getPathFromSlug(item?.slug?.current)} key={item._id}>
                          <Typography className={styles.sumaryText}>
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
            aria-controls={open ? _id + '-menu' : undefined}
            aria-haspopup="false"
            aria-expanded={open ? 'true' : undefined}
            sx={{ color: '#0a1b3f', display: 'block' }}
            className={styles.menuItem}
          >
            {title || 'Missing'}
            <span className={styles.subArrow} onMouseOver={handleOpen}>
              <FaCaretDown />
            </span>
          </Typography>
        </Link>
        <Menu
          id={_id + '-menu'}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          MenuListProps={{
            'aria-labelledby': _id + '-button',
            onMouseLeave: handleClose
          }}
          className={styles.subMenu}
        >
          {
            submenuRoutes.map((item) => {
              return (
                <MenuItem onClick={handleClose} key={item._id} style={{ backgroundColor: 'transparent' }}>
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
