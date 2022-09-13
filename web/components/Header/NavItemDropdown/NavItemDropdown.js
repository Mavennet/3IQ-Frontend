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
  const { title, _id, submenuRoutes, link, language, isLinkEnabled } = props
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
              sx={{
                backgroundColor: '#fbfbfb',
              }}
            >
              <Link href={isLinkEnabled && link} sx={{textDecoration: 'none'}}>
                <Typography
                  className={styles.sumaryText}
                  sx={{
                    width: {xs: '100%', md: 'auto'},
                    marginLeft: {xs: '0', md: '30px'},
                    color: '#000',
                    textTransform: 'capitalize',
                    fontSize: '18px',
                    position: 'relative'
                  }}
                >{title || 'Missing'}</Typography>
              </Link>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              <ul>
                {
                  submenuRoutes.map((item) => {
                    return (
                      <MenuItem key={item._id} className={styles.menuItem}>
                        <Link href={getPathFromSlug(item?.slug?.current)} key={item._id} sx={{textDecoration: 'none'}}>
                          <Typography className={styles.sumaryText} sx={{fontSize: '18px'}}>
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
        <Link href={isLinkEnabled && link} sx={{textDecoration: 'none'}}>
          <Typography
            id={_id + '-button'}
            aria-controls={open ? _id + '-menu' : undefined}
            aria-haspopup="false"
            aria-expanded={open ? 'true' : undefined}
            sx={{
              display: 'block',
              width: {xs: '100%', md: 'auto'},
              marginLeft: {xs: '0', md: '30px'},
              padding: {xs: '12px 16px', md: '0px'},
              color: '#0a1b3f',
              textTransform: 'capitalize',
              fontSize: '18px',
              position: 'relative'
            }}
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
                <MenuItem onClick={handleClose} key={item._id} style={{ backgroundColor: 'transparent', fontSize: '18px' }}>
                  <Link href={getPathFromSlug(item?.slug?.current)} key={item._id} sx={{textDecoration: 'none'}}>
                    <Typography sx={{whiteSpace: 'pre-line',textAlign: 'center'}}>{item.localeTitle[language] || 'Missing'}</Typography>
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
  isLinkEnabled: PropTypes.bool,
  submenuRoutes: PropTypes.arrayOf(
    PropTypes.shape({
      localeTitle: PropTypes.shape({
      })
    })
  ),
}

export default NavItemDropdown
