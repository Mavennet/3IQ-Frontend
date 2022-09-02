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

  sections.forEach((section) => {
    const toConvertItems = ['cta', 'localeCta']
    const sectionKeys = Object.keys(section)
    const sectionValues = Object.values(section)
    const filteredSectionKeys = []
    sectionValues.forEach((value, index) => {
      if (value._type && toConvertItems.indexOf(value._type) >= 0) {
        filteredSectionKeys.push(sectionKeys[index])
      }
    })
    filteredSectionKeys.forEach((key) => {
      if (section[key] && section.currentLanguage) {
        const localeButton = section[key][section.currentLanguage.languageTag]
        if (localeButton && localeButton.route) {
          const formatedRoute = routes.filter((r) => r._id === localeButton.route._ref)[0]
          localeButton.route = formatedRoute
        }
        section[key] = localeButton
      }
    })
  })

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
  routes: PropTypes.object,
}

export default RenderSections
