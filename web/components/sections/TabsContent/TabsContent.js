import React from 'react'
import PropTypes from 'prop-types'
import TabsLayout from './TabsLayout/TabsLayout'
function TabsContent(props) {
  const {isAccordionLayout} = props

  if (isAccordionLayout) {
    return (
      null // componente do Jordan com accordion
    )
  } else {
    return (
      <TabsLayout {...props}/>
    )
  }

}

TabsContent.propTypes = {
  isAccordionLayout: PropTypes.bool,
}

export default TabsContent
