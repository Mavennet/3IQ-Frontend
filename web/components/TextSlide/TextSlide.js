import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box'
import Slide from '@mui/material/Slide'
import {Typography} from '@mui/material'
import PropTypes from 'prop-types'

export default function TextSlide(props) {
  const {text, items} = props
  const [count, setCount] = useState(0)
  const containerRef = React.useRef(null)

  const handleChange = () => {
    count === items.length - 1 ? setCount(0) : setCount((count + 1))
  }

  const infiniteSliding = () => {
    setTimeout(() => handleChange(), 3000)
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    infiniteSliding()
  }, [count])

  return (
    <Box
      sx={{
        py: 2,
        px: 1,
        width: '100%',
        display: {md: 'flex', sm: 'block'},
        pl: {xs: '5%', md: '10%'},
        overflow: 'hidden',
      }}
      ref={containerRef}
    >
      {text && (
        <Typography component="h1" variant="h3" sx={{fontWeight: 'bold'}}>
          {text}
        </Typography>
      )}
      <Box>
        {items.map((item, index) => (
          <Box key={`item_${index}`}>
            <Box sx={{display: {xs: 'none', md: 'flex'}}}>
              <Slide
                sx={{
                  display: count !== index && 'none',
                  fontWeight: 'bold',
                  color: '#dc6e19',
                  ml: 2,
                }}
                direction="down"
                in={count === index}
              >
                <Typography component="h1" variant="h3">
                  {item}
                </Typography>
              </Slide>
            </Box>
            <Box sx={{display: {xs: 'flex', md: 'none'}}}>
              <Slide
                sx={{
                  display: count !== index && 'none',
                  fontWeight: 'bold',
                  color: '#dc6e19',
                }}
                direction="right"
                in={count === index}
              >
                <Typography component="h1" variant="h3">
                  {item}
                </Typography>
              </Slide>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

TextSlide.propTypes = {
  text: PropTypes.string,
  items: PropTypes.array,
}
