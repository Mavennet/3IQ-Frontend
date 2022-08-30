import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import * as SectionComponents from './sections'
import capitalizeString from '../utils/capitalizeString'

function resolveSections(section) {
  // eslint-disable-next-line import/namespace
  const Section = SectionComponents[capitalizeString(section._type)]

  if (Section) {
    return Section
  }

  console.error('Cant find section', section) // eslint-disable-line no-console
  return null
}

function RenderSections(props) {
  const {sections, routes} = props

  for(const section of sections){
    const {button, currentLanguage} = section
    if(button && currentLanguage){
      const localeButton = button[currentLanguage.languageTag]
      if(localeButton && localeButton.route){
        const formatedRoute = routes.filter(r => r._id === localeButton.route._ref)[0]
        localeButton.route = formatedRoute 
      }
      section.button = localeButton
    }
  }

  if (!sections) {
    console.error('Missing section')
    return <div>Missing sections</div>
  }

  return (
    <Fragment>
      {sections.map((section) => {
        const SectionComponent = resolveSections(section)
        if (!SectionComponent) {
          return <div>Missing section {section._type}</div>
        }
        return <SectionComponent {...section} key={section._key} />
      })}
    </Fragment>
  )
}

RenderSections.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      _type: PropTypes.string,
      _key: PropTypes.string,
      section: PropTypes.instanceOf(PropTypes.object),
    })
  ),
  routes: PropTypes.object
}

export default RenderSections
