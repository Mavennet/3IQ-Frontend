import React from 'react'
import PropTypes from 'prop-types'
import TabsLayout from './TabsLayout/TabsLayout'
import AccordionLayout from './AccordionLayout/AccordionLayout'
function TabsContent(props) {
  const {isAccordionLayout} = props

  if (isAccordionLayout) {
    return <AccordionLayout {...props} />
  } else {
    return <TabsLayout {...props} />
  }
}

TabsContent.propTypes = {
  isAccordionLayout: PropTypes.bool,
}

export default TabsContent
