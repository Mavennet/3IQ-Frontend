import React from 'react'
import PropTypes from 'prop-types'
import AccordionLayout from './AccordionLayout'
function TabsContent(props) {
    return <AccordionLayout {...props} />
}

TabsContent.propTypes = {
  isAccordionLayout: PropTypes.bool,
}

export default TabsContent
