import React from 'react'
import {
  Link,
  Box,
  Menu,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'
import {getPathFromSlug} from '../../../../utils/urls'
import styles from './styles.module.scss'
import {BiChevronDown} from 'react-icons/bi'
import PropTypes from 'prop-types'

function NavItemDropdown(props) {
  const {title, _id, submenuRoutes, link, language, isLinkEnabled} = props
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
      <Box sx={{display: {xs: 'flex', sm: 'flex', md: 'flex', lg: 'none'}}}>
        <li>
          <Accordion style={{boxShadow: 'none'}}>
            <AccordionSummary
              className={styles.sumary}
              expandIcon={<BiChevronDown />}
              aria-controls="panel1a-content"
              classes={{content: styles.content, expanded: styles.expansionPanel}}
              sx={{
                backgroundColor: '#F9F9F9',
              }}
            >
              <Link href={isLinkEnabled && getPathFromSlug(link)} sx={{textDecoration: 'none'}}>
                <Box
                  className={styles.sumaryText}
                  sx={{
                    width: {xs: '100%', lg: 'auto'},
                    marginLeft: {xs: '0', lg: '30px'},
                    textTransform: 'capitalize',
                    position: 'relative',
                  }}
                >
                  {title || 'Missing'}
                </Box>
              </Link>
            </AccordionSummary>
            <AccordionDetails sx={{p: 0}}>
              <ul className={styles.sumary__subitem}>
                {submenuRoutes.map((item) => {
                  return (
                    <MenuItem key={item._id} className={styles.menuItem}>
                      <Link
                        href={getPathFromSlug(item?.slug?.current)}
                        key={item._id}
                        sx={{textDecoration: 'none', pl: 5}}
                      >
                        <Box className={styles.sumary__subitem__text}>
                          {item.localeTitle[language] || 'Missing'}
                        </Box>
                      </Link>
                    </MenuItem>
                  )
                })}
              </ul>
            </AccordionDetails>
          </Accordion>
        </li>
      </Box>
      {/* Desktop */}
      <Box sx={{display: {xs: 'none', sm: 'none', md: 'none', lg: 'flex'}}}>
        <Link href={isLinkEnabled && getPathFromSlug(link)} sx={{textDecoration: 'none'}}>
          <Box
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
              textTransform: language.startsWith('en') ? 'capitalize' : 'none',
              position: 'relative',
            }}
            className={styles.menuItem}
          >
            {title || 'Missing'}
            <span className={styles.subArrow} onMouseOver={handleOpen}>
              <BiChevronDown />
            </span>
          </Box>
        </Link>
        <Menu
          id={_id + '-menu'}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
          transformOrigin={{vertical: 'top', horizontal: 'right'}}
          MenuListProps={{
            'aria-labelledby': _id + '-button',
            onMouseLeave: handleClose,
          }}
          className={styles.subMenu}
        >
          {submenuRoutes.map((item) => {
            return (
              <MenuItem onClick={handleClose} key={item._id}>
                <Link
                  href={getPathFromSlug(item?.slug?.current)}
                  key={item._id}
                  sx={{textDecoration: 'none'}}
                >
                  <Box sx={{whiteSpace: 'pre-line'}}>{item.localeTitle[language] || 'Missing'}</Box>
                </Link>
              </MenuItem>
            )
          })}
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
      localeTitle: PropTypes.shape({}),
    })
  ),
}

export default NavItemDropdown
